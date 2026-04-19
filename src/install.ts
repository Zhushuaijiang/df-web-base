import type { App, InjectionKey } from 'vue'
import type { DfUIOptions } from './types/plugin'
import { registerGlobalComponents } from './components'
import { registerDirectives } from './directives'

// 自动注入设计令牌样式
import './styles/index.css'

export const DF_UI_KEY: InjectionKey<DfUIOptions> = Symbol('df-ui')

/**
 * 创建 df-web-base Vue Plugin
 * 主应用 / 子应用通过 app.use(createDfUI(options)) 一次性完成：
 * 1. DevExtreme 全局配置（locale / currency / editorStylingMode）
 * 2. DfUIOptions 全局注入（provide/inject）
 * 3. 全局组件注册（df-table / df-form / df-select 等）
 * 4. 全局指令注册（v-permission 等）
 */
export function createDfUI(options: DfUIOptions) {
  return {
    install(app: App) {
      // 1. DevExtreme 全局配置（必须在组件注册前执行）
      configureDxGlobals(options)

      // 2. 全局注入，所有组件可通过 inject(DF_UI_KEY) 获取
      app.provide(DF_UI_KEY, options)

      // 3. 注册全局组件（df-table / df-form / df-select / df-dict-tag 等）
      registerGlobalComponents(app)

      // 4. 注册全局指令（v-permission 等）
      registerDirectives(app, options)
    },
  }
}

/**
 * 快捷安装函数，供 window.DfWebBase.install(app, options) 调用
 * 等价于 app.use(createDfUI(options))
 */
export function install(app: App, options: DfUIOptions): void {
  const plugin = createDfUI(options)
  plugin.install(app)
}

/**
 * 配置 DevExtreme 全局设置
 */
async function configureDxGlobals(options: DfUIOptions): Promise<void> {
  const dxConfig = options.devextreme ?? {}

  try {
    const [dxCoreConfig, { locale }] = await Promise.all([
      import('devextreme/core/config'),
      import('devextreme/localization'),
    ])

    locale(dxConfig.locale ?? 'zh')
    ;(dxCoreConfig.default as any)({
      defaultCurrency: dxConfig.defaultCurrency ?? 'CNY',
      editorStylingMode: dxConfig.editorStylingMode ?? 'outlined',
      floatingActionButtonConfig: dxConfig.floatingActionButtonConfig,
    })
  } catch {
    // DevExtreme 未安装时静默跳过（测试环境）
    if (import.meta.env.DEV) {
      console.warn('[df-web-base] DevExtreme 全局配置跳过：devextreme 模块未找到')
    }
  }
}
