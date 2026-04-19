export interface DfToolbarItem {
  name: string
  widget?: 'dxButton' | 'dxTextBox' | 'dxSelectBox' | 'dxDateBox' | 'dxCheckBox'
  location?: 'before' | 'center' | 'after'
  visible?: boolean
  disabled?: boolean
  options?: Record<string, any>
  cssClass?: string
  permissionCode?: string
}
