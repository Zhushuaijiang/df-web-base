# DfDetailLayout 详情编辑布局

详情/编辑页面的标准布局。适用于 HIS 医共体项目的详情展示、表单编辑、带 Tab 切换等场景。

支持两种密度：`compact`（医疗 HIS 默认，紧凑但不拥挤）和 `default`（通用后台，更宽松）。

<script setup>
import { ref } from 'vue'
const selectedDrug = ref(0)
const medicationTabs = [
  { key: 'base', title: '基本信息' },
  { key: 'inventory', title: '库存信息' },
  { key: 'price', title: '价格历史' },
]
const qualityTabs = [
  { key: 'completeness', title: '完整性' },
  { key: 'validity', title: '有效性' },
]
const admissionActions = [
  { key: 'save', text: '保存', type: 'primary' },
  { key: 'submit', text: '提交审核' },
  { key: 'print', text: '打印' },
]
const drugNames = ['阿莫西林胶囊', '头孢克洛片', '维生素C片', '葡萄糖注射液', '氯化钠注射液', '布洛芬缓释胶囊']
</script>

## 基础用法

<DemoBlock title="患者详情（紧凑模式）">
<div class="dl-demo-frame dl-demo-frame--compact">
<df-detail-layout title="患者详情" density="compact">
<template #statusTags>
<span class="dl-tag dl-tag--s">在院</span>
<span class="dl-tag dl-tag--i">医保</span>
</template>
<template #default>
<div class="dl-form dl-form--3">
<div class="dl-field"><span class="dl-lbl">姓名</span><span class="dl-val"><b>【张三】</b></span></div>
<div class="dl-field"><span class="dl-lbl">性别</span><span class="dl-val">男</span></div>
<div class="dl-field"><span class="dl-lbl">年龄</span><span class="dl-val">45岁</span></div>
<div class="dl-field"><span class="dl-lbl">身份证</span><span class="dl-val">620922****0027</span></div>
<div class="dl-field"><span class="dl-lbl">科室</span><span class="dl-val">呼吸内科</span></div>
<div class="dl-field"><span class="dl-lbl">床号</span><span class="dl-val">12-03</span></div>
<div class="dl-field"><span class="dl-lbl">住院号</span><span class="dl-val"><b>【ZY20240001】</b></span></div>
<div class="dl-field"><span class="dl-lbl">主治医师</span><span class="dl-val">李明</span></div>
<div class="dl-field"><span class="dl-lbl">入院日期</span><span class="dl-val">2024-03-15</span></div>
</div>
<div class="dl-section dl-section--spaced">既往就诊</div>
<table class="dl-tbl">
<thead><tr><th>就诊时间</th><th>诊断</th><th>机构</th></tr></thead>
<tbody>
<tr><td>2024-01-10</td><td>上呼吸道感染</td><td>县人民医院</td></tr>
<tr><td>2023-08-22</td><td>高血压 II 级</td><td>市中心医院</td></tr>
<tr><td>2023-03-05</td><td>2型糖尿病</td><td>社区卫生中心</td></tr>
</tbody>
</table>
</template>
<template #footer>
<DfButton size="small">取消</DfButton>
<DfButton type="primary" size="small">保存</DfButton>
</template>
</df-detail-layout>
</div>
<template #code>

```vue
<DfDetailLayout title="患者详情" density="compact" @back="goBack">
  <template #statusTags>
    <DfTag type="success">在院</DfTag>
    <DfTag type="info">医保</DfTag>
  </template>
  <template #default>
    <DfForm :fields="fields" v-model="formData" />
  </template>
  <template #footer>
    <DfButton size="small">取消</DfButton>
    <DfButton type="primary" size="small">保存</DfButton>
  </template>
</DfDetailLayout>
```

</template>
</DemoBlock>

## 带 Tab 切换

<DemoBlock title="药品信息（Tab 切换）">
<div class="dl-demo-frame dl-demo-frame--compact">
<df-detail-layout title="药品信息" density="compact" :tabs="medicationTabs" active-tab="base">
<template #tab-base>
<div class="dl-form dl-form--2">
<div class="dl-field"><span class="dl-lbl">药品编码</span><span class="dl-val">YP00123</span></div>
<div class="dl-field"><span class="dl-lbl">药品名称</span><span class="dl-val"><b>【阿莫西林胶囊】</b></span></div>
<div class="dl-field"><span class="dl-lbl">规格</span><span class="dl-val">0.25g×24粒</span></div>
<div class="dl-field"><span class="dl-lbl">厂家</span><span class="dl-val">华北制药</span></div>
<div class="dl-field"><span class="dl-lbl">剂型</span><span class="dl-val">胶囊剂</span></div>
<div class="dl-field"><span class="dl-lbl">批准文号</span><span class="dl-val">国药准字H13023964</span></div>
<div class="dl-field"><span class="dl-lbl">医保类型</span><span class="dl-val"><span class="dl-tag dl-tag--i dl-tag--flush">甲类</span></span></div>
<div class="dl-field"><span class="dl-lbl">是否基药</span><span class="dl-val dl-text--success">是</span></div>
</div>
</template>
<template #tab-inventory>
<div class="dl-empty">库存信息列表</div>
</template>
<template #tab-price>
<div class="dl-empty">价格历史图表</div>
</template>
</df-detail-layout>
</div>
<template #code>

```vue
<DfDetailLayout
  title="药品信息"
  density="compact"
  :tabs="tabs"
  v-model:active-tab="currentTab"
>
  <template #tab-base>
    <DfForm :fields="baseFields" v-model="formData" />
  </template>
  <template #tab-inventory>
    <DfTable :columns="columns" :data-source="inventoryData" />
  </template>
  <template #tab-price>
    <DfChart :data="priceData" type="line" />
  </template>
</DfDetailLayout>
```

</template>
</DemoBlock>

## 左右分栏

<DemoBlock title="住院医嘱（左右分栏）">
<div class="dl-demo-frame dl-demo-frame--compact">
<df-detail-layout title="住院医嘱" density="compact" :split-layout="true" :split-ratio="0.35">
<template #left>
<div class="dl-list">
<div v-for="(name, i) in drugNames" :key="i" class="dl-list-item" :class="{'dl-list-item--on': selectedDrug === i}" @click="selectedDrug = i">{{ name }}</div>
</div>
</template>
<template #right>
<div class="dl-section dl-section--tight">{{ drugNames[selectedDrug] }}</div>
<div class="dl-form dl-form--1">
<div class="dl-field"><span class="dl-lbl">规格</span><span class="dl-val">0.25g×24粒</span></div>
<div class="dl-field"><span class="dl-lbl">用法用量</span><span class="dl-val">口服 每日3次 每次2粒</span></div>
<div class="dl-field"><span class="dl-lbl">开嘱日期</span><span class="dl-val">2024-03-15</span></div>
<div class="dl-field"><span class="dl-lbl">开嘱医师</span><span class="dl-val">李明</span></div>
<div class="dl-field"><span class="dl-lbl">执行状态</span><span class="dl-val dl-text--success">执行中</span></div>
</div>
</template>
</df-detail-layout>
</div>
<template #code>

```vue
<DfDetailLayout title="住院医嘱" density="compact" :split-layout="true" :split-ratio="0.35">
  <template #left>
    <DfTable :columns="masterColumns" :data-source="masterData" />
  </template>
  <template #right>
    <DfForm :fields="detailFields" v-model="detailData" />
  </template>
</DfDetailLayout>
```

</template>
</DemoBlock>

## 头部操作按钮 + 状态标签

<DemoBlock title="入院登记（操作按钮）">
<div class="dl-demo-frame dl-demo-frame--short">
<df-detail-layout title="入院登记" subtitle="P20240001" density="compact" :actions="admissionActions">
<template #statusTags>
<span class="dl-tag dl-tag--w">草稿</span>
</template>
<template #default>
<div class="dl-form dl-form--2">
<div class="dl-field"><span class="dl-lbl">患者姓名</span><span class="dl-val"><b>【王五】</b></span></div>
<div class="dl-field"><span class="dl-lbl">性别</span><span class="dl-val">男</span></div>
<div class="dl-field"><span class="dl-lbl">年龄</span><span class="dl-val">38岁</span></div>
<div class="dl-field"><span class="dl-lbl">身份证号</span><span class="dl-val">650102****0015</span></div>
<div class="dl-field"><span class="dl-lbl">入院科室</span><span class="dl-val">骨科</span></div>
<div class="dl-field"><span class="dl-lbl">入院诊断</span><span class="dl-val">左股骨颈骨折</span></div>
</div>
</template>
</df-detail-layout>
</div>
<template #code>

```vue
<DfDetailLayout
  title="入院登记"
  subtitle="P20240001"
  density="compact"
  :actions="[
    { key: 'save', text: '保存', type: 'primary' },
    { key: 'submit', text: '提交审核' },
    { key: 'print', text: '打印' },
  ]"
  @action="onAction"
>
  <template #statusTags>
    <DfTag type="warning">草稿</DfTag>
  </template>
  <template #default>
    <DfForm :fields="fields" v-model="formData" />
  </template>
</DfDetailLayout>
```

</template>
</DemoBlock>

## 工具栏（筛选/搜索）

<DemoBlock title="数据质控（带工具栏）">
<div class="dl-demo-frame dl-demo-frame--tall">
<df-detail-layout title="数据质控规则" density="compact" :tabs="qualityTabs" active-tab="completeness">
<template #toolbar>
<div class="dl-toolbar">
<span class="dl-toolbar__label">统计周期</span>
<select class="dl-toolbar__control"><option>按月</option><option>按季</option></select>
<input class="dl-toolbar__control" type="month" value="2026-03" />
<DfButton type="primary" size="small">查询</DfButton>
<DfButton size="small">重置</DfButton>
</div>
</template>
<template #tab-completeness>
<table class="dl-tbl">
<thead><tr><th>机构名称</th><th class="dl-cell--right">完整性得分</th><th class="dl-cell--right">综合评级</th></tr></thead>
<tbody>
<tr><td>县人民医院</td><td class="dl-cell--right dl-text--success">98.5%</td><td class="dl-cell--right"><span class="dl-tag dl-tag--s dl-tag--flush">优秀</span></td></tr>
<tr><td>县中医院</td><td class="dl-cell--right dl-text--success">95.2%</td><td class="dl-cell--right"><span class="dl-tag dl-tag--s dl-tag--flush">优秀</span></td></tr>
<tr><td>社区卫生中心</td><td class="dl-cell--right dl-text--warning">88.7%</td><td class="dl-cell--right"><span class="dl-tag dl-tag--w dl-tag--flush">良好</span></td></tr>
<tr><td>乡镇卫生院</td><td class="dl-cell--right dl-text--warning">82.3%</td><td class="dl-cell--right"><span class="dl-tag dl-tag--w dl-tag--flush">良好</span></td></tr>
</tbody>
</table>
</template>
</df-detail-layout>
</div>
<template #code>

```vue
<DfDetailLayout title="数据质控规则" density="compact" :tabs="tabs">
  <template #toolbar>
    <DfSelect v-model="timeMode" :items="timeOptions" />
    <DfDatePicker v-model="dateRange" />
    <DfButton type="primary" size="small">查询</DfButton>
    <DfButton size="small">重置</DfButton>
  </template>
  <template #tab-completeness>
    <DfTable :columns="columns" :data-source="qualityData" />
  </template>
</DfDetailLayout>
```

</template>
</DemoBlock>

## Default 密度

<DemoBlock title="用户编辑（default 密度）">
<div class="dl-demo-frame dl-demo-frame--default">
<df-detail-layout title="用户编辑" density="default">
<template #default>
<div class="dl-form dl-form--2 dl-form--default">
<div class="dl-field"><span class="dl-lbl">用户名</span><span class="dl-val dl-text--strong">zhangsan</span></div>
<div class="dl-field"><span class="dl-lbl">姓名</span><span class="dl-val">张三</span></div>
<div class="dl-field"><span class="dl-lbl">邮箱</span><span class="dl-val">zhangsan@hospital.cn</span></div>
<div class="dl-field"><span class="dl-lbl">手机号</span><span class="dl-val">138****5678</span></div>
<div class="dl-field"><span class="dl-lbl">所属机构</span><span class="dl-val">县人民医院</span></div>
<div class="dl-field"><span class="dl-lbl">角色</span><span class="dl-val">系统管理员</span></div>
</div>
</template>
<template #footer>
<DfButton>取消</DfButton>
<DfButton type="primary">保存</DfButton>
</template>
</df-detail-layout>
</div>
<template #code>

```vue
<DfDetailLayout title="用户编辑" density="default" @back="goBack">
  <template #default>
    <DfForm :fields="fields" v-model="formData" />
  </template>
  <template #footer>
    <DfButton>取消</DfButton>
    <DfButton type="primary">保存</DfButton>
  </template>
</DfDetailLayout>
```

</template>
</DemoBlock>

## API

### Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `title` | `string` | `''` | 页面标题 |
| `subtitle` | `string` | `''` | 副标题 |
| `showBackButton` | `boolean` | `true` | 是否显示返回按钮（纯图标） |
| `density` | `'compact' \| 'default'` | `'compact'` | 布局密度 |
| `splitLayout` | `boolean` | `false` | 是否启用左右分栏 |
| `splitRatio` | `number` | `0.6` | 左侧面板比例 0-1 |
| `tabs` | `DetailTab[]` | `[]` | Tab 列表 |
| `activeTab` | `string` | `''` | 当前激活 Tab（支持 v-model） |
| `actions` | `DetailAction[]` | `[]` | 头部右侧操作按钮 |

### Events

| 事件 | 回调参数 | 说明 |
|------|---------|------|
| `back` | — | 点击返回按钮 |
| `tab-change` | `(key: string)` | Tab 切换 |
| `action` | `(key: string)` | 操作按钮点击 |
| `update:activeTab` | `(key: string)` | v-model 更新 |

### Slots

| 插槽 | 说明 |
|------|------|
| `header` | 自定义标题区内容（返回按钮和右侧操作区仍由组件管理） |
| `statusTags` | 标题右侧状态标签区域 |
| `headerActions` | 自定义头部右侧操作区 |
| `toolbar` | tabs 与内容之间的筛选工具栏 |
| `default` | 主内容（splitLayout=false 且无 tabs 时） |
| `left` | 左侧面板（splitLayout=true） |
| `right` | 右侧面板（splitLayout=true） |
| `tab-{key}` | 各 Tab 面板内容 |
| `footer` | 底部操作栏（固定在底部） |

### 密度参数对比

| 参数 | compact | default |
|------|---------|---------|
| Header 高度 | 46px | 56px |
| Header 水平内边距 | 20px | 24px |
| Tab 高度 | 40px | 44px |
| Body 内边距 | 20px | 24px |
| Footer 高度 | 52px | 56px |
| 标题字号 | 14px | 16px |
| 操作按钮高度 | 30px | 32px |

### 布局结构

```
┌───────────────────────────────────────────────────────┐
│  ◀   标题  副标题 [状态标签]        [保存] [提交] [打印] │ ← 46/56px
├───────────────────────────────────────────────────────┤
│   [基本信息]    [库存信息]    [价格历史]                 │ ← 40/44px
├───────────────────────────────────────────────────────┤
│   #toolbar (筛选/搜索)                                 │ ← 可选
├───────────────────────────────────────────────────────┤
│                                                       │
│   #default / #tab-{key} / #left + #right              │ ← flex:1
│   内容区内边距 20/24px                                  │
│                                                       │
├───────────────────────────────────────────────────────┤
│                                    [保存]  [取消]       │ ← 52/56px
└───────────────────────────────────────────────────────┘
```

---

## 导入

```typescript
import { DfDetailLayout } from 'df-web-base'
import type { DfDetailLayoutProps, DetailTab, DetailAction } from 'df-web-base'
```

<style>
/* ── Demo 辅助样式（仅文档演示，非组件内部样式）── */

.dl-demo-frame { width:100%; height:100%; border:1px solid #E8EBF0; border-radius:4px; overflow:hidden; }
.dl-demo-frame--compact { height:400px; }
.dl-demo-frame--short { height:300px; }
.dl-demo-frame--tall { height:420px; }
.dl-demo-frame--default { height:340px; }
.dl-demo-frame .df-detail-layout { height:100%; }

/* 表单描述列表：直接使用组件 body 的 padding，不再叠加第二层卡片容器 */
.dl-form { display:grid; font-size:13px; gap:0; }
.dl-form--3 { grid-template-columns:repeat(3, 1fr); }
.dl-form--2 { grid-template-columns:repeat(2, 1fr); }
.dl-form--1 { grid-template-columns:1fr; }
.dl-form--default { font-size:14px; }
.dl-form--default .dl-field { min-height:40px; }

.dl-field {
  display:flex; align-items:center; border-bottom:1px solid #F0F2F5; min-height:36px;
}
.dl-lbl {
  flex-shrink:0; width:80px; padding:7px 12px 7px 8px;
  color:#6B7790; background:#F7F8FA; line-height:20px; white-space:nowrap;
  align-self:stretch; display:flex; align-items:center; justify-content:flex-end;
}
.dl-val {
  flex:1; padding:7px 12px; color:#1A2030; line-height:20px;
}
.dl-val b { font-weight:600; }
.dl-text--strong { font-weight:500; }
.dl-text--success { color:#52C41A; font-weight:500; }
.dl-text--warning { color:#FAAD14; font-weight:500; }

/* 分隔标题 */
.dl-section { font-size:13px; font-weight:600; color:#1A2030; padding:8px 0; border-bottom:1px solid #E8EBF0; margin-bottom:4px; }
.dl-section--spaced { margin-top:16px; }
.dl-section--tight { margin-top:0; }

/* 数据表格 */
.dl-tbl { width:100%; border-collapse:collapse; font-size:13px; }
.dl-tbl th { padding:8px 12px; text-align:left; font-weight:500; color:#6B7790; font-size:12px; line-height:18px; background:#F7F8FA; border-bottom:1px solid #E8EBF0; }
.dl-tbl td { padding:8px 12px; color:#1A2030; line-height:18px; border-bottom:1px solid #F0F2F5; }
.dl-tbl tr:last-child td { border-bottom:none; }
.dl-cell--right { text-align:right; }

/* 状态标签 */
.dl-tag { display:inline-block; padding:2px 8px; border-radius:4px; font-size:12px; font-weight:500; line-height:18px; vertical-align:middle; }
.dl-tag + .dl-tag { margin-left:6px; }
.dl-tag--flush { margin:0; }
.dl-tag--s { background:#F6FFED; color:#52C41A; }
.dl-tag--i { background:#E6F7FF; color:#1890FF; }
.dl-tag--w { background:#FFFBE6; color:#FAAD14; }

/* 列表（分栏左侧） */
.dl-list { font-size:13px; }
.dl-list-item { padding:10px 16px; border-bottom:1px solid #F0F2F5; cursor:pointer; color:#1A2030; border-left:3px solid transparent; transition:all .15s; }
.dl-list-item:hover { background:#F7F8FA; }
.dl-list-item--on { background:#E8F5F3 !important; color:#2AA890; font-weight:500; border-left-color:#2AA890; }

/* 空状态占位 */
.dl-empty { display:flex; align-items:center; justify-content:center; height:100%; min-height:180px; color:#B3BAC9; font-size:13px; }

/* 工具栏 */
.dl-toolbar { display:flex; align-items:center; gap:8px; font-size:13px; padding:0; flex-wrap:wrap; }
.dl-toolbar__label { color:#6B7790; white-space:nowrap; }
.dl-toolbar__control { height:28px; border:1px solid #E8EBF0; border-radius:4px; font-size:12px; padding:0 8px; color:#1A2030; background:#fff; outline:none; }
.dl-toolbar__control:focus { border-color:#2AA890; }
</style>
