import { ref, readonly } from 'vue'

/**
 * Loading 状态管理组合式函数
 * 支持引用计数，多个异步操作可安全并发使用同一 loading 状态
 *
 * @example
 * ```ts
 * const { loading, startLoading, endLoading, withLoading } = useLoading()
 *
 * // 方式一：手动控制
 * startLoading()
 * await fetchData()
 * endLoading()
 *
 * // 方式二：自动包装（推荐）
 * const data = await withLoading(() => fetchData())
 * ```
 */
export function useLoading(initialState = false) {
  const count = ref(initialState ? 1 : 0)
  const loading = ref(initialState)

  function startLoading() {
    count.value++
    loading.value = true
  }

  function endLoading() {
    count.value = Math.max(0, count.value - 1)
    if (count.value === 0) {
      loading.value = false
    }
  }

  async function withLoading<T>(fn: () => Promise<T>): Promise<T> {
    startLoading()
    try {
      return await fn()
    } finally {
      endLoading()
    }
  }

  function reset() {
    count.value = 0
    loading.value = false
  }

  return {
    loading: readonly(loading),
    startLoading,
    endLoading,
    withLoading,
    reset,
  }
}
