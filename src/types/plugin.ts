import type { App } from 'vue'
import type { AxiosInstance } from 'axios'

/**
 * df-web-base 核心注入接口
 * 应用层通过 app.use(dfui, options) 提供具体实现
 * 基础包自身不依赖任何业务代码
 */
export interface DfUIOptions {
  /** 带业务拦截器的 Axios 实例（token/tenant/traceId已注入） */
  http: AxiosInstance

  /** 状态持久化：DxDataGrid.stateStoring + 查询方案 */
  stateManager: {
    /** 对应 DxDataGrid stateStoring.customLoad */
    load: (key: string) => Promise<Record<string, unknown> | null>
    /** 对应 DxDataGrid stateStoring.customSave */
    save: (key: string, state: Record<string, unknown>) => Promise<void>
    remove: (key: string) => Promise<void>
  }

  /** 字典解析 → 供 DxDataGrid 列 lookup.dataSource 和 df-dict-tag 使用 */
  dict: {
    /** 获取字典项列表，格式兼容 DevExtreme lookup.dataSource */
    resolve: (dictCode: string) => Promise<DictItem[]>
    /** 单值翻译（同步），用于 calculateCellValue / customizeText */
    getLabel: (dictCode: string, value: string | number) => string
  }

  /** 权限判断 */
  permission: {
    check: (code: string) => boolean
    checkAll: (codes: string[]) => boolean
    checkAny: (codes: string[]) => boolean
  }

  /** 租户上下文 */
  tenant: {
    getTenantId: () => string
    getBranchId: () => string
  }

  /**
   * 应用上下文 — 替代 window.DFhelper.getCurrentYingYongXx()
   * DfTable 列配置持久化依赖此适配器获取 appId / userId
   */
  appContext?: {
    /** 当前应用ID（对应 yingYongId） */
    getAppId: () => string
    /** 当前用户ID（对应 yongHuId） */
    getUserId: () => string
    /** 当前系统ID（可选） */
    getSystemId?: () => string
  }

  /**
   * 表格列配置持久化适配器 — 替代 @/apis/gy-jichufw/datalayout
   * 提供此适配器后，DfTable 可通过 gridViewName 从后端加载/保存列配置
   */
  columnConfig?: {
    /** 获取列配置列表 */
    fetchConfig: (gridViewName: string, type: string, appId: string) => Promise<Record<string, unknown>[]>
    /** 保存列配置（可选） */
    saveConfig?: (gridViewName: string, config: Record<string, unknown>[]) => Promise<void>
  }

  /** DxDataGrid 全局默认值 */
  dataGrid?: DfDataGridDefaults

  /** DxForm 全局默认值 */
  form?: DfFormDefaults

  /** DevExtreme 全局配置 */
  devextreme?: DfDevExtremeConfig
}

export interface DfDataGridDefaults {
  pageSize?: number
  allowedPageSizes?: number[]
  remoteOperations?: boolean
  columnResizingMode?: 'nextColumn' | 'widget'
  columnAutoWidth?: boolean
  showBorders?: boolean
  showRowLines?: boolean
  rowAlternationEnabled?: boolean
  wordWrapEnabled?: boolean
  exportMode?: 'frontend' | 'backend'
}

export interface DfFormDefaults {
  labelLocation?: 'left' | 'top'
  colCount?: number
  showColonAfterLabel?: boolean
  labelMode?: 'static' | 'floating' | 'hidden'
}

export interface DfDevExtremeConfig {
  locale?: string
  defaultCurrency?: string
  editorStylingMode?: 'outlined' | 'underlined' | 'filled'
  floatingActionButtonConfig?: { position?: string }
}

/** 字典项，格式兼容 DevExtreme lookup.dataSource */
export interface DictItem {
  /** DevExtreme lookup.displayExpr 取此字段 */
  label: string
  /** DevExtreme lookup.valueExpr 取此字段 */
  value: string | number
  disabled?: boolean
  children?: DictItem[]
}

/** df-web-base 导出给主应用的完整类型 */
export interface DfWebBaseExports {
  /** Vue Plugin 注册函数：app.use(install, dfUIOptions) */
  install: (app: App, options: DfUIOptions) => void
  /** createDfUI 工厂函数 */
  createDfUI: (options: DfUIOptions) => { install: (app: App) => void }
  /** 工具函数 */
  utils: typeof import('../utils')
  /** 组合式函数 */
  hooks: typeof import('../hooks')
}

export interface DfWebBaseUtils {
  format: typeof import('../utils/format')
  validate: typeof import('../utils/validate')
  common: typeof import('../utils/common')
  number: typeof import('../utils/number')
  url: typeof import('../utils/url')
  cookies: typeof import('../utils/cookies')
  filters: typeof import('../utils/filters')
  tree: typeof import('../utils/tree')
  date: typeof import('../utils/date')
  mask: typeof import('../utils/mask')
  cache: typeof import('../utils/cache').cache
  createCache: typeof import('../utils/cache').createCache
  getSummaries: typeof import('../utils/table-summary').getSummaries
  createRequest: typeof import('../utils/request').createRequest
  IndexedDb: typeof import('../utils/indexed-db').IndexedDb
  exportToCsv: typeof import('../utils/export-excel').exportToCsv
  exportToExcel: typeof import('../utils/export-excel').exportToExcel
  uuid: typeof import('../utils/common').uuid
  copyText: typeof import('../utils/common').copyText
  loadJs: typeof import('../utils/common').loadJs
  isEmpty: typeof import('../utils/common').isEmpty
  debounce: typeof import('../utils/common').debounce
  throttle: typeof import('../utils/common').throttle
  deepClone: typeof import('../utils/common').deepClone
  formatNum: typeof import('../utils/number').formatNum
  formatNumDec: typeof import('../utils/number').formatNumDec
  amountToChinese: typeof import('../utils/number').amountToChinese
  safeCalc: typeof import('../utils/number').safeCalc
  getUrlParam: typeof import('../utils/url').getUrlParam
  getUrlQuery: typeof import('../utils/url').getUrlQuery
  buildQueryString: typeof import('../utils/url').buildQueryString
  getCookie: typeof import('../utils/cookies').getCookie
  setCookie: typeof import('../utils/cookies').setCookie
  delCookie: typeof import('../utils/cookies').delCookie
  filterValueByKey: typeof import('../utils/filters').filterValueByKey
  filterMultiValueByKey: typeof import('../utils/filters').filterMultiValueByKey
  listToMap: typeof import('../utils/filters').listToMap
  buildTree: typeof import('../utils/tree').buildTree
  flattenTree: typeof import('../utils/tree').flattenTree
  findTreeNode: typeof import('../utils/tree').findTreeNode
  getTreePath: typeof import('../utils/tree').getTreePath
  filterTree: typeof import('../utils/tree').filterTree
  walkTree: typeof import('../utils/tree').walkTree
  getLeafNodes: typeof import('../utils/tree').getLeafNodes
  formatDate: typeof import('../utils/date').formatDate
  formatDateTime: typeof import('../utils/date').formatDateTime
  formatTime: typeof import('../utils/date').formatTime
  getAge: typeof import('../utils/date').getAge
  getAgeText: typeof import('../utils/date').getAgeText
  getDateRange: typeof import('../utils/date').getDateRange
  diffDays: typeof import('../utils/date').diffDays
  getStayDays: typeof import('../utils/date').getStayDays
  isDateInRange: typeof import('../utils/date').isDateInRange
  maskPhone: typeof import('../utils/mask').maskPhone
  maskIdCard: typeof import('../utils/mask').maskIdCard
  maskName: typeof import('../utils/mask').maskName
  maskAddress: typeof import('../utils/mask').maskAddress
  maskBankCard: typeof import('../utils/mask').maskBankCard
  maskEmail: typeof import('../utils/mask').maskEmail
  maskInsuranceNo: typeof import('../utils/mask').maskInsuranceNo
  maskGeneric: typeof import('../utils/mask').maskGeneric
  autoMask: typeof import('../utils/mask').autoMask
}

export interface DfWebBaseHooks {
  useTable: typeof import('../hooks/useTable').useTable
  useForm: typeof import('../hooks/useForm').useForm
  usePermission: typeof import('../hooks/usePermission').usePermission
  useDict: typeof import('../hooks/useDict').useDict
  useNotification: typeof import('../hooks/useNotification').useNotification
  useHttp: typeof import('../hooks/useHttp').useHttp
  useTenant: typeof import('../hooks/useTenant').useTenant
  useDfUI: typeof import('../hooks/useDfUI').useDfUI
  useLoading: typeof import('../hooks/useLoading').useLoading
  useDebounce: typeof import('../hooks/useDebounce').useDebounce
  useDebounceFn: typeof import('../hooks/useDebounce').useDebounceFn
  useClipboard: typeof import('../hooks/useClipboard').useClipboard
}

/** df-table 列配置 — 详细定义见 components/df-table/types.ts */
export type { DfTableColumn, DfTableProps } from '../components/df-table/types'

/**
 * @deprecated 使用 DfTableColumn 替代
 */
export interface DfColumnConfig {
  dataField: string
  caption: string
  dataType?: 'string' | 'number' | 'date' | 'boolean' | 'datetime'
  dictCode?: string
  permissionCode?: string
  width?: number | string
  minWidth?: number
  visible?: boolean
  allowSorting?: boolean
  allowFiltering?: boolean
  allowHeaderFiltering?: boolean
  /** DevExtreme 列的原生配置，会被合并 */
  dxColumnOptions?: Record<string, any>
}

/** @deprecated df-table Props — 详细定义见 components/df-table/types.ts */
export interface DfTablePropsLegacy {
  /** 数据源 URL */
  dataUrl: string
  /** 主键字段 */
  keyExpr?: string
  /** 新增 URL */
  insertUrl?: string
  /** 更新 URL */
  updateUrl?: string
  /** 删除 URL */
  removeUrl?: string
  /** 列配置持久化 key */
  stateKey?: string
  /** 每页行数 */
  pageSize?: number
  /** 是否显示筛选行 */
  showFilterRow?: boolean
  /** 是否启用虚拟滚动 */
  virtualScroll?: boolean
  /** 导出权限编码 */
  exportPermission?: string
  /** 列配置 */
  columns?: DfColumnConfig[]
}

/** df-form 字段配置 */
export interface DfFieldConfig {
  dataField: string
  label?: string
  editorType?: string
  dictCode?: string
  permissionCode?: string
  colSpan?: number
  visible?: boolean
  required?: boolean
  /** DevExtreme 编辑器原生配置 */
  editorOptions?: Record<string, any>
}

/** df-form Props */
export interface DfFormProps {
  /** 列数 */
  colCount?: number
  /** 字段配置 */
  fields?: DfFieldConfig[]
  /** 表单数据 */
  formData?: Record<string, any>
  /** 是否只读 */
  readOnly?: boolean
}
