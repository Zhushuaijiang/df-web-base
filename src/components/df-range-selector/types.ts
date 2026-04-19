/**
 * 范围选择器刻度配置
 *
 * 控制底部刻度轴的显示方式，包括刻度间隔、标签格式和值域范围。
 *
 * @example
 * ```ts
 * const scale: DfRangeSelectorScale = {
 *   startValue: new Date(2024, 0, 1),
 *   endValue: new Date(2024, 11, 31),
 *   tickInterval: { months: 1 },
 *   minorTickInterval: { weeks: 1 },
 *   label: { format: 'monthAndYear' },
 * }
 * ```
 */
export interface DfRangeSelectorScale {
  /** 刻度起始值 */
  startValue?: number | Date | string
  /** 刻度结束值 */
  endValue?: number | Date | string
  /** 主刻度间隔，如 `{ days: 7 }` 或 `{ months: 1 }` */
  tickInterval?: Record<string, number>
  /** 次刻度间隔 */
  minorTickInterval?: Record<string, number>
  /** 刻度标签配置 */
  label?: {
    /** 标签格式化，如 `'monthAndYear'`、`'currency'` */
    format?: string | Record<string, any>
    /** 是否可见 */
    visible?: boolean
    /** 自定义渲染函数 */
    customizeText?: (e: { value: any; valueText: string }) => string
  }
  /** 刻度类型：`'continuous'` 连续 | `'discrete'` 离散 | `'semidiscrete'` 半离散 */
  type?: 'continuous' | 'discrete' | 'semidiscrete'
  /** 是否显示小刻度 */
  showMinorTicks?: boolean
  /** 是否显示自定义刻度 */
  showCustomTicks?: boolean
  /** 占比（0-1），控制刻度轴高度占比 */
  aggregationInterval?: Record<string, number>
}

/**
 * 范围选择器内嵌图表配置
 *
 * 在选择器区域内显示迷你图表（通常是面积图或柱状图），
 * 帮助用户直观理解数据分布。
 *
 * @example
 * ```ts
 * const chart: DfRangeSelectorChart = {
 *   series: [
 *     { valueField: 'sales', type: 'area', color: '#4CAF50' },
 *   ],
 *   commonSeriesSettings: { argumentField: 'date' },
 * }
 * ```
 */
export interface DfRangeSelectorChart {
  /** 图表系列配置列表 */
  series?: Array<{
    /** 数据字段名 */
    valueField: string
    /** 系列类型 */
    type?: 'line' | 'area' | 'bar' | 'spline'
    /** 系列颜色 */
    color?: string
    /** 系列名称 */
    name?: string
  }>
  /** 通用系列配置 */
  commonSeriesSettings?: Record<string, any>
  /** 是否显示数据点 */
  point?: { visible?: boolean; size?: number }
  /** 是否平滑线条 */
  useAggregation?: boolean
}

/**
 * 滑块标记配置
 *
 * 控制滑块上方显示的数值标签样式。
 */
export interface DfRangeSelectorSliderMarker {
  /** 是否可见 */
  visible?: boolean
  /** 格式化，如 `'monthAndDay'`、`'currency'` */
  format?: string | Record<string, any>
  /** 占位符，当值为空时显示的文本 */
  placeholderHeight?: number
  /** 自定义渲染函数 */
  customizeText?: (e: { value: any; valueText: string }) => string
}

/**
 * 范围选择器行为配置
 */
export interface DfRangeSelectorBehavior {
  /** 是否启用动画 */
  animationEnabled?: boolean
  /** 是否允许移动滑块 */
  moveRange?: boolean
  /** 手动范围选择模式 */
  manualRangeSelectionEnabled?: boolean
  /** 是否允许滑动 */
  allowSlidersSwap?: boolean
  /** 拖拽模式：`'handle'` 手柄 | `'bar'` 整体条 */
  snapToTicksEnabled?: boolean
}

/**
 * DfRangeSelector 组件属性
 *
 * 范围选择器（RangeSelector）用于选择一段连续的范围值（时间范围、数值范围等），
 * 通常与图表配合使用实现数据缩放。
 *
 * @example
 * ```vue
 * <DfRangeSelector
 *   v-model="dateRange"
 *   :data-source="salesData"
 *   :scale="{ startValue: startDate, endValue: endDate, tickInterval: { months: 1 } }"
 *   :chart="{ series: [{ valueField: 'amount', type: 'area' }] }"
 *   @change="onRangeChange"
 * />
 * ```
 */
export interface DfRangeSelectorProps {
  /** 当前选中的范围值 [起始, 结束]，支持 v-model 双向绑定 */
  modelValue?: [number | Date | string, number | Date | string]
  /** 数据源，用于内嵌图表渲染 */
  dataSource?: any[]
  /** 范围最小值 */
  startValue?: number | Date | string
  /** 范围最大值 */
  endValue?: number | Date | string
  /** 内嵌图表配置 */
  chart?: DfRangeSelectorChart | Record<string, any>
  /** 刻度配置 */
  scale?: DfRangeSelectorScale | Record<string, any>
  /** 滑块标记配置 */
  sliderMarker?: DfRangeSelectorSliderMarker | Record<string, any>
  /** 滑块手柄配置 */
  sliderHandle?: Record<string, any>
  /** 遮罩配置（未选中区域样式） */
  shutter?: Record<string, any>
  /** 背景配置 */
  background?: Record<string, any>
  /** 行为配置 */
  behavior?: DfRangeSelectorBehavior | Record<string, any>
  /** 外边距配置 */
  margin?: Record<string, any>
  /** 标题，字符串或配置对象 */
  title?: string | Record<string, any>
}
