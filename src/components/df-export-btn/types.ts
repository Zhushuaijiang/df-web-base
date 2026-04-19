import type { DfTableColumn } from '../df-table/types'

/** 列配置项 (导出用) */
export interface ExportColumnItem {
  /** 字段名 */
  dataField: string
  /** 显示名 */
  caption: string
  /** 是否选中导出 */
  checked?: boolean
  /** 列宽 */
  width?: number
  /** 对齐方式 */
  alignment?: 'left' | 'center' | 'right'
  /** 格式化函数 */
  format?: string | ((value: unknown) => string)
  /** 数据类型 */
  dataType?: string
}

/** 导出按钮 Props */
export interface DfExportBtnProps {
  /** 按钮配置 */
  btnConfig?: {
    text?: string
    icon?: string
    type?: string
  }
  /** 数据获取 API (分页获取) */
  fetchApi?: (params: { pageIndex: number; pageSize: number }) => Promise<{
    rows: Record<string, unknown>[]
    total: number
  }>
  /** 直接传入的数据列表 (与 fetchApi 二选一) */
  dataList?: Record<string, unknown>[]
  /** 导出文件名 */
  fileTitle?: string
  /** 格式化行数据 */
  formatItem?: (row: Record<string, unknown>) => Record<string, unknown>
  /** 获取列配置 */
  getColumns?: () => DfTableColumn[]
  /** 分页大小 (默认 500) */
  pageSize?: number
  /** 导出视图名称 (用于列配置持久化) */
  exportViewName?: string
  /** 分组字段 */
  groupByFields?: string[]
  /** 小计字段 */
  subtotalFields?: string[]
  /** 合计字段 */
  totalFields?: string[]
}

/** 列配置持久化 DTO */
export interface ColumnLayoutDto {
  id?: string | number
  viewName: string
  columnJson: string
  fanWei?: number
  dtoState?: number
}

/** DTO 状态枚举 */
export const DtoStateEnum = {
  Unchanged: 1,
  Added: 2,
  Modified: 3,
  Deleted: 4,
} as const

export type DtoState = (typeof DtoStateEnum)[keyof typeof DtoStateEnum]
