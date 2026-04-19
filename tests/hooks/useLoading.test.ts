import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { ref, nextTick } from 'vue'
import { useLoading } from '../../src/hooks/useLoading'

describe('useLoading', () => {
  it('should default to false', () => {
    const { loading } = useLoading()
    expect(loading.value).toBe(false)
  })

  it('should accept initial state', () => {
    const { loading } = useLoading(true)
    expect(loading.value).toBe(true)
  })

  it('should start and end loading', () => {
    const { loading, startLoading, endLoading } = useLoading()
    startLoading()
    expect(loading.value).toBe(true)
    endLoading()
    expect(loading.value).toBe(false)
  })

  it('should support reference counting', () => {
    const { loading, startLoading, endLoading } = useLoading()
    startLoading()
    startLoading()
    expect(loading.value).toBe(true)
    endLoading()
    expect(loading.value).toBe(true) // still 1 ref
    endLoading()
    expect(loading.value).toBe(false)
  })

  it('should not go negative', () => {
    const { loading, endLoading } = useLoading()
    endLoading()
    endLoading()
    expect(loading.value).toBe(false)
  })

  it('should wrap async function with withLoading', async () => {
    const { loading, withLoading } = useLoading()
    const fn = vi.fn().mockResolvedValue('result')

    const result = await withLoading(fn)

    expect(fn).toHaveBeenCalled()
    expect(result).toBe('result')
    expect(loading.value).toBe(false)
  })

  it('should handle async error in withLoading', async () => {
    const { loading, withLoading } = useLoading()
    const error = new Error('fail')
    const fn = vi.fn().mockRejectedValue(error)

    await expect(withLoading(fn)).rejects.toThrow('fail')
    expect(loading.value).toBe(false)
  })
})
