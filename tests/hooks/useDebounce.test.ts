import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { ref, nextTick } from 'vue'
import { useDebounce, useDebounceFn } from '../../src/hooks/useDebounce'

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should debounce reactive value changes', async () => {
    const source = ref('hello')
    const debounced = useDebounce(source, 300)

    expect(debounced.value).toBe('hello')

    source.value = 'world'
    await nextTick()
    expect(debounced.value).toBe('hello') // not yet updated

    vi.advanceTimersByTime(300)
    await nextTick()
    expect(debounced.value).toBe('world')
  })

  it('should reset timer on rapid changes', async () => {
    const source = ref(0)
    const debounced = useDebounce(source, 200)

    source.value = 1
    await nextTick()
    vi.advanceTimersByTime(100)

    source.value = 2
    await nextTick()
    vi.advanceTimersByTime(100)

    // still 0 since timer reset
    expect(debounced.value).toBe(0)

    vi.advanceTimersByTime(100)
    await nextTick()
    expect(debounced.value).toBe(2)
  })
})

describe('useDebounceFn', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should debounce function calls', () => {
    const fn = vi.fn()
    const { run } = useDebounceFn(fn, 300)

    run('a')
    run('b')
    run('c')

    expect(fn).not.toHaveBeenCalled()
    vi.advanceTimersByTime(300)
    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenCalledWith('c')
  })

  it('should cancel pending calls', () => {
    const fn = vi.fn()
    const { run, cancel } = useDebounceFn(fn, 300)

    run()
    cancel()
    vi.advanceTimersByTime(300)

    expect(fn).not.toHaveBeenCalled()
  })
})
