/**
 * 表格汇总行计算
 * 来源: df-web-utils/packages/method/index.js getSummaries
 */

interface SummaryColumn {
  /** 字段名 */
  property: string
  /** 列标题 */
  label?: string
}

interface SummaryOptions {
  /** 列配置 */
  columns: SummaryColumn[]
  /** 数据行 */
  data: Record<string, unknown>[]
  /** 需要汇总的字段列表 */
  sumFields: string[]
  /** 汇总标题 (默认 "合计") */
  title?: string
  /** 小数位数 (默认 2) */
  decimals?: number
}

/**
 * 计算表格汇总行
 * 用于 Element Plus / DevExtreme 表格的 footer 汇总
 *
 * @returns 汇总值数组, 与列顺序一致
 */
export function getSummaries(options: SummaryOptions): string[] {
  const {
    columns,
    data,
    sumFields,
    title = '合计',
    decimals = 2,
  } = options

  return columns.map((column, index) => {
    if (index === 0) return title

    if (!sumFields.includes(column.property)) return ''

    const sum = data.reduce((acc, row) => {
      const value = Number(row[column.property])
      return Number.isNaN(value) ? acc : acc + value
    }, 0)

    return sum.toFixed(decimals)
  })
}
