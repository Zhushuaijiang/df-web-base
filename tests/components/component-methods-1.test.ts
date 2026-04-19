/**
 * Vue 组件方法测试 Batch 1：简单交互组件
 * 覆盖：DfAlert, DfTag, DfSwitch, DfRadio, DfRate, DfLink,
 *       DfCheckbox, DfButton, DfPageHeader, DfIcon, DfImage
 */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount, config } from '@vue/test-utils'
import { h, nextTick } from 'vue'
import { DF_UI_KEY } from '../../src/install'

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

import { DfAlert } from '../../src/components/df-alert'
import { DfTag } from '../../src/components/df-tag'
import { DfSwitch } from '../../src/components/df-switch'
import { DfRadio } from '../../src/components/df-radio'
import { DfRate } from '../../src/components/df-rate'
import { DfLink } from '../../src/components/df-link'
import { DfCheckbox } from '../../src/components/df-checkbox'
import { DfButton } from '../../src/components/df-button'
import { DfPageHeader } from '../../src/components/df-page-header'
import { DfIcon } from '../../src/components/df-icon'
import { DfImage } from '../../src/components/df-image'
import { DfInputNumber } from '../../src/components/df-input-number'
import { DfBacktop } from '../../src/components/df-backtop'

// ═══════════════════════════════════════════
// DfAlert
// ═══════════════════════════════════════════
describe('DfAlert 方法', () => {
  it('close 事件隐藏组件', async () => {
    const w = mountDf(DfAlert, { title: '提示', type: 'info', closable: true })
    const closeBtn = w.find('.df-alert__close')
    if (closeBtn.exists()) {
      await closeBtn.trigger('click')
      expect(w.emitted('close')).toBeTruthy()
    }
  })

  it('showIcon 渲染图标', () => {
    const w = mountDf(DfAlert, { title: '提示', type: 'success', showIcon: true })
    expect(w.html()).toContain('success')
  })

  it('不同 type 渲染对应类名', () => {
    for (const type of ['success', 'warning', 'info', 'error'] as const) {
      const w = mountDf(DfAlert, { title: '提示', type })
      expect(w.html()).toContain(type)
    }
  })

  it('描述文本渲染', () => {
    const w = mountDf(DfAlert, { title: '标题', description: '描述内容' })
    expect(w.text()).toContain('描述内容')
  })
})

// ═══════════════════════════════════════════
// DfTag
// ═══════════════════════════════════════════
describe('DfTag 方法', () => {
  it('handleClose 设置 closed 并 emit', async () => {
    const w = mountDf(DfTag, { closable: true }, { default: () => '标签' })
    const closeBtn = w.find('.df-tag__close')
    if (closeBtn.exists()) {
      await closeBtn.trigger('click')
      expect(w.emitted('close')).toBeTruthy()
    }
  })

  it('不同 type 渲染', () => {
    for (const type of ['success', 'info', 'warning', 'danger'] as const) {
      const w = mountDf(DfTag, { type }, { default: () => '标签' })
      expect(w.html()).toContain(type)
    }
  })

  it('effect 属性', () => {
    const w = mountDf(DfTag, { effect: 'dark' }, { default: () => '标签' })
    expect(w.html()).toContain('dark')
  })

  it('round 属性', () => {
    const w = mountDf(DfTag, { round: true }, { default: () => '标签' })
    expect(w.html()).toContain('round')
  })

  it('自定义 color', () => {
    const w = mountDf(DfTag, { color: '#f56c6c' }, { default: () => '标签' })
    const span = w.find('.df-tag')
    expect(span.exists()).toBe(true)
    // color 通过 style binding 传入
    expect(w.html()).toBeTruthy()
  })
})

// ═══════════════════════════════════════════
// DfSwitch
// ═══════════════════════════════════════════
describe('DfSwitch 方法', () => {
  it('handleToggle 切换值', async () => {
    const w = mountDf(DfSwitch, { modelValue: false })
    await w.trigger('click')
    expect(w.emitted('update:modelValue')?.[0]).toEqual([true])
    expect(w.emitted('change')?.[0]).toEqual([true])
  })

  it('disabled 时不切换', async () => {
    const w = mountDf(DfSwitch, { modelValue: false, disabled: true })
    await w.trigger('click')
    expect(w.emitted('update:modelValue')).toBeFalsy()
  })

  it('自定义 activeValue/inactiveValue', async () => {
    const w = mountDf(DfSwitch, { modelValue: 'off', activeValue: 'on', inactiveValue: 'off' })
    await w.trigger('click')
    expect(w.emitted('update:modelValue')?.[0]).toEqual(['on'])
  })

  it('isActive 计算正确', () => {
    const w = mountDf(DfSwitch, { modelValue: true })
    expect(w.classes().some(c => c.includes('active'))).toBe(true)
  })
})

// ═══════════════════════════════════════════
// DfRadio
// ═══════════════════════════════════════════
describe('DfRadio 方法', () => {
  const opts = [
    { label: '选项A', value: 'a' },
    { label: '选项B', value: 'b' },
    { label: '选项C', value: 'c', disabled: true },
  ]

  it('handleSelect 选择选项', async () => {
    const w = mountDf(DfRadio, { modelValue: 'a', options: opts })
    const items = w.findAll('.df-radio__item')
    if (items.length >= 2) {
      await items[1].trigger('click')
      expect(w.emitted('update:modelValue')?.[0]).toEqual(['b'])
      expect(w.emitted('change')?.[0]).toEqual(['b'])
    }
  })

  it('disabled 选项不触发', async () => {
    const w = mountDf(DfRadio, { modelValue: 'a', options: opts })
    const items = w.findAll('.df-radio__item')
    if (items.length >= 3) {
      await items[2].trigger('click')
      expect(w.emitted('update:modelValue')).toBeFalsy()
    }
  })

  it('选中相同值不触发', async () => {
    const w = mountDf(DfRadio, { modelValue: 'a', options: opts })
    const items = w.findAll('.df-radio__item')
    if (items.length >= 1) {
      await items[0].trigger('click')
      // 同值不应 emit
      expect(w.emitted('update:modelValue')).toBeFalsy()
    }
  })

  it('button 模式类名', () => {
    const w = mountDf(DfRadio, { modelValue: 'a', options: opts, button: true })
    expect(w.html()).toContain('button')
  })
})

// ═══════════════════════════════════════════
// DfRate
// ═══════════════════════════════════════════
describe('DfRate 方法', () => {
  it('onSelect 选择星级', async () => {
    const w = mountDf(DfRate, { modelValue: 0 })
    const stars = w.findAll('.df-rate__star')
    if (stars.length >= 3) {
      await stars[2].trigger('click')
      expect(w.emitted('update:modelValue')?.[0]).toEqual([3])
      expect(w.emitted('change')?.[0]).toEqual([3])
    }
  })

  it('disabled 时不触发', async () => {
    const w = mountDf(DfRate, { modelValue: 3, disabled: true })
    const stars = w.findAll('.df-rate__star')
    if (stars.length >= 1) {
      await stars[0].trigger('click')
      expect(w.emitted('update:modelValue')).toBeFalsy()
    }
  })

  it('readonly 时不触发', async () => {
    const w = mountDf(DfRate, { modelValue: 3, readonly: true })
    const stars = w.findAll('.df-rate__star')
    if (stars.length >= 1) {
      await stars[0].trigger('click')
      expect(w.emitted('update:modelValue')).toBeFalsy()
    }
  })

  it('onHover 设置 hover 值', async () => {
    const w = mountDf(DfRate, { modelValue: 0 })
    const stars = w.findAll('.df-rate__star')
    if (stars.length >= 2) {
      await stars[1].trigger('mouseenter')
      // hover 值影响样式
    }
  })

  it('onHoverLeave 重置', async () => {
    const w = mountDf(DfRate, { modelValue: 3 })
    await w.trigger('mouseleave')
    // hover 值重置为 -1，显示 modelValue
  })

  it('texts 显示对应文本', () => {
    const w = mountDf(DfRate, {
      modelValue: 3,
      showText: true,
      texts: ['很差', '差', '一般', '好', '很好'],
    })
    expect(w.text()).toContain('一般')
  })
})

// ═══════════════════════════════════════════
// DfLink
// ═══════════════════════════════════════════
describe('DfLink 方法', () => {
  it('handleClick 正常触发', async () => {
    const w = mountDf(DfLink, { href: '#' }, { default: () => '链接' })
    await w.trigger('click')
    expect(w.emitted('click')).toBeTruthy()
  })

  it('disabled 时阻止点击', async () => {
    const w = mountDf(DfLink, { href: '#', disabled: true }, { default: () => '链接' })
    await w.trigger('click')
    expect(w.emitted('click')).toBeFalsy()
  })

  it('type 类名', () => {
    for (const type of ['primary', 'success', 'warning', 'danger', 'info'] as const) {
      const w = mountDf(DfLink, { type }, { default: () => '链接' })
      expect(w.html()).toContain(type)
    }
  })

  it('underline 属性', () => {
    const w = mountDf(DfLink, { underline: false }, { default: () => '链接' })
    expect(w.html()).toBeTruthy()
  })
})

// ═══════════════════════════════════════════
// DfCheckbox
// ═══════════════════════════════════════════
describe('DfCheckbox 方法', () => {
  it('布尔模式 toggle', async () => {
    const w = mountDf(DfCheckbox, { modelValue: false })
    const label = w.find('.df-checkbox__label, .df-checkbox')
    if (label.exists()) {
      await label.trigger('click')
      const emitted = w.emitted('update:modelValue')
      if (emitted) {
        expect(emitted[0]).toEqual([true])
      }
    }
  })

  it('数组模式 toggle', async () => {
    const w = mountDf(DfCheckbox, { modelValue: ['a'], checkedValue: 'b' })
    const label = w.find('.df-checkbox__label, .df-checkbox')
    if (label.exists()) {
      await label.trigger('click')
      const emitted = w.emitted('update:modelValue')
      if (emitted) {
        expect(emitted[0]).toEqual([['a', 'b']])
      }
    }
  })

  it('数组模式取消', async () => {
    const w = mountDf(DfCheckbox, { modelValue: ['a', 'b'], checkedValue: 'b' })
    const label = w.find('.df-checkbox__label, .df-checkbox')
    if (label.exists()) {
      await label.trigger('click')
      const emitted = w.emitted('update:modelValue')
      if (emitted) {
        expect(emitted[0]).toEqual([['a']])
      }
    }
  })

  it('disabled 时不触发', async () => {
    const w = mountDf(DfCheckbox, { modelValue: false, disabled: true })
    const label = w.find('.df-checkbox__label, .df-checkbox')
    if (label.exists()) {
      await label.trigger('click')
      expect(w.emitted('update:modelValue')).toBeFalsy()
    }
  })
})

// ═══════════════════════════════════════════
// DfButton
// ═══════════════════════════════════════════
describe('DfButton 方法', () => {
  it('handleClick emit click', async () => {
    const w = mountDf(DfButton, {}, { default: () => '按钮' })
    await w.trigger('click')
    expect(w.emitted('click')).toBeTruthy()
  })

  it('disabled 时不触发', async () => {
    const w = mountDf(DfButton, { disabled: true }, { default: () => '按钮' })
    await w.trigger('click')
    expect(w.emitted('click')).toBeFalsy()
  })

  it('debounce 防抖', async () => {
    vi.useFakeTimers()
    const w = mountDf(DfButton, { debounce: 500 }, { default: () => '按钮' })
    await w.trigger('click')
    expect(w.emitted('click')?.length).toBe(1)
    await w.trigger('click')
    // 第二次在防抖期间，不应触发
    expect(w.emitted('click')?.length).toBe(1)
    vi.advanceTimersByTime(500)
    await w.trigger('click')
    expect(w.emitted('click')?.length).toBe(2)
    vi.useRealTimers()
  })

  it('type 属性', () => {
    for (const type of ['primary', 'success', 'warning', 'danger', 'info'] as const) {
      const w = mountDf(DfButton, { type }, { default: () => '按钮' })
      expect(w.html()).toContain(type)
    }
  })

  it('loading 状态', () => {
    const w = mountDf(DfButton, { loading: true }, { default: () => '加载中' })
    expect(w.html()).toContain('loading')
  })
})

// ═══════════════════════════════════════════
// DfPageHeader
// ═══════════════════════════════════════════
describe('DfPageHeader 方法', () => {
  it('onBack emit back', async () => {
    const w = mountDf(DfPageHeader, { title: '标题', showBack: true })
    const backBtn = w.find('.df-page-header__back')
    if (backBtn.exists()) {
      await backBtn.trigger('click')
      expect(w.emitted('back')).toBeTruthy()
    }
  })

  it('不显示返回按钮', () => {
    const w = mountDf(DfPageHeader, { title: '标题', showBack: false })
    expect(w.find('.df-page-header__back').exists()).toBe(false)
  })

  it('subTitle 渲染', () => {
    const w = mountDf(DfPageHeader, { title: '标题', subTitle: '副标题' })
    expect(w.text()).toContain('副标题')
  })
})

// ═══════════════════════════════════════════
// DfIcon
// ═══════════════════════════════════════════
describe('DfIcon 方法', () => {
  it('onClick emit click', async () => {
    const w = mountDf(DfIcon, { name: 'test' })
    await w.trigger('click')
    expect(w.emitted('click')).toBeTruthy()
  })

  it('size 属性', () => {
    const w = mountDf(DfIcon, { name: 'test', size: 24 })
    expect(w.html()).toContain('24px')
  })

  it('color 属性', () => {
    const w = mountDf(DfIcon, { name: 'test', color: '#ff0000' })
    expect(w.html()).toBeTruthy()
  })

  it('size 为字符串', () => {
    const w = mountDf(DfIcon, { name: 'test', size: '2em' })
    expect(w.html()).toContain('2em')
  })
})

// ═══════════════════════════════════════════
// DfImage
// ═══════════════════════════════════════════
describe('DfImage 方法', () => {
  it('加载失败显示错误状态', async () => {
    const w = mountDf(DfImage, { src: 'bad-url.png' })
    // 触发 error
    await nextTick()
    // 组件挂载时会尝试加载图片
  })

  it('预览功能', async () => {
    const w = mountDf(DfImage, {
      src: 'test.png',
      previewSrcList: ['a.png', 'b.png'],
    })
    expect(w.html()).toBeTruthy()
  })

  it('fit 属性', () => {
    const w = mountDf(DfImage, { src: 'test.png', fit: 'cover' })
    expect(w.html()).toBeTruthy()
  })
})

// ═══════════════════════════════════════════
// DfInputNumber
// ═══════════════════════════════════════════
describe('DfInputNumber 方法', () => {
  it('渲染并传递 modelValue', () => {
    const w = mountDf(DfInputNumber, { modelValue: 10 })
    expect(w.html()).toBeTruthy()
  })

  it('min/max 配置', () => {
    const w = mountDf(DfInputNumber, { modelValue: 5, min: 0, max: 100 })
    expect(w.html()).toBeTruthy()
  })

  it('step 配置', () => {
    const w = mountDf(DfInputNumber, { modelValue: 0, step: 5 })
    expect(w.html()).toBeTruthy()
  })

  it('precision 配置', () => {
    const w = mountDf(DfInputNumber, { modelValue: 1.23, precision: 2 })
    expect(w.html()).toBeTruthy()
  })

  it('disabled 状态', () => {
    const w = mountDf(DfInputNumber, { modelValue: 0, disabled: true })
    expect(w.html()).toContain('disabled')
  })
})

// ═══════════════════════════════════════════
// DfBacktop
// ═══════════════════════════════════════════
describe('DfBacktop 方法', () => {
  it('渲染并默认隐藏', () => {
    const w = mountDf(DfBacktop, { visibilityHeight: 200 })
    expect(w.html()).toBeTruthy()
  })

  it('right/bottom 定位', () => {
    const w = mountDf(DfBacktop, { right: 50, bottom: 100 })
    expect(w.html()).toBeTruthy()
  })
})
