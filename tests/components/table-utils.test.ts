import { describe, it, expect } from 'vitest'
import {
  isEmpty,
  isEmptyMore,
  makeUpColumn,
  applyColumnConfig,
  formatCellStyleByCondition,
  formatRowStyleByCondition,
  parseIndex,
  bindMenuRowData,
} from '../../src/components/df-table/table-utils'

describe('table-utils', () => {
  // ─── isEmpty / isEmptyMore ──────
  describe('isEmpty', () => {
    it('null 返回 true', () => expect(isEmpty(null)).toBe(true))
    it('undefined 返回 true', () => expect(isEmpty(undefined)).toBe(true))
    it('空字符串返回 false', () => expect(isEmpty('')).toBe(false))
    it('0 返回 false', () => expect(isEmpty(0)).toBe(false))
  })

  describe('isEmptyMore', () => {
    it('空字符串返回 true', () => expect(isEmptyMore('')).toBe(true))
    it('null 返回 true', () => expect(isEmptyMore(null)).toBe(true))
    it('非空字符串返回 false', () => expect(isEmptyMore('a')).toBe(false))
  })

  // ─── makeUpColumn ──────
  describe('makeUpColumn', () => {
    it('宽度 <= 20 清除', () => {
      const col = makeUpColumn({ dataField: 'a', width: 15 })
      expect(col.width).toBeUndefined()
    })
    it('宽度 > 20 保留', () => {
      const col = makeUpColumn({ dataField: 'a', width: 100 })
      expect(col.width).toBe(100)
    })
    it('不改变原对象（不可变）', () => {
      const src = { dataField: 'a', width: 10 }
      const col = makeUpColumn(src)
      expect(src.width).toBe(10)
      expect(col.width).toBeUndefined()
    })
  })

  // ─── applyColumnConfig ──────
  describe('applyColumnConfig', () => {
    const baseColumns = [
      { dataField: 'name', caption: '姓名' },
      { dataField: 'age', caption: '年龄' },
    ]

    it('无配置项返回原列', () => {
      const result = applyColumnConfig(baseColumns, [])
      expect(result).toBe(baseColumns)
    })

    it('覆盖标题', () => {
      const result = applyColumnConfig(baseColumns, [
        { fieldName: 'name', caption: '名称', visible: 1 } as any,
      ])
      expect(result.find(c => c.dataField === 'name')!.caption).toBe('名称')
    })

    it('设置可见性', () => {
      const result = applyColumnConfig(baseColumns, [
        { fieldName: 'name', visible: 0 } as any,
      ])
      expect(result.find(c => c.dataField === 'name')!.visible).toBe(false)
    })

    it('设置宽度 (>20)', () => {
      const result = applyColumnConfig(baseColumns, [
        { fieldName: 'name', width: 200 } as any,
      ])
      expect(result.find(c => c.dataField === 'name')!.width).toBe(200)
    })

    it('宽度 <= 20 不设置', () => {
      const result = applyColumnConfig(baseColumns, [
        { fieldName: 'name', width: 10 } as any,
      ])
      expect(result.find(c => c.dataField === 'name')!.width).toBeUndefined()
    })

    it('设置对齐', () => {
      const result = applyColumnConfig(baseColumns, [
        { fieldName: 'name', cellHAlignMent: 3 } as any,
      ])
      expect(result.find(c => c.dataField === 'name')!.alignment).toBe('right')
    })

    it('设置排序', () => {
      const result = applyColumnConfig(baseColumns, [
        { fieldName: 'name', sortable: 1 } as any,
      ])
      expect(result.find(c => c.dataField === 'name')!.allowSorting).toBe(true)
    })

    it('按 sortNo 排序', () => {
      const result = applyColumnConfig(baseColumns, [
        { fieldName: 'name', sortNo: 2 } as any,
        { fieldName: 'age', sortNo: 1 } as any,
      ])
      expect(result[0]!.dataField).toBe('age')
      expect(result[1]!.dataField).toBe('name')
    })

    it('数值格式化', () => {
      const result = applyColumnConfig(
        [{ dataField: 'amount', caption: '金额' }],
        [{ fieldName: 'amount', formatType: 1, formatString: '{"precision":2}' } as any],
      )
      expect(result[0]!.format).toEqual({ precision: 2 })
    })

    it('日期格式化', () => {
      const result = applyColumnConfig(
        [{ dataField: 'date', caption: '日期' }],
        [{ fieldName: 'date', formatType: 2, formatString: 'YYYY-MM-DD' } as any],
      )
      expect(result[0]!.customizeText).toBeDefined()
      // 验证 customizeText 可调用
      const text = result[0]!.customizeText!({ valueText: '2024-01-15T10:30:00' } as any)
      expect(text).toBe('2024-01-15')
    })

    it('日期格式化 - 空值', () => {
      const result = applyColumnConfig(
        [{ dataField: 'date', caption: '日期' }],
        [{ fieldName: 'date', formatType: 2, formatString: 'YYYY-MM-DD' } as any],
      )
      const text = result[0]!.customizeText!({ valueText: '' } as any)
      expect(text).toBe('')
    })

    it('布尔格式化', () => {
      const result = applyColumnConfig(
        [{ dataField: 'active', caption: '启用' }],
        [{ fieldName: 'active', formatType: 4, formatString: '{"trueText":"是","falseText":"否"}' } as any],
      )
      expect(result[0]!.trueText).toBe('是')
      expect(result[0]!.falseText).toBe('否')
      expect(result[0]!.dataType).toBe('boolean')
    })

    it('自定义格式化 - normal 类型', () => {
      const customConfig = {
        type: 'normal',
        value: [{ value: '{"objectKey":"1","objectValue":"男"}' }, { value: '{"objectKey":"2","objectValue":"女"}' }],
      }
      const result = applyColumnConfig(
        [{ dataField: 'gender', caption: '性别' }],
        [{ fieldName: 'gender', formatType: 3, formatString: JSON.stringify(customConfig) } as any],
      )
      expect(result[0]!.customizeText).toBeDefined()
      const text = result[0]!.customizeText!({ valueText: '1' } as any)
      expect(text).toBe('男')
    })

    it('自定义格式化 - 未匹配值返回原值', () => {
      const customConfig = {
        type: 'normal',
        value: [{ value: '{"objectKey":"1","objectValue":"男"}' }],
      }
      const result = applyColumnConfig(
        [{ dataField: 'gender', caption: '性别' }],
        [{ fieldName: 'gender', formatType: 3, formatString: JSON.stringify(customConfig) } as any],
      )
      const text = result[0]!.customizeText!({ valueText: '99' } as any)
      expect(text).toBe('99')
    })
  })

  // ─── formatCellStyleByCondition ──────
  describe('formatCellStyleByCondition', () => {
    function makeCell(value: any) {
      const cellElement = document.createElement('td')
      return {
        cellInfo: { cellElement, data: { score: value }, column: { dataField: 'score' } },
        cellElement,
      }
    }

    it('无配置不修改', () => {
      const { cellInfo, cellElement } = makeCell(90)
      formatCellStyleByCondition(cellInfo, { dataField: 'score' })
      expect(cellElement.style.color).toBe('')
    })

    it('like 匹配设置颜色', () => {
      const { cellInfo, cellElement } = makeCell('已完成')
      formatCellStyleByCondition(cellInfo, {
        dataField: 'score',
        cellConfig: { configs: [{ type: 'like', value: '完成', color: 'green' }] },
      } as any)
      expect(cellElement.style.color).toBe('green')
    })

    it('!like 不包含匹配', () => {
      const { cellInfo, cellElement } = makeCell('待处理')
      formatCellStyleByCondition(cellInfo, {
        dataField: 'score',
        cellConfig: { configs: [{ type: '!like', value: '完成', color: 'red' }] },
      } as any)
      expect(cellElement.style.color).toBe('red')
    })

    it('n_eq 数值等于', () => {
      const { cellInfo, cellElement } = makeCell(100)
      formatCellStyleByCondition(cellInfo, {
        dataField: 'score',
        cellConfig: { configs: [{ type: 'n_eq', value: 100, color: 'blue' }] },
      } as any)
      expect(cellElement.style.color).toBe('blue')
    })

    it('n_gt 大于', () => {
      const { cellInfo, cellElement } = makeCell(90)
      formatCellStyleByCondition(cellInfo, {
        dataField: 'score',
        cellConfig: { configs: [{ type: 'n_gt', value: 80, color: 'green' }] },
      } as any)
      expect(cellElement.style.color).toBe('green')
    })

    it('n_lt 小于', () => {
      const { cellInfo, cellElement } = makeCell(30)
      formatCellStyleByCondition(cellInfo, {
        dataField: 'score',
        cellConfig: { configs: [{ type: 'n_lt', value: 60, color: 'red' }] },
      } as any)
      expect(cellElement.style.color).toBe('red')
    })

    it('n_between 区间', () => {
      const { cellInfo, cellElement } = makeCell(75)
      formatCellStyleByCondition(cellInfo, {
        dataField: 'score',
        cellConfig: { configs: [{ type: 'n_between', value: 60, maxValue: 80, color: 'orange' }] },
      } as any)
      expect(cellElement.style.color).toBe('orange')
    })

    it('t_gt 日期大于', () => {
      const { cellInfo, cellElement } = makeCell('2024-06-01')
      formatCellStyleByCondition(cellInfo, {
        dataField: 'score',
        cellConfig: { configs: [{ type: 't_gt', value: '2024-01-01', bgColor: '#ff0' }] },
      } as any)
      expect(cellElement.style.backgroundColor).toBe('rgb(255, 255, 0)')
    })

    it('t_lt 日期小于', () => {
      const { cellInfo, cellElement } = makeCell('2023-01-01')
      formatCellStyleByCondition(cellInfo, {
        dataField: 'score',
        cellConfig: { configs: [{ type: 't_lt', value: '2024-01-01', color: 'gray' }] },
      } as any)
      expect(cellElement.style.color).toBe('gray')
    })

    it('t_between 日期区间', () => {
      const { cellInfo, cellElement } = makeCell('2024-06-15')
      formatCellStyleByCondition(cellInfo, {
        dataField: 'score',
        cellConfig: { configs: [{ type: 't_between', value: '2024-01-01', maxValue: '2024-12-31', color: 'purple' }] },
      } as any)
      expect(cellElement.style.color).toBe('purple')
    })

    it('第一个匹配的条件生效', () => {
      const { cellInfo, cellElement } = makeCell(90)
      formatCellStyleByCondition(cellInfo, {
        dataField: 'score',
        cellConfig: {
          configs: [
            { type: 'n_gt', value: 80, color: 'green' },
            { type: 'n_gt', value: 50, color: 'blue' },
          ],
        },
      } as any)
      expect(cellElement.style.color).toBe('green')
    })
  })

  // ─── formatRowStyleByCondition ──────
  describe('formatRowStyleByCondition', () => {
    it('data 行应用样式', () => {
      const rowElement = document.createElement('tr')
      formatRowStyleByCondition({
        event: { data: { id: 1 }, rowElement, rowType: 'data' },
        rowStyles: { styles: { 'background-color': '#fafafa' } },
      })
      expect(rowElement.style.backgroundColor).toBe('rgb(250, 250, 250)')
    })

    it('非 data 行不应用', () => {
      const rowElement = document.createElement('tr')
      formatRowStyleByCondition({
        event: { data: { id: 1 }, rowElement, rowType: 'header' },
        rowStyles: { styles: { 'background-color': 'red' } },
      })
      expect(rowElement.style.backgroundColor).toBe('')
    })

    it('无 rowStyles 不报错', () => {
      const rowElement = document.createElement('tr')
      expect(() =>
        formatRowStyleByCondition({
          event: { data: { id: 1 }, rowElement, rowType: 'data' },
        }),
      ).not.toThrow()
    })
  })

  // ─── parseIndex ──────
  describe('parseIndex', () => {
    it('添加行号', () => {
      const data = [{ name: 'a' }, { name: 'b' }]
      const result = parseIndex(data)
      expect(result[0]!.__index).toBe(1)
      expect(result[1]!.__index).toBe(2)
    })
    it('空数组返回空', () => {
      expect(parseIndex([])).toEqual([])
    })
    it('不改变原数组', () => {
      const data = [{ name: 'a' }]
      const result = parseIndex(data)
      expect(data[0]).not.toHaveProperty('__index')
      expect(result[0]).toHaveProperty('__index')
    })
  })

  // ─── bindMenuRowData ──────
  describe('bindMenuRowData', () => {
    it('绑定行数据到 onItemClick', () => {
      let captured: any = null
      const menu = { onItemClick: (_e: any, row?: any) => { captured = row } }
      const row = { id: 1, name: '测试' }
      bindMenuRowData(menu, row)
      menu.onItemClick({}, undefined)
      expect(captured).toEqual(row)
    })

    it('递归绑定子菜单', () => {
      let captured: any = null
      const menu = {
        items: [
          { onItemClick: (_e: any, row?: any) => { captured = row } },
        ],
      }
      const row = { id: 2 }
      bindMenuRowData(menu, row)
      menu.items[0]!.onItemClick({}, undefined)
      expect(captured).toEqual(row)
    })
  })
})
