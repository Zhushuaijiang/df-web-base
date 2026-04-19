# DfTreeMap 树图

基于 DevExtreme DxTreeMap 封装的树图组件，以嵌套矩形展示层级数据的占比关系。

> 🔧 基于 **DxTreeMap** 封装

## 基础用法

通过 `dataSource` 传入层级结构数据。

<DemoBlock title="基础树图">

<df-tree-map :data-source="[{ name: '门诊', items: [{ name: '内科', value: 1200 }, { name: '外科', value: 800 }] }, { name: '住院', items: [{ name: '骨科', value: 500 }, { name: '心内科', value: 650 }] }]" :height="300" title="科室分布"></df-tree-map>

<template #code>

```vue
<df-tree-map
  :data-source="treeData"
  :height="300"
  title="科室分布"
/>
```

</template>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| dataSource | 层级数据源 | `any[]` | **必填** |
| valueField | 值字段名 | `string` | `'value'` |
| labelField | 标签字段名 | `string` | `'name'` |
| childrenField | 子节点字段名 | `string` | `'items'` |
| colorField | 颜色字段名 | `string` | — |
| palette | 调色板 | `string \| string[]` | `'Material'` |
| layoutAlgorithm | 布局算法 | `'sliceAndDice' \| 'squarified' \| 'strip' \| 'custom'` | `'squarified'` |
| title | 标题 | `string` | — |
| tooltipEnabled | 启用提示框 | `boolean` | `true` |
| interactWithParent | 允许交互父节点 | `boolean` | `true` |
| maxDepth | 最大显示层级 | `number` | — |
| width | 宽度 | `number \| string` | `'100%'` |
| height | 高度 | `number \| string` | — |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| nodeClick | 节点点击 | `(e: { node })` |
| drill | 下钻/上卷 | `(e: { node })` |
| tooltipHidden | 提示框隐藏 | `(e)` |
| tooltipShown | 提示框显示 | `(e)` |

### Slots

| 插槽名 | 说明 | 作用域 |
|--------|------|---------|
| — | — | — |

### Methods (via ref)

| 方法名 | 说明 | 参数 |
|--------|------|------|
| getInstance() | 获取 DxTreeMap 原生实例 | — |
| refresh() | 刷新图表 | — |

## 引入方式

```typescript
import { DfTreeMap } from 'df-web-base'
```

全量注册后可直接在模板中使用 `<df-tree-map>`。
