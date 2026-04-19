# DfBarGauge 条形仪表盘

基于 DevExtreme DxBarGauge 封装的条形仪表盘组件，以弧形条显示多个数值指标。

> 🔧 基于 **DxBarGauge** 封装

## 基础用法

通过 `values` 传入数值数组，`startValue` 和 `endValue` 设置刻度范围。

<DemoBlock title="基础用法">

<df-bar-gauge :values="[47, 65, 82, 33]" :start-value="0" :end-value="100" :height="200"></df-bar-gauge>

<template #code>

```vue
<df-bar-gauge
  :values="[47, 65, 82, 33]"
  :start-value="0"
  :end-value="100"
  :height="200"
/>
```

</template>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| values | 数值数组 | `number[]` | **必填** |
| startValue | 刻度起始值 | `number` | `0` |
| endValue | 刻度结束值 | `number` | `100` |
| palette | 调色板 | `string \| string[]` | `'Material'` |
| label | 标签配置 | `object` | — |
| tooltipEnabled | 启用提示框 | `boolean` | `true` |
| title | 标题 | `string` | — |
| legendVisible | 显示图例 | `boolean` | `true` |
| geometry | 几何配置（起始角/结束角） | `object` | — |
| relativeInnerRadius | 内圈相对半径 | `number` | `0.3` |
| barWidth | 条形宽度 | `number` | — |
| width | 宽度 | `number \| string` | `'100%'` |
| height | 高度 | `number \| string` | — |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| tooltipHidden | 提示框隐藏 | `(e)` |
| tooltipShown | 提示框显示 | `(e)` |
| legendClick | 图例点击 | `(e)` |

### Slots

| 插槽名 | 说明 | 作用域 |
|--------|------|---------|
| — | — | — |

### Methods (via ref)

| 方法名 | 说明 | 参数 |
|--------|------|------|
| getInstance() | 获取 DxBarGauge 原生实例 | — |
| refresh() | 刷新图表 | — |

## 引入方式

```typescript
import { DfBarGauge } from 'df-web-base'
```

全量注册后可直接在模板中使用 `<df-bar-gauge>`。
