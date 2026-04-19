# DfRangeSlider 范围滑块

基于 DevExtreme DxRangeSlider 封装的范围滑块组件，用于选择一个数值区间。

> 🔧 基于 **DxRangeSlider** 封装

## 基础用法

通过 `start` 和 `end` 设置范围起止值。

<DemoBlock title="基础用法">

<df-range-slider :min="0" :max="100" :start="20" :end="80"></df-range-slider>

<template #code>

```vue
<df-range-slider :min="0" :max="100" :start="20" :end="80" />
```

</template>
</DemoBlock>

## 带标签

<DemoBlock title="带标签">

<df-range-slider :min="0" :max="100" :start="30" :end="70" :label-visible="true" :tooltip-visible="true"></df-range-slider>

<template #code>

```vue
<df-range-slider
  :min="0"
  :max="100"
  :start="30"
  :end="70"
  :label-visible="true"
  :tooltip-visible="true"
/>
```

</template>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| start | 起始值 | `number` | — |
| end | 结束值 | `number` | — |
| min | 最小值 | `number` | `0` |
| max | 最大值 | `number` | `100` |
| step | 步长 | `number` | `1` |
| labelVisible | 显示刻度标签 | `boolean` | `false` |
| tooltipVisible | 显示值提示 | `boolean` | `false` |
| disabled | 禁用 | `boolean` | `false` |
| width | 宽度 | `number \| string` | `'100%'` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:start | 起始值变化 | `(value: number)` |
| update:end | 结束值变化 | `(value: number)` |
| valueChanged | 值变化 | `(e: { start, end, previousStart, previousEnd })` |

### Slots

| 插槽名 | 说明 | 作用域 |
|--------|------|---------|
| — | — | — |

## 引入方式

```typescript
import { DfRangeSlider } from 'df-web-base'
```

全量注册后可直接在模板中使用 `<df-range-slider>`。
