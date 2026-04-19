import { ref, readonly, type Ref } from 'vue'

type EventCallback = (...args: unknown[]) => void

/**
 * qiankun 微应用间通信 EventBus
 *
 * 基于 qiankun initGlobalState 的增强实现：
 * - 类型安全的事件注册/触发
 * - 自动清理（unmount 时释放所有监听）
 * - 支持 once 单次监听
 * - 内置事件日志（DEV 模式）
 *
 * @example
 * ```ts
 * const bus = useEventBus()
 * bus.on('patient:selected', (patient) => { ... })
 * bus.emit('patient:selected', { id: '001', name: '张三' })
 * bus.off('patient:selected')
 * ```
 */

const listeners = new Map<string, Set<EventCallback>>()

export function emit(event: string, ...args: unknown[]): void {
  if (import.meta.env.DEV) {
    console.debug(`[EventBus] emit: ${event}`, args)
  }
  const cbs = listeners.get(event)
  if (!cbs) return
  for (const cb of cbs) {
    try {
      cb(...args)
    } catch (err) {
      console.error(`[EventBus] Error in handler for "${event}":`, err)
    }
  }
}

export function on(event: string, callback: EventCallback): () => void {
  if (!listeners.has(event)) {
    listeners.set(event, new Set())
  }
  listeners.get(event)!.add(callback)

  // 返回取消函数
  return () => off(event, callback)
}

export function once(event: string, callback: EventCallback): () => void {
  const wrapper: EventCallback = (...args) => {
    off(event, wrapper)
    callback(...args)
  }
  return on(event, wrapper)
}

export function off(event: string, callback?: EventCallback): void {
  if (!callback) {
    listeners.delete(event)
    return
  }
  listeners.get(event)?.delete(callback)
}

/**
 * 清除所有监听器（用于 qiankun unmount）
 */
export function clearAll(): void {
  listeners.clear()
}

// ──────────────────────────────────────────
// qiankun globalState 桥接
// ──────────────────────────────────────────

const globalState = ref<Record<string, unknown>>({})

/**
 * 初始化 qiankun globalState 桥接
 * 在 main.ts mount 阶段调用，将 qiankun props.onGlobalStateChange 接入 EventBus
 */
export function initGlobalStateBridge(props: Record<string, unknown>): void {
  const onGlobalStateChange = props.onGlobalStateChange as
    | ((callback: (state: Record<string, unknown>, prev: Record<string, unknown>) => void, fireImmediately?: boolean) => void)
    | undefined
  if (typeof onGlobalStateChange === 'function') {
    onGlobalStateChange((state, prev) => {
      globalState.value = { ...state }
      emit('globalState:change', state, prev)
    }, true)
  }

  const setGlobalState = props.setGlobalState as ((patch: Record<string, unknown>) => void) | undefined
  if (typeof setGlobalState === 'function') {
    // 暴露 setGlobalState 到 EventBus
    on('globalState:set', (patch) => {
      setGlobalState(patch as Record<string, unknown>)
    })
  }
}

export function useGlobalState(): Readonly<Ref<Record<string, unknown>>> {
  return readonly(globalState)
}

/**
 * Vue 组合式 API 封装：自动在 onUnmounted 时清理监听
 */
export function useEventBus() {
  const cleanups: Array<() => void> = []

  return {
    on(event: string, callback: EventCallback) {
      const unsub = on(event, callback)
      cleanups.push(unsub)
      return unsub
    },
    once(event: string, callback: EventCallback) {
      const unsub = once(event, callback)
      cleanups.push(unsub)
      return unsub
    },
    emit,
    off,
    /** 手动清理所有通过此实例注册的监听 */
    dispose() {
      cleanups.forEach((fn) => fn())
      cleanups.length = 0
    },
  }
}

// HMR: clear stale listeners on module replacement
if (import.meta.hot) {
  import.meta.hot.accept(() => {
    listeners.clear()
  })
}
