/**
 * df-web-base qiankun 生命周期入口
 *
 * 作为 qiankun 微应用加载，mount 时通过 props.onMount 回调
 * 将 install / createDfUI / utils / hooks / eventBus 导出给主应用
 *
 * 参照 HIS df-web-bui/src/main.js 模式
 */
import { createApp } from 'vue'
import { install, createDfUI } from './install'
import * as utils from './utils'
import * as hooks from './hooks'
import * as eventBus from './event-bus'
import type { DfWebBaseExports } from './types/plugin'

let instance: ReturnType<typeof createApp> | null = null

/**
 * qiankun bootstrap —— 首次加载时调用一次
 */
export async function bootstrap(): Promise<void> {
  if (import.meta.env.DEV) {
    console.log('[df-web-base] bootstrap')
  }
}

/**
 * qiankun mount —— 每次挂载时调用
 * 通过 props.onMount 回调将导出对象返回给主应用
 */
export async function mount(props: Record<string, any>): Promise<void> {
  if (import.meta.env.DEV) {
    console.log('[df-web-base] mount')
  }

  // 初始化 qiankun globalState 桥接
  eventBus.initGlobalStateBridge(props)

  const exports: DfWebBaseExports = {
    install,
    createDfUI,
    utils,
    hooks,
  }

  // 回调模式：主应用 loadMicroApp 时传入 onMount，在此回调中拿到导出对象
  if (typeof props.onMount === 'function') {
    props.onMount(exports)
  }

  // 创建一个最小化的 Vue 实例作为 qiankun 挂载点（无可见 UI）
  const container = props.container as HTMLElement | undefined
  const mountEl = container?.querySelector('#df-base-app') ?? '#df-base-app'

  instance = createApp({ render: () => null })
  instance.mount(mountEl)
}

/**
 * qiankun unmount —— 卸载时调用
 */
export async function unmount(): Promise<void> {
  if (import.meta.env.DEV) {
    console.log('[df-web-base] unmount')
  }

  // 清理 EventBus 所有监听器
  eventBus.clearAll()

  if (instance) {
    instance.unmount()
    instance = null
  }
}

// ═══ 独立运行模式（非 qiankun 环境） ═══
if (!window.__POWERED_BY_QIANKUN__) {
  window.DfWebBase = {
    install,
    createDfUI,
    utils,
    hooks,
    eventBus,
  }
  if (import.meta.env.DEV) {
    console.log('[df-web-base] 独立模式启动，已挂载到 window.DfWebBase')
  }
}
