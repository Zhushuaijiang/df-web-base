import type { App } from 'vue'

// ─── 原有基础组件 ───
import DfTable from './df-table/DfTable.vue'
import { DfForm } from './df-form'
import { DfSelect } from './df-select'
import { DfDictTag } from './df-dict-tag'
import { DfErrorBoundary } from './df-error-boundary'
import { DfLoading } from './df-loading'
import { DfDialog } from './df-dialog'
import { DfExportBtn } from './df-export-btn'
import { DfButton } from './df-button'
import { DfInput } from './df-input'
import { DfCheckbox } from './df-checkbox'
import { DfSwitch } from './df-switch'
import { DfRadio } from './df-radio'
import { DfTooltip } from './df-tooltip'

// ─── Batch 1: 纯 CSS 简单组件 ───
import { DfTag } from './df-tag'
import { DfBadge } from './df-badge'
import { DfCard } from './df-card'
import { DfEmpty } from './df-empty'
import { DfAlert } from './df-alert'
import { DfDivider } from './df-divider'
import { DfLink } from './df-link'
import { DfSpace } from './df-space'
import { DfAvatar } from './df-avatar'

// ─── Batch 2: 纯 CSS 中等组件 ───
import { DfBreadcrumb, DfBreadcrumbItem } from './df-breadcrumb'
import { DfTimeline, DfTimelineItem } from './df-timeline'
import { DfSteps, DfStep } from './df-steps'
import { DfCollapse, DfCollapseItem } from './df-collapse'
import { DfButtonGroup } from './df-button-group'
import { DfBacktop } from './df-backtop'
import { DfProgress } from './df-progress'
import { DfImage } from './df-image'

// ─── Batch 3: DevExtreme 封装组件 ───
import { DfTabs, DfTabPane } from './df-tabs'
import { DfDatePicker } from './df-date-picker'
import { DfInputNumber } from './df-input-number'
import { DfDrawer } from './df-drawer'
import { DfDropdown, DfDropdownItem, DfDropdownMenu } from './df-dropdown'
import { DfPagination } from './df-pagination'
import { DfPopover } from './df-popover'
import { DfPopconfirm } from './df-popconfirm'
import { DfScrollbar } from './df-scrollbar'

// ─── Batch 4: 复合组件 ───
import { DfTree } from './df-tree'
import { DfTreeSelect } from './df-tree-select'
import { DfUpload } from './df-upload'
import { DfTransfer } from './df-transfer'
import { DfCascader } from './df-cascader'

// ─── Batch 5+: 高优先级补充组件 ───
import { DfMenu, DfMenuItem, DfSubmenu, DfMenuItemGroup } from './df-menu'
import { DfAutocomplete } from './df-autocomplete'
import { DfButtonList } from './df-button-list'
import { DfTagSelect } from './df-tag-select'

// ─── Batch 6: 中优先级补充组件 ───
import { DfTimePicker } from './df-time-picker'
import { DfContextMenu } from './df-context-menu'
import { DfPageHeader } from './df-page-header'
import { DfCarousel, DfCarouselItem } from './df-carousel'
import { DfSplitPane } from './df-split-pane'
import { DfTreeTable } from './df-tree-table'

// ─── Batch 7: 低优先级补充组件 ───
import { DfSlider } from './df-slider'
import { DfColorPicker } from './df-color-picker'
import { DfRate } from './df-rate'
import { DfCalendar } from './df-calendar'
import { DfIcon } from './df-icon'

// ─── Batch 8: DevExtreme 高级组件 ───
import { DfChart, DfPieChart } from './df-chart'
import { DfToolbar } from './df-toolbar'
import { DfScheduler } from './df-scheduler'
import { DfFilterBuilder } from './df-filter-builder'
import { DfTextEditor } from './df-text-editor'

// ─── Batch 9: DevExtreme 简单直传组件 ───
import { DfLoadIndicator } from './df-load-indicator'
import { DfProgressBar } from './df-progress-bar'
import { DfBullet } from './df-bullet'
import { DfSparkline } from './df-sparkline'
import { DfToast } from './df-toast'
import { DfLoadPanel } from './df-load-panel'
import { DfGallery } from './df-gallery'
import { DfTileView } from './df-tile-view'
import { DfList } from './df-list'
import { DfAccordion } from './df-accordion'
import { DfActionSheet } from './df-action-sheet'
import { DfSpeedDialAction } from './df-speed-dial-action'

// ─── Batch 10: DevExtreme 表单控件组件 ───
import { DfRadioGroup } from './df-radio-group'
import { DfLookup } from './df-lookup'
import { DfRangeSlider } from './df-range-slider'
import { DfRecurrenceEditor } from './df-recurrence-editor'
import { DfDropDownButton } from './df-drop-down-button'
import { DfValidator } from './df-validator'
import { DfValidationGroup } from './df-validation-group'
import { DfValidationSummary } from './df-validation-summary'
import { DfStepper } from './df-stepper'
import { DfResizable } from './df-resizable'

// ─── Batch 11: DevExtreme 可视化组件 ───
import { DfBarGauge } from './df-bar-gauge'
import { DfCircularGauge } from './df-circular-gauge'
import { DfLinearGauge } from './df-linear-gauge'
import { DfFunnel } from './df-funnel'
import { DfPolarChart } from './df-polar-chart'
import { DfSankey } from './df-sankey'
import { DfTreeMap } from './df-tree-map'
import { DfRangeSelector } from './df-range-selector'
import { DfCardView } from './df-card-view'
import { DfMultiView } from './df-multi-view'

// ─── Batch 12: DevExtreme 集合/布局组件 ───
import { DfBox } from './df-box'
import { DfResponsiveBox } from './df-responsive-box'
import { DfSplitter } from './df-splitter'
import { DfDraggable } from './df-draggable'
import { DfPivotGrid } from './df-pivot-grid'
import { DfDxTabs } from './df-dx-tabs'
import { DfDxPopover } from './df-dx-popover'
import { DfDxContextMenu } from './df-dx-context-menu'

// ─── Batch 13: DevExtreme 导航/Dx版本组件 ───
import { DfDxMenu } from './df-dx-menu'
import { DfDxPagination } from './df-dx-pagination'
import { DfDxButtonGroup } from './df-dx-button-group'
import { DfDxDrawer } from './df-dx-drawer'
import { DfSortable } from './df-sortable'

// ─── Batch 14: DevExtreme 复杂组件 ───
import { DfDiagram } from './df-diagram'
import { DfGantt } from './df-gantt'

// ─── Batch 15: 通用布局组件 ───
import {
  DfSearchLayout, DfDetailLayout, DfCardLayout, DfGridLayout,
  DfAppShell, DfTreeGridLayout, DfDashboardLayout, DfTimelineLayout, DfFormLayout, DfStatCard,
} from './df-common-layout'

// ─── HIS 业务组件 ───
import { DfPatientStrip } from './df-patient-strip'

/**
 * 全局注册所有 df-web-base 组件
 * 注册后子应用模板中可直接使用 <DfTable>, <DfButton>, <DfDialog> 等
 */
export function registerGlobalComponents(app: App): void {
  // 原有基础组件
  app.component('DfTable', DfTable)
  app.component('DfForm', DfForm)
  app.component('DfSelect', DfSelect)
  app.component('DfDictTag', DfDictTag)
  app.component('DfErrorBoundary', DfErrorBoundary)
  app.component('DfLoading', DfLoading)
  app.component('DfDialog', DfDialog)
  app.component('DfExportBtn', DfExportBtn)
  app.component('DfButton', DfButton)
  app.component('DfInput', DfInput)
  app.component('DfCheckbox', DfCheckbox)
  app.component('DfSwitch', DfSwitch)
  app.component('DfRadio', DfRadio)
  app.component('DfTooltip', DfTooltip)

  // Batch 1: 纯 CSS 简单
  app.component('DfTag', DfTag)
  app.component('DfBadge', DfBadge)
  app.component('DfCard', DfCard)
  app.component('DfEmpty', DfEmpty)
  app.component('DfAlert', DfAlert)
  app.component('DfDivider', DfDivider)
  app.component('DfLink', DfLink)
  app.component('DfSpace', DfSpace)
  app.component('DfAvatar', DfAvatar)

  // Batch 2: 纯 CSS 中等
  app.component('DfBreadcrumb', DfBreadcrumb)
  app.component('DfBreadcrumbItem', DfBreadcrumbItem)
  app.component('DfTimeline', DfTimeline)
  app.component('DfTimelineItem', DfTimelineItem)
  app.component('DfSteps', DfSteps)
  app.component('DfStep', DfStep)
  app.component('DfCollapse', DfCollapse)
  app.component('DfCollapseItem', DfCollapseItem)
  app.component('DfButtonGroup', DfButtonGroup)
  app.component('DfBacktop', DfBacktop)
  app.component('DfProgress', DfProgress)
  app.component('DfImage', DfImage)

  // Batch 3: DevExtreme 封装
  app.component('DfTabs', DfTabs)
  app.component('DfTabPane', DfTabPane)
  app.component('DfDatePicker', DfDatePicker)
  app.component('DfInputNumber', DfInputNumber)
  app.component('DfDrawer', DfDrawer)
  app.component('DfDropdown', DfDropdown)
  app.component('DfDropdownItem', DfDropdownItem)
  app.component('DfDropdownMenu', DfDropdownMenu)
  app.component('DfPagination', DfPagination)
  app.component('DfPopover', DfPopover)
  app.component('DfPopconfirm', DfPopconfirm)
  app.component('DfScrollbar', DfScrollbar)

  // Batch 4: 复合组件
  app.component('DfTree', DfTree)
  app.component('DfTreeSelect', DfTreeSelect)
  app.component('DfUpload', DfUpload)
  app.component('DfTransfer', DfTransfer)
  app.component('DfCascader', DfCascader)

  // Batch 5+: 高优先级补充
  app.component('DfMenu', DfMenu)
  app.component('DfMenuItem', DfMenuItem)
  app.component('DfSubmenu', DfSubmenu)
  app.component('DfMenuItemGroup', DfMenuItemGroup)
  app.component('DfAutocomplete', DfAutocomplete)
  app.component('DfButtonList', DfButtonList)
  app.component('DfTagSelect', DfTagSelect)

  // Batch 6: 中优先级补充
  app.component('DfTimePicker', DfTimePicker)
  app.component('DfContextMenu', DfContextMenu)
  app.component('DfPageHeader', DfPageHeader)
  app.component('DfCarousel', DfCarousel)
  app.component('DfCarouselItem', DfCarouselItem)
  app.component('DfSplitPane', DfSplitPane)
  app.component('DfTreeTable', DfTreeTable)

  // Batch 7: 低优先级补充
  app.component('DfSlider', DfSlider)
  app.component('DfColorPicker', DfColorPicker)
  app.component('DfRate', DfRate)
  app.component('DfCalendar', DfCalendar)
  app.component('DfIcon', DfIcon)

  // Batch 8: DevExtreme 高级组件
  app.component('DfChart', DfChart)
  app.component('DfPieChart', DfPieChart)
  app.component('DfToolbar', DfToolbar)
  app.component('DfScheduler', DfScheduler)
  app.component('DfFilterBuilder', DfFilterBuilder)
  app.component('DfTextEditor', DfTextEditor)

  // Batch 9: DevExtreme 简单直传组件
  app.component('DfLoadIndicator', DfLoadIndicator)
  app.component('DfProgressBar', DfProgressBar)
  app.component('DfBullet', DfBullet)
  app.component('DfSparkline', DfSparkline)
  app.component('DfToast', DfToast)
  app.component('DfLoadPanel', DfLoadPanel)
  app.component('DfGallery', DfGallery)
  app.component('DfTileView', DfTileView)
  app.component('DfList', DfList)
  app.component('DfAccordion', DfAccordion)
  app.component('DfActionSheet', DfActionSheet)
  app.component('DfSpeedDialAction', DfSpeedDialAction)

  // Batch 10: DevExtreme 表单控件组件
  app.component('DfRadioGroup', DfRadioGroup)
  app.component('DfLookup', DfLookup)
  app.component('DfRangeSlider', DfRangeSlider)
  app.component('DfRecurrenceEditor', DfRecurrenceEditor)
  app.component('DfDropDownButton', DfDropDownButton)
  app.component('DfValidator', DfValidator)
  app.component('DfValidationGroup', DfValidationGroup)
  app.component('DfValidationSummary', DfValidationSummary)
  app.component('DfStepper', DfStepper)
  app.component('DfResizable', DfResizable)

  // Batch 11: DevExtreme 可视化组件
  app.component('DfBarGauge', DfBarGauge)
  app.component('DfCircularGauge', DfCircularGauge)
  app.component('DfLinearGauge', DfLinearGauge)
  app.component('DfFunnel', DfFunnel)
  app.component('DfPolarChart', DfPolarChart)
  app.component('DfSankey', DfSankey)
  app.component('DfTreeMap', DfTreeMap)
  app.component('DfRangeSelector', DfRangeSelector)
  app.component('DfCardView', DfCardView)
  app.component('DfMultiView', DfMultiView)

  // Batch 12: DevExtreme 集合/布局组件
  app.component('DfBox', DfBox)
  app.component('DfResponsiveBox', DfResponsiveBox)
  app.component('DfSplitter', DfSplitter)
  app.component('DfDraggable', DfDraggable)
  app.component('DfPivotGrid', DfPivotGrid)
  app.component('DfDxTabs', DfDxTabs)
  app.component('DfDxPopover', DfDxPopover)
  app.component('DfDxContextMenu', DfDxContextMenu)

  // Batch 13: DevExtreme 导航/Dx版本组件
  app.component('DfDxMenu', DfDxMenu)
  app.component('DfDxPagination', DfDxPagination)
  app.component('DfDxButtonGroup', DfDxButtonGroup)
  app.component('DfDxDrawer', DfDxDrawer)
  app.component('DfSortable', DfSortable)

  // Batch 14: DevExtreme 复杂组件
  app.component('DfDiagram', DfDiagram)
  app.component('DfGantt', DfGantt)

  // Batch 15: 通用布局组件
  app.component('DfSearchLayout', DfSearchLayout)
  app.component('DfDetailLayout', DfDetailLayout)
  app.component('DfCardLayout', DfCardLayout)
  app.component('DfGridLayout', DfGridLayout)
  app.component('DfAppShell', DfAppShell)
  app.component('DfTreeGridLayout', DfTreeGridLayout)
  app.component('DfDashboardLayout', DfDashboardLayout)
  app.component('DfTimelineLayout', DfTimelineLayout)
  app.component('DfFormLayout', DfFormLayout)
  app.component('DfStatCard', DfStatCard)

  // HIS 业务组件
  app.component('DfPatientStrip', DfPatientStrip)
}

// ─── 重新导出 ───

// 原有基础组件
export { default as DfTable } from './df-table/DfTable.vue'
export { DfForm } from './df-form'
export { DfSelect } from './df-select'
export { DfDictTag } from './df-dict-tag'
export { DfErrorBoundary } from './df-error-boundary'
export { DfLoading } from './df-loading'
export { DfDialog } from './df-dialog'
export { DfExportBtn } from './df-export-btn'
export { DfButton } from './df-button'
export { DfInput } from './df-input'
export { DfCheckbox } from './df-checkbox'
export { DfSwitch } from './df-switch'
export { DfRadio } from './df-radio'
export { DfTooltip } from './df-tooltip'

// Batch 1: 纯 CSS 简单
export { DfTag } from './df-tag'
export { DfBadge } from './df-badge'
export { DfCard } from './df-card'
export { DfEmpty } from './df-empty'
export { DfAlert } from './df-alert'
export { DfDivider } from './df-divider'
export { DfLink } from './df-link'
export { DfSpace } from './df-space'
export { DfAvatar } from './df-avatar'

// Batch 2: 纯 CSS 中等
export { DfBreadcrumb, DfBreadcrumbItem } from './df-breadcrumb'
export { DfTimeline, DfTimelineItem } from './df-timeline'
export { DfSteps, DfStep } from './df-steps'
export { DfCollapse, DfCollapseItem } from './df-collapse'
export { DfButtonGroup } from './df-button-group'
export { DfBacktop } from './df-backtop'
export { DfProgress } from './df-progress'
export { DfImage } from './df-image'

// Batch 3: DevExtreme 封装
export { DfTabs, DfTabPane } from './df-tabs'
export { DfDatePicker } from './df-date-picker'
export { DfInputNumber } from './df-input-number'
export { DfDrawer } from './df-drawer'
export { DfDropdown, DfDropdownItem, DfDropdownMenu } from './df-dropdown'
export { DfPagination } from './df-pagination'
export { DfPopover } from './df-popover'
export { DfPopconfirm } from './df-popconfirm'
export { DfScrollbar } from './df-scrollbar'

// Batch 4: 复合组件
export { DfTree } from './df-tree'
export { DfTreeSelect } from './df-tree-select'
export { DfUpload } from './df-upload'
export type { UploadFile } from './df-upload'
export { DfTransfer } from './df-transfer'
export { DfCascader } from './df-cascader'

// Batch 5+: 高优先级补充
export { DfMenu, DfMenuItem, DfSubmenu, DfMenuItemGroup } from './df-menu'
export { DfAutocomplete } from './df-autocomplete'
export { DfButtonList } from './df-button-list'
export type { ButtonItem } from './df-button-list'
export { DfTagSelect } from './df-tag-select'

// Batch 6: 中优先级补充
export { DfTimePicker } from './df-time-picker'
export { DfContextMenu } from './df-context-menu'
export type { ContextMenuItem } from './df-context-menu'
export { DfPageHeader } from './df-page-header'
export { DfCarousel, DfCarouselItem } from './df-carousel'
export { DfSplitPane } from './df-split-pane'
export { DfTreeTable } from './df-tree-table'
export type { TreeTableColumn } from './df-tree-table'

// Batch 7: 低优先级补充
export { DfSlider } from './df-slider'
export { DfColorPicker } from './df-color-picker'
export { DfRate } from './df-rate'
export { DfCalendar } from './df-calendar'
export { DfIcon } from './df-icon'

// 函数式组件 (按需导入，不全局注册)
export { DfMessage } from './df-message'
export type { DfMessageProps, MessageType, MessageOptions } from './df-message'
export { DfMessageBox } from './df-message-box'
export type { MessageBoxOptions, MessageBoxAction } from './df-message-box'
export { DfNotification } from './df-notification'
export type { DfNotificationProps, NotificationType, NotificationPosition, NotificationOptions } from './df-notification'

// Batch 8: DevExtreme 高级组件
export { DfChart, DfPieChart } from './df-chart'
export type { DfChartProps, DfChartSeries, DfPieChartProps } from './df-chart'
export { DfToolbar } from './df-toolbar'
export type { DfToolbarItem } from './df-toolbar'
export { DfScheduler } from './df-scheduler'
export type { DfSchedulerProps, DfAppointment } from './df-scheduler'
export { DfFilterBuilder } from './df-filter-builder'
export type { DfFilterField, DfFilterValue } from './df-filter-builder'
export { DfTextEditor } from './df-text-editor'

// Batch 9: DevExtreme 简单直传组件
export { DfLoadIndicator } from './df-load-indicator'
export { DfProgressBar } from './df-progress-bar'
export { DfBullet } from './df-bullet'
export { DfSparkline } from './df-sparkline'
export { DfToast } from './df-toast'
export { DfLoadPanel } from './df-load-panel'
export { DfGallery } from './df-gallery'
export { DfTileView } from './df-tile-view'
export { DfList } from './df-list'
export { DfAccordion } from './df-accordion'
export { DfActionSheet } from './df-action-sheet'
export { DfSpeedDialAction } from './df-speed-dial-action'

// Batch 10: DevExtreme 表单控件组件
export { DfRadioGroup } from './df-radio-group'
export { DfLookup } from './df-lookup'
export { DfRangeSlider } from './df-range-slider'
export { DfRecurrenceEditor } from './df-recurrence-editor'
export { DfDropDownButton } from './df-drop-down-button'
export { DfValidator } from './df-validator'
export type { DfValidatorProps, DfValidationRule, DfValidationResult, DfRequiredRule, DfRangeRule, DfStringLengthRule, DfPatternRule, DfEmailRule, DfCompareRule, DfCustomRule, DfAsyncRule } from './df-validator'
export { DfValidationGroup } from './df-validation-group'
export { DfValidationSummary } from './df-validation-summary'
export { DfStepper } from './df-stepper'
export { DfResizable } from './df-resizable'

// Batch 11: DevExtreme 可视化组件
export { DfBarGauge } from './df-bar-gauge'
export { DfCircularGauge } from './df-circular-gauge'
export { DfLinearGauge } from './df-linear-gauge'
export { DfFunnel } from './df-funnel'
export { DfPolarChart } from './df-polar-chart'
export { DfSankey } from './df-sankey'
export { DfTreeMap } from './df-tree-map'
export { DfRangeSelector } from './df-range-selector'
export type { DfRangeSelectorProps, DfRangeSelectorScale, DfRangeSelectorChart, DfRangeSelectorSliderMarker, DfRangeSelectorBehavior } from './df-range-selector'
export { DfCardView } from './df-card-view'
export type { DfCardViewProps, DfCardViewColumn, DfCardViewDataSource, DfCardViewSearchPanel, DfCardViewPaging, DfCardViewPager } from './df-card-view'
export { DfMultiView } from './df-multi-view'

// Batch 12: DevExtreme 集合/布局组件
export { DfBox } from './df-box'
export { DfResponsiveBox } from './df-responsive-box'
export { DfSplitter } from './df-splitter'
export { DfDraggable } from './df-draggable'
export { DfPivotGrid } from './df-pivot-grid'
export type { DfPivotGridProps, DfPivotGridDataSource, DfPivotGridField } from './df-pivot-grid'
export { DfDxTabs } from './df-dx-tabs'
export { DfDxPopover } from './df-dx-popover'
export { DfDxContextMenu } from './df-dx-context-menu'

// Batch 13: DevExtreme 导航/Dx版本组件
export { DfDxMenu } from './df-dx-menu'
export { DfDxPagination } from './df-dx-pagination'
export { DfDxButtonGroup } from './df-dx-button-group'
export { DfDxDrawer } from './df-dx-drawer'
export { DfSortable } from './df-sortable'

// Batch 14: DevExtreme 复杂组件
export { DfDiagram } from './df-diagram'
export type { DfDiagramProps, DfDiagramCustomShape, DfDiagramToolbox, DfDiagramToolboxGroup, DfDiagramDataSource } from './df-diagram'
export { DfGantt } from './df-gantt'
export type { DfGanttProps, DfGanttTask, DfGanttDependency, DfGanttResource, DfGanttResourceAssignment, DfGanttScaleType } from './df-gantt'

// Batch 15: 通用布局组件
export {
  DfSearchLayout, DfDetailLayout, DfCardLayout, DfGridLayout,
  DfAppShell, DfTreeGridLayout, DfDashboardLayout, DfTimelineLayout, DfFormLayout, DfStatCard,
} from './df-common-layout'
export type {
  DfSearchLayoutProps,
  DfDetailLayoutProps,
  DfCardLayoutProps,
  DfGridLayoutProps,
  DfAppShellProps,
  DfTreeGridLayoutProps,
  DfDashboardLayoutProps,
  DfTimelineLayoutProps,
  DfFormLayoutProps,
  DfStatCardProps,
  DetailTab,
  DetailAction,
  CardAction,
  GridResponsive,
  FormSection,
} from './df-common-layout'

// HIS 业务组件
export { DfPatientStrip } from './df-patient-strip'
export type { DfPatientStripProps, PatientInfo } from './df-patient-strip'
