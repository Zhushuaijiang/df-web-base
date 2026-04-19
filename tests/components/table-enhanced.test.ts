import { defineComponent, h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { DF_UI_KEY } from '../../src/install'
import DfTable from '../../src/components/df-table/DfTable.vue'

const DxDataGridStub = defineComponent({
  name: 'DxDataGrid',
  inheritAttrs: false,
  props: {
    dataSource: { type: [Array, Object], default: () => [] },
  },
  setup(props, { attrs, slots }) {
    return () => {
      const slotEntries = Object.entries(slots).filter(([name]) => name !== 'default')
      const firstRow = Array.isArray(props.dataSource) ? props.dataSource[0] : undefined

      return h('div', {
        class: 'dx-data-grid-stub',
        'data-style': String(attrs.style ?? ''),
      }, [
        slots.default?.(),
        ...slotEntries.map(([name, slot]) => h('div', { class: `slot-${name}` }, slot({
          data: {
            data: firstRow ?? { id: 1, name: '张三', status: 1, category: 'A' },
            value: (firstRow ?? { status: 1 }).status,
            rowIndex: 0,
          },
          row: { rowIndex: 0 },
          column: { dataField: name },
        }))),
      ])
    }
  },
})

const makeStub = (name: string) => defineComponent({
  name,
  inheritAttrs: false,
  props: ['visible', 'enabled', 'mode', 'caption', 'dataField', 'cellTemplate', 'fixedPosition', 'width'],
  setup(_, { slots }) {
    return () => h('div', { class: `${name}-stub` }, slots.default?.())
  },
})

const DxColumnStub = defineComponent({
  name: 'DxColumn',
  inheritAttrs: false,
  props: [
    'caption',
    'dataField',
    'cellTemplate',
    'headerCellTemplate',
    'editCellTemplate',
    'fixedPosition',
    'width',
    'allowExporting',
    'allowFiltering',
    'showInColumnChooser',
  ],
  setup(_, { slots }) {
    return () => h('div', { class: 'DxColumn-stub' }, slots.default?.())
  },
})

const baseDfui = {
  http: {} as any,
  stateManager: {
    load: vi.fn().mockResolvedValue(null),
    save: vi.fn().mockResolvedValue(undefined),
    remove: vi.fn().mockResolvedValue(undefined),
  },
  dict: {
    resolve: vi.fn().mockResolvedValue([]),
    getLabel: vi.fn((dictCode: string, value: string | number) => `${dictCode}-${value}`),
  },
  permission: {
    check: vi.fn(() => true),
    checkAll: vi.fn(() => true),
    checkAny: vi.fn(() => true),
  },
  tenant: {
    getTenantId: vi.fn(() => 'tenant'),
    getBranchId: vi.fn(() => 'branch'),
  },
}

function mountTable(props: Record<string, any>, slots: Record<string, any> = {}, dfuiOverrides: Record<string, any> = {}) {
  const dfui = {
    ...baseDfui,
    ...dfuiOverrides,
    dict: {
      ...baseDfui.dict,
      ...(dfuiOverrides.dict ?? {}),
    },
    permission: {
      ...baseDfui.permission,
      ...(dfuiOverrides.permission ?? {}),
    },
    stateManager: {
      ...baseDfui.stateManager,
      ...(dfuiOverrides.stateManager ?? {}),
    },
  }

  return mount(DfTable, {
    props,
    slots,
    global: {
      provide: {
        [DF_UI_KEY as symbol]: dfui,
      },
      stubs: {
        DxDataGrid: DxDataGridStub,
        DxColumn: DxColumnStub,
        DxPaging: makeStub('DxPaging'),
        DxPager: makeStub('DxPager'),
        DxSelection: makeStub('DxSelection'),
        DxSorting: makeStub('DxSorting'),
        DxColumnFixing: makeStub('DxColumnFixing'),
        DxFilterRow: makeStub('DxFilterRow'),
        DxHeaderFilter: makeStub('DxHeaderFilter'),
        DxGroupPanel: makeStub('DxGroupPanel'),
        DxColumnChooser: makeStub('DxColumnChooser'),
        DxMasterDetail: makeStub('DxMasterDetail'),
      },
    },
  })
}

describe('DfTable enhanced features', () => {
  it('supports compatibility aliases and feature toggles', async () => {
    const wrapper = mountTable({
      keyExpr: 'id',
      columns: [
        { dataField: 'status', caption: '状态', cellSlot: 'statusCell' },
      ],
      staticData: [{ id: 1, status: 1 }],
      useFetch: false,
      selectionMode: 'multiple',
      showPaging: false,
      showFilterRow: true,
      showHeaderFilter: true,
      showGroupPanel: true,
      showColumnChooser: true,
      height: 280,
      minHeight: 200,
    }, {
      statusCell: ({ data }: any = {}) => h('span', { class: 'status-cell' }, String(data?.status ?? '')), 
    })

    await nextTick()

    expect(wrapper.find('.DxSelection-stub').exists()).toBe(true)
    expect(wrapper.find('.DxFilterRow-stub').exists()).toBe(true)
    expect(wrapper.find('.DxHeaderFilter-stub').exists()).toBe(true)
    expect(wrapper.find('.DxGroupPanel-stub').exists()).toBe(true)
    expect(wrapper.find('.DxColumnChooser-stub').exists()).toBe(true)

    const setupState = (wrapper.vm as any).$.setupState
    expect(setupState.resolvedGridStyle).toContain('height: 280px')
    expect(setupState.resolvedGridStyle).toContain('min-height: 200px')

    const columns = wrapper.findAllComponents(DxColumnStub)
    expect(columns).toHaveLength(1)
    expect(columns[0].props('cellTemplate')).toBe('statusCell')
    expect(wrapper.find('.slot-statusCell .status-cell').exists()).toBe(true)
  })

  it('renders custom operation column slot and config', async () => {
    const wrapper = mountTable({
      keyExpr: 'id',
      gridDataColumns: [{ dataField: 'name', caption: '姓名' }],
      dataList: [{ id: 1, name: '张三' }],
      useFetch: false,
      operationColumn: {
        caption: '操作区',
        width: 160,
        fixedPosition: 'left',
        slotName: 'customAction',
      },
    }, {
      customAction: ({ data }: any = {}) => h('button', { class: 'custom-action' }, `处理${data?.name ?? ''}`),
    })

    await nextTick()

    expect(wrapper.find('.custom-action').exists()).toBe(true)

    const columns = wrapper.findAllComponents(DxColumnStub)
    const actionColumn = columns.find((item) => item.props('dataField') === '__action')
    expect(actionColumn).toBeTruthy()
    expect(actionColumn?.props('caption')).toBe('操作区')
    expect(actionColumn?.props('fixedPosition')).toBe('left')
    expect(actionColumn?.props('width')).toBe(160)
    expect(actionColumn?.props('cellTemplate')).toBe('customAction')
  })

  it('filters operation buttons by permission and disabled state', async () => {
    const wrapper = mountTable({
      keyExpr: 'id',
      gridDataColumns: [{ dataField: 'name', caption: '姓名' }],
      dataList: [{ id: 1, name: '张三' }],
      useFetch: false,
      operationColumn: {
        buttons: [
          { text: '编辑', disabled: () => true, click: vi.fn() },
          { text: '删除', permissionCode: 'delete', click: vi.fn() },
        ],
      },
    }, {}, {
      permission: {
        ...baseDfui.permission,
        check: vi.fn((code: string) => code !== 'delete'),
      },
    })

    await nextTick()

    const buttons = wrapper.findAll('.df-dx-table-operation-btn')
    expect(buttons).toHaveLength(1)
    expect(buttons[0].text()).toBe('编辑')
    expect(buttons[0].attributes('disabled')).toBeDefined()
    expect(wrapper.html()).not.toContain('删除')
  })

  it('emits update payload and normalizes operation row index', async () => {
    const click = vi.fn()
    const wrapper = mountTable({
      keyExpr: 'id',
      gridDataColumns: [{ dataField: 'name', caption: '姓名' }],
      dataList: [{ id: 1, name: '张三' }],
      useFetch: false,
      operationButtons: [{ text: '编辑', click }],
    })

    await nextTick()

    const setupState = (wrapper.vm as any).$.setupState
    expect(setupState.resolveOperationRowIndex({ rowIndex: 3 })).toBe(3)
    expect(setupState.resolveOperationRowIndex({ dataIndex: 5 })).toBe(5)

    setupState.onRowUpdated({
      key: 1,
      data: { id: 1, name: '李四' },
      component: {
        getDataSource: () => ({ _items: [{ id: 1, name: '李四' }] }),
      },
    })

    expect(wrapper.emitted('update')).toBeTruthy()
    expect(wrapper.emitted('update')?.[0]?.[0]).toEqual({
      key: 1,
      values: { id: 1, name: '李四' },
      items: [{ id: 1, name: '李四' }],
    })
  })

  it('supports row detail, dict text, and merge rule handling', async () => {
    const wrapper = mountTable({
      keyExpr: 'id',
      gridDataColumns: [
        { dataField: 'status', caption: '状态', dictCode: 'PATIENT_STATUS' },
        { dataField: 'category', caption: '分类', mergeRule: 'same-value' },
      ],
      dataList: [
        { id: 1, status: 1, category: 'A' },
        { id: 2, status: 2, category: 'A' },
      ],
      useFetch: false,
    }, {
      rowDetail: ({ data }: any) => h('div', { class: 'row-detail' }, `明细:${data.id}`),
    })

    await nextTick()

    expect(wrapper.find('.row-detail').text()).toContain('明细:1')

    const setupState = (wrapper.vm as any).$.setupState
    const normalizedColumns = setupState.finalColumns as Array<any>
    expect(normalizedColumns[0].customizeText({ value: 1, valueText: '1' })).toBe('PATIENT_STATUS-1')

    const cellElement = document.createElement('div')
    setupState.onCellPrepared({
      rowType: 'data',
      rowIndex: 1,
      column: { dataField: 'category' },
      data: { id: 2, category: 'A' },
      cellElement,
      component: {
        getVisibleRows: () => [
          { data: { id: 1, category: 'A' } },
          { data: { id: 2, category: 'A' } },
        ],
      },
    })

    expect(cellElement.classList.contains('df-dx-table-cell--merged')).toBe(true)
    expect(cellElement.style.color).toBe('transparent')
  })
})
