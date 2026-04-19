# DfSpace 间距

间距容器组件，自动处理子元素间的间距，支持水平和垂直方向。

## 基础用法

默认水平排列，子元素间自动添加间距。

<DemoBlock title="水平间距">

<df-space>
<df-button type="primary">按钮一</df-button>
<df-button>按钮二</df-button>
<df-button>按钮三</df-button>
</df-space>

<template #code>

```vue
<df-space>
  <df-button type="primary">按钮一</df-button>
  <df-button>按钮二</df-button>
  <df-button>按钮三</df-button>
</df-space>
```

</template>
</DemoBlock>

## 垂直方向

设置 `direction="vertical"` 使用垂直排列。

<DemoBlock title="垂直间距">

<df-space direction="vertical" fill>
<df-card header="卡片一">内容一</df-card>
<df-card header="卡片二">内容二</df-card>
</df-space>

<template #code>

```vue
<df-space direction="vertical" fill>
  <df-card header="卡片一">内容一</df-card>
  <df-card header="卡片二">内容二</df-card>
</df-space>
```

</template>
</DemoBlock>

## 间距大小

通过 `size` 属性设置间距大小，支持预设值和自定义数值。

<DemoBlock title="间距大小">

<df-space direction="vertical">
<df-space size="small">
<df-tag type="primary">小间距</df-tag>
<df-tag type="success">small</df-tag>
</df-space>
<df-space size="default">
<df-tag type="primary">中间距</df-tag>
<df-tag type="success">default</df-tag>
</df-space>
<df-space size="large">
<df-tag type="primary">大间距</df-tag>
<df-tag type="success">large</df-tag>
</df-space>
</df-space>

<template #code>

```vue
<df-space direction="vertical">
  <df-space size="small">
    <df-tag type="primary">小间距</df-tag>
    <df-tag type="success">small</df-tag>
  </df-space>
  <df-space size="default">
    <df-tag type="primary">中间距</df-tag>
    <df-tag type="success">default</df-tag>
  </df-space>
  <df-space size="large">
    <df-tag type="primary">大间距</df-tag>
    <df-tag type="success">large</df-tag>
  </df-space>
</df-space>
```

</template>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| direction | 方向 | `'horizontal' \| 'vertical'` | `'horizontal'` |
| size | 间距大小 | `'small' \| 'default' \| 'large' \| number` | `'default'` |
| wrap | 自动换行 | `boolean` | `false` |
| alignment | 对齐方式 | `'stretch' \| 'center' \| 'flex-start' \| 'flex-end'` | `'center'` |
| fill | 子元素填满宽度 | `boolean` | `false` |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 子元素 |

## 引入方式

```typescript
import { DfSpace } from 'df-web-base'
```
