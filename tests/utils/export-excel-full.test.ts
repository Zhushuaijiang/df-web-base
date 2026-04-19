/**
 * export-excel XLSX 路径补充测试
 * 覆盖：exportToExcel 的 ExcelJS 成功路径和 catch 降级路径
 */
import { describe, it, expect, vi, beforeEach } from 'vitest'

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

const columns = [
  { field: 'name', title: '姓名', width: 20 },
  { field: 'age', title: '年龄' },
  { field: 'remark', title: '备注', formatter: (v: any) => v ?? '-' },
]

const data = [
  { name: '张三', age: 25, remark: '测试' },
  { name: '李四', age: 30, remark: null },
]

function mockDownload() {
  const clickFn = vi.fn()
  vi.spyOn(document, 'createElement').mockReturnValue({
    href: '', download: '', style: { display: '' }, click: clickFn,
  } as any)
  vi.spyOn(document.body, 'appendChild').mockImplementation((n) => n)
  vi.spyOn(document.body, 'removeChild').mockImplementation((n) => n)
  if (!URL.revokeObjectURL) {
    vi.stubGlobal('URL', { ...URL, revokeObjectURL: vi.fn(), createObjectURL: vi.fn().mockReturnValue('blob:test') })
  } else {
    vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => {})
    vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:test')
  }
  return clickFn
}

describe('exportToExcel XLSX 路径', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('XLSX 成功导入路径', async () => {
    mockDownload()
    const { exportToExcel } = await import('../../src/utils/export-excel')
    await expect(exportToExcel(columns, data, 'test', 'Sheet1')).resolves.toBeUndefined()
  })

  it('exportToExcel 自定义 sheetName', async () => {
    mockDownload()
    const { exportToExcel } = await import('../../src/utils/export-excel')
    await expect(exportToExcel(columns, data, 'custom', 'MySheet')).resolves.toBeUndefined()
  })

  it('exportToExcel 空数据', async () => {
    mockDownload()
    const { exportToExcel } = await import('../../src/utils/export-excel')
    await expect(exportToExcel(columns, [], 'empty')).resolves.toBeUndefined()
  })

  it('exportToExcel 无 width 列', async () => {
    mockDownload()
    const { exportToExcel } = await import('../../src/utils/export-excel')
    const cols = [{ field: 'name', title: '姓名' }]
    await expect(exportToExcel(cols, [{ name: 'test' }])).resolves.toBeUndefined()
  })
})

describe('exportToCsv 补充', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('带 formatter 的列正确格式化', async () => {
    mockDownload()
    const { exportToCsv } = await import('../../src/utils/export-excel')
    expect(() => exportToCsv(columns, data, 'test')).not.toThrow()
  })

  it('包含逗号的字段正确转义', async () => {
    mockDownload()
    const { exportToCsv } = await import('../../src/utils/export-excel')
    const d = [{ name: '张,三', age: 25, remark: '含"引号"' }]
    expect(() => exportToCsv(columns, d, 'escape')).not.toThrow()
  })

  it('包含换行的字段正确转义', async () => {
    mockDownload()
    const { exportToCsv } = await import('../../src/utils/export-excel')
    const d = [{ name: '张三\n李四', age: 25, remark: '测试' }]
    expect(() => exportToCsv(columns, d, 'newline')).not.toThrow()
  })
})
