# DfTreeTable 树表格

基于 DevExtreme DxTreeList 封装的树形表格组件，支持父子级数据展示。

> 🔧 基于 **DxTreeList** 封装

## 基础用法

通过 `columns` 传入列配置，`data-source` 传入树形数据，`default-expand-all` 默认展开所有节点。

<DemoBlock title="基础树表格">
<df-tree-table :columns="[{ field: 'name', title: '名称' }, { field: 'code', title: '编码', width: 120 }]" :data-source="[{ id: 1, parentId: 0, name: '总院', code: '001' }, { id: 2, parentId: 1, name: '内科', code: '001-01' }, { id: 3, parentId: 1, name: '外科', code: '001-02' }, { id: 4, parentId: 2, name: '心内科', code: '001-01-01' }]" default-expand-all style="height: 220px"></df-tree-table>
<template #code>

```vue
<df-tree-table
  :columns="[
    { field: 'name', title: '名称' },
    { field: 'code', title: '编码', width: 120 },
  ]"
  :data-source="[
    { id: 1, parentId: 0, name: '总院', code: '001' },
    { id: 2, parentId: 1, name: '内科', code: '001-01' },
    { id: 3, parentId: 1, name: '外科', code: '001-02' },
    { id: 4, parentId: 2, name: '心内科', code: '001-01-01' },
  ]"
  default-expand-all
  style="height: 220px"
/>
```

</template>
</DemoBlock>

## 带复选框

设置 `show-checkbox` 显示复选框，支持勾选行。

<DemoBlock title="带复选框">
<df-tree-table :columns="[{ field: 'name', title: '名称' }, { field: 'code', title: '编码', width: 120 }]" :data-source="[{ id: 1, parentId: 0, name: '总院', code: '001' }, { id: 2, parentId: 1, name: '内科', code: '001-01' }, { id: 3, parentId: 1, name: '外科', code: '001-02' }]" default-expand-all show-checkbox style="height: 200px"></df-tree-table>
<template #code>

```vue
<df-tree-table
  :columns="[
    { field: 'name', title: '名称' },
    { field: 'code', title: '编码', width: 120 },
  ]"
  :data-source="[
    { id: 1, parentId: 0, name: '总院', code: '001' },
    { id: 2, parentId: 1, name: '内科', code: '001-01' },
    { id: 3, parentId: 1, name: '外科', code: '001-02' },
  ]"
  default-expand-all
  show-checkbox
  style="height: 200px"
/>
```

</template>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| columns | 列配置 | `TreeTableColumn[]` | [] |
| dataSource | 数据源 | `any[]` | [] |
| rowKey | 行唯一键 | `string` | 'id' |
| parentIdExpr | 父级 ID 字段 | `string` | 'parentId' |
| rootValue | 根节点值 | `any` | 0 |
| defaultExpandAll | 默认全部展开 | `boolean` | false |
| expandedRowKeys | 默认展开的行 | `Array<string \| number>` | — |
| showCheckbox | 显示复选框 | `boolean` | false |
| checkStrictly | 父子不关联 | `boolean` | false |
| selectionMode | 选择模式 | `'single' \| 'multiple'` | 'multiple' |
| filterable | 可过滤 | `boolean` | false |
| sortable | 可排序 | `boolean` | true |
| border | 显示边框 | `boolean` | true |
| height | 高度 | `string \| number` | — |
| emptyText | 空数据提示 | `string` | '暂无数据' |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| row-click | 行点击 | `(row, e)` |
| selection-change | 选择变化 | `(rows)` |
| expand | 行展开 | `(row)` |
| collapse | 行折叠 | `(row)` |

### Slots

| 插槽名 | 说明 |
|--------|------|
| [column.slot] | 列模板插槽 |
| toolbar | 工具栏 |

## 引入方式

```typescript
import { DfTreeTable } from 'df-web-base'
```

全量注册后可直接在模板中使用 `<df-tree-table>`。
