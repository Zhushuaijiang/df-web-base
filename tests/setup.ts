/**
 * Vitest 测试 setup
 * Mock DevExtreme 模块，避免测试环境依赖完整 DevExtreme
 */
import { vi } from 'vitest'

// ─── DevExtreme Core Mocks ───
vi.mock('devextreme/core/config', () => ({
  default: vi.fn(),
}))

vi.mock('devextreme/localization', () => ({
  locale: vi.fn(),
}))

vi.mock('devextreme/data/custom_store', () => ({
  default: vi.fn().mockImplementation((config: any) => config),
}))

// ─── DevExtreme Vue Component Mocks ───
const stub = (name: string) => ({
  name,
  template: `<div class="${name}-stub"><slot /></div>`,
})

vi.mock('devextreme-vue/data-grid', () => ({
  DxDataGrid: stub('DxDataGrid'),
  DxColumn: stub('DxColumn'),
  DxPaging: stub('DxPaging'),
  DxPager: stub('DxPager'),
  DxSelection: stub('DxSelection'),
  DxSorting: stub('DxSorting'),
  DxColumnFixing: stub('DxColumnFixing'),
  DxFilterRow: stub('DxFilterRow'),
  DxHeaderFilter: stub('DxHeaderFilter'),
  DxGroupPanel: stub('DxGroupPanel'),
  DxColumnChooser: stub('DxColumnChooser'),
  DxMasterDetail: stub('DxMasterDetail'),
}))

vi.mock('devextreme-vue/form', () => ({
  DxForm: stub('DxForm'),
  DxSimpleItem: stub('DxSimpleItem'),
  DxGroupItem: stub('DxGroupItem'),
  DxColCountByScreen: stub('DxColCountByScreen'),
}))

vi.mock('devextreme-vue/select-box', () => ({
  DxSelectBox: stub('DxSelectBox'),
}))

vi.mock('devextreme-vue/popup', () => ({
  DxPopup: stub('DxPopup'),
}))

vi.mock('devextreme-vue/button', () => ({
  DxButton: { name: 'DxButton', template: '<button class="DxButton-stub"><slot name="content" /><slot /></button>' },
}))

vi.mock('devextreme-vue/text-box', () => ({
  DxTextBox: stub('DxTextBox'),
}))

vi.mock('devextreme-vue/text-area', () => ({
  DxTextArea: stub('DxTextArea'),
}))

vi.mock('devextreme-vue/check-box', () => ({
  DxCheckBox: stub('DxCheckBox'),
}))

vi.mock('devextreme-vue/switch', () => ({
  DxSwitch: stub('DxSwitch'),
}))

vi.mock('devextreme-vue/tooltip', () => ({
  DxTooltip: stub('DxTooltip'),
}))

vi.mock('devextreme-vue/tab-panel', () => ({
  DxTabPanel: stub('DxTabPanel'),
  DxItem: stub('DxItem'),
}))

vi.mock('devextreme-vue/date-box', () => ({
  DxDateBox: stub('DxDateBox'),
}))

vi.mock('devextreme-vue/date-range-box', () => ({
  DxDateRangeBox: stub('DxDateRangeBox'),
}))

vi.mock('devextreme-vue/number-box', () => ({
  DxNumberBox: stub('DxNumberBox'),
}))

vi.mock('devextreme-vue/scroll-view', () => ({
  DxScrollView: stub('DxScrollView'),
}))

vi.mock('devextreme-vue/tree-view', () => ({
  DxTreeView: stub('DxTreeView'),
}))

vi.mock('devextreme-vue/drop-down-box', () => ({
  DxDropDownBox: stub('DxDropDownBox'),
}))

vi.mock('devextreme-vue/file-uploader', () => ({
  DxFileUploader: stub('DxFileUploader'),
}))

vi.mock('devextreme-vue/autocomplete', () => ({
  DxAutocomplete: stub('DxAutocomplete'),
}))

vi.mock('devextreme-vue/tag-box', () => ({
  DxTagBox: stub('DxTagBox'),
}))

vi.mock('devextreme-vue/tree-list', () => ({
  DxTreeList: stub('DxTreeList'),
  DxColumn: stub('DxColumn'),
  DxPaging: stub('DxPaging'),
  DxPager: stub('DxPager'),
  DxSelection: stub('DxSelection'),
  DxSorting: stub('DxSorting'),
  DxColumnFixing: stub('DxColumnFixing'),
  DxFilterRow: stub('DxFilterRow'),
  DxSearchPanel: stub('DxSearchPanel'),
  DxEditing: stub('DxEditing'),
  DxScrolling: stub('DxScrolling'),
  DxHeaderFilter: stub('DxHeaderFilter'),
  DxToolbar: stub('DxToolbar'),
  DxItem: stub('DxItem'),
}))

vi.mock('devextreme-vue/slider', () => ({
  DxSlider: stub('DxSlider'),
}))

vi.mock('devextreme-vue/color-box', () => ({
  DxColorBox: stub('DxColorBox'),
}))

vi.mock('devextreme-vue/calendar', () => ({
  DxCalendar: stub('DxCalendar'),
}))

// ─── Batch 8: DevExtreme 高级组件 Mocks ───
vi.mock('devextreme-vue/chart', () => ({
  DxChart: stub('DxChart'),
  DxSeries: stub('DxSeries'),
  DxCommonSeriesSettings: stub('DxCommonSeriesSettings'),
  DxLabel: stub('DxLabel'),
  DxLegend: stub('DxLegend'),
  DxTooltip: stub('DxTooltip'),
  DxTitle: stub('DxTitle'),
  DxArgumentAxis: stub('DxArgumentAxis'),
  DxValueAxis: stub('DxValueAxis'),
  DxExport: stub('DxExport'),
  DxScrollBar: stub('DxScrollBar'),
  DxZoomAndPan: stub('DxZoomAndPan'),
  DxAnimation: stub('DxAnimation'),
  DxCommonAnnotationSettings: stub('DxCommonAnnotationSettings'),
}))

vi.mock('devextreme-vue/pie-chart', () => ({
  DxPieChart: stub('DxPieChart'),
  DxSeries: stub('DxSeries'),
  DxLabel: stub('DxLabel'),
  DxLegend: stub('DxLegend'),
  DxTooltip: stub('DxTooltip'),
  DxTitle: stub('DxTitle'),
  DxExport: stub('DxExport'),
  DxAnimation: stub('DxAnimation'),
}))

vi.mock('devextreme-vue/toolbar', () => ({
  DxToolbar: stub('DxToolbar'),
  DxItem: stub('DxItem'),
}))

vi.mock('devextreme-vue/scheduler', () => ({
  DxScheduler: stub('DxScheduler'),
  DxView: stub('DxView'),
  DxResource: stub('DxResource'),
}))

vi.mock('devextreme-vue/filter-builder', () => ({
  DxFilterBuilder: stub('DxFilterBuilder'),
  DxCustomOperation: stub('DxCustomOperation'),
}))

vi.mock('devextreme-vue/html-editor', () => ({
  DxHtmlEditor: stub('DxHtmlEditor'),
  DxToolbar: stub('DxToolbar'),
  DxItem: stub('DxItem'),
  DxMediaResizing: stub('DxMediaResizing'),
}))

// ─── 第三方库 Mocks ───
vi.mock('exceljs', () => ({
  default: { Workbook: class {} },
  Workbook: class {},
}))

vi.mock('file-saver', () => ({
  saveAs: vi.fn(),
}))

vi.mock('axios', () => {
  const instance = {
    interceptors: {
      request: { use: vi.fn() },
      response: { use: vi.fn() },
    },
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
    defaults: { headers: { common: {} } },
  }
  return {
    default: {
      create: vi.fn(() => instance),
      isCancel: vi.fn(() => false),
    },
    isCancel: vi.fn(() => false),
  }
})
