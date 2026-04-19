# DfColorPicker 颜色选择

基于 DevExtreme DxColorBox 封装的颜色选择组件，支持透明度、预览色块和自定义尺寸。

> 🔧 基于 **DxColorBox** 封装

<script setup>
import { ref } from 'vue'

const color1 = ref('#2AA890')
const color2 = ref('rgba(42, 168, 144, 0.6)')
</script>

## 基础用法

<DemoBlock title="基础颜色选择">

<df-color-picker v-model="color1"></df-color-picker>

<template #code>

```vue
<template>
  <df-color-picker v-model="color" />
</template>

<script setup>
import { ref } from 'vue'
const color = ref('#2AA890')
</script>
```

</template>
</DemoBlock>

## 支持透明度

通过 `show-alpha` 启用透明度通道。

<DemoBlock title="透明度选择">

<df-color-picker v-model="color2" show-alpha></df-color-picker>

<template #code>

```vue
<df-color-picker v-model="color" show-alpha />
```

</template>
</DemoBlock>

## 禁用状态

<DemoBlock title="禁用状态">

<df-color-picker model-value="#1890FF" disabled></df-color-picker>

<template #code>

```vue
<df-color-picker :model-value="'#1890FF'" disabled />
```

</template>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| modelValue / v-model | 绑定色值 | `string` | '' |
| disabled | 禁用 | `boolean` | false |
| readonly | 只读 | `boolean` | false |
| clearable | 可清空 | `boolean` | true |
| showAlpha | 支持透明度 | `boolean` | false |
| showPreview | 显示预览色块 | `boolean` | true |
| placeholder | 占位文字 | `string` | '请选择颜色' |
| width | 宽度 | `string \| number` | — |
| size | 尺寸 | `'large' \| 'default' \| 'small'` | 'default' |
| confirmText | 确认按钮文字 | `string` | '确定' |
| cancelText | 取消按钮文字 | `string` | '取消' |
| predefine | 预定义颜色 | `string[]` | — |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:modelValue | 值改变 | `(value: string)` |
| change | 颜色变化 | `(value: string)` |
| activeChange | 实时颜色变化 | `(value: string)` |

## 引入方式

```typescript
import { DfColorPicker } from 'df-web-base'
```

全量注册后可直接在模板中使用 `<df-color-picker>`。
