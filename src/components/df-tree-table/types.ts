export interface TreeTableColumn {
  field: string
  title: string
  width?: number | string
  minWidth?: number
  fixed?: boolean | 'left' | 'right'
  align?: 'left' | 'center' | 'right'
  sortable?: boolean
  sortOrder?: 'asc' | 'desc'
  slot?: string
  formatter?: (value: any, row: any) => string
}

export interface DfTreeTableProps {
  dataSource?: any[]
  columns?: TreeTableColumn[]
  rowKey?: string
  parentIdExpr?: string
  rootValue?: any
  defaultExpandAll?: boolean
  expandedRowKeys?: Array<string | number>
  border?: boolean
  stripe?: boolean
  height?: string | number
  emptyText?: string
  showCheckbox?: boolean
  checkStrictly?: boolean
  selectionMode?: 'single' | 'multiple'
  filterable?: boolean
  showHeaderFilter?: boolean
  sortable?: boolean
  highlightRow?: boolean
  columnAutoWidth?: boolean
  wordWrap?: boolean
  allowColumnReorder?: boolean
  allowColumnResize?: boolean
}

export interface DfTreeTableEmits {
  'row-click': [row: any, e: any]
  'selection-change': [rows: any[]]
  'expand': [row: any]
  'collapse': [row: any]
}
