# DfDashboardLayout 仪表盘布局

运营监管页面通用布局：顶部 KPI 指标条 + 统计卡片网格 + 图表区域。参考：运营监管-今日动态、医疗服务监管、院长驾驶舱。

## 基础用法

<DemoBlock title="标准仪表盘">
<div class="demo-frame demo-frame--h480">
<df-dashboard-layout style="height:100%;">
<template #kpi>
<div class="demo-grid demo-grid--3">
<div class="demo-stat">
<span class="demo-stat__value demo-text--primary">47.744 万</span>
<span class="demo-stat__label">全额收入</span>
</div>
<div class="demo-stat">
<span class="demo-stat__value demo-text--success">12</span>
<span class="demo-stat__label">在线服务数</span>
</div>
<div class="demo-stat">
<span class="demo-stat__value" style="color:#722ed1;">160</span>
<span class="demo-stat__label">医师数</span>
</div>
</div>
</template>
<template #cards>
<div class="demo-grid demo-grid--4">
<div class="demo-stat">
<span class="demo-stat__value">3,685</span>
<span class="demo-stat__label">住院药品收入(元)</span>
</div>
<div class="demo-stat">
<span class="demo-stat__value">17.14%</span>
<span class="demo-stat__label">住院药占比</span>
</div>
<div class="demo-stat">
<span class="demo-stat__value">681</span>
<span class="demo-stat__label">在院人数</span>
</div>
<div class="demo-stat">
<span class="demo-stat__value">13</span>
<span class="demo-stat__label">手术例数</span>
</div>
</div>
</template>
<template #charts>
<div class="demo-empty" style="min-height:120px;">就诊峰值图 (DfChart)</div>
<div class="demo-empty" style="min-height:120px;">门诊收入构成 (DfChart)</div>
</template>
</df-dashboard-layout>
</div>
<template #code>

```vue
<DfDashboardLayout>
  <template #kpi>
    <DfGridLayout :cols="3" :col-gap="12">
      <DfStatCard value="47.744 万" label="全额收入" variant="blue" />
      <DfStatCard value="12" label="在线服务数" variant="green" />
      <DfStatCard value="160" label="医师数" variant="purple" />
    </DfGridLayout>
  </template>

  <template #cards>
    <DfGridLayout :cols="4" :col-gap="12">
      <DfStatCard value="3,685" label="住院药品收入(元)" />
      <DfStatCard value="17.14%" label="住院药占比" />
      <DfStatCard value="681" label="在院人数" />
      <DfStatCard value="13" label="手术例数" />
    </DfGridLayout>
  </template>

  <template #charts>
    <DfChart :data="peakData" title="就诊峰值图" type="line" />
    <DfChart :data="pieData" title="门诊收入构成" type="pie" />
  </template>
</DfDashboardLayout>
```

</template>
</DemoBlock>

## 搭配 DfStatCard

DfStatCard 提供趋势、图标等增强展示能力，配合仪表盘使用效果最佳。

<DemoBlock title="DfStatCard 仪表盘">
<div class="demo-frame demo-frame--h300">
<df-dashboard-layout style="height:100%;">
<template #kpi>
<div class="demo-grid demo-grid--4">
<df-stat-card value="26.397" label="门诊收入(万元)" variant="blue" icon-text="&#x1F4B0;" style="flex:1;"></df-stat-card>
<df-stat-card value="21.347" label="住院收入(万元)" variant="green" icon-text="&#x1F3E5;" style="flex:1;"></df-stat-card>
<df-stat-card value="201" label="科室数" variant="purple" icon-text="&#x1F4CB;" :trend="5.2" style="flex:1;"></df-stat-card>
<df-stat-card value="160" label="医师数" variant="orange" icon-text="&#x1F468;&#x200D;&#x2695;&#xFE0F;" :trend="-2.1" style="flex:1;"></df-stat-card>
</div>
</template>
<template #cards>
<div class="demo-grid demo-grid--3">
<df-stat-card value="1914" label="挂号总人次" variant="default"></df-stat-card>
<df-stat-card value="2300" label="门诊人次" variant="default"></df-stat-card>
<df-stat-card value="104" label="出院人次" variant="default"></df-stat-card>
</div>
</template>
</df-dashboard-layout>
</div>
<template #code>

```vue
<DfDashboardLayout>
  <template #kpi>
    <DfGridLayout :cols="4" :col-gap="12">
      <DfStatCard value="26.397" label="门诊收入(万元)" variant="blue" icon-text="💰" />
      <DfStatCard value="21.347" label="住院收入(万元)" variant="green" icon-text="🏥" />
      <DfStatCard value="201" label="科室数" variant="purple" :trend="5.2" />
      <DfStatCard value="160" label="医师数" variant="orange" :trend="-2.1" />
    </DfGridLayout>
  </template>
  <template #cards>
    <DfGridLayout :cols="3" :col-gap="12">
      <DfStatCard value="1914" label="挂号总人次" />
      <DfStatCard value="2300" label="门诊人次" />
      <DfStatCard value="104" label="出院人次" />
    </DfGridLayout>
  </template>
  <template #charts>
    <DfChart :data="peakData" title="就诊峰值图" type="line" />
    <DfChart :data="pieData" title="门诊收入构成" type="pie" />
  </template>
</DfDashboardLayout>
```

</template>
</DemoBlock>

## 带筛选栏

通过 `filter` 插槽在 KPI 与卡片之间插入日期范围、科室等筛选条件。

<DemoBlock title="带筛选栏的仪表盘">
<div class="demo-frame demo-frame--h400">
<df-dashboard-layout style="height:100%;">
<template #kpi>
<div class="demo-grid demo-grid--4">
<div class="demo-stat">
<span class="demo-stat__value demo-text--success">1,914</span>
<span class="demo-stat__label">今日挂号人次</span>
</div>
<div class="demo-stat">
<span class="demo-stat__value">2,300</span>
<span class="demo-stat__label">今日门诊人次</span>
</div>
<div class="demo-stat">
<span class="demo-stat__value demo-text--danger">23</span>
<span class="demo-stat__label">急诊人次</span>
</div>
<div class="demo-stat">
<span class="demo-stat__value">681</span>
<span class="demo-stat__label">在院人数</span>
</div>
</div>
</template>
<template #filter>
<div class="demo-toolbar">
<label>统计日期</label>
<input type="date" value="2026-04-18" />
<label>科室</label>
<select><option>全院</option><option>内科</option><option>外科</option></select>
<button>查询</button>
</div>
</template>
<template #cards>
<div class="demo-grid demo-grid--3">
<div class="demo-stat">
<span class="demo-stat__value">47.7 万</span>
<span class="demo-stat__label">全额收入(万元)</span>
</div>
<div class="demo-stat">
<span class="demo-stat__value demo-text--warning">17.1%</span>
<span class="demo-stat__label">药占比</span>
</div>
<div class="demo-stat">
<span class="demo-stat__value demo-text--success">13</span>
<span class="demo-stat__label">手术例数</span>
</div>
</div>
</template>
<template #charts>
<div class="demo-empty" style="min-height:100px;">科室收入对比 (DfChart)</div>
<div class="demo-empty" style="min-height:100px;">门诊量趋势 (DfChart)</div>
</template>
</df-dashboard-layout>
</div>
<template #code>

```vue
<DfDashboardLayout>
  <template #kpi>
    <DfGridLayout :cols="4" :col-gap="12">
      <DfStatCard value="1,914" label="今日挂号人次" variant="green" />
      <DfStatCard value="2,300" label="今日门诊人次" />
      <DfStatCard value="23" label="急诊人次" variant="red" />
      <DfStatCard value="681" label="在院人数" />
    </DfGridLayout>
  </template>

  <template #filter>
    <DfDatePicker v-model="dateRange" type="daterange" />
    <DfSelect v-model="dept" :items="deptOptions" />
    <DfButton type="primary" size="small">查询</DfButton>
  </template>

  <template #cards>
    <DfGridLayout :cols="3" :col-gap="12">
      <DfStatCard value="47.7 万" label="全额收入(万元)" />
      <DfStatCard value="17.1%" label="药占比" variant="orange" />
      <DfStatCard value="13" label="手术例数" variant="green" />
    </DfGridLayout>
  </template>

  <template #charts>
    <DfChart :data="deptRevenue" title="科室收入对比" type="bar" />
    <DfChart :data="outpatientTrend" title="门诊量趋势" type="line" />
  </template>
</DfDashboardLayout>
```

</template>
</DemoBlock>

## 带数据表格

通过 `table` 插槽在图表下方追加数据明细表格，适合需要同时展示汇总和明细的监管场景。

<DemoBlock title="院长驾驶舱（带明细表）">
<div class="demo-frame demo-frame--h520">
<df-dashboard-layout style="height:100%;">
<template #kpi>
<div class="demo-grid demo-grid--4">
<div class="demo-stat">
<span class="demo-stat__value demo-text--primary">52.8 万</span>
<span class="demo-stat__label">本月收入</span>
</div>
<div class="demo-stat">
<span class="demo-stat__value demo-text--success">8,432</span>
<span class="demo-stat__label">门诊人次</span>
</div>
<div class="demo-stat">
<span class="demo-stat__value">342</span>
<span class="demo-stat__label">住院人次</span>
</div>
<div class="demo-stat">
<span class="demo-stat__value demo-text--danger">97.2%</span>
<span class="demo-stat__label">床位使用率</span>
</div>
</div>
</template>
<template #charts>
<div class="demo-empty" style="min-height:100px;">收入趋势图 (DfChart)</div>
<div class="demo-empty" style="min-height:100px;">病种分布 (DfChart)</div>
</template>
<template #table>
<table class="demo-tbl">
<thead><tr><th>科室</th><th class="demo-cell--right">收入(万)</th><th class="demo-cell--right">门诊人次</th><th class="demo-cell--right">住院人次</th><th class="demo-cell--right">药占比</th></tr></thead>
<tbody>
<tr><td>呼吸内科</td><td class="demo-cell--right">8.3</td><td class="demo-cell--right">1,205</td><td class="demo-cell--right">62</td><td class="demo-cell--right">19.2%</td></tr>
<tr><td>心内科</td><td class="demo-cell--right">7.6</td><td class="demo-cell--right">982</td><td class="demo-cell--right">55</td><td class="demo-cell--right">21.5%</td></tr>
<tr><td>骨科</td><td class="demo-cell--right">6.1</td><td class="demo-cell--right">756</td><td class="demo-cell--right">48</td><td class="demo-cell--right">12.8%</td></tr>
<tr><td>普外科</td><td class="demo-cell--right">5.9</td><td class="demo-cell--right">823</td><td class="demo-cell--right">41</td><td class="demo-cell--right">15.3%</td></tr>
<tr><td>儿科</td><td class="demo-cell--right">4.7</td><td class="demo-cell--right">1,430</td><td class="demo-cell--right">36</td><td class="demo-cell--right">22.1%</td></tr>
</tbody>
</table>
</template>
</df-dashboard-layout>
</div>
<template #code>

```vue
<DfDashboardLayout>
  <template #kpi>
    <DfGridLayout :cols="4" :col-gap="12">
      <DfStatCard value="52.8 万" label="本月收入" variant="blue" />
      <DfStatCard value="8,432" label="门诊人次" variant="green" />
      <DfStatCard value="342" label="住院人次" />
      <DfStatCard value="97.2%" label="床位使用率" variant="red" />
    </DfGridLayout>
  </template>

  <template #charts>
    <DfChart :data="revenueTrend" title="收入趋势图" type="line" />
    <DfChart :data="diseaseDist" title="病种分布" type="pie" />
  </template>

  <template #table>
    <DfTable :columns="deptColumns" :static-data="deptData" />
  </template>
</DfDashboardLayout>
```

</template>
</DemoBlock>

## 自定义图表列数

通过 `chartCols` 调整图表区列数。默认 2 列，可设置为 1 列（单图全宽）或 3 列（三图并排）。

<DemoBlock title="三列图表">
<div class="demo-frame demo-frame--h360">
<df-dashboard-layout :chart-cols="3" style="height:100%;">
<template #kpi>
<div class="demo-grid demo-grid--3">
<div class="demo-stat">
<span class="demo-stat__value demo-text--primary">1,914</span>
<span class="demo-stat__label">今日挂号</span>
</div>
<div class="demo-stat">
<span class="demo-stat__value demo-text--success">2,300</span>
<span class="demo-stat__label">今日门诊</span>
</div>
<div class="demo-stat">
<span class="demo-stat__value">104</span>
<span class="demo-stat__label">今日出院</span>
</div>
</div>
</template>
<template #charts>
<div class="demo-empty" style="min-height:100px;">门诊量趋势 (DfChart)</div>
<div class="demo-empty" style="min-height:100px;">收入构成 (DfChart)</div>
<div class="demo-empty" style="min-height:100px;">科室排名 (DfChart)</div>
</template>
</df-dashboard-layout>
</div>
<template #code>

```vue
<DfDashboardLayout :chart-cols="3">
  <template #kpi>
    <DfGridLayout :cols="3" :col-gap="12">
      <DfStatCard value="1,914" label="今日挂号" variant="blue" />
      <DfStatCard value="2,300" label="今日门诊" variant="green" />
      <DfStatCard value="104" label="今日出院" />
    </DfGridLayout>
  </template>
  <template #charts>
    <DfChart :data="outpatientData" title="门诊量趋势" type="line" />
    <DfChart :data="revenueData" title="收入构成" type="pie" />
    <DfChart :data="rankData" title="科室排名" type="bar" />
  </template>
</DfDashboardLayout>
```

</template>
</DemoBlock>

## API

### Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `chartCols` | `number` | `2` | 图表区列数，控制 `#charts` 插槽内 grid 列数。移动端自动降为 1 列 |

### Events

无自定义事件。组件为纯布局容器，交互逻辑由各插槽内子组件（DfStatCard、DfChart、DfTable 等）自行管理。

### Slots

| 插槽 | 说明 |
|------|------|
| `kpi` | 顶部 KPI 指标条，配合 DfGridLayout + DfStatCard |
| `filter` | KPI 下方的筛选栏，放置日期、科室等筛选条件 |
| `cards` | 中间统计卡片区，配合 DfGridLayout + DfStatCard |
| `charts` | 图表区，grid 布局，列数由 `chartCols` 控制，配合 DfChart |
| `table` | 底部数据表格区，配合 DfTable |
| `default` | 自定义内容区（仅当未提供 kpi/cards/charts 时生效） |

### TypeScript 类型

```typescript
import type { DfDashboardLayoutProps } from 'df-web-base'

interface DfDashboardLayoutProps {
  chartCols?: number
}
```

### 布局结构

```
┌──────────────────────────────────────┐
│  #kpi  (KPI 指标条，一行多卡片)        │
├──────────────────────────────────────┤
│  #filter (筛选栏，可选)               │
├──────────────────────────────────────┤
│  #cards (统计卡片网格)                │
├─────────────────┬────────────────────┤
│                 │                    │
│  #charts[0]     │  #charts[1]        │
│  (图表1)         │  (图表2)            │
│                 │                    │
├─────────────────┴────────────────────┤
│  #table (数据表格，可选)               │
└──────────────────────────────────────┘
```

---

## 导入

```typescript
import { DfDashboardLayout } from 'df-web-base'
import type { DfDashboardLayoutProps } from 'df-web-base'
```
