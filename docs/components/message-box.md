# DfMessageBox 消息弹框

消息弹框，用于 alert / confirm / prompt 场景，函数式调用。

> 📌 函数式组件，通过 `DfMessageBox(options)` 调用。

<script setup>
import { DfMessageBox } from '@/components/df-message-box'
import { DfMessage } from '@/components/df-message'

function showAlert() {
  DfMessageBox.alert('这是一条提示信息', '提示')
}

function showConfirm() {
  DfMessageBox.confirm('确定删除该条记录？', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    DfMessage.success('已删除')
  }).catch(() => {
    DfMessage.info('已取消')
  })
}

function showPrompt() {
  DfMessageBox.prompt('请输入患者姓名', '提示', {
    inputPlaceholder: '请输入',
    inputPattern: /\S+/,
    inputErrorMessage: '姓名不能为空'
  }).then(({ value }) => {
    DfMessage.success('输入值: ' + value)
  }).catch(() => {
    DfMessage.info('已取消')
  })
}
</script>

## Alert

<DemoBlock title="Alert 提示">
<df-button @click="showAlert">弹出 Alert</df-button>
<template #code>

```typescript
import { DfMessageBox } from 'df-web-base'

DfMessageBox.alert('这是一条提示信息', '提示')
```

</template>
</DemoBlock>

## Confirm

<DemoBlock title="Confirm 确认">
<df-button type="warning" @click="showConfirm">弹出 Confirm</df-button>
<template #code>

```typescript
DfMessageBox.confirm('确定删除该条记录？', '警告', {
  confirmButtonText: '确定',
  cancelButtonText: '取消',
  type: 'warning'
}).then(() => {
  // 确认操作
}).catch(() => {
  // 取消操作
})
```

</template>
</DemoBlock>

## Prompt

<DemoBlock title="Prompt 输入">
<df-button type="primary" @click="showPrompt">弹出 Prompt</df-button>
<template #code>

```typescript
DfMessageBox.prompt('请输入患者姓名', '提示', {
  inputPlaceholder: '请输入',
  inputPattern: /\S+/,
  inputErrorMessage: '姓名不能为空'
}).then(({ value }) => {
  console.log('输入值:', value)
}).catch(() => {
  // 取消
})
```

</template>
</DemoBlock>

## API

### DfMessageBox.alert(message, title?, options?)

弹出提示框，返回 `Promise<void>`。

| 参数 | 说明 | 类型 |
|------|------|------|
| message | 消息内容 | `string` |
| title | 标题 | `string` |
| options | 额外选项 | `Partial<MessageBoxOptions>` |

### DfMessageBox.confirm(message, title?, options?)

弹出确认框，确认时 resolve，取消时 reject。

### DfMessageBox.prompt(message, title?, options?)

弹出输入框，确认时 resolve `{ action, value }`，取消时 reject。

### MessageBoxOptions

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| title | 标题 | `string` | `'提示'` |
| message | 消息内容 | `string` | `''` |
| type | 图标类型 | `'' \| 'success' \| 'warning' \| 'info' \| 'error'` | `''` |
| boxType | 弹框类型 | `'alert' \| 'confirm' \| 'prompt'` | `'alert'` |
| confirmButtonText | 确认按钮文字 | `string` | `'确定'` |
| cancelButtonText | 取消按钮文字 | `string` | `'取消'` |
| showClose | 显示关闭按钮 | `boolean` | `true` |
| showCancelButton | 显示取消按钮 | `boolean` | `false` |
| showInput | 显示输入框 | `boolean` | `false` |
| inputPlaceholder | 输入框占位文字 | `string` | — |
| inputType | 输入框类型 | `string` | `'text'` |
| inputPattern | 输入验证正则 | `RegExp` | — |
| inputValidator | 输入验证函数 | `(val) => boolean \| string` | — |
| inputErrorMessage | 验证失败提示 | `string` | `'输入的数据不合法!'` |
| dangerouslyUseHTMLString | 渲染 HTML | `boolean` | `false` |
| center | 居中布局 | `boolean` | `false` |
| width | 弹框宽度 | `string \| number` | `420` |
| closeOnClickModal | 点击遮罩关闭 | `boolean` | `true` |

## 引入方式

```typescript
import { DfMessageBox } from 'df-web-base'
```
