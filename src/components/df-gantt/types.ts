/**
 * 甘特图任务数据
 *
 * 每条任务对应甘特图中的一个条形（bar），定义任务的时间范围、进度和层级关系。
 *
 * @example
 * ```ts
 * const tasks: DfGanttTask[] = [
 *   {
 *     id: 1,
 *     parentId: 0,
 *     title: '需求分析',
 *     start: '2024-01-01',
 *     end: '2024-01-15',
 *     progress: 100,
 *   },
 *   {
 *     id: 2,
 *     parentId: 1,
 *     title: '用户调研',
 *     start: '2024-01-01',
 *     end: '2024-01-08',
 *     progress: 80,
 *   },
 * ]
 * ```
 */
export interface DfGanttTask {
  /** 任务唯一标识 */
  id?: number | string
  /** 父任务 ID，0 或不设置表示顶级任务 */
  parentId?: number | string
  /** 任务标题 */
  title: string
  /** 任务开始日期 */
  start: Date | string
  /** 任务结束日期 */
  end: Date | string
  /** 任务进度百分比，0-100 */
  progress?: number
  /** 任务颜色（CSS 颜色值） */
  color?: string
}

/**
 * 甘特图任务依赖关系
 *
 * 定义任务之间的前后置关系，支持完成-开始（FS）、开始-开始（SS）等类型。
 *
 * @example
 * ```ts
 * const dependencies: DfGanttDependency[] = [
 *   { id: 1, predecessorId: 1, successorId: 2, type: 0 }, // 完成-开始
 *   { id: 2, predecessorId: 2, successorId: 3, type: 1 }, // 开始-开始
 * ]
 * ```
 */
export interface DfGanttDependency {
  /** 依赖关系唯一标识 */
  id?: number | string
  /** 前置任务 ID */
  predecessorId: number | string
  /** 后继任务 ID */
  successorId: number | string
  /**
   * 依赖类型
   * - `0` 完成-开始（FS）：前置任务完成后，后继任务才能开始
   * - `1` 开始-开始（SS）：前置任务开始后，后继任务才能开始
   * - `2` 完成-完成（FF）：前置任务完成后，后继任务才能完成
   * - `3` 开始-完成（SF）：前置任务开始后，后继任务才能完成
   */
  type?: 0 | 1 | 2 | 3
}

/**
 * 甘特图资源
 *
 * 资源代表分配给任务的人、设备或物料等。
 *
 * @example
 * ```ts
 * const resources: DfGanttResource[] = [
 *   { id: 1, text: '张三', color: '#4CAF50' },
 *   { id: 2, text: '李四', color: '#2196F3' },
 * ]
 * ```
 */
export interface DfGanttResource {
  /** 资源唯一标识 */
  id: number | string
  /** 资源显示名称 */
  text: string
  /** 资源颜色（CSS 颜色值） */
  color?: string
}

/**
 * 甘特图资源分配
 *
 * 将资源分配给指定任务，一个任务可分配多个资源。
 *
 * @example
 * ```ts
 * const assignments: DfGanttResourceAssignment[] = [
 *   { id: 1, taskId: 1, resourceId: 1 }, // 张三负责需求分析
 *   { id: 2, taskId: 2, resourceId: 2 }, // 李四负责用户调研
 * ]
 * ```
 */
export interface DfGanttResourceAssignment {
  /** 分配记录唯一标识 */
  id?: number | string
  /** 任务 ID */
  taskId: number | string
  /** 资源 ID */
  resourceId: number | string
}

/**
 * 甘特图时间刻度类型
 */
export type DfGanttScaleType =
  | 'auto'
  | 'minutes'
  | 'hours'
  | 'sixHours'
  | 'days'
  | 'weeks'
  | 'months'
  | 'quarters'
  | 'years'

/**
 * DfGantt 组件属性
 *
 * 甘特图用于可视化项目计划，展示任务的时间进度、依赖关系和资源分配。
 *
 * @example
 * ```vue
 * <DfGantt
 *   :tasks="tasks"
 *   :dependencies="dependencies"
 *   :resources="resources"
 *   :resource-assignments="assignments"
 *   scale-type="days"
 *   :show-resources="true"
 *   :allow-selection="true"
 *   @task-click="onTaskClick"
 *   @task-update="onTaskUpdate"
 * />
 * ```
 */
export interface DfGanttProps {
  /** 任务数据列表 */
  tasks?: DfGanttTask[] | Record<string, any>
  /** 任务依赖关系列表 */
  dependencies?: DfGanttDependency[] | Record<string, any>
  /** 资源列表 */
  resources?: DfGanttResource[] | Record<string, any>
  /** 资源分配列表 */
  resourceAssignments?: DfGanttResourceAssignment[] | Record<string, any>
  /** 任务列表列配置 */
  columns?: any[]
  /** 时间刻度类型，默认 `'auto'` */
  scaleType?: DfGanttScaleType
  /**
   * 任务标题位置
   * - `'inside'` 条形内部
   * - `'outside'` 条形外部
   * - `'none'` 不显示
   */
  titlePosition?: 'inside' | 'outside' | 'none'
  /** 是否显示资源分配，默认 `true` */
  showResources?: boolean
  /** 是否显示行分隔线，默认 `true` */
  showRowLines?: boolean
  /** 是否显示边框，默认 `true` */
  showBorders?: boolean
  /** 是否允许行选择，默认 `false` */
  allowSelection?: boolean
  /** 当前选中行的 key */
  selectedRowKey?: any
  /**
   * 任务条形内标题位置
   * - `'inside'` 条形内部（默认）
   * - `'outside'` 条形外部
   * - `'none'` 不显示
   */
  taskTitlePosition?: 'inside' | 'outside' | 'none'
  /** 左侧任务列表宽度（px），默认 `440` */
  taskListWidth?: number
  /** 一周的第一天，0=周日，1=周一（默认），依次类推 */
  firstDayOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6
  /** 组件宽度 */
  width?: number | string
  /** 组件高度 */
  height?: number | string
}
