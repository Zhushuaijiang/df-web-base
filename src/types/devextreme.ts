/**
 * Typed DevExtreme event/callback interfaces
 * Replaces (e: any) patterns across all DX wrapper components
 *
 * These are simplified versions of DevExtreme's actual event types,
 * containing only the fields we actually use in our wrapper components.
 */

// ============================================================================
// Common Events
// ============================================================================

export interface DxValueChangedEvent {
  value?: unknown
  previousValue?: unknown
  event?: Event
  element?: HTMLElement
  component?: unknown
}

export interface DxClickEvent {
  event?: Event
  element?: HTMLElement
  component?: unknown
}

export interface DxButtonClickEvent {
  event?: Event
  validationGroup?: string
}

export interface DxSelectionChangedEvent<T = Record<string, unknown>> {
  selectedRowsData?: T[]
  selectedRowKeys?: unknown[]
  currentSelectedRowKeys?: unknown[]
  currentDeselectedRowKeys?: unknown[]
}

export interface DxInitializedEvent {
  component?: unknown
  element?: HTMLElement
}

export interface DxContentReadyEvent {
  component?: unknown
  element?: HTMLElement
}

export interface DxOptionChangedEvent {
  name: string
  fullName: string
  value: unknown
  previousValue: unknown
  component: unknown
  element: HTMLElement
}

export interface DxShownEvent {
  component: unknown
  element: HTMLElement
}

export interface DxHiddenEvent {
  component: unknown
  element: HTMLElement
}

// ============================================================================
// DataGrid Events
// ============================================================================

export interface DxRowClickEvent<T = Record<string, unknown>> {
  rowType?: string
  rowIndex?: number
  data?: T
  key?: unknown
  event?: Event
  rowElement?: HTMLElement
  columns?: unknown[]
}

export interface DxCellPreparedEvent<T = Record<string, unknown>> {
  cellElement?: HTMLElement
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  column?: any
  data?: T
  rowType?: string
  rowIndex?: number
  displayValue?: unknown
  value?: unknown
  text?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component?: any
}

export interface DxRowPreparedEvent<T = Record<string, unknown>> {
  data?: T
  rowElement?: HTMLElement
  rowType?: string
  rowIndex?: number
  columns?: unknown[]
  key?: unknown
}

export interface DxRowUpdatedEvent<T = Record<string, unknown>> {
  component?: unknown
  element?: HTMLElement
  data?: T
  newData?: T
  key?: unknown
  error?: Error | undefined
}

export interface DxEditingStartEvent<T = Record<string, unknown>> {
  component: unknown
  element: HTMLElement
  data: T
  key: unknown
  cancel: boolean | Promise<boolean>
}

export interface DxContextMenuPreparingEvent {
  items?: any[]
  target?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  row?: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  column?: any
  event?: Event
  component?: unknown
  element?: HTMLElement
}

// ============================================================================
// DataGrid Focused Row Event
// ============================================================================

export interface DxFocusedRowChangedEvent<T = Record<string, unknown>> {
  row?: {
    data?: T
    key?: unknown
    rowIndex?: number
    rowType?: string
    isSelected?: boolean
    rowElement?: HTMLElement
  }
  rowKey?: unknown
  rowIndex?: number
  component?: unknown
  element?: HTMLElement
}

// ============================================================================
// Tree Events
// ============================================================================

export interface DxItemSelectionChangedEvent<T = Record<string, unknown>> {
  component: unknown
  element: HTMLElement
  node: unknown
  itemData: T
  itemElement: HTMLElement
}

// ============================================================================
// Upload Events
// ============================================================================

export interface DxUploadEvent {
  file: File
  request: XMLHttpRequest
  segment?: unknown
  phase: string
}

export interface DxUploadedEvent {
  file: File
  request: XMLHttpRequest
  segment?: unknown
  phase: string
}

// ============================================================================
// Scheduler Events
// ============================================================================

export interface DxAppointmentClickEvent {
  appointmentData: Record<string, unknown>
  cellElement: HTMLElement
  event: Event
  component: unknown
  element: HTMLElement
}

export interface DxAppointmentFormOpeningEvent {
  appointmentData: Record<string, unknown>
  form: unknown
  popup: unknown
  component: unknown
  element: HTMLElement
}

// ============================================================================
// CustomStore LoadOptions
// ============================================================================

export interface DxLoadOptions {
  sort?: Array<{ selector: string; desc: boolean }>
  filter?: unknown
  group?: Array<{ selector: string; desc: boolean; groupInterval?: unknown }>
  skip?: number
  take?: number
  requireTotalCount?: boolean
  searchOperation?: string
  searchValue?: unknown
  searchExpr?: string | string[]
  totalSummary?: Array<{ summaryType: string; dataField?: string }>
  groupSummary?: Array<{ summaryType: string; dataField?: string }>
}

// ============================================================================
// DataGrid Instance (partial, what we use)
// ============================================================================

export interface DxDataGridInstance {
  option(name: string): unknown
  option(name: string, value: unknown): void
  pageIndex(index: number): void
  pageIndex(): number
  pageSize(): number
  refresh(): Promise<void>
  getDataSource(): DxDataSource
  columnOption(name: string): Record<string, unknown>
  columnOption(id: string | number, name: string, value: unknown): void
  getVisibleColumns(): Array<Record<string, unknown>>
  getVisibleRows(): Array<Record<string, unknown>>
  beginCustomLoading(message?: string): void
  endCustomLoading(): void
  clearSelection(): void
  selectAll(): Promise<void>
  deselectAll(): Promise<void>
  selectRows(keys: unknown[]): Promise<void>
  deselectRows(keys: unknown[]): Promise<void>
  getSelectedRowKeys(): unknown[]
  getSelectedRowsData(): Record<string, unknown>[]
  keyOf(data: Record<string, unknown>): unknown
  updateDimensions(): void
  focusedRowKey: unknown
}

export interface DxDataSource {
  _storeLoadOptions?: DxLoadOptions
  _items?: Record<string, unknown>[]
}

// ============================================================================
// Format & Validation Types
// ============================================================================

export type DxColumnFormat =
  | string
  | { type: string; precision?: number; currency?: string }

export type DxValidationRule =
  | { type: 'required'; message?: string; trim?: boolean; [key: string]: unknown }
  | { type: 'email'; message?: string; [key: string]: unknown }
  | { type: 'numeric'; message?: string; min?: number; max?: number; [key: string]: unknown }
  | { type: 'stringLength'; message?: string; min?: number; max?: number; [key: string]: unknown }
  | { type: 'custom'; message?: string; validationCallback: (params: { value: unknown; data: Record<string, unknown>; rule: unknown; validator: unknown; column: unknown }) => boolean | Promise<boolean>; [key: string]: unknown }
  | { type: 'compare'; message?: string; comparisonTarget: () => unknown; comparisonType?: string; [key: string]: unknown }
  | { type: 'pattern'; message?: string; pattern: string | RegExp; [key: string]: unknown }
  | { type: 'range'; message?: string; min?: number; max?: number; [key: string]: unknown }
  | { type: 'async'; message?: string; validationCallback: (params: { value: unknown; data: Record<string, unknown> }) => Promise<boolean>; [key: string]: unknown }
