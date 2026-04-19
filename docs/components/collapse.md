# DfCollapse 折叠面板

折叠面板组件，用于将内容区域折叠/展开。子组件 `DfCollapseItem` 用于包裹每一项。

<script setup>
import { ref } from 'vue'

const active1 = ref(['1'])
const active2 = ref('1')
const active3 = ref(['1'])
const active4 = ref(['1'])
</script>

## 基础用法

通过 `v-model` 绑定当前展开的面板名称数组，可同时展开多个面板。

<DemoBlock title="基础折叠面板">

<df-collapse v-model="active1">
<df-collapse-item title="一致性 Consistency" name="1">与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念。</df-collapse-item>
<df-collapse-item title="反馈 Feedback" name="2">通过界面样式和交互动效让用户可以清晰的感知自己的操作。</df-collapse-item>
<df-collapse-item title="效率 Efficiency" name="3">界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</df-collapse-item>
</df-collapse>

<template #code>

```vue
<template>
  <df-collapse v-model="active">
    <df-collapse-item title="一致性 Consistency" name="1">
      与现实生活一致：与现实生活的流程、逻辑保持一致。
    </df-collapse-item>
    <df-collapse-item title="反馈 Feedback" name="2">
      通过界面样式和交互动效让用户可以清晰的感知自己的操作。
    </df-collapse-item>
    <df-collapse-item title="效率 Efficiency" name="3">
      界面简单直白，让用户快速识别而非回忆。
    </df-collapse-item>
  </df-collapse>
</template>

<script setup>
import { ref } from 'vue'
const active = ref(['1'])
</script>
```

</template>
</DemoBlock>

## 手风琴模式

设置 `accordion` 属性后，每次只能展开一个面板。

<DemoBlock title="手风琴模式">

<df-collapse accordion v-model="active2">
<df-collapse-item title="面板一" name="1">手风琴模式下，展开一个面板会自动收起其他面板。</df-collapse-item>
<df-collapse-item title="面板二" name="2">这是第二个面板的内容。</df-collapse-item>
<df-collapse-item title="面板三" name="3">这是第三个面板的内容。</df-collapse-item>
</df-collapse>

<template #code>

```vue
<template>
  <df-collapse accordion v-model="active">
    <df-collapse-item title="面板一" name="1">
      手风琴模式下，展开一个面板会自动收起其他面板。
    </df-collapse-item>
    <df-collapse-item title="面板二" name="2">
      这是第二个面板的内容。
    </df-collapse-item>
    <df-collapse-item title="面板三" name="3">
      这是第三个面板的内容。
    </df-collapse-item>
  </df-collapse>
</template>

<script setup>
import { ref } from 'vue'
const active = ref('1')
</script>
```

</template>
</DemoBlock>

## 禁用面板

在 `DfCollapseItem` 上设置 `disabled` 属性禁用该面板。

<DemoBlock title="禁用面板">

<df-collapse v-model="active3">
<df-collapse-item title="可操作面板" name="1">这个面板可以正常展开和折叠。</df-collapse-item>
<df-collapse-item title="禁用面板" name="2" disabled>这个面板被禁用了，无法点击。</df-collapse-item>
</df-collapse>

<template #code>

```vue
<df-collapse v-model="active">
  <df-collapse-item title="可操作面板" name="1">
    这个面板可以正常展开和折叠。
  </df-collapse-item>
  <df-collapse-item title="禁用面板" name="2" disabled>
    这个面板被禁用了，无法点击。
  </df-collapse-item>
</df-collapse>
```

</template>
</DemoBlock>

## 自定义标题

通过 `DfCollapseItem` 的 `title` 插槽自定义标题内容。

<DemoBlock title="自定义标题">

<df-collapse v-model="active4">
<df-collapse-item name="1">
<template #title><span style="color: #409eff; font-weight: 700">自定义标题样式</span></template>
通过 title 插槽可以自定义标题区域的样式和内容。
</df-collapse-item>
</df-collapse>

<template #code>

```vue
<df-collapse v-model="active">
  <df-collapse-item name="1">
    <template #title>
      <span style="color: #409eff; font-weight: 700">自定义标题样式</span>
    </template>
    通过 title 插槽可以自定义标题区域的样式和内容。
  </df-collapse-item>
</df-collapse>
```

</template>
</DemoBlock>

## DfCollapse API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| modelValue / v-model | 当前展开的面板 | `string \| number \| Array<string \| number>` | -- |
| accordion | 手风琴模式 | `boolean` | false |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| change | 展开项变化 | `(activeNames)` |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 放置 DfCollapseItem |

## DfCollapseItem API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| title | 面板标题 | `string` | '' |
| name | 唯一标识符 | `string \| number` | -- |
| disabled | 禁用 | `boolean` | false |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 面板内容 |
| title | 自定义标题 |

## 引入方式

```typescript
import { DfCollapse, DfCollapseItem } from 'df-web-base'
```

全量注册后可直接在模板中使用 `<df-collapse>` 和 `<df-collapse-item>`。
