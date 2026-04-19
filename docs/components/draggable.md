# DfDraggable 拖拽容器

基于 DevExtreme DxDraggable 封装的拖拽容器组件，支持拖拽排序和跨容器拖拽。

> 🔧 基于 **DxDraggable** 封装

## 基础用法

将内容包裹在 `DfDraggable` 中即可启用拖拽。

<DemoBlock title="基础拖拽">

<df-draggable group="items" :data="{ id: 1, text: '可拖拽项' }">
<div style="padding: 12px; background: #e6f7ff; border: 1px solid #91d5ff; border-radius: 4px; cursor: move;">拖拽我</div>
</df-draggable>

<template #code>

```vue
<df-draggable group="items" :data="{ id: 1, text: '可拖拽项' }">
  <div style="padding: 12px; cursor: move;">拖拽我</div>
</df-draggable>
```

</template>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| group | 拖拽分组（相同分组可互相拖拽） | `string` | — |
| data | 拖拽数据 | `any` | — |
| clone | 是否克隆拖拽（原元素不动） | `boolean` | `false` |
| dragDirection | 拖拽方向 | `'both' \| 'horizontal' \| 'vertical'` | `'both'` |
| handle | 拖拽手柄选择器 | `string` | — |
| boundingBox | 限制拖拽范围 | `string \| Element` | — |
| allowDropByClick | 点击放置 | `boolean` | `false` |
| disabled | 禁用 | `boolean` | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| dragStart | 拖拽开始 | `(e: { itemData, event, fromComponent })` |
| dragMove | 拖拽移动 | `(e: { event, offset })` |
| dragEnd | 拖拽结束 | `(e: { itemData, event, toComponent, fromComponent, fromIndex, toIndex, cancel })` |
| drop | 放置 | `(e: { itemData, event })` |

### Slots

| 插槽名 | 说明 | 作用域 |
|--------|------|---------|
| default | 放置可拖拽的内容 | — |

### Methods (via ref)

| 方法名 | 说明 | 参数 |
|--------|------|------|
| getInstance() | 获取 DxDraggable 原生实例 | — |

## 引入方式

```typescript
import { DfDraggable } from 'df-web-base'
```

全量注册后可直接在模板中使用 `<df-draggable>`。
