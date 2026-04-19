# DfTabs 标签页

基于 DevExtreme DxTabPanel 封装的标签页组件。子组件 `DfTabPane` 定义每个面板。

> 🔧 基于 **DxTabPanel** 封装

<script setup>
import { ref } from 'vue'

const activeTab1 = ref('1')
const activeTab2 = ref('home')
</script>

## 基础用法

使用 `df-tabs` 包裹多个 `df-tab-pane`，通过 `v-model` 绑定当前激活的标签名。

<DemoBlock title="基础标签页">
<df-tabs v-model="activeTab1">
<df-tab-pane label="基本信息" name="1">基本信息内容</df-tab-pane>
<df-tab-pane label="诊断记录" name="2">诊断记录内容</df-tab-pane>
<df-tab-pane label="处方信息" name="3">处方信息内容</df-tab-pane>
</df-tabs>
<template #code>

```vue
<template>
  <df-tabs v-model="activeTab">
    <df-tab-pane label="基本信息" name="1">基本信息内容</df-tab-pane>
    <df-tab-pane label="诊断记录" name="2">诊断记录内容</df-tab-pane>
    <df-tab-pane label="处方信息" name="3">处方信息内容</df-tab-pane>
  </df-tabs>
</template>

<script setup>
import { ref } from 'vue'
const activeTab = ref('1')
</script>
```

</template>
</DemoBlock>

## 带图标标签

`df-tab-pane` 支持 `icon` 属性显示标签图标。

<DemoBlock title="带图标">
<df-tabs v-model="activeTab2">
<df-tab-pane label="首页" name="home" icon="dx-icon-home">首页内容</df-tab-pane>
<df-tab-pane label="用户" name="user" icon="dx-icon-user">用户内容</df-tab-pane>
<df-tab-pane label="设置" name="settings" icon="dx-icon-preferences">设置内容</df-tab-pane>
</df-tabs>
<template #code>

```vue
<template>
  <df-tabs v-model="activeTab">
    <df-tab-pane label="首页" name="home" icon="dx-icon-home">首页内容</df-tab-pane>
    <df-tab-pane label="用户" name="user" icon="dx-icon-user">用户内容</df-tab-pane>
    <df-tab-pane label="设置" name="settings" icon="dx-icon-preferences">设置内容</df-tab-pane>
  </df-tabs>
</template>

<script setup>
import { ref } from 'vue'
const activeTab = ref('home')
</script>
```

</template>
</DemoBlock>

## API

### DfTabs Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| modelValue / v-model | 当前激活标签的 `name` 值 | `string \| number` | — |
| type | 标签风格类型 | `'' \| 'card' \| 'border-card'` | `''` |
| closable | 标签是否可关闭 | `boolean` | `false` |
| addable | 是否显示新增按钮 | `boolean` | `false` |
| animated | 切换时是否启用过渡动画 | `boolean` | `true` |
| beforeLeave | 切换标签前的钩子，返回 `false` 或 reject 可阻止切换 | `(newName: string \| number, oldName: string \| number) => boolean \| Promise<boolean>` | — |

### DfTabPane Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| name | 标签唯一标识（必填，对应 v-model 的值） | `string \| number` | — |
| label | 标签标题文本 | `string` | `''` |
| icon | 图标类名（如 `dx-icon-home`） | `string` | — |
| closable | 该标签页是否可单独关闭 | `boolean` | `false` |
| disabled | 是否禁用该标签页 | `boolean` | `false` |
| lazy | 是否延迟渲染（首次激活时才渲染内容） | `boolean` | `false` |
| component | 动态组件（替代 slot 内容） | `Component` | — |
| content | 纯文本内容（替代 slot 内容） | `string` | — |

### TypeScript 类型定义

```typescript
import type { DfTabsProps, TabItem } from 'df-web-base'
import type { Component } from 'vue'

/** DfTabPane 注册到父组件的标签项数据 */
interface TabItem {
  name: string | number
  label: string
  icon?: string
  closable?: boolean
  disabled?: boolean
  lazy?: boolean
  component?: Component
  content?: string
}

interface DfTabsProps {
  modelValue?: string | number
  type?: '' | 'card' | 'border-card'
  closable?: boolean
  addable?: boolean
  animated?: boolean
  beforeLeave?: (newName: string | number, oldName: string | number) => boolean | Promise<boolean>
}
```

### DfTabs Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:modelValue | 激活标签变化时触发（v-model 绑定） | `(val: string \| number)` |
| tab-click | 标签被点击时触发 | `(tab: TabItem, e: MouseEvent)` |
| tab-remove | 标签被关闭时触发 | `(name: string \| number)` |
| tab-add | 点击新增按钮时触发 | `()` |

### DfTabs Slots

| 插槽名 | 说明 |
|--------|------|
| default | 放置 `<df-tab-pane>` 子组件 |

### 内部机制

DfTabs 通过 `provide('dfTabs')` 向子 `DfTabPane` 注入上下文，子面板通过 `inject` 自动注册。无需手动传递 tab 数据。

### 与 DevExtreme DxTabPanel 的差异

| 特性 | DfTabs | DxTabPanel |
|------|--------|------------|
| 面板定义 | `<df-tab-pane>` 子组件声明式 | `items` 数组配置 |
| 标签切换 | `v-model` + `beforeLeave` 守卫 | `selectedIndex` + `onSelectionChanged` |
| 关闭功能 | `closable` + `tab-remove` 事件 | 不内置 |
| 新增功能 | `addable` + `tab-add` 事件 | 不内置 |
| 标签风格 | `type` 属性 (card/border-card) | CSS 自定义 |
| 动画控制 | `animated` prop | `animationEnabled` |

## 引入方式

```typescript
import { DfTabs, DfTabPane } from 'df-web-base'
import type { DfTabsProps, TabItem } from 'df-web-base'
```

全量注册后可直接在模板中使用 `<df-tabs>` 和 `<df-tab-pane>`。
