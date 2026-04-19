import type { ExportColumnItem } from './types'
import type { Worksheet, Row, Cell } from 'exceljs'

interface ExcelExportOptions {
  /** 工作表名称 */
  sheetName?: string
  /** 文件名 */
  fileName: string
  /** 列配置 */
  columns: ExportColumnItem[]
  /** 数据行 */
  rows: Record<string, unknown>[]
  /** 分组字段 */
  groupByFields?: string[]
  /** 小计字段 */
  subtotalFields?: string[]
  /** 合计字段 */
  totalFields?: string[]
  /** 格式化行数据 */
  formatItem?: (row: Record<string, unknown>) => Record<string, unknown>
}

/**
 * 使用 exceljs 导出 Excel 文件
 * exceljs 通过动态 import 按需加载
 */
export async function exportToExcel(options: ExcelExportOptions): Promise<void> {
  const {
    sheetName = 'Sheet1',
    fileName,
    columns,
    rows,
    groupByFields = [],
    subtotalFields = [],
    totalFields = [],
    formatItem,
  } = options

  // 动态导入 exceljs 和 file-saver
  const [ExcelJS, { saveAs }] = await Promise.all([
    import('exceljs'),
    import('file-saver'),
  ])

  const workbook = new ExcelJS.Workbook()
  const worksheet = workbook.addWorksheet(sheetName)

  // 设置列
  worksheet.columns = columns.map((col) => ({
    header: col.caption,
    key: col.dataField,
    width: col.width ? col.width / 7 : 15,
  }))

  // 表头样式
  const headerRow = worksheet.getRow(1)
  headerRow.eachCell((cell: Cell) => {
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFF1F2F2' },
    }
    cell.font = { bold: true, size: 11 }
    cell.alignment = { vertical: 'middle', horizontal: 'center' }
    cell.border = {
      top: { style: 'thin', color: { argb: 'FFE3E3E3' } },
      left: { style: 'thin', color: { argb: 'FFE3E3E3' } },
      bottom: { style: 'thin', color: { argb: 'FFE3E3E3' } },
      right: { style: 'thin', color: { argb: 'FFE3E3E3' } },
    }
  })

  // 判断是否需要分组
  const hasGrouping = groupByFields.length > 0

  if (hasGrouping) {
    addGroupedRows(worksheet, columns, rows, groupByFields, subtotalFields, totalFields, formatItem)
  } else {
    addFlatRows(worksheet, columns, rows, formatItem)
  }

  // 添加合计行 (非分组模式)
  if (!hasGrouping && totalFields.length > 0) {
    addTotalRow(worksheet, columns, rows, totalFields)
  }

  // 导出
  const buffer = await workbook.xlsx.writeBuffer()
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  })
  saveAs(blob, `${fileName}.xlsx`)
}

/** 添加平铺数据行 */
function addFlatRows(
  worksheet: Worksheet,
  columns: ExportColumnItem[],
  rows: Record<string, unknown>[],
  formatItem?: (row: Record<string, unknown>) => Record<string, unknown>
): void {
  for (const row of rows) {
    const formatted = formatItem ? formatItem({ ...row }) : row
    const rowData: Record<string, unknown> = {}
    for (const col of columns) {
      rowData[col.dataField] = formatted[col.dataField] ?? ''
    }
    const excelRow = worksheet.addRow(rowData)
    styleDataRow(excelRow)
  }
}

/** 添加分组数据行 (含小计、合计) */
function addGroupedRows(
  worksheet: Worksheet,
  columns: ExportColumnItem[],
  rows: Record<string, unknown>[],
  groupByFields: string[],
  subtotalFields: string[],
  totalFields: string[],
  formatItem?: (row: Record<string, unknown>) => Record<string, unknown>
): void {
  const primaryGroup = groupByFields[0]
  if (!primaryGroup) return

  // 按分组字段分组
  const groups = new Map<string, Record<string, unknown>[]>()
  for (const row of rows) {
    const key = String(row[primaryGroup] ?? '')
    if (!groups.has(key)) {
      groups.set(key, [])
    }
    groups.get(key)!.push(row)
  }

  const grandTotals: Record<string, number> = {}

  for (const [groupKey, groupRows] of groups) {
    // 分组标题行
    const groupTitleRow = worksheet.addRow([`${groupKey}`])
    groupTitleRow.eachCell((cell: Cell) => {
      cell.font = { bold: true, size: 11 }
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFEEF2FF' },
      }
    })
    worksheet.mergeCells(groupTitleRow.number, 1, groupTitleRow.number, columns.length)

    // 数据行
    for (const row of groupRows) {
      const formatted = formatItem ? formatItem({ ...row }) : row
      const rowData: Record<string, unknown> = {}
      for (const col of columns) {
        rowData[col.dataField] = formatted[col.dataField] ?? ''
      }
      const excelRow = worksheet.addRow(rowData)
      styleDataRow(excelRow)
    }

    // 小计行
    if (subtotalFields.length > 0) {
      const subtotalData: Record<string, unknown> = {}
      for (const col of columns) {
        if (subtotalFields.includes(col.dataField)) {
          const sum = groupRows.reduce(
            (acc, r) => acc + (Number(r[col.dataField]) || 0),
            0
          )
          subtotalData[col.dataField] = sum
          grandTotals[col.dataField] = (grandTotals[col.dataField] || 0) + sum
        } else {
          subtotalData[col.dataField] = ''
        }
      }
      subtotalData[columns[0]!.dataField] = '小计'
      const subtotalRow = worksheet.addRow(subtotalData)
      styleSummaryRow(subtotalRow, 'FFFFF3E0')
    }
  }

  // 合计行
  if (totalFields.length > 0) {
    addTotalRow(worksheet, columns, rows, totalFields, grandTotals)
  }
}

/** 添加合计行 */
function addTotalRow(
  worksheet: Worksheet,
  columns: ExportColumnItem[],
  rows: Record<string, unknown>[],
  totalFields: string[],
  precomputedTotals?: Record<string, number>
): void {
  const totalData: Record<string, unknown> = {}
  for (const col of columns) {
    if (totalFields.includes(col.dataField)) {
      totalData[col.dataField] = precomputedTotals
        ? (precomputedTotals[col.dataField] || 0)
        : rows.reduce((acc, r) => acc + (Number(r[col.dataField]) || 0), 0)
    } else {
      totalData[col.dataField] = ''
    }
  }
  totalData[columns[0]!.dataField] = '合计'
  const totalRow = worksheet.addRow(totalData)
  styleSummaryRow(totalRow, 'FFFFEBEE')
}

/** 数据行样式 */
function styleDataRow(row: Row): void {
  row.eachCell((cell: Cell) => {
    cell.border = {
      top: { style: 'thin', color: { argb: 'FFE3E3E3' } },
      left: { style: 'thin', color: { argb: 'FFE3E3E3' } },
      bottom: { style: 'thin', color: { argb: 'FFE3E3E3' } },
      right: { style: 'thin', color: { argb: 'FFE3E3E3' } },
    }
    cell.alignment = { vertical: 'middle' }
  })
}

/** 汇总行样式 */
function styleSummaryRow(row: Row, bgColor: string): void {
  row.eachCell((cell: Cell) => {
    cell.font = { bold: true }
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: bgColor },
    }
    cell.border = {
      top: { style: 'thin', color: { argb: 'FFE3E3E3' } },
      left: { style: 'thin', color: { argb: 'FFE3E3E3' } },
      bottom: { style: 'thin', color: { argb: 'FFE3E3E3' } },
      right: { style: 'thin', color: { argb: 'FFE3E3E3' } },
    }
  })
}
