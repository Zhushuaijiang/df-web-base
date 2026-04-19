# DfTreeSelect 树选择

基于 DevExtreme DxDropDownBox + DxTreeView 封装的树形下拉选择组件，支持单选、多选、搜索。

> 🔧 基于 **DxDropDownBox + DxTreeView** 封装

## 基础用法

<DemoBlock title="单选模式">

<df-tree-select placeholder="请选择部门" :data="[{ id: 1, text: '技术部', children: [{ id: 11, text: '前端组' }, { id: 12, text: '后端组' }] }, { id: 2, text: '产品部', children: [{ id: 21, text: '设计组' }] }]"></df-tree-select>

<template #code>

```vue
<df-tree-select
  v-model="value"
  :data="treeData"
  placeholder="请选择部门"
></df-tree-select>
```

</template>
</DemoBlock>

## 多选模式

<DemoBlock title="多选">

<df-tree-select multiple placeholder="请选择（多选）" :data="[{ id: 1, text: '技术部', children: [{ id: 11, text: '前端组' }, { id: 12, text: '后端组' }] }, { id: 2, text: '产品部' }]"></df-tree-select>

<template #code>

```vue
<df-tree-select
  v-model="value"
  :data="treeData"
  multiple
  placeholder="请选择（多选）"
></df-tree-select>
```

</template>
</DemoBlock>

## 可搜索

<DemoBlock title="搜索过滤">

<df-tree-select filterable placeholder="输入关键字搜索" :data="[{ id: 1, text: '浙江省', children: [{ id: 11, text: '杭州市' }, { id: 12, text: '宁波市' }] }, { id: 2, text: '江苏省', children: [{ id: 21, text: '南京市' }, { id: 22, text: '苏州市' }] }]"></df-tree-select>

<template #code>

```vue
<df-tree-select
  v-model="value"
  :data="treeData"
  filterable
  placeholder="输入关键字搜索"
></df-tree-select>
```

</template>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| modelValue / v-model | 绑定值 | `string \| number \| Array<string \| number> \| null` | — |
| data | 树数据 | `any[]` | [] |
| valueExpr | 值字段 | `string` | 'id' |
| displayExpr | 显示字段 | `string` | 'text' |
| parentIdExpr | 父级 ID 字段 | `string` | 'parentId' |
| dataStructure | 数据结构 | `'tree' \| 'plain'` | 'tree' |
| multiple | 多选 | `boolean` | false |
| checkStrictly | 父子不关联 | `boolean` | false |
| placeholder | 占位文字 | `string` | '请选择' |
| disabled | 禁用 | `boolean` | false |
| readonly | 只读 | `boolean` | false |
| clearable | 可清空 | `boolean` | true |
| filterable | 可搜索 | `boolean` | false |
| collapseTags | 折叠标签 | `boolean` | false |
| size | 尺寸 | `'large' \| 'default' \| 'small'` | 'default' |
| width | 宽度 | `string \| number` | — |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:modelValue | 值改变 | `(value)` |
| change | 选择变化 | `(value)` |

## 引入方式

```typescript
import { DfTreeSelect } from 'df-web-base'
```

全量注册后可直接在模板中使用 `<df-tree-select>`。
