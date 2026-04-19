import { describe, it, expect } from 'vitest'
import { filterValueByKey, filterMultiValueByKey, listToMap } from '../../src/utils/filters'

const dictList = [
  { value: '1', label: '男' },
  { value: '2', label: '女' },
  { value: '3', label: '未知' },
]

describe('filters', () => {
  describe('filterValueByKey', () => {
    it('匹配到值时返回 label', () => {
      expect(filterValueByKey('1', dictList)).toBe('男')
      expect(filterValueByKey('2', dictList)).toBe('女')
    })

    it('数字也能匹配', () => {
      expect(filterValueByKey(1, dictList)).toBe('男')
    })

    it('未匹配返回原值', () => {
      expect(filterValueByKey('9', dictList)).toBe('9')
    })

    it('null / undefined / 空串返回空', () => {
      expect(filterValueByKey(null, dictList)).toBe('')
      expect(filterValueByKey(undefined, dictList)).toBe('')
      expect(filterValueByKey('', dictList)).toBe('')
    })

    it('自定义 key', () => {
      const list = [{ code: 'A', name: '甲' }, { code: 'B', name: '乙' }]
      expect(filterValueByKey('A', list, 'code', 'name')).toBe('甲')
    })
  })

  describe('filterMultiValueByKey', () => {
    it('翻译逗号分隔的多个值', () => {
      expect(filterMultiValueByKey('1,2', dictList)).toBe('男,女')
    })

    it('空值返回空', () => {
      expect(filterMultiValueByKey(null, dictList)).toBe('')
      expect(filterMultiValueByKey(undefined, dictList)).toBe('')
      expect(filterMultiValueByKey('', dictList)).toBe('')
    })

    it('自定义分隔符', () => {
      expect(filterMultiValueByKey('1|2', dictList, 'value', 'label', '|')).toBe('男|女')
    })
  })

  describe('listToMap', () => {
    it('将列表转为 Map', () => {
      const map = listToMap(dictList)
      expect(map.get('1')).toBe('男')
      expect(map.get('2')).toBe('女')
      expect(map.size).toBe(3)
    })

    it('自定义 key', () => {
      const list = [{ id: 10, text: 'hello' }]
      const map = listToMap(list, 'id', 'text')
      expect(map.get('10')).toBe('hello')
    })
  })
})
