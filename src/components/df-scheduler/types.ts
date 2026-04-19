export interface DfAppointment {
  id?: string | number
  text: string
  startDate: Date | string
  endDate: Date | string
  allDay?: boolean
  description?: string
  recurrenceRule?: string
  recurrenceException?: string
  disabled?: boolean
  [key: string]: any
}

export interface DfSchedulerResource {
  fieldExpr: string
  dataSource: any[]
  label?: string
  valueExpr?: string
  displayExpr?: string
  colorExpr?: string
}

export interface DfSchedulerProps {
  dataSource: DfAppointment[]
  currentDate?: Date | string
  currentView?: 'day' | 'week' | 'workWeek' | 'month' | 'agenda'
  views?: Array<'day' | 'week' | 'workWeek' | 'month' | 'agenda'>
  startDayHour?: number
  endDayHour?: number
  firstDayOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6
  cellDuration?: number
  height?: number | string
  width?: number | string
  editing?: boolean | { allowAdding?: boolean; allowDeleting?: boolean; allowUpdating?: boolean; allowDragging?: boolean }
  resources?: DfSchedulerResource[]
  showAllDayPanel?: boolean
  showCurrentTimeIndicator?: boolean
  textExpr?: string
  startDateExpr?: string
  endDateExpr?: string
  allDayExpr?: string
}
