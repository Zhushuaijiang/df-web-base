/**
 * Message / Notification / MessageBox TS 函数完整测试
 * 覆盖：DfMessage (创建/定位/关闭/shorthand/closeAll),
 *       DfNotification (创建/定位/关闭/shorthand/closeAll/position),
 *       DfMessageBox (alert/confirm/prompt/createMessageBox)
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

// Mock Vue createApp 以避免实际 DOM 渲染
vi.mock('vue', async () => {
  const actual = await vi.importActual('vue')
  return {
    ...actual as any,
    createApp: vi.fn(() => {
      const container = document.createElement('div')
      container.style.height = '48px'
      let mountedProps: any = null
      return {
        mount: (el: HTMLElement) => {
          // 添加一个子元素模拟组件渲染
          const child = document.createElement('div')
          child.style.height = '48px'
          el.appendChild(child)
          return {
            close: () => mountedProps?.onClose?.(),
            _instance: { exposed: { close: () => mountedProps?.onClose?.() }, proxy: {} },
          }
        },
        unmount: vi.fn(),
        _props: null,
      }
    }),
  }
})

describe('DfMessage TS', () => {
  beforeEach(() => {
    // 清理 body
    document.body.innerHTML = ''
  })

  it('DfMessage(string) 创建消息', async () => {
    const { DfMessage } = await import('../../src/components/df-message/message')
    const result = DfMessage('测试消息')
    expect(result).toHaveProperty('close')
  })

  it('DfMessage(options) 创建消息', async () => {
    const { DfMessage } = await import('../../src/components/df-message/message')
    const result = DfMessage({ message: '测试', type: 'success', duration: 3000 })
    expect(result).toHaveProperty('close')
  })

  it('DfMessage.success/warning/info/error shorthand', async () => {
    const { DfMessage } = await import('../../src/components/df-message/message')
    for (const type of ['success', 'warning', 'info', 'error'] as const) {
      const fn = (DfMessage as any)[type]
      expect(fn).toBeTypeOf('function')
      const result = fn(`${type}消息`)
      expect(result).toHaveProperty('close')
    }
  })

  it('DfMessage.closeAll 关闭所有', async () => {
    const { DfMessage } = await import('../../src/components/df-message/message')
    DfMessage('消息1')
    DfMessage('消息2')
    expect(() => DfMessage.closeAll()).not.toThrow()
  })
})

describe('DfNotification TS', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  it('DfNotification(string) 创建通知', async () => {
    const { DfNotification } = await import('../../src/components/df-notification/notification')
    const result = DfNotification('测试通知')
    expect(result).toHaveProperty('close')
  })

  it('DfNotification(options) 创建通知', async () => {
    const { DfNotification } = await import('../../src/components/df-notification/notification')
    const result = DfNotification({ message: '通知', title: '标题', type: 'success' })
    expect(result).toHaveProperty('close')
  })

  it('DfNotification.success/warning/info/error shorthand', async () => {
    const { DfNotification } = await import('../../src/components/df-notification/notification')
    for (const type of ['success', 'warning', 'info', 'error'] as const) {
      const fn = (DfNotification as any)[type]
      expect(fn).toBeTypeOf('function')
      const result = fn(`${type}通知`)
      expect(result).toHaveProperty('close')
    }
  })

  it('DfNotification position top-left', async () => {
    const { DfNotification } = await import('../../src/components/df-notification/notification')
    const result = DfNotification({ message: '左上', position: 'top-left' })
    expect(result).toHaveProperty('close')
  })

  it('DfNotification position bottom-right', async () => {
    const { DfNotification } = await import('../../src/components/df-notification/notification')
    const result = DfNotification({ message: '右下', position: 'bottom-right' })
    expect(result).toHaveProperty('close')
  })

  it('DfNotification.closeAll', async () => {
    const { DfNotification } = await import('../../src/components/df-notification/notification')
    DfNotification('通知1')
    DfNotification('通知2')
    expect(() => DfNotification.closeAll()).not.toThrow()
  })
})

describe('DfMessageBox TS', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  it('DfMessageBox(string) 创建', async () => {
    const { DfMessageBox } = await import('../../src/components/df-message-box/messageBox')
    // 不 await，因为需要 callback 来 resolve
    const promise = DfMessageBox('确认消息')
    expect(promise).toBeInstanceOf(Promise)
    // 不等结果（因为 mock 不会调用 callback）
  })

  it('DfMessageBox(options)', async () => {
    const { DfMessageBox } = await import('../../src/components/df-message-box/messageBox')
    const promise = DfMessageBox({ message: '确认', title: '标题', boxType: 'confirm' })
    expect(promise).toBeInstanceOf(Promise)
  })

  it('DfMessageBox.alert', async () => {
    const { DfMessageBox } = await import('../../src/components/df-message-box/messageBox')
    const promise = DfMessageBox.alert('警告消息', '警告')
    expect(promise).toBeInstanceOf(Promise)
  })

  it('DfMessageBox.confirm', async () => {
    const { DfMessageBox } = await import('../../src/components/df-message-box/messageBox')
    const promise = DfMessageBox.confirm('确认删除？', '提示')
    expect(promise).toBeInstanceOf(Promise)
  })

  it('DfMessageBox.prompt', async () => {
    const { DfMessageBox } = await import('../../src/components/df-message-box/messageBox')
    const promise = DfMessageBox.prompt('请输入名称', '输入')
    expect(promise).toBeInstanceOf(Promise)
  })

  it('DfMessageBox.alert 无 title 使用默认', async () => {
    const { DfMessageBox } = await import('../../src/components/df-message-box/messageBox')
    const promise = DfMessageBox.alert('仅消息')
    expect(promise).toBeInstanceOf(Promise)
  })

  it('DfMessageBox.confirm 附加选项', async () => {
    const { DfMessageBox } = await import('../../src/components/df-message-box/messageBox')
    const promise = DfMessageBox.confirm('确认？', '标题', { confirmButtonText: '确定', cancelButtonText: '取消' })
    expect(promise).toBeInstanceOf(Promise)
  })
})
