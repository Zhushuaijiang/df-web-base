# DfBullet 子弹图

基于 DevExtreme DxBullet 封装的子弹图组件，用于对比实际值与目标值。

> 🔧 基于 **DxBullet** 封装

## 基础用法

通过 `value` 设置实际值，`target` 设置目标值，`startScaleValue` 和 `endScaleValue` 设置刻度范围。

<DemoBlock title="基础用法">

<df-bullet :value="65" :target="80" :start-scale-value="0" :end-scale-value="100"></df-bullet>

<template #code>

```vue
<df-bullet
  :value="65"
  :target="80"
  :start-scale-value="0"
  :end-scale-value="100"
/>
```

</template>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| value | 实际值 | `number` | **必填** |
| target | 目标值 | `number` | `0` |
| startScaleValue | 刻度起始值 | `number` | `0` |
| endScaleValue | 刻度结束值 | `number` | `100` |
| color | 实际值条颜色 | `string` | — |
| targetColor | 目标线颜色 | `string` | — |
| showTarget | 显示目标线 | `boolean` | `true` |
| showZeroLevel | 显示零线 | `boolean` | `true` |
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
import { DfBullet } from 'df-web-base'
```

全量注册后可直接在模板中使用 `<df-bullet>`。
