import { describe, it, expect } from 'vitest'
import { getSummaries } from '../../src/utils/table-summary'

describe('table-summary', () => {
  const columns = [
    { property: 'name', label: '名称' },
    { property: 'amount', label: '金额' },
    { property: 'count', label: '数量' },
    { property: 'remark', label: '备注' },
  ]

  const data = [
    { name: 'A', amount: 100.5, count: 3, remark: '' },
    { name: 'B', amount: 200.3, count: 5, remark: '' },
    { name: 'C', amount: 50, count: 2, remark: '' },
  ]

  it('计算汇总行', () => {
    const result = getSummaries({
      columns,
      data,
      sumFields: ['amount', 'count'],
    })
    expect(result).toEqual(['合计', '350.80', '10.00', ''])
  })

  it('首列显示自定义标题', () => {
    const result = getSummaries({
      columns,
      data,
      sumFields: ['amount'],
      title: '总计',
    })
    expect(result[0]).toBe('总计')
  })

  it('自定义小数位', () => {
    const result = getSummaries({
      columns,
      data,
      sumFields: ['amount'],
      decimals: 4,
    })
    expect(result[1]).toBe('350.8000')
  })

  it('非汇总列返回空字符串', () => {
    const result = getSummaries({
      columns,
      data,
      sumFields: ['amount'],
    })
    expect(result[2]).toBe('')
    expect(result[3]).toBe('')
  })

  it('数据中含非数值时跳过', () => {
    const mixedData = [
      { name: 'A', amount: 100, count: 'abc' },
      { name: 'B', amount: 200, count: 5 },
    ]
    const result = getSummaries({
      columns,
      data: mixedData,
      sumFields: ['amount', 'count'],
    })
    expect(result[1]).toBe('300.00')
    expect(result[2]).toBe('5.00')
  })
})
