# DfDatePicker 日期选择

基于 DevExtreme DxDateBox / DxDateRangeBox 封装的日期选择组件，支持日期、日期时间、范围选择。

> 🔧 基于 **DxDateBox / DxDateRangeBox** 封装

## 基础用法

默认为日期选择模式。

<DemoBlock title="基础日期选择">

<df-date-picker placeholder="选择日期"></df-date-picker>

<template #code>

```vue
<df-date-picker placeholder="选择日期"></df-date-picker>
```

</template>
</DemoBlock>

## 日期时间选择

设置 `type="datetime"` 可同时选择日期和时间。

<DemoBlock title="日期时间选择">

<df-date-picker type="datetime" placeholder="选择日期时间"></df-date-picker>

<template #code>

```vue
<df-date-picker type="datetime" placeholder="选择日期时间"></df-date-picker>
```

</template>
</DemoBlock>

## 日期范围选择

设置 `type="daterange"` 选择日期范围。

<DemoBlock title="日期范围选择">

<df-date-picker type="daterange" start-placeholder="开始日期" end-placeholder="结束日期"></df-date-picker>

<template #code>

```vue
<df-date-picker type="daterange" start-placeholder="开始日期" end-placeholder="结束日期"></df-date-picker>
```

</template>
</DemoBlock>

## 不同尺寸

通过 `size` 属性控制组件大小。

<DemoBlock title="不同尺寸">

<df-space direction="vertical" :fill="true" style="width: 300px">
  <df-date-picker size="large" placeholder="大号"></df-date-picker>
  <df-date-picker size="default" placeholder="默认"></df-date-picker>
  <df-date-picker size="small" placeholder="小号"></df-date-picker>
</df-space>

<template #code>

```vue
<df-space direction="vertical" :fill="true" style="width: 300px">
  <df-date-picker size="large" placeholder="大号"></df-date-picker>
  <df-date-picker size="default" placeholder="默认"></df-date-picker>
  <df-date-picker size="small" placeholder="小号"></df-date-picker>
</df-space>
```

</template>
</DemoBlock>

## 禁用状态

<DemoBlock title="禁用状态">

<df-date-picker disabled placeholder="禁用状态"></df-date-picker>

<template #code>

```vue
<df-date-picker disabled placeholder="禁用状态"></df-date-picker>
```

</template>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| modelValue / v-model | 绑定值 | `Date \| string \| null \| [Date, Date]` | — |
| type | 选择器类型 | `'date' \| 'datetime' \| 'daterange' \| 'datetimerange' \| 'month' \| 'year' \| 'week'` | 'date' |
| format | 显示格式 | `string` | — |
| valueFormat | 值格式 | `string` | — |
| placeholder | 占位文字 | `string` | '请选择日期' |
| startPlaceholder | 范围开始占位文字 | `string` | '开始日期' |
| endPlaceholder | 范围结束占位文字 | `string` | '结束日期' |
| clearable | 可清空 | `boolean` | true |
| disabled | 禁用 | `boolean` | false |
| readonly | 只读 | `boolean` | false |
| size | 尺寸 | `'large' \| 'default' \| 'small'` | 'default' |
| width | 宽度 | `string \| number` | — |
| editable | 可编辑 | `boolean` | true |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:modelValue | 值改变 | `(value: any)` |
| change | 日期变化 | `(value: any)` |

## 引入方式

```typescript
import { DfDatePicker } from 'df-web-base'
```

全量注册后可直接在模板中使用 `<df-date-picker>`。
