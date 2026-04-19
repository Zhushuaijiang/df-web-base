export type InputSize = 'large' | 'default' | 'small' | 'mini'

export interface DfInputProps {
  /** 绑定值 */
  modelValue?: string | number
  /** 输入类型 */
  type?: 'text' | 'password' | 'textarea' | 'number'
  /** 尺寸 */
  size?: InputSize
  /** 占位文本 */
  placeholder?: string
  /** 是否禁用 */
  disabled?: boolean
  /** 是否只读 */
  readonly?: boolean
  /** 是否可清空 */
  clearable?: boolean
  /** 密码切换 */
  showPassword?: boolean
  /** 字数统计 */
  showWordLimit?: boolean
  /** 最大长度 */
  maxlength?: number
  /** 前缀图标 */
  prefixIcon?: string
  /** 后缀图标 */
  suffixIcon?: string
  /** textarea 自适应高度，传 true 或 { minRows, maxRows } */
  autosize?: boolean | { minRows?: number; maxRows?: number }
}

export interface DfInputEmits {
  'update:modelValue': [value: string | number]
  input: [value: string | number]
  change: [value: string | number]
  focus: [e: Event]
  blur: [e: Event]
  enter: []
}
