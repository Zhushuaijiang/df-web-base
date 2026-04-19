# Tree 树工具函数

树形数据结构的通用操作函数集。支持扁平↔树互转、节点查找、路径追溯、过滤、遍历等。

## buildTree — 扁平列表转树

将扁平数组按 `id/parentId` 关系构建为嵌套树。

```typescript
import { buildTree } from 'df-web-base'

const flatList = [
  { id: 1, name: '内科', parentId: null },
  { id: 2, name: '心内科', parentId: 1 },
  { id: 3, name: '消化内科', parentId: 1 },
  { id: 4, name: '外科', parentId: null },
  { id: 5, name: '骨科', parentId: 4 },
]

const tree = buildTree(flatList)
// [
//   { id: 1, name: '内科', parentId: null, children: [
//     { id: 2, name: '心内科', parentId: 1, children: [] },
//     { id: 3, name: '消化内科', parentId: 1, children: [] },
//   ]},
//   { id: 4, name: '外科', parentId: null, children: [
//     { id: 5, name: '骨科', parentId: 4, children: [] },
//   ]},
// ]
```

自定义字段名：

```typescript
const tree = buildTree(data, {
  idKey: 'code',
  parentKey: 'parentCode',
  childrenKey: 'items',
  rootValue: '0',  // parentCode 为 '0' 视为根节点
})
```

## flattenTree — 树转扁平列表

```typescript
import { flattenTree } from 'df-web-base'

const flat = flattenTree(tree)
// [{ id: 1, name: '内科' }, { id: 2, name: '心内科' }, ...]
```

## findTreeNode — 查找节点

```typescript
import { findTreeNode } from 'df-web-base'

const node = findTreeNode(tree, (n) => n.id === 3)
// { id: 3, name: '消化内科', parentId: 1 }
```

## getTreePath — 获取祖先路径

```typescript
import { getTreePath } from 'df-web-base'

const path = getTreePath(tree, (n) => n.id === 5)
// [{ id: 4, name: '外科' }, { id: 5, name: '骨科' }]
```

## filterTree — 过滤树

保留匹配节点及其所有祖先节点。

```typescript
import { filterTree } from 'df-web-base'

const filtered = filterTree(tree, (n) => n.name.includes('内'))
// [{ id: 1, name: '内科', children: [
//   { id: 2, name: '心内科' },
//   { id: 3, name: '消化内科' },
// ]}]
```

## walkTree — 遍历每个节点

```typescript
import { walkTree } from 'df-web-base'

walkTree(tree, (node, depth, parent) => {
  console.log(`${'  '.repeat(depth)}${node.name}`)
})
// 内科
//   心内科
//   消化内科
// 外科
//   骨科
```

## getLeafNodes — 获取所有叶子节点

```typescript
import { getLeafNodes } from 'df-web-base'

const leaves = getLeafNodes(tree)
// [{ id: 2, name: '心内科' }, { id: 3, name: '消化内科' }, { id: 5, name: '骨科' }]
```

## API

### buildTree

```typescript
function buildTree<T extends Record<string, any>>(
  flatList: readonly T[],
  options?: {
    idKey?: string        // 默认 'id'
    parentKey?: string    // 默认 'parentId'
    childrenKey?: string  // 默认 'children'
    rootValue?: any       // 默认 null（parentId 为 null/undefined 视为根节点）
  }
): (T & { children?: T[] })[]
```

### flattenTree

```typescript
function flattenTree<T extends Record<string, any>>(
  tree: readonly T[],
  childrenKey?: string  // 默认 'children'
): Omit<T, 'children'>[]
```

### findTreeNode

```typescript
function findTreeNode<T extends Record<string, any>>(
  tree: readonly T[],
  predicate: (node: T) => boolean,
  childrenKey?: string  // 默认 'children'
): T | undefined
```

### getTreePath

```typescript
function getTreePath<T extends Record<string, any>>(
  tree: readonly T[],
  predicate: (node: T) => boolean,
  childrenKey?: string  // 默认 'children'
): T[]
```

返回从根到目标节点的路径数组。未找到返回空数组。

### filterTree

```typescript
function filterTree<T extends Record<string, any>>(
  tree: readonly T[],
  predicate: (node: T) => boolean,
  childrenKey?: string  // 默认 'children'
): T[]
```

返回新树，包含所有匹配节点及其祖先。不修改原数据（不可变）。

### walkTree

```typescript
function walkTree<T extends Record<string, any>>(
  tree: readonly T[],
  callback: (node: T, depth: number, parent?: T) => void,
  childrenKey?: string,  // 默认 'children'
  depth?: number,        // 内部递归参数
  parent?: T             // 内部递归参数
): void
```

### getLeafNodes

```typescript
function getLeafNodes<T extends Record<string, any>>(
  tree: readonly T[],
  childrenKey?: string  // 默认 'children'
): T[]
```

返回所有没有子节点（或 children 为空数组）的节点。

## 引入方式

```typescript
import {
  buildTree,
  flattenTree,
  findTreeNode,
  getTreePath,
  filterTree,
  walkTree,
  getLeafNodes,
} from 'df-web-base'
```
