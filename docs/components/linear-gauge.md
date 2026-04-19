# DfLinearGauge 线性仪表盘

基于 DevExtreme DxLinearGauge 封装的线性仪表盘组件，以水平/垂直条形式显示指标值。

> 🔧 基于 **DxLinearGauge** 封装

## 基础用法

通过 `value` 设置当前值，`subvalueValues` 设置辅助指示值。

<DemoBlock title="水平线性仪表">

<df-linear-gauge :value="68" :start-value="0" :end-value="100" :height="60"></df-linear-gauge>

<template #code>

```vue
<df-linear-gauge
  :value="68"
  :start-value="0"
  :end-value="100"
  :height="60"
/>
```

</template>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| value | 主指示值 | `number` | **必填** |
| subvalueValues | 辅助指示值数组 | `number[]` | — |
| startValue | 刻度起始值 | `number` | `0` |
| endValue | 刻度结束值 | `number` | `100` |
| geometry | 几何配置（方向） | `object` | — |
| geometryOrientation | 方向 | `'horizontal' \| 'vertical'` | `'horizontal'` |
| scale | 刻度配置 | `object` | — |
| rangeContainer | 范围容器配置 | `object` | — |
| valueIndicator | 主指示器配置 | `object` | — |
| subvalueIndicator | 辅助指示器配置 | `object` | — |
| title | 标题 | `string` | — |
| tooltipEnabled | 启用提示框 | `boolean` | `false` |
| width | 宽度 | `number \| string` | `'100%'` |
| height | 高度 | `number \| string` | — |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| tooltipHidden | 提示框隐藏 | `(e)` |
| tooltipShown | 提示框显示 | `(e)` |
| valueChanged | 值变化 | `(e: { value })` |

### Slots

| 插槽名 | 说明 | 作用域 |
|--------|------|---------|
| — | — | — |

### Methods (via ref)

| 方法名 | 说明 | 参数 |
|--------|------|------|
| getInstance() | 获取 DxLinearGauge 原生实例 | — |

## 引入方式

```typescript
import { DfLinearGauge } from 'df-web-base'
```

全量注册后可直接在模板中使用 `<df-linear-gauge>`。
