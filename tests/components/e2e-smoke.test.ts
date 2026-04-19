/**
 * E2E Smoke Test — 验证所有组件可挂载、渲染、无报错
 * 覆盖 66 个组件，每个组件以最小 props 挂载验证
 */
import { describe, it, expect } from 'vitest'
import { mount, config } from '@vue/test-utils'
import { createApp, defineComponent, h, nextTick } from 'vue'
import { install } from '../../src/install'

// ─── 导入所有组件 ───
import { DfTable } from '../../src/components/df-table'
import { DfForm } from '../../src/components/df-form'
import { DfSelect } from '../../src/components/df-select'
import { DfDictTag } from '../../src/components/df-dict-tag'
import { DfErrorBoundary } from '../../src/components/df-error-boundary'
import { DfLoading } from '../../src/components/df-loading'
import { DfDialog } from '../../src/components/df-dialog'
import { DfExportBtn } from '../../src/components/df-export-btn'
import { DfButton } from '../../src/components/df-button'
import { DfInput } from '../../src/components/df-input'
import { DfCheckbox } from '../../src/components/df-checkbox'
import { DfSwitch } from '../../src/components/df-switch'
import { DfRadio } from '../../src/components/df-radio'
import { DfTooltip } from '../../src/components/df-tooltip'
import { DfTag } from '../../src/components/df-tag'
import { DfBadge } from '../../src/components/df-badge'
import { DfCard } from '../../src/components/df-card'
import { DfEmpty } from '../../src/components/df-empty'
import { DfAlert } from '../../src/components/df-alert'
import { DfDivider } from '../../src/components/df-divider'
import { DfLink } from '../../src/components/df-link'
import { DfSpace } from '../../src/components/df-space'
import { DfAvatar } from '../../src/components/df-avatar'
import { DfBreadcrumb, DfBreadcrumbItem } from '../../src/components/df-breadcrumb'
import { DfTimeline, DfTimelineItem } from '../../src/components/df-timeline'
import { DfSteps, DfStep } from '../../src/components/df-steps'
import { DfCollapse, DfCollapseItem } from '../../src/components/df-collapse'
import { DfButtonGroup } from '../../src/components/df-button-group'
import { DfBacktop } from '../../src/components/df-backtop'
import { DfProgress } from '../../src/components/df-progress'
import { DfImage } from '../../src/components/df-image'
import { DfTabs, DfTabPane } from '../../src/components/df-tabs'
import { DfDatePicker } from '../../src/components/df-date-picker'
import { DfInputNumber } from '../../src/components/df-input-number'
import { DfDrawer } from '../../src/components/df-drawer'
import { DfDropdown, DfDropdownItem, DfDropdownMenu } from '../../src/components/df-dropdown'
import { DfPagination } from '../../src/components/df-pagination'
import { DfPopover } from '../../src/components/df-popover'
import { DfPopconfirm } from '../../src/components/df-popconfirm'
import { DfScrollbar } from '../../src/components/df-scrollbar'
import { DfTree } from '../../src/components/df-tree'
import { DfTreeSelect } from '../../src/components/df-tree-select'
import { DfUpload } from '../../src/components/df-upload'
import { DfTransfer } from '../../src/components/df-transfer'
import { DfCascader } from '../../src/components/df-cascader'
import { DfMenu, DfMenuItem, DfSubmenu, DfMenuItemGroup } from '../../src/components/df-menu'
import { DfAutocomplete } from '../../src/components/df-autocomplete'
import { DfButtonList } from '../../src/components/df-button-list'
import { DfTagSelect } from '../../src/components/df-tag-select'
import { DfTimePicker } from '../../src/components/df-time-picker'
import { DfContextMenu } from '../../src/components/df-context-menu'
import { DfPageHeader } from '../../src/components/df-page-header'
import { DfCarousel, DfCarouselItem } from '../../src/components/df-carousel'
import { DfSplitPane } from '../../src/components/df-split-pane'
import { DfTreeTable } from '../../src/components/df-tree-table'
import { DfSlider } from '../../src/components/df-slider'
import { DfColorPicker } from '../../src/components/df-color-picker'
import { DfRate } from '../../src/components/df-rate'
import { DfCalendar } from '../../src/components/df-calendar'
import { DfIcon } from '../../src/components/df-icon'
import { DfMessage } from '../../src/components/df-message'
import { DfMessageBox } from '../../src/components/df-message-box'
import { DfNotification } from '../../src/components/df-notification'

// ─── DfUI 全局注入 ───
import { DF_UI_KEY } from '../../src/install'
const dfuiOptions = {
  http: {} as any,
  stateManager: {
    load: async () => null,
    save: async () => {},
    remove: async () => {},
  },
  dict: {
    resolve: async () => [],
    getLabel: () => '',
  },
  permission: {
    check: () => true,
    checkAll: () => true,
    checkAny: () => true,
  },
  tenant: {
    getTenantId: () => '1',
    getBranchId: () => '1',
  },
}

// 辅助：挂载组件并注入 DfUI
function mountDf(component: any, props: Record<string, any> = {}, slots: Record<string, any> = {}) {
  return mount(component, {
    props,
    slots,
    global: {
      provide: { [DF_UI_KEY as symbol]: dfuiOptions },
    },
  })
}

// ═══════════════════════════════════════════════════
// 1. 原有基础组件
// ═══════════════════════════════════════════════════
describe('原有基础组件', () => {
  it('DfButton 渲染', () => {
    const w = mountDf(DfButton, {}, { default: () => '按钮' })
    expect(w.text()).toContain('按钮')
  })

  it('DfInput 渲染', () => {
    const w = mountDf(DfInput, { modelValue: 'test' })
    expect(w.html()).toBeTruthy()
  })

  it('DfCheckbox 渲染', () => {
    const w = mountDf(DfCheckbox, { modelValue: false })
    expect(w.html()).toBeTruthy()
  })

  it('DfSwitch 渲染', () => {
    const w = mountDf(DfSwitch, { modelValue: false })
    expect(w.html()).toBeTruthy()
  })

  it('DfRadio 渲染', () => {
    const w = mountDf(DfRadio, { modelValue: '' })
    expect(w.html()).toBeTruthy()
  })

  it('DfTooltip 渲染', () => {
    const w = mountDf(DfTooltip, { content: '提示' }, { default: () => h('span', '悬停') })
    expect(w.text()).toContain('悬停')
  })

  it('DfSelect 渲染', () => {
    const w = mountDf(DfSelect, { modelValue: '', options: [] })
    expect(w.html()).toBeTruthy()
  })

  it('DfDictTag 渲染', () => {
    const w = mountDf(DfDictTag, { dictCode: 'test', value: '1' })
    expect(w.html()).toBeTruthy()
  })

  it('DfErrorBoundary 渲染', () => {
    const w = mountDf(DfErrorBoundary, {}, { default: () => h('div', '内容') })
    expect(w.text()).toContain('内容')
  })

  it('DfLoading 渲染', () => {
    const w = mountDf(DfLoading, { loading: true })
    expect(w.html()).toBeTruthy()
  })

  it('DfDialog 渲染', () => {
    const w = mountDf(DfDialog, { modelValue: true, title: '对话框' })
    expect(w.html()).toBeTruthy()
  })

  it('DfTable 渲染', () => {
    const w = mountDf(DfTable, { columns: [], dataSource: [] })
    expect(w.html()).toBeTruthy()
  })

  it('DfForm 渲染', () => {
    const w = mountDf(DfForm, { items: [], formData: {} })
    expect(w.html()).toBeTruthy()
  })

  it('DfExportBtn 渲染', () => {
    const w = mountDf(DfExportBtn, { columns: [] })
    expect(w.html()).toBeTruthy()
  })
})

// ═══════════════════════════════════════════════════
// 2. Batch 1: 纯 CSS 简单组件
// ═══════════════════════════════════════════════════
describe('Batch 1: 纯 CSS 简单组件', () => {
  it('DfTag 渲染', () => {
    const w = mountDf(DfTag, {}, { default: () => '标签' })
    expect(w.text()).toContain('标签')
  })

  it('DfBadge 渲染', () => {
    const w = mountDf(DfBadge, { value: 5 }, { default: () => h('span', '图标') })
    expect(w.html()).toBeTruthy()
  })

  it('DfCard 渲染', () => {
    const w = mountDf(DfCard, { header: '卡片标题' }, { default: () => '内容' })
    expect(w.text()).toContain('卡片标题')
  })

  it('DfEmpty 渲染', () => {
    const w = mountDf(DfEmpty)
    expect(w.html()).toBeTruthy()
  })

  it('DfAlert 渲染', () => {
    const w = mountDf(DfAlert, { title: '提示', type: 'info' })
    expect(w.text()).toContain('提示')
  })

  it('DfDivider 渲染', () => {
    const w = mountDf(DfDivider)
    expect(w.html()).toBeTruthy()
  })

  it('DfLink 渲染', () => {
    const w = mountDf(DfLink, { href: '#' }, { default: () => '链接' })
    expect(w.text()).toContain('链接')
  })

  it('DfSpace 渲染', () => {
    const w = mountDf(DfSpace, {}, { default: () => [h('span', 'A'), h('span', 'B')] })
    expect(w.text()).toContain('A')
  })

  it('DfAvatar 渲染', () => {
    const w = mountDf(DfAvatar, { size: 40 })
    expect(w.html()).toBeTruthy()
  })
})

// ═══════════════════════════════════════════════════
// 3. Batch 2: 纯 CSS 中等组件
// ═══════════════════════════════════════════════════
describe('Batch 2: 纯 CSS 中等组件', () => {
  it('DfBreadcrumb + DfBreadcrumbItem 渲染', () => {
    const w = mountDf(DfBreadcrumb, {}, {
      default: () => [h(DfBreadcrumbItem, null, { default: () => '首页' })],
    })
    expect(w.text()).toContain('首页')
  })

  it('DfTimeline + DfTimelineItem 渲染', () => {
    const w = mountDf(DfTimeline, {}, {
      default: () => [h(DfTimelineItem, null, { default: () => '事件1' })],
    })
    expect(w.text()).toContain('事件1')
  })

  it('DfSteps + DfStep 渲染', () => {
    const w = mountDf(DfSteps, { active: 0 }, {
      default: () => [h(DfStep, { title: '步骤1' })],
    })
    expect(w.html()).toBeTruthy()
  })

  it('DfCollapse + DfCollapseItem 渲染', () => {
    const w = mountDf(DfCollapse, { modelValue: ['1'] }, {
      default: () => [h(DfCollapseItem, { name: '1', title: '面板1' }, { default: () => '内容' })],
    })
    expect(w.html()).toBeTruthy()
  })

  it('DfButtonGroup 渲染', () => {
    const w = mountDf(DfButtonGroup, {}, {
      default: () => [h(DfButton, null, { default: () => 'A' }), h(DfButton, null, { default: () => 'B' })],
    })
    expect(w.html()).toBeTruthy()
  })

  it('DfBacktop 渲染', () => {
    const w = mountDf(DfBacktop)
    expect(w.html()).toBeTruthy()
  })

  it('DfProgress 渲染', () => {
    const w = mountDf(DfProgress, { percentage: 50 })
    expect(w.html()).toBeTruthy()
  })

  it('DfImage 渲染', () => {
    const w = mountDf(DfImage, { src: 'https://example.com/test.png' })
    expect(w.html()).toBeTruthy()
  })
})

// ═══════════════════════════════════════════════════
// 4. Batch 3: DevExtreme 封装组件
// ═══════════════════════════════════════════════════
describe('Batch 3: DevExtreme 封装组件', () => {
  it('DfTabs + DfTabPane 渲染', () => {
    const w = mountDf(DfTabs, { modelValue: '1' }, {
      default: () => [h(DfTabPane, { name: '1', label: '标签1' }, { default: () => '内容1' })],
    })
    expect(w.html()).toBeTruthy()
  })

  it('DfDatePicker 渲染', () => {
    const w = mountDf(DfDatePicker, { modelValue: null })
    expect(w.html()).toBeTruthy()
  })

  it('DfInputNumber 渲染', () => {
    const w = mountDf(DfInputNumber, { modelValue: 0 })
    expect(w.html()).toBeTruthy()
  })

  it('DfDrawer 渲染', () => {
    const w = mountDf(DfDrawer, { modelValue: false, title: '抽屉' })
    expect(w.html()).toBeTruthy()
  })

  it('DfDropdown 渲染', () => {
    const w = mountDf(DfDropdown, {}, {
      default: () => h('span', '下拉'),
      dropdown: () => h(DfDropdownMenu, null, {
        default: () => [h(DfDropdownItem, null, { default: () => '选项1' })],
      }),
    })
    expect(w.html()).toBeTruthy()
  })

  it('DfPagination 渲染', () => {
    const w = mountDf(DfPagination, { total: 100, currentPage: 1, pageSize: 10 })
    expect(w.html()).toBeTruthy()
  })

  it('DfPopover 渲染', () => {
    const w = mountDf(DfPopover, { content: '弹出内容' }, { default: () => h('span', '触发') })
    expect(w.html()).toBeTruthy()
  })

  it('DfPopconfirm 渲染', () => {
    const w = mountDf(DfPopconfirm, { title: '确认？' }, { default: () => h('button', '删除') })
    expect(w.html()).toBeTruthy()
  })

  it('DfScrollbar 渲染', () => {
    const w = mountDf(DfScrollbar, {}, { default: () => h('div', '滚动内容') })
    expect(w.html()).toBeTruthy()
  })
})

// ═══════════════════════════════════════════════════
// 5. Batch 4: 复合组件
// ═══════════════════════════════════════════════════
describe('Batch 4: 复合组件', () => {
  it('DfTree 渲染', () => {
    const w = mountDf(DfTree, { data: [] })
    expect(w.html()).toBeTruthy()
  })

  it('DfTreeSelect 渲染', () => {
    const w = mountDf(DfTreeSelect, { modelValue: null, data: [] })
    expect(w.html()).toBeTruthy()
  })

  it('DfUpload 渲染', () => {
    const w = mountDf(DfUpload, { action: '/upload' })
    expect(w.html()).toBeTruthy()
  })

  it('DfTransfer 渲染', () => {
    const w = mountDf(DfTransfer, { modelValue: [], data: [] })
    expect(w.html()).toBeTruthy()
  })

  it('DfCascader 渲染', () => {
    const w = mountDf(DfCascader, { modelValue: [], options: [] })
    expect(w.html()).toBeTruthy()
  })
})

// ═══════════════════════════════════════════════════
// 6. Batch 5+: 高优先级补充组件
// ═══════════════════════════════════════════════════
describe('Batch 5: 高优先级补充组件', () => {
  it('DfMenu + DfMenuItem 渲染', () => {
    const w = mountDf(DfMenu, {}, {
      default: () => [h(DfMenuItem, { index: '1' }, { default: () => '菜单项' })],
    })
    expect(w.html()).toBeTruthy()
  })

  it('DfSubmenu + DfMenuItemGroup 渲染', () => {
    const w = mountDf(DfMenu, {}, {
      default: () => [
        h(DfSubmenu, { index: '1' }, {
          title: () => '子菜单',
          default: () => [
            h(DfMenuItemGroup, { title: '分组' }, {
              default: () => [h(DfMenuItem, { index: '1-1' }, { default: () => '项目' })],
            }),
          ],
        }),
      ],
    })
    expect(w.html()).toBeTruthy()
  })

  it('DfAutocomplete 渲染', () => {
    const w = mountDf(DfAutocomplete, { modelValue: '' })
    expect(w.html()).toBeTruthy()
  })

  it('DfButtonList 渲染', () => {
    const w = mountDf(DfButtonList, {
      buttons: [{ text: '按钮1', onClick: () => {} }],
    })
    expect(w.html()).toBeTruthy()
  })

  it('DfTagSelect 渲染', () => {
    const w = mountDf(DfTagSelect, {
      modelValue: [],
      options: [{ label: '选项1', value: '1' }],
    })
    expect(w.html()).toBeTruthy()
  })
})

// ═══════════════════════════════════════════════════
// 7. Batch 6: 中优先级补充组件
// ═══════════════════════════════════════════════════
describe('Batch 6: 中优先级补充组件', () => {
  it('DfTimePicker 渲染', () => {
    const w = mountDf(DfTimePicker, { modelValue: null })
    expect(w.html()).toBeTruthy()
  })

  it('DfContextMenu 渲染', () => {
    const w = mountDf(DfContextMenu, {
      visible: false,
      x: 0,
      y: 0,
      items: [],
    })
    expect(w.html()).toBeTruthy()
  })

  it('DfPageHeader 渲染', () => {
    const w = mountDf(DfPageHeader, { title: '页面标题' })
    expect(w.text()).toContain('页面标题')
  })

  it('DfCarousel + DfCarouselItem 渲染', () => {
    const w = mountDf(DfCarousel, {}, {
      default: () => [
        h(DfCarouselItem, null, { default: () => h('div', '幻灯片1') }),
      ],
    })
    expect(w.html()).toBeTruthy()
  })

  it('DfSplitPane 渲染', () => {
    const w = mountDf(DfSplitPane, {}, {
      first: () => h('div', '左侧'),
      second: () => h('div', '右侧'),
    })
    expect(w.html()).toBeTruthy()
  })

  it('DfTreeTable 渲染', () => {
    const w = mountDf(DfTreeTable, { data: [], columns: [] })
    expect(w.html()).toBeTruthy()
  })
})

// ═══════════════════════════════════════════════════
// 8. Batch 7: 低优先级补充组件
// ═══════════════════════════════════════════════════
describe('Batch 7: 低优先级补充组件', () => {
  it('DfSlider 渲染', () => {
    const w = mountDf(DfSlider, { modelValue: 50 })
    expect(w.html()).toBeTruthy()
  })

  it('DfColorPicker 渲染', () => {
    const w = mountDf(DfColorPicker, { modelValue: '#ff0000' })
    expect(w.html()).toBeTruthy()
  })

  it('DfRate 渲染', () => {
    const w = mountDf(DfRate, { modelValue: 3 })
    expect(w.html()).toBeTruthy()
  })

  it('DfCalendar 渲染', () => {
    const w = mountDf(DfCalendar, { modelValue: new Date() })
    expect(w.html()).toBeTruthy()
  })

  it('DfIcon 渲染', () => {
    const w = mountDf(DfIcon, { name: 'check' })
    expect(w.html()).toBeTruthy()
  })
})

// ═══════════════════════════════════════════════════
// 9. 函数式组件 (Message / MessageBox / Notification)
// ═══════════════════════════════════════════════════
describe('函数式组件', () => {
  it('DfMessage 是函数', () => {
    expect(typeof DfMessage).toBe('function')
  })

  it('DfMessageBox 是函数/对象', () => {
    expect(DfMessageBox).toBeTruthy()
  })

  it('DfNotification 是函数', () => {
    expect(typeof DfNotification).toBe('function')
  })
})

// ═══════════════════════════════════════════════════
// 10. 全局 install 验证
// ═══════════════════════════════════════════════════
describe('Plugin install', () => {
  it('createDfUI 正确安装所有组件', () => {
    const app = createApp({ render: () => null })
    install(app, {
      http: {} as any,
      stateManager: { load: async () => null, save: async () => {}, remove: async () => {} },
      dict: { resolve: async () => [], getLabel: () => '' },
      permission: { check: () => true, checkAll: () => true, checkAny: () => true },
      tenant: { getTenantId: () => '1', getBranchId: () => '1' },
    })
    // 验证若干关键全局组件已注册
    expect(app.component('DfButton')).toBeTruthy()
    expect(app.component('DfTable')).toBeTruthy()
    expect(app.component('DfForm')).toBeTruthy()
    expect(app.component('DfDialog')).toBeTruthy()
    expect(app.component('DfTag')).toBeTruthy()
    expect(app.component('DfIcon')).toBeTruthy()
  })
})
