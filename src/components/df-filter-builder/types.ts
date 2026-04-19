export type DfFilterOperation =
  | '=' | '<>' | '<' | '<=' | '>' | '>='
  | 'contains' | 'notcontains' | 'startswith' | 'endswith'
  | 'between' | 'isblank' | 'isnotblank'

export interface DfFilterField {
  dataField: string
  caption?: string
  dataType?: 'string' | 'number' | 'date' | 'boolean' | 'object' | 'datetime'
  filterOperations?: DfFilterOperation[]
  lookup?: {
    dataSource: any[]
    valueExpr?: string
    displayExpr?: string
  }
  format?: string | object
  trueText?: string
  falseText?: string
}

export type DfFilterValue = any[] | null
