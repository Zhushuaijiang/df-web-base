# DfCard 卡片

卡片容器组件，支持标题、阴影模式和自定义内容。

## 基础用法

通过 `header` 属性或 `header` slot 设置卡片标题。

<DemoBlock title="基础卡片">

<df-card header="卡片标题" shadow="hover">
<p>这是卡片的内容区域，可以放置任意内容。</p>
</df-card>

<template #code>

```vue
<df-card header="卡片标题" shadow="hover">
  <p>这是卡片的内容区域，可以放置任意内容。</p>
</df-card>
```

</template>
</DemoBlock>

## 阴影模式

通过 `shadow` 属性控制阴影显示时机。

<DemoBlock title="阴影模式">

<df-space direction="vertical" fill>
<df-card shadow="always" header="always 阴影">
<p>始终显示阴影</p>
</df-card>
<df-card shadow="hover" header="hover 阴影">
<p>鼠标悬停时显示阴影</p>
</df-card>
<df-card shadow="never" header="never 阴影">
<p>从不显示阴影</p>
</df-card>
</df-space>

<template #code>

```vue
<df-space direction="vertical" fill>
  <df-card shadow="always" header="always 阴影">
    <p>始终显示阴影</p>
  </df-card>
  <df-card shadow="hover" header="hover 阴影">
    <p>鼠标悬停时显示阴影</p>
  </df-card>
  <df-card shadow="never" header="never 阴影">
    <p>从不显示阴影</p>
  </df-card>
</df-space>
```

</template>
</DemoBlock>

## 自定义头部

使用 `header` slot 自定义卡片头部内容。

<DemoBlock title="自定义头部">

<df-card shadow="hover">
<template #header><df-tag type="primary">自定义</df-tag> 卡片头部</template>
<p>卡片内容</p>
</df-card>

<template #code>

```vue
<df-card shadow="hover">
  <template #header>
    <df-tag type="primary">自定义</df-tag> 卡片头部
  </template>
  <p>卡片内容</p>
</df-card>
```

</template>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| header | 标题 | `string` | — |
| shadow | 阴影模式 | `'always' \| 'hover' \| 'never'` | `'always'` |
| bodyStyle | 内容区域样式 | `object \| string` | — |

### Slots

| 插槽名 | 说明 |
|--------|------|
| header | 自定义头部 |
| default | 卡片内容 |

## 引入方式

```typescript
import { DfCard } from 'df-web-base'
```
