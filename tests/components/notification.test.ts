import { describe, it, expect, afterEach } from 'vitest'
import { DfNotification } from '../../src/components/df-notification/notification'

describe('DfNotification', () => {
  afterEach(() => {
    DfNotification.closeAll()
  })

  it('创建通知', () => {
    const result = DfNotification('测试通知')
    expect(result).toBeDefined()
    expect(typeof result.close).toBe('function')
  })

  it('字符串参数', () => {
    const result = DfNotification('简单通知')
    expect(typeof result.close).toBe('function')
  })

  it('对象参数', () => {
    const result = DfNotification({ message: '通知消息', title: '标题', type: 'success' })
    expect(typeof result.close).toBe('function')
  })

  it('success 快捷方法', () => {
    const result = (DfNotification as any).success('成功通知')
    expect(typeof result.close).toBe('function')
  })

  it('warning 快捷方法', () => {
    const result = (DfNotification as any).warning('警告通知')
    expect(typeof result.close).toBe('function')
  })

  it('error 快捷方法', () => {
    const result = (DfNotification as any).error('错误通知')
    expect(typeof result.close).toBe('function')
  })

  it('info 快捷方法', () => {
    const result = (DfNotification as any).info('信息通知')
    expect(typeof result.close).toBe('function')
  })

  it('position 参数', () => {
    const result = DfNotification({ message: '左上角', position: 'top-left' })
    expect(typeof result.close).toBe('function')
  })

  it('closeAll 关闭所有', () => {
    DfNotification('通知1')
    DfNotification('通知2')
    expect(() => DfNotification.closeAll()).not.toThrow()
  })

  it('close 关闭单个', () => {
    const { close } = DfNotification('通知')
    expect(() => close()).not.toThrow()
  })
})
