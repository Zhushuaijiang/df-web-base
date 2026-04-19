import { describe, it, expect } from 'vitest'
import { DfMessageBox } from '../../src/components/df-message-box/messageBox'

describe('DfMessageBox', () => {
  it('创建消息框 - 字符串参数', () => {
    const promise = DfMessageBox('确认操作？')
    expect(promise).toBeInstanceOf(Promise)
    // 不等待 resolve，仅验证创建
  })

  it('创建消息框 - 对象参数', () => {
    const promise = DfMessageBox({ message: '消息', title: '标题' })
    expect(promise).toBeInstanceOf(Promise)
  })

  it('alert 方法', () => {
    const promise = DfMessageBox.alert('提示信息')
    expect(promise).toBeInstanceOf(Promise)
  })

  it('alert 带标题', () => {
    const promise = DfMessageBox.alert('提示信息', '自定义标题')
    expect(promise).toBeInstanceOf(Promise)
  })

  it('confirm 方法', () => {
    const promise = DfMessageBox.confirm('确认删除？')
    expect(promise).toBeInstanceOf(Promise)
  })

  it('confirm 带选项', () => {
    const promise = DfMessageBox.confirm('确认删除？', '警告', { dangerouslyUseHTMLString: true } as any)
    expect(promise).toBeInstanceOf(Promise)
  })

  it('prompt 方法', () => {
    const promise = DfMessageBox.prompt('请输入名称')
    expect(promise).toBeInstanceOf(Promise)
  })
})
