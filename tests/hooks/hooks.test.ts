import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createApp, defineComponent, h, inject } from 'vue'
import { DF_UI_KEY } from '../../src/install'
import { usePermission } from '../../src/hooks/usePermission'
import { useDict } from '../../src/hooks/useDict'
import type { DfUIOptions, DictItem } from '../../src/types/plugin'

function createMockOptions(overrides?: Partial<DfUIOptions>): DfUIOptions {
  return {
    http: {} as any,
    stateManager: { load: vi.fn(), save: vi.fn(), remove: vi.fn() },
    dict: {
      resolve: vi.fn().mockResolvedValue([
        { label: '男', value: '1' },
        { label: '女', value: '2' },
      ] as DictItem[]),
      getLabel: vi.fn().mockReturnValue('男'),
    },
    permission: {
      check: vi.fn((code: string) => code === 'view'),
      checkAll: vi.fn((codes: string[]) => codes.every((c) => c === 'view')),
      checkAny: vi.fn((codes: string[]) => codes.some((c) => c === 'view')),
    },
    tenant: {
      getTenantId: vi.fn().mockReturnValue('T001'),
      getBranchId: vi.fn().mockReturnValue('B001'),
    },
    ...overrides,
  }
}

/** 在有 provide 的 Vue 组件内运行 hook */
function runInSetup<T>(hook: () => T, options: DfUIOptions): T {
  let result!: T
  const TestComponent = defineComponent({
    setup() {
      result = hook()
      return () => null
    },
  })
  const app = createApp(TestComponent)
  app.provide(DF_UI_KEY, options)
  app.mount(document.createElement('div'))
  app.unmount()
  return result
}

describe('usePermission', () => {
  it('has 返回 true 当权限存在', () => {
    const opts = createMockOptions()
    const { has } = runInSetup(() => usePermission(), opts)
    expect(has('view')).toBe(true)
    expect(has('delete')).toBe(false)
  })

  it('hasAll / hasAny', () => {
    const opts = createMockOptions()
    const { hasAll, hasAny } = runInSetup(() => usePermission(), opts)
    expect(hasAll(['view'])).toBe(true)
    expect(hasAll(['view', 'edit'])).toBe(false)
    expect(hasAny(['view', 'edit'])).toBe(true)
    expect(hasAny(['edit', 'delete'])).toBe(false)
  })
})

describe('useDict', () => {
  it('自动加载字典数据', async () => {
    const opts = createMockOptions()
    const { items, getLabel } = runInSetup(() => useDict('gender'), opts)
    // resolve 是异步的，等待一个 tick
    await new Promise((r) => setTimeout(r, 10))
    expect(opts.dict.resolve).toHaveBeenCalledWith('gender')
    expect(getLabel('1')).toBe('男')
  })
})
