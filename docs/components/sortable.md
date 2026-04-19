# DfSortable 可排序容器

基于 DevExtreme DxSortable 封装的可排序容器组件，支持拖拽排序和跨列表拖放。

> 🔧 基于 **DxSortable** 封装

## 基础用法

将列表包裹在 `DfSortable` 中，通过 `group` 分组实现跨容器拖拽。

<DemoBlock title="拖拽排序">

<df-sortable group="tasks" :draggable="'.item'" handle=".drag-handle">
<div class="item" style="padding: 8px; border: 1px solid #dcdfe6; margin-bottom: 4px; cursor: move;">项目一</div>
<div class="item" style="padding: 8px; border: 1px solid #dcdfe6; margin-bottom: 4px; cursor: move;">项目二</div>
<div class="item" style="padding: 8px; border: 1px solid #dcdfe6; margin-bottom: 4px; cursor: move;">项目三</div>
</df-sortable>

<template #code>

```vue
<df-sortable group="tasks">
  <div v-for="item in items" :key="item.id" class="item">
    {{ item.text }}
  </div>
</df-sortable>
```

</template>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| group | 拖拽分组（相同分组可跨容器拖拽） | `string` | — |
| draggable | 可拖拽元素选择器 | `string` | — |
| handle | 拖拽手柄选择器 | `string` | — |
| filter | 过滤不可拖拽元素 | `string` | — |
| direction | 拖拽方向 | `'horizontal' \| 'vertical' \| 'both'` | `'vertical'` |
| allowReordering | 允许重排序 | `boolean` | `true` |
| allowDropInsideItem | 允许放入项内部（树形结构） | `boolean` | `false` |
| dropFeedbackMode | 放置反馈模式 | `'push' \| 'indicate'` | `'push'` |
| itemOrientation | 项排列方向 | `'vertical' \| 'horizontal'` | `'vertical'` |
| scrollSpeed | 自动滚动速度 | `number` | `30` |
| disabled | 禁用 | `boolean` | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| dragStart | 拖拽开始 | `(e: { itemData, fromIndex, fromComponent, cancel })` |
| dragMove | 拖拽移动 | `(e: { event, toIndex })` |
| dragEnd | 拖拽结束 | `(e: { itemData, fromIndex, toIndex, fromComponent, toComponent, cancel })` |
| reorder | 重排序 | `(e: { itemData, fromIndex, toIndex })` |
| add | 从其他容器添加 | `(e: { itemData, fromIndex, toIndex, fromComponent })` |
| remove | 移到其他容器 | `(e: { itemData, fromIndex, toIndex })` |
| change | 顺序变化 | `(e)` |

### Slots

| 插槽名 | 说明 | 作用域 |
|--------|------|---------|
| default | 放置可排序的子元素 | — |

### Methods (via ref)

| 方法名 | 说明 | 参数 |
|--------|------|------|
| getInstance() | 获取 DxSortable 原生实例 | — |

## 引入方式

```typescript
import { DfSortable } from 'df-web-base'
```

全量注册后可直接在模板中使用 `<df-sortable>`。
