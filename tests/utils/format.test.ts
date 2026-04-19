import { describe, it, expect } from 'vitest'
import { formatDate, formatMoney, maskPhone, maskIdCard, maskName } from '../../src/utils/format'

describe('format utils', () => {
  it('formatDate 空值返回空字符串', () => {
    expect(formatDate(null)).toBe('')
    expect(formatDate(undefined)).toBe('')
  })

  it('formatMoney 千分位格式化', () => {
    expect(formatMoney(1234567.89)).toBe('1,234,567.89')
    expect(formatMoney(0)).toBe('0.00')
    expect(formatMoney(null)).toBe('')
  })

  it('maskPhone 手机号脱敏', () => {
    expect(maskPhone('13812345678')).toBe('138****5678')
    expect(maskPhone(null)).toBe('')
  })

  it('maskIdCard 身份证脱敏', () => {
    expect(maskIdCard('110101199001011234')).toBe('110101********1234')
    expect(maskIdCard(null)).toBe('')
  })

  it('maskName 姓名脱敏', () => {
    expect(maskName('张三')).toBe('张*')
    expect(maskName('欧阳修')).toBe('欧**')
    expect(maskName(null)).toBe('')
  })
})
