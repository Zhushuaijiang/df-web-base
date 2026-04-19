# DfTag 标签

标签组件，用于标记和分类，支持多种类型、尺寸和可关闭模式。

## 基础用法

通过 `type` 属性设置标签类型。

<DemoBlock title="标签类型">

<df-space>
<df-tag>默认</df-tag>
<df-tag type="primary">主要</df-tag>
<df-tag type="success">成功</df-tag>
<df-tag type="warning">警告</df-tag>
<df-tag type="danger">危险</df-tag>
<df-tag type="info">信息</df-tag>
</df-space>

<template #code>

```vue
<df-space>
  <df-tag>默认</df-tag>
  <df-tag type="primary">主要</df-tag>
  <df-tag type="success">成功</df-tag>
  <df-tag type="warning">警告</df-tag>
  <df-tag type="danger">危险</df-tag>
  <df-tag type="info">信息</df-tag>
</df-space>
```

</template>
</DemoBlock>

## 可关闭与圆角

设置 `closable` 属性使标签可关闭，设置 `round` 属性使用圆角样式。

<DemoBlock title="可关闭 / 圆角">

<df-space>
<df-tag closable type="primary">可关闭</df-tag>
<df-tag round type="success">圆角标签</df-tag>
<df-tag closable round type="warning">可关闭圆角</df-tag>
</df-space>

<template #code>

```vue
<df-space>
  <df-tag closable type="primary">可关闭</df-tag>
  <df-tag round type="success">圆角标签</df-tag>
  <df-tag closable round type="warning">可关闭圆角</df-tag>
</df-space>
```

</template>
</DemoBlock>

## 主题效果

通过 `effect` 属性切换深色、浅色和朴素主题。

<DemoBlock title="不同主题">

<df-space>
<df-tag effect="dark" type="primary">深色</df-tag>
<df-tag effect="light" type="success">浅色</df-tag>
<df-tag effect="plain" type="danger">朴素</df-tag>
<df-tag effect="dark" type="warning" round>深色圆角</df-tag>
</df-space>

<template #code>

```vue
<df-space>
  <df-tag effect="dark" type="primary">深色</df-tag>
  <df-tag effect="light" type="success">浅色</df-tag>
  <df-tag effect="plain" type="danger">朴素</df-tag>
  <df-tag effect="dark" type="warning" round>深色圆角</df-tag>
</df-space>
```

</template>
</DemoBlock>

## 不同尺寸

通过 `size` 属性设置标签尺寸。

<DemoBlock title="标签尺寸">

<df-space>
<df-tag size="large" type="primary">大号</df-tag>
<df-tag size="default" type="primary">默认</df-tag>
<df-tag size="small" type="primary">小号</df-tag>
<df-tag size="mini" type="primary">迷你</df-tag>
</df-space>

<template #code>

```vue
<df-space>
  <df-tag size="large" type="primary">大号</df-tag>
  <df-tag size="default" type="primary">默认</df-tag>
  <df-tag size="small" type="primary">小号</df-tag>
  <df-tag size="mini" type="primary">迷你</df-tag>
</df-space>
```

</template>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| text | 标签文字（替代 slot） | `string` | — |
| type | 标签类型 | `'' \| 'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `''` |
| closable | 可关闭 | `boolean` | `false` |
| color | 自定义背景色 | `string` | — |
| size | 尺寸 | `'large' \| 'default' \| 'small' \| 'mini'` | `'default'` |
| effect | 主题效果 | `'dark' \| 'light' \| 'plain'` | `'light'` |
| hit | 描边样式 | `boolean` | `false` |
| round | 圆角样式 | `boolean` | `false` |
| disableTransitions | 禁用动画 | `boolean` | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| click | 点击时触发 | `(e: MouseEvent)` |
| close | 关闭时触发 | `(e: MouseEvent)` |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 标签内容 |

## 引入方式

```typescript
import { DfTag } from 'df-web-base'
```
