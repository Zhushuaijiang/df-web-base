import type { ExportColumnItem, ColumnLayoutDto } from './types'

/** 字段映射表 */
const fieldMap: Record<string, string> = {
  columnJson: 'columnJson',
  viewName: 'viewName',
  fanWei: 'fanWei',
  id: 'id',
}

/**
 * 从列配置列表中按优先级查找当前配置
 * 优先级: fanWei 3 (个人) > 2 (科室) > 1 (系统)
 */
export function findCurrentItem(
  list: ColumnLayoutDto[],
  viewName: string
): ColumnLayoutDto | undefined {
  const filtered = list.filter((item) => item[fieldMap.viewName as keyof ColumnLayoutDto] === viewName)
  const priorities = [3, 2, 1]

  for (const priority of priorities) {
    const found = filtered.find(
      (item) => item[fieldMap.fanWei as keyof ColumnLayoutDto] === priority
    )
    if (found) return found
  }

  return filtered[0]
}

/**
 * 检查列差异
 * 对比已保存列配置与当前表格列, 返回是否有差异
 */
export function checkDiffColumn(
  savedColumns: ExportColumnItem[],
  currentColumns: ExportColumnItem[]
): boolean {
  if (savedColumns.length !== currentColumns.length) return true

  return savedColumns.some((saved, index) => {
    const current = currentColumns[index]
    return (
      saved.dataField !== current?.dataField ||
      saved.caption !== current?.caption
    )
  })
}

/**
 * 解析本地列配置 JSON
 */
export function parseLocalColumn(jsonStr: string | null | undefined): ExportColumnItem[] {
  if (!jsonStr) return []

  try {
    const parsed = JSON.parse(jsonStr)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

/**
 * 判断值是否为 null 或 undefined
 */
export function isNullOrUndefined(value: unknown): value is null | undefined {
  return value === null || value === undefined
}
