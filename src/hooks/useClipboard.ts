import { ref, readonly, onUnmounted } from 'vue'

/**
 * 剪贴板操作组合式函数
 * 提供复制文本到剪贴板的能力，带状态反馈
 *
 * @example
 * ```ts
 * const { copy, copied } = useClipboard()
 *
 * await copy('要复制的文本')
 * if (copied.value) {
 *   // 复制成功
 * }
 * ```
 */
export function useClipboard(options?: { copiedDuration?: number }) {
  const copied = ref(false)
  const copiedDuration = options?.copiedDuration ?? 1500
  let timer: ReturnType<typeof setTimeout> | null = null

  async function copy(text: string): Promise<boolean> {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(text)
      } else {
        // Fallback for older browsers
        const textarea = document.createElement('textarea')
        textarea.value = text
        textarea.style.position = 'fixed'
        textarea.style.opacity = '0'
        document.body.appendChild(textarea)
        textarea.select()
        document.execCommand('copy')
        document.body.removeChild(textarea)
      }

      copied.value = true
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        copied.value = false
      }, copiedDuration)

      return true
    } catch {
      copied.value = false
      return false
    }
  }

  onUnmounted(() => {
    if (timer) clearTimeout(timer)
  })

  return {
    copy,
    copied: readonly(copied),
  }
}
