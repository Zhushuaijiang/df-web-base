# DfSlider 滑块

基于 DevExtreme DxSlider 封装的滑块组件，支持输入框联动、范围选择和垂直模式。

> 🔧 基于 **DxSlider** 封装

<script setup>
import { ref } from 'vue'

const val1 = ref(30)
const val2 = ref(50)
const val3 = ref(5)
</script>

## 基础用法

<DemoBlock title="基础滑块">

<df-slider v-model="val1"></df-slider>

<template #code>

```vue
<template>
  <df-slider v-model="value" />
</template>

<script setup>
import { ref } from 'vue'
const value = ref(30)
</script>
```

</template>
</DemoBlock>

## 带输入框

通过 `show-input` 在滑块右侧显示数字输入框。

<DemoBlock title="带输入框">

<df-slider v-model="val2" show-input></df-slider>

<template #code>

```vue
<df-slider v-model="value" show-input />
```

</template>
</DemoBlock>

## 禁用状态

<DemoBlock title="禁用状态">

<df-slider :model-value="40" disabled></df-slider>

<template #code>

```vue
<df-slider :model-value="40" disabled />
```

</template>
</DemoBlock>

## 自定义范围与步长

<DemoBlock title="自定义范围">

<df-slider v-model="val3" :min="0" :max="10" :step="0.5" show-input></df-slider>

<template #code>

```vue
<template>
  <df-slider v-model="value" :min="0" :max="10" :step="0.5" show-input />
</template>

<script setup>
import { ref } from 'vue'
const value = ref(5)
</script>
```

</template>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| modelValue / v-model | 绑定值 | `number` | 0 |
| min | 最小值 | `number` | 0 |
| max | 最大值 | `number` | 100 |
| step | 步长 | `number` | 1 |
| disabled | 禁用 | `boolean` | false |
| readonly | 只读 | `boolean` | false |
| showTooltip | 显示提示 | `boolean` | true |
| tooltipFormat | 提示格式 | `string` | — |
| showInput | 显示输入框 | `boolean` | false |
| inputWidth | 输入框宽度 | `number \| string` | 130 |
| vertical | 垂直模式 | `boolean` | false |
| height | 垂直模式高度 | `string \| number` | '200px' |
| range | 范围选择 | `boolean` | false |
| size | 尺寸 | `'large' \| 'default' \| 'small'` | 'default' |
| marks | 刻度标记 | `Record<number, string>` | — |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:modelValue | 值改变 | `(value: number)` |
| change | 拖动结束 | `(value: number)` |
| input | 实时输入 | `(value: number)` |

## 引入方式

```typescript
import { DfSlider } from 'df-web-base'
```

全量注册后可直接在模板中使用 `<df-slider>`。
