// ─── SearchLayout ──────────────────────────────

export interface DfSearchLayoutProps {
  /** 搜索栏是否可折叠 */
  collapsible?: boolean
  /** 搜索栏默认折叠 */
  defaultCollapsed?: boolean
  /** 搜索按钮文本 */
  searchText?: string
  /** 重置按钮文本 */
  resetText?: string
  /** 搜索中加载状态 */
  loading?: boolean
}

// ─── DetailLayout ──────────────────────────────

export interface DetailTab {
  /** Tab 唯一标识 */
  key: string
  /** Tab 标题 */
  title: string
  /** 图标 class */
  icon?: string
  /** 是否懒加载 */
  lazy?: boolean
}

export interface DetailAction {
  /** 按钮唯一标识 */
  key: string
  /** 按钮文本 */
  text: string
  /** 按钮类型 */
  type?: 'primary' | 'default' | 'danger'
  /** 图标 class */
  icon?: string
  /** 是否禁用 */
  disabled?: boolean
}

export interface DfDetailLayoutProps {
  /** 页面标题 */
  title?: string
  /** 副标题 */
  subtitle?: string
  /** 标签页配置 */
  tabs?: DetailTab[]
  /** 当前激活的 Tab */
  activeTab?: string
  /** 是否启用左右分栏（结合 DfSplitPane） */
  splitLayout?: boolean
  /** 左侧面板比例，0-1，默认 0.6 */
  splitRatio?: number
  /** 是否显示返回按钮 */
  showBackButton?: boolean
  /** 操作按钮配置 */
  actions?: DetailAction[]
  /** 布局密度：compact（医疗HIS，信息密集）或 default（通用后台） */
  density?: 'compact' | 'default'
}

// ─── CardLayout ────────────────────────────────

export interface CardAction {
  /** 按钮唯一标识 */
  key: string
  /** 按钮文本 */
  text?: string
  /** 图标 class */
  icon?: string
}

export interface DfCardLayoutProps {
  /** 卡片标题 */
  title?: string
  /** 是否可折叠 */
  collapsible?: boolean
  /** 默认是否折叠 */
  defaultCollapsed?: boolean
  /** 内边距 */
  padding?: number | string
  /** 阴影 */
  shadow?: 'none' | 'sm' | 'md' | 'lg'
  /** 是否有边框 */
  bordered?: boolean
  /** 额外 CSS 类 */
  cssClass?: string
  /** 操作按钮（右上角） */
  actions?: CardAction[]
}

// ─── GridLayout ────────────────────────────────

export interface GridResponsive {
  /** 窗口 < 1200px 时的列数 */
  lg?: number
  /** 窗口 < 992px 时的列数 */
  md?: number
  /** 窗口 < 768px 时的列数 */
  sm?: number
}

export interface DfGridLayoutProps {
  /** 列数 */
  cols?: number
  /** 行间距(px) */
  rowGap?: number
  /** 列间距(px) */
  colGap?: number
  /** 响应式断点 */
  responsive?: GridResponsive
  /** 子项是否等高 */
  equalHeight?: boolean
}

// ─── AppShell ──────────────────────────────────

export interface DfAppShellProps {
  /** Logo 文字（展开时显示） */
  logo?: string
  /** Logo 图标（折叠时显示） */
  logoIcon?: string
  /** 侧边栏展开宽度(px) */
  sidebarWidth?: number
  /** 侧边栏折叠宽度(px) */
  sidebarCollapsedWidth?: number
  /** 侧边栏默认是否折叠 */
  defaultSidebarCollapsed?: boolean
  /** 顶部 header 高度(px) */
  headerHeight?: number
  /** 移动端断点(px)，窗口宽度低于此值进入 overlay 模式 */
  mobileBreakpoint?: number
}

// ─── TreeGridLayout ────────────────────────────

export interface DfTreeGridLayoutProps {
  /** 面板标题 */
  title?: string
  /** 左侧树面板占比 0-1，默认 0.25 */
  treeRatio?: number
  /** 左侧面板最小占比 */
  treeMin?: number
  /** 左侧面板最大占比 */
  treeMax?: number
}

// ─── DashboardLayout ───────────────────────────

export interface DfDashboardLayoutProps {
  /** 图表区列数 */
  chartCols?: number
}

// ─── TimelineLayout ────────────────────────────

export interface DfTimelineLayoutProps {
  /** 详情面板宽度 */
  detailWidth?: string
  /** 响应式：窗口宽度低于此值时改为上下堆叠 */
  stackBreakpoint?: number
}

// ─── FormLayout ────────────────────────────────

export interface FormSection {
  /** 分组唯一标识 */
  key: string
  /** 分组标题 */
  title: string
  /** 是否可折叠 */
  collapsible?: boolean
}

export interface DfFormLayoutProps {
  /** 表单分组定义 */
  sections?: FormSection[]
  /** 是否显示右侧快速导航 */
  showQuickNav?: boolean
  /** 快速导航标题 */
  quickNavTitle?: string
  /** 分组是否可折叠 */
  collapsible?: boolean
}

// ─── StatCard ──────────────────────────────────

export interface DfStatCardProps {
  /** 数值 */
  value?: string | number
  /** 标签 */
  label?: string
  /** 图标文字 */
  iconText?: string
  /** 颜色变体 */
  variant?: 'blue' | 'green' | 'orange' | 'red' | 'purple' | 'default'
  /** 趋势百分比，正数上升，负数下降 */
  trend?: number
  /** 加载态（骨架屏） */
  loading?: boolean
  /** 是否可点击 */
  clickable?: boolean
  /** 数字格式化（千分位） */
  formatNumber?: boolean
}
