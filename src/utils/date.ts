/**
 * 日期工具函数
 * 基于 dayjs，提供医疗信息化常用日期操作
 */
import dayjs, { type Dayjs } from 'dayjs'

export type DateInput = string | number | Date | Dayjs

/**
 * 格式化日期
 * @example formatDate('2026-04-18T10:30:00') → '2026-04-18'
 */
export function formatDate(date: DateInput, format = 'YYYY-MM-DD'): string {
  if (!date) return ''
  return dayjs(date).format(format)
}

/**
 * 格式化日期时间
 * @example formatDateTime('2026-04-18T10:30:00') → '2026-04-18 10:30:00'
 */
export function formatDateTime(date: DateInput, format = 'YYYY-MM-DD HH:mm:ss'): string {
  if (!date) return ''
  return dayjs(date).format(format)
}

/**
 * 格式化时间
 * @example formatTime('2026-04-18T10:30:00') → '10:30:00'
 */
export function formatTime(date: DateInput, format = 'HH:mm:ss'): string {
  if (!date) return ''
  return dayjs(date).format(format)
}

/**
 * 计算年龄（周岁）
 * 适用于患者年龄计算
 * @example getAge('1990-01-15') → 36
 */
export function getAge(birthday: DateInput): number {
  if (!birthday) return 0
  const birth = dayjs(birthday)
  const today = dayjs()
  let age = today.year() - birth.year()
  if (today.month() < birth.month() ||
    (today.month() === birth.month() && today.date() < birth.date())) {
    age--
  }
  return Math.max(0, age)
}

/**
 * 计算年龄描述（含月/天，适用于婴幼儿）
 * @example getAgeText('2026-01-15') → '3个月'
 */
export function getAgeText(birthday: DateInput): string {
  if (!birthday) return ''
  const birth = dayjs(birthday)
  const today = dayjs()
  const years = getAge(birthday)

  if (years >= 3) return `${years}岁`

  const totalMonths = today.diff(birth, 'month')
  if (totalMonths >= 1) {
    return years > 0 ? `${years}岁${totalMonths % 12}个月` : `${totalMonths}个月`
  }

  const days = today.diff(birth, 'day')
  return `${Math.max(0, days)}天`
}

/**
 * 判断是否同一天
 */
export function isSameDay(a: DateInput, b: DateInput): boolean {
  return dayjs(a).isSame(dayjs(b), 'day')
}

/**
 * 获取日期范围
 * @example getDateRange('thisWeek') → [start, end]
 */
export function getDateRange(
  preset: 'today' | 'yesterday' | 'thisWeek' | 'lastWeek' | 'thisMonth' | 'lastMonth' | 'thisYear',
): [string, string] {
  const today = dayjs()
  const format = 'YYYY-MM-DD'

  switch (preset) {
    case 'today':
      return [today.format(format), today.format(format)]
    case 'yesterday': {
      const d = today.subtract(1, 'day')
      return [d.format(format), d.format(format)]
    }
    case 'thisWeek':
      return [today.startOf('week').add(1, 'day').format(format), today.format(format)]
    case 'lastWeek': {
      const start = today.subtract(1, 'week').startOf('week').add(1, 'day')
      return [start.format(format), start.add(6, 'day').format(format)]
    }
    case 'thisMonth':
      return [today.startOf('month').format(format), today.format(format)]
    case 'lastMonth': {
      const lm = today.subtract(1, 'month')
      return [lm.startOf('month').format(format), lm.endOf('month').format(format)]
    }
    case 'thisYear':
      return [today.startOf('year').format(format), today.format(format)]
    default:
      return [today.format(format), today.format(format)]
  }
}

/**
 * 计算两个日期间的天数差
 */
export function diffDays(start: DateInput, end: DateInput): number {
  return dayjs(end).diff(dayjs(start), 'day')
}

/**
 * 计算住院天数（入院日当天算1天）
 * @example getStayDays('2026-04-10', '2026-04-18') → 9
 */
export function getStayDays(admissionDate: DateInput, dischargeDate?: DateInput): number {
  const start = dayjs(admissionDate)
  const end = dischargeDate ? dayjs(dischargeDate) : dayjs()
  return Math.max(1, end.diff(start, 'day') + 1)
}

/**
 * 判断日期是否在范围内
 */
export function isDateInRange(date: DateInput, start: DateInput, end: DateInput): boolean {
  const d = dayjs(date)
  return (d.isSame(dayjs(start), 'day') || d.isAfter(dayjs(start))) &&
    (d.isSame(dayjs(end), 'day') || d.isBefore(dayjs(end)))
}
