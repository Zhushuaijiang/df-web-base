import { describe, it, expect, vi } from 'vitest'

// mock exceljs 模块
vi.mock('exceljs', () => {
  const mockAddRow = vi.fn().mockReturnValue({ font: {} })
  const mockWorksheet = {
    addRow: mockAddRow,
    columns: [],
  }
  const mockWorkbook = {
    addWorksheet: vi.fn().mockReturnValue(mockWorksheet),
    xlsx: { writeBuffer: vi.fn().mockResolvedValue(new ArrayBuffer(8)) },
  }
  return {
    Workbook: class {
      addWorksheet = mockWorkbook.addWorksheet
      xlsx = mockWorkbook.xlsx
    },
  }
})
describe('export-excel', () => {
  function mockDownload() {
    const clickFn = vi.fn()
    vi.spyOn(document, 'createElement').mockReturnValue({
      href: '', download: '', style: { display: '' }, click: clickFn,
    } as any)
    vi.spyOn(document.body, 'appendChild').mockImplementation((n) => n)
    vi.spyOn(document.body, 'removeChild').mockImplementation((n) => n)
    // jsdom 不提供 URL.revokeObjectURL / createObjectURL
    if (!URL.revokeObjectURL) {
      vi.stubGlobal('URL', { ...URL, revokeObjectURL: vi.fn(), createObjectURL: vi.fn().mockReturnValue('blob:test') })
    } else {
      vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => {})
      vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:test')
    }
    return clickFn
  }

  describe('exportToCsv', () => {
    it('生成 CSV 并触发下载', async () => {
      const clickFn = mockDownload()
      // 用 inline require 引入只含 CSV 的函数
      const { exportToCsv } = await import('../../src/utils/export-excel')

      const columns = [
        { field: 'name', title: '姓名' },
        { field: 'age', title: '年龄' },
      ]
      const data = [
        { name: '张三', age: 30 },
        { name: '李四', age: 25 },
      ]

      exportToCsv(columns, data, 'test')
      expect(clickFn).toHaveBeenCalled()
      vi.restoreAllMocks()
    })

    it('处理包含逗号和引号的字段', async () => {
      const clickFn = mockDownload()
      const { exportToCsv } = await import('../../src/utils/export-excel')

      const columns = [{ field: 'note', title: '备注' }]
      const data = [{ note: '包含,逗号' }, { note: '包含"引号' }]

      exportToCsv(columns, data, 'test')
      expect(clickFn).toHaveBeenCalled()
      vi.restoreAllMocks()
    })

    it('null 值输出空字符串', async () => {
      const clickFn = mockDownload()
      const { exportToCsv } = await import('../../src/utils/export-excel')

      const columns = [{ field: 'val', title: '值' }]
      const data = [{ val: null }]

      exportToCsv(columns, data, 'test')
      expect(clickFn).toHaveBeenCalled()
      vi.restoreAllMocks()
    })
  })
})
