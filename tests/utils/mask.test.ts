import { describe, it, expect } from 'vitest'
import {
  maskPhone,
  maskIdCard,
  maskName,
  maskAddress,
  maskBankCard,
  maskEmail,
  maskInsuranceNo,
  maskGeneric,
  autoMask,
} from '../../src/utils/mask'

describe('mask utils', () => {
  describe('maskPhone', () => {
    it('should mask middle digits', () => {
      expect(maskPhone('13812345678')).toBe('138****5678')
    })

    it('should handle short strings', () => {
      expect(maskPhone('123')).toBe('123')
    })

    it('should handle empty input', () => {
      expect(maskPhone('')).toBe('')
    })

    it('should strip spaces', () => {
      expect(maskPhone('138 1234 5678')).toBe('138****5678')
    })
  })

  describe('maskIdCard', () => {
    it('should mask 18-digit ID', () => {
      expect(maskIdCard('110101199001011234')).toBe('110101********1234')
    })

    it('should mask 15-digit ID', () => {
      expect(maskIdCard('110101900101123')).toBe('110101*****1123')
    })

    it('should handle short strings', () => {
      expect(maskIdCard('12345')).toBe('12345')
    })
  })

  describe('maskName', () => {
    it('should keep first char', () => {
      expect(maskName('张三丰')).toBe('张**')
    })

    it('should handle two-char name', () => {
      expect(maskName('张三')).toBe('张*')
    })

    it('should handle single char', () => {
      expect(maskName('张')).toBe('张')
    })

    it('should handle empty', () => {
      expect(maskName('')).toBe('')
    })
  })

  describe('maskAddress', () => {
    it('should keep province and city', () => {
      expect(maskAddress('浙江省杭州市西湖区某路某号')).toBe('浙江省杭州市****')
    })

    it('should handle short address', () => {
      expect(maskAddress('杭州')).toBe('杭州')
    })
  })

  describe('maskBankCard', () => {
    it('should mask middle digits', () => {
      expect(maskBankCard('6222021234567890')).toBe('6222********7890')
    })

    it('should handle short card', () => {
      expect(maskBankCard('12345')).toBe('12345')
    })
  })

  describe('maskEmail', () => {
    it('should mask local part', () => {
      expect(maskEmail('zhangsan@hospital.com')).toBe('z*******@hospital.com')
    })

    it('should handle single char local', () => {
      expect(maskEmail('a@b.com')).toBe('a@b.com')
    })

    it('should handle no @ symbol', () => {
      expect(maskEmail('invalid')).toBe('invalid')
    })
  })

  describe('maskInsuranceNo', () => {
    it('should mask middle digits', () => {
      expect(maskInsuranceNo('YIBAO12345678')).toBe('YIBA*****5678')
    })
  })

  describe('maskGeneric', () => {
    it('should mask with custom keep', () => {
      expect(maskGeneric('ABCDEFGHIJ', 2, 3)).toBe('AB*****HIJ')
    })

    it('should handle short strings', () => {
      expect(maskGeneric('AB', 2, 1)).toBe('AB')
    })

    it('should handle empty', () => {
      expect(maskGeneric('')).toBe('')
    })
  })

  describe('autoMask', () => {
    it('should auto-detect phone type', () => {
      expect(autoMask('13812345678', 'phone')).toBe('138****5678')
    })

    it('should auto-detect name type', () => {
      expect(autoMask('张三', 'name')).toBe('张*')
    })

    it('should auto-detect idCard type', () => {
      expect(autoMask('110101199001011234', 'idCard')).toBe('110101********1234')
    })
  })
})
