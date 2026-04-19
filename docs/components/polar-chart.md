# DfPolarChart 极坐标图

基于 DevExtreme DxPolarChart 封装的极坐标图组件，以雷达/蜘蛛图形式展示多维度数据。

> 🔧 基于 **DxPolarChart** 封装

## 基础用法

通过 `dataSource` 传入数据，`series` 配置系列。

<DemoBlock title="雷达图">

<df-polar-chart :data-source="[{ arg: '速度', val1: 80, val2: 60 }, { arg: '力量', val1: 65, val2: 85 }, { arg: '耐力', val1: 90, val2: 70 }, { arg: '敏捷', val1: 75, val2: 80 }]" :series="[{ valueField: 'val1', name: '选手A' }, { valueField: 'val2', name: '选手B' }]" argument-field="arg" :height="350" use-spider-web></df-polar-chart>

<template #code>

```vue
<df-polar-chart
  :data-source="radarData"
  :series="[{ valueField: 'val1', name: '选手A' }, { valueField: 'val2', name: '选手B' }]"
  argument-field="arg"
  :height="350"
  use-spider-web
/>
```

</template>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| dataSource | 数据源 | `any[]` | **必填** |
| series | 系列配置数组 | `object[]` | **必填** |
| argumentField | 参数字段名 | `string` | `'argument'` |
| useSpiderWeb | 使用蜘蛛网模式 | `boolean` | `false` |
| type | 系列默认类型 | `'line' \| 'area' \| 'scatter' \| 'bar' \| 'stackedbar'` | `'line'` |
| palette | 调色板 | `string \| string[]` | `'Material'` |
| title | 标题 | `string` | — |
| showLegend | 显示图例 | `boolean` | `true` |
| legendPosition | 图例位置 | `'top' \| 'bottom' \| 'left' \| 'right'` | `'bottom'` |
| tooltipEnabled | 启用提示框 | `boolean` | `true` |
| animation | 启用动画 | `boolean` | `true` |
| width | 宽度 | `number \| string` | `'100%'` |
| height | 高度 | `number \| string` | — |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| pointClick | 数据点点击 | `(e)` |
| legendClick | 图例项点击 | `(e)` |
| done | 渲染完成 | `(e)` |

### Slots

| 插槽名 | 说明 | 作用域 |
|--------|------|---------|
| — | — | — |

### Methods (via ref)

| 方法名 | 说明 | 参数 |
|--------|------|------|
| getInstance() | 获取 DxPolarChart 原生实例 | — |
| refresh() | 刷新图表 | — |

## 引入方式

```typescript
import { DfPolarChart } from 'df-web-base'
```

全量注册后可直接在模板中使用 `<df-polar-chart>`。
