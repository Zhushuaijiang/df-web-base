# DfTimelineLayout 时间轴+详情布局

左侧详情面板 + 右侧时间轴。参考：360视图-时间轴、360视图-全生命周期。

## 基础用法

<DemoBlock title="患者就诊时间轴">
<div class="demo-frame demo-frame--h400">
<df-timeline-layout detail-width="55%" style="height:100%;">
<template #detailHeader>
患者信息
</template>
<template #detail>
<div class="demo-form demo-form--2col">
<div class="demo-field"><span class="demo-lbl">主诊断</span><span class="demo-val"><strong class="demo-text--danger">呼吸衰竭; 肺炎</strong></span></div>
<div class="demo-field"><span class="demo-lbl">诊断编码</span><span class="demo-val">J96.00</span></div>
<div class="demo-field"><span class="demo-lbl">主诉</span><span class="demo-val">咳嗽 咳痰伴发热2天</span></div>
<div class="demo-field"><span class="demo-lbl">既往史</span><span class="demo-val">无</span></div>
<div class="demo-field"><span class="demo-lbl">过敏史</span><span class="demo-val">无</span></div>
<div class="demo-field"><span class="demo-lbl">主治医生</span><span class="demo-val">王明 主任医师</span></div>
</div>
<div style="margin-top:12px; display:flex; gap:8px;">
<span class="demo-tag demo-tag--warning">待确认</span>
<span class="demo-tag demo-tag--danger">危重</span>
</div>
</template>
<template #timelineHeader>
就诊全生命周期
</template>
<template #timeline>
<div style="position:relative; padding-left:24px;">
<div style="position:absolute; left:8px; top:0; bottom:0; width:2px; background:#dcdfe6;"></div>
<div style="position:relative; padding:12px 0;">
<div style="position:absolute; left:-20px; top:16px; width:12px; height:12px; border-radius:50%; background:#1890ff; border:2px solid #fff; box-shadow:0 0 0 2px #1890ff;"></div>
<div style="font-size:12px; color:#909399; margin-bottom:4px;">2025-01-01 09:30</div>
<div style="background:#ecf5ff; border-radius:6px; padding:10px 14px;">
<div style="font-size:13px; font-weight:500; color:#1890ff;">入院</div>
<div style="font-size:12px; color:#606266; margin-top:4px;">呼吸内科 · 普通病房</div>
</div>
</div>
<div style="position:relative; padding:12px 0;">
<div style="position:absolute; left:-20px; top:16px; width:12px; height:12px; border-radius:50%; background:#52c41a; border:2px solid #fff; box-shadow:0 0 0 2px #52c41a;"></div>
<div style="font-size:12px; color:#909399; margin-bottom:4px;">2025-01-03 14:20</div>
<div style="background:#f0f9eb; border-radius:6px; padding:10px 14px;">
<div style="font-size:13px; font-weight:500; color:#52c41a;">医嘱执行</div>
<div style="font-size:12px; color:#606266; margin-top:4px;">头孢曲松钠 2g ivgtt bid</div>
</div>
</div>
<div style="position:relative; padding:12px 0;">
<div style="position:absolute; left:-20px; top:16px; width:12px; height:12px; border-radius:50%; background:#e6a23c; border:2px solid #fff; box-shadow:0 0 0 2px #e6a23c;"></div>
<div style="font-size:12px; color:#909399; margin-bottom:4px;">2025-01-08 10:00</div>
<div style="background:#fdf6ec; border-radius:6px; padding:10px 14px;">
<div style="font-size:13px; font-weight:500; color:#e6a23c;">出院</div>
<div style="font-size:12px; color:#606266; margin-top:4px;">出院后转入康复医院</div>
</div>
</div>
</div>
</template>
</df-timeline-layout>
</div>
<template #code>

```vue
<DfTimelineLayout detail-width="55%">
  <template #detailHeader>患者信息</template>
  <template #detail>
    <DfForm :fields="patientFields" :model="patientData" :readonly="true" />
  </template>
  <template #timelineHeader>就诊全生命周期</template>
  <template #timeline>
    <DfTimeline :events="timelineEvents" @select="onEventSelect" />
  </template>
</DfTimelineLayout>
```

</template>
</DemoBlock>

## 医嘱状态跟踪

<DemoBlock title="住院医嘱执行追踪">
<div class="demo-frame demo-frame--h420">
<df-timeline-layout detail-width="50%" style="height:100%;">
<template #detailHeader>
医嘱详情
</template>
<template #detail>
<div class="demo-form demo-form--2col">
<div class="demo-field"><span class="demo-lbl">医嘱号</span><span class="demo-val">YZ20250315-0042</span></div>
<div class="demo-field"><span class="demo-lbl">医嘱类型</span><span class="demo-val"><span class="demo-tag demo-tag--primary">长期医嘱</span></span></div>
<div class="demo-field"><span class="demo-lbl">药品名称</span><span class="demo-val"><strong>注射用头孢曲松钠</strong></span></div>
<div class="demo-field"><span class="demo-lbl">规格</span><span class="demo-val">1g/瓶</span></div>
<div class="demo-field"><span class="demo-lbl">用法用量</span><span class="demo-val">2g + NS 100ml ivgtt bid</span></div>
<div class="demo-field"><span class="demo-lbl">开嘱医生</span><span class="demo-val">王明 主任医师</span></div>
<div class="demo-field"><span class="demo-lbl">执行护士</span><span class="demo-val">李红 主管护师</span></div>
<div class="demo-field"><span class="demo-lbl">当前状态</span><span class="demo-val"><span class="demo-tag demo-tag--info">执行中</span></span></div>
</div>
</template>
<template #timelineHeader>
医嘱执行记录
</template>
<template #timeline>
<div style="position:relative; padding-left:24px;">
<div style="position:absolute; left:8px; top:0; bottom:0; width:2px; background:#dcdfe6;"></div>
<div style="position:relative; padding:10px 0;">
<div style="position:absolute; left:-20px; top:14px; width:12px; height:12px; border-radius:50%; background:#1890ff; border:2px solid #fff; box-shadow:0 0 0 2px #1890ff;"></div>
<div style="font-size:12px; color:#909399; margin-bottom:4px;">03-15 09:00</div>
<div style="background:#ecf5ff; border-radius:6px; padding:8px 12px;">
<div style="font-size:13px; font-weight:500; color:#1890ff;">开立医嘱</div>
<div style="font-size:12px; color:#606266; margin-top:2px;">王明 · 呼吸内科</div>
</div>
</div>
<div style="position:relative; padding:10px 0;">
<div style="position:absolute; left:-20px; top:14px; width:12px; height:12px; border-radius:50%; background:#52c41a; border:2px solid #fff; box-shadow:0 0 0 2px #52c41a;"></div>
<div style="font-size:12px; color:#909399; margin-bottom:4px;">03-15 09:15</div>
<div style="background:#f0f9eb; border-radius:6px; padding:8px 12px;">
<div style="font-size:13px; font-weight:500; color:#52c41a;">审核通过</div>
<div style="font-size:12px; color:#606266; margin-top:2px;">张华 副主任医师 · 皮试阴性</div>
</div>
</div>
<div style="position:relative; padding:10px 0;">
<div style="position:absolute; left:-20px; top:14px; width:12px; height:12px; border-radius:50%; background:#e6a23c; border:2px solid #fff; box-shadow:0 0 0 2px #e6a23c;"></div>
<div style="font-size:12px; color:#909399; margin-bottom:4px;">03-15 10:30</div>
<div style="background:#fdf6ec; border-radius:6px; padding:8px 12px;">
<div style="font-size:13px; font-weight:500; color:#e6a23c;">摆药完成</div>
<div style="font-size:12px; color:#606266; margin-top:2px;">药房 · 2瓶 × 1g</div>
</div>
</div>
<div style="position:relative; padding:10px 0;">
<div style="position:absolute; left:-20px; top:14px; width:12px; height:12px; border-radius:50%; background:#2aa890; border:2px solid #fff; box-shadow:0 0 0 2px #2aa890;"></div>
<div style="font-size:12px; color:#909399; margin-bottom:4px;">03-15 11:00</div>
<div style="background:#e8f5f3; border-radius:6px; padding:8px 12px;">
<div style="font-size:13px; font-weight:500; color:#2aa890;">执行中</div>
<div style="font-size:12px; color:#606266; margin-top:2px;">李红 · 首次执行</div>
</div>
</div>
</div>
</template>
</df-timeline-layout>
</div>
<template #code>

```vue
<DfTimelineLayout detail-width="50%">
  <template #detailHeader>医嘱详情</template>
  <template #detail>
    <DfForm :fields="orderFields" :model="orderData" :readonly="true" />
  </template>
  <template #timelineHeader>医嘱执行记录</template>
  <template #timeline>
    <DfTimeline :events="orderEvents" />
  </template>
</DfTimelineLayout>
```

</template>
</DemoBlock>

## 临床路径追踪

<DemoBlock title="肺炎临床路径追踪">
<div class="demo-frame demo-frame--h400">
<df-timeline-layout detail-width="50%" style="height:100%;">
<template #detailHeader>
临床路径: 社区获得性肺炎
</template>
<template #detail>
<div class="demo-form demo-form--1col">
<div class="demo-field"><span class="demo-lbl">路径编码</span><span class="demo-val">CPN-2025-003</span></div>
<div class="demo-field"><span class="demo-lbl">适用对象</span><span class="demo-val">社区获得性肺炎 (J18.9)</span></div>
<div class="demo-field"><span class="demo-lbl">标准住院日</span><span class="demo-val">7-14 天</span></div>
<div class="demo-field"><span class="demo-lbl">当前天数</span><span class="demo-val"><strong class="demo-text--warning">第 5 天</strong></span></div>
<div class="demo-field"><span class="demo-lbl">路径变异</span><span class="demo-val"><span class="demo-tag demo-tag--success">无变异</span></span></div>
<div class="demo-field"><span class="demo-lbl">完成进度</span><span class="demo-val" style="padding:7px 12px;">
<div style="background:#f0f2f5; border-radius:4px; height:8px; width:100%;"><div style="background:#2aa890; border-radius:4px; height:8px; width:36%;"></div></div>
<div style="font-size:12px; color:#6B7790; margin-top:4px;">已完成 5/14 天</div>
</span></div>
</div>
</template>
<template #timelineHeader>
路径节点
</template>
<template #timeline>
<div style="position:relative; padding-left:24px;">
<div style="position:absolute; left:8px; top:0; bottom:0; width:2px; background:#dcdfe6;"></div>
<div style="position:relative; padding:10px 0;">
<div style="position:absolute; left:-20px; top:14px; width:12px; height:12px; border-radius:50%; background:#52c41a; border:2px solid #fff; box-shadow:0 0 0 2px #52c41a;"></div>
<div style="font-size:12px; color:#909399; margin-bottom:4px;">第1天</div>
<div style="background:#f0f9eb; border-radius:6px; padding:8px 12px;">
<div style="font-size:13px; font-weight:500; color:#52c41a;">入院评估</div>
<div style="font-size:12px; color:#606266; margin-top:2px;">病史采集 · 体格检查 · 血常规+CRP</div>
</div>
</div>
<div style="position:relative; padding:10px 0;">
<div style="position:absolute; left:-20px; top:14px; width:12px; height:12px; border-radius:50%; background:#52c41a; border:2px solid #fff; box-shadow:0 0 0 2px #52c41a;"></div>
<div style="font-size:12px; color:#909399; margin-bottom:4px;">第2-3天</div>
<div style="background:#f0f9eb; border-radius:6px; padding:8px 12px;">
<div style="font-size:13px; font-weight:500; color:#52c41a;">辅助检查</div>
<div style="font-size:12px; color:#606266; margin-top:2px;">胸部CT · 痰培养 · 肝肾功能</div>
</div>
</div>
<div style="position:relative; padding:10px 0;">
<div style="position:absolute; left:-20px; top:14px; width:12px; height:12px; border-radius:50%; background:#1890ff; border:2px solid #fff; box-shadow:0 0 0 2px #1890ff;"></div>
<div style="font-size:12px; color:#909399; margin-bottom:4px;">第4-7天（当前）</div>
<div style="background:#ecf5ff; border-radius:6px; padding:8px 12px;">
<div style="font-size:13px; font-weight:500; color:#1890ff;">抗感染治疗</div>
<div style="font-size:12px; color:#606266; margin-top:2px;">头孢曲松钠 · 每日评估体温</div>
</div>
</div>
<div style="position:relative; padding:10px 0;">
<div style="position:absolute; left:-20px; top:14px; width:12px; height:12px; border-radius:50%; background:#d9d9d9; border:2px solid #fff; box-shadow:0 0 0 2px #d9d9d9;"></div>
<div style="font-size:12px; color:#909399; margin-bottom:4px;">第8-14天</div>
<div style="background:#f7f8fa; border-radius:6px; padding:8px 12px;">
<div style="font-size:13px; font-weight:500; color:#909399;">出院评估</div>
<div style="font-size:12px; color:#b3bac9; margin-top:2px;">复查指标 · 出院小结 · 带药</div>
</div>
</div>
</div>
</template>
</df-timeline-layout>
</div>
<template #code>

```vue
<DfTimelineLayout detail-width="50%">
  <template #detailHeader>临床路径: 社区获得性肺炎</template>
  <template #detail>
    <DfForm :fields="pathwayFields" :model="pathwayData" :readonly="true" />
  </template>
  <template #timelineHeader>路径节点</template>
  <template #timeline>
    <DfTimeline :events="pathwayEvents" />
  </template>
</DfTimelineLayout>
```

</template>
</DemoBlock>

## 自定义宽度与响应式

<DemoBlock title="自定义面板宽度">
<div class="demo-frame demo-frame--h360">
<df-timeline-layout detail-width="65%" style="height:100%;">
<template #detailHeader>
门诊病历
</template>
<template #detail>
<div class="demo-form demo-form--2col">
<div class="demo-field"><span class="demo-lbl">患者姓名</span><span class="demo-val">李秀英</span></div>
<div class="demo-field"><span class="demo-lbl">性别/年龄</span><span class="demo-val">女 / 56岁</span></div>
<div class="demo-field"><span class="demo-lbl">就诊科室</span><span class="demo-val">心内科门诊</span></div>
<div class="demo-field"><span class="demo-lbl">就诊医生</span><span class="demo-val">赵建国 副主任医师</span></div>
<div class="demo-field"><span class="demo-lbl">主诉</span><span class="demo-val">胸闷气短1周，加重2天</span></div>
<div class="demo-field"><span class="demo-lbl">初步诊断</span><span class="demo-val"><span class="demo-tag demo-tag--warning">冠状动脉粥样硬化性心脏病</span></span></div>
</div>
</template>
<template #timelineHeader>
就诊记录
</template>
<template #timeline>
<div style="position:relative; padding-left:24px;">
<div style="position:absolute; left:8px; top:0; bottom:0; width:2px; background:#dcdfe6;"></div>
<div style="position:relative; padding:10px 0;">
<div style="position:absolute; left:-20px; top:14px; width:12px; height:12px; border-radius:50%; background:#1890ff; border:2px solid #fff; box-shadow:0 0 0 2px #1890ff;"></div>
<div style="font-size:12px; color:#909399; margin-bottom:4px;">2025-03-20</div>
<div style="background:#ecf5ff; border-radius:6px; padding:8px 12px;">
<div style="font-size:13px; font-weight:500; color:#1890ff;">首诊</div>
<div style="font-size:12px; color:#606266; margin-top:2px;">心电图 · 血脂检查</div>
</div>
</div>
<div style="position:relative; padding:10px 0;">
<div style="position:absolute; left:-20px; top:14px; width:12px; height:12px; border-radius:50%; background:#e6a23c; border:2px solid #fff; box-shadow:0 0 0 2px #e6a23c;"></div>
<div style="font-size:12px; color:#909399; margin-bottom:4px;">2025-03-22</div>
<div style="background:#fdf6ec; border-radius:6px; padding:8px 12px;">
<div style="font-size:13px; font-weight:500; color:#e6a23c;">复诊</div>
<div style="font-size:12px; color:#606266; margin-top:2px;">冠脉CTA · 调整用药</div>
</div>
</div>
</div>
</template>
</df-timeline-layout>
</div>
<template #code>

```vue
<!-- 自定义面板宽度为 65% -->
<DfTimelineLayout detail-width="65%">
  <template #detailHeader>门诊病历</template>
  <template #detail>
    <DfForm :fields="fields" :model="data" :readonly="true" />
  </template>
  <template #timelineHeader>就诊记录</template>
  <template #timeline>
    <DfTimeline :events="visitEvents" />
  </template>
</DfTimelineLayout>
```

</template>
</DemoBlock>

## 响应式堆叠模式

<DemoBlock title="窄屏自动堆叠">
<div class="demo-frame demo-frame--h300">
<df-timeline-layout detail-width="55%" stack-breakpoint="1200" style="height:100%;">
<template #detailHeader>
手术排程
</template>
<template #detail>
<div class="demo-form demo-form--2col">
<div class="demo-field"><span class="demo-lbl">手术名称</span><span class="demo-val"><strong>腹腔镜胆囊切除术</strong></span></div>
<div class="demo-field"><span class="demo-lbl">手术医生</span><span class="demo-val">陈伟 主治医师</span></div>
<div class="demo-field"><span class="demo-lbl">麻醉方式</span><span class="demo-val">全身麻醉</span></div>
<div class="demo-field"><span class="demo-lbl">手术室</span><span class="demo-val">OR-03</span></div>
<div class="demo-field"><span class="demo-lbl">台次</span><span class="demo-val">第 2 台</span></div>
<div class="demo-field"><span class="demo-lbl">状态</span><span class="demo-val"><span class="demo-tag demo-tag--success">已完成</span></span></div>
</div>
</template>
<template #timelineHeader>
手术流程
</template>
<template #timeline>
<div style="position:relative; padding-left:24px;">
<div style="position:absolute; left:8px; top:0; bottom:0; width:2px; background:#dcdfe6;"></div>
<div style="position:relative; padding:8px 0;">
<div style="position:absolute; left:-20px; top:12px; width:10px; height:10px; border-radius:50%; background:#52c41a; border:2px solid #fff; box-shadow:0 0 0 2px #52c41a;"></div>
<div style="font-size:12px; color:#909399;">08:30 入室</div>
</div>
<div style="position:relative; padding:8px 0;">
<div style="position:absolute; left:-20px; top:12px; width:10px; height:10px; border-radius:50%; background:#52c41a; border:2px solid #fff; box-shadow:0 0 0 2px #52c41a;"></div>
<div style="font-size:12px; color:#909399;">09:00 麻醉</div>
</div>
<div style="position:relative; padding:8px 0;">
<div style="position:absolute; left:-20px; top:12px; width:10px; height:10px; border-radius:50%; background:#52c41a; border:2px solid #fff; box-shadow:0 0 0 2px #52c41a;"></div>
<div style="font-size:12px; color:#909399;">09:15 切皮</div>
</div>
<div style="position:relative; padding:8px 0;">
<div style="position:absolute; left:-20px; top:12px; width:10px; height:10px; border-radius:50%; background:#52c41a; border:2px solid #fff; box-shadow:0 0 0 2px #52c41a;"></div>
<div style="font-size:12px; color:#909399;">10:20 缝合</div>
</div>
<div style="position:relative; padding:8px 0;">
<div style="position:absolute; left:-20px; top:12px; width:10px; height:10px; border-radius:50%; background:#52c41a; border:2px solid #fff; box-shadow:0 0 0 2px #52c41a;"></div>
<div style="font-size:12px; color:#909399;">10:40 出室</div>
</div>
</div>
</template>
</df-timeline-layout>
</div>
<template #code>

```vue
<!-- stack-breakpoint: 窗口宽度低于此值(1200px)自动上下堆叠 -->
<DfTimelineLayout detail-width="55%" :stack-breakpoint="1200">
  <template #detailHeader>手术排程</template>
  <template #detail>
    <DfForm :fields="surgeryFields" :model="surgeryData" :readonly="true" />
  </template>
  <template #timelineHeader>手术流程</template>
  <template #timeline>
    <DfTimeline :events="surgeryEvents" />
  </template>
</DfTimelineLayout>
```

</template>
</DemoBlock>

## API

### Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `detailWidth` | `string` | `'55%'` | 详情面板宽度（桌面端），右侧时间轴自适应填充剩余空间 |
| `stackBreakpoint` | `number` | `768` | 响应式断点，窗口宽度低于此值时改为上下堆叠布局 |

### Events

无自定义事件。组件为纯布局容器，事件由内部插槽内容自行处理。

### Slots

| 插槽 | 说明 |
|------|------|
| `detailHeader` | 详情面板头部（蓝底白字，常用于显示患者/医嘱标题） |
| `detail` | 详情内容区域（表单、信息展示等） |
| `timelineHeader` | 时间轴头部标题栏 |
| `timeline` | 时间轴内容区域（配合 DfTimeline 组件使用） |

### Expose

| 属性/方法 | 类型 | 说明 |
|-----------|------|------|
| `isStacked` | `ComputedRef<boolean>` | 当前是否为堆叠模式 |

### 布局结构

```
┌───────────────────────┬──────────────────┐
│  Detail Header (蓝底)  │ Timeline Header  │
├───────────────────────┤──────────────────┤
│                       │  ● 2025-01-01    │
│   #detail             │    入院           │
│   (表单/信息)          │  ● 2025-01-03    │
│                       │    医嘱执行       │
│                       │  ● 2025-01-08    │
│                       │    出院           │
└───────────────────────┴──────────────────┘
    ← detailWidth →     ← 自适应(flex:1) →

窄屏(< stackBreakpoint) 自动变为:
┌─────────────────────────┐
│  Detail Header (蓝底)    │
│  #detail                │
│  (max-height: 45%)      │
├─────────────────────────┤
│  Timeline Header        │
│  #timeline              │
└─────────────────────────┘
```

---

## 导入

```typescript
import { DfTimelineLayout } from 'df-web-base'
import type { DfTimelineLayoutProps } from 'df-web-base'
```
