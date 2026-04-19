import dayjs from 'dayjs'

/** 日期格式化 */
export function formatDate(date: string | Date | null | undefined, pattern = 'YYYY-MM-DD'): string {
  if (!date) return ''
  return dayjs(date).format(pattern)
}

/** 日期时间格式化 */
export function formatDateTime(date: string | Date | null | undefined): string {
  return formatDate(date, 'YYYY-MM-DD HH:mm:ss')
}

/** 金额格式化（千分位 + 2位小数） */
export function formatMoney(value: number | null | undefined): string {
  if (value == null) return ''
  return new Intl.NumberFormat('zh-CN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

/** 手机号脱敏 */
export function maskPhone(phone: string | null | undefined): string {
  if (!phone) return ''
  return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
}

/** 身份证脱敏 */
export function maskIdCard(idCard: string | null | undefined): string {
  if (!idCard) return ''
  return idCard.replace(/(\d{6})\d{8}(\d{4})/, '$1********$2')
}

/** 姓名脱敏 */
export function maskName(name: string | null | undefined): string {
  if (!name) return ''
  if (name.length <= 1) return name
  return name[0] + '*'.repeat(name.length - 1)
}
