# DfCalendar 日历

基于 DevExtreme DxCalendar 封装的日历组件。

> 🔧 基于 **DxCalendar** 封装

## 基础用法

通过 `v-model` 绑定选中的日期。

<DemoBlock title="基础日历">

<df-calendar></df-calendar>

<template #code>

```vue
<df-calendar v-model="date" />
```

</template>
</DemoBlock>

## 禁用状态

设置 `disabled` 禁用日历选择。

<DemoBlock title="禁用日历">

<df-calendar disabled></df-calendar>

<template #code>

```vue
<df-calendar v-model="date" disabled />
```

</template>
</DemoBlock>

## 不同尺寸

通过 `size` 控制日历大小。

<DemoBlock title="不同尺寸">

<df-space>
<df-calendar size="small"></df-calendar>
<df-calendar size="default"></df-calendar>
</df-space>

<template #code>

```vue
<df-space>
  <df-calendar v-model="date" size="small" />
  <df-calendar v-model="date" size="default" />
</df-space>
```

</template>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| modelValue / v-model | 绑定日期 | `Date \| string \| null` | — |
| min | 最小日期 | `Date \| string` | — |
| max | 最大日期 | `Date \| string` | — |
| disabled | 禁用 | `boolean` | false |
| firstDayOfWeek | 每周起始日 | `0-6` | 1 |
| zoomLevel | 缩放级别 | `'month' \| 'year' \| 'decade' \| 'century'` | 'month' |
| size | 尺寸 | `'large' \| 'default' \| 'small'` | 'default' |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:modelValue | 值改变 | `(value)` |
| change | 日期变化 | `(value)` |

### Slots

| 插槽名 | 说明 |
|--------|------|
| cell | 自定义日期单元格 |

## 引入方式

```typescript
import { DfCalendar } from 'df-web-base'
```

全量注册后可直接在模板中使用 `<df-calendar>`。
