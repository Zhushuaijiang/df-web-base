# DfCardLayout 卡片布局

卡片容器组件。带标题栏、可折叠、操作按钮、阴影/边框控制，用于在页面中分组展示信息区块。

## 基础用法

<DemoBlock title="基础卡片">
<df-card-layout title="基本信息">
<div style="display:grid; grid-template-columns:80px 1fr 80px 1fr; gap:8px 16px; font-size:13px;">
<span style="color:#909399; text-align:right;">姓名</span><span>张三</span>
<span style="color:#909399; text-align:right;">性别</span><span>男</span>
<span style="color:#909399; text-align:right;">年龄</span><span>45 岁</span>
<span style="color:#909399; text-align:right;">科室</span><span>内科</span>
</div>
</df-card-layout>
<template #code>

```vue
<df-card-layout title="基本信息">
  <DfForm :fields="fields" v-model="formData" />
</df-card-layout>
```

</template>
</DemoBlock>

## 可折叠卡片

点击标题栏可折叠/展开卡片内容区。

<DemoBlock title="可折叠">
<div style="display:flex; flex-direction:column; gap:12px;">
<df-card-layout title="默认展开" :collapsible="true">
<div style="font-size:13px; color:#606266; padding:4px 0;">这是一段展开的内容，点击标题栏可以折叠。</div>
</df-card-layout>
<df-card-layout title="默认折叠（点击展开）" :collapsible="true" :default-collapsed="true">
<div style="font-size:13px; color:#606266; padding:4px 0;">展开后显示的高级设置内容。</div>
</df-card-layout>
</div>
<template #code>

```vue
<df-card-layout title="默认展开" :collapsible="true">
  <p>内容区域</p>
</df-card-layout>

<df-card-layout title="默认折叠" :collapsible="true" :default-collapsed="true">
  <p>高级设置内容</p>
</df-card-layout>
```

</template>
</DemoBlock>

## 阴影等级

通过 `shadow` 属性控制卡片阴影层次。

<DemoBlock title="阴影对比">
<div style="display:grid; grid-template-columns:1fr 1fr; gap:16px;">
<df-card-layout title="shadow=none" shadow="none" :bordered="true">
<div style="font-size:13px; color:#909399; text-align:center; padding:12px 0;">无阴影 + 边框</div>
</df-card-layout>
<df-card-layout title="shadow=sm" shadow="sm">
<div style="font-size:13px; color:#909399; text-align:center; padding:12px 0;">小阴影（默认）</div>
</df-card-layout>
<df-card-layout title="shadow=md" shadow="md">
<div style="font-size:13px; color:#909399; text-align:center; padding:12px 0;">中等阴影</div>
</df-card-layout>
<df-card-layout title="shadow=lg" shadow="lg">
<div style="font-size:13px; color:#909399; text-align:center; padding:12px 0;">大阴影</div>
</df-card-layout>
</div>
<template #code>

```vue
<df-card-layout title="无阴影" shadow="none" :bordered="true">
  <p>无阴影 + 边框</p>
</df-card-layout>

<df-card-layout title="小阴影" shadow="sm">小阴影</df-card-layout>
<df-card-layout title="中等阴影" shadow="md">中等阴影</df-card-layout>
<df-card-layout title="大阴影" shadow="lg">大阴影</df-card-layout>
```

</template>
</DemoBlock>

## 带操作按钮

标题右侧可配置操作按钮。

<DemoBlock title="操作按钮">
<df-card-layout title="费用明细" :actions="[{key:'add',text:'新增'},{key:'refresh',text:'刷新'}]">
<table style="width:100%; border-collapse:collapse; font-size:13px;">
<thead><tr style="background:#fafafa; height:34px;"><th style="border:1px solid #ebeef5; padding:0 12px; text-align:left; font-weight:500;">项目</th><th style="border:1px solid #ebeef5; padding:0 12px; text-align:right; font-weight:500;">金额</th></tr></thead>
<tbody><tr style="height:32px;"><td style="border:1px solid #ebeef5; padding:0 12px;">检查费</td><td style="border:1px solid #ebeef5; padding:0 12px; text-align:right;">¥ 120.00</td></tr><tr style="height:32px; background:#fafafa;"><td style="border:1px solid #ebeef5; padding:0 12px;">药品费</td><td style="border:1px solid #ebeef5; padding:0 12px; text-align:right;">¥ 85.50</td></tr></tbody>
</table>
</df-card-layout>
<template #code>

```vue
<df-card-layout title="费用明细" :actions="actions" @action="onAction">
  <DfTable :columns="columns" :static-data="feeList" />
</df-card-layout>

<script setup lang="ts">
import type { CardAction } from 'df-web-base'
const actions: CardAction[] = [
  { key: 'add', text: '新增' },
  { key: 'refresh', text: '刷新' },
]
</script>
```

</template>
</DemoBlock>

## 带底部操作

<DemoBlock title="底部插槽">
<df-card-layout title="编辑表单">
<div style="display:grid; grid-template-columns:80px 1fr; gap:8px 16px; font-size:13px;">
<span style="color:#909399; text-align:right;">名称</span><input style="height:30px; border:1px solid #dcdfe6; border-radius:4px; padding:0 8px; width:200px;" value="内科一病区" />
<span style="color:#909399; text-align:right;">编码</span><input style="height:30px; border:1px solid #dcdfe6; border-radius:4px; padding:0 8px; width:200px;" value="NK01" />
</div>
<template #footer>
<div style="display:flex; gap:8px; justify-content:flex-end;">
<button style="height:30px; padding:0 14px; background:#1890ff; color:#fff; border:none; border-radius:4px; font-size:13px; cursor:pointer;">保存</button>
<button style="height:30px; padding:0 14px; background:#fff; color:#606266; border:1px solid #dcdfe6; border-radius:4px; font-size:13px; cursor:pointer;">取消</button>
</div>
</template>
</df-card-layout>
<template #code>

```vue
<df-card-layout title="编辑表单">
  <DfForm :fields="fields" v-model="formData" />
  <template #footer>
    <DfButton type="primary" @click="save">保存</DfButton>
    <DfButton @click="cancel">取消</DfButton>
  </template>
</df-card-layout>
```

</template>
</DemoBlock>

## 多卡片堆叠

常见的详情页模式：在 `DfDetailLayout` 内堆叠多个 `DfCardLayout`。

<DemoBlock title="卡片堆叠组合">
<div style="display:flex; flex-direction:column; gap:12px; background:#f5f7fa; padding:16px; border-radius:4px;">
<df-card-layout title="基本信息">
<div style="display:grid; grid-template-columns:80px 1fr 80px 1fr; gap:8px 16px; font-size:13px;">
<span style="color:#909399; text-align:right;">姓名</span><span>张三</span>
<span style="color:#909399; text-align:right;">性别</span><span>男</span>
<span style="color:#909399; text-align:right;">年龄</span><span>45</span>
<span style="color:#909399; text-align:right;">科室</span><span>内科</span>
</div>
</df-card-layout>
<df-card-layout title="诊断信息" :collapsible="true">
<div style="font-size:13px; color:#606266;">主诊断：高血压3级（极高危）</div>
</df-card-layout>
<df-card-layout title="费用汇总" :collapsible="true" :default-collapsed="true">
<div style="font-size:13px; color:#606266;">总费用：¥ 3,250.00</div>
</df-card-layout>
</div>
<template #code>

```vue
<df-detail-layout title="患者详情" @back="goBack">
  <template #default>
    <df-card-layout title="基本信息">
      <DfForm :fields="baseFields" v-model="patientInfo" />
    </df-card-layout>
    <df-card-layout title="诊断信息" :collapsible="true">
      <DfTable :columns="diagColumns" :static-data="diagList" />
    </df-card-layout>
    <df-card-layout title="费用汇总" :collapsible="true" :default-collapsed="true">
      <FeeOverview :patient-id="patientId" />
    </df-card-layout>
  </template>
</df-detail-layout>
```

</template>
</DemoBlock>

## API

### Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `title` | `string` | `''` | 卡片标题 |
| `collapsible` | `boolean` | `false` | 是否可折叠 |
| `defaultCollapsed` | `boolean` | `false` | 初始折叠状态 |
| `padding` | `number \| string` | `16` | 内容区内边距 |
| `shadow` | `'none' \| 'sm' \| 'md' \| 'lg'` | `'sm'` | 阴影等级 |
| `bordered` | `boolean` | `true` | 是否显示边框 |
| `cssClass` | `string` | `''` | 自定义 CSS 类名 |
| `actions` | `CardAction[]` | `[]` | 标题右侧操作按钮 |

### Events

| 事件 | 回调参数 | 说明 |
|------|---------|------|
| `action` | `(key: string)` | 操作按钮点击时触发 |
| `update:collapsed` | `(collapsed: boolean)` | 折叠状态变化时触发，支持 `v-model:collapsed` |

### Slots

| 插槽 | 说明 |
|------|------|
| `header` | 自定义整个标题栏。使用后 `title` prop 和默认按钮不渲染 |
| `default` | 卡片主内容区域 |
| `footer` | 卡片底部操作区域 |

### TypeScript 类型

```typescript
import type { DfCardLayoutProps, CardAction } from 'df-web-base'

interface CardAction {
  key: string
  text?: string
  icon?: string
}

interface DfCardLayoutProps {
  title?: string
  collapsible?: boolean
  defaultCollapsed?: boolean
  padding?: number | string
  shadow?: 'none' | 'sm' | 'md' | 'lg'
  bordered?: boolean
  cssClass?: string
  actions?: CardAction[]
}
```

---

## 导入

```typescript
import { DfCardLayout } from 'df-web-base'
import type { DfCardLayoutProps, CardAction } from 'df-web-base'
```
