# DfMessage 消息

全局消息提示，通过函数式调用。用于轻量级的全局反馈。

> 📌 函数式组件，通过 `DfMessage(options)` 调用，非模板标签。

<script setup>
import { DfMessage } from '@/components/df-message'
</script>

## 调用方式

<DemoBlock title="消息类型">
<df-space>
  <df-button @click="DfMessage({ message: '提示信息', type: 'info' })">信息</df-button>
  <df-button type="success" @click="DfMessage({ message: '操作成功', type: 'success' })">成功</df-button>
  <df-button type="warning" @click="DfMessage({ message: '请注意', type: 'warning' })">警告</df-button>
  <df-button type="danger" @click="DfMessage({ message: '操作失败', type: 'error' })">错误</df-button>
</df-space>
<template #code>

```typescript
import { DfMessage } from 'df-web-base'

DfMessage({ message: '提示信息', type: 'info' })
DfMessage({ message: '操作成功', type: 'success' })
DfMessage({ message: '请注意', type: 'warning' })
DfMessage({ message: '操作失败', type: 'error' })
```

</template>
</DemoBlock>

## 快捷方法

<DemoBlock title="快捷调用">
<df-space>
  <df-button type="success" @click="DfMessage.success('保存成功')">success</df-button>
  <df-button type="warning" @click="DfMessage.warning('请注意数据完整性')">warning</df-button>
  <df-button type="danger" @click="DfMessage.error('网络请求失败')">error</df-button>
  <df-button @click="DfMessage.info('系统将于今晚维护')">info</df-button>
</df-space>
<template #code>

```typescript
DfMessage.success('保存成功')
DfMessage.warning('请注意数据完整性')
DfMessage.error('网络请求失败')
DfMessage.info('系统将于今晚维护')
```

</template>
</DemoBlock>

## 可关闭 & 关闭全部

<DemoBlock title="可关闭">
<df-space>
  <df-button @click="DfMessage({ message: '这条消息可以手动关闭', type: 'info', showClose: true, duration: 0 })">可手动关闭（不自动消失）</df-button>
  <df-button @click="DfMessage.closeAll()">关闭全部</df-button>
</df-space>
<template #code>

```typescript
// 不自动消失，需手动关闭
DfMessage({ message: '这条消息可以手动关闭', type: 'info', showClose: true, duration: 0 })

// 关闭所有消息
DfMessage.closeAll()
```

</template>
</DemoBlock>

## API

### DfMessage(options)

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| message | 消息文本 | `string` | `''` |
| type | 消息类型 | `'success' \| 'warning' \| 'error' \| 'info'` | `'info'` |
| duration | 显示时间(ms)，0 为不关闭 | `number` | `3000` |
| showClose | 是否显示关闭按钮 | `boolean` | `false` |
| showIcon | 是否显示图标 | `boolean` | `true` |
| center | 居中显示 | `boolean` | `false` |
| offset | 顶部偏移(px) | `number` | `20` |
| dangerouslyUseHTMLString | 是否渲染 HTML | `boolean` | `false` |
| onClose | 关闭回调 | `() => void` | — |

### 快捷方法

`DfMessage.success(options)` / `DfMessage.warning(options)` / `DfMessage.error(options)` / `DfMessage.info(options)`

`DfMessage.closeAll()` 关闭所有消息。

## 引入方式

```typescript
import { DfMessage } from 'df-web-base'
```
