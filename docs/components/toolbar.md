# DfToolbar 工具栏

基于 DevExtreme 25.2 DxToolbar 封装，通过 `items` 配置快速构建工具栏，集成权限控制能力。

> 基于 **DxToolbar** 封装 | 来源：`devextreme-vue/toolbar`

## 患者列表工具栏

<DemoBlock title="患者管理页 — 新增/编辑/删除/搜索">
<div class="demo-frame demo-frame--h300">
  <div style="padding:12px 16px;">
    <div class="demo-toolbar" style="border-bottom:1px solid #E8EBF0; padding-bottom:12px; margin-bottom:12px;">
      <button style="padding:4px 16px; background:#2AA890; color:#fff; border:none; border-radius:4px; font-size:12px; cursor:pointer;">新增患者</button>
      <button style="padding:4px 16px; background:#fff; color:#1A1A1A; border:1px solid #E8EBF0; border-radius:4px; font-size:12px; cursor:pointer;">编辑</button>
      <button style="padding:4px 16px; background:#fff; color:#F5222D; border:1px solid #F5222D; border-radius:4px; font-size:12px; cursor:pointer;">删除</button>
      <span style="flex:1;"></span>
      <input type="text" placeholder="搜索患者姓名..." style="height:28px; border:1px solid #E8EBF0; border-radius:4px; font-size:12px; padding:0 8px; width:200px; outline:none;" />
    </div>
    <table class="demo-tbl">
      <thead>
        <tr><th>姓名</th><th>科室</th><th>床号</th><th>状态</th></tr>
      </thead>
      <tbody>
        <tr><td>张三</td><td>内科</td><td>301-1</td><td><span class="demo-tag demo-tag--success">在院</span></td></tr>
        <tr><td>李四</td><td>外科</td><td>205-3</td><td><span class="demo-tag demo-tag--warning">待出院</span></td></tr>
        <tr><td>王五</td><td>儿科</td><td>102-2</td><td><span class="demo-tag demo-tag--success">在院</span></td></tr>
      </tbody>
    </table>
  </div>
</div>
<template #code>

```vue
<template>
  <df-toolbar :items="toolbarItems" bordered />

  <df-table :data-source="patientList" :columns="columns" />
</template>

<script setup lang="ts">
import { DfToolbar, DfTable } from 'df-web-base'
import type { DfToolbarItem } from 'df-web-base'

const toolbarItems: DfToolbarItem[] = [
  {
    name: 'add',
    widget: 'dxButton',
    location: 'before',
    options: { text: '新增患者', icon: 'plus', type: 'default' },
    permissionCode: 'patient:add',
  },
  {
    name: 'edit',
    widget: 'dxButton',
    location: 'before',
    options: { text: '编辑', icon: 'edit' },
    permissionCode: 'patient:edit',
  },
  {
    name: 'delete',
    widget: 'dxButton',
    location: 'before',
    options: {
      text: '删除',
      icon: 'trash',
      stylingMode: 'outlined',
      elementAttr: { class: 'dx-btn-danger' },
    },
    permissionCode: 'patient:delete',
  },
  {
    name: 'search',
    widget: 'dxTextBox',
    location: 'after',
    options: {
      placeholder: '搜索患者姓名...',
      showClearButton: true,
      width: 200,
      onValueChanged: (e: any) => handleSearch(e.value),
    },
  },
]
</script>
```

</template>
</DemoBlock>

## 筛选工具栏（混合控件）

支持按钮、输入框、下拉框、日期选择器、复选框等多种控件混排。

<DemoBlock title="住院患者查询条件栏">
<div class="demo-frame demo-frame--h300">
  <div style="padding:12px 16px;">
    <div class="demo-toolbar" style="border-bottom:1px solid #E8EBF0; padding-bottom:12px; margin-bottom:12px;">
      <label style="color:#6B7790; font-size:12px; white-space:nowrap;">科室</label>
      <select style="height:28px; border:1px solid #E8EBF0; border-radius:4px; font-size:12px; padding:0 8px; min-width:140px;">
        <option>全部科室</option>
        <option>内科</option>
        <option>外科</option>
        <option>儿科</option>
      </select>
      <label style="color:#6B7790; font-size:12px; white-space:nowrap;">入院日期</label>
      <input type="date" style="height:28px; border:1px solid #E8EBF0; border-radius:4px; font-size:12px; padding:0 8px;" />
      <label style="font-size:12px; color:#1A1A1A; white-space:nowrap;">
        <input type="checkbox" checked style="vertical-align:middle;" /> 仅在院
      </label>
      <button style="padding:4px 16px; background:#2AA890; color:#fff; border:none; border-radius:4px; font-size:12px; cursor:pointer;">查询</button>
      <button style="padding:4px 16px; background:#fff; border:1px solid #E8EBF0; border-radius:4px; font-size:12px; cursor:pointer;">重置</button>
    </div>
    <div style="color:#6B7790; font-size:12px; padding-top:8px;">
      下拉框选择科室 + 日期选择 + 复选框过滤 + 查询/重置按钮
    </div>
  </div>
</div>
<template #code>

```vue
<template>
  <df-toolbar :items="filterItems" bordered />
</template>

<script setup lang="ts">
import { DfToolbar } from 'df-web-base'
import type { DfToolbarItem } from 'df-web-base'

const filterItems: DfToolbarItem[] = [
  {
    name: 'dept',
    widget: 'dxSelectBox',
    location: 'before',
    options: {
      dataSource: deptList,
      displayExpr: 'name',
      valueExpr: 'id',
      placeholder: '选择科室',
      width: 160,
    },
  },
  {
    name: 'date',
    widget: 'dxDateBox',
    location: 'before',
    options: {
      type: 'date',
      width: 140,
      placeholder: '入院日期',
    },
  },
  {
    name: 'active',
    widget: 'dxCheckBox',
    location: 'before',
    options: { text: '仅在院', value: true },
  },
  {
    name: 'search',
    widget: 'dxButton',
    location: 'before',
    options: { text: '查询', icon: 'search', type: 'default', onClick: handleSearch },
  },
  {
    name: 'reset',
    widget: 'dxButton',
    location: 'before',
    options: { text: '重置', icon: 'clear', onClick: handleReset },
  },
]
</script>
```

</template>
</DemoBlock>

## 权限控制

通过 `permissionCode` 控制工具栏项的可见性，依赖 `DF_UI_KEY.permission.check()`。

<DemoBlock title="根据用户权限显示/隐藏操作按钮">
<div class="demo-frame demo-frame--h300">
  <div style="padding:12px 16px;">
    <div class="demo-section">权限控制效果对比</div>
    <div style="padding-top:8px; font-size:12px; color:#6B7790;">管理员视角（所有按钮可见）：</div>
    <div class="demo-toolbar" style="padding-top:4px;">
      <button style="padding:4px 16px; background:#2AA890; color:#fff; border:none; border-radius:4px; font-size:12px;">新增患者</button>
      <button style="padding:4px 16px; background:#fff; border:1px solid #E8EBF0; border-radius:4px; font-size:12px;">编辑</button>
      <button style="padding:4px 16px; background:#fff; border:1px solid #E8EBF0; border-radius:4px; font-size:12px;">导出</button>
    </div>
    <div style="padding-top:12px; font-size:12px; color:#6B7790;">普通护士视角（仅可见导出）：</div>
    <div class="demo-toolbar" style="padding-top:4px;">
      <button style="padding:4px 16px; background:#fff; border:1px solid #E8EBF0; border-radius:4px; font-size:12px;">导出</button>
    </div>
    <div style="padding-top:12px; font-size:12px; color:#6B7790;">
      设置 <code>permissionCode</code> 后，不具备权限的按钮会被自动隐藏
    </div>
  </div>
</div>
<template #code>

```vue
<template>
  <df-toolbar :items="items" bordered />
</template>

<script setup lang="ts">
import { DfToolbar } from 'df-web-base'
import type { DfToolbarItem } from 'df-web-base'

const items: DfToolbarItem[] = [
  {
    name: 'add',
    widget: 'dxButton',
    location: 'before',
    options: { text: '新增患者', icon: 'plus', type: 'default' },
    // 仅 'patient:add' 权限的用户可见
    permissionCode: 'patient:add',
  },
  {
    name: 'edit',
    widget: 'dxButton',
    location: 'before',
    options: { text: '编辑', icon: 'edit' },
    permissionCode: 'patient:edit',
  },
  {
    name: 'export',
    widget: 'dxButton',
    location: 'after',
    options: { text: '导出', icon: 'export' },
    // 所有人可见（未设置 permissionCode）
  },
]
</script>
```

</template>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| items | 工具栏项配置数组 | `DfToolbarItem[]` | `[]` |
| bordered | 是否显示底部边框线 | `boolean` | `false` |

### DfToolbarItem 类型

```typescript
interface DfToolbarItem {
  /** 项唯一名称 */
  name: string
  /** 控件类型。不填则渲染为纯文本 */
  widget?: 'dxButton' | 'dxTextBox' | 'dxSelectBox' | 'dxDateBox' | 'dxCheckBox'
  /** 位置：左侧 / 中间 / 右侧 */
  location?: 'before' | 'center' | 'after'
  /** 是否可见 */
  visible?: boolean
  /** 是否禁用 */
  disabled?: boolean
  /** 控件的配置项（透传给对应 widget） */
  options?: Record<string, any>
  /** 自定义 CSS class */
  cssClass?: string
  /** 权限编码（不具备此权限时隐藏该项） */
  permissionCode?: string
}
```

### Events

本组件不触发自定义事件。各 widget 的事件通过 `options` 中的回调函数配置：

```typescript
{
  name: 'save',
  widget: 'dxButton',
  options: {
    text: '保存',
    onClick: () => { /* 处理点击 */ }
  }
}
```

### Slots

| 名称 | 说明 |
|------|------|
| default | 透传到 DxToolbar 内部，可使用 `DxItem` 子组件自定义内容 |

### Methods

本组件不暴露方法。

## 引入方式

```typescript
import { DfToolbar } from 'df-web-base'
import type { DfToolbarItem } from 'df-web-base'
```

## 与 DevExtreme DxToolbar 的差异

| 特性 | DxToolbar | DfToolbar |
|------|-----------|-----------|
| 项配置 | `items` 数组 或 `<DxItem>` 子组件 | `items` 数组 prop |
| 权限控制 | 无内置 | `permissionCode` 属性 |
| 底部边框 | 无内置 | `bordered` prop |
| 样式 | 默认样式 | 统一主题样式 |
