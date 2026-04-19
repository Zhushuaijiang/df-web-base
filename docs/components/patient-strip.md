# DfPatientStrip 患者信息条

用于 HIS 系统全局展示当前患者基本信息，适用于所有涉及患者业务的页面顶部。

## 基础用法

<DemoBlock title="基础用法">

<df-patient-strip :patient='{ name: "张三", gender: "男", age: "45岁", bedNo: "12-03", department: "呼吸内科", diagnosis: "社区获得性肺炎" }' style="border:1px solid #e3e3e3; border-radius:4px;"></df-patient-strip>

<template #code>

```vue
<DfPatientStrip :patient="patient" />
```

</template>
</DemoBlock>

## 带标签和过敏

<DemoBlock title="标签 + 过敏信息">

<df-patient-strip :patient='{ name: "李四", gender: "女", age: "62岁", bedNo: "08-15", admissionNo: "ZY20240056", department: "心内科", diagnosis: "冠状动脉粥样硬化性心脏病", insuranceType: "城镇职工医保", allergy: "青霉素类、头孢类", tags: [{text:"在院",type:"success"},{text:"医保",type:"info"},{text:"病危",type:"danger"}] }' style="border:1px solid #e3e3e3; border-radius:4px;"></df-patient-strip>

<template #code>

```vue
<DfPatientStrip :patient="patient" />
```

</template>
</DemoBlock>

## 紧凑模式

<DemoBlock title="紧凑模式（默认）">

<df-patient-strip compact :patient='{ name: "王五", gender: "男", age: "38岁", bedNo: "05-21", department: "骨科", diagnosis: "左股骨颈骨折" }' style="border:1px solid #e3e3e3; border-radius:4px;"></df-patient-strip>

<template #code>

```vue
<DfPatientStrip compact :patient="patient" />
```

</template>
</DemoBlock>

## 自定义扩展

<DemoBlock title="自定义扩展内容">

<df-patient-strip :patient='{ name: "赵六", gender: "男", age: "55岁", department: "消化内科", diagnosis: "急性胰腺炎" }' style="border:1px solid #e3e3e3; border-radius:4px;">
<template #extra>
<span style="margin-left:12px; padding:2px 8px; background:#fff7e6; color:#faad14; border-radius:3px; font-size:11px;">待手术</span>
</template>
</df-patient-strip>

<template #code>

```vue
<DfPatientStrip :patient="patient">
  <template #extra>
    <DfTag type="warning">待手术</DfTag>
  </template>
</DfPatientStrip>
```

</template>
</DemoBlock>

## API

### Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `patient` | `PatientInfo` | — (必填) | 患者信息对象 |
| `compact` | `boolean` | `true` | 紧凑模式（36px 高度） |
| `clickable` | `boolean` | `false` | 是否可点击 |

### PatientInfo

| 字段 | 类型 | 说明 |
|------|------|------|
| `name` | `string` | 患者姓名（必填） |
| `gender` | `string` | 性别 |
| `age` | `string` | 年龄 |
| `bedNo` | `string` | 床号 |
| `admissionNo` | `string` | 住院号 |
| `outpatientNo` | `string` | 门诊号 |
| `department` | `string` | 科室 |
| `diagnosis` | `string` | 诊断 |
| `insuranceType` | `string` | 医保类型 |
| `allergy` | `string` | 过敏信息 |
| `doctor` | `string` | 主治医师 |
| `admissionDate` | `string` | 入院日期 |
| `tags` | `Array<{ text: string; type?: 'success' \| 'warning' \| 'danger' \| 'info' }>` | 自定义标签 |

### Events

| 事件 | 回调参数 | 说明 |
|------|---------|------|
| `click` | `(patient: PatientInfo)` | 点击患者条（需 `clickable` 为 true） |

### Slots

| 插槽 | 说明 |
|------|------|
| `extra` | 右侧扩展内容区 |
| `allergy` | 自定义过敏信息展示 |

---

## 导入

```typescript
import { DfPatientStrip } from 'df-web-base'
import type { DfPatientStripProps, PatientInfo } from 'df-web-base'
```
