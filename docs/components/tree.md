# DfTree 树形控件

基于 DevExtreme DxTreeView 封装的树形组件，支持懒加载、虚拟滚动、搜索过滤。

> 🔧 基于 **DxTreeView** 封装

## 基础用法

<DemoBlock title="基础树形控件">

<df-tree :data="[{ id: 1, text: '一级 1', children: [{ id: 11, text: '二级 1-1' }, { id: 12, text: '二级 1-2' }] }, { id: 2, text: '一级 2', children: [{ id: 21, text: '二级 2-1' }] }]" default-expand-all></df-tree>

<template #code>

```vue
<df-tree
  :data="treeData"
  default-expand-all
></df-tree>
```

</template>
</DemoBlock>

## 带复选框

<DemoBlock title="可勾选的树">

<df-tree :data="[{ id: 1, text: '部门 A', children: [{ id: 11, text: '研发组' }, { id: 12, text: '测试组' }] }, { id: 2, text: '部门 B', children: [{ id: 21, text: '产品组' }] }]" default-expand-all show-checkbox></df-tree>

<template #code>

```vue
<df-tree
  :data="treeData"
  default-expand-all
  show-checkbox
></df-tree>
```

</template>
</DemoBlock>

## 可搜索

<DemoBlock title="搜索过滤">

<df-tree :data="[{ id: 1, text: '浙江省', children: [{ id: 11, text: '杭州市' }, { id: 12, text: '宁波市' }] }, { id: 2, text: '江苏省', children: [{ id: 21, text: '南京市' }, { id: 22, text: '苏州市' }] }]" default-expand-all filterable></df-tree>

<template #code>

```vue
<df-tree
  :data="treeData"
  default-expand-all
  filterable
></df-tree>
```

</template>
</DemoBlock>

## 高亮当前节点

<DemoBlock title="高亮选中">

<df-tree :data="[{ id: 1, text: '菜单 1', children: [{ id: 11, text: '子菜单 1-1' }] }, { id: 2, text: '菜单 2' }]" default-expand-all highlight-current></df-tree>

<template #code>

```vue
<df-tree
  :data="treeData"
  default-expand-all
  highlight-current
></df-tree>
```

</template>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| data | 树数据 | `any[]` | `[]` |
| nodeKey | 节点唯一键字段名 | `string` | `'id'` |
| displayExpr | 节点显示文本字段名 | `string` | `'text'` |
| parentIdExpr | 父级 ID 字段名（plain 模式使用） | `string` | `'parentId'` |
| childrenExpr | 子节点字段名（tree 模式使用） | `string` | `'children'` |
| dataStructure | 数据结构类型：`'tree'` 嵌套结构 / `'plain'` 扁平结构 | `'tree' \| 'plain'` | `'tree'` |
| showCheckbox | 是否显示复选框 | `boolean` | `false` |
| checkStrictly | 父子节点不关联选中 | `boolean` | `false` |
| defaultExpandAll | 是否默认展开全部节点 | `boolean` | `false` |
| defaultExpandedKeys | 默认展开的节点 key 数组 | `(string \| number)[]` | — |
| defaultCheckedKeys | 默认勾选的节点 key 数组 | `(string \| number)[]` | — |
| highlightCurrent | 是否高亮当前选中节点 | `boolean` | `false` |
| accordion | 手风琴模式（同级只展开一个） | `boolean` | `false` |
| filterable | 是否启用搜索过滤 | `boolean` | `false` |
| filterExpr | 搜索匹配的字段名 | `string \| string[]` | `'text'` |
| emptyText | 数据为空时的提示文本 | `string` | `'暂无数据'` |
| lazy | 是否启用懒加载模式 | `boolean` | `false` |
| load | 懒加载回调函数 | `(node: TreeNode, resolve: (data: any[]) => void) => void` | — |
| draggable | 是否可拖拽节点 | `boolean` | `false` |
| virtualMode | 是否启用虚拟滚动（大数据量优化） | `boolean` | `false` |

### TypeScript 类型定义

```typescript
import type { DfTreeProps, DfTreeInstance } from 'df-web-base'

/** 树节点对象 */
interface TreeNode {
  [nodeKey: string]: string | number
  [displayExpr: string]: string
  [childrenExpr: string]?: TreeNode[]
  disabled?: boolean
}

/** 懒加载回调签名 */
type LoadFunction = (node: TreeNode, resolve: (children: any[]) => void) => void
```

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| node-click | 节点被点击时触发 | `(data: any, node: TreeNode, e: MouseEvent)` |
| check-change | 勾选状态变化时触发 | `(data: any, checked: boolean)` |
| node-expand | 节点展开时触发 | `(data: any)` |
| node-collapse | 节点折叠时触发 | `(data: any)` |
| current-change | 当前选中节点变化时触发 | `(data: any)` |

### Slots

| 插槽名 | 说明 | 作用域参数 |
|--------|------|-----------|
| default | 自定义节点内容 | `{ data: any, node: TreeNode }` |

### Methods / Expose

通过模板 ref 调用：

```typescript
const treeRef = ref<DfTreeInstance>()
treeRef.value?.filter('搜索词')
```

| 方法名 | 说明 | 参数 | 返回值 |
|--------|------|------|--------|
| filter | 过滤树节点 | `(value: string)` | `void` |
| getCheckedNodes | 获取所有勾选节点数据 | `()` | `any[]` |
| getCheckedKeys | 获取所有勾选节点 key | `()` | `(string \| number)[]` |
| setCheckedKeys | 设置勾选节点 | `(keys: (string \| number)[])` | `void` |
| expandNode | 展开指定节点 | `(key: string \| number)` | `void` |
| collapseNode | 折叠指定节点 | `(key: string \| number)` | `void` |
| treeRef | 底层 DxTreeView 实例引用 | — | `DxTreeView` |

### 与 DevExtreme DxTreeView 的差异

| 特性 | DfTree | DxTreeView |
|------|--------|------------|
| 数据绑定 | `data` + `displayExpr` | `dataSource` + `displayExpr` |
| 选中模型 | `defaultCheckedKeys` / `getCheckedKeys()` | `selectedKeys` + `selectionMode` |
| 搜索过滤 | `filterable` + `filterExpr` | `searchEnabled` + `searchExpr` |
| 事件命名 | `node-click` / `check-change` | `onItemClick` / `onSelectionChanged` |
| 虚拟滚动 | `virtualMode` | `virtualModeEnabled` |
| 父子关联 | `checkStrictly` (反义) | `selectNodesRecursive` |

## 引入方式

```typescript
import { DfTree } from 'df-web-base'
import type { DfTreeProps, DfTreeInstance } from 'df-web-base'
```

全量注册后可直接在模板中使用 `<df-tree>`。
