# DfTimePicker 时间选择

基于 DevExtreme DxDateBox 封装的时间选择组件。

> 🔧 基于 **DxDateBox** 封装

## 基础用法

<DemoBlock title="基础时间选择">
<df-time-picker placeholder="请选择时间"></df-time-picker>
<template #code>

```vue
<df-time-picker v-model="time" placeholder="请选择时间" />
```

</template>
</DemoBlock>

## 禁用状态

<DemoBlock title="禁用状态">
<df-time-picker disabled placeholder="禁用状态"></df-time-picker>
<template #code>

```vue
<df-time-picker disabled placeholder="禁用状态" />
```

</template>
</DemoBlock>

## 时间范围选择

设置 `is-range` 启用时间范围选择。

<DemoBlock title="时间范围">
<df-time-picker is-range placeholder="选择时间范围"></df-time-picker>
<template #code>

```vue
<df-time-picker v-model="range" is-range placeholder="选择时间范围" />
```

</template>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| modelValue / v-model | 绑定值 | `Date \| string \| null` | — |
| isRange | 是否为范围选择 | `boolean` | false |
| format | 显示格式 | `string` | 'HH:mm:ss' |
| placeholder | 占位文字 | `string` | '请选择时间' |
| startPlaceholder | 范围开始占位文字 | `string` | '开始时间' |
| endPlaceholder | 范围结束占位文字 | `string` | '结束时间' |
| rangeSeparator | 范围分隔符 | `string` | '至' |
| clearable | 可清空 | `boolean` | true |
| disabled | 禁用 | `boolean` | false |
| size | 尺寸 | `'large' \| 'default' \| 'small'` | 'default' |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:modelValue | 值改变 | `(value)` |
| change | 时间变化 | `(value)` |

## 引入方式

```typescript
import { DfTimePicker } from 'df-web-base'
```

全量注册后可直接在模板中使用 `<df-time-picker>`。
