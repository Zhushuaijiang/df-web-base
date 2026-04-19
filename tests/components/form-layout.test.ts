import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import DfFormLayout from '../../src/components/df-common-layout/DfFormLayout.vue'

class IntersectionObserverStub {
  observe() {}
  disconnect() {}
  unobserve() {}
}

;(globalThis as any).IntersectionObserver = IntersectionObserverStub

describe('DfFormLayout', () => {
  it('renders section cards without forcing them to share height', () => {
    const wrapper = mount(DfFormLayout, {
      props: {
        quickNavTitle: '人员信息',
        sections: [
          { key: 'basic', title: '基础信息' },
          { key: 'work', title: '职业信息' },
        ],
      },
      slots: {
        'section-basic': '<div class="section-content">基础信息内容</div>',
        'section-work': '<div class="section-content">职业信息内容</div>',
      },
    })

    const sections = wrapper.findAll('.df-form-layout__section')
    expect(sections).toHaveLength(2)
    expect(sections[0].attributes('class')).toContain('df-form-layout__section')
    expect(wrapper.find('.df-form-layout__quicknav').exists()).toBe(true)
  })
})
