/**
 * 卡片视图列配置
 *
 * 定义卡片中显示的数据字段、标题、格式和编辑方式。
 *
 * @example
 * ```ts
 * const columns: DfCardViewColumn[] = [
 *   { dataField: 'name', caption: '姓名' },
 *   { dataField: 'department', caption: '部门', lookup: { dataSource: deptList, valueExpr: 'id', displayExpr: 'name' } },
 *   { dataField: 'salary', caption: '薪资', format: 'currency', dataType: 'number' },
 *   { dataField: 'hireDate', caption: '入职日期', dataType: 'date', format: 'yyyy-MM-dd' },
 * ]
 * ```
 */
export interface DfCardViewColumn {
  /** 数据字段名，对应数据源中的属性 */
  dataField: string
  /** 列显示标题 */
  caption?: string
  /**
   * 数据类型
   * - `'string'` 字符串
   * - `'number'` 数值
   * - `'date'` 日期
   * - `'boolean'` 布尔
   * - `'datetime'` 日期时间
   * - `'object'` 对象
   */
  dataType?: 'string' | 'number' | 'date' | 'boolean' | 'datetime' | 'object'
  /** 数值格式化，如 `'currency'`、`'fixedPoint'`、`'percent'` 或自定义格式对象 */
  format?: string | Record<string, any>
  /** 是否允许编辑 */
  allowEditing?: boolean
  /** 是否允许过滤 */
  allowFiltering?: boolean
  /** 是否允许排序 */
  allowSorting?: boolean
  /** 是否允许分组 */
  allowGrouping?: boolean
  /** 是否允许搜索 */
  allowSearch?: boolean
  /** 是否在卡片中隐藏该字段 */
  visible?: boolean
  /** 外键查找配置，将 ID 映射为显示文本 */
  lookup?: {
    /** 查找数据源 */
    dataSource: any[]
    /** 实际值字段 */
    valueExpr?: string
    /** 显示文本字段 */
    displayExpr?: string
  }
  /** 自定义单元格渲染 */
  cellTemplate?: string
  /** 计算字段，通过函数计算值 */
  calculateCellValue?: (data: any) => any
  /** 对齐方式：`'left'` | `'center'` | `'right'` */
  alignment?: 'left' | 'center' | 'right'
  /** 宽度 */
  width?: number | string
}

/**
 * 卡片视图数据源配置
 *
 * 支持直接传入数组或 DevExtreme DataSource 配置对象。
 *
 * @example
 * ```ts
 * // 数组方式
 * const data: DfCardViewDataSource = [
 *   { id: 1, name: '张三', department: '技术部' },
 *   { id: 2, name: '李四', department: '市场部' },
 * ]
 *
 * // Store 方式
 * const storeConfig: DfCardViewDataSource = {
 *   store: {
 *     type: 'odata',
 *     url: '/api/employees',
 *   },
 *   paginate: true,
 *   pageSize: 20,
 * }
 * ```
 */
export type DfCardViewDataSource = any[] | Record<string, any>

/**
 * 搜索面板配置
 */
export interface DfCardViewSearchPanel {
  /** 是否可见 */
  visible?: boolean
  /** 搜索框宽度 */
  width?: number | string
  /** 占位提示文本 */
  placeholder?: string
  /** 搜索高亮模式 */
  highlightSearchResults?: boolean
  /** 搜索时要扫描的字段列表，不设置则搜索所有字段 */
  searchVisibleColumnsOnly?: boolean
}

/**
 * 分页配置
 */
export interface DfCardViewPaging {
  /** 是否启用分页 */
  enabled?: boolean
  /** 每页条数 */
  pageSize?: number
  /** 默认页码（从 0 开始） */
  pageIndex?: number
}

/**
 * 分页器配置
 */
export interface DfCardViewPager {
  /** 是否可见 */
  visible?: boolean
  /** 是否显示页码 */
  showPageSizeSelector?: boolean
  /** 可选的每页条数列表 */
  allowedPageSizes?: number[]
  /** 是否显示导航按钮 */
  showNavigationButtons?: boolean
  /** 是否显示信息文本 */
  showInfo?: boolean
}

/**
 * DfCardView 组件属性
 *
 * 卡片视图（CardView）以卡片形式展示数据列表，每条记录渲染为一张卡片。
 * 适合用于展示包含图片、标题和摘要的内容型数据。
 *
 * @example
 * ```vue
 * <DfCardView
 *   :data-source="employees"
 *   key-expr="id"
 *   :columns="columns"
 *   selection-mode="single"
 *   :paging="{ enabled: true, pageSize: 12 }"
 *   :search-panel="{ visible: true, placeholder: '搜索员工...' }"
 *   @selection-changed="onSelectionChanged"
 * >
 *   <template #item="{ data }">
 *     <EmployeeCard :employee="data" />
 *   </template>
 * </DfCardView>
 * ```
 */
export interface DfCardViewProps {
  /** 数据源 */
  dataSource?: DfCardViewDataSource
  /** 主键字段名 */
  keyExpr?: string
  /** 列配置列表 */
  columns?: DfCardViewColumn[]
  /**
   * 选择模式
   * - `'none'` 不允许选择（默认）
   * - `'single'` 单选
   * - `'multiple'` 多选
   */
  selectionMode?: 'none' | 'single' | 'multiple'
  /** 已选中的数据项 key 列表 */
  selectedItemKeys?: any[]
  /** 筛选值 */
  filterValue?: any
  /** 搜索面板配置 */
  searchPanel?: DfCardViewSearchPanel | Record<string, any>
  /** 分页配置 */
  paging?: DfCardViewPaging | Record<string, any>
  /** 分页器配置 */
  pager?: DfCardViewPager | Record<string, any>
  /** 排序配置 */
  sorting?: Record<string, any>
  /** 组件宽度 */
  width?: number | string
  /** 组件高度 */
  height?: number | string
}
