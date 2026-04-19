# DfSwitch 开关

基于 DevExtreme DxSwitch 封装的开关组件。

> 🔧 基于 **DxSwitch** 封装

## 基础用法

<DemoBlock title="基础开关">

<df-switch></df-switch>

<template #code>

```vue
<df-switch></df-switch>
```

</template>
</DemoBlock>

## 文字描述

使用 `active-text` 和 `inactive-text` 设置开关状态的文字描述。

<DemoBlock title="文字描述">

<df-switch active-text="开启" inactive-text="关闭"></df-switch>

<template #code>

```vue
<df-switch active-text="开启" inactive-text="关闭"></df-switch>
```

</template>
</DemoBlock>

## 禁用状态

<DemoBlock title="禁用状态">

<df-switch disabled></df-switch>

<template #code>

```vue
<df-switch disabled></df-switch>
```

</template>
</DemoBlock>

## 自定义宽度和值

通过 `width` 控制开关宽度，`active-value` / `inactive-value` 自定义开关的值。

<DemoBlock title="自定义宽度">

<df-switch :width="60" active-text="ON" inactive-text="OFF"></df-switch>

<template #code>

```vue
<df-switch :width="60" active-text="ON" inactive-text="OFF"></df-switch>
```

</template>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| modelValue / v-model | 绑定值 | `boolean \| string \| number` | `false` |
| activeValue | 打开时绑定的值 | `boolean \| string \| number` | `true` |
| inactiveValue | 关闭时绑定的值 | `boolean \| string \| number` | `false` |
| activeText | 打开时显示的文字描述 | `string` | `''` |
| inactiveText | 关闭时显示的文字描述 | `string` | `''` |
| disabled | 是否禁用 | `boolean` | `false` |
| width | 开关宽度（单位 px） | `number` | `44` |

### TypeScript 类型定义

```typescript
import type { DfSwitchProps } from 'df-web-base'

interface DfSwitchProps {
  modelValue?: boolean | string | number
  activeValue?: boolean | string | number
  inactiveValue?: boolean | string | number
  activeText?: string
  inactiveText?: string
  disabled?: boolean
  width?: number
}
```

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:modelValue | 值改变时触发（v-model 绑定） | `(value: boolean \| string \| number)` |
| change | 用户操作导致开关状态变化时触发 | `(value: boolean \| string \| number)` |

### 与 DevExtreme DxSwitch 的差异

| 特性 | DfSwitch | DxSwitch |
|------|----------|----------|
| 绑定模型 | `v-model` + `activeValue`/`inactiveValue` | `value` (boolean only) |
| 自定义值 | 支持 string/number 映射 | 仅 boolean |
| 文字描述 | `activeText`/`inactiveText` | `switchedOnText`/`switchedOffText` |
| 宽度控制 | `width` prop | `width` option |
| 事件命名 | `change` | `onValueChanged` |

## 引入方式

```typescript
import { DfSwitch } from 'df-web-base'
import type { DfSwitchProps } from 'df-web-base'
```

全量注册后可直接在模板中使用 `<df-switch>`。
