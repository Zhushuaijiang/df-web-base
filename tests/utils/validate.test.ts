import { describe, it, expect } from 'vitest'
import { isPhone, isIdCard, isNotEmpty, isPositiveInteger } from '../../src/utils/validate'

describe('validate utils', () => {
  it('isPhone', () => {
    expect(isPhone('13812345678')).toBe(true)
    expect(isPhone('12345678901')).toBe(false)
    expect(isPhone('1381234567')).toBe(false)
  })

  it('isIdCard', () => {
    expect(isIdCard('110101199001011234')).toBe(true)
    expect(isIdCard('11010119900101123X')).toBe(true)
    expect(isIdCard('1234')).toBe(false)
  })

  it('isNotEmpty', () => {
    expect(isNotEmpty('hello')).toBe(true)
    expect(isNotEmpty('')).toBe(false)
    expect(isNotEmpty('  ')).toBe(false)
    expect(isNotEmpty(null)).toBe(false)
    expect(isNotEmpty(undefined)).toBe(false)
    expect(isNotEmpty([1])).toBe(true)
    expect(isNotEmpty([])).toBe(false)
  })

  it('isPositiveInteger', () => {
    expect(isPositiveInteger(1)).toBe(true)
    expect(isPositiveInteger(0)).toBe(false)
    expect(isPositiveInteger(-1)).toBe(false)
    expect(isPositiveInteger('42')).toBe(true)
    expect(isPositiveInteger('0')).toBe(false)
    // number 小数
    expect(isPositiveInteger(1.5)).toBe(false)
    // string 小数
    expect(isPositiveInteger('1.5')).toBe(false)
    // 非 number/string 类型
    expect(isPositiveInteger(null)).toBe(false)
    expect(isPositiveInteger(undefined)).toBe(false)
    expect(isPositiveInteger(true)).toBe(false)
    expect(isPositiveInteger({})).toBe(false)
  })

  it('isNotEmpty - 数字/布尔/对象返回 true', () => {
    expect(isNotEmpty(0)).toBe(true)
    expect(isNotEmpty(false)).toBe(true)
    expect(isNotEmpty({})).toBe(true)
  })
})
