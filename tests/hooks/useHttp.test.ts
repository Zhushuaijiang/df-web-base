import { describe, it, expect, vi } from 'vitest'
import { createApp, defineComponent, h } from 'vue'
import { DF_UI_KEY } from '../../src/install'
import { useHttp } from '../../src/hooks/useHttp'

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

describe('useHttp', () => {
  const mockHttp = {
    get: vi.fn().mockResolvedValue({ data: { id: 1 } }),
    post: vi.fn().mockResolvedValue({ data: { ok: true } }),
    put: vi.fn().mockResolvedValue({ data: { updated: true } }),
    delete: vi.fn().mockResolvedValue({ data: null }),
  }
  const dfui = { http: mockHttp }

  it('注入成功返回方法', () => {
    const result = runInSetup(() => useHttp(), dfui)
    expect(result.http).toBe(mockHttp)
    expect(typeof result.get).toBe('function')
    expect(typeof result.post).toBe('function')
    expect(typeof result.put).toBe('function')
    expect(typeof result.del).toBe('function')
  })

  it('get 调用 http.get', async () => {
    const { get } = runInSetup(() => useHttp(), dfui)
    const data = await get('/api/users')
    expect(mockHttp.get).toHaveBeenCalledWith('/api/users', undefined)
    expect(data).toEqual({ id: 1 })
  })

  it('post 调用 http.post', async () => {
    const { post } = runInSetup(() => useHttp(), dfui)
    const data = await post('/api/users', { name: 'test' })
    expect(mockHttp.post).toHaveBeenCalledWith('/api/users', { name: 'test' }, undefined)
    expect(data).toEqual({ ok: true })
  })

  it('put 调用 http.put', async () => {
    const { put } = runInSetup(() => useHttp(), dfui)
    const data = await put('/api/users/1', { name: 'updated' })
    expect(mockHttp.put).toHaveBeenCalledWith('/api/users/1', { name: 'updated' }, undefined)
    expect(data).toEqual({ updated: true })
  })

  it('del 调用 http.delete', async () => {
    const { del } = runInSetup(() => useHttp(), dfui)
    const data = await del('/api/users/1')
    expect(mockHttp.delete).toHaveBeenCalledWith('/api/users/1', undefined)
    expect(data).toBeNull()
  })

  it('未注入 DfUIOptions 抛出错误', () => {
    expect(() => {
      const App = defineComponent({
        setup() {
          useHttp()
          return () => h('div')
        },
      })
      const app = createApp(App)
      app.mount(document.createElement('div'))
    }).toThrow('[useHttp] DfUIOptions 未注入')
  })
})
