import { describe, it, expect, beforeEach } from 'vitest'
import { getCookie, setCookie, delCookie } from '../../src/utils/cookies'

// jsdom 提供 document.cookie
describe('cookies', () => {
  beforeEach(() => {
    // 清理所有 cookie
    document.cookie.split(';').forEach((c) => {
      const name = c.split('=')[0]!.trim()
      if (name) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`
      }
    })
  })

  describe('setCookie / getCookie', () => {
    it('设置并读取 cookie', () => {
      setCookie('testKey', 'testValue')
      expect(getCookie('testKey')).toBe('testValue')
    })

    it('对特殊字符进行编码', () => {
      setCookie('sp', 'hello world&foo=bar')
      expect(getCookie('sp')).toBe('hello world&foo=bar')
    })

    it('不存在的 cookie 返回 null', () => {
      expect(getCookie('nonexistent')).toBeNull()
    })

    it('设置带 expires 选项', () => {
      setCookie('exp', 'value', { expires: 1 }) // 1天
      expect(getCookie('exp')).toBe('value')
    })

    it('设置带 domain / secure / sameSite 选项', () => {
      // 不会报错即可，jsdom 下 domain/secure 可能不生效
      setCookie('full', 'v', {
        path: '/',
        secure: false,
        sameSite: 'Lax',
      })
      expect(getCookie('full')).toBe('v')
    })
  })

  describe('delCookie', () => {
    it('删除已有 cookie', () => {
      setCookie('toDel', 'val')
      expect(getCookie('toDel')).toBe('val')
      delCookie('toDel')
      expect(getCookie('toDel')).toBeNull()
    })
  })
})
