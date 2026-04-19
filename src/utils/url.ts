/**
 * URL 参数工具
 * 来源: df-web-utils/packages/method/index.js
 */

/**
 * 获取 URL 中指定参数的值
 * @param name - 参数名
 * @param url - 目标 URL (默认 window.location.href)
 */
export function getUrlParam(name: string, url?: string): string | null {
  const targetUrl = url ?? window.location.href
  const searchParams = new URL(targetUrl, window.location.origin).searchParams
  return searchParams.get(name)
}

/**
 * 获取 URL 中所有查询参数
 * @param url - 目标 URL (默认 window.location.href)
 */
export function getUrlQuery(url?: string): Record<string, string> {
  const targetUrl = url ?? window.location.href
  const searchParams = new URL(targetUrl, window.location.origin).searchParams
  const params: Record<string, string> = {}

  searchParams.forEach((value, key) => {
    params[key] = value
  })

  return params
}

/**
 * 构建 URL 查询字符串
 * @param params - 参数对象
 */
export function buildQueryString(params: Record<string, string | number | boolean | undefined>): string {
  const searchParams = new URLSearchParams()

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null) {
      searchParams.set(key, String(value))
    }
  }

  const str = searchParams.toString()
  return str ? `?${str}` : ''
}
