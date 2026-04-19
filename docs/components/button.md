# DfButton 按钮

基于 DevExtreme 25.2 DxButton 封装，支持多种类型、尺寸、防抖点击和加载状态。

> 🔧 基于 **DxButton** 封装

## 基础用法

通过 `type` 属性设置按钮类型。

<DemoBlock title="按钮类型">

<df-space>
  <df-button>默认按钮</df-button>
  <df-button type="primary">主要按钮</df-button>
  <df-button type="success">成功按钮</df-button>
  <df-button type="warning">警告按钮</df-button>
  <df-button type="danger">危险按钮</df-button>
  <df-button type="info">信息按钮</df-button>
</df-space>

<template #code>

```vue
<df-space>
  <df-button>默认按钮</df-button>
  <df-button type="primary">主要按钮</df-button>
  <df-button type="success">成功按钮</df-button>
  <df-button type="warning">警告按钮</df-button>
  <df-button type="danger">危险按钮</df-button>
  <df-button type="info">信息按钮</df-button>
</df-space>
```

</template>
</DemoBlock>

## 朴素按钮

<DemoBlock title="朴素（描边）风格">

<df-space>
  <df-button type="primary" plain>朴素主要</df-button>
  <df-button type="success" plain>朴素成功</df-button>
  <df-button type="danger" plain>朴素危险</df-button>
</df-space>

<template #code>

```vue
<df-space>
  <df-button type="primary" plain>朴素主要</df-button>
  <df-button type="success" plain>朴素成功</df-button>
  <df-button type="danger" plain>朴素危险</df-button>
</df-space>
```

</template>
</DemoBlock>

## 禁用与加载

<DemoBlock title="禁用 / 加载状态">

<df-space>
  <df-button type="primary" disabled>禁用按钮</df-button>
  <df-button type="primary" loading>加载中</df-button>
</df-space>

<template #code>

```vue
<df-space>
  <df-button type="primary" disabled>禁用按钮</df-button>
  <df-button type="primary" loading>加载中</df-button>
</df-space>
```

</template>
</DemoBlock>

## 图标与尺寸

<DemoBlock title="不同尺寸">

<df-space>
  <df-button type="primary" size="large">大号</df-button>
  <df-button type="primary">默认</df-button>
  <df-button type="primary" size="small">小号</df-button>
  <df-button type="primary" size="mini">迷你</df-button>
</df-space>

<template #code>

```vue
<df-space>
  <df-button type="primary" size="large">大号</df-button>
  <df-button type="primary">默认</df-button>
  <df-button type="primary" size="small">小号</df-button>
  <df-button type="primary" size="mini">迷你</df-button>
</df-space>
```

</template>
</DemoBlock>

## 文字按钮

<DemoBlock title="文字按钮">

<df-space>
  <df-button type="text">文字按钮</df-button>
  <df-button type="text" disabled>禁用文字</df-button>
</df-space>

<template #code>

```vue
<df-space>
  <df-button type="text">文字按钮</df-button>
  <df-button type="text" disabled>禁用文字</df-button>
</df-space>
```

</template>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| type | 按钮类型 | `'default' \| 'primary' \| 'success' \| 'warning' \| 'danger' \| 'info' \| 'text'` | `'default'` |
| size | 按钮尺寸 | `'large' \| 'default' \| 'small' \| 'mini'` | `'default'` |
| icon | 图标类名 (dx-icon-*) | `string` | — |
| loading | 加载状态 | `boolean` | `false` |
| disabled | 禁用状态 | `boolean` | `false` |
| plain | 朴素按钮 | `boolean` | `false` |
| round | 圆角按钮 | `boolean` | `false` |
| circle | 圆形按钮 | `boolean` | `false` |
| hint | 工具提示文字 | `string` | — |
| text | 按钮文字（替代 slot） | `string` | — |
| debounce | 防抖间隔 (ms) | `number` | `500` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| click | 点击时触发（已防抖） | `(e: Event)` |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 按钮内容 |

## 引入方式

```typescript
import { DfButton } from 'df-web-base'
```
