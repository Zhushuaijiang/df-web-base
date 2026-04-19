/**
 * 图表自定义图形
 *
 * 用于扩展图表工具箱中的可用图形。每个自定义图形定义了类型标识、显示标题、
 * 分类归属以及模板绘制方式。
 *
 * @example
 * ```ts
 * const shapes: DfDiagramCustomShape[] = [
 *   {
 *     type: 'employee',
 *     title: '员工',
 *     category: 'Org Chart',
 *     baseType: 'rectangle',
 *     defaultWidth: 1.5,
 *     defaultHeight: 0.8,
 *     allowResize: true,
 *   },
 * ]
 * ```
 */
export interface DfDiagramCustomShape {
  /** 图形类型标识，在数据中通过 type 字段引用 */
  type: string
  /** 图形在工具箱中显示的标题 */
  title?: string
  /** 图形所属分类，用于工具箱分组显示 */
  category?: string
  /** 基于的内置图形类型，如 `'rectangle'`、`'ellipse'`、`'diamond'` 等 */
  baseType?: string
  /** 默认宽度（单位取决于 units 配置，默认 cm） */
  defaultWidth?: number
  /** 默认高度（单位取决于 units 配置，默认 cm） */
  defaultHeight?: number
  /** 是否允许调整大小 */
  allowResize?: boolean
  /** 是否允许编辑文本 */
  allowEdit?: boolean
  /** 图形背景色（CSS 颜色值） */
  backgroundColor?: string
  /** 图形边框色（CSS 颜色值） */
  borderColor?: string
  /** 连接点模板，定义图形上的连接锚点 */
  connectionPoints?: Array<{ x: number; y: number }>
  /** 自定义 SVG 模板名称 */
  template?: string
  /** 图形文本模板 */
  textbox?: { text?: string; width?: number; height?: number }
}

/**
 * 图表工具箱配置
 *
 * 控制左侧工具箱面板的显示和行为。工具箱提供拖拽式图形选择。
 *
 * @example
 * ```ts
 * const toolbox: DfDiagramToolbox = {
 *   visible: true,
 *   groups: [
 *     { category: 'general', title: '通用', expanded: true },
 *     { category: 'org-chart', title: '组织架构', expanded: false },
 *     { category: 'custom', title: '自定义', shapes: ['employee', 'department'] },
 *   ],
 * }
 * ```
 */
export interface DfDiagramToolbox {
  /** 是否显示工具箱 */
  visible?: boolean
  /** 工具箱分组配置 */
  groups?: DfDiagramToolboxGroup[]
  /** 是否显示搜索框 */
  showSearch?: boolean
}

/**
 * 工具箱分组配置
 */
export interface DfDiagramToolboxGroup {
  /** 分类名称，对应自定义图形的 category 或内置分类 */
  category?: string
  /** 分组显示标题 */
  title?: string
  /** 是否默认展开 */
  expanded?: boolean
  /** 指定该分组显示的图形类型列表 */
  shapes?: string[]
}

/**
 * 图表数据源配置
 *
 * 用于从远程 API 或本地数据加载图形和连接线数据。
 *
 * @example
 * ```ts
 * const dataSource: DfDiagramDataSource = {
 *   store: {
 *     type: 'array',
 *     data: [
 *       { id: '1', text: '开始', type: 'start' },
 *       { id: '2', text: '处理', type: 'process' },
 *     ],
 *   },
 *   shapesKeyExpr: 'id',
 *   textsKeyExpr: 'text',
 * }
 * ```
 */
export interface DfDiagramDataSource {
  /** 数据存储配置 */
  store?: Record<string, any>
  /** 图形 ID 字段名 */
  shapesKeyExpr?: string
  /** 连接线 ID 字段名 */
  connectorsKeyExpr?: string
  /** 文本内容字段名 */
  textsKeyExpr?: string
}

/**
 * DfDiagram 组件属性
 *
 * 图表（Diagram）组件用于创建和编辑流程图、组织架构图等可视化图表。
 * 支持拖拽绘制、自动布局、导入导出等能力。
 *
 * @example
 * ```vue
 * <DfDiagram
 *   :custom-shapes="customShapes"
 *   :toolbox="toolbox"
 *   :show-grid="true"
 *   units="cm"
 *   @selection-changed="onSelectionChanged"
 * />
 * ```
 */
export interface DfDiagramProps {
  /** 图表数据源配置 */
  dataSource?: DfDiagramDataSource | Record<string, any>
  /** 自定义图形列表 */
  customShapes?: DfDiagramCustomShape[]
  /** 自定义命令模板名称 */
  customCommandTemplate?: string
  /** 工具箱配置 */
  toolbox?: DfDiagramToolbox | Record<string, any>
  /** 缩放级别，1 为 100% */
  zoomLevel?: number
  /** 是否启用简洁模式（隐藏网格和辅助线），默认 `false` */
  simpleView?: boolean
  /** 是否显示网格，默认 `true` */
  showGrid?: boolean
  /** 是否吸附到网格，默认 `true` */
  snapToGrid?: boolean
  /** 网格大小，数字或包含 value 和 items 的对象 */
  gridSize?: number | { value: number; items: number[] }
  /** 页面背景色（CSS 颜色值） */
  pageColor?: string
  /**
   * 页面方向
   * - `'portrait'` 纵向
   * - `'landscape'` 横向
   */
  pageOrientation?: 'portrait' | 'landscape'
  /**
   * 单位制
   * - `'in'` 英寸
   * - `'cm'` 厘米（默认）
   * - `'px'` 像素
   */
  units?: 'in' | 'cm' | 'px'
  /** 视图工具栏配置 */
  viewToolbar?: Record<string, any>
  /** 主工具栏配置 */
  mainToolbar?: Record<string, any>
  /** 历史操作工具栏配置 */
  historyToolbar?: Record<string, any>
  /** 属性面板配置 */
  propertiesPanel?: Record<string, any>
  /**
   * 自动缩放模式
   * - `'fitContent'` 适配内容
   * - `'fitWidth'` 适配宽度
   * - `'disabled'` 禁用（默认）
   */
  autoZoomMode?: 'fitContent' | 'fitWidth' | 'disabled'
  /** 是否全屏显示，默认 `false` */
  fullScreen?: boolean
}
