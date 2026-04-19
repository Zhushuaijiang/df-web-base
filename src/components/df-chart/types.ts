export interface DfChartSeries {
  valueField: string
  name?: string
  type?: 'line' | 'bar' | 'area' | 'scatter' | 'spline' | 'stepline' | 'stackedbar' | 'fullstackedbar'
  color?: string
  axis?: string
  label?: { visible?: boolean; format?: string | object }
}

export interface DfChartProps {
  dataSource: any[]
  series: DfChartSeries[]
  argumentField?: string
  title?: string
  palette?: string | string[]
  rotated?: boolean
  showLegend?: boolean
  legendPosition?: 'top' | 'bottom' | 'left' | 'right'
  tooltipEnabled?: boolean
  tooltipFormat?: string | object
  argumentAxisLabel?: string
  valueAxisLabel?: string
  valueAxisFormat?: string | object
  height?: number | string
  width?: number | string
  animation?: boolean
  crosshairEnabled?: boolean
  zoomEnabled?: boolean
  scrollEnabled?: boolean
  exportEnabled?: boolean
}

export interface DfPieChartProps {
  dataSource: any[]
  argumentField?: string
  valueField?: string
  title?: string
  palette?: string | string[]
  type?: 'pie' | 'doughnut'
  innerRadius?: number
  showLegend?: boolean
  legendPosition?: 'top' | 'bottom' | 'left' | 'right'
  tooltipEnabled?: boolean
  tooltipFormat?: string | object
  labelVisible?: boolean
  labelFormat?: string | object
  labelConnector?: boolean
  height?: number | string
  width?: number | string
  animation?: boolean
  centerTemplate?: boolean
}
