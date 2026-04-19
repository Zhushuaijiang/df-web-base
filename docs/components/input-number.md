# DfInputNumber 数字输入框

基于 DevExtreme DxNumberBox 封装的数字输入组件，支持步进、精度、范围限制。

> 🔧 基于 **DxNumberBox** 封装

## 基础用法

<DemoBlock title="基础数字输入框">

<df-input-number :min="1" :max="10"></df-input-number>

<template #code>

```vue
<df-input-number :min="1" :max="10"></df-input-number>
```

</template>
</DemoBlock>

## 步长与精度

通过 `step` 设置步长，`precision` 控制小数精度。

<DemoBlock title="步长与精度">

<df-space direction="vertical" :fill="true" style="width: 200px">
  <df-input-number :step="5" :min="0" :max="100"></df-input-number>
  <df-input-number :step="0.1" :precision="2" :min="0" :max="10"></df-input-number>
</df-space>

<template #code>

```vue
<df-space direction="vertical" :fill="true" style="width: 200px">
  <df-input-number :step="5" :min="0" :max="100"></df-input-number>
  <df-input-number :step="0.1" :precision="2" :min="0" :max="10"></df-input-number>
</df-space>
```

</template>
</DemoBlock>

## 不同尺寸

通过 `size` 属性控制组件大小。

<DemoBlock title="不同尺寸">

<df-space direction="vertical" :fill="true" style="width: 200px">
  <df-input-number size="large"></df-input-number>
  <df-input-number size="default"></df-input-number>
  <df-input-number size="small"></df-input-number>
</df-space>

<template #code>

```vue
<df-space direction="vertical" :fill="true" style="width: 200px">
  <df-input-number size="large"></df-input-number>
  <df-input-number size="default"></df-input-number>
  <df-input-number size="small"></df-input-number>
</df-space>
```

</template>
</DemoBlock>

## 禁用状态

<DemoBlock title="禁用状态">

<df-input-number disabled></df-input-number>

<template #code>

```vue
<df-input-number disabled></df-input-number>
```

</template>
</DemoBlock>

## 隐藏控制按钮

设置 `controls` 为 `false` 隐藏增减按钮。

<DemoBlock title="隐藏控制按钮">

<df-input-number :controls="false" placeholder="请输入数字"></df-input-number>

<template #code>

```vue
<df-input-number :controls="false" placeholder="请输入数字"></df-input-number>
```

</template>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| modelValue / v-model | 绑定值 | `number \| null` | — |
| min | 最小值 | `number` | -Infinity |
| max | 最大值 | `number` | Infinity |
| step | 步长 | `number` | 1 |
| stepStrictly | 是否只能输入 step 的倍数 | `boolean` | false |
| precision | 精度（小数位数） | `number` | — |
| disabled | 禁用 | `boolean` | false |
| readonly | 只读 | `boolean` | false |
| controls | 显示增减按钮 | `boolean` | true |
| controlsPosition | 增减按钮位置 | `'' \| 'right'` | '' |
| size | 尺寸 | `'large' \| 'default' \| 'small'` | 'default' |
| placeholder | 占位文字 | `string` | '' |
| width | 宽度 | `string \| number` | — |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:modelValue | 值改变 | `(value: number \| null)` |
| change | 值变化后触发 | `(current: number \| null, old: number \| null)` |

## 引入方式

```typescript
import { DfInputNumber } from 'df-web-base'
```

全量注册后可直接在模板中使用 `<df-input-number>`。
