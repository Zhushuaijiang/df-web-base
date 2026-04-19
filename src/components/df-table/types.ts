/**
 * df-table 专用类型定义
 * 对标 df-web-bui dx-table 的完整 API，依赖翻转后的类型安全版本
 */

import type { DxColumnFormat, DxContextMenuPreparingEvent } from '../../types/devextreme'
import type { ValidationRule } from 'devextreme/common'

// ─── 分页配置 ──────────────────────────────────────────────────────────
export interface PageConfig {
  /** 每页行数，默认 20 */
  size?: number
  /** 可选页大小，默认 [10, 20, 50, 200] */
  sizes?: number[]
  /** 分页模式，默认 'full' */
  mode?: 'full' | 'compact' | 'adaptive'
}

export const DEFAULT_PAGE_CONFIG: Required<PageConfig> = {
  size: 20,
  sizes: [10, 20, 50, 200],
  mode: 'full',
}

// ─── 选择配置 ──────────────────────────────────────────────────────────
export interface CascadeSelectConfig {
  /** 是否启用级联选择 */
  enabled: boolean
  /** 级联分组字段（如 'zuHao'） */
  groupField: string
  /** 主键字段 */
  keyField: string
  /** 级联方向 */
  direction: 'both' | 'select' | 'deselect'
}

export interface SelectConfig {
  /** 全选范围：page 本页 | allPages 全部 */
  allMode?: 'page' | 'allPages'
  /** 选择模式：multiple 多选 | single 单选 */
  mode?: 'multiple' | 'single'
  /** 复选框展示：none | onClick | onLongTap | always */
  boxMode?: 'none' | 'onClick' | 'onLongTap' | 'always'
  /** 级联选择配置 */
  cascadeSelect?: CascadeSelectConfig
}

export const DEFAULT_SELECT_CONFIG: Required<Omit<SelectConfig, 'cascadeSelect'>> = {
  allMode: 'allPages',
  mode: 'multiple',
  boxMode: 'always',
}

// ─── 排序配置 ──────────────────────────────────────────────────────────
export interface SortFieldItem {
  sortField: string
  sortType: 'ASC' | 'DESC'
  /** 自定义排序函数/附加参数 */
  sortPlus?: ((...args: unknown[]) => unknown) | Record<string, unknown>
  /** 排序别名字段（后端实际接收的字段名） */
  aliasDataField?: string
  /** 排序方向设置（CUSTOM 时使用 customFn） */
  sortDirection?: string
  /** 自定义排序函数 */
  customFn?: (...args: unknown[]) => unknown
}

// ─── Fetch 参数和响应 ─────────────────────────────────────────────────
export interface FetchParams<T extends Record<string, unknown> = Record<string, unknown>> {
  pageIndex: number
  pageSize: number
  sortField?: string
  sortType?: 'ASC' | 'DESC'
  sortFieldList?: SortFieldItem[]
  /** Extra query parameters */
  extra?: T
}

export interface FetchResult<T = Record<string, unknown>> {
  list: T[]
  totalRows: number
  totalCount?: number
  pageCount?: number
}

// ─── 操作按钮 ──────────────────────────────────────────────────────────
export interface OperationButton {
  /** 按钮文字 */
  name?: string
  /** 按钮文字别名 */
  text?: string
  /** 权限编码 */
  permissionCode?: string
  /** 自定义 class */
  cssClass?: string
  /** 是否展示回调 */
  showable?: (row: Record<string, unknown>, rowIndex: number) => boolean
  /** 是否禁用 */
  disabled?: boolean | ((row: Record<string, unknown>, rowIndex: number) => boolean)
  /** 点击事件回调 */
  click: (row: Record<string, unknown>, rowIndex: number, buttonIndex: number) => void
}

export interface OperationColumnConfig {
  /** 列标题 */
  caption?: string
  /** 列宽 */
  width?: number
  /** 是否显示 */
  visible?: boolean
  /** 固定列 */
  fixed?: boolean
  /** 固定位置 */
  fixedPosition?: 'left' | 'right'
  /** 权限编码 */
  permissionCode?: string
  /** 自定义操作列插槽名 */
  slotName?: string
  /** 操作按钮列表 */
  buttons?: OperationButton[]
}

// ─── 右键菜单项 ─────────────────────────────────────────────────────
export interface MenuItemConfig {
  text: string
  onItemClick?: (e: unknown, row?: Record<string, unknown>) => void
  items?: MenuItemConfig[]
  /** 是否启用权限控制 */
  hasPermit?: boolean
  visible?: boolean
  disabled?: boolean
  icon?: string
}

// ─── 列配置 ──────────────────────────────────────────────────────────
export interface DfTableColumn {
  /** 字段名（唯一标识） */
  dataField: string
  /** 列标题 */
  caption?: string
  /** 列宽度（<= 20 时视为自动宽度） */
  width?: number | string
  /** 最小列宽 */
  minWidth?: number
  /** 是否可见 */
  visible?: boolean
  /** 固定列 */
  fixed?: boolean
  /** 固定位置 */
  fixedPosition?: 'left' | 'right'
  /** 是否允许排序 */
  allowSorting?: boolean
  /** 是否允许过滤 */
  allowFiltering?: boolean
  /** 是否参与导出 */
  allowExporting?: boolean
  /** 是否允许编辑 */
  allowEditing?: boolean
  /** 可见性索引（列顺序） */
  visibleIndex?: number
  /** 对齐方式 */
  alignment?: 'left' | 'center' | 'right'
  /** 内部列模板名称（对应 scoped slot） */
  innerColumnTemplate?: string
  /** 单元格插槽名称，推荐使用 */
  cellSlot?: string
  /** 表头插槽名称 */
  headerSlot?: string
  /** 编辑态插槽名称 */
  editSlot?: string
  /** 数据类型 */
  dataType?: 'string' | 'number' | 'date' | 'boolean' | 'datetime'
  /** 过滤器类型 */
  filterType?: 'include' | 'exclude'
  /** 字典编码 → 通过 DfUIOptions.dict 自动解析 */
  dictCode?: string
  /** 权限编码 → 通过 DfUIOptions.permission 控制可见性 */
  permissionCode?: string
  /** 列配置禁用项列表 */
  columnConfigDisabledList?: string[]
  /** DevExtreme format 配置 */
  format?: DxColumnFormat
  /** 自定义文本处理 */
  customizeText?: (cellInfo: { value: unknown; valueText: string }) => string
  /** 校验规则 */
  validationRules?: ValidationRule[]
  /** 分组索引 */
  groupIndex?: number
  /** 单元格自定义 class */
  cssClass?: string
  /** 是否显示在列选择器中 */
  showInColumnChooser?: boolean
  /** 合并规则：same-value 或自定义函数 */
  mergeRule?: 'same-value' | ((currentRow: Record<string, unknown>, previousRow: Record<string, unknown>, rowIndex: number) => boolean)
  /** DevExtreme native column options passthrough */
  dxOptions?: Record<string, unknown>

  // ─── DevExtreme column native fields used internally ──────────────
  /** DevExtreme cell template name */
  cellTemplate?: string
  /** DevExtreme header cell template name */
  headerCellTemplate?: string
  /** DevExtreme edit cell template name */
  editCellTemplate?: string
  /** DevExtreme lookup configuration */
  lookup?: Record<string, unknown>
  /** DevExtreme boolean display — true text */
  trueText?: string
  /** DevExtreme boolean display — false text */
  falseText?: string
  /** DevExtreme show editor always */
  showEditorAlways?: boolean
  /** DevExtreme render async */
  renderAsync?: boolean
}

// ─── 列云配置持久化 DTO ─────────────────────────────────────────────
export interface ColumnConfigItem {
  fieldName: string
  caption: string
  visible: number
  width: number
  cellHAlignMent: number
  sortable: number
  formatType: number
  formatString: string
  cellConfig?: { configs: CellConditionConfig[] }
  sortNo: number
  dtoState: number
  dataLayoutId?: string
}

export interface CellConditionConfig {
  type: string
  dataField?: string
  value: unknown
  maxValue?: unknown
  color: string
  bgColor: string
}

// ─── 序号配置 ──────────────────────────────────────────────────────────
export interface IndexConfig {
  dataField?: string
  caption?: string
  allowSorting?: boolean
  width?: number
  visibleIndex?: number
  alignment?: string
  allowEditing?: boolean
}

export const DEFAULT_INDEX_CONFIG: Required<IndexConfig> = {
  dataField: '__index',
  caption: '序号',
  allowSorting: false,
  width: 44,
  visibleIndex: 0,
  alignment: 'left',
  allowEditing: false,
}

// ─── 导出配置 ──────────────────────────────────────────────────────────
export interface ExportConfig {
  show?: boolean
  fileName?: string
  /** Extra export options */
  options?: Record<string, unknown>
}

// ─── 行/单元格条件样式 ─────────────────────────────────────────────
export interface RowStyleConfig {
  expression?: string
  /** CSS property → value map for row styling */
  styles?: Record<string, string>
}

export interface CustomConfig {
  rowAlternationEnabled?: boolean
  sortConfig?: SortFieldItem[]
  rowStyle?: RowStyleConfig
  rowExpression?: string
  /** Extra custom config options */
  extras?: Record<string, unknown>
}

// ─── DfTable Props 接口 ─────────────────────────────────────────────
export interface DfTableProps {
  /** 唯一 key 字段 (REQUIRED) */
  keyExpr: string
  /** 表格列定义 */
  gridDataColumns?: DfTableColumn[]
  /** 表格列定义别名 */
  columns?: DfTableColumn[]
  /** 表格唯一名称，用于列配置持久化 (云端 + 本地) */
  gridViewName?: string

  // ─── 数据加载 ──────────────────────
  /**
   * 远程数据加载函数
   * 返回 { list, totalRows }
   */
  fetchApi?: (params: FetchParams) => Promise<FetchResult>
  /** 远程加载函数别名 */
  fetch?: (params: FetchParams) => Promise<FetchResult>
  /** 是否使用 fetchApi 加载数据 */
  useFetch?: boolean
  /** 静态数据源（useFetch=false 时生效） */
  dataList?: Record<string, unknown>[]
  /** 静态数据源别名 */
  staticData?: Record<string, unknown>[]
  /** 数据源别名 */
  dataSource?: Record<string, unknown>[]
  /** 是否自动加载 */
  autoLoad?: boolean

  // ─── 分页 ──────────────────────────
  /** 是否有分页 */
  hasPage?: boolean
  /** 是否分页别名 */
  showPaging?: boolean
  /** 分页配置 */
  pageConfig?: PageConfig

  // ─── 选择 ──────────────────────────
  /** 是否有选择 */
  hasSelect?: boolean
  /** 选择模式别名，设置后自动开启选择列 */
  selectionMode?: 'none' | 'single' | 'multiple'
  /** 选择配置 */
  selectConfig?: SelectConfig

  // ─── 序号 ──────────────────────────
  /** 是否添加序号列 */
  hasIndex?: boolean
  /** 序号列配置 */
  indexConfig?: IndexConfig

  // ─── 操作按钮 ──────────────────────
  /** 行操作按钮 */
  operationButtons?: OperationButton[]
  /** 操作列宽度 */
  operationWidth?: number
  /** 操作列增强配置 */
  operationColumn?: OperationColumnConfig

  // ─── 右键菜单 ──────────────────────
  /** 表头右键菜单生成函数 */
  generateHeaderMenu?: (e: DxContextMenuPreparingEvent) => MenuItemConfig[]
  /** 行右键菜单生成函数 */
  generateRowMenu?: (e: DxContextMenuPreparingEvent) => MenuItemConfig[]

  // ─── 外观 ──────────────────────────
  /** 表格内联样式 */
  gridStyle?: string
  /** 表格高度 */
  height?: number | string
  /** 表格最小高度 */
  minHeight?: number | string
  /** 表格 CSS class */
  gridClass?: string
  /** 鼠标悬停高亮 */
  hoverStateEnabled?: boolean
  /** 行交替颜色 */
  rowAlternationEnabled?: boolean
  /** 行 class 函数 */
  rowClassName?: (info: { row: Record<string, unknown>; rowIndex: number }) => string | undefined

  // ─── 列配置 ──────────────────────
  /** 是否允许列配置 */
  allowColumnConfig?: boolean
  /** 是否显示筛选行 */
  showFilterRow?: boolean
  /** 是否显示表头筛选 */
  showHeaderFilter?: boolean
  /** 是否显示分组面板 */
  showGroupPanel?: boolean
  /** 是否显示列选择器 */
  showColumnChooser?: boolean

  // ─── 导出 ──────────────────────────
  /** 导出配置 */
  exportConfig?: ExportConfig

  // ─── 高级 ──────────────────────────
  /** 远程操作配置 */
  remoteOperations?: Record<string, boolean> | boolean | null
  /** CustomStore 扩展方法（remove, insert 等） */
  customStore?: Record<string, unknown>
  /** 是否编辑模式（直接赋值 dataList） */
  isEditMode?: boolean
  /** 更新前回调 */
  beforeUpdateAction?: (key: string | number, values: Record<string, unknown>) => Promise<void>
}

/** @deprecated Use DfTableColumn with explicit dxOptions for DevExtreme passthrough */
export type DfTableColumnLegacy = DfTableColumn & Record<string, any>
