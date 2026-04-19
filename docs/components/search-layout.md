# DfSearchLayout 搜索列表布局

搜索 + 列表的标准页面布局。顶部可折叠搜索栏 + 工具栏 + 内容区（表格），覆盖 HIS 系统 80% 的查询页面。

## 基础用法

<DemoBlock title="基础搜索列表">
<df-search-layout style="height:320px; border:1px solid #ebeef5; border-radius:4px;">
<template #search>
<div style="display:flex; gap:16px; flex-wrap:wrap;">
<div style="display:flex; align-items:center; gap:6px;"><span style="font-size:13px; color:#606266; white-space:nowrap;">科室名称</span><input style="height:30px; border:1px solid #dcdfe6; border-radius:4px; padding:0 8px; font-size:13px; width:160px;" placeholder="请输入" /></div>
<div style="display:flex; align-items:center; gap:6px;"><span style="font-size:13px; color:#606266; white-space:nowrap;">状态</span><select style="height:30px; border:1px solid #dcdfe6; border-radius:4px; padding:0 8px; font-size:13px; width:120px;"><option>全部</option><option>启用</option><option>停用</option></select></div>
</div>
</template>
<template #default>
<div style="padding:0 16px;">
<table style="width:100%; border-collapse:collapse; font-size:13px;">
<thead><tr style="background:#fafafa; height:36px;"><th style="border:1px solid #ebeef5; padding:0 12px; text-align:left; font-weight:500;">编码</th><th style="border:1px solid #ebeef5; padding:0 12px; text-align:left; font-weight:500;">名称</th><th style="border:1px solid #ebeef5; padding:0 12px; text-align:left; font-weight:500;">状态</th></tr></thead>
<tbody><tr style="height:34px;"><td style="border:1px solid #ebeef5; padding:0 12px;">KS001</td><td style="border:1px solid #ebeef5; padding:0 12px;">内科</td><td style="border:1px solid #ebeef5; padding:0 12px;">启用</td></tr><tr style="height:34px; background:#fafafa;"><td style="border:1px solid #ebeef5; padding:0 12px;">KS002</td><td style="border:1px solid #ebeef5; padding:0 12px;">外科</td><td style="border:1px solid #ebeef5; padding:0 12px;">启用</td></tr><tr style="height:34px;"><td style="border:1px solid #ebeef5; padding:0 12px;">KS003</td><td style="border:1px solid #ebeef5; padding:0 12px;">儿科</td><td style="border:1px solid #ebeef5; padding:0 12px;">停用</td></tr></tbody>
</table>
</div>
</template>
</df-search-layout>
<template #code>

```vue
<df-search-layout @search="onSearch" @reset="onReset">
  <template #search>
    <DfForm :fields="searchFields" v-model="searchParams" :show-actions="false" />
  </template>
  <template #default>
    <DfTable :columns="columns" :fetch="fetchData" ref="tableRef" />
  </template>
</df-search-layout>
```

</template>
</DemoBlock>

## 可折叠搜索栏

点击「收起/展开」可折叠搜索区域，节省屏幕空间。

<DemoBlock title="可折叠">
<df-search-layout :collapsible="true" search-text="搜索" reset-text="清空" style="height:280px; border:1px solid #ebeef5; border-radius:4px;">
<template #search>
<div style="display:flex; gap:16px; flex-wrap:wrap;">
<div style="display:flex; align-items:center; gap:6px;"><span style="font-size:13px; color:#606266;">姓名</span><input style="height:30px; border:1px solid #dcdfe6; border-radius:4px; padding:0 8px; width:140px;" placeholder="请输入" /></div>
<div style="display:flex; align-items:center; gap:6px;"><span style="font-size:13px; color:#606266;">日期</span><input type="date" style="height:30px; border:1px solid #dcdfe6; border-radius:4px; padding:0 8px; width:140px;" /></div>
</div>
</template>
<template #default>
<div style="display:flex; align-items:center; justify-content:center; height:100%; color:#909399; font-size:13px;">表格内容区域</div>
</template>
</df-search-layout>
<template #code>

```vue
<df-search-layout
  :collapsible="true"
  search-text="搜索"
  reset-text="清空"
>
  <template #search>
    <!-- 搜索表单 -->
  </template>
  <template #default>
    <!-- 表格 -->
  </template>
</df-search-layout>
```

</template>
</DemoBlock>

## 默认折叠

搜索栏默认折叠，展开后显示搜索条件。

<DemoBlock title="默认折叠">
<df-search-layout :collapsible="true" :default-collapsed="true" style="height:200px; border:1px solid #ebeef5; border-radius:4px;">
<template #search>
<div style="display:flex; gap:16px;">
<div style="display:flex; align-items:center; gap:6px;"><span style="font-size:13px; color:#606266;">关键字</span><input style="height:30px; border:1px solid #dcdfe6; border-radius:4px; padding:0 8px; width:200px;" placeholder="请输入关键字" /></div>
</div>
</template>
<template #default>
<div style="display:flex; align-items:center; justify-content:center; height:100%; color:#909399; font-size:13px;">表格内容区域</div>
</template>
</df-search-layout>
<template #code>

```vue
<df-search-layout :collapsible="true" :default-collapsed="true">
  <template #search>
    <!-- 搜索表单 -->
  </template>
  <template #default>
    <!-- 表格 -->
  </template>
</df-search-layout>
```

</template>
</DemoBlock>

## 带工具栏

在搜索栏和内容区之间插入工具栏，放置新增、导出等操作按钮。

<DemoBlock title="带工具栏">
<df-search-layout style="height:320px; border:1px solid #ebeef5; border-radius:4px;">
<template #search>
<div style="display:flex; gap:16px; flex-wrap:wrap;">
<div style="display:flex; align-items:center; gap:6px;"><span style="font-size:13px; color:#606266;">名称</span><input style="height:30px; border:1px solid #dcdfe6; border-radius:4px; padding:0 8px; width:160px;" placeholder="请输入" /></div>
</div>
</template>
<template #toolbar>
<div style="display:flex; gap:8px;">
<button style="height:30px; padding:0 14px; background:#1890ff; color:#fff; border:none; border-radius:4px; font-size:13px; cursor:pointer;">＋ 新增</button>
<button style="height:30px; padding:0 14px; background:#fff; color:#606266; border:1px solid #dcdfe6; border-radius:4px; font-size:13px; cursor:pointer;">导出</button>
</div>
</template>
<template #default>
<div style="display:flex; align-items:center; justify-content:center; height:100%; color:#909399; font-size:13px;">表格内容区域</div>
</template>
</df-search-layout>
<template #code>

```vue
<df-search-layout @search="onSearch">
  <template #search>
    <DfForm :fields="fields" v-model="params" :show-actions="false" />
  </template>
  <template #toolbar>
    <DfButton type="primary" @click="onCreate">＋ 新增</DfButton>
    <DfButton @click="onExport">导出</DfButton>
  </template>
  <template #default>
    <DfTable :columns="columns" :static-data="tableData" />
  </template>
</df-search-layout>
```

</template>
</DemoBlock>

## 加载状态

设置 `loading` 会禁用搜索/重置按钮并显示加载指示器。

<DemoBlock title="加载中">
<df-search-layout :loading="true" style="height:200px; border:1px solid #ebeef5; border-radius:4px;">
<template #search>
<div style="display:flex; gap:16px;">
<div style="display:flex; align-items:center; gap:6px;"><span style="font-size:13px; color:#606266;">名称</span><input style="height:30px; border:1px solid #dcdfe6; border-radius:4px; padding:0 8px; width:160px;" placeholder="请输入" /></div>
</div>
</template>
<template #default>
<div style="display:flex; align-items:center; justify-content:center; height:100%; color:#909399; font-size:13px;">加载中...</div>
</template>
</df-search-layout>
<template #code>

```vue
<df-search-layout :loading="true">
  <template #search>
    <!-- 搜索表单 -->
  </template>
  <template #default>
    <!-- 表格 -->
  </template>
</df-search-layout>
```

</template>
</DemoBlock>

## API

### Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `collapsible` | `boolean` | `true` | 搜索栏是否可折叠 |
| `defaultCollapsed` | `boolean` | `false` | 搜索栏初始折叠状态 |
| `searchText` | `string` | `'查询'` | 搜索按钮文本 |
| `resetText` | `string` | `'重置'` | 重置按钮文本 |
| `loading` | `boolean` | `false` | 搜索中加载状态，禁用按钮并显示 spinner |

### Events

| 事件 | 回调参数 | 说明 |
|------|---------|------|
| `search` | — | 点击搜索按钮时触发 |
| `reset` | — | 点击重置按钮时触发 |

### Slots

| 插槽 | 作用域参数 | 说明 |
|------|-----------|------|
| `search` | — | 搜索栏内容区域，放置 DfForm 等搜索表单 |
| `searchActions` | `{ collapsed: boolean, loading: boolean }` | 自定义搜索按钮区。不使用时显示默认的查询/重置按钮 |
| `toolbar` | — | 表格上方工具栏，放置新增、导出等操作按钮。不提供时不渲染该区域 |
| `default` | — | 主内容区域，放置 DfTable 等数据展示组件 |

### Expose

| 方法/属性 | 类型 | 说明 |
|----------|------|------|
| `isCollapsed` | `Ref<boolean>` | 当前折叠状态 |
| `expand()` | `() => void` | 展开搜索栏 |
| `collapse()` | `() => void` | 折叠搜索栏 |

### TypeScript 类型

```typescript
import type { DfSearchLayoutProps } from 'df-web-base'

interface DfSearchLayoutProps {
  collapsible?: boolean
  defaultCollapsed?: boolean
  searchText?: string
  resetText?: string
  loading?: boolean
}
```

### 布局结构

```
┌──────────────────────────────────────────┐
│ Search Area (可折叠)                      │
│  #search slot                            │
│  ┌──────────────────────────────────┐    │
│  │ #searchActions / 默认查询·重置按钮 │    │
│  └──────────────────────────────────┘    │
├──────────────────────────────────────────┤
│ #toolbar slot (可选)                      │
├──────────────────────────────────────────┤
│ #default slot (主内容，flex:1)            │
└──────────────────────────────────────────┘
```

---

## 导入

```typescript
import { DfSearchLayout } from 'df-web-base'
import type { DfSearchLayoutProps } from 'df-web-base'
```
