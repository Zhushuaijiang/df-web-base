# DfLink 链接

文字链接组件，支持不同类型颜色、下划线和禁用状态。

## 基础用法

通过 `type` 属性设置链接颜色。

<DemoBlock title="链接类型">

<df-space>
<df-link>默认链接</df-link>
<df-link type="primary">主要链接</df-link>
<df-link type="success">成功链接</df-link>
<df-link type="warning">警告链接</df-link>
<df-link type="danger">危险链接</df-link>
<df-link type="info">信息链接</df-link>
</df-space>

<template #code>

```vue
<df-space>
  <df-link>默认链接</df-link>
  <df-link type="primary">主要链接</df-link>
  <df-link type="success">成功链接</df-link>
  <df-link type="warning">警告链接</df-link>
  <df-link type="danger">危险链接</df-link>
  <df-link type="info">信息链接</df-link>
</df-space>
```

</template>
</DemoBlock>

## 禁用状态

设置 `disabled` 属性使链接不可点击。

<DemoBlock title="禁用状态">

<df-space>
<df-link type="primary">正常链接</df-link>
<df-link type="primary" disabled>禁用链接</df-link>
</df-space>

<template #code>

```vue
<df-space>
  <df-link type="primary">正常链接</df-link>
  <df-link type="primary" disabled>禁用链接</df-link>
</df-space>
```

</template>
</DemoBlock>

## 下划线

设置 `underline` 属性控制鼠标悬停时的下划线效果。

<DemoBlock title="下划线">

<df-space>
<df-link type="primary">有下划线</df-link>
<df-link type="primary" :underline="false">无下划线</df-link>
</df-space>

<template #code>

```vue
<df-space>
  <df-link type="primary">有下划线</df-link>
  <df-link type="primary" :underline="false">无下划线</df-link>
</df-space>
```

</template>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| type | 链接类型 | `'default' \| 'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'default'` |
| underline | 是否显示下划线 | `boolean` | `true` |
| disabled | 禁用状态 | `boolean` | `false` |
| href | 链接地址 | `string` | — |
| icon | 图标类名 | `string` | — |
| target | 打开方式 | `string` | `'_self'` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| click | 点击时触发 | `(e: MouseEvent)` |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 链接文字 |

## 引入方式

```typescript
import { DfLink } from 'df-web-base'
```
