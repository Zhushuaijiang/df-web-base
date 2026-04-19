import { describe, it, expect } from 'vitest'
import { formatNum, formatNumDec, amountToChinese, safeCalc } from '../../src/utils/number'

describe('number', () => {
  describe('formatNum (千分位)', () => {
    it('整数格式化', () => {
      expect(formatNum(1234567)).toBe('1,234,567.00')
    })

    it('小数格式化', () => {
      expect(formatNum(1234.5, 2)).toBe('1,234.50')
    })

    it('自定义小数位', () => {
      expect(formatNum(1000, 0)).toBe('1,000')
      expect(formatNum(1000.1234, 3)).toBe('1,000.123')
    })

    it('字符串数字', () => {
      expect(formatNum('9876543.21')).toBe('9,876,543.21')
    })

    it('NaN 返回空字符串', () => {
      expect(formatNum('abc')).toBe('')
      expect(formatNum(NaN)).toBe('')
    })

    it('负数格式化', () => {
      expect(formatNum(-1234.56)).toBe('-1,234.56')
    })

    it('零', () => {
      expect(formatNum(0)).toBe('0.00')
    })
  })

  describe('formatNumDec (不补零)', () => {
    it('保留有效小数', () => {
      expect(formatNumDec(1.10)).toBe('1.1')
      expect(formatNumDec(1.00)).toBe('1')
    })

    it('四舍五入', () => {
      expect(formatNumDec(1.006, 2)).toBe('1.01')
      expect(formatNumDec(1.125, 2)).toBe('1.13')
    })

    it('NaN 返回空', () => {
      expect(formatNumDec('abc')).toBe('')
    })
  })

  describe('amountToChinese (金额大写)', () => {
    it('零元整', () => {
      expect(amountToChinese(0)).toBe('零元整')
    })

    it('整数金额', () => {
      expect(amountToChinese(100)).toBe('壹佰元整')
    })

    it('带角分的金额', () => {
      expect(amountToChinese(1234.56)).toBe('壹仟贰佰叁拾肆元伍角陆分')
    })

    it('只有角', () => {
      expect(amountToChinese(0.10)).toBe('壹角')
    })

    it('只有分', () => {
      expect(amountToChinese(0.05)).toBe('伍分')
    })

    it('负数金额', () => {
      expect(amountToChinese(-100)).toContain('负')
    })

    it('NaN 返回空', () => {
      expect(amountToChinese('abc')).toBe('')
    })

    it('大金额 (万/亿)', () => {
      const result = amountToChinese(100000000)
      expect(result).toContain('亿')
    })

    it('含零的金额', () => {
      const result = amountToChinese(1001)
      expect(result).toContain('零')
    })

    it('整数带零分', () => {
      // 10.01 => 壹拾元零壹分
      const result = amountToChinese(10.01)
      expect(result).toContain('零')
      expect(result).toContain('分')
    })
  })

  describe('safeCalc (精确计算)', () => {
    it('add', () => {
      expect(safeCalc.add(0.1, 0.2)).toBe(0.3)
    })

    it('subtract', () => {
      expect(safeCalc.subtract(0.3, 0.1)).toBe(0.2)
    })

    it('multiply', () => {
      expect(safeCalc.multiply(0.1, 0.2)).toBe(0.02)
    })

    it('divide', () => {
      expect(safeCalc.divide(0.3, 0.1)).toBe(3)
    })

    it('divide by zero throws', () => {
      expect(() => safeCalc.divide(1, 0)).toThrow('Division by zero')
    })

    it('整数运算', () => {
      expect(safeCalc.add(100, 200)).toBe(300)
      expect(safeCalc.multiply(12, 15)).toBe(180)
    })
  })
})
