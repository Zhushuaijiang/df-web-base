export interface DfDialogProps {
  /** 是否显示 -- 支持 v-model 和 v-model:visible 两种用法 */
  modelValue?: boolean
  visible?: boolean
  /** 标题 */
  title?: string
  /** 宽度 */
  width?: number | string
  /** 高度 */
  height?: number | string
  /** 尺寸预设 */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'fullscreen'
  /** 显示关闭按钮 */
  showCloseButton?: boolean
  /** 拖拽 */
  dragEnabled?: boolean
  /** 点击遮罩关闭 */
  closeOnOutsideClick?: boolean
  /** 点击遮罩关闭（兼容 df-ui 命名） */
  closeOnClickModal?: boolean
  /** 显示默认底部按钮 */
  showDefaultFooter?: boolean
  /** 确认按钮文本 */
  confirmText?: string
  /** 取消按钮文本 */
  cancelText?: string
  /** 确认加载中 */
  confirmLoading?: boolean
  /** 自定义 CSS class */
  customClass?: string
}

export interface DfDialogEmits {
  'update:modelValue': [value: boolean]
  'update:visible': [value: boolean]
  confirm: []
  cancel: []
  close: []
  shown: []
}
