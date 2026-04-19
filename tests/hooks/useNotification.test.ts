import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useNotification } from '../../src/hooks/useNotification'

describe('useNotification', () => {
  afterEach(() => {
    vi.useRealTimers()
    // 清理全局通知状态
    const { clearAll } = useNotification()
    clearAll()
  })

  it('success 添加通知', () => {
    const { success, notifications } = useNotification()
    success('操作成功')
    expect(notifications.value.length).toBe(1)
    expect(notifications.value[0]!.type).toBe('success')
    expect(notifications.value[0]!.message).toBe('操作成功')
  })

  it('warning / error / info 类型', () => {
    const { warning, error, info, notifications } = useNotification()
    warning('警告')
    error('错误')
    info('信息')
    expect(notifications.value.length).toBe(3)
    expect(notifications.value.map((n) => n.type)).toEqual(['warning', 'error', 'info'])
  })

  it('remove 移除指定通知', () => {
    const { success, remove, notifications } = useNotification()
    const id = success('消息1')
    success('消息2')
    expect(notifications.value.length).toBe(2)

    remove(id)
    expect(notifications.value.length).toBe(1)
    expect(notifications.value[0]!.message).toBe('消息2')
  })

  it('clearAll 清空所有', () => {
    const { success, info, clearAll, notifications } = useNotification()
    success('a')
    info('b')
    clearAll()
    expect(notifications.value.length).toBe(0)
  })

  it('duration > 0 时自动移除', () => {
    vi.useFakeTimers()
    const { success, notifications } = useNotification()
    success('auto remove', 1000)
    expect(notifications.value.length).toBe(1)

    vi.advanceTimersByTime(1000)
    expect(notifications.value.length).toBe(0)
  })

  it('duration 为 0 时不自动移除', () => {
    vi.useFakeTimers()
    const { success, notifications } = useNotification()
    success('stay', 0)
    vi.advanceTimersByTime(10000)
    expect(notifications.value.length).toBe(1)
  })
})
