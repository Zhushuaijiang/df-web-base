# DfRate 评分

评分组件，支持半星、自定义图标颜色和辅助文字。

<script setup>
import { ref } from 'vue'

const score1 = ref(3)
const score2 = ref(3.5)
const score3 = ref(4)
const scoreRed = ref(4)
const scoreGreen = ref(2)
</script>

## 基础用法

<DemoBlock title="基础评分">

<df-rate v-model="score1"></df-rate>

<template #code>

```vue
<template>
  <df-rate v-model="score" />
</template>

<script setup>
import { ref } from 'vue'
const score = ref(3)
</script>
```

</template>
</DemoBlock>

## 半星与文字

通过 `allow-half` 允许选择半星，`show-text` 显示辅助文字，`show-score` 显示分数。

<DemoBlock title="半星与辅助文字">

<df-rate v-model="score2" allow-half show-text></df-rate>

<df-rate v-model="score3" show-score></df-rate>

<template #code>

```vue
<template>
  <df-rate v-model="score1" allow-half show-text />
  <df-rate v-model="score2" show-score />
</template>

<script setup>
import { ref } from 'vue'
const score1 = ref(3.5)
const score2 = ref(4)
</script>
```

</template>
</DemoBlock>

## 自定义颜色

<DemoBlock title="自定义颜色">

<df-rate v-model="scoreRed" active-color="#F5222D"></df-rate>

<df-rate v-model="scoreGreen" active-color="#52C41A"></df-rate>

<template #code>

```vue
<df-rate v-model="score1" active-color="#F5222D" />
<df-rate v-model="score2" active-color="#52C41A" />
```

</template>
</DemoBlock>

## 禁用与只读

<DemoBlock title="禁用状态">

<df-rate :model-value="3" disabled></df-rate>

<df-rate :model-value="4" readonly></df-rate>

<template #code>

```vue
<df-rate :model-value="3" disabled />
<df-rate :model-value="4" readonly />
```

</template>
</DemoBlock>

## 不同尺寸

<DemoBlock title="尺寸">

<df-rate :model-value="3" size="large"></df-rate>

<df-rate :model-value="3"></df-rate>

<df-rate :model-value="3" size="small"></df-rate>

<template #code>

```vue
<df-rate v-model="score" size="large" />
<df-rate v-model="score" />
<df-rate v-model="score" size="small" />
```

</template>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| modelValue / v-model | 绑定值 | `number` | 0 |
| max | 最大分值 | `number` | 5 |
| disabled | 禁用 | `boolean` | false |
| readonly | 只读 | `boolean` | false |
| allowHalf | 允许半星 | `boolean` | false |
| size | 尺寸 | `'large' \| 'default' \| 'small'` | 'default' |
| activeColor | 激活颜色 | `string` | '#FAAD14' |
| voidColor | 未激活颜色 | `string` | '#D1D6E0' |
| activeIcon | 激活图标 | `string` | 'dx-icon-favorites' |
| voidIcon | 未激活图标 | `string` | 'dx-icon-favorites' |
| showText | 显示评分文字 | `boolean` | false |
| showScore | 显示分数 | `boolean` | false |
| textColor | 文字颜色 | `string` | '#1A2030' |
| texts | 评分文字数组 | `string[]` | ['极差', '失望', '一般', '满意', '惊喜'] |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:modelValue | 值改变 | `(value: number)` |
| change | 评分变化 | `(value: number)` |

## 引入方式

```typescript
import { DfRate } from 'df-web-base'
```

全量注册后可直接在模板中使用 `<df-rate>`。
