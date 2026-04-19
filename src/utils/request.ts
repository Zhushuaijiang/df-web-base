/**
 * HTTP 请求封装
 * 基于 axios，支持请求/响应拦截、401 Token 自动续期、请求取消
 * 来源: df-web-utils/packages/request/index.js
 */
import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

export interface RequestOptions {
  /** 基础路径 */
  baseURL?: string
  /** 超时 ms */
  timeout?: number
  /** 获取 token 回调 */
  getToken?: () => string | null
  /** token 过期回调（如跳转登录） */
  onTokenExpired?: () => void
  /** 获取通用 headers（用户ID/租户ID 等） */
  getHeaders?: () => Record<string, string>
  /** token 续期接口 */
  refreshToken?: () => Promise<string>
  /** 业务码成功判断（默认 code === 200） */
  isSuccess?: (data: { code?: number; msg?: string; [key: string]: unknown }) => boolean
  /** 统一错误提示 */
  onError?: (message: string, detail?: unknown) => void
}

export type RequestInstance = AxiosInstance & {
  /** 取消指定请求 */
  cancel: (requestId: string) => void
  /** 取消所有进行中请求 */
  cancelAll: () => void
}

/**
 * 创建请求实例
 */
export function createRequest(options: RequestOptions = {}): RequestInstance {
  const {
    baseURL = '',
    timeout = 30000,
    getToken,
    onTokenExpired,
    getHeaders,
    refreshToken,
    isSuccess = (data) => data?.code === 200,
    onError,
  } = options

  const instance = axios.create({ baseURL, timeout }) as RequestInstance

  // 请求取消管理
  const pendingMap = new Map<string, AbortController>()

  function getRequestKey(config: AxiosRequestConfig): string {
    return `${config.method ?? 'get'}_${config.url ?? ''}`
  }

  // ─── 请求拦截器 ───
  instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    // 注入 Token
    const token = getToken?.()
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }

    // 注入通用 Headers
    const extraHeaders = getHeaders?.()
    if (extraHeaders && config.headers) {
      Object.entries(extraHeaders).forEach(([key, val]) => {
        config.headers![key] = val
      })
    }

    // 请求取消（同一接口同时只保留最新一个）
    const requestKey = getRequestKey(config)
    if (pendingMap.has(requestKey)) {
      pendingMap.get(requestKey)!.abort()
    }
    const controller = new AbortController()
    config.signal = controller.signal
    pendingMap.set(requestKey, controller)

    return config
  })

  // ─── Token 续期状态 ───
  let isRefreshing = false
  let refreshQueue: Array<(token: string) => void> = []

  // ─── 响应拦截器 ───
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      pendingMap.delete(getRequestKey(response.config))

      const data = response.data
      if (isSuccess(data)) {
        return data
      }

      // 业务错误
      const msg = data?.msg ?? data?.message ?? '请求失败'
      onError?.(msg, data)
      return Promise.reject(new Error(msg))
    },
    async (error: unknown) => {
      if (axios.isCancel(error)) {
        return Promise.reject(error)
      }

      const axiosError = error as { config?: InternalAxiosRequestConfig & { _retried?: boolean }; response?: { status?: number; data?: { msg?: string; message?: string } }; message?: string }
      const originalConfig = axiosError.config
      pendingMap.delete(getRequestKey(originalConfig ?? {}))

      // 401 Token 续期
      if (axiosError.response?.status === 401 && refreshToken && originalConfig && !originalConfig._retried) {
        if (!isRefreshing) {
          isRefreshing = true
          try {
            const newToken = await refreshToken()
            isRefreshing = false
            refreshQueue.forEach((cb) => cb(newToken))
            refreshQueue = []
            originalConfig._retried = true
            if (originalConfig.headers) {
              originalConfig.headers.Authorization = `Bearer ${newToken}`
            }
            return instance(originalConfig)
          } catch {
            isRefreshing = false
            refreshQueue = []
            onTokenExpired?.()
            return Promise.reject(error)
          }
        } else {
          return new Promise((resolve) => {
            refreshQueue.push((token: string) => {
              originalConfig!.headers.Authorization = `Bearer ${token}`
              resolve(instance(originalConfig!))
            })
          })
        }
      }

      // 403
      if (axiosError.response?.status === 403) {
        onTokenExpired?.()
      }

      const msg = axiosError.response?.data?.msg
        ?? axiosError.response?.data?.message
        ?? axiosError.message
        ?? '网络请求异常'

      onError?.(msg, axiosError.response?.data)
      return Promise.reject(error)
    },
  )

  // ─── 取消方法 ───
  instance.cancel = (requestId: string) => {
    pendingMap.get(requestId)?.abort()
    pendingMap.delete(requestId)
  }

  instance.cancelAll = () => {
    pendingMap.forEach((controller) => controller.abort())
    pendingMap.clear()
  }

  return instance
}
