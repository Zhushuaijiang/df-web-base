# DfTileView 磁贴视图

基于 DevExtreme DxTileView 封装的磁贴布局组件，以网格形式排列内容块。

> 🔧 基于 **DxTileView** 封装

## 基础用法

通过 `dataSource` 传入数据，`baseItemWidth` 和 `baseItemHeight` 设置磁贴基础尺寸。

<DemoBlock title="基础用法">

<df-tile-view :data-source="[{ text: '磁贴1', widthRatio: 1 }, { text: '磁贴2', widthRatio: 2 }, { text: '磁贴3', widthRatio: 1 }]" :base-item-width="120" :base-item-height="120"></df-tile-view>

<template #code>

```vue
<df-tile-view
  :data-source="tiles"
  :base-item-width="120"
  :base-item-height="120"
/>
```

</template>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| dataSource | 数据源 | `any[]` | **必填** |
| baseItemWidth | 磁贴基础宽度 | `number` | `100` |
| baseItemHeight | 磁贴基础高度 | `number` | `100` |
| itemMargin | 磁贴间距 | `number` | `4` |
| direction | 布局方向 | `'horizontal' \| 'vertical'` | `'horizontal'` |
| showScrollbar | 显示滚动条 | `boolean` | `true` |
| width | 组件宽度 | `number \| string` | `'100%'` |
| height | 组件高度 | `number \| string` | — |
| disabled | 禁用 | `boolean` | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| itemClick | 磁贴点击 | `(e: { itemData, itemIndex })` |
| contentReady | 内容就绪 | `(e)` |

### Slots

| 插槽名 | 说明 | 作用域 |
|--------|------|---------|
| default | 自定义磁贴内容 | `{ data, index }` |

### Methods (via ref)

| 方法名 | 说明 | 参数 |
|--------|------|------|
| getInstance() | 获取 DxTileView 原生实例 | — |

## 引入方式

```typescript
import { DfTileView } from 'df-web-base'
```

全量注册后可直接在模板中使用 `<df-tile-view>`。
