# DfSparkline 迷你图

基于 DevExtreme DxSparkline 封装的迷你图组件，在单元格级空间内展示数据趋势。

> 🔧 基于 **DxSparkline** 封装

## 基础用法

通过 `dataSource` 传入数据，`valueField` 指定值字段，`type` 设置图表类型。

<DemoBlock title="折线迷你图">

<df-sparkline :data-source="[10, 25, 18, 30, 22, 35, 28]" type="line"></df-sparkline>

<template #code>

```vue
<df-sparkline
  :data-source="[10, 25, 18, 30, 22, 35, 28]"
  type="line"
/>
```

</template>
</DemoBlock>

## 柱状迷你图

<DemoBlock title="柱状迷你图">

<df-sparkline :data-source="[10, 25, 18, 30, 22, 35, 28]" type="bar"></df-sparkline>

<template #code>

```vue
<df-sparkline
  :data-source="[10, 25, 18, 30, 22, 35, 28]"
  type="bar"
/>
```

</template>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| dataSource | 数据源 | `number[] \| any[]` | **必填** |
| type | 图表类型 | `'line' \| 'spline' \| 'bar' \| 'area' \| 'winloss' \| 'candlestick' \| 'bullet'` | `'line'` |
| valueField | 值字段名（对象数组时使用） | `string` | `'value'` |
| argumentField | 参数字段名 | `string` | `'argument'` |
| showMinMax | 显示极值点 | `boolean` | `false` |
| showFirstLast | 显示首尾点 | `boolean` | `false` |
| lineColor | 线条颜色 | `string` | — |
| barPositiveColor | 正值柱颜色 | `string` | — |
| barNegativeColor | 负值柱颜色 | `string` | — |
| tooltipEnabled | 启用提示框 | `boolean` | `true` |
| width | 宽度 | `number \| string` | `'100%'` |
| height | 高度 | `number \| string` | `30` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| tooltipHidden | 提示框隐藏 | `(e)` |
| tooltipShown | 提示框显示 | `(e)` |

### Slots

| 插槽名 | 说明 | 作用域 |
|--------|------|---------|
| — | — | — |

## 引入方式

```typescript
import { DfSparkline } from 'df-web-base'
```

全量注册后可直接在模板中使用 `<df-sparkline>`。
