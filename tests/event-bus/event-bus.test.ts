import { describe, it, expect, vi, beforeEach } from 'vitest'
import { on, off, emit, once, clearAll, useEventBus, initGlobalStateBridge, useGlobalState } from '../../src/event-bus'

describe('EventBus', () => {
  beforeEach(() => {
    clearAll()
  })

  it('on/emit 基本订阅触发', () => {
    const handler = vi.fn()
    on('test', handler)
    emit('test', 'hello', 42)
    expect(handler).toHaveBeenCalledWith('hello', 42)
  })

  it('on 返回取消函数', () => {
    const handler = vi.fn()
    const unsub = on('test', handler)
    unsub()
    emit('test')
    expect(handler).not.toHaveBeenCalled()
  })

  it('off 移除特定回调', () => {
    const handler1 = vi.fn()
    const handler2 = vi.fn()
    on('test', handler1)
    on('test', handler2)
    off('test', handler1)
    emit('test')
    expect(handler1).not.toHaveBeenCalled()
    expect(handler2).toHaveBeenCalledOnce()
  })

  it('off 无回调时清除事件全部监听', () => {
    const handler = vi.fn()
    on('test', handler)
    off('test')
    emit('test')
    expect(handler).not.toHaveBeenCalled()
  })

  it('once 仅触发一次', () => {
    const handler = vi.fn()
    once('test', handler)
    emit('test', 'a')
    emit('test', 'b')
    expect(handler).toHaveBeenCalledTimes(1)
    expect(handler).toHaveBeenCalledWith('a')
  })

  it('clearAll 清除所有监听', () => {
    const h1 = vi.fn()
    const h2 = vi.fn()
    on('event1', h1)
    on('event2', h2)
    clearAll()
    emit('event1')
    emit('event2')
    expect(h1).not.toHaveBeenCalled()
    expect(h2).not.toHaveBeenCalled()
  })

  it('handler 抛出异常不影响其他 handler', () => {
    const errHandler = vi.fn(() => { throw new Error('boom') })
    const okHandler = vi.fn()
    on('test', errHandler)
    on('test', okHandler)
    emit('test')
    expect(okHandler).toHaveBeenCalledOnce()
  })

  it('emit 无监听器时不报错', () => {
    expect(() => emit('nonexistent')).not.toThrow()
  })
})

describe('useEventBus', () => {
  beforeEach(() => {
    clearAll()
  })

  it('dispose 清理所有实例监听', () => {
    const bus = useEventBus()
    const handler = vi.fn()
    bus.on('test', handler)
    bus.dispose()
    emit('test')
    expect(handler).not.toHaveBeenCalled()
  })

  it('多次 on 都在 dispose 时清理', () => {
    const bus = useEventBus()
    const h1 = vi.fn()
    const h2 = vi.fn()
    bus.on('a', h1)
    bus.on('b', h2)
    bus.dispose()
    emit('a')
    emit('b')
    expect(h1).not.toHaveBeenCalled()
    expect(h2).not.toHaveBeenCalled()
  })

  it('once 也在 dispose 时清理', () => {
    const bus = useEventBus()
    const handler = vi.fn()
    bus.once('evt', handler)
    bus.dispose()
    emit('evt')
    expect(handler).not.toHaveBeenCalled()
  })

  it('emit/off 方法直接暴露', () => {
    const bus = useEventBus()
    const handler = vi.fn()
    bus.on('x', handler)
    bus.emit('x', 123)
    expect(handler).toHaveBeenCalledWith(123)
    bus.off('x')
    bus.emit('x', 456)
    expect(handler).toHaveBeenCalledTimes(1)
  })
})

describe('initGlobalStateBridge', () => {
  beforeEach(() => {
    clearAll()
  })

  it('接入 qiankun onGlobalStateChange', () => {
    let stateChangeCallback: any
    const mockProps = {
      onGlobalStateChange: vi.fn((cb: any) => {
        stateChangeCallback = cb
      }),
      setGlobalState: vi.fn(),
    }

    initGlobalStateBridge(mockProps)
    expect(mockProps.onGlobalStateChange).toHaveBeenCalled()

    // 模拟 qiankun 状态变更
    const handler = vi.fn()
    on('globalState:change', handler)
    stateChangeCallback({ userId: '001' }, {})
    expect(handler).toHaveBeenCalledWith({ userId: '001' }, {})

    // useGlobalState 也应更新
    const state = useGlobalState()
    expect(state.value.userId).toBe('001')
  })

  it('接入 qiankun setGlobalState', () => {
    const mockProps = {
      onGlobalStateChange: vi.fn(),
      setGlobalState: vi.fn(),
    }

    initGlobalStateBridge(mockProps)

    // 通过 EventBus 触发 setGlobalState
    emit('globalState:set', { theme: 'dark' })
    expect(mockProps.setGlobalState).toHaveBeenCalledWith({ theme: 'dark' })
  })

  it('props 缺少方法时不报错', () => {
    expect(() => initGlobalStateBridge({})).not.toThrow()
  })
})
