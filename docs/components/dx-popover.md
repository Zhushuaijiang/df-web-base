# DxPopover 气泡卡片（Dx版）

基于 DevExtreme DxPopover 封装的气泡卡片组件，提供完整的 DxPopover 功能。

> 🔧 基于 **DxPopover** 封装
> ⚠️ 本组件基于 DevExtreme DxPopover 封装，提供完整 Dx 功能。如需轻量版可使用 DfPopover（纯 Vue 实现）。

<script setup>
import { ref } from 'vue'

const popoverVisible = ref(false)
</script>

## 基础用法

通过 `target` 指定触发元素，`v-model` 控制显示。

<DemoBlock title="基础用法">

<df-button id="popover-demo-trigger" @click="popoverVisible = !popoverVisible">触发气泡</df-button>
<df-dx-popover target="#popover-demo-trigger" v-model:visible="popoverVisible">
<template #content>这是气泡卡片内容</template>
</df-dx-popover>

<template #code>

```vue
<template>
  <df-button id="trigger" @click="visible = !visible">触发气泡</df-button>
  <df-dx-popover target="#trigger" v-model:visible="visible">
    <template #content>
      <p>气泡卡片内容</p>
    </template>
  </df-dx-popover>
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
| target | 目标元素选择器或元素 | `string \| Element` | **必填** |
| position | 弹出位置 | `'top' \| 'bottom' \| 'left' \| 'right' \| { at, my, of, collision }` | `'bottom'` |
| width | 宽度 | `number \| string` | — |
| height | 高度 | `number \| string` | — |
| shading | 显示遮罩 | `boolean` | `false` |
| shadingColor | 遮罩颜色 | `string` | `'rgba(0, 0, 0, 0.5)'` |
| showTitle | 显示标题 | `boolean` | `false` |
| title | 标题 | `string` | — |
| showCloseButton | 显示关闭按钮 | `boolean` | `false` |
| closeOnOutsideClick | 点击外部关闭 | `boolean \| function` | `true` |
| animation | 动画配置 | `object` | — |
| container | 容器 | `string \| Element` | — |
| disabled | 禁用 | `boolean` | `false` |
| deferRendering | 延迟渲染 | `boolean` | `true` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:visible | 显示状态变化 | `(val: boolean)` |
| hidden | 隐藏后触发 | `(e)` |
| showing | 显示中触发 | `(e)` |
| shown | 显示后触发 | `(e)` |
| hiding | 隐藏中触发 | `(e)` |

### Slots

| 插槽名 | 说明 | 作用域 |
|--------|------|---------|
| default | 触发元素 | — |
| content | 气泡内容 | — |

### Methods (via ref)

| 方法名 | 说明 | 参数 |
|--------|------|------|
| getInstance() | 获取 DxPopover 原生实例 | — |
| show() | 显示气泡 | — |
| hide() | 隐藏气泡 | — |

## 引入方式

```typescript
import { DxPopover } from 'df-web-base'
```

全量注册后可直接在模板中使用 `<df-dx-popover>`。
