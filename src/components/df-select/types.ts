import type { DictItem } from '../../types/plugin'

export interface DfSelectProps {
  modelValue?: string | number | null
  /** 字典编码（与 dataSource 二选一） */
  dictCode?: string
  /** 自定义数据源 */
  dataSource?: DictItem[]
  /** 显示字段 */
  displayExpr?: string
  /** 值字段 */
  valueExpr?: string
  /** 是否可搜索 */
  searchEnabled?: boolean
  /** 是否可清空 */
  showClearButton?: boolean
  /** placeholder */
  placeholder?: string
  /** 是否禁用 */
  disabled?: boolean
}

export interface DfSelectEmits {
  'update:modelValue': [value: string | number | null]
}
