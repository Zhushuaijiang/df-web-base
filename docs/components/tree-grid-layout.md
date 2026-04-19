# DfTreeGridLayout 左树右表布局

左侧分类树/列表 + 右侧数据表格，中间可拖拽分隔条。HIS 高频布局，适用于标准字典、检查目录、检查项目、药品字典等分类+列表场景。

## 基础用法

<DemoBlock title="标准左树右表">
<div class="demo-frame demo-frame--h360">
<df-tree-grid-layout title="字典分类" :tree-ratio="0.28" style="height:100%;">
<template #tree>
<div class="demo-list">
<div class="demo-list-item demo-list-item--active">身份证件类别</div>
<div class="demo-list-item">出生地点类别</div>
<div class="demo-list-item">婚姻状况代码</div>
<div class="demo-list-item">民族代码</div>
<div class="demo-list-item">职业代码</div>
</div>
</template>
<template #gridToolbar>
<div class="demo-toolbar">
<input type="text" placeholder="标准名称和标准代码" />
<button>新增</button>
</div>
</template>
<template #default>
<table class="demo-tbl">
<thead><tr><th>标准代码</th><th>标准名称</th><th>操作</th></tr></thead>
<tbody>
<tr><td>01</td><td>居民身份证</td><td class="demo-text--primary">编辑</td></tr>
<tr><td>02</td><td>居民户口簿</td><td class="demo-text--primary">编辑</td></tr>
<tr><td>03</td><td>护照</td><td class="demo-text--primary">编辑</td></tr>
</tbody>
</table>
</template>
<template #pagination>
<span class="demo-text--muted">共 1 页 16 条数据</span>
</template>
</df-tree-grid-layout>
</div>
<template #code>

```vue
<DfTreeGridLayout title="字典分类" :tree-ratio="0.28">
  <template #tree>
    <DfTree :data="treeData" @selection-changed="onTreeSelect" />
  </template>
  <template #gridToolbar>
    <DfInput v-model="keyword" placeholder="标准名称和标准代码" />
    <DfButton type="primary" @click="onCreate">新增</DfButton>
  </template>
  <template #default>
    <DfTable :columns="columns" :data-source="gridData" />
  </template>
  <template #pagination>
    <DfPagination :total="total" v-model:page="page" />
  </template>
</DfTreeGridLayout>
```

</template>
</DemoBlock>

## 自定义树面板工具栏

左侧树顶部可添加搜索和操作按钮，适合分类项较多的场景。

<DemoBlock title="带树搜索">
<div class="demo-frame demo-frame--h300">
<df-tree-grid-layout title="检查项目" :tree-ratio="0.3" style="height:100%;">
<template #treeToolbar>
<div class="demo-toolbar">
<input type="text" placeholder="搜索分类..." style="width:100%;" />
</div>
</template>
<template #tree>
<div class="demo-list">
<div class="demo-list-item">体检费</div>
<div class="demo-list-item">X射线检查</div>
<div class="demo-list-item">超声检查</div>
</div>
</template>
<template #default>
<div class="demo-empty">选择左侧分类查看项目列表</div>
</template>
</df-tree-grid-layout>
</div>
<template #code>

```vue
<DfTreeGridLayout title="检查项目" :tree-ratio="0.3">
  <template #treeToolbar>
    <DfInput v-model="treeKeyword" placeholder="搜索分类..." />
  </template>
  <template #tree>
    <DfTree :data="treeData" :search-value="treeKeyword" />
  </template>
  <template #default>
    <DfTable :columns="columns" :data-source="gridData" />
  </template>
</DfTreeGridLayout>
```

</template>
</DemoBlock>

## 药品字典

左侧按药理分类浏览药品，右侧展示药品列表。通过 `treeMin` / `treeMax` 控制拖拽范围。

<DemoBlock title="药品字典管理">
<div class="demo-frame demo-frame--h400">
<df-tree-grid-layout title="药理分类" :tree-ratio="0.25" :tree-min="0.2" :tree-max="0.4" style="height:100%;">
<template #treeToolbar>
<div class="demo-toolbar">
<input type="text" placeholder="搜索分类..." style="width:100%;" />
</div>
</template>
<template #tree>
<div class="demo-list">
<div class="demo-list-item demo-list-item--active">抗感染药物</div>
<div class="demo-list-item">心血管药物</div>
<div class="demo-list-item">消化系统药物</div>
<div class="demo-list-item">呼吸系统药物</div>
<div class="demo-list-item">神经系统药物</div>
<div class="demo-list-item">内分泌药物</div>
</div>
</template>
<template #gridToolbar>
<div class="demo-toolbar">
<input type="text" placeholder="药品名称/编码" />
<select><option>全部剂型</option><option>片剂</option><option>胶囊</option><option>注射剂</option></select>
<select><option>全部状态</option><option>启用</option><option>停用</option></select>
<button>查询</button>
<button>新增</button>
</div>
</template>
<template #default>
<table class="demo-tbl">
<thead><tr><th>药品编码</th><th>药品名称</th><th>规格</th><th>剂型</th><th>医保类型</th><th>状态</th></tr></thead>
<tbody>
<tr><td>YP001</td><td>阿莫西林胶囊</td><td>0.25g x 24</td><td>胶囊剂</td><td><span class="demo-tag demo-tag--success">甲类</span></td><td><span class="demo-tag demo-tag--success">启用</span></td></tr>
<tr><td>YP002</td><td>头孢克洛片</td><td>0.25g x 6</td><td>片剂</td><td><span class="demo-tag demo-tag--info">乙类</span></td><td><span class="demo-tag demo-tag--success">启用</span></td></tr>
<tr><td>YP003</td><td>布洛芬缓释胶囊</td><td>0.3g x 20</td><td>胶囊剂</td><td><span class="demo-tag demo-tag--success">甲类</span></td><td><span class="demo-tag demo-tag--success">启用</span></td></tr>
<tr><td>YP004</td><td>硝苯地平控释片</td><td>30mg x 7</td><td>片剂</td><td><span class="demo-tag demo-tag--info">乙类</span></td><td><span class="demo-tag demo-tag--warning">停用</span></td></tr>
</tbody>
</table>
</template>
<template #pagination>
<span class="demo-text--muted">共 156 条</span>
</template>
</df-tree-grid-layout>
</div>
<template #code>

```vue
<DfTreeGridLayout title="药理分类" :tree-ratio="0.25" :tree-min="0.2" :tree-max="0.4">
  <template #treeToolbar>
    <DfInput v-model="treeKeyword" placeholder="搜索分类..." />
  </template>
  <template #tree>
    <DfTree :data="categoryTree" @selection-changed="onCategorySelect" />
  </template>
  <template #gridToolbar>
    <DfInput v-model="keyword" placeholder="药品名称/编码" />
    <DfSelect v-model="dosageForm" :items="dosageOptions" />
    <DfSelect v-model="status" :items="statusOptions" />
    <DfButton @click="onSearch">查询</DfButton>
    <DfButton type="primary" @click="onCreate">新增</DfButton>
  </template>
  <template #default>
    <DfTable :columns="drugColumns" :data-source="drugList" />
  </template>
  <template #pagination>
    <DfPagination :total="total" v-model:page="page" />
  </template>
</DfTreeGridLayout>
```

</template>
</DemoBlock>

## 科室人员管理

左侧按科室组织架构浏览，右侧展示科室下的人员列表。适用于 HIS 人事排班、权限分配等场景。

<DemoBlock title="科室人员管理">
<div class="demo-frame demo-frame--h400">
<df-tree-grid-layout title="科室架构" :tree-ratio="0.3" style="height:100%;">
<template #tree>
<div class="demo-list">
<div class="demo-list-item demo-list-item--active">呼吸内科</div>
<div class="demo-list-item">心内科</div>
<div class="demo-list-item">骨科</div>
<div class="demo-list-item">普外科</div>
<div class="demo-list-item">儿科</div>
<div class="demo-list-item">妇产科</div>
<div class="demo-list-item">急诊科</div>
</div>
</template>
<template #gridToolbar>
<div class="demo-toolbar">
<input type="text" placeholder="姓名/工号" />
<button>查询</button>
</div>
</template>
<template #default>
<table class="demo-tbl">
<thead><tr><th>工号</th><th>姓名</th><th>职称</th><th>角色</th><th>排班状态</th></tr></thead>
<tbody>
<tr><td>GH1001</td><td>李明</td><td>主任医师</td><td>科室主任</td><td><span class="demo-tag demo-tag--success">在岗</span></td></tr>
<tr><td>GH1002</td><td>王芳</td><td>副主任医师</td><td>主治医师</td><td><span class="demo-tag demo-tag--success">在岗</span></td></tr>
<tr><td>GH1003</td><td>张伟</td><td>主治医师</td><td>住院医师</td><td><span class="demo-tag demo-tag--info">休假</span></td></tr>
<tr><td>GH1004</td><td>刘洋</td><td>住院医师</td><td>住院医师</td><td><span class="demo-tag demo-tag--success">在岗</span></td></tr>
</tbody>
</table>
</template>
<template #pagination>
<span class="demo-text--muted">共 23 条</span>
</template>
</df-tree-grid-layout>
</div>
<template #code>

```vue
<DfTreeGridLayout title="科室架构" :tree-ratio="0.3">
  <template #tree>
    <DfTree :data="deptTree" @selection-changed="onDeptSelect" />
  </template>
  <template #gridToolbar>
    <DfInput v-model="keyword" placeholder="姓名/工号" />
    <DfButton @click="onSearch">查询</DfButton>
  </template>
  <template #default>
    <DfTable :columns="staffColumns" :data-source="staffList" />
  </template>
  <template #pagination>
    <DfPagination :total="total" v-model:page="page" />
  </template>
</DfTreeGridLayout>
```

</template>
</DemoBlock>

## 自定义树标题区

通过 `treeHeader` 插槽完全自定义左侧面板标题区，覆盖默认 title 渲染。

<DemoBlock title="自定义树标题">
<div class="demo-frame demo-frame--h300">
<df-tree-grid-layout :tree-ratio="0.28" style="height:100%;">
<template #treeHeader>
<div class="demo-toolbar" style="padding:8px 12px;">
<span class="demo-text--strong">诊断目录</span>
<span class="demo-text--muted" style="margin-left:auto; font-size:12px;">ICD-10</span>
</div>
</template>
<template #tree>
<div class="demo-list">
<div class="demo-list-item demo-list-item--active">呼吸系统疾病 (J00-J99)</div>
<div class="demo-list-item">循环系统疾病 (I00-I99)</div>
<div class="demo-list-item">消化系统疾病 (K00-K93)</div>
<div class="demo-list-item">内分泌疾病 (E00-E89)</div>
</div>
</template>
<template #default>
<table class="demo-tbl">
<thead><tr><th>ICD编码</th><th>诊断名称</th><th>操作</th></tr></thead>
<tbody>
<tr><td>J06.9</td><td>急性上呼吸道感染</td><td class="demo-text--primary">编辑</td></tr>
<tr><td>J18.9</td><td>肺炎</td><td class="demo-text--primary">编辑</td></tr>
<tr><td>J45.9</td><td>支气管哮喘</td><td class="demo-text--primary">编辑</td></tr>
</tbody>
</table>
</template>
</df-tree-grid-layout>
</div>
<template #code>

```vue
<DfTreeGridLayout :tree-ratio="0.28">
  <template #treeHeader>
    <div style="display:flex; align-items:center; padding:8px 12px;">
      <span style="font-weight:600;">诊断目录</span>
      <span style="margin-left:auto; font-size:12px; color:#6B7790;">ICD-10</span>
    </div>
  </template>
  <template #tree>
    <DfTree :data="icdTreeData" @selection-changed="onSelect" />
  </template>
  <template #default>
    <DfTable :columns="icdColumns" :data-source="icdList" />
  </template>
</DfTreeGridLayout>
```

</template>
</DemoBlock>

## API

### Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `title` | `string` | `—` | 左侧面板标题，仅当未提供 `treeHeader` 插槽时显示 |
| `treeRatio` | `number` | `0.25` | 左侧树面板初始占比，范围 0-1 |
| `treeMin` | `number` | `0.15` | 左侧面板最小占比，拖拽时不可低于此值 |
| `treeMax` | `number` | `0.5` | 左侧面板最大占比，拖拽时不可超过此值 |

### Events

| 事件 | 回调参数 | 说明 |
|------|---------|------|
| `resize` | `(ratio: number)` | 拖拽分隔条时触发，返回当前左侧面板占比 |

### Slots

| 插槽 | 说明 |
|------|------|
| `tree` | 左侧树内容（DfTree / DfList 等） |
| `treeHeader` | 自定义树面板标题区（覆盖 title prop） |
| `treeToolbar` | 树面板工具栏（搜索、新增等操作按钮） |
| `default` | 右侧表格内容（DfTable 等） |
| `gridToolbar` | 表格上方工具栏（搜索、操作按钮） |
| `pagination` | 底部分页器区域 |

### TypeScript 类型

```typescript
import type { DfTreeGridLayoutProps } from 'df-web-base'

interface DfTreeGridLayoutProps {
  title?: string
  treeRatio?: number
  treeMin?: number
  treeMax?: number
}
```

### 布局结构

```
┌────────────┬─┬──────────────────────────┐
│  Title     │ │  #gridToolbar            │
├────────────│ │──────────────────────────│
│ #treeToolbar│ │                          │
├────────────│█│  #default (表格)          │
│            │ │                          │
│  #tree     │ │                          │
│  (DfTree)  │ │                          │
│            │ ├──────────────────────────│
│            │ │  #pagination             │
└────────────┴─┴──────────────────────────┘
  ← treeRatio →   ← 拖拽分隔条 →
```

---

## 导入

```typescript
import { DfTreeGridLayout } from 'df-web-base'
import type { DfTreeGridLayoutProps } from 'df-web-base'
```
