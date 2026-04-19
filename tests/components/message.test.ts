import { describe, it, expect, vi, afterEach } from 'vitest'
import { DfMessage } from '../../src/components/df-message/message'

describe('DfMessage', () => {
  afterEach(() => {
    DfMessage.closeAll()
  })

  it('创建消息', () => {
    const result = DfMessage('测试消息')
    expect(result).toBeDefined()
    expect(typeof result.close).toBe('function')
  })

  it('字符串参数创建', () => {
    const result = DfMessage('简单消息')
    expect(typeof result.close).toBe('function')
  })

  it('对象参数创建', () => {
    const result = DfMessage({ message: '对象消息', type: 'success' })
    expect(typeof result.close).toBe('function')
  })

  it('success 快捷方法', () => {
    const result = (DfMessage as any).success('成功')
    expect(typeof result.close).toBe('function')
  })

  it('warning 快捷方法', () => {
    const result = (DfMessage as any).warning('警告')
    expect(typeof result.close).toBe('function')
  })

  it('error 快捷方法', () => {
    const result = (DfMessage as any).error('错误')
    expect(typeof result.close).toBe('function')
  })

  it('info 快捷方法', () => {
    const result = (DfMessage as any).info('信息')
    expect(typeof result.close).toBe('function')
  })

  it('closeAll 关闭所有', () => {
    DfMessage('消息1')
    DfMessage('消息2')
    expect(() => DfMessage.closeAll()).not.toThrow()
  })

  it('close 关闭单个', () => {
    const { close } = DfMessage('消息')
    expect(() => close()).not.toThrow()
  })
})
