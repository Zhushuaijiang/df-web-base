/**
 * Cookie 操作工具
 * 来源: df-web-utils/packages/cookies/index.js
 */

export interface CookieOptions {
  /** 过期时间 (天) */
  expires?: number
  /** 路径 */
  path?: string
  /** 域名 */
  domain?: string
  /** 是否仅 HTTPS */
  secure?: boolean
  /** SameSite 属性 */
  sameSite?: 'Strict' | 'Lax' | 'None'
}

/**
 * 获取 Cookie
 */
export function getCookie(name: string): string | null {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '=([^;]*)')
  )
  return matches ? decodeURIComponent(matches[1]!) : null
}

/**
 * 设置 Cookie
 */
export function setCookie(name: string, value: string, options: CookieOptions = {}): void {
  const { expires, path = '/', domain, secure, sameSite } = options

  let cookieStr = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`

  if (expires !== undefined) {
    const date = new Date()
    date.setTime(date.getTime() + expires * 24 * 60 * 60 * 1000)
    cookieStr += `; expires=${date.toUTCString()}`
  }

  if (path) cookieStr += `; path=${path}`
  if (domain) cookieStr += `; domain=${domain}`
  if (secure) cookieStr += '; secure'
  if (sameSite) cookieStr += `; SameSite=${sameSite}`

  document.cookie = cookieStr
}

/**
 * 删除 Cookie
 */
export function delCookie(name: string, options: Pick<CookieOptions, 'path' | 'domain'> = {}): void {
  setCookie(name, '', { ...options, expires: -1 })
}
