/** 手机号校验 */
export function isPhone(value: string): boolean {
  return /^1[3-9]\d{9}$/.test(value)
}

/** 身份证校验（简化版，18位） */
export function isIdCard(value: string): boolean {
  return /^\d{17}[\dXx]$/.test(value)
}

/** 非空判断 */
export function isNotEmpty(value: unknown): boolean {
  if (value == null) return false
  if (typeof value === 'string') return value.trim().length > 0
  if (Array.isArray(value)) return value.length > 0
  return true
}

/** 正整数校验 */
export function isPositiveInteger(value: unknown): boolean {
  if (typeof value === 'number') return Number.isInteger(value) && value > 0
  if (typeof value === 'string') return /^[1-9]\d*$/.test(value)
  return false
}
