/**
 * CommonLayout 通用布局组件测试
 * DfSearchLayout, DfDetailLayout, DfCardLayout, DfGridLayout
 */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import { h, nextTick, ref, defineComponent } from 'vue'
import { DF_UI_KEY } from '../../src/install'

import { DfSearchLayout } from '../../src/components/df-common-layout'
import { DfDetailLayout } from '../../src/components/df-common-layout'
import { DfCardLayout } from '../../src/components/df-common-layout'
import { DfGridLayout } from '../../src/components/df-common-layout'

const dfui = {
  http: {} as any,
  stateManager: { load: async () => null, save: async () => {}, remove: async () => {} },
  dict: { resolve: async () => [], getLabel: () => '' },
  permission: { check: () => true, checkAll: () => true, checkAny: () => true },
  tenant: { getTenantId: () => '1', getBranchId: () => '1' },
}

function mountDf(component: any, props: Record<string, any> = {}, slots: Record<string, any> = {}) {
  return mount(component, {
    props,
    slots,
    global: { provide: { [DF_UI_KEY as symbol]: dfui } },
  })
}

function mountDetailLayout(props: Record<string, any> = {}, slots: Record<string, any> = {}) {
  return mount(DfDetailLayout, {
    props,
    slots,
    global: {
      provide: { [DF_UI_KEY as symbol]: dfui },
      stubs: {
        DfButton: defineComponent({
          name: 'DfButton',
          props: ['type', 'size', 'icon', 'disabled'],
          emits: ['click'],
          setup(stubProps, { slots: stubSlots, emit }) {
            return () => h('button', {
              class: 'stub-df-button',
              'data-type': stubProps.type || 'default',
              'data-size': stubProps.size || 'default',
              'data-icon': stubProps.icon || '',
              disabled: stubProps.disabled,
              onClick: (event: MouseEvent) => emit('click', event),
            }, stubSlots.default?.())
          },
        }),
        DfSplitPane: defineComponent({
          name: 'DfSplitPane',
          props: ['defaultRatio', 'direction'],
          template: '<div class="df-split-pane" :data-default-ratio="String(defaultRatio)" :data-direction="direction"><div class="df-split-pane__first"><slot name="first" /></div><div class="df-split-pane__second"><slot name="second" /></div></div>',
        }),
      },
    },
  })
}

// ═══════════════════════════════════════════
// DfSearchLayout
// ═══════════════════════════════════════════
describe('DfSearchLayout', () => {
  it('renders with default props', () => {
    const wrapper = mountDf(DfSearchLayout, {}, {
      search: () => h('div', { class: 'search-form' }, 'search'),
      default: () => h('div', { class: 'table-area' }, 'table'),
    })
    expect(wrapper.find('.df-search-layout').exists()).toBe(true)
    expect(wrapper.find('.search-form').exists()).toBe(true)
    expect(wrapper.find('.table-area').exists()).toBe(true)
  })

  it('renders search and reset buttons', () => {
    const wrapper = mountDf(DfSearchLayout, {
      searchText: '搜索',
      resetText: '清空',
    })
    // DxButton is stubbed in tests — just verify stubs render
    const stubs = wrapper.findAll('.DxButton-stub')
    expect(stubs.length).toBeGreaterThanOrEqual(2)
  })

  it('emits search event on search button click', async () => {
    const wrapper = mountDf(DfSearchLayout)
    // Trigger via the first DxButton stub (search button)
    const stubs = wrapper.findAll('.DxButton-stub')
    expect(stubs.length).toBeGreaterThanOrEqual(1)
    await stubs[0].trigger('click')
    expect(wrapper.emitted('search')).toHaveLength(1)
  })

  it('emits reset event on reset button click', async () => {
    const wrapper = mountDf(DfSearchLayout)
    const stubs = wrapper.findAll('.DxButton-stub')
    expect(stubs.length).toBeGreaterThanOrEqual(2)
    await stubs[1].trigger('click')
    expect(wrapper.emitted('reset')).toHaveLength(1)
  })

  it('shows collapse toggle when collapsible=true', () => {
    const wrapper = mountDf(DfSearchLayout, { collapsible: true })
    expect(wrapper.find('.df-search-layout__toggle').exists()).toBe(true)
  })

  it('hides collapse toggle when collapsible=false', () => {
    const wrapper = mountDf(DfSearchLayout, { collapsible: false })
    expect(wrapper.find('.df-search-layout__toggle').exists()).toBe(false)
  })

  it('toggles collapsed state on click', async () => {
    const wrapper = mountDf(DfSearchLayout, { collapsible: true }, {
      search: () => h('div', { class: 'search-body' }, 'form'),
    })
    // Initially expanded — no display:none
    expect(wrapper.find('.df-search-layout__search-body').attributes('style') ?? '').not.toContain('display: none')
    // Click toggle
    await wrapper.find('.df-search-layout__toggle').trigger('click')
    await nextTick()
    expect(wrapper.find('.df-search-layout__search-body').attributes('style')).toContain('display: none')
    // Toggle text should change
    expect(wrapper.find('.df-search-layout__toggle').text()).toContain('展开')
    // Click again
    await wrapper.find('.df-search-layout__toggle').trigger('click')
    await nextTick()
    expect(wrapper.find('.df-search-layout__search-body').attributes('style')).not.toContain('display: none')
  })

  it('starts collapsed when defaultCollapsed=true', () => {
    const wrapper = mountDf(DfSearchLayout, {
      collapsible: true,
      defaultCollapsed: true,
    }, {
      search: () => h('div', { class: 'search-body' }, 'form'),
    })
    expect(wrapper.find('.df-search-layout__search-body').attributes('style')).toContain('display: none')
  })

  it('disables buttons when loading=true', () => {
    const wrapper = mountDf(DfSearchLayout, { loading: true })
    const stubs = wrapper.findAll('.DxButton-stub')
    expect(stubs.length).toBeGreaterThanOrEqual(1)
    // First DxButton is the search button — check disabled attribute
    expect(stubs[0].attributes('disabled')).toBeDefined()
  })

  it('shows spinner when loading=true', () => {
    const wrapper = mountDf(DfSearchLayout, { loading: true })
    expect(wrapper.find('.df-search-layout__spinner').exists()).toBe(true)
  })

  it('renders toolbar slot', () => {
    const wrapper = mountDf(DfSearchLayout, {}, {
      toolbar: () => h('div', { class: 'custom-toolbar' }, 'toolbar'),
    })
    expect(wrapper.find('.df-search-layout__toolbar').exists()).toBe(true)
    expect(wrapper.find('.custom-toolbar').exists()).toBe(true)
  })

  it('hides toolbar section when no toolbar slot', () => {
    const wrapper = mountDf(DfSearchLayout)
    expect(wrapper.find('.df-search-layout__toolbar').exists()).toBe(false)
  })

  it('exposes collapse/expand methods', async () => {
    const wrapper = mountDf(DfSearchLayout, { collapsible: true }, {
      search: () => h('div', { class: 'search-body' }, 'form'),
    })
    const vm = wrapper.vm as any
    vm.collapse()
    await nextTick()
    expect(wrapper.find('.df-search-layout__search-body').attributes('style') ?? '').toContain('display: none')
    vm.expand()
    await nextTick()
    expect(wrapper.find('.df-search-layout__search-body').attributes('style') ?? '').not.toContain('display: none')
  })

  it('renders custom searchActions slot', () => {
    const wrapper = mountDf(DfSearchLayout, {}, {
      searchActions: () => h('button', { class: 'custom-btn' }, 'Custom Search'),
    })
    expect(wrapper.find('.custom-btn').exists()).toBe(true)
  })
})

// ═══════════════════════════════════════════
// DfDetailLayout
// ═══════════════════════════════════════════
describe('DfDetailLayout', () => {
  it('renders with title and subtitle', () => {
    const wrapper = mountDetailLayout({
      title: '患者详情',
      subtitle: '住院号: 20240001',
    })
    expect(wrapper.find('.df-detail-layout__title').text()).toBe('患者详情')
    expect(wrapper.find('.df-detail-layout__subtitle').text()).toBe('住院号: 20240001')
  })

  it('shows back button by default', () => {
    const wrapper = mountDetailLayout({ title: 'Test' })
    expect(wrapper.find('.df-detail-layout__back').exists()).toBe(true)
  })

  it('hides back button when showBackButton=false', () => {
    const wrapper = mountDetailLayout({ title: 'Test', showBackButton: false })
    expect(wrapper.find('.df-detail-layout__back').exists()).toBe(false)
  })

  it('emits back on back button click', async () => {
    const wrapper = mountDetailLayout({ title: 'Test' })
    await wrapper.find('.df-detail-layout__back').trigger('click')
    expect(wrapper.emitted('back')).toHaveLength(1)
  })

  it('renders action buttons using DfButton contract', () => {
    const wrapper = mountDetailLayout({
      title: 'Test',
      actions: [
        { key: 'edit', text: '编辑', type: 'primary' },
        { key: 'delete', text: '删除', type: 'danger' },
      ],
    })
    const btns = wrapper.findAll('.df-detail-layout__action-btn.stub-df-button')
    expect(btns).toHaveLength(2)
    expect(btns[0].text()).toBe('编辑')
    expect(btns[0].attributes('data-type')).toBe('primary')
    expect(btns[0].attributes('data-size')).toBe('small')
    expect(btns[1].text()).toBe('删除')
    expect(btns[1].attributes('data-type')).toBe('danger')
  })

  it('emits action event with key', async () => {
    const wrapper = mountDetailLayout({
      title: 'Test',
      actions: [{ key: 'save', text: '保存' }],
    })
    await wrapper.find('.df-detail-layout__action-btn').trigger('click')
    expect(wrapper.emitted('action')).toEqual([['save']])
  })

  it('renders disabled action button', () => {
    const wrapper = mountDetailLayout({
      title: 'Test',
      actions: [{ key: 'save', text: '保存', disabled: true }],
    })
    const btn = wrapper.find('.df-detail-layout__action-btn')
    expect((btn.element as HTMLButtonElement).disabled).toBe(true)
  })

  it('uses default button size for default density actions', () => {
    const wrapper = mountDetailLayout({
      title: 'Test',
      density: 'default',
      actions: [{ key: 'save', text: '保存', type: 'primary' }],
    })
    expect(wrapper.find('.df-detail-layout__action-btn').attributes('data-size')).toBe('default')
  })

  it('renders default slot in non-split mode', () => {
    const wrapper = mountDetailLayout({ title: 'Test' }, {
      default: () => h('div', { class: 'main-content' }, 'content'),
    })
    expect(wrapper.find('.main-content').exists()).toBe(true)
  })

  it('renders split layout with DfSplitPane', () => {
    const wrapper = mountDetailLayout({
      title: 'Test',
      splitLayout: true,
      splitRatio: 0.5,
    }, {
      left: () => h('div', { class: 'left-panel' }, 'left'),
      right: () => h('div', { class: 'right-panel' }, 'right'),
    })
    expect(wrapper.find('.df-split-pane').exists()).toBe(true)
    expect(wrapper.find('.left-panel').exists()).toBe(true)
    expect(wrapper.find('.right-panel').exists()).toBe(true)
  })

  it('passes splitRatio and horizontal direction to split pane', () => {
    const wrapper = mountDetailLayout({
      title: 'Test',
      splitLayout: true,
      splitRatio: 0.72,
    }, {
      left: () => h('div', 'left'),
      right: () => h('div', 'right'),
    })
    const splitPane = wrapper.find('.df-split-pane')
    expect(splitPane.attributes('data-default-ratio')).toBe('0.72')
    expect(splitPane.attributes('data-direction')).toBe('horizontal')
  })

  it('renders toolbar slot inside toolbar container', () => {
    const wrapper = mountDetailLayout({ title: 'Test' }, {
      toolbar: () => h('div', { class: 'toolbar-content' }, 'toolbar'),
    })
    expect(wrapper.find('.df-detail-layout__toolbar').exists()).toBe(true)
    expect(wrapper.find('.toolbar-content').exists()).toBe(true)
  })

  it('renders tabs when tabs prop provided', () => {
    const wrapper = mountDetailLayout({
      title: 'Test',
      tabs: [
        { key: 'basic', title: '基本信息' },
        { key: 'medical', title: '诊疗记录' },
      ],
    }, {
      'tab-basic': () => h('div', { class: 'tab-basic-content' }, 'basic'),
      'tab-medical': () => h('div', { class: 'tab-medical-content' }, 'medical'),
    })
    expect(wrapper.find('.df-detail-layout__tab-bar').exists()).toBe(true)
    const tabBtns = wrapper.findAll('.df-detail-layout__tab')
    expect(tabBtns).toHaveLength(2)
    expect(tabBtns[0].text()).toBe('基本信息')
    expect(tabBtns[1].text()).toBe('诊疗记录')
  })

  it('first tab is active by default', () => {
    const wrapper = mountDetailLayout({
      title: 'Test',
      tabs: [
        { key: 'a', title: 'Tab A' },
        { key: 'b', title: 'Tab B' },
      ],
    }, {
      'tab-a': () => h('div', 'A'),
      'tab-b': () => h('div', 'B'),
    })
    const tabBtns = wrapper.findAll('.df-detail-layout__tab')
    expect(tabBtns[0].classes()).toContain('df-detail-layout__tab--active')
  })

  it('switches tab on click and emits tab-change', async () => {
    const wrapper = mountDetailLayout({
      title: 'Test',
      tabs: [
        { key: 'a', title: 'Tab A' },
        { key: 'b', title: 'Tab B' },
      ],
    }, {
      'tab-a': () => h('div', 'A'),
      'tab-b': () => h('div', 'B'),
    })
    await wrapper.findAll('.df-detail-layout__tab')[1].trigger('click')
    expect(wrapper.emitted('tab-change')).toEqual([['b']])
    expect(wrapper.emitted('update:activeTab')).toEqual([['b']])
  })

  it('lazy tab content not rendered until visited', async () => {
    const wrapper = mountDetailLayout({
      title: 'Test',
      tabs: [
        { key: 'a', title: 'Tab A' },
        { key: 'b', title: 'Tab B', lazy: true },
      ],
    }, {
      'tab-a': () => h('div', { class: 'content-a' }, 'A'),
      'tab-b': () => h('div', { class: 'content-b' }, 'B'),
    })
    // Lazy tab should not be rendered initially
    expect(wrapper.find('.content-b').exists()).toBe(false)
    // Click on lazy tab
    await wrapper.findAll('.df-detail-layout__tab')[1].trigger('click')
    await nextTick()
    expect(wrapper.find('.content-b').exists()).toBe(true)
  })

  it('does not show tabs section when no tabs', () => {
    const wrapper = mountDetailLayout({ title: 'Test' })
    expect(wrapper.find('.df-detail-layout__tab-bar').exists()).toBe(false)
  })

  it('activates first tab when tabs are injected later', async () => {
    const wrapper = mountDetailLayout({ title: 'Test', tabs: [] }, {
      'tab-a': () => h('div', { class: 'content-a' }, 'A'),
      'tab-b': () => h('div', { class: 'content-b' }, 'B'),
    })
    await wrapper.setProps({
      tabs: [
        { key: 'a', title: 'Tab A' },
        { key: 'b', title: 'Tab B' },
      ],
    })
    await nextTick()
    const tabBtns = wrapper.findAll('.df-detail-layout__tab')
    expect(tabBtns).toHaveLength(2)
    expect(tabBtns[0].classes()).toContain('df-detail-layout__tab--active')
    expect(wrapper.find('.content-a').exists()).toBe(true)
  })

  it('renders footer slot', () => {
    const wrapper = mountDetailLayout({ title: 'Test' }, {
      footer: () => h('div', { class: 'footer-btns' }, 'Save Cancel'),
    })
    expect(wrapper.find('.df-detail-layout__footer').exists()).toBe(true)
    expect(wrapper.find('.footer-btns').exists()).toBe(true)
  })

  it('renders custom header slot', () => {
    const wrapper = mountDetailLayout({ title: 'Test' }, {
      header: () => h('div', { class: 'custom-header' }, 'Custom Header'),
    })
    expect(wrapper.find('.custom-header').exists()).toBe(true)
    expect(wrapper.find('.df-detail-layout__back').exists()).toBe(true)
    expect(wrapper.find('.df-detail-layout__title').exists()).toBe(false)
  })

  it('renders statusTags with custom headerActions slot and suppresses default actions', () => {
    const wrapper = mountDetailLayout({
      title: 'Test',
      actions: [{ key: 'save', text: '保存', type: 'primary' }],
    }, {
      statusTags: () => h('span', { class: 'status-tag' }, '草稿'),
      headerActions: () => h('div', { class: 'custom-header-actions' }, '更多操作'),
    })

    expect(wrapper.find('.status-tag').exists()).toBe(true)
    expect(wrapper.find('.custom-header-actions').exists()).toBe(true)
    expect(wrapper.find('.df-detail-layout__action-btn').exists()).toBe(false)
  })

  it('exposes switchTab method', async () => {
    const wrapper = mountDetailLayout({
      title: 'Test',
      tabs: [
        { key: 'a', title: 'A' },
        { key: 'b', title: 'B' },
      ],
    }, {
      'tab-a': () => h('div', 'A'),
      'tab-b': () => h('div', 'B'),
    })
    const vm = wrapper.vm as any
    vm.switchTab('b')
    await nextTick()
    const tabBtns = wrapper.findAll('.df-detail-layout__tab')
    expect(tabBtns[1].classes()).toContain('df-detail-layout__tab--active')
  })

  it('updates tab from activeTab prop', async () => {
    const wrapper = mountDetailLayout({
      title: 'Test',
      activeTab: 'a',
      tabs: [
        { key: 'a', title: 'A' },
        { key: 'b', title: 'B' },
      ],
    }, {
      'tab-a': () => h('div', 'A'),
      'tab-b': () => h('div', 'B'),
    })
    await wrapper.setProps({ activeTab: 'b' })
    await nextTick()
    const tabBtns = wrapper.findAll('.df-detail-layout__tab')
    expect(tabBtns[1].classes()).toContain('df-detail-layout__tab--active')
  })

  it('falls back to the first tab when current tab is removed', async () => {
    const wrapper = mountDetailLayout({
      title: 'Test',
      activeTab: 'b',
      tabs: [
        { key: 'a', title: 'A' },
        { key: 'b', title: 'B' },
      ],
    }, {
      'tab-a': () => h('div', { class: 'content-a' }, 'A'),
      'tab-b': () => h('div', { class: 'content-b' }, 'B'),
    })

    await wrapper.setProps({
      tabs: [
        { key: 'a', title: 'A' },
        { key: 'c', title: 'C' },
      ],
      activeTab: undefined,
    })
    await nextTick()

    const tabBtns = wrapper.findAll('.df-detail-layout__tab')
    expect(tabBtns).toHaveLength(2)
    expect(tabBtns[0].classes()).toContain('df-detail-layout__tab--active')
    expect(wrapper.find('.content-a').exists()).toBe(true)
    expect(wrapper.find('.content-b').exists()).toBe(false)
  })

  it('prefers a valid activeTab when tabs are replaced', async () => {
    const wrapper = mountDetailLayout({
      title: 'Test',
      activeTab: 'b',
      tabs: [
        { key: 'a', title: 'A' },
        { key: 'b', title: 'B' },
      ],
    }, {
      'tab-a': () => h('div', { class: 'content-a' }, 'A'),
      'tab-b': () => h('div', { class: 'content-b' }, 'B'),
      'tab-c': () => h('div', { class: 'content-c' }, 'C'),
    })

    await wrapper.setProps({
      activeTab: 'c',
      tabs: [
        { key: 'a', title: 'A' },
        { key: 'c', title: 'C' },
      ],
    })
    await nextTick()

    const tabBtns = wrapper.findAll('.df-detail-layout__tab')
    expect(tabBtns[1].classes()).toContain('df-detail-layout__tab--active')
    expect(wrapper.find('.content-c').exists()).toBe(true)
  })

  it('applies density class', () => {
    const compactWrapper = mountDetailLayout({ title: 'Test', density: 'compact' })
    const defaultWrapper = mountDetailLayout({ title: 'Test', density: 'default' })
    expect(compactWrapper.find('.df-detail-layout--compact').exists()).toBe(true)
    expect(defaultWrapper.find('.df-detail-layout--default').exists()).toBe(true)
  })
})

// ═══════════════════════════════════════════
// DfCardLayout
// ═══════════════════════════════════════════
describe('DfCardLayout', () => {
  it('renders with title', () => {
    const wrapper = mountDf(DfCardLayout, { title: '今日概览' }, {
      default: () => h('div', 'content'),
    })
    expect(wrapper.find('.df-card-layout__title').text()).toBe('今日概览')
    expect(wrapper.find('.df-card-layout').exists()).toBe(true)
  })

  it('renders content slot', () => {
    const wrapper = mountDf(DfCardLayout, {}, {
      default: () => h('p', 'Hello World'),
    })
    expect(wrapper.find('p').text()).toBe('Hello World')
  })

  it('renders footer slot', () => {
    const wrapper = mountDf(DfCardLayout, { title: 'Test' }, {
      default: () => h('div', 'body'),
      footer: () => h('div', { class: 'card-footer' }, 'footer'),
    })
    expect(wrapper.find('.df-card-layout__footer').exists()).toBe(true)
    expect(wrapper.find('.card-footer').exists()).toBe(true)
  })

  it('renders custom header slot', () => {
    const wrapper = mountDf(DfCardLayout, {}, {
      header: () => h('span', { class: 'custom-title' }, 'Custom'),
      default: () => h('div', 'body'),
    })
    expect(wrapper.find('.custom-title').exists()).toBe(true)
  })

  it('applies shadow class', () => {
    const wrapper = mountDf(DfCardLayout, { shadow: 'lg' }, {
      default: () => h('div', 'body'),
    })
    expect(wrapper.find('.df-card-layout--shadow-lg').exists()).toBe(true)
  })

  it('applies bordered class by default', () => {
    const wrapper = mountDf(DfCardLayout, {}, {
      default: () => h('div', 'body'),
    })
    expect(wrapper.find('.df-card-layout--bordered').exists()).toBe(true)
  })

  it('removes border when bordered=false', () => {
    const wrapper = mountDf(DfCardLayout, { bordered: false }, {
      default: () => h('div', 'body'),
    })
    expect(wrapper.find('.df-card-layout--bordered').exists()).toBe(false)
  })

  it('applies custom padding as number', () => {
    const wrapper = mountDf(DfCardLayout, { title: 'Test', padding: 24 }, {
      default: () => h('div', 'body'),
    })
    const body = wrapper.find('.df-card-layout__body')
    expect(body.attributes('style')).toContain('padding: 24px')
  })

  it('applies custom padding as string', () => {
    const wrapper = mountDf(DfCardLayout, { title: 'Test', padding: '16px 24px' }, {
      default: () => h('div', 'body'),
    })
    const body = wrapper.find('.df-card-layout__body')
    expect(body.attributes('style')).toContain('padding: 16px 24px')
  })

  it('shows collapse trigger when collapsible=true', () => {
    const wrapper = mountDf(DfCardLayout, { title: 'Test', collapsible: true }, {
      default: () => h('div', 'body'),
    })
    expect(wrapper.find('.df-card-layout__collapse-trigger').exists()).toBe(true)
  })

  it('hides collapse trigger when collapsible=false', () => {
    const wrapper = mountDf(DfCardLayout, { title: 'Test', collapsible: false }, {
      default: () => h('div', 'body'),
    })
    expect(wrapper.find('.df-card-layout__collapse-trigger').exists()).toBe(false)
  })

  it('toggles collapsed state on header click when collapsible', async () => {
    const wrapper = mountDf(DfCardLayout, { title: 'Test', collapsible: true }, {
      default: () => h('div', 'body'),
    })
    expect(wrapper.find('.df-card-layout__body').attributes('style') ?? '').not.toContain('display: none')
    await wrapper.find('.df-card-layout__header').trigger('click')
    await nextTick()
    expect(wrapper.find('.df-card-layout__body').attributes('style')).toContain('display: none')
    expect(wrapper.emitted('update:collapsed')).toEqual([[true]])
  })

  it('does not toggle on header click when not collapsible', async () => {
    const wrapper = mountDf(DfCardLayout, { title: 'Test', collapsible: false }, {
      default: () => h('div', 'body'),
    })
    await wrapper.find('.df-card-layout__header').trigger('click')
    await nextTick()
    expect(wrapper.find('.df-card-layout__body').attributes('style')).not.toContain('display: none')
  })

  it('starts collapsed when defaultCollapsed=true', () => {
    const wrapper = mountDf(DfCardLayout, {
      title: 'Test',
      collapsible: true,
      defaultCollapsed: true,
    }, {
      default: () => h('div', 'body'),
    })
    expect(wrapper.find('.df-card-layout__body').attributes('style')).toContain('display: none')
    expect(wrapper.find('.df-card-layout--collapsed').exists()).toBe(true)
  })

  it('renders action buttons and emits action event', async () => {
    const wrapper = mountDf(DfCardLayout, {
      title: 'Test',
      actions: [
        { key: 'refresh', text: '刷新' },
        { key: 'settings', icon: 'dx-icon-settings' },
      ],
    }, {
      default: () => h('div', 'body'),
    })
    const actions = wrapper.findAll('.df-card-layout__action')
    expect(actions).toHaveLength(2)
    expect(actions[0].text()).toBe('刷新')
    await actions[0].trigger('click')
    expect(wrapper.emitted('action')).toEqual([['refresh']])
  })

  it('applies cssClass prop', () => {
    const wrapper = mountDf(DfCardLayout, { cssClass: 'my-custom-card' }, {
      default: () => h('div', 'body'),
    })
    expect(wrapper.find('.my-custom-card').exists()).toBe(true)
  })

  it('hides footer when collapsed', () => {
    const wrapper = mountDf(DfCardLayout, {
      title: 'Test',
      collapsible: true,
      defaultCollapsed: true,
    }, {
      default: () => h('div', 'body'),
      footer: () => h('div', { class: 'card-footer' }, 'footer'),
    })
    expect(wrapper.find('.df-card-layout__footer').exists()).toBe(false)
  })

  it('hides header when no title, header slot, or actions', () => {
    const wrapper = mountDf(DfCardLayout, {}, {
      default: () => h('div', 'body only'),
    })
    expect(wrapper.find('.df-card-layout__header').exists()).toBe(false)
  })
})

// ═══════════════════════════════════════════
// DfGridLayout
// ═══════════════════════════════════════════
describe('DfGridLayout', () => {
  it('renders grid with default cols=3', () => {
    const wrapper = mountDf(DfGridLayout, {}, {
      default: () => [h('div', 'item1'), h('div', 'item2'), h('div', 'item3')],
    })
    const root = wrapper.find('.df-grid-layout')
    expect(root.exists()).toBe(true)
    expect(root.attributes('style')).toContain('grid-template-columns: repeat(3, 1fr)')
  })

  it('applies custom cols', () => {
    const wrapper = mountDf(DfGridLayout, { cols: 4 }, {
      default: () => [h('div', 'a'), h('div', 'b')],
    })
    expect(wrapper.find('.df-grid-layout').attributes('style')).toContain('repeat(4, 1fr)')
  })

  it('applies row and col gap', () => {
    const wrapper = mountDf(DfGridLayout, { rowGap: 24, colGap: 32 }, {
      default: () => h('div', 'item'),
    })
    const style = wrapper.find('.df-grid-layout').attributes('style')!
    expect(style).toContain('row-gap: 24px')
    expect(style).toContain('column-gap: 32px')
  })

  it('applies equal-height class', () => {
    const wrapper = mountDf(DfGridLayout, { equalHeight: true }, {
      default: () => h('div', 'item'),
    })
    expect(wrapper.find('.df-grid-layout--equal-height').exists()).toBe(true)
  })

  it('does not apply equal-height class by default', () => {
    const wrapper = mountDf(DfGridLayout, {}, {
      default: () => h('div', 'item'),
    })
    expect(wrapper.find('.df-grid-layout--equal-height').exists()).toBe(false)
  })

  it('uses responsive breakpoints (sm)', async () => {
    // Simulate small window
    Object.defineProperty(window, 'innerWidth', { value: 600, writable: true })
    window.dispatchEvent(new Event('resize'))
    await nextTick()

    const wrapper = mountDf(DfGridLayout, {
      cols: 4,
      responsive: { lg: 3, md: 2, sm: 1 },
    }, {
      default: () => h('div', 'item'),
    })
    // After mount, the onResize will read window.innerWidth
    // At 600px (< 768), sm=1 should apply
    expect(wrapper.find('.df-grid-layout').attributes('style')).toContain('repeat(1, 1fr)')

    // Restore
    Object.defineProperty(window, 'innerWidth', { value: 1920, writable: true })
  })

  it('uses responsive breakpoints (md)', async () => {
    Object.defineProperty(window, 'innerWidth', { value: 900, writable: true })
    window.dispatchEvent(new Event('resize'))
    await nextTick()

    const wrapper = mountDf(DfGridLayout, {
      cols: 4,
      responsive: { lg: 3, md: 2, sm: 1 },
    }, {
      default: () => h('div', 'item'),
    })
    expect(wrapper.find('.df-grid-layout').attributes('style')).toContain('repeat(2, 1fr)')

    Object.defineProperty(window, 'innerWidth', { value: 1920, writable: true })
  })

  it('uses responsive breakpoints (lg)', async () => {
    Object.defineProperty(window, 'innerWidth', { value: 1100, writable: true })
    window.dispatchEvent(new Event('resize'))
    await nextTick()

    const wrapper = mountDf(DfGridLayout, {
      cols: 4,
      responsive: { lg: 3, md: 2, sm: 1 },
    }, {
      default: () => h('div', 'item'),
    })
    expect(wrapper.find('.df-grid-layout').attributes('style')).toContain('repeat(3, 1fr)')

    Object.defineProperty(window, 'innerWidth', { value: 1920, writable: true })
  })

  it('falls back to cols when window > all breakpoints', async () => {
    Object.defineProperty(window, 'innerWidth', { value: 1920, writable: true })
    window.dispatchEvent(new Event('resize'))
    await nextTick()

    const wrapper = mountDf(DfGridLayout, {
      cols: 5,
      responsive: { lg: 4, md: 2, sm: 1 },
    }, {
      default: () => h('div', 'item'),
    })
    expect(wrapper.find('.df-grid-layout').attributes('style')).toContain('repeat(5, 1fr)')
  })

  it('renders child content', () => {
    const wrapper = mountDf(DfGridLayout, { cols: 2 }, {
      default: () => [
        h('div', { class: 'grid-item-a' }, 'A'),
        h('div', { class: 'grid-item-b' }, 'B'),
      ],
    })
    expect(wrapper.find('.grid-item-a').exists()).toBe(true)
    expect(wrapper.find('.grid-item-b').exists()).toBe(true)
  })
})

// ═══════════════════════════════════════════
// 组合使用场景
// ═══════════════════════════════════════════
describe('Layout composition', () => {
  it('CardLayout inside GridLayout', () => {
    const wrapper = mountDf(DfGridLayout, { cols: 2 }, {
      default: () => [
        h(DfCardLayout, { title: 'Card 1' }, { default: () => h('div', 'c1') }),
        h(DfCardLayout, { title: 'Card 2' }, { default: () => h('div', 'c2') }),
      ],
    })
    expect(wrapper.findAll('.df-card-layout')).toHaveLength(2)
  })

  it('GridLayout inside DetailLayout tab', () => {
    const wrapper = mountDf(DfDetailLayout, {
      title: 'Dashboard',
      showBackButton: false,
      tabs: [{ key: 'overview', title: '概览' }],
    }, {
      'tab-overview': () => h(DfGridLayout, { cols: 3 }, {
        default: () => [h('div', 'a'), h('div', 'b'), h('div', 'c')],
      }),
    })
    expect(wrapper.find('.df-grid-layout').exists()).toBe(true)
  })

  it('documentation-style detail layout renders tabs toolbar and footer together', () => {
    const wrapper = mountDetailLayout({
      title: '数据质控规则',
      tabs: [
        { key: 'completeness', title: '完整性' },
        { key: 'validity', title: '有效性' },
      ],
      activeTab: 'completeness',
    }, {
      toolbar: () => h('div', { class: 'doc-toolbar' }, '筛选条件'),
      'tab-completeness': () => h(DfGridLayout, { cols: 2 }, {
        default: () => [h('div', '指标A'), h('div', '指标B')],
      }),
      footer: () => h('div', { class: 'doc-footer' }, '底部按钮'),
    })

    expect(wrapper.find('.df-detail-layout__tab-bar').exists()).toBe(true)
    expect(wrapper.find('.df-detail-layout__toolbar').exists()).toBe(true)
    expect(wrapper.find('.doc-toolbar').exists()).toBe(true)
    expect(wrapper.find('.df-grid-layout').exists()).toBe(true)
    expect(wrapper.find('.df-detail-layout__footer').exists()).toBe(true)
    expect(wrapper.find('.doc-footer').exists()).toBe(true)
  })
})
