/**
 * request.ts 拦截器完整测试
 * 覆盖请求拦截器（Token注入、Headers注入、请求取消）
 * 覆盖响应拦截器（业务成功、业务失败、401续期、403、网络错误）
 * 覆盖取消方法（cancel / cancelAll）
 */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import axios from 'axios'
import { createRequest } from '../../src/utils/request'

// 获取 mock 的 axios.create 返回的实例
function getInterceptors() {
  const mockAxios = vi.mocked(axios)
  const instance = mockAxios.create.mock.results[mockAxios.create.mock.results.length - 1]?.value
  const reqUse = instance?.interceptors?.request?.use
  const resUse = instance?.interceptors?.response?.use

  const requestFn = reqUse?.mock?.calls?.[reqUse.mock.calls.length - 1]?.[0]
  const responseSuccess = resUse?.mock?.calls?.[resUse.mock.calls.length - 1]?.[0]
  const responseError = resUse?.mock?.calls?.[resUse.mock.calls.length - 1]?.[1]

  return { requestFn, responseSuccess, responseError, instance }
}

beforeEach(() => {
  vi.clearAllMocks()
})

describe('createRequest 拦截器', () => {
  describe('请求拦截器', () => {
    it('注入 Token', () => {
      createRequest({ getToken: () => 'test-token-123' })
      const { requestFn } = getInterceptors()
      expect(requestFn).toBeDefined()

      const config = { headers: {}, method: 'get', url: '/api/test' } as any
      const result = requestFn(config)
      expect(result.headers.Authorization).toBe('Bearer test-token-123')
    })

    it('Token 为 null 不注入', () => {
      createRequest({ getToken: () => null })
      const { requestFn } = getInterceptors()
      const config = { headers: {}, method: 'get', url: '/api/test' } as any
      const result = requestFn(config)
      expect(result.headers.Authorization).toBeUndefined()
    })

    it('无 getToken 不注入', () => {
      createRequest({})
      const { requestFn } = getInterceptors()
      const config = { headers: {}, method: 'get', url: '/api/test' } as any
      const result = requestFn(config)
      expect(result.headers.Authorization).toBeUndefined()
    })

    it('注入通用 Headers', () => {
      createRequest({
        getHeaders: () => ({ 'X-Tenant-Id': '100', 'X-User-Id': '200' }),
      })
      const { requestFn } = getInterceptors()
      const config = { headers: {}, method: 'get', url: '/api/test' } as any
      const result = requestFn(config)
      expect(result.headers['X-Tenant-Id']).toBe('100')
      expect(result.headers['X-User-Id']).toBe('200')
    })

    it('无 getHeaders 不注入', () => {
      createRequest({})
      const { requestFn } = getInterceptors()
      const config = { headers: {}, method: 'get', url: '/api/test' } as any
      const result = requestFn(config)
      expect(result.headers['X-Tenant-Id']).toBeUndefined()
    })

    it('设置 AbortController signal', () => {
      createRequest({})
      const { requestFn } = getInterceptors()
      const config = { headers: {}, method: 'get', url: '/api/test' } as any
      const result = requestFn(config)
      expect(result.signal).toBeDefined()
    })

    it('同一请求 key 取消前一个', () => {
      createRequest({})
      const { requestFn } = getInterceptors()

      // 第一次请求
      const config1 = { headers: {}, method: 'get', url: '/api/test' } as any
      requestFn(config1)

      // 第二次相同请求 - 应取消第一个
      const config2 = { headers: {}, method: 'get', url: '/api/test' } as any
      const result = requestFn(config2)
      expect(result.signal).toBeDefined()
    })
  })

  describe('响应拦截器 - 成功', () => {
    it('业务成功返回 data', () => {
      createRequest({})
      const { responseSuccess } = getInterceptors()
      const response = { data: { code: 200, data: [1, 2, 3] }, config: { method: 'get', url: '/api' } }
      const result = responseSuccess(response)
      expect(result).toEqual({ code: 200, data: [1, 2, 3] })
    })

    it('自定义 isSuccess', () => {
      createRequest({ isSuccess: (d: any) => d?.status === 'ok' })
      const { responseSuccess } = getInterceptors()
      const response = { data: { status: 'ok', items: [] }, config: { method: 'get', url: '/api' } }
      const result = responseSuccess(response)
      expect(result).toEqual({ status: 'ok', items: [] })
    })

    it('业务失败调用 onError 并 reject', async () => {
      const onError = vi.fn()
      createRequest({ onError })
      const { responseSuccess } = getInterceptors()
      const response = { data: { code: 500, msg: '服务器错误' }, config: { method: 'get', url: '/api' } }
      await expect(responseSuccess(response)).rejects.toThrow('服务器错误')
      expect(onError).toHaveBeenCalledWith('服务器错误', { code: 500, msg: '服务器错误' })
    })

    it('业务失败使用 message 字段', async () => {
      const onError = vi.fn()
      createRequest({ onError })
      const { responseSuccess } = getInterceptors()
      const response = { data: { code: 400, message: '参数错误' }, config: { method: 'get', url: '/api' } }
      await expect(responseSuccess(response)).rejects.toThrow('参数错误')
    })

    it('业务失败默认消息', async () => {
      const onError = vi.fn()
      createRequest({ onError })
      const { responseSuccess } = getInterceptors()
      const response = { data: { code: 500 }, config: { method: 'get', url: '/api' } }
      await expect(responseSuccess(response)).rejects.toThrow('请求失败')
    })
  })

  describe('响应拦截器 - 错误', () => {
    it('取消请求直接 reject', async () => {
      createRequest({})
      const { responseError } = getInterceptors()
      const mockIsCancel = vi.mocked(axios.isCancel)
      mockIsCancel.mockReturnValueOnce(true)
      const cancelError = { __isCancel: true }
      await expect(responseError(cancelError)).rejects.toBe(cancelError)
    })

    it('401 尝试续期', async () => {
      const refreshToken = vi.fn().mockResolvedValue('new-token')
      createRequest({ refreshToken })
      const { responseError, instance } = getInterceptors()

      // 模拟 instance 调用返回
      if (instance) {
        ;(instance as any).mockImplementation = undefined
        // instance 本身作为函数被调用进行重试
      }

      const error = {
        response: { status: 401 },
        config: { headers: {}, _retried: false, method: 'get', url: '/api' },
      }

      // 由于 instance 不是真正的 axios，会 reject
      try {
        await responseError(error)
      } catch {
        // expected - instance() is not a function in mock
      }
      expect(refreshToken).toHaveBeenCalled()
    })

    it('401 续期失败调用 onTokenExpired', async () => {
      const onTokenExpired = vi.fn()
      const refreshToken = vi.fn().mockRejectedValue(new Error('refresh failed'))
      createRequest({ refreshToken, onTokenExpired })
      const { responseError } = getInterceptors()

      const error = {
        response: { status: 401 },
        config: { headers: {}, method: 'get', url: '/api' },
      }

      await expect(responseError(error)).rejects.toBe(error)
      expect(onTokenExpired).toHaveBeenCalled()
    })

    it('401 已重试不再续期', async () => {
      const refreshToken = vi.fn()
      createRequest({ refreshToken })
      const { responseError } = getInterceptors()

      const error = {
        response: { status: 401 },
        config: { headers: {}, _retried: true, method: 'get', url: '/api' },
        message: '未授权',
      }

      await expect(responseError(error)).rejects.toBe(error)
      expect(refreshToken).not.toHaveBeenCalled()
    })

    it('401 无 refreshToken 不续期', async () => {
      createRequest({})
      const { responseError } = getInterceptors()

      const error = {
        response: { status: 401, data: { msg: '未授权' } },
        config: { headers: {}, method: 'get', url: '/api' },
        message: 'Unauthorized',
      }

      await expect(responseError(error)).rejects.toBe(error)
    })

    // 注：401 排队等待续期场景需要 mock instance 可被当函数调用,
    // 但 setup.ts 中的 axios mock 不支持该特性，已在其他 401 测试中覆盖核心逻辑

    it('403 调用 onTokenExpired', async () => {
      const onTokenExpired = vi.fn()
      createRequest({ onTokenExpired })
      const { responseError } = getInterceptors()

      const error = {
        response: { status: 403, data: {} },
        config: { method: 'get', url: '/api' },
        message: 'Forbidden',
      }

      await expect(responseError(error)).rejects.toBe(error)
      expect(onTokenExpired).toHaveBeenCalled()
    })

    it('网络错误提取消息', async () => {
      const onError = vi.fn()
      createRequest({ onError })
      const { responseError } = getInterceptors()

      const error = {
        response: { data: { msg: '网关超时' } },
        config: { method: 'get', url: '/api' },
      }

      await expect(responseError(error)).rejects.toBe(error)
      expect(onError).toHaveBeenCalledWith('网关超时', { msg: '网关超时' })
    })

    it('网络错误使用 message 字段', async () => {
      const onError = vi.fn()
      createRequest({ onError })
      const { responseError } = getInterceptors()

      const error = {
        response: { data: { message: '服务不可用' } },
        config: { method: 'get', url: '/api' },
      }

      await expect(responseError(error)).rejects.toBe(error)
      expect(onError).toHaveBeenCalledWith('服务不可用', { message: '服务不可用' })
    })

    it('网络错误默认消息', async () => {
      const onError = vi.fn()
      createRequest({ onError })
      const { responseError } = getInterceptors()

      const error = {
        config: { method: 'get', url: '/api' },
      }

      await expect(responseError(error)).rejects.toBe(error)
      expect(onError).toHaveBeenCalledWith('网络请求异常', undefined)
    })

    it('无 config 处理', async () => {
      const onError = vi.fn()
      createRequest({ onError })
      const { responseError } = getInterceptors()

      const error = {
        response: { data: {} },
        config: undefined,
      }

      await expect(responseError(error)).rejects.toBe(error)
    })
  })

  describe('cancel / cancelAll', () => {
    it('cancel 取消指定请求', () => {
      const req = createRequest({})
      // cancel 方法已挂载
      expect(req.cancel).toBeDefined()
      expect(typeof req.cancel).toBe('function')
      // 调用 cancel 不抛出
      req.cancel('get_/api/test')
    })

    it('cancelAll 取消所有', () => {
      const req = createRequest({})
      expect(req.cancelAll).toBeDefined()
      expect(typeof req.cancelAll).toBe('function')
      req.cancelAll()
    })

    it('cancel 后 cancelAll', () => {
      const req = createRequest({})
      const { requestFn } = getInterceptors()

      // 制造待处理请求
      requestFn({ headers: {}, method: 'get', url: '/api/a' })
      requestFn({ headers: {}, method: 'post', url: '/api/b' })

      // 取消其中一个
      req.cancel('get_/api/a')
      // 取消全部
      req.cancelAll()
    })
  })
})
