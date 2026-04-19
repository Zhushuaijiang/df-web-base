/**
 * df-web-base 组件按需加载解析器
 *
 * 消费端在 vite.config.ts 中使用，配合 unplugin-vue-components 实现自动导入：
 *
 * @example
 * ```ts
 * // vite.config.ts
 * import Components from 'unplugin-vue-components/vite'
 * import { DfWebBaseResolver } from 'df-web-base/resolver'
 *
 * export default defineConfig({
 *   plugins: [
 *     Components({
 *       resolvers: [DfWebBaseResolver()],
 *     }),
 *   ],
 * })
 * ```
 */

/** 不需要全局注册的函数式组件 */
const FUNCTION_COMPONENTS = new Set([
  'DfMessage',
  'DfMessageBox',
  'DfNotification',
])

/** 组件名 → 导入子路径映射 */
function getComponentSideEffects(_name: string): string[] {
  // 所有组件共享设计令牌
  return ['df-web-base/styles/index.css']
}

export interface DfWebBaseResolverOptions {
  /**
   * 是否导入组件样式副作用（设计令牌 CSS）
   * @default true
   */
  importStyle?: boolean
}

/**
 * unplugin-vue-components 解析器
 *
 * 自动解析以 `Df` 开头的组件标签，生成对应的 import 语句，
 * 使消费端无需手动 import 或全局注册。
 */
export function DfWebBaseResolver(options: DfWebBaseResolverOptions = {}) {
  const { importStyle = true } = options

  return {
    type: 'component' as const,
    resolve(name: string) {
      if (!name.startsWith('Df')) return

      // 函数式组件不自动注册（需按需 import 调用）
      if (FUNCTION_COMPONENTS.has(name)) return

      return {
        name,
        from: 'df-web-base',
        sideEffects: importStyle ? getComponentSideEffects(name) : undefined,
      }
    },
  }
}

export default DfWebBaseResolver
