# DfRadio 单选框

单选框组组件，支持普通和按钮样式。

> 🔧 基于 **自定义组件** 封装

## 基础用法

通过 `options` 属性传入选项数组，每个选项包含 `label` 和 `value`。

<DemoBlock title="基础单选框">

<df-radio :options="[{ label: '选项一', value: '1' }, { label: '选项二', value: '2' }, { label: '选项三', value: '3' }]"></df-radio>

<template #code>

```vue
<df-radio
  :options="[
    { label: '选项一', value: '1' },
    { label: '选项二', value: '2' },
    { label: '选项三', value: '3' },
  ]"
/>
```

</template>
</DemoBlock>

## 按钮样式

设置 `button` 属性启用按钮样式的单选框组。

<DemoBlock title="按钮样式">

<df-radio :options="[{ label: '北京', value: 'beijing' }, { label: '上海', value: 'shanghai' }, { label: '广州', value: 'guangzhou' }]" button></df-radio>

<template #code>

```vue
<df-radio
  :options="[
    { label: '北京', value: 'beijing' },
    { label: '上海', value: 'shanghai' },
    { label: '广州', value: 'guangzhou' },
  ]"
  button
/>
```

</template>
</DemoBlock>

## 禁用状态

<DemoBlock title="禁用状态">

<df-radio :options="[{ label: '可选', value: '1' }, { label: '禁用', value: '2', disabled: true }, { label: '可选', value: '3' }]" disabled></df-radio>

<template #code>

```vue
<df-radio
  :options="[
    { label: '可选', value: '1' },
    { label: '禁用', value: '2', disabled: true },
    { label: '可选', value: '3' },
  ]"
  disabled
/>
```

</template>
</DemoBlock>

## 不同尺寸

通过 `size` 属性控制单选框组大小。

<DemoBlock title="不同尺寸">

<df-space direction="vertical">
  <df-radio :options="[{ label: '默认', value: '1' }, { label: 'B', value: '2' }]" size="default"></df-radio>
  <df-radio :options="[{ label: '小型', value: '1' }, { label: 'B', value: '2' }]" size="small"></df-radio>
  <df-radio :options="[{ label: '迷你', value: '1' }, { label: 'B', value: '2' }]" size="mini"></df-radio>
</df-space>

<template #code>

```vue
<df-space direction="vertical">
  <df-radio :options="[{ label: '默认', value: '1' }, { label: 'B', value: '2' }]" size="default"></df-radio>
  <df-radio :options="[{ label: '小型', value: '1' }, { label: 'B', value: '2' }]" size="small"></df-radio>
  <df-radio :options="[{ label: '迷你', value: '1' }, { label: 'B', value: '2' }]" size="mini"></df-radio>
</df-space>
```

</template>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| modelValue / v-model | 绑定值 | `string \| number` | — |
| options | 选项数组 | `RadioOption[]` | `[]` |
| disabled | 是否禁用整组 | `boolean` | `false` |
| size | 尺寸 | `'default' \| 'small' \| 'mini'` | `'default'` |
| button | 是否使用按钮样式 | `boolean` | `false` |

### TypeScript 类型定义

```typescript
import type { DfRadioProps, RadioOption } from 'df-web-base'

/** 单选项配置 */
interface RadioOption {
  /** 显示文本 */
  label: string
  /** 选项值 */
  value: string | number
  /** 是否禁用该选项 */
  disabled?: boolean
}

interface DfRadioProps {
  modelValue?: string | number
  options?: RadioOption[]
  disabled?: boolean
  size?: 'default' | 'small' | 'mini'
  button?: boolean
}
```

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:modelValue | 值改变时触发（v-model 绑定） | `(value: string \| number)` |
| change | 用户操作导致选中变化时触发 | `(value: string \| number)` |

## 引入方式

```typescript
import { DfRadio } from 'df-web-base'
import type { DfRadioProps, RadioOption } from 'df-web-base'
```

全量注册后可直接在模板中使用 `<df-radio>`。
