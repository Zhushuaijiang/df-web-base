/**
 * 透视表数据源配置
 *
 * @example
 * ```ts
 * const pivotDataSource = {
 *   fields: [
 *     { area: 'row', dataField: 'region', caption: '地区' },
 *     { area: 'column', dataField: 'year', caption: '年份' },
 *     { area: 'data', dataField: 'amount', caption: '金额', summaryType: 'sum' },
 *   ],
 *   store: {
 *     type: 'array',
 *     data: salesData,
 *   },
 * }
 * ```
 */
export interface DfPivotGridDataSource {
  /** 字段定义列表，用于配置行、列、数据和筛选区域 */
  fields?: DfPivotGridField[]
  /** 数据存储，支持 array、odata、custom 等类型 */
  store?: Record<string, any>
}

/**
 * 透视表字段配置
 *
 * 定义数据字段如何映射到透视表的行、列、数据或筛选区域。
 *
 * @example
 * ```ts
 * // 行维度 - 按地区分组
 * const rowField: DfPivotGridField = {
 *   area: 'row',
 *   dataField: 'region',
 *   caption: '地区',
 *   allowSorting: true,
 * }
 *
 * // 数据维度 - 汇总金额
 * const dataField: DfPivotGridField = {
 *   area: 'data',
 *   dataField: 'amount',
 *   caption: '销售金额',
 *   summaryType: 'sum',
 *   format: 'currency',
 * }
 * ```
 */
export interface DfPivotGridField {
  /** 数据字段名，对应数据源中的属性名 */
  dataField: string
  /** 显示标题，不设置时默认使用 dataField */
  caption?: string
  /**
   * 字段所在区域
   * - `'row'` 行区域，用于行维度分组
   * - `'column'` 列区域，用于列维度分组
   * - `'data'` 数据区域，用于汇总计算
   * - `'filter'` 筛选区域，用于过滤数据
   */
  area?: 'row' | 'column' | 'data' | 'filter'
  /**
   * 汇总类型，仅在 area 为 'data' 时生效
   * - `'sum'` 求和
   * - `'count'` 计数
   * - `'min'` 最小值
   * - `'max'` 最大值
   * - `'avg'` 平均值
   */
  summaryType?: 'sum' | 'count' | 'min' | 'max' | 'avg'
  /**
   * 数值格式化
   * - `'currency'` 货币格式
   * - `'fixedPoint'` 固定小数位
   * - `'percent'` 百分比
   * - `'decimal'` 小数
   */
  format?: string
  /** 是否允许排序 */
  allowSorting?: boolean
  /** 是否允许过滤 */
  allowFiltering?: boolean
  /** 是否允许全部展开 */
  allowExpandAll?: boolean
  /** 字段宽度 */
  width?: number | string
}

/**
 * DfPivotGrid 组件属性
 *
 * 透视表（PivotGrid）用于跨维度汇总和分析大量数据。
 * 支持行/列维度分组、多种汇总计算、排序和过滤。
 *
 * @example
 * ```vue
 * <DfPivotGrid
 *   :data-source="pivotDataSource"
 *   :show-borders="true"
 *   :show-row-grand-totals="true"
 *   :show-column-grand-totals="true"
 *   row-header-layout="tree"
 * />
 * ```
 */
export interface DfPivotGridProps {
  /**
   * 透视表数据源配置
   * - 传入 `DfPivotGridDataSource` 对象：完整配置，含字段定义和数据存储
   * - 传入数组：直接作为数据，需配合字段定义使用
   * - 传入 `Record<string, any>`：DevExtreme PivotGridDataSource 实例配置
   * - 传入 DevExtreme PivotGridDataSource 实例
   */
  dataSource?: DfPivotGridDataSource | any[] | Record<string, any> | any
  /** 是否允许按汇总值排序，默认 `true` */
  allowSortingBySummary?: boolean
  /** 是否允许过滤，默认 `true` */
  allowFiltering?: boolean
  /** 是否允许全部展开，默认 `true` */
  allowExpandAll?: boolean
  /** 是否显示边框，默认 `true` */
  showBorders?: boolean
  /** 是否显示列总计，默认 `true` */
  showColumnGrandTotals?: boolean
  /** 是否显示行总计，默认 `true` */
  showRowGrandTotals?: boolean
  /** 是否显示小计合计 */
  showTotals?: boolean
  /** 是否显示列小计，默认 `true` */
  showColumnTotals?: boolean
  /** 是否显示行小计，默认 `true` */
  showRowTotals?: boolean
  /**
   * 行头布局方式
   * - `'standard'` 标准表格布局（默认）
   * - `'tree'` 树形布局，适合层级较多的场景
   */
  rowHeaderLayout?: 'standard' | 'tree'
  /** 是否启用文字换行，默认 `false` */
  wordWrapEnabled?: boolean
  /** 组件高度 */
  height?: number | string
  /** 组件宽度 */
  width?: number | string
}
