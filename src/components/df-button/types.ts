export type ButtonType = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text'
export type ButtonSize = 'large' | 'default' | 'small' | 'mini'

export interface DfButtonProps {
  /** 按钮类型 */
  type?: ButtonType
  /** 尺寸 */
  size?: ButtonSize
  /** 图标 class */
  icon?: string
  /** 加载中 */
  loading?: boolean
  /** 禁用 */
  disabled?: boolean
  /** 朴素按钮 */
  plain?: boolean
  /** 圆角按钮 */
  round?: boolean
  /** 圆形按钮 */
  circle?: boolean
  /** 提示文本 */
  hint?: string
  /** 默认文本（当无 slot 时） */
  text?: string
  /** 防抖间隔(ms)，0 表示关闭 */
  debounce?: number
}

export interface DfButtonEmits {
  click: [e: Event]
}
