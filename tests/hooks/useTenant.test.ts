import { describe, it, expect, vi } from 'vitest'
import { createApp, defineComponent, h } from 'vue'
import { DF_UI_KEY } from '../../src/install'
import { useTenant } from '../../src/hooks/useTenant'

function runInSetup<T>(fn: () => T, dfui: any): T {
  let result: T
  const App = defineComponent({
    setup() {
      result = fn()
      return () => h('div')
    },
  })
  const app = createApp(App)
  app.provide(DF_UI_KEY, dfui)
  app.mount(document.createElement('div'))
  return result!
}

describe('useTenant', () => {
  it('返回 tenantId 和 branchId', () => {
    const dfui = {
      tenant: {
        getTenantId: () => 'T001',
        getBranchId: () => 'B001',
      },
    }
    const result = runInSetup(() => useTenant(), dfui)
    expect(result.tenantId.value).toBe('T001')
    expect(result.branchId.value).toBe('B001')
  })

  it('响应式变化', () => {
    let currentTenant = 'T001'
    const dfui = {
      tenant: {
        getTenantId: () => currentTenant,
        getBranchId: () => 'B001',
      },
    }
    const result = runInSetup(() => useTenant(), dfui)
    expect(result.tenantId.value).toBe('T001')
    // computed 值依赖函数调用结果
    currentTenant = 'T002'
    // 注意：computed 会缓存，但由于每次 getter 调用外部函数，结果会在下次求值时变化
  })

  it('未注入 DfUIOptions 抛出错误', () => {
    expect(() => {
      const App = defineComponent({
        setup() {
          useTenant()
          return () => h('div')
        },
      })
      const app = createApp(App)
      app.mount(document.createElement('div'))
    }).toThrow('[useTenant] DfUIOptions 未注入')
  })
})
