# DfRangeSelector 范围选择器

基于 DevExtreme DxRangeSelector 封装的范围选择器组件，用于选择数值或时间区间。

> 🔧 基于 **DxRangeSelector** 封装

## 基础用法

通过 `dataSource` 传入数据，`value` 设置初始选中范围。

<DemoBlock title="基础用法">

<df-range-selector :data-source="[{ arg: 1, val: 10 }, { arg: 2, val: 25 }, { arg: 3, val: 18 }, { arg: 4, val: 30 }, { arg: 5, val: 22 }]" :value="[2, 4]" :height="120"></df-range-selector>

<template #code>

```vue
<df-range-selector
  :data-source="chartData"
  :value="[2, 4]"
  :height="120"
/>
```

</template>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| dataSource | 数据源 | `any[]` | **必填** |
| value | 选中范围 `[start, end]` | `[number, number] \| [Date, Date]` | — |
| startValue | 起始值 | `number \| Date` | — |
| endValue | 结束值 | `number \| Date` | — |
| argumentField | 参数字段名 | `string` | `'argument'` |
| valueField | 值字段名 | `string` | `'value'` |
| sliderMarker | 滑块标记配置 | `object` | — |
| scale | 刻度配置 | `object` | — |
| chart | 内嵌图表配置 | `object` | — |
| background | 背景配置 | `object` | — |
| title | 标题 | `string` | — |
| disabled | 禁用 | `boolean` | `false` |
| width | 宽度 | `number \| string` | `'100%'` |
| height | 高度 | `number \| string` | — |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:value | 范围变化 | `(value)` |
| valueChanged | 值变化 | `(e: { value, previousValue })` |

### Slots

| 插槽名 | 说明 | 作用域 |
|--------|------|---------|
| — | — | — |

### Methods (via ref)

| 方法名 | 说明 | 参数 |
|--------|------|------|
| getInstance() | 获取 DxRangeSelector 原生实例 | — |

## 引入方式

```typescript
import { DfRangeSelector } from 'df-web-base'
```

全量注册后可直接在模板中使用 `<df-range-selector>`。
