export type DrawerDirection = 'rtl' | 'ltr' | 'ttb' | 'btt'

export interface DfDrawerProps {
  modelValue?: boolean
  title?: string
  size?: string | number
  direction?: DrawerDirection
  modal?: boolean
  showClose?: boolean
  wrapperClosable?: boolean
  destroyOnClose?: boolean
  withHeader?: boolean
  beforeClose?: () => boolean | Promise<boolean>
}

export interface DfDrawerEmits {
  'update:modelValue': [val: boolean]
  open: []
  opened: []
  close: []
  closed: []
}
