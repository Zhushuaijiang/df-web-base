# DfNotification 通知

全局通知提示，出现在页面角落，函数式调用。适合系统级通知场景。

> 📌 函数式组件，通过 `DfNotification(options)` 调用。

<script setup>
import { DfNotification } from '@/components/df-notification'
</script>

## 基础用法

<DemoBlock title="通知类型">
<df-space>
  <df-button @click="DfNotification({ title: '通知', message: '您有一条新的待办事项', type: 'info' })">信息</df-button>
  <df-button type="success" @click="DfNotification({ title: '成功', message: '数据保存成功', type: 'success' })">成功</df-button>
  <df-button type="warning" @click="DfNotification({ title: '警告', message: '磁盘空间不足', type: 'warning' })">警告</df-button>
  <df-button type="danger" @click="DfNotification({ title: '错误', message: '服务连接失败', type: 'error' })">错误</df-button>
</df-space>
<template #code>

```typescript
import { DfNotification } from 'df-web-base'

DfNotification({ title: '通知', message: '您有一条新的待办事项', type: 'info' })
DfNotification({ title: '成功', message: '数据保存成功', type: 'success' })
DfNotification({ title: '警告', message: '磁盘空间不足', type: 'warning' })
DfNotification({ title: '错误', message: '服务连接失败', type: 'error' })
```

</template>
</DemoBlock>

## 快捷方法

<DemoBlock title="快捷调用">
<df-space>
  <df-button type="success" @click="DfNotification.success({ title: '成功', message: '数据保存成功' })">success</df-button>
  <df-button type="warning" @click="DfNotification.warning({ title: '警告', message: '磁盘空间不足' })">warning</df-button>
  <df-button type="danger" @click="DfNotification.error({ title: '错误', message: '服务连接失败' })">error</df-button>
  <df-button @click="DfNotification.info({ title: '通知', message: '您有新消息' })">info</df-button>
</df-space>
<template #code>

```typescript
DfNotification.success({ title: '成功', message: '数据保存成功' })
DfNotification.warning({ title: '警告', message: '磁盘空间不足' })
DfNotification.error({ title: '错误', message: '服务连接失败' })
DfNotification.info({ title: '通知', message: '您有新消息' })
```

</template>
</DemoBlock>

## 不同位置

<DemoBlock title="弹出位置">
<df-space wrap>
  <df-button @click="DfNotification({ title: '右上', message: 'top-right（默认）', position: 'top-right' })">右上角</df-button>
  <df-button @click="DfNotification({ title: '左上', message: 'top-left', position: 'top-left' })">左上角</df-button>
  <df-button @click="DfNotification({ title: '右下', message: 'bottom-right', position: 'bottom-right' })">右下角</df-button>
  <df-button @click="DfNotification({ title: '左下', message: 'bottom-left', position: 'bottom-left' })">左下角</df-button>
</df-space>
<template #code>

```typescript
DfNotification({ title: '右上', message: 'top-right', position: 'top-right' })
DfNotification({ title: '左上', message: 'top-left', position: 'top-left' })
DfNotification({ title: '右下', message: 'bottom-right', position: 'bottom-right' })
DfNotification({ title: '左下', message: 'bottom-left', position: 'bottom-left' })
```

</template>
</DemoBlock>

## 关闭全部

<DemoBlock title="关闭全部">
<df-space>
  <df-button @click="DfNotification({ title: '通知1', message: '第一条', duration: 0 }); DfNotification({ title: '通知2', message: '第二条', duration: 0 })">弹出两条（不自动关闭）</df-button>
  <df-button type="danger" @click="DfNotification.closeAll()">关闭全部</df-button>
</df-space>
<template #code>

```typescript
// 不自动关闭
DfNotification({ title: '通知', message: '内容', duration: 0 })

// 关闭所有
DfNotification.closeAll()
```

</template>
</DemoBlock>

## API

### DfNotification(options)

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| title | 标题 | `string` | `''` |
| message | 内容 | `string` | `''` |
| type | 类型 | `'success' \| 'warning' \| 'error' \| 'info'` | `'info'` |
| duration | 显示时间(ms)，0 为不关闭 | `number` | `4500` |
| position | 位置 | `'top-right' \| 'top-left' \| 'bottom-right' \| 'bottom-left'` | `'top-right'` |
| showClose | 显示关闭按钮 | `boolean` | `true` |
| showIcon | 显示图标 | `boolean` | `true` |
| offset | 偏移距离(px) | `number` | `16` |
| dangerouslyUseHTMLString | 渲染 HTML | `boolean` | `false` |
| onClick | 点击回调 | `() => void` | — |
| onClose | 关闭回调 | `() => void` | — |

### 快捷方法

`DfNotification.success(options)` / `DfNotification.warning(options)` / `DfNotification.error(options)` / `DfNotification.info(options)`

`DfNotification.closeAll()` 关闭所有通知。

## 引入方式

```typescript
import { DfNotification } from 'df-web-base'
```
