/**
 * df-table 工具函数
 * 对标 df-web-bui dx-table/src/utils.js，去除对外部包的直接依赖
 */
import type {
  DfTableColumn,
  ColumnConfigItem,
  CellConditionConfig,
  RowStyleConfig,
  MenuItemConfig,
} from './types'
import type { DxCellPreparedEvent, DxColumnFormat, DxRowPreparedEvent } from '../../types/devextreme'

// ─── 基础工具 ──────────────────────────────────────────────────────────

export const isEmpty = (value: unknown): value is undefined | null =>
  value === undefined || value === null

export const isEmptyMore = (value: unknown): boolean =>
  isEmpty(value) || value === ''

/** 安全解析 JSON 字符串 */
function safeParseJson<T = Record<string, any>>(value: unknown, fallback: T): T {
  if (value === null || value === undefined) return fallback
  if (typeof value !== 'string') return value as T
  try {
    return JSON.parse(value)
  } catch {
    return fallback
  }
}

// ─── 对齐方式映射 ────────────────────────────────────────────────────

const ALIGNMENT_MAP: Record<number, string | undefined> = {
  0: undefined, // 默认
  1: 'left',
  2: 'center',
  3: 'right',
}

// ─── 列标准化 ──────────────────────────────────────────────────────────

/**
 * 标准化列配置，对应 dx-table utils.js 的 makeUpColumn
 * 根据 ColumnConfigItem 增强 DfTableColumn
 */
export function makeUpColumn(column: DfTableColumn): DfTableColumn {
  const result = { ...column }

  if (!result.cellTemplate && result.cellSlot) {
    result.cellTemplate = result.cellSlot
  }

  if (!result.cellTemplate && result.innerColumnTemplate) {
    result.cellTemplate = result.innerColumnTemplate
  }

  if (!result.headerCellTemplate && result.headerSlot) {
    result.headerCellTemplate = result.headerSlot
  }

  if (!result.editCellTemplate && result.editSlot) {
    result.editCellTemplate = result.editSlot
  }

  if (result.showInColumnChooser === undefined) {
    result.showInColumnChooser = result.visible !== false
  }

  if (result.allowExporting === undefined) {
    result.allowExporting = result.dataField !== '__action'
  }

  // 宽度为 <=20 视为自动宽度
  if (typeof result.width === 'number' && result.width <= 20) {
    delete result.width
  }

  return result
}

/**
 * 应用云端列配置到业务列定义
 * 对应 dx-table gridViewColumnsLayout.js 的 applyColumnConfigPure
 */
export function applyColumnConfig(
  businessColumns: DfTableColumn[],
  configItems: ColumnConfigItem[],
): DfTableColumn[] {
  if (!configItems.length) return businessColumns

  return businessColumns
    .map((col) => {
      const config = configItems.find((c) => c.fieldName === col.dataField)
      if (!config) return col

      const merged: DfTableColumn = { ...col }

      // 可见性
      if (config.visible !== undefined) {
        merged.visible = config.visible === 1
      }

      // 宽度
      if (config.width && config.width > 20) {
        merged.width = config.width
      }

      // 标题覆盖
      if (config.caption) {
        merged.caption = config.caption
      }

      // 对齐
      if (config.cellHAlignMent) {
        const alignment = ALIGNMENT_MAP[config.cellHAlignMent]
        if (alignment) merged.alignment = alignment as any
      }

      // 排序
      if (config.sortable !== undefined) {
        merged.allowSorting = config.sortable === 1
      }

      // 排序索引（列顺序）
      if (config.sortNo !== undefined) {
        merged.visibleIndex = config.sortNo
      }

      // 格式化
      applyFormatType(merged, config)

      return merged
    })
    .sort((a, b) => (a.visibleIndex ?? 0) - (b.visibleIndex ?? 0))
}

/**
 * 应用格式化类型（数值、日期、自定义、布尔）
 * 对应 dx-table utils.js 的 formatDataType
 */
function applyFormatType(column: DfTableColumn, config: ColumnConfigItem): void {
  const { formatType, formatString } = config
  if (isEmpty(formatType) || !formatString) return

  switch (formatType) {
    case 1: // 数值类型
      applyNumberFormat(column, formatString)
      break
    case 2: // 日期类型
      applyDateFormat(column, formatString)
      break
    case 3: // 自定义类型
      applyCustomFormat(column, formatString)
      break
    case 4: // 布尔类型
      applyBooleanFormat(column, formatString)
      break
  }
}

function applyNumberFormat(column: DfTableColumn, formatString: string): void {
  const obj = safeParseJson<Record<string, unknown>>(formatString, {})
  const base = typeof column.format === 'object' && column.format ? column.format : {}
  column.format = { ...base, ...obj } as DxColumnFormat
}

function applyDateFormat(column: DfTableColumn, formatString: string): void {
  column.customizeText = ({ valueText }) => {
    if (!valueText) return valueText
    try {
      const date = new Date(valueText)
      // 使用 Intl 做基础格式化，业务层可通过 DfUIOptions 注入更强的 formatter
      return formatDateSimple(date, formatString)
    } catch {
      return valueText
    }
  }
}

function applyCustomFormat(column: DfTableColumn, formatString: string): void {
  const obj = safeParseJson<{ type?: string; value?: any }>(formatString, {})
  if (!obj.type) return

  if (obj.type === 'normal' && Array.isArray(obj.value)) {
    const keyList = obj.value
      .filter((el: any) => el.value)
      .map((e: any) => safeParseJson(e.value, e.value))

    column.customizeText = ({ valueText }) => {
      const found = keyList.find((el: any) => el.objectKey === valueText)
      return found?.objectValue ?? valueText
    }
  }
  // 注意：dx-table 的「高级模式」使用 eval()，这里出于安全考虑不移植
}

function applyBooleanFormat(column: DfTableColumn, formatString: string): void {
  const obj = safeParseJson<{ trueText?: string; falseText?: string }>(formatString, {})
  column.trueText = obj.trueText
  column.falseText = obj.falseText
  column.dataType = 'boolean'
  column.showEditorAlways = false
}

/**
 * 简易日期格式化（避免引入 dayjs/moment 依赖）
 * 支持 YYYY, MM, DD, HH, mm, ss 占位符
 */
function formatDateSimple(date: Date, format: string): string {
  const pad = (n: number) => String(n).padStart(2, '0')
  return format
    .replace('YYYY', String(date.getFullYear()))
    .replace('MM', pad(date.getMonth() + 1))
    .replace('DD', pad(date.getDate()))
    .replace('HH', pad(date.getHours()))
    .replace('mm', pad(date.getMinutes()))
    .replace('ss', pad(date.getSeconds()))
}

// ─── 单元格条件样式 ────────────────────────────────────────────────

/**
 * 根据列的 cellConfig 条件设置单元格样式
 * 对应 dx-table utils.js 的 formatCellStyleByCondition
 */
export function formatCellStyleByCondition(
  cellInfo: DxCellPreparedEvent,
  column: DfTableColumn & { cellConfig?: { configs: CellConditionConfig[] } },
): void {
  const configs = column.cellConfig?.configs
  if (!configs?.length) return

  const { cellElement, data } = cellInfo
  const dataField = cellInfo.column?.dataField
  if (!cellElement || !data || !dataField) return
  const cellValue = data[dataField]

  for (const condition of configs) {
    if (matchCondition(cellValue, condition)) {
      if (condition.color) {
        cellElement.style.color = condition.color
      }
      if (condition.bgColor) {
        cellElement.style.backgroundColor = condition.bgColor
      }
      break // 第一个匹配的条件生效
    }
  }
}

/**
 * 根据行级条件设置行样式
 * 对应 dx-table utils.js 的 formatRowStyleByCondition
 */
export function formatRowStyleByCondition(params: {
  event: DxRowPreparedEvent
  rowStyles?: RowStyleConfig
  rowExpression?: string
}): void {
  const { event, rowStyles } = params
  if (event.rowType !== 'data' || !event.data || !event.rowElement) return

  if (rowStyles?.styles && typeof rowStyles.styles === 'object') {
    for (const [key, value] of Object.entries(rowStyles.styles)) {
      if (value) {
        event.rowElement.style.setProperty(key, String(value))
      }
    }
  }
  // 注意：dx-table 的 rowExpression 使用 eval()，出于安全考虑不移植
}

/** 匹配条件表达式 */
function matchCondition(value: unknown, condition: CellConditionConfig): boolean {
  const { type } = condition

  if (type === 'like') {
    return String(value ?? '').includes(String(condition.value ?? ''))
  }
  if (type === '!like') {
    return !String(value ?? '').includes(String(condition.value ?? ''))
  }

  const numValue = Number(value)
  const condValue = Number(condition.value)

  if (type === 'n_eq') return numValue === condValue
  if (type === 'n_gt') return numValue > condValue
  if (type === 'n_lt') return numValue < condValue
  if (type === 'n_between') {
    return numValue >= condValue && numValue <= Number(condition.maxValue)
  }

  // 日期比较
  if (type === 't_gt' || type === 't_lt' || type === 't_between') {
    const dateValue = new Date(value as string | number | Date).getTime()
    const condDate = new Date(condition.value as string | number | Date).getTime()
    if (type === 't_gt') return dateValue > condDate
    if (type === 't_lt') return dateValue < condDate
    if (type === 't_between') {
      return dateValue >= condDate && dateValue <= new Date(condition.maxValue as string | number | Date).getTime()
    }
  }

  return false
}

// ─── 序号处理 ──────────────────────────────────────────────────────────

/** 为数据列表添加行序号 */
export function parseIndex<T extends Record<string, any>>(data: T[]): T[] {
  return data.map((item, index) => ({
    ...item,
    __index: index + 1,
  }))
}

// ─── 菜单处理 ──────────────────────────────────────────────────────────

/**
 * 递归绑定菜单的行数据
 * 对应 dx-table utils.js 的 handlerMenusClickEvent
 */
export function bindMenuRowData(
  menu: MenuItemConfig,
  row: Record<string, unknown>,
): void {
  if (menu.items?.length) {
    for (const sub of menu.items) {
      bindMenuRowData(sub, row)
    }
  } else if (menu.onItemClick) {
    const originalClick = menu.onItemClick
    menu.onItemClick = (e: unknown) => originalClick(e, row)
  }
}

export function canUsePermission(
  checker: ((code: string) => boolean) | undefined,
  code?: string,
): boolean {
  if (!code) return true
  if (!checker) return true
  return checker(code)
}
