import { describe, it, expect, vi } from 'vitest'
import { createApp, defineComponent, h, nextTick } from 'vue'
import { registerDirectives } from '../../src/directives'
import type { DfUIOptions } from '../../src/types/plugin'

function createMockOptions(checkAny = true, checkAll = true): DfUIOptions {
  return {
    http: {} as any,
    stateManager: { load: vi.fn(), save: vi.fn(), remove: vi.fn() },
    dict: { resolve: vi.fn(), getLabel: vi.fn() },
    permission: {
      check: vi.fn().mockReturnValue(checkAny),
      checkAll: vi.fn().mockReturnValue(checkAll),
      checkAny: vi.fn().mockReturnValue(checkAny),
    },
    tenant: { getTenantId: vi.fn(), getBranchId: vi.fn() },
  }
}

function mountWithDirective(
  template: string,
  options: DfUIOptions,
): { el: HTMLElement; app: ReturnType<typeof createApp> } {
  const container = document.createElement('div')
  document.body.appendChild(container)

  const App = defineComponent({
    template,
  })

  const app = createApp(App)
  registerDirectives(app, options)
  app.mount(container)

  return { el: container, app }
}

describe('v-permission', () => {
  it('有权限时元素正常渲染', () => {
    const opts = createMockOptions(true)
    const { el, app } = mountWithDirective(
      '<div v-permission="\'view\'">visible</div>',
      opts,
    )
    expect(el.textContent).toContain('visible')
    app.unmount()
  })

  it('无权限时元素被移除', () => {
    const opts = createMockOptions(false)
    const { el, app } = mountWithDirective(
      '<div v-permission="\'edit\'">hidden</div>',
      opts,
    )
    expect(el.textContent).not.toContain('hidden')
    app.unmount()
  })

  it('.disable 修饰符无权限时禁用元素', () => {
    const opts = createMockOptions(false)
    const { el, app } = mountWithDirective(
      '<button v-permission.disable="\'edit\'">btn</button>',
      opts,
    )
    const btn = el.querySelector('button')!
    expect(btn.getAttribute('disabled')).toBe('disabled')
    expect(btn.style.opacity).toBe('0.5')
    expect(btn.style.pointerEvents).toBe('none')
    app.unmount()
  })

  it('value 为空时不做处理', () => {
    const opts = createMockOptions(false)
    const { el, app } = mountWithDirective(
      '<div v-permission="">keep</div>',
      opts,
    )
    expect(el.textContent).toContain('keep')
    app.unmount()
  })

  it('arg=all 调用 checkAll', () => {
    const opts = createMockOptions(true, false)
    const { el, app } = mountWithDirective(
      `<div v-permission:all="['view','edit']">content</div>`,
      opts,
    )
    // checkAll returns false, so removed
    expect(el.textContent).not.toContain('content')
    expect(opts.permission.checkAll).toHaveBeenCalled()
    app.unmount()
  })
})
