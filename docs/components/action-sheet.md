# DfActionSheet 操作面板

基于 DevExtreme DxActionSheet 封装的操作面板组件，从底部弹出操作选项列表。

> 🔧 基于 **DxActionSheet** 封装

<script setup>
import { ref } from 'vue'

const visible = ref(false)
</script>

## 基础用法

通过 `v-model` 控制显示，`dataSource` 传入操作选项。

<DemoBlock title="基础用法">

<df-button type="primary" @click="visible = true">打开操作面板</df-button>
<df-action-sheet v-model:visible="visible" :data-source="[{ text: '拍照' }, { text: '从相册选择' }, { text: '取消' }]" title="选择操作"></df-action-sheet>

<template #code>

```vue
<template>
  <df-button type="primary" @click="visible = true">打开操作面板</df-button>
  <df-action-sheet
    v-model:visible="visible"
    :data-source="[
      { text: '拍照' },
      { text: '从相册选择' },
      { text: '取消' },
    ]"
    title="选择操作"
  />
</template>

<script setup>
import { ref } from 'vue'
const visible = ref(false)
</script>
```

</template>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| visible / v-model | 是否显示 | `boolean` | `false` |
| dataSource | 操作项数据源 | `any[]` | **必填** |
| title | 面板标题 | `string` | — |
| showTitle | 显示标题 | `boolean` | `true` |
| showCancelButton | 显示取消按钮 | `boolean` | `true` |
| cancelText | 取消按钮文字 | `string` | `'取消'` |
| usePopover | 使用弹出框模式 | `boolean` | `false` |
| target | 目标元素 | `string \| Element` | — |
| width | 宽度 | `number \| string` | — |
| height | 高度 | `number \| string` | — |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:visible | 显示状态变化 | `(val: boolean)` |
| itemClick | 操作项点击 | `(e: { itemData, itemIndex })` |
| cancelClick | 取消按钮点击 | `(e)` |
| hidden | 隐藏后触发 | `(e)` |
| shown | 显示后触发 | `(e)` |

### Slots

| 插槽名 | 说明 | 作用域 |
|--------|------|---------|
| — | — | — |

## 引入方式

```typescript
import { DfActionSheet } from 'df-web-base'
```

全量注册后可直接在模板中使用 `<df-action-sheet>`。
