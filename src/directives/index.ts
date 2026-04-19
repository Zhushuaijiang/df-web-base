import type { App } from 'vue'
import type { DfUIOptions } from '../types/plugin'
import { vLoading } from './loading'
import { vClickoutside } from './clickoutside'

export { vLoading } from './loading'
export { vClickoutside } from './clickoutside'

/**
 * 注册全局指令
 */
export function registerDirectives(app: App, options: DfUIOptions): void {
  // v-permission 指令：根据权限编码控制元素可见性
  app.directive('permission', {
    mounted(el: HTMLElement, binding) {
      const { value, arg, modifiers } = binding
      const { permission } = options

      if (!value) return

      const codes = Array.isArray(value) ? value : [value]
      const hasPermission = arg === 'all'
        ? permission.checkAll(codes)
        : permission.checkAny(codes)

      if (!hasPermission) {
        if (modifiers.disable) {
          // .disable 修饰符：无权限时禁用而非隐藏
          el.setAttribute('disabled', 'disabled')
          el.style.opacity = '0.5'
          el.style.pointerEvents = 'none'
        } else {
          // 默认：无权限时移除元素
          el.parentNode?.removeChild(el)
        }
      }
    },
  })

  // v-loading 指令：显示 loading 遮罩
  app.directive('loading', vLoading)

  // v-clickoutside 指令：点击外部触发回调
  app.directive('clickoutside', vClickoutside)
}
