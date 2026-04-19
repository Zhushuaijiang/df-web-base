# DfCheckbox 复选框

基于 DevExtreme DxCheckBox 封装的复选框组件，支持单选和数组多选模式。

> 🔧 基于 **DxCheckBox** 封装

## 基础用法

使用 `label` 设置标签文本。

<DemoBlock title="基础复选框">

<df-space direction="vertical">
  <df-checkbox label="选项 A"></df-checkbox>
  <df-checkbox label="选项 B" disabled></df-checkbox>
</df-space>

<template #code>

```vue
<df-space direction="vertical">
  <df-checkbox label="选项 A"></df-checkbox>
  <df-checkbox label="选项 B" disabled></df-checkbox>
</df-space>
```

</template>
</DemoBlock>

## 不同尺寸

通过 `size` 属性控制复选框大小。

<DemoBlock title="不同尺寸">

<df-space>
  <df-checkbox label="默认" size="default"></df-checkbox>
  <df-checkbox label="小型" size="small"></df-checkbox>
  <df-checkbox label="迷你" size="mini"></df-checkbox>
</df-space>

<template #code>

```vue
<df-space>
  <df-checkbox label="默认" size="default"></df-checkbox>
  <df-checkbox label="小型" size="small"></df-checkbox>
  <df-checkbox label="迷你" size="mini"></df-checkbox>
</df-space>
```

</template>
</DemoBlock>

## 禁用状态

<DemoBlock title="禁用状态">

<df-space>
  <df-checkbox label="正常"></df-checkbox>
  <df-checkbox label="禁用" disabled></df-checkbox>
</df-space>

<template #code>

```vue
<df-space>
  <df-checkbox label="正常"></df-checkbox>
  <df-checkbox label="禁用" disabled></df-checkbox>
</df-space>
```

</template>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| modelValue / v-model | 绑定值。布尔值为单选模式，数组为多选模式 | `boolean \| string[] \| number[]` | `false` |
| checkedValue | 选中时对应的值（数组模式下追加/移除此值） | `string \| number` | — |
| label | 标签文字 | `string` | — |
| disabled | 是否禁用 | `boolean` | `false` |
| indeterminate | 是否为半选（不确定）状态 | `boolean` | `false` |
| size | 尺寸 | `'default' \| 'small' \| 'mini'` | `'default'` |

### TypeScript 类型定义

```typescript
import type { DfCheckboxProps } from 'df-web-base'

interface DfCheckboxProps {
  modelValue?: boolean | string[] | number[]
  checkedValue?: string | number
  label?: string
  disabled?: boolean
  indeterminate?: boolean
  size?: 'default' | 'small' | 'mini'
}
```

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:modelValue | 值改变时触发（v-model 绑定） | `(value: boolean \| (string \| number)[])` |
| change | 用户操作导致值变化时触发 | `(value: boolean \| (string \| number)[])` |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 自定义标签文字内容，覆盖 `label` prop |

### 与 DevExtreme DxCheckBox 的差异

| 特性 | DfCheckbox | DxCheckBox |
|------|-----------|------------|
| 绑定模型 | `v-model` (boolean/array) | `value` (boolean) |
| 数组模式 | 内置支持 `checkedValue` 数组收集 | 不支持，需手动管理 |
| 半选状态 | `indeterminate` prop | `value = undefined` |
| 尺寸控制 | `size` prop | CSS 自定义 |
| 事件命名 | `change` | `onValueChanged` |

## 引入方式

```typescript
import { DfCheckbox } from 'df-web-base'
import type { DfCheckboxProps } from 'df-web-base'
```

全量注册后可直接在模板中使用 `<df-checkbox>`。
