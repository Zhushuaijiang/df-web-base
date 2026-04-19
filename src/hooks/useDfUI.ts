import { inject } from 'vue'
import { DF_UI_KEY } from '../install'
import { useNotification } from './useNotification'
import type { DfUIOptions } from '../types/plugin'

/**
 * 便捷组合式函数 — 一次性获取 DfUIOptions 各模块 + 全局通知
 * 所有组件内部推荐使用此 Hook 替代直接 inject(DF_UI_KEY)
 */
export function useDfUI() {
  const dfui = inject(DF_UI_KEY)
  const notification = useNotification()

  if (!dfui) {
    if (import.meta.env.DEV) {
      console.warn('[df-web-base] DfUIOptions 未注入，请确保已调用 app.use(createDfUI(options))')
    }
    return { dfui: undefined, notification }
  }

  return {
    dfui,
    http: dfui.http,
    dict: dfui.dict,
    permission: dfui.permission,
    tenant: dfui.tenant,
    appContext: dfui.appContext,
    notification,
  }
}

/**
 * Strict variant of useDfUI that throws if DfUIOptions is not injected.
 * Use when the hook is required (not optional) for component functionality.
 */
export function useDfUIStrict(): {
  dfui: DfUIOptions
  http: NonNullable<DfUIOptions['http']>
} {
  const { dfui } = useDfUI()
  if (!dfui) {
    throw new Error(
      '[useDfUI] DfUIOptions not injected. Call app.use(createDfUI(options)) first.'
    )
  }
  return {
    dfui,
    http: dfui.http,
  }
}
