# DfFormLayout 分段表单布局

多分组表单 + 右侧快速导航。参考：人员管理-用户编辑（基础信息、职业信息、右侧人员信息导航）。

<script setup>
const staffSections = [
  { key: 'basic', title: '基础信息' },
  { key: 'work', title: '职业信息' },
  { key: 'edu', title: '学历经历' },
]

const patientSections = [
  { key: 'info', title: '患者信息', collapsible: true },
  { key: 'medical', title: '病历信息', collapsible: true },
]

const admissionSections = [
  { key: 'patient', title: '患者基本信息' },
  { key: 'admission', title: '入院信息' },
  { key: 'insurance', title: '医保信息' },
  { key: 'contact', title: '联系人信息' },
]

const prescriptionSections = [
  { key: 'diagnosis', title: '诊断信息', collapsible: false },
  { key: 'prescription', title: '药品处方' },
  { key: 'advice', title: '医嘱与嘱托' },
  { key: 'signature', title: '签名确认', collapsible: false },
]
</script>

## 基础用法

<DemoBlock title="分段表单 + 快速导航">
<div class="fl-demo-frame fl-demo-frame--h420">
<df-form-layout class="fl-demo-layout" quick-nav-title="人员信息" style="height:100%;" :sections="staffSections">
<template #section-basic>
<div class="fl-demo-form fl-demo-form--2col">
<div class="fl-demo-field"><span class="fl-demo-lbl">姓名</span><span class="fl-demo-val">张三</span></div>
<div class="fl-demo-field"><span class="fl-demo-lbl">性别</span><span class="fl-demo-val">男</span></div>
<div class="fl-demo-field"><span class="fl-demo-lbl">身份证号</span><span class="fl-demo-val">620922199001011234</span></div>
<div class="fl-demo-field"><span class="fl-demo-lbl">出生日期</span><span class="fl-demo-val">1990-01-01</span></div>
</div>
</template>
<template #section-work>
<div class="fl-demo-form fl-demo-form--2col">
<div class="fl-demo-field"><span class="fl-demo-lbl">职工类别</span><span class="fl-demo-val">医生</span></div>
<div class="fl-demo-field"><span class="fl-demo-lbl">科室</span><span class="fl-demo-val">内科</span></div>
<div class="fl-demo-field"><span class="fl-demo-lbl">职称</span><span class="fl-demo-val">副主任医师</span></div>
<div class="fl-demo-field"><span class="fl-demo-lbl">参加工作</span><span class="fl-demo-val">2012-07-01</span></div>
</div>
</template>
<template #section-edu>
<div class="fl-demo-form fl-demo-form--2col">
<div class="fl-demo-field"><span class="fl-demo-lbl">最高学历</span><span class="fl-demo-val">本科</span></div>
<div class="fl-demo-field"><span class="fl-demo-lbl">毕业院校</span><span class="fl-demo-val">兰州大学医学院</span></div>
</div>
</template>
</df-form-layout>
</div>
<template #code>

```vue
<DfFormLayout
  quick-nav-title="人员信息"
  :sections="[
    { key: 'basic', title: '基础信息' },
    { key: 'work', title: '职业信息' },
    { key: 'edu', title: '学历经历' },
  ]"
>
  <template #section-basic>
    <DfForm :fields="basicFields" v-model="formData" :show-actions="false" />
  </template>
  <template #section-work>
    <DfForm :fields="workFields" v-model="formData" :show-actions="false" />
  </template>
  <template #section-edu>
    <DfForm :fields="eduFields" v-model="formData" :show-actions="false" />
  </template>
</DfFormLayout>
```

</template>
</DemoBlock>

## 可折叠分组

<DemoBlock title="可折叠分段表单">
<div class="fl-demo-frame fl-demo-frame--h320">
<df-form-layout class="fl-demo-layout" :show-quick-nav="false" :collapsible="true" :sections="patientSections" style="height:100%;">
<template #section-info>
<div class="fl-demo-form fl-demo-form--3col">
<div class="fl-demo-field"><span class="fl-demo-lbl">姓名</span><span class="fl-demo-val">张哲</span></div>
<div class="fl-demo-field"><span class="fl-demo-lbl">性别</span><span class="fl-demo-val">男</span></div>
<div class="fl-demo-field"><span class="fl-demo-lbl">年龄</span><span class="fl-demo-val">17岁</span></div>
<div class="fl-demo-field"><span class="fl-demo-lbl">身份证</span><span class="fl-demo-val">620922****0027</span></div>
<div class="fl-demo-field"><span class="fl-demo-lbl">电话</span><span class="fl-demo-val">180****3606</span></div>
<div class="fl-demo-field"><span class="fl-demo-lbl">地址</span><span class="fl-demo-val">甘肃省陇南市</span></div>
</div>
</template>
<template #section-medical>
<div class="fl-demo-form fl-demo-form--1col">
<div class="fl-demo-field"><span class="fl-demo-lbl">主诉</span><span class="fl-demo-val">反复发热3天，体温最高39.2°C</span></div>
<div class="fl-demo-field"><span class="fl-demo-lbl">既往病史</span><span class="fl-demo-val">无特殊</span></div>
<div class="fl-demo-field"><span class="fl-demo-lbl">过敏史</span><span class="fl-demo-val"><span class="fl-demo-tag fl-demo-tag--danger">青霉素过敏</span></span></div>
</div>
</template>
</df-form-layout>
</div>
<template #code>

```vue
<DfFormLayout
  :show-quick-nav="false"
  :collapsible="true"
  :sections="[
    { key: 'info', title: '患者信息', collapsible: true },
    { key: 'medical', title: '病历信息', collapsible: true },
  ]"
>
  <template #section-info>
    <DfForm :fields="fields" v-model="form" :readonly="true" />
  </template>
  <template #section-medical>
    <DfForm :fields="medicalFields" v-model="form" />
  </template>
</DfFormLayout>
```

</template>
</DemoBlock>

## 入院登记表单

<DemoBlock title="住院患者入院登记">
<div class="fl-demo-frame fl-demo-frame--h520">
<df-form-layout class="fl-demo-layout" quick-nav-title="入院登记" style="height:100%;" :sections="admissionSections">
<template #section-patient>
<div class="fl-demo-form fl-demo-form--2col">
<div class="fl-demo-field"><span class="fl-demo-lbl">姓名</span><span class="fl-demo-val"><strong>王丽华</strong></span></div>
<div class="fl-demo-field"><span class="fl-demo-lbl">性别</span><span class="fl-demo-val">女</span></div>
<div class="fl-demo-field"><span class="fl-demo-lbl">身份证号</span><span class="fl-demo-val">620102198505122045</span></div>
<div class="fl-demo-field"><span class="fl-demo-lbl">出生日期</span><span class="fl-demo-val">1985-05-12</span></div>
<div class="fl-demo-field"><span class="fl-demo-lbl">民族</span><span class="fl-demo-val">汉族</span></div>
<div class="fl-demo-field"><span class="fl-demo-lbl">婚姻状况</span><span class="fl-demo-val">已婚</span></div>
<div class="fl-demo-field"><span class="fl-demo-lbl">职业</span><span class="fl-demo-val">教师</span></div>
<div class="fl-demo-field"><span class="fl-demo-lbl">联系电话</span><span class="fl-demo-val">138****5678</span></div>
</div>
</template>
<template #section-admission>
<div class="fl-demo-form fl-demo-form--2col">
<div class="fl-demo-field"><span class="fl-demo-lbl">入院科室</span><span class="fl-demo-val">呼吸内科</span></div>
<div class="fl-demo-field"><span class="fl-demo-lbl">入院病区</span><span class="fl-demo-val">内一科病区</span></div>
<div class="fl-demo-field"><span class="fl-demo-lbl">床号</span><span class="fl-demo-val">12床</span></div>
<div class="fl-demo-field"><span class="fl-demo-lbl">入院日期</span><span class="fl-demo-val">2025-03-15 09:30</span></div>
<div class="fl-demo-field"><span class="fl-demo-lbl">入院方式</span><span class="fl-demo-val">门诊转入</span></div>
<div class="fl-demo-field"><span class="fl-demo-lbl">主治医生</span><span class="fl-demo-val">王明 主任医师</span></div>
<div class="fl-demo-field"><span class="fl-demo-lbl">入院诊断</span><span class="fl-demo-val"><span class="fl-demo-tag fl-demo-tag--danger">社区获得性肺炎</span></span></div>
<div class="fl-demo-field"><span class="fl-demo-lbl">病情等级</span><span class="fl-demo-val"><span class="fl-demo-tag fl-demo-tag--warning">病重</span></span></div>
</div>
</template>
<template #section-insurance>
<div class="fl-demo-form fl-demo-form--2col">
<div class="fl-demo-field"><span class="fl-demo-lbl">医保类型</span><span class="fl-demo-val">城镇职工基本医疗保险</span></div>
<div class="fl-demo-field"><span class="fl-demo-lbl">社保卡号</span><span class="fl-demo-val">6201****8876</span></div>
<div class="fl-demo-field"><span class="fl-demo-lbl">参保地</span><span class="fl-demo-val">甘肃省兰州市</span></div>
<div class="fl-demo-field"><span class="fl-demo-lbl">报销比例</span><span class="fl-demo-val"><strong class="fl-demo-text--success">85%</strong></span></div>
</div>
</template>
<template #section-contact>
<div class="fl-demo-form fl-demo-form--2col">
<div class="fl-demo-field"><span class="fl-demo-lbl">联系人</span><span class="fl-demo-val">李强（配偶）</span></div>
<div class="fl-demo-field"><span class="fl-demo-lbl">联系电话</span><span class="fl-demo-val">139****1234</span></div>
<div class="fl-demo-field"><span class="fl-demo-lbl">联系地址</span><span class="fl-demo-val">甘肃省兰州市城关区东岗西路128号</span></div>
</div>
</template>
</df-form-layout>
</div>
<template #code>

```vue
<DfFormLayout
  quick-nav-title="入院登记"
  :sections="[
    { key: 'patient', title: '患者基本信息' },
    { key: 'admission', title: '入院信息' },
    { key: 'insurance', title: '医保信息' },
    { key: 'contact', title: '联系人信息' },
  ]"
>
  <template #section-patient>
    <DfForm :fields="patientFields" v-model="formData" />
  </template>
  <template #section-admission>
    <DfForm :fields="admissionFields" v-model="formData" />
  </template>
  <template #section-insurance>
    <DfForm :fields="insuranceFields" v-model="formData" />
  </template>
  <template #section-contact>
    <DfForm :fields="contactFields" v-model="formData" />
  </template>
</DfFormLayout>
```

</template>
</DemoBlock>

## 处方开具表单（带分组）

<DemoBlock title="门诊处方开具">
<div class="fl-demo-frame fl-demo-frame--h520">
<df-form-layout class="fl-demo-layout" quick-nav-title="处方信息" style="height:100%;" :sections="prescriptionSections">
<template #section-diagnosis>
<div class="fl-demo-form fl-demo-form--2col">
<div class="fl-demo-field"><span class="fl-demo-lbl">门诊号</span><span class="fl-demo-val">MZ2025032000842</span></div>
<div class="fl-demo-field"><span class="fl-demo-lbl">患者</span><span class="fl-demo-val"><strong>赵小明</strong> 男 32岁</span></div>
<div class="fl-demo-field"><span class="fl-demo-lbl">主诊断</span><span class="fl-demo-val"><span class="fl-demo-tag fl-demo-tag--primary">急性上呼吸道感染</span> <span class="fl-demo-note">J06.9</span></span></div>
<div class="fl-demo-field"><span class="fl-demo-lbl">过敏史</span><span class="fl-demo-val"><span class="fl-demo-tag fl-demo-tag--success">无</span></span></div>
</div>
</template>
<template #section-prescription>
<table class="fl-demo-tbl">
<thead>
<tr>
<th>药品名称</th>
<th>规格</th>
<th>数量</th>
<th>用法用量</th>
<th>天数</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>阿莫西林胶囊</strong></td>
<td>0.5g × 24粒/盒</td>
<td>2盒</td>
<td>0.5g po tid</td>
<td>7天</td>
</tr>
<tr>
<td><strong>复方氨酚烷胺片</strong></td>
<td>12片/盒</td>
<td>1盒</td>
<td>1片 po bid</td>
<td>3天</td>
</tr>
<tr>
<td><strong>盐酸氨溴索口服液</strong></td>
<td>100ml/瓶</td>
<td>1瓶</td>
<td>10ml po tid</td>
<td>7天</td>
</tr>
</tbody>
</table>
</template>
<template #section-advice>
<div class="fl-demo-form fl-demo-form--1col">
<div class="fl-demo-field"><span class="fl-demo-lbl">用药嘱托</span><span class="fl-demo-val">阿莫西林饭后服用，避免与酒精同服；多饮水，注意休息</span></div>
<div class="fl-demo-field"><span class="fl-demo-lbl">复诊建议</span><span class="fl-demo-val">用药3天后若症状未缓解请及时复诊</span></div>
<div class="fl-demo-field"><span class="fl-demo-lbl">注意事项</span><span class="fl-demo-val"><span class="fl-demo-tag fl-demo-tag--warning">肝肾功能不全者慎用</span></span></div>
</div>
</template>
<template #section-signature>
<div class="fl-demo-form fl-demo-form--2col">
<div class="fl-demo-field"><span class="fl-demo-lbl">开方医生</span><span class="fl-demo-val">王明 主任医师</span></div>
<div class="fl-demo-field"><span class="fl-demo-lbl">开方时间</span><span class="fl-demo-val">2025-03-20 14:35</span></div>
<div class="fl-demo-field"><span class="fl-demo-lbl">审核药师</span><span class="fl-demo-val"><span class="fl-demo-tag fl-demo-tag--info">待审核</span></span></div>
<div class="fl-demo-field"><span class="fl-demo-lbl">处方状态</span><span class="fl-demo-val"><span class="fl-demo-tag fl-demo-tag--warning">待审核</span></span></div>
</div>
</template>
</df-form-layout>
</div>
<template #code>

```vue
<DfFormLayout
  quick-nav-title="处方信息"
  :sections="[
    { key: 'diagnosis', title: '诊断信息' },
    { key: 'prescription', title: '药品处方' },
    { key: 'advice', title: '医嘱与嘱托' },
    { key: 'signature', title: '签名确认' },
  ]"
>
  <template #section-diagnosis>
    <DfForm :fields="diagnosisFields" v-model="formData" :readonly="true" />
  </template>
  <template #section-prescription>
    <DfTable :columns="drugColumns" :data-source="drugList" />
  </template>
  <template #section-advice>
    <DfForm :fields="adviceFields" v-model="formData" />
  </template>
  <template #section-signature>
    <DfForm :fields="signatureFields" v-model="formData" :readonly="true" />
  </template>
</DfFormLayout>
```

</template>
</DemoBlock>

## API

### Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `sections` | `FormSection[]` | `[]` | 表单分组定义 |
| `showQuickNav` | `boolean` | `true` | 是否显示右侧快速导航 |
| `quickNavTitle` | `string` | `'导航'` | 快速导航标题 |
| `collapsible` | `boolean` | `false` | 分组默认是否可折叠（可被 FormSection.collapsible 覆盖） |

### FormSection

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `key` | `string` | — | 分组唯一标识，用于插槽命名 |
| `title` | `string` | — | 分组标题 |
| `collapsible` | `boolean` | — | 该分组是否可折叠，未设置时继承 Props.collapsible |

### Events

无自定义事件。组件为纯布局容器，事件由内部插槽内容自行处理。

### Slots

| 插槽 | 说明 |
|------|------|
| `section-{key}` | 指定分组的表单内容（如 `section-basic`、`section-prescription`） |
| `section-header-{key}` | 指定分组自定义头部（替换默认标题） |
| `section-footer-{key}` | 指定分组自定义底部（如操作按钮栏） |
| `default` | 无 sections 时使用自定义内容（直接填充主区域） |

### Expose

| 属性/方法 | 类型 | 说明 |
|-----------|------|------|
| `activeSection` | `Ref<string>` | 当前激活的分组 key（由 IntersectionObserver 追踪） |
| `scrollToSection(key)` | `(key: string) => void` | 滚动到指定分组（smooth scroll） |

### 布局结构

```
┌──────────────────────────┬──────────┐
│  ┌─ 基础信息 ──────────┐ │ 导航      │
│  │ #section-basic      │ │ · 基础信息 │
│  └─────────────────────┘ │ · 职业信息 │
│  ┌─ 职业信息 ──────────┐ │ · 学历经历 │
│  │ #section-work       │ │          │
│  └─────────────────────┘ │          │
│  ┌─ 学历经历 ──────────┐ │          │
│  │ #section-edu        │ │          │
│  └─────────────────────┘ │          │
└──────────────────────────┴──────────┘

移动端(< 768px): 右侧导航自动隐藏
┌──────────────────────────┐
│  ┌─ 基础信息 ──────────┐ │
│  │ #section-basic      │ │
│  └─────────────────────┘ │
│  ┌─ 职业信息 ──────────┐ │
│  │ #section-work       │ │
│  └─────────────────────┘ │
└──────────────────────────┘
```

---

## 导入

```typescript
import { DfFormLayout } from 'df-web-base'
import type { DfFormLayoutProps, FormSection } from 'df-web-base'
```

<style scoped>
.fl-demo-frame {
  width: 100%;
  height: 100%;
  border: 1px solid #e8ebf0;
  border-radius: 4px;
  overflow: hidden;
  background: linear-gradient(180deg, #fafbfe 0%, #f3f6fb 100%);
}

.fl-demo-frame--h320 { height: 320px; }
.fl-demo-frame--h420 { height: 420px; }
.fl-demo-frame--h520 { height: 520px; }

.fl-demo-frame .df-form-layout { height: 100%; }

.fl-demo-layout {
  --df-color-primary: #2aa890;
}

.fl-demo-form {
  display: grid;
  gap: 12px;
}

.fl-demo-form--1col { grid-template-columns: 1fr; }
.fl-demo-form--2col { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.fl-demo-form--3col { grid-template-columns: repeat(3, minmax(0, 1fr)); }

.fl-demo-field {
  min-width: 0;
  display: grid;
  grid-template-columns: 96px minmax(0, 1fr);
  border: 1px solid #edf1f7;
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
}

.fl-demo-lbl {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 46px;
  padding: 10px 12px;
  background: #f6f8fc;
  color: #70809b;
  font-size: 13px;
}

.fl-demo-val {
  display: flex;
  align-items: center;
  min-height: 46px;
  padding: 10px 14px;
  color: #1f2a3d;
  font-size: 14px;
  line-height: 1.6;
  word-break: break-word;
}

.fl-demo-tag {
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
}

.fl-demo-tag--primary { background: #e6f7ff; color: #0c7ac9; }
.fl-demo-tag--success { background: #eaf8ef; color: #1c8b53; }
.fl-demo-tag--info { background: #eef3ff; color: #4a6fdc; }
.fl-demo-tag--warning { background: #fff4db; color: #bc7a00; }
.fl-demo-tag--danger { background: #ffe9e8; color: #c43e32; }

.fl-demo-note {
  margin-left: 8px;
  font-size: 12px;
  color: #6b7790;
}

.fl-demo-text--success {
  color: #1c8b53;
}

.fl-demo-tbl {
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  border: 1px solid #e7edf6;
  border-radius: 10px;
  overflow: hidden;
}

.fl-demo-tbl th,
.fl-demo-tbl td {
  padding: 10px 12px;
  border-bottom: 1px solid #e7edf6;
  text-align: left;
  font-size: 13px;
}

.fl-demo-tbl th {
  background: #f7f9fc;
  color: #516179;
  font-weight: 600;
}

.fl-demo-tbl tbody tr:last-child td {
  border-bottom: none;
}

@media (max-width: 768px) {
  .fl-demo-form--2col,
  .fl-demo-form--3col {
    grid-template-columns: 1fr;
  }

  .fl-demo-field {
    grid-template-columns: 84px minmax(0, 1fr);
  }
}
</style>
