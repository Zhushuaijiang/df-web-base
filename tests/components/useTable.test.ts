import { describe, it, expect, vi } from 'vitest'
import { createApp, defineComponent, h } from 'vue'
import { DF_UI_KEY } from '../../src/install'
import { useDfTable } from '../../src/components/df-table/useTable'

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

describe('useDfTable', () => {
  const mockDfui = {
    dict: {
      resolve: vi.fn().mockResolvedValue([{ value: '1', label: '男' }]),
      getLabel: vi.fn().mockReturnValue('男'),
    },
    permission: {
      check: vi.fn((code: string) => code !== 'no-access'),
    },
  }

  it('返回方法', () => {
    const result = runInSetup(() => useDfTable(), mockDfui)
    expect(result.dfui).toBe(mockDfui)
    expect(typeof result.buildColumnLookup).toBe('function')
    expect(typeof result.filterColumnsByPermission).toBe('function')
    expect(typeof result.dictCustomizeText).toBe('function')
  })

  it('buildColumnLookup 构建 lookup', () => {
    const result = runInSetup(() => useDfTable(), mockDfui)
    const lookup = result.buildColumnLookup('gender')
    expect(lookup.valueExpr).toBe('value')
    expect(lookup.displayExpr).toBe('label')
    expect(lookup.dataSource.load).toBeDefined()
  })

  it('filterColumnsByPermission 过滤无权限列', () => {
    const result = runInSetup(() => useDfTable(), mockDfui)
    const columns = [
      { dataField: 'name', caption: '姓名' },
      { dataField: 'secret', caption: '机密', permissionCode: 'no-access' },
      { dataField: 'age', caption: '年龄', permissionCode: 'can-view' },
    ]
    const filtered = result.filterColumnsByPermission(columns as any)
    expect(filtered.length).toBe(2)
    expect(filtered.map(c => c.dataField)).toEqual(['name', 'age'])
  })

  it('dictCustomizeText 翻译字典值', () => {
    const result = runInSetup(() => useDfTable(), mockDfui)
    const fn = result.dictCustomizeText('gender')
    const text = fn({ value: '1' })
    expect(mockDfui.dict.getLabel).toHaveBeenCalledWith('gender', '1')
    expect(text).toBe('男')
  })

  it('未注入 DfUIOptions 抛出错误', () => {
    expect(() => {
      const App = defineComponent({
        setup() {
          useDfTable()
          return () => h('div')
        },
      })
      createApp(App).mount(document.createElement('div'))
    }).toThrow('[useDfTable]')
  })
})
