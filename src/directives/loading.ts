import type { Directive, DirectiveBinding } from 'vue'

/**
 * v-loading 指令
 * 在元素上显示 loading 遮罩层
 *
 * @example
 * ```html
 * <div v-loading="isLoading">内容</div>
 * <div v-loading.fullscreen="isLoading">全屏 loading</div>
 * ```
 */

const LOADING_CLASS = 'df-loading-parent'
const MASK_CLASS = 'df-loading-mask'

function createMask(text?: string): HTMLElement {
  const mask = document.createElement('div')
  mask.className = MASK_CLASS
  mask.setAttribute('aria-hidden', 'true')
  mask.innerHTML = `
    <div class="df-loading-spinner">
      <svg class="df-loading-circular" viewBox="0 0 50 50">
        <circle class="df-loading-path" cx="25" cy="25" r="20" fill="none" stroke-width="3"/>
      </svg>
      ${text ? `<p class="df-loading-text">${text}</p>` : ''}
    </div>
  `
  return mask
}

function toggleLoading(el: HTMLElement & { _loadingMask?: HTMLElement }, binding: DirectiveBinding) {
  if (binding.value) {
    if (!el._loadingMask) {
      const text = typeof binding.value === 'string' ? binding.value : undefined
      el._loadingMask = createMask(text)
    }

    if (binding.modifiers.fullscreen) {
      document.body.appendChild(el._loadingMask)
      document.body.classList.add(LOADING_CLASS)
      document.body.setAttribute('aria-busy', 'true')
    } else {
      el.style.position = el.style.position || 'relative'
      el.appendChild(el._loadingMask)
      el.classList.add(LOADING_CLASS)
      el.setAttribute('aria-busy', 'true')
    }
  } else {
    if (el._loadingMask?.parentNode) {
      el._loadingMask.parentNode.removeChild(el._loadingMask)
    }
    el.classList.remove(LOADING_CLASS)
    document.body.classList.remove(LOADING_CLASS)
    el.removeAttribute('aria-busy')
    document.body.removeAttribute('aria-busy')
  }
}

export const vLoading: Directive = {
  mounted(el, binding) {
    toggleLoading(el, binding)
  },
  updated(el, binding) {
    if (binding.value !== binding.oldValue) {
      toggleLoading(el, binding)
    }
  },
  unmounted(el: HTMLElement & { _loadingMask?: HTMLElement }) {
    if (el._loadingMask?.parentNode) {
      el._loadingMask.parentNode.removeChild(el._loadingMask)
    }
    el.classList.remove(LOADING_CLASS)
    document.body.classList.remove(LOADING_CLASS)
    el.removeAttribute('aria-busy')
    document.body.removeAttribute('aria-busy')
    el._loadingMask = undefined
  },
}
