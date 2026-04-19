import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { createCache, cache } from '../../src/utils/cache'

describe('cache', () => {
  beforeEach(() => {
    sessionStorage.clear()
  })

  describe('createCache', () => {
    it('使用默认命名空间', () => {
      const c = createCache()
      c.set('key1', 'value1')
      expect(sessionStorage.getItem('df_cache_key1')).toBeTruthy()
    })

    it('使用自定义命名空间', () => {
      const c = createCache('custom_')
      c.set('key1', 'value1')
      expect(sessionStorage.getItem('custom_key1')).toBeTruthy()
      expect(sessionStorage.getItem('df_cache_key1')).toBeNull()
    })
  })

  describe('set / get', () => {
    it('存取基本值', () => {
      cache.set('str', 'hello')
      expect(cache.get('str')).toBe('hello')
    })

    it('存取对象', () => {
      const obj = { a: 1, b: [2, 3] }
      cache.set('obj', obj)
      expect(cache.get('obj')).toEqual(obj)
    })

    it('不存在的 key 返回 null', () => {
      expect(cache.get('nonexistent')).toBeNull()
    })

    it('损坏的 JSON 返回 null', () => {
      sessionStorage.setItem('df_cache_bad', '{invalid')
      const c = createCache()
      expect(c.get('bad')).toBeNull()
    })
  })

  describe('TTL 过期', () => {
    it('未过期时返回值', () => {
      cache.set('ttl', 'alive', 60)
      expect(cache.get('ttl')).toBe('alive')
    })

    it('过期后返回 null 并清理', () => {
      cache.set('ttl', 'dead', 1)
      // 模拟时间流逝
      const raw = sessionStorage.getItem('df_cache_ttl')!
      const item = JSON.parse(raw)
      item.expire = Date.now() - 1000
      sessionStorage.setItem('df_cache_ttl', JSON.stringify(item))

      expect(cache.get('ttl')).toBeNull()
      expect(sessionStorage.getItem('df_cache_ttl')).toBeNull()
    })

    it('无 TTL 时永不过期', () => {
      cache.set('forever', 'value')
      const raw = JSON.parse(sessionStorage.getItem('df_cache_forever')!)
      expect(raw.expire).toBeNull()
      expect(cache.get('forever')).toBe('value')
    })
  })

  describe('remove', () => {
    it('删除指定缓存', () => {
      cache.set('key1', 'v1')
      cache.set('key2', 'v2')
      cache.remove('key1')
      expect(cache.get('key1')).toBeNull()
      expect(cache.get('key2')).toBe('v2')
    })
  })

  describe('clear', () => {
    it('清空当前命名空间的缓存', () => {
      cache.set('a', 1)
      cache.set('b', 2)
      sessionStorage.setItem('other_key', 'keep')

      cache.clear()
      expect(cache.get('a')).toBeNull()
      expect(cache.get('b')).toBeNull()
      expect(sessionStorage.getItem('other_key')).toBe('keep')
    })
  })

  describe('storage 满时的降级', () => {
    it('第一次 setItem 抛出时触发 cleanExpired 后重试', () => {
      let callCount = 0
      const originalSetItem = sessionStorage.setItem.bind(sessionStorage)
      vi.spyOn(sessionStorage, 'setItem').mockImplementation((key, value) => {
        callCount++
        if (callCount === 1) {
          throw new DOMException('quota exceeded')
        }
        return originalSetItem(key, value)
      })

      cache.set('retry', 'ok')
      // 应走了 cleanExpired + 重试分支
      vi.restoreAllMocks()
    })

    it('重试仍失败时静默忽略', () => {
      vi.spyOn(sessionStorage, 'setItem').mockImplementation(() => {
        throw new DOMException('quota exceeded')
      })

      // 不应抛出
      expect(() => cache.set('fail', 'data')).not.toThrow()
      vi.restoreAllMocks()
    })
  })
})
