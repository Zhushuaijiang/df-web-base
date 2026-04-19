export interface DfPaginationProps {
  total?: number
  pageSize?: number
  currentPage?: number
  pageSizes?: number[]
  pagerCount?: number
  layout?: string
  background?: boolean
  small?: boolean
  disabled?: boolean
  hideOnSinglePage?: boolean
}

export interface DfPaginationEmits {
  'update:currentPage': [val: number]
  'update:pageSize': [val: number]
  'size-change': [val: number]
  'current-change': [val: number]
  'prev-click': [val: number]
  'next-click': [val: number]
}
