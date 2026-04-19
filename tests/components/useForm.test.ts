import { describe, it, expect, vi } from 'vitest'
import { createApp, defineComponent, h } from 'vue'
import { DF_UI_KEY } from '../../src/install'
import { useDfForm } from '../../src/components/df-form/useForm'

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

describe('useDfForm', () => {
  const mockDfui = {
    form: { labelLocation: 'top', colCount: 3, showColonAfterLabel: false, labelMode: 'floating' },
    dict: {
      resolve: vi.fn().mockResolvedValue([{ value: '1', label: '选项1' }]),
    },
    permission: {
      check: vi.fn((code: string) => code === 'visible'),
    },
  }

  it('返回 formOptions', () => {
    const result = runInSetup(() => useDfForm({} as any), mockDfui)
    expect(result.formOptions.value.labelLocation).toBe('top')
    expect(result.formOptions.value.colCount).toBe(3)
  })

  it('props.colCount 优先级高于全局默认', () => {
    const result = runInSetup(() => useDfForm({ colCount: 4 } as any), mockDfui)
    expect(result.formOptions.value.colCount).toBe(4)
  })

  it('无全局 form 配置使用默认值', () => {
    const result = runInSetup(() => useDfForm({} as any), { form: undefined, dict: mockDfui.dict, permission: mockDfui.permission })
    expect(result.formOptions.value.labelLocation).toBe('left')
    expect(result.formOptions.value.showColonAfterLabel).toBe(true)
  })

  it('buildEditorOptions 字典字段', () => {
    const result = runInSetup(() => useDfForm({} as any), mockDfui)
    const opts = result.buildEditorOptions({ dictCode: 'gender' } as any)
    expect(opts.editorType).toBe('dxSelectBox')
    expect(opts.editorOptions.valueExpr).toBe('value')
  })

  it('buildEditorOptions 普通字段', () => {
    const result = runInSetup(() => useDfForm({} as any), mockDfui)
    const opts = result.buildEditorOptions({ dataField: 'name' } as any)
    expect(opts).toEqual({})
  })

  it('isFieldVisible 有权限返回 true', () => {
    const result = runInSetup(() => useDfForm({} as any), mockDfui)
    expect(result.isFieldVisible({ permissionCode: 'visible' } as any)).toBe(true)
  })

  it('isFieldVisible 无权限返回 false', () => {
    const result = runInSetup(() => useDfForm({} as any), mockDfui)
    expect(result.isFieldVisible({ permissionCode: 'hidden' } as any)).toBe(false)
  })

  it('isFieldVisible 无权限码返回 true', () => {
    const result = runInSetup(() => useDfForm({} as any), mockDfui)
    expect(result.isFieldVisible({} as any)).toBe(true)
  })

  it('未注入 DfUIOptions 使用安全默认值', () => {
    let result: any
    const App = defineComponent({
      setup() {
        result = useDfForm({} as any)
        return () => h('div')
      },
    })
    createApp(App).mount(document.createElement('div'))
    // inject fallback is null → uses safe defaults
    expect(result).toBeDefined()
    expect(result.formOptions.value.labelLocation).toBe('left')
  })
})
