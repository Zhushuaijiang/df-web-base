# DfCircularGauge 圆形仪表盘

基于 DevExtreme DxCircularGauge 封装的圆形仪表盘组件，用于显示单一指标的进度或范围。

> 🔧 基于 **DxCircularGauge** 封装

## 基础用法

通过 `value` 设置当前值，`subvalueValues` 设置辅助指示值。

<DemoBlock title="基础用法">

<df-circular-gauge :value="72" :start-value="0" :end-value="100" :height="200"></df-circular-gauge>

<template #code>

```vue
<df-circular-gauge
  :value="72"
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
| value | 主指示值 | `number` | **必填** |
| subvalueValues | 辅助指示值数组 | `number[]` | — |
| startValue | 刻度起始值 | `number` | `0` |
| endValue | 刻度结束值 | `number` | `100` |
| geometry | 几何配置（起始角/结束角） | `object` | — |
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
| getInstance() | 获取 DxCircularGauge 原生实例 | — |

## 引入方式

```typescript
import { DfCircularGauge } from 'df-web-base'
```

全量注册后可直接在模板中使用 `<df-circular-gauge>`。
