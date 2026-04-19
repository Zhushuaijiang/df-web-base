import { ref, watch, onUnmounted, type Ref } from 'vue'

/**
 * 防抖组合式函数
 * 将响应式值延迟更新，适用于搜索输入、筛选条件等场景
 *
 * @example
 * ```ts
 * const keyword = ref('')
 * const debouncedKeyword = useDebounce(keyword, 300)
 *
 * // debouncedKeyword 会在 keyword 停止变化 300ms 后更新
 * watch(debouncedKeyword, (val) => {
 *   fetchSearchResults(val)
 * })
 * ```
 */
export function useDebounce<T>(value: Ref<T>, delay = 300): Ref<T> {
  const debouncedValue = ref(value.value) as Ref<T>
  let timer: ReturnType<typeof setTimeout> | null = null

  watch(value, (newVal) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      debouncedValue.value = newVal
    }, delay)
  })

  onUnmounted(() => {
    if (timer) clearTimeout(timer)
  })

  return debouncedValue
}

/**
 * 防抖函数包装器
 * 适用于事件处理函数的防抖
 *
 * @example
 * ```ts
 * const { run, cancel } = useDebounceFn(() => {
 *   console.log('执行')
 * }, 300)
 * ```
 */
export function useDebounceFn<T extends (...args: any[]) => any>(
  fn: T,
  delay = 300,
): { run: (...args: Parameters<T>) => void; cancel: () => void } {
  let timer: ReturnType<typeof setTimeout> | null = null

  function run(...args: Parameters<T>) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }

  function cancel() {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
  }

  onUnmounted(cancel)

  return { run, cancel }
}
