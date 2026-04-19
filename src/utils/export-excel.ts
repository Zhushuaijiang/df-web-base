/**
 * Excel 导出工具
 * 基于 ExcelJS + 原生 Blob，轻量替代 df-web-utils/packages/method/export2Excel
 */

import ExcelJS from 'exceljs'

export interface ExcelColumn {
  field: string
  title: string
  width?: number
  formatter?: (value: unknown, row: Record<string, unknown>) => string
}

/**
 * 将 JSON 数据导出为 CSV 文件（兼容 Excel 打开）
 * 不需要额外依赖，浏览器原生支持
 */
export function exportToCsv(
  columns: ExcelColumn[],
  data: Record<string, any>[],
  filename = 'export',
): void {
  const BOM = '\uFEFF'
  const header = columns.map((col) => escapeCsvField(col.title)).join(',')

  const rows = data.map((row) =>
    columns
      .map((col) => {
        const raw = row[col.field]
        const value = col.formatter ? col.formatter(raw, row) : raw
        return escapeCsvField(value == null ? '' : String(value))
      })
      .join(','),
  )

  const csv = BOM + [header, ...rows].join('\r\n')
  downloadBlob(csv, `${filename}.csv`, 'text/csv;charset=utf-8;')
}

/**
 * 将 JSON 数据导出为 XLSX 文件
 * 使用 ExcelJS 库生成，浏览器端无需额外依赖
 */
export async function exportToExcel(
  columns: ExcelColumn[],
  data: Record<string, any>[],
  filename = 'export',
  sheetName = 'Sheet1',
): Promise<void> {
  try {
    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet(sheetName)

    // 表头行
    const headerRow = worksheet.addRow(columns.map((col) => col.title))
    headerRow.font = { bold: true }

    // 数据行
    for (const row of data) {
      worksheet.addRow(
        columns.map((col) => {
          const raw = row[col.field]
          return col.formatter ? col.formatter(raw, row) : raw
        }),
      )
    }

    // 设置列宽
    worksheet.columns = columns.map((col) => ({
      width: col.width ?? Math.max(col.title.length * 2, 10),
    }))

    const buffer = await workbook.xlsx.writeBuffer()
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    })
    downloadUrl(URL.createObjectURL(blob), `${filename}.xlsx`)
  } catch {
    // ExcelJS 不可用时降级为 CSV
    console.warn('[df-web-base] ExcelJS 不可用, 降级为 CSV 导出')
    exportToCsv(columns, data, filename)
  }
}

function escapeCsvField(field: string): string {
  if (field.includes(',') || field.includes('"') || field.includes('\n')) {
    return `"${field.replace(/"/g, '""')}"`
  }
  return field
}

function downloadBlob(content: string, filename: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType })
  downloadUrl(URL.createObjectURL(blob), filename)
}

function downloadUrl(url: string, filename: string): void {
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.style.display = 'none'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
