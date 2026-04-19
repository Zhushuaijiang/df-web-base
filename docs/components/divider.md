# DfDivider 分割线

分割线组件，用于分隔内容区块，支持水平/垂直方向和文字嵌入。

## 基础用法

默认为水平分割线。

<DemoBlock title="基础用法">

<p>段落一的内容</p>
<df-divider />
<p>段落二的内容</p>

<template #code>

```vue
<p>段落一的内容</p>
<df-divider />
<p>段落二的内容</p>
```

</template>
</DemoBlock>

## 带文字

在分割线中嵌入文字，通过 `content-position` 控制文字位置。

<DemoBlock title="分割线文字">

<df-divider>居中文字</df-divider>
<df-divider content-position="left">左侧文字</df-divider>
<df-divider content-position="right">右侧文字</df-divider>

<template #code>

```vue
<df-divider>居中文字</df-divider>
<df-divider content-position="left">左侧文字</df-divider>
<df-divider content-position="right">右侧文字</df-divider>
```

</template>
</DemoBlock>

## 虚线与点线

通过 `border-style` 属性设置分割线样式。

<DemoBlock title="边框样式">

<df-divider border-style="dashed">虚线</df-divider>
<df-divider border-style="dotted">点线</df-divider>
<df-divider border-style="solid">实线</df-divider>

<template #code>

```vue
<df-divider border-style="dashed">虚线</df-divider>
<df-divider border-style="dotted">点线</df-divider>
<df-divider border-style="solid">实线</df-divider>
```

</template>
</DemoBlock>

## 垂直分割

设置 `direction="vertical"` 使用垂直分割线。

<DemoBlock title="垂直分割">

<df-space>
<span>文字一</span>
<df-divider direction="vertical" />
<span>文字二</span>
<df-divider direction="vertical" />
<span>文字三</span>
</df-space>

<template #code>

```vue
<df-space>
  <span>文字一</span>
  <df-divider direction="vertical" />
  <span>文字二</span>
  <df-divider direction="vertical" />
  <span>文字三</span>
</df-space>
```

</template>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| direction | 方向 | `'horizontal' \| 'vertical'` | `'horizontal'` |
| contentPosition | 文字位置 | `'left' \| 'center' \| 'right'` | `'center'` |
| borderStyle | 边框样式 | `'solid' \| 'dashed' \| 'dotted'` | `'solid'` |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 分割线文字 |

## 引入方式

```typescript
import { DfDivider } from 'df-web-base'
```
