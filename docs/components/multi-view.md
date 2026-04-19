# DfMultiView 多视图

基于 DevExtreme DxMultiView 封装的多视图切换组件，用于在多个面板间滑动切换。

> 🔧 基于 **DxMultiView** 封装

## 基础用法

通过 `dataSource` 传入面板数据，`selectedIndex` 控制当前面板。

<DemoBlock title="基础多视图">

<df-multi-view :data-source="[{ text: '面板一内容' }, { text: '面板二内容' }, { text: '面板三内容' }]" :selected-index="0" :height="120" :loop="true" :animation-enabled="true"></df-multi-view>

<template #code>

```vue
<df-multi-view
  :data-source="panels"
  :selected-index="0"
  :height="120"
  :loop="true"
  :animation-enabled="true"
/>
```

</template>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| dataSource | 面板数据源 | `any[]` | **必填** |
| selectedIndex | 当前面板索引 | `number` | `0` |
| loop | 循环切换 | `boolean` | `false` |
| animationEnabled | 启用切换动画 | `boolean` | `true` |
| swipeEnabled | 启用滑动切换 | `boolean` | `true` |
| deferRendering | 延迟渲染（首次显示时才渲染） | `boolean` | `true` |
| itemTitleExpr | 标题字段名 | `string` | `'title'` |
| disabled | 禁用 | `boolean` | `false` |
| width | 宽度 | `number \| string` | `'100%'` |
| height | 高度 | `number \| string` | — |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:selectedIndex | 面板切换 | `(index: number)` |
| selectionChanged | 选中面板变化 | `(e: { selectedIndex, previousIndex })` |
| itemClick | 面板点击 | `(e: { itemData, itemIndex })` |
| contentReady | 内容就绪 | `(e)` |

### Slots

| 插槽名 | 说明 | 作用域 |
|--------|------|---------|
| default | 自定义面板内容 | `{ data, index }` |

### Methods (via ref)

| 方法名 | 说明 | 参数 |
|--------|------|------|
| getInstance() | 获取 DxMultiView 原生实例 | — |

## 引入方式

```typescript
import { DfMultiView } from 'df-web-base'
```

全量注册后可直接在模板中使用 `<df-multi-view>`。
