import { describe, it, expect } from 'vitest'
import {
  findCurrentItem,
  checkDiffColumn,
  parseLocalColumn,
  isNullOrUndefined,
} from '../../src/components/df-export-btn/export-utils'

describe('export-utils', () => {
  describe('findCurrentItem', () => {
    const list = [
      { viewName: 'v1', fanWei: 1, columnJson: '[]' },
      { viewName: 'v1', fanWei: 2, columnJson: '[]' },
      { viewName: 'v1', fanWei: 3, columnJson: '[]' },
      { viewName: 'v2', fanWei: 1, columnJson: '[]' },
    ] as any[]

    it('优先返回 fanWei=3 个人配置', () => {
      const result = findCurrentItem(list, 'v1')
      expect(result?.fanWei).toBe(3)
    })

    it('无个人配置返回科室', () => {
      const result = findCurrentItem(
        list.filter(i => i.fanWei !== 3),
        'v1',
      )
      expect(result?.fanWei).toBe(2)
    })

    it('仅有系统配置', () => {
      const result = findCurrentItem(
        list.filter(i => i.fanWei === 1),
        'v1',
      )
      expect(result?.fanWei).toBe(1)
    })

    it('无匹配返回 undefined', () => {
      const result = findCurrentItem(list, 'not-exist')
      expect(result).toBeUndefined()
    })
  })

  describe('checkDiffColumn', () => {
    it('长度不同返回 true', () => {
      expect(checkDiffColumn(
        [{ dataField: 'a', caption: 'A' }] as any,
        [] as any,
      )).toBe(true)
    })

    it('字段不同返回 true', () => {
      expect(checkDiffColumn(
        [{ dataField: 'a', caption: 'A' }] as any,
        [{ dataField: 'b', caption: 'B' }] as any,
      )).toBe(true)
    })

    it('标题不同返回 true', () => {
      expect(checkDiffColumn(
        [{ dataField: 'a', caption: 'A' }] as any,
        [{ dataField: 'a', caption: 'AA' }] as any,
      )).toBe(true)
    })

    it('相同返回 false', () => {
      expect(checkDiffColumn(
        [{ dataField: 'a', caption: 'A' }] as any,
        [{ dataField: 'a', caption: 'A' }] as any,
      )).toBe(false)
    })
  })

  describe('parseLocalColumn', () => {
    it('解析合法 JSON', () => {
      const result = parseLocalColumn('[{"dataField":"a"}]')
      expect(result).toEqual([{ dataField: 'a' }])
    })

    it('null 返回空数组', () => {
      expect(parseLocalColumn(null)).toEqual([])
    })

    it('undefined 返回空数组', () => {
      expect(parseLocalColumn(undefined)).toEqual([])
    })

    it('空字符串返回空数组', () => {
      expect(parseLocalColumn('')).toEqual([])
    })

    it('非法 JSON 返回空数组', () => {
      expect(parseLocalColumn('{invalid}')).toEqual([])
    })

    it('非数组 JSON 返回空数组', () => {
      expect(parseLocalColumn('{"a":1}')).toEqual([])
    })
  })

  describe('isNullOrUndefined', () => {
    it('null 返回 true', () => expect(isNullOrUndefined(null)).toBe(true))
    it('undefined 返回 true', () => expect(isNullOrUndefined(undefined)).toBe(true))
    it('0 返回 false', () => expect(isNullOrUndefined(0)).toBe(false))
    it('空字符串返回 false', () => expect(isNullOrUndefined('')).toBe(false))
  })
})
