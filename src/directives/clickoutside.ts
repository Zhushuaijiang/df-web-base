import type { Directive } from 'vue'

/**
 * v-clickoutside 指令
 * 点击元素外部时触发回调，适用于下拉菜单、弹出框关闭等场景
 *
 * @example
 * ```html
 * <div v-clickoutside="handleClose">
 *   下拉菜单内容
 * </div>
 * ```
 */

type ClickOutsideEl = HTMLElement & {
  _clickOutsideHandler?: (event: MouseEvent) => void
}

export const vClickoutside: Directive = {
  mounted(el: ClickOutsideEl, binding) {
    const handler = (event: MouseEvent) => {
      const target = event.target as Node
      if (!el.contains(target) && typeof binding.value === 'function') {
        binding.value(event)
      }
    }
    el._clickOutsideHandler = handler
    document.addEventListener('click', handler, true)
  },
  unmounted(el: ClickOutsideEl) {
    if (el._clickOutsideHandler) {
      document.removeEventListener('click', el._clickOutsideHandler, true)
      el._clickOutsideHandler = undefined
    }
  },
}
