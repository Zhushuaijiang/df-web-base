export interface DfTreeProps {
  data?: any[]
  nodeKey?: string
  displayExpr?: string
  parentIdExpr?: string
  childrenExpr?: string
  dataStructure?: 'tree' | 'plain'
  showCheckbox?: boolean
  checkStrictly?: boolean
  defaultExpandAll?: boolean
  defaultExpandedKeys?: Array<string | number>
  defaultCheckedKeys?: Array<string | number>
  highlightCurrent?: boolean
  accordion?: boolean
  filterable?: boolean
  filterExpr?: string | string[]
  emptyText?: string
  lazy?: boolean
  load?: (node: any, resolve: (data: any[]) => void) => void
  draggable?: boolean
  virtualMode?: boolean
}

export interface DfTreeEmits {
  'node-click': [data: any, node: any, e: Event]
  'check-change': [data: any, checked: boolean]
  'node-expand': [data: any]
  'node-collapse': [data: any]
  'current-change': [data: any]
}
