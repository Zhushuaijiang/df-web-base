import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import {
  formatDate,
  formatDateTime,
  formatTime,
  getAge,
  getAgeText,
  isSameDay,
  getDateRange,
  diffDays,
  getStayDays,
  isDateInRange,
} from '../../src/utils/date'

describe('date utils', () => {
  describe('formatDate', () => {
    it('should format date string', () => {
      expect(formatDate('2026-04-18T10:30:00')).toBe('2026-04-18')
    })

    it('should handle custom format', () => {
      expect(formatDate('2026-04-18', 'YYYY/MM/DD')).toBe('2026/04/18')
    })

    it('should return empty for falsy input', () => {
      expect(formatDate('')).toBe('')
    })
  })

  describe('formatDateTime', () => {
    it('should format with time', () => {
      expect(formatDateTime('2026-04-18T10:30:00')).toBe('2026-04-18 10:30:00')
    })
  })

  describe('formatTime', () => {
    it('should format time only', () => {
      expect(formatTime('2026-04-18T10:30:45')).toBe('10:30:45')
    })
  })

  describe('getAge', () => {
    it('should calculate age', () => {
      const age = getAge('1990-01-15')
      expect(age).toBeGreaterThan(30)
    })

    it('should return 0 for empty', () => {
      expect(getAge('')).toBe(0)
    })
  })

  describe('getAgeText', () => {
    it('should return years for adults', () => {
      const text = getAgeText('1990-01-15')
      expect(text).toMatch(/\d+岁/)
    })

    it('should return empty for empty input', () => {
      expect(getAgeText('')).toBe('')
    })
  })

  describe('isSameDay', () => {
    it('should return true for same day', () => {
      expect(isSameDay('2026-04-18', '2026-04-18T23:59:59')).toBe(true)
    })

    it('should return false for different days', () => {
      expect(isSameDay('2026-04-18', '2026-04-19')).toBe(false)
    })
  })

  describe('getDateRange', () => {
    it('should return today range', () => {
      const [start, end] = getDateRange('today')
      expect(start).toBe(end)
    })

    it('should return yesterday range', () => {
      const [start, end] = getDateRange('yesterday')
      expect(start).toBe(end)
    })

    it('should return thisMonth range', () => {
      const [start, end] = getDateRange('thisMonth')
      expect(start.endsWith('-01')).toBe(true)
    })
  })

  describe('diffDays', () => {
    it('should calculate day difference', () => {
      expect(diffDays('2026-04-10', '2026-04-18')).toBe(8)
    })
  })

  describe('getStayDays', () => {
    it('should count admission day as 1', () => {
      expect(getStayDays('2026-04-10', '2026-04-18')).toBe(9)
    })

    it('should return 1 for same day', () => {
      expect(getStayDays('2026-04-18', '2026-04-18')).toBe(1)
    })
  })

  describe('isDateInRange', () => {
    it('should return true for date in range', () => {
      expect(isDateInRange('2026-04-15', '2026-04-10', '2026-04-20')).toBe(true)
    })

    it('should return true for boundary dates', () => {
      expect(isDateInRange('2026-04-10', '2026-04-10', '2026-04-20')).toBe(true)
      expect(isDateInRange('2026-04-20', '2026-04-10', '2026-04-20')).toBe(true)
    })

    it('should return false for out of range', () => {
      expect(isDateInRange('2026-04-09', '2026-04-10', '2026-04-20')).toBe(false)
    })
  })
})
