import { describe, it, expect, vi } from 'vitest'
import { createRequest } from '../../src/utils/request'

describe('request', () => {
  describe('createRequest', () => {
    it('创建请求实例', () => {
      const req = createRequest({ baseURL: '/api', timeout: 5000 })
      expect(req).toBeDefined()
      expect(typeof req.cancel).toBe('function')
      expect(typeof req.cancelAll).toBe('function')
    })

    it('默认参数创建', () => {
      const req = createRequest()
      expect(req).toBeDefined()
    })

    it('cancel 方法不抛出', () => {
      const req = createRequest()
      expect(() => req.cancel('get_/test')).not.toThrow()
    })

    it('cancelAll 方法不抛出', () => {
      const req = createRequest()
      expect(() => req.cancelAll()).not.toThrow()
    })

    it('支持自定义 isSuccess', () => {
      const req = createRequest({
        isSuccess: (data: any) => data?.success === true,
      })
      expect(req).toBeDefined()
    })

    it('支持所有配置选项', () => {
      const req = createRequest({
        baseURL: '/api',
        timeout: 10000,
        getToken: () => 'tk',
        onTokenExpired: vi.fn(),
        getHeaders: () => ({ 'X-Id': '1' }),
        isSuccess: (d: any) => d?.code === 0,
        onError: vi.fn(),
      })
      expect(req).toBeDefined()
    })
  })
})
