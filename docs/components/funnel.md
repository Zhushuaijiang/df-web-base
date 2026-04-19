# DfFunnel 漏斗图

基于 DevExtreme DxFunnel 封装的漏斗图组件，用于展示流程各阶段的转化率。

> 🔧 基于 **DxFunnel** 封装

## 基础用法

通过 `dataSource` 传入数据，`argumentField` 和 `valueField` 指定字段。

<DemoBlock title="基础漏斗图">

<df-funnel :data-source="[{ arg: '访问', val: 1000 }, { arg: '咨询', val: 600 }, { arg: '意向', val: 300 }, { arg: '成交', val: 100 }]" argument-field="arg" value-field="val" :height="300"></df-funnel>

<template #code>

```vue
<df-funnel
  :data-source="[
    { arg: '访问', val: 1000 },
    { arg: '咨询', val: 600 },
    { arg: '意向', val: 300 },
    { arg: '成交', val: 100 },
  ]"
  argument-field="arg"
  value-field="val"
  :height="300"
/>
```

</template>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| dataSource | 数据源 | `any[]` | **必填** |
| argumentField | 参数字段名 | `string` | `'argument'` |
| valueField | 值字段名 | `string` | `'value'` |
| colorField | 颜色字段名 | `string` | — |
| palette | 调色板 | `string \| string[]` | `'Material'` |
| algorithm | 排列算法 | `'dynamicHeight' \| 'dynamicSlope' \| 'equal'` | `'dynamicHeight'` |
| inverted | 反转漏斗 | `boolean` | `false` |
| sortData | 按值排序 | `boolean` | `true` |
| label | 标签配置 | `object` | — |
| tooltipEnabled | 启用提示框 | `boolean` | `true` |
| title | 标题 | `string` | — |
| showLegend | 显示图例 | `boolean` | `true` |
| neckWidth | 漏斗颈宽度（比例） | `number` | — |
| neckHeight | 漏斗颈高度（比例） | `number` | — |
| width | 宽度 | `number \| string` | `'100%'` |
| height | 高度 | `number \| string` | — |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| itemClick | 项点击 | `(e: { itemData })` |
| legendClick | 图例点击 | `(e)` |
| tooltipHidden | 提示框隐藏 | `(e)` |
| tooltipShown | 提示框显示 | `(e)` |

### Slots

| 插槽名 | 说明 | 作用域 |
|--------|------|---------|
| — | — | — |

### Methods (via ref)

| 方法名 | 说明 | 参数 |
|--------|------|------|
| getInstance() | 获取 DxFunnel 原生实例 | — |
| refresh() | 刷新图表 | — |

## 引入方式

```typescript
import { DfFunnel } from 'df-web-base'
```

全量注册后可直接在模板中使用 `<df-funnel>`。
