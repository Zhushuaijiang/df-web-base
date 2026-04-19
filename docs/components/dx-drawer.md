# DxDrawer 抽屉（Dx版）

基于 DevExtreme DxDrawer 封装的抽屉面板组件，提供完整的 DxDrawer 功能。

> 🔧 基于 **DxDrawer** 封装
> ⚠️ 本组件基于 DevExtreme DxDrawer 封装，提供完整 Dx 功能。如需轻量版可使用 DfDrawer（基于 DxPopup 的 Vue 实现）。

<script setup>
import { ref } from 'vue'

const drawerOpened = ref(true)
</script>

## 基础用法

通过 `opened` 控制抽屉开关，`position` 控制方向。

<DemoBlock title="左侧抽屉">

<df-button @click="drawerOpened = !drawerOpened" style="margin-bottom: 8px;">{{ drawerOpened ? '关闭' : '打开' }}抽屉</df-button>
<df-dx-drawer v-model:opened="drawerOpened" position="left" :width="200" open-state-mode="shrink">
<template #panel>
<div style="padding: 16px; background: #f5f5f5; height: 100%;">抽屉内容</div>
</template>
<div style="padding: 16px; min-height: 120px;">主内容区域</div>
</df-dx-drawer>

<template #code>

```vue
<template>
  <df-button @click="visible = !visible">切换抽屉</df-button>
  <df-dx-drawer v-model:opened="visible" position="left" :width="200" open-state-mode="shrink">
    <template #panel>
      <div style="padding: 16px;">抽屉内容</div>
    </template>
    <div style="padding: 16px;">主内容区域</div>
  </df-dx-drawer>
</template>

<script setup>
import { ref } from 'vue'
const visible = ref(true)
</script>
```

</template>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| opened | 是否打开 | `boolean` | `false` |
| position | 抽屉位置 | `'left' \| 'right' \| 'top' \| 'bottom'` | `'left'` |
| width | 抽屉宽度（水平方向时） | `number` | `250` |
| height | 抽屉高度（垂直方向时） | `number` | `250` |
| openedStateMode | 打开状态模式 | `'overlap' \| 'shrink' \| 'push'` | `'shrink'` |
| revealMode | 揭示模式 | `'slide' \| 'expand'` | `'slide'` |
| template | 抽屉内容模板名 | `string \| function` | — |
| closeOnOutsideClick | 点击外部关闭 | `boolean` | `false` |
| shading | 显示遮罩 | `boolean` | `false` |
| minSize | 最小尺寸（关闭时） | `number` | `0` |
| animationDuration | 动画时长（毫秒） | `number` | `400` |
| disabled | 禁用 | `boolean` | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:opened | 打开状态变化 | `(val: boolean)` |
| hidden | 隐藏后触发 | `(e)` |
| showing | 显示中触发 | `(e)` |
| shown | 显示后触发 | `(e)` |

### Slots

| 插槽名 | 说明 | 作用域 |
|--------|------|---------|
| default | 主内容区域 | — |
| drawer | 抽屉内容 | — |

### Methods (via ref)

| 方法名 | 说明 | 参数 |
|--------|------|------|
| getInstance() | 获取 DxDrawer 原生实例 | — |
| toggle() | 切换抽屉状态 | — |

## 引入方式

```typescript
import { DxDrawer } from 'df-web-base'
```

全量注册后可直接在模板中使用 `<df-dx-drawer>`。
