# DfProgress 进度条

进度条组件，支持线形（line）、环形（circle）、仪表盘（dashboard）三种形态。

## 基础用法

通过 `percentage` 属性设置进度百分比（0-100），`status` 属性设置状态。

<DemoBlock title="线形进度条">

<df-space direction="vertical" fill style="width: 400px">
<df-progress :percentage="20" />
<df-progress :percentage="50" status="success" />
<df-progress :percentage="80" status="warning" />
<df-progress :percentage="100" status="exception" />
</df-space>

<template #code>

```vue
<df-space direction="vertical" fill style="width: 400px">
  <df-progress :percentage="20" />
  <df-progress :percentage="50" status="success" />
  <df-progress :percentage="80" status="warning" />
  <df-progress :percentage="100" status="exception" />
</df-space>
```

</template>
</DemoBlock>

## 文字内显

设置 `textInside` 属性将百分比文字显示在进度条内部。

<DemoBlock title="文字内显">

<df-space direction="vertical" fill style="width: 400px">
<df-progress :percentage="30" :stroke-width="20" text-inside />
<df-progress :percentage="70" :stroke-width="20" text-inside status="success" />
</df-space>

<template #code>

```vue
<df-space direction="vertical" fill style="width: 400px">
  <df-progress :percentage="30" :stroke-width="20" text-inside />
  <df-progress :percentage="70" :stroke-width="20" text-inside status="success" />
</df-space>
```

</template>
</DemoBlock>

## 环形进度条

设置 `type="circle"` 使用环形进度条。

<DemoBlock title="环形进度条">

<df-space>
<df-progress type="circle" :percentage="25" />
<df-progress type="circle" :percentage="75" status="success" />
<df-progress type="circle" :percentage="100" status="exception" />
</df-space>

<template #code>

```vue
<df-space>
  <df-progress type="circle" :percentage="25" />
  <df-progress type="circle" :percentage="75" status="success" />
  <df-progress type="circle" :percentage="100" status="exception" />
</df-space>
```

</template>
</DemoBlock>

## 仪表盘

设置 `type="dashboard"` 使用仪表盘形态。

<DemoBlock title="仪表盘">

<df-space>
<df-progress type="dashboard" :percentage="40" />
<df-progress type="dashboard" :percentage="80" status="success" />
</df-space>

<template #code>

```vue
<df-space>
  <df-progress type="dashboard" :percentage="40" />
  <df-progress type="dashboard" :percentage="80" status="success" />
</df-space>
```

</template>
</DemoBlock>

## 自定义颜色

通过 `color` 属性设置自定义颜色，支持字符串、数组（按百分比分段）和函数三种形式。

<DemoBlock title="自定义颜色">

<df-space direction="vertical" fill style="width: 400px">
<df-progress :percentage="60" color="#e6a23c" />
<df-progress :percentage="80" :color="['#409eff', '#e6a23c', '#67c23a']" />
</df-space>

<template #code>

```vue
<df-space direction="vertical" fill style="width: 400px">
  <df-progress :percentage="60" color="#e6a23c" />
  <df-progress :percentage="80" :color="['#409eff', '#e6a23c', '#67c23a']" />
</df-space>
```

</template>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| type | 类型 | `'line' \| 'circle' \| 'dashboard'` | 'line' |
| percentage | 百分比 (0-100) | `number` | 0 |
| status | 状态 | `'' \| 'success' \| 'exception' \| 'warning'` | '' |
| strokeWidth | 线宽 | `number` | 6 |
| textInside | 文字在线内 | `boolean` | false |
| width | 环形/仪表盘宽度 (px) | `number` | 126 |
| showText | 显示文字 | `boolean` | true |
| color | 自定义颜色 | `string \| Array \| Function` | -- |
| format | 自定义文字格式化函数 | `(percentage: number) => string` | -- |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 自定义文字内容 |

## 引入方式

```typescript
import { DfProgress } from 'df-web-base'
```

全量注册后可直接在模板中使用 `<df-progress>`。
