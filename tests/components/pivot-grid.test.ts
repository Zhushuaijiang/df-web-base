/**
 * DfPivotGrid 组件测试
 */
import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'

// Mock DxPivotGrid before import
vi.mock('devextreme-vue/pivot-grid', () => ({
  DxPivotGrid: {
    name: 'DxPivotGrid',
    template: '<div class="DxPivotGrid-stub"><slot /></div>',
    props: [
      'dataSource', 'allowSortingBySummary', 'allowFiltering', 'allowExpandAll',
      'showBorders', 'showColumnGrandTotals', 'showRowGrandTotals', 'showTotals',
      'showColumnTotals', 'showRowTotals', 'rowHeaderLayout', 'wordWrapEnabled',
      'height', 'width',
    ],
  },
}))

describe('DfPivotGrid', () => {
  async function importComponent() {
    return (await import('../../src/components/df-pivot-grid')).DfPivotGrid
  }

  it('renders with default props', async () => {
    const DfPivotGrid = await importComponent()
    const wrapper = mount(DfPivotGrid)

    expect(wrapper.find('.df-pivot-grid').exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'DxPivotGrid' }).exists()).toBe(true)
  })

  it('passes dataSource to DxPivotGrid', async () => {
    const DfPivotGrid = await importComponent()
    const dataSource = {
      fields: [
        { area: 'row', dataField: 'region', caption: '地区' },
        { area: 'data', dataField: 'amount', summaryType: 'sum' },
      ],
      store: { type: 'array', data: [] },
    }

    const wrapper = mount(DfPivotGrid, { props: { dataSource } })
    const dx = wrapper.findComponent({ name: 'DxPivotGrid' })
    expect(dx.props('dataSource')).toEqual(dataSource)
  })

  it('applies default prop values', async () => {
    const DfPivotGrid = await importComponent()
    const wrapper = mount(DfPivotGrid)
    const dx = wrapper.findComponent({ name: 'DxPivotGrid' })

    expect(dx.props('allowSortingBySummary')).toBe(true)
    expect(dx.props('allowFiltering')).toBe(true)
    expect(dx.props('allowExpandAll')).toBe(true)
    expect(dx.props('showBorders')).toBe(true)
    expect(dx.props('showColumnGrandTotals')).toBe(true)
    expect(dx.props('showRowGrandTotals')).toBe(true)
    expect(dx.props('showTotals')).toBe(true)
    expect(dx.props('showColumnTotals')).toBe(true)
    expect(dx.props('showRowTotals')).toBe(true)
    expect(dx.props('rowHeaderLayout')).toBe('standard')
    expect(dx.props('wordWrapEnabled')).toBe(false)
  })

  it('overrides prop values', async () => {
    const DfPivotGrid = await importComponent()
    const wrapper = mount(DfPivotGrid, {
      props: {
        allowFiltering: false,
        showBorders: false,
        rowHeaderLayout: 'tree',
        wordWrapEnabled: true,
        height: 500,
        width: '100%',
      },
    })
    const dx = wrapper.findComponent({ name: 'DxPivotGrid' })

    expect(dx.props('allowFiltering')).toBe(false)
    expect(dx.props('showBorders')).toBe(false)
    expect(dx.props('rowHeaderLayout')).toBe('tree')
    expect(dx.props('wordWrapEnabled')).toBe(true)
    expect(dx.props('height')).toBe(500)
    expect(dx.props('width')).toBe('100%')
  })

  it('emits cell-click event', async () => {
    const DfPivotGrid = await importComponent()
    const wrapper = mount(DfPivotGrid)
    const dx = wrapper.findComponent({ name: 'DxPivotGrid' })

    const eventData = { value: 100, columnIndex: 0, rowIndex: 1 }
    await dx.vm.$emit('cell-click', eventData)
    await nextTick()

    expect(wrapper.emitted('cell-click')).toBeTruthy()
    expect(wrapper.emitted('cell-click')![0]).toEqual([eventData])
  })

  it('emits cell-prepared event', async () => {
    const DfPivotGrid = await importComponent()
    const wrapper = mount(DfPivotGrid)
    const dx = wrapper.findComponent({ name: 'DxPivotGrid' })

    const eventData = { cell: {}, area: 'data' }
    await dx.vm.$emit('cell-prepared', eventData)
    await nextTick()

    expect(wrapper.emitted('cell-prepared')).toBeTruthy()
    expect(wrapper.emitted('cell-prepared')![0]).toEqual([eventData])
  })

  it('emits content-ready event', async () => {
    const DfPivotGrid = await importComponent()
    const wrapper = mount(DfPivotGrid)
    const dx = wrapper.findComponent({ name: 'DxPivotGrid' })

    const eventData = { component: {} }
    await dx.vm.$emit('content-ready', eventData)
    await nextTick()

    expect(wrapper.emitted('content-ready')).toBeTruthy()
  })

  it('emits context-menu-preparing event', async () => {
    const DfPivotGrid = await importComponent()
    const wrapper = mount(DfPivotGrid)
    const dx = wrapper.findComponent({ name: 'DxPivotGrid' })

    const eventData = { items: [] }
    await dx.vm.$emit('context-menu-preparing', eventData)
    await nextTick()

    expect(wrapper.emitted('context-menu-preparing')).toBeTruthy()
  })

  it('renders slot content', async () => {
    const DfPivotGrid = await importComponent()
    const wrapper = mount(DfPivotGrid, {
      slots: { default: '<div class="custom-content">Field Chooser</div>' },
    })

    expect(wrapper.find('.custom-content').exists()).toBe(true)
  })

  it('exposes getInstance, getDataSource, bindChart, updateDimensions', async () => {
    const DfPivotGrid = await importComponent()
    const wrapper = mount(DfPivotGrid)

    // exposed methods exist
    expect(typeof wrapper.vm.getInstance).toBe('function')
    expect(typeof wrapper.vm.getDataSource).toBe('function')
    expect(typeof wrapper.vm.bindChart).toBe('function')
    expect(typeof wrapper.vm.updateDimensions).toBe('function')

    // without real DxPivotGrid instance, returns undefined
    expect(wrapper.vm.getInstance()).toBeUndefined()
    expect(wrapper.vm.getDataSource()).toBeUndefined()
  })

  it('has proper CSS structure', async () => {
    const DfPivotGrid = await importComponent()
    const wrapper = mount(DfPivotGrid)

    const root = wrapper.find('.df-pivot-grid')
    expect(root.exists()).toBe(true)
  })
})
