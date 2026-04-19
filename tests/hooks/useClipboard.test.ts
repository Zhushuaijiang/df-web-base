import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useClipboard } from '../../src/hooks/useClipboard'

describe('useClipboard', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should copy text via navigator.clipboard', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.assign(navigator, { clipboard: { writeText } })

    const { copy, copied } = useClipboard()
    const result = await copy('hello')

    expect(writeText).toHaveBeenCalledWith('hello')
    expect(result).toBe(true)
    expect(copied.value).toBe(true)

    vi.advanceTimersByTime(1500)
    expect(copied.value).toBe(false)
  })

  it('should handle copy failure gracefully', async () => {
    const writeText = vi.fn().mockRejectedValue(new Error('denied'))
    Object.assign(navigator, { clipboard: { writeText } })

    const { copy, copied } = useClipboard()
    const result = await copy('hello')

    expect(result).toBe(false)
    expect(copied.value).toBe(false)
  })

  it('should use custom copiedDuration', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.assign(navigator, { clipboard: { writeText } })

    const { copy, copied } = useClipboard({ copiedDuration: 500 })
    await copy('test')

    expect(copied.value).toBe(true)
    vi.advanceTimersByTime(500)
    expect(copied.value).toBe(false)
  })
})
