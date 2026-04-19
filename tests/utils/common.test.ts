import { describe, it, expect, vi, afterEach } from 'vitest'
import { uuid, isEmpty, debounce, throttle, deepClone, copyText, loadJs } from '../../src/utils/common'

describe('common', () => {
  describe('uuid', () => {
    it('生成合法的 UUID v4 格式', () => {
      const id = uuid()
      expect(id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/)
    })

    it('每次生成唯一值', () => {
      const ids = new Set(Array.from({ length: 50 }, () => uuid()))
      expect(ids.size).toBe(50)
    })
  })

  describe('isEmpty', () => {
    it('null / undefined / 空字符串为空', () => {
      expect(isEmpty(null)).toBe(true)
      expect(isEmpty(undefined)).toBe(true)
      expect(isEmpty('')).toBe(true)
    })

    it('NaN 为空', () => {
      expect(isEmpty(NaN)).toBe(true)
    })

    it('空数组为空', () => {
      expect(isEmpty([])).toBe(true)
    })

    it('空对象为空', () => {
      expect(isEmpty({})).toBe(true)
    })

    it('有值的不为空', () => {
      expect(isEmpty(0)).toBe(false)
      expect(isEmpty(false)).toBe(false)
      expect(isEmpty('hello')).toBe(false)
      expect(isEmpty([1])).toBe(false)
      expect(isEmpty({ a: 1 })).toBe(false)
    })
  })

  describe('debounce', () => {
    afterEach(() => vi.useRealTimers())

    it('延迟执行', () => {
      vi.useFakeTimers()
      const fn = vi.fn()
      const debounced = debounce(fn, 100)

      debounced()
      expect(fn).not.toHaveBeenCalled()

      vi.advanceTimersByTime(100)
      expect(fn).toHaveBeenCalledOnce()
    })

    it('多次调用只执行最后一次', () => {
      vi.useFakeTimers()
      const fn = vi.fn()
      const debounced = debounce(fn, 100)

      debounced()
      debounced()
      debounced()

      vi.advanceTimersByTime(100)
      expect(fn).toHaveBeenCalledOnce()
    })
  })

  describe('throttle', () => {
    afterEach(() => vi.useRealTimers())

    it('首次立即执行', () => {
      vi.useFakeTimers()
      const fn = vi.fn()
      const throttled = throttle(fn, 100)

      throttled()
      expect(fn).toHaveBeenCalledOnce()
    })

    it('间隔内的调用被延后', () => {
      vi.useFakeTimers()
      const fn = vi.fn()
      const throttled = throttle(fn, 100)

      throttled() // 立即执行
      throttled() // 节流延后
      expect(fn).toHaveBeenCalledOnce()

      vi.advanceTimersByTime(100)
      expect(fn).toHaveBeenCalledTimes(2)
    })
  })

  describe('deepClone', () => {
    it('深拷贝对象', () => {
      const obj = { a: 1, b: { c: [2, 3] } }
      const cloned = deepClone(obj)
      expect(cloned).toEqual(obj)
      expect(cloned).not.toBe(obj)
      expect(cloned.b).not.toBe(obj.b)
    })

    it('基本类型直接返回', () => {
      expect(deepClone(42)).toBe(42)
      expect(deepClone('str')).toBe('str')
    })
  })

  describe('copyText', () => {
    it('使用 clipboard API 复制成功', async () => {
      Object.assign(navigator, {
        clipboard: {
          writeText: vi.fn().mockResolvedValue(undefined),
        },
      })
      const result = await copyText('hello')
      expect(result).toBe(true)
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith('hello')
    })

    it('clipboard API 失败时降级 execCommand', async () => {
      Object.assign(navigator, {
        clipboard: {
          writeText: vi.fn().mockRejectedValue(new Error('denied')),
        },
      })
      // jsdom 默认不支持 execCommand，需要手动定义
      document.execCommand = vi.fn().mockReturnValue(true)

      const result = await copyText('fallback')
      expect(document.execCommand).toHaveBeenCalledWith('copy')
      expect(result).toBe(true)
    })

    it('无 clipboard API 时直接 execCommand', async () => {
      const savedClipboard = navigator.clipboard
      Object.defineProperty(navigator, 'clipboard', { value: undefined, configurable: true })
      document.execCommand = vi.fn().mockReturnValue(true)

      const result = await copyText('no-clipboard')
      expect(result).toBe(true)

      Object.defineProperty(navigator, 'clipboard', { value: savedClipboard, configurable: true })
    })
  })

  describe('loadJs', () => {
    it('已存在相同 src 的 script 直接 resolve', async () => {
      const script = document.createElement('script')
      script.setAttribute('src', 'https://example.com/existing.js')
      document.head.appendChild(script)

      await expect(loadJs('https://example.com/existing.js')).resolves.toBeUndefined()
      document.head.removeChild(script)
    })

    it('创建新 script 并加载成功', async () => {
      const origAppendChild = document.head.appendChild.bind(document.head)
      vi.spyOn(document.head, 'appendChild').mockImplementation((el: any) => {
        // 模拟加载成功
        setTimeout(() => el.onload?.(), 0)
        return origAppendChild(el)
      })

      await loadJs('https://example.com/new-script.js')
      const added = document.querySelector('script[src="https://example.com/new-script.js"]')
      expect(added).toBeTruthy()
      added?.remove()
      vi.restoreAllMocks()
    })

    it('加载失败时 reject', async () => {
      const origAppendChild = document.head.appendChild.bind(document.head)
      vi.spyOn(document.head, 'appendChild').mockImplementation((el: any) => {
        setTimeout(() => el.onerror?.(), 0)
        return origAppendChild(el)
      })

      await expect(loadJs('https://example.com/fail-script.js')).rejects.toThrow('Failed to load script')
      const added = document.querySelector('script[src="https://example.com/fail-script.js"]')
      added?.remove()
      vi.restoreAllMocks()
    })
  })
})
