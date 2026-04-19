/**
 * 钩子函数补充测试
 * 覆盖：useDfUI (DEV 警告), usePermission (throw), useDict (throw),
 *       hooks re-exports, utils re-exports, src/index.ts re-exports
 */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount, config } from '@vue/test-utils'
import { defineComponent, nextTick } from 'vue'
import { DF_UI_KEY } from '../../src/install'

const dfui = {
  http: {} as any,
  stateManager: { load: async () => null, save: async () => {}, remove: async () => {} },
  dict: { resolve: async () => [], getLabel: () => '' },
  permission: { check: () => true, checkAll: () => true, checkAny: () => true },
  tenant: { getTenantId: () => '1', getBranchId: () => '1' },
}

// ═══════════════════════════════════════════
// useDfUI — DEV 警告分支
// ═══════════════════════════════════════════
describe('useDfUI', () => {
  it('正常注入返回所有模块', async () => {
    const { useDfUI } = await import('../../src/hooks/useDfUI')
    const TestComp = defineComponent({
      setup() {
        const result = useDfUI()
        return { result }
      },
      render() {
        return null
      },
    })

    const w = mount(TestComp, {
      global: { provide: { [DF_UI_KEY as symbol]: dfui } },
    })

    expect(w.vm.result.dfui).toBeDefined()
    expect(w.vm.result.http).toBeDefined()
  })

  it('未注入时返回 undefined 并发出 DEV 警告', async () => {
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const { useDfUI } = await import('../../src/hooks/useDfUI')

    const TestComp = defineComponent({
      setup() {
        const result = useDfUI()
        return { result }
      },
      render() {
        return null
      },
    })

    const w = mount(TestComp)
    expect(w.vm.result.dfui).toBeUndefined()
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('DfUIOptions 未注入'))
    consoleSpy.mockRestore()
  })
})

// ═══════════════════════════════════════════
// usePermission — throw 分支
// ═══════════════════════════════════════════
describe('usePermission throw', () => {
  it('未注入时抛错', async () => {
    const { usePermission } = await import('../../src/hooks/usePermission')
    const TestComp = defineComponent({
      setup() {
        try {
          usePermission()
          return { error: '' }
        } catch (e: any) {
          return { error: e.message }
        }
      },
      render() {
        return null
      },
    })

    const w = mount(TestComp)
    expect(w.vm.error).toContain('DfUIOptions 未注入')
  })
})

// ═══════════════════════════════════════════
// useDict — throw 分支
// ═══════════════════════════════════════════
describe('useDict throw', () => {
  it('未注入时抛错', async () => {
    const { useDict } = await import('../../src/hooks/useDict')
    const TestComp = defineComponent({
      setup() {
        try {
          useDict('testDict')
          return { error: '' }
        } catch (e: any) {
          return { error: e.message }
        }
      },
      render() {
        return null
      },
    })

    const w = mount(TestComp)
    expect(w.vm.error).toContain('DfUIOptions 未注入')
  })
})

// ═══════════════════════════════════════════
// install.ts — configureDxGlobals catch 分支
// ═══════════════════════════════════════════
describe('install', () => {
  it('createDfUI 返回 plugin 对象', async () => {
    const { createDfUI } = await import('../../src/install')
    const plugin = createDfUI(dfui as any)
    expect(plugin).toHaveProperty('install')
    expect(typeof plugin.install).toBe('function')
  })

  it('install 函数直接调用', async () => {
    const { install } = await import('../../src/install')
    const mockApp = {
      provide: vi.fn(),
      component: vi.fn(),
      directive: vi.fn(),
    }
    install(mockApp as any, dfui as any)
    expect(mockApp.provide).toHaveBeenCalledWith(expect.anything(), dfui)
  })
})

// ═══════════════════════════════════════════
// Re-export 模块覆盖（0% 的单行文件）
// ═══════════════════════════════════════════
describe('hooks/index.ts re-exports', () => {
  it('导出所有 hook', async () => {
    const hooks = await import('../../src/hooks/index')
    expect(hooks.useTable).toBeDefined()
    expect(hooks.useForm).toBeDefined()
    expect(hooks.usePermission).toBeDefined()
    expect(hooks.useDict).toBeDefined()
    expect(hooks.useNotification).toBeDefined()
    expect(hooks.useHttp).toBeDefined()
    expect(hooks.useTenant).toBeDefined()
    expect(hooks.useDfUI).toBeDefined()
  })
})

describe('hooks/useForm.ts re-export', () => {
  it('导出 useForm', async () => {
    const mod = await import('../../src/hooks/useForm')
    expect(mod.useForm).toBeDefined()
  })
})

describe('hooks/useTable.ts re-export', () => {
  it('导出 useTable', async () => {
    const mod = await import('../../src/hooks/useTable')
    expect(mod.useTable).toBeDefined()
  })
})

describe('utils/index.ts re-exports', () => {
  it('导出所有工具模块', async () => {
    const utils = await import('../../src/utils/index')
    expect(utils.format).toBeDefined()
    expect(utils.validate).toBeDefined()
    expect(utils.common).toBeDefined()
    expect(utils.number).toBeDefined()
    expect(utils.url).toBeDefined()
    expect(utils.cookies).toBeDefined()
    expect(utils.filters).toBeDefined()
    expect(utils.cache).toBeDefined()
    expect(utils.createCache).toBeDefined()
    expect(utils.createRequest).toBeDefined()
    expect(utils.IndexedDb).toBeDefined()
    expect(utils.exportToCsv).toBeDefined()
    expect(utils.exportToExcel).toBeDefined()
    // 高频函数
    expect(utils.uuid).toBeDefined()
    expect(utils.copyText).toBeDefined()
    expect(utils.loadJs).toBeDefined()
    expect(utils.isEmpty).toBeDefined()
    expect(utils.debounce).toBeDefined()
    expect(utils.throttle).toBeDefined()
    expect(utils.deepClone).toBeDefined()
    expect(utils.formatNum).toBeDefined()
    expect(utils.safeCalc).toBeDefined()
    expect(utils.getUrlParam).toBeDefined()
    expect(utils.getCookie).toBeDefined()
    expect(utils.filterValueByKey).toBeDefined()
    expect(utils.listToMap).toBeDefined()
  })
})

describe('src/index.ts 入口导出', () => {
  it('导出 install, createDfUI, DF_UI_KEY', async () => {
    const mod = await import('../../src/index')
    expect(mod.install).toBeDefined()
    expect(mod.createDfUI).toBeDefined()
    expect(mod.DF_UI_KEY).toBeDefined()
    expect(mod.registerDirectives).toBeDefined()
  })
})
