# DfRecurrenceEditor 重复规则编辑器

基于 DevExtreme DxRecurrenceEditor 封装的重复规则编辑器组件，用于配置日程重复频率。

> 🔧 基于 **DxRecurrenceEditor** 封装

## 基础用法

通过 `value` 绑定重复规则的 RRULE 字符串。

<DemoBlock title="基础用法">

<df-recurrence-editor value="FREQ=DAILY;INTERVAL=1"></df-recurrence-editor>

<template #code>

```vue
<df-recurrence-editor v-model="rule" />
```

</template>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| modelValue / v-model | 重复规则（RRULE 字符串） | `string` | `''` |
| value | 重复规则 | `string` | `''` |
| startDate | 起始日期 | `Date \| string` | — |
| visible | 是否可见 | `boolean` | `true` |
| disabled | 禁用 | `boolean` | `false` |
| editRecurrenceRule | 编辑模式 | `boolean` | `true` |
| firstDayOfWeek | 每周起始日 | `number` | `0` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:modelValue | 规则变化 | `(value: string)` |
| valueChanged | 值变化 | `(e: { value, previousValue })` |

### Slots

| 插槽名 | 说明 | 作用域 |
|--------|------|---------|
| — | — | — |

## 引入方式

```typescript
import { DfRecurrenceEditor } from 'df-web-base'
```

全量注册后可直接在模板中使用 `<df-recurrence-editor>`。
