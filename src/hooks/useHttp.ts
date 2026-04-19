import { inject } from 'vue'
import { DF_UI_KEY } from '../install'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'

/**
 * HTTP 请求组合式函数
 * 封装 DfUIOptions.http，提供类型安全的请求快捷方法
 */
export function useHttp() {
  const dfui = inject(DF_UI_KEY)
  if (!dfui) {
    throw new Error('[useHttp] DfUIOptions 未注入')
  }

  const http: AxiosInstance = dfui.http

  async function get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const { data } = await http.get<T>(url, config)
    return data
  }

  async function post<T = unknown>(url: string, body?: Record<string, unknown>, config?: AxiosRequestConfig): Promise<T> {
    const { data } = await http.post<T>(url, body, config)
    return data
  }

  async function put<T = unknown>(url: string, body?: Record<string, unknown>, config?: AxiosRequestConfig): Promise<T> {
    const { data } = await http.put<T>(url, body, config)
    return data
  }

  async function del<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const { data } = await http.delete<T>(url, config)
    return data
  }

  return { http, get, post, put, del }
}
