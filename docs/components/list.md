# DfList 列表

基于 DevExtreme DxList 封装的列表组件，支持分组、搜索、选择、虚拟滚动等功能。

> 🔧 基于 **DxList** 封装

## 基础用法

通过 `dataSource` 传入数据数组，`displayExpr` 指定显示字段。

<DemoBlock title="基础列表">

<df-list :data-source="[{ text: '项目一' }, { text: '项目二' }, { text: '项目三' }]" display-expr="text" :height="200"></df-list>

<template #code>

```vue
<df-list
  :data-source="[{ text: '项目一' }, { text: '项目二' }, { text: '项目三' }]"
  display-expr="text"
  :height="200"
/>
```

</template>
</DemoBlock>

## 可选择列表

通过 `selectionMode` 启用选择功能。

<DemoBlock title="单选列表">

<df-list :data-source="[{ text: '选项A' }, { text: '选项B' }, { text: '选项C' }]" display-expr="text" selection-mode="single" :height="200"></df-list>

<template #code>

```vue
<df-list
  :data-source="items"
  display-expr="text"
  selection-mode="single"
  :height="200"
/>
```

</template>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| dataSource | 数据源 | `any[] \| DataSource` | **必填** |
| displayExpr | 显示字段名 | `string \| function` | `'text'` |
| keyExpr | 主键字段名 | `string` | `'id'` |
| selectionMode | 选择模式 | `'none' \| 'single' \| 'multiple' \| 'all'` | `'none'` |
| selectedItems | 已选中的项 | `any[]` | — |
| searchEnabled | 启用搜索 | `boolean` | `false` |
| searchExpr | 搜索字段 | `string \| string[]` | — |
| searchMode | 搜索模式 | `'contains' \| 'startswith' \| 'equals'` | `'contains'` |
| grouped | 是否分组 | `boolean` | `false` |
| groupTemplate | 分组模板 | `string \| function` | — |
| pageLoadMode | 分页加载模式 | `'nextButton' \| 'scrollBottom' \| 'infinite'` | — |
| itemDragging | 拖拽配置 | `object` | — |
| height | 高度 | `number \| string` | — |
| width | 宽度 | `number \| string` | `'100%'` |
| disabled | 禁用 | `boolean` | `false` |
| noDataText | 空数据提示 | `string` | `'暂无数据'` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| onItemClick | 列表项点击 | `(e: { itemData, itemIndex })` |
| onSelectionChanged | 选中项变化 | `(e: { addedItems, removedItems })` |
| onItemContextMenu | 右键菜单 | `(e)` |
| onContentReady | 内容就绪 | `(e)` |

### Slots

| 插槽名 | 说明 | 作用域 |
|--------|------|---------|
| default | 自定义列表项 | `{ data, index }` |
| group | 自定义分组标题 | `{ data, key }` |

### Methods (via ref)

| 方法名 | 说明 | 参数 |
|--------|------|------|
| getInstance() | 获取 DxList 原生实例 | — |
| getSelectedItems() | 获取选中项 | — |

## 引入方式

```typescript
import { DfList } from 'df-web-base'
```

全量注册后可直接在模板中使用 `<df-list>`。
