# DfPieChart 饼图

基于 DevExtreme 25.2 DxPieChart 封装，支持饼图和环形图，内置图例、标签、提示框等常用配置。

> 基于 **DxPieChart** 封装 | 来源：`devextreme-vue/pie-chart`

## 住院费用分布

<DemoBlock title="环形图 — 住院患者费用构成分析">
<div class="demo-frame demo-frame--h400">
  <div style="padding:16px;">
    <div class="demo-section">住院费用分布</div>
    <div style="display:flex; gap:24px; align-items:flex-start;">
      <div style="width:220px; height:220px; border-radius:50%; border:40px solid #5470c6; display:flex; align-items:center; justify-content:center; position:relative;">
        <div style="position:absolute; top:-40px; left:0; width:110px; height:110px; border-radius:50%; border:40px solid #91cc75; clip-path:polygon(0 0, 100% 0, 100% 100%, 0 100%);"></div>
        <span style="font-size:14px; color:#6B7790;">费用构成</span>
      </div>
      <div>
        <table class="demo-tbl">
          <thead>
            <tr><th>费用类别</th><th class="demo-cell--right">金额(元)</th><th class="demo-cell--right">占比</th></tr>
          </thead>
          <tbody>
            <tr><td>药品费</td><td class="demo-cell--right">3,500</td><td class="demo-cell--right"><span class="demo-text--strong">53.8%</span></td></tr>
            <tr><td>检查费</td><td class="demo-cell--right">1,200</td><td class="demo-cell--right">18.5%</td></tr>
            <tr><td>治疗费</td><td class="demo-cell--right">800</td><td class="demo-cell--right">12.3%</td></tr>
            <tr><td>床位费</td><td class="demo-cell--right">600</td><td class="demo-cell--right">9.2%</td></tr>
            <tr><td>其他</td><td class="demo-cell--right">400</td><td class="demo-cell--right">6.2%</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
<template #code>

```vue
<template>
  <df-pie-chart
    :data-source="feeData"
    argument-field="category"
    value-field="amount"
    title="住院费用分布"
    type="doughnut"
    :inner-radius="0.6"
    tooltip-format="fixedPoint"
    :height="400"
  />
</template>

<script setup lang="ts">
import { DfPieChart } from 'df-web-base'

const feeData = [
  { category: '药品费', amount: 3500 },
  { category: '检查费', amount: 1200 },
  { category: '治疗费', amount: 800 },
  { category: '床位费', amount: 600 },
  { category: '其他', amount: 400 },
]
</script>
```

</template>
</DemoBlock>

## 科室就诊占比（实心饼图）

<DemoBlock title="实心饼图 — 各科室门诊量占比">
<div class="demo-frame demo-frame--h360">
  <div style="padding:16px;">
    <div class="demo-section">今日门诊科室分布</div>
    <div style="display:flex; gap:8px; flex-wrap:wrap; padding-top:8px;">
      <span class="demo-tag demo-tag--info">内科 32%</span>
      <span class="demo-tag demo-tag--success">儿科 28%</span>
      <span class="demo-tag demo-tag--warning">外科 21%</span>
      <span class="demo-tag demo-tag--primary">妇产科 12%</span>
      <span class="demo-tag demo-tag--danger">骨科 7%</span>
    </div>
    <table class="demo-tbl" style="margin-top:8px;">
      <thead>
        <tr><th>科室</th><th class="demo-cell--right">人次</th><th class="demo-cell--right">占比</th></tr>
      </thead>
      <tbody>
        <tr><td>内科</td><td class="demo-cell--right">320</td><td class="demo-cell--right"><span class="demo-text--primary">32%</span></td></tr>
        <tr><td>儿科</td><td class="demo-cell--right">280</td><td class="demo-cell--right">28%</td></tr>
        <tr><td>外科</td><td class="demo-cell--right">210</td><td class="demo-cell--right">21%</td></tr>
        <tr><td>妇产科</td><td class="demo-cell--right">120</td><td class="demo-cell--right">12%</td></tr>
        <tr><td>骨科</td><td class="demo-cell--right">70</td><td class="demo-cell--right">7%</td></tr>
      </tbody>
    </table>
  </div>
</div>
<template #code>

```vue
<template>
  <df-pie-chart
    :data-source="deptData"
    argument-field="name"
    value-field="count"
    type="pie"
    title="今日门诊科室分布"
    legend-position="right"
    palette="Soft Pastel"
  />
</template>

<script setup lang="ts">
import { DfPieChart } from 'df-web-base'

const deptData = [
  { name: '内科', count: 320 },
  { name: '儿科', count: 280 },
  { name: '外科', count: 210 },
  { name: '妇产科', count: 120 },
  { name: '骨科', count: 70 },
]
</script>
```

</template>
</DemoBlock>

## 医保结算统计（环形图 + 中心内容）

通过 `center` 插槽在环形图中心放置汇总数据。

<DemoBlock title="环形图中心显示汇总金额">
<div class="demo-frame demo-frame--h360">
  <div style="padding:16px;">
    <div class="demo-section">医保结算统计</div>
    <div style="display:flex; gap:24px; align-items:center;">
      <div style="width:180px; height:180px; border-radius:50%; border:30px solid #5470c6; display:flex; align-items:center; justify-content:center; position:relative;">
        <div style="text-align:center;">
          <div style="font-size:20px; font-weight:600; color:#1A1A1A;">1,286</div>
          <div style="font-size:12px; color:#6B7790;">结算人次</div>
        </div>
      </div>
      <div>
        <div class="demo-form demo-form--1col">
          <div class="demo-field">
            <span class="demo-lbl">职工医保</span>
            <span class="demo-val"><span class="demo-text--success">625 人次</span> (48.6%)</span>
          </div>
          <div class="demo-field">
            <span class="demo-lbl">居民医保</span>
            <span class="demo-val"><span class="demo-text--primary">412 人次</span> (32.0%)</span>
          </div>
          <div class="demo-field">
            <span class="demo-lbl">新农合</span>
            <span class="demo-val">168 人次 (13.1%)</span>
          </div>
          <div class="demo-field">
            <span class="demo-lbl">自费</span>
            <span class="demo-val">81 人次 (6.3%)</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<template #code>

```vue
<template>
  <df-pie-chart
    :data-source="insuranceData"
    argument-field="type"
    value-field="count"
    :inner-radius="0.7"
    :height="360"
  >
    <template #center>
      <div style="text-align: center">
        <div style="font-size: 24px; font-weight: bold">1,286</div>
        <div style="color: #6B7790; font-size: 12px">结算人次</div>
      </div>
    </template>
  </df-pie-chart>
</template>

<script setup lang="ts">
import { DfPieChart } from 'df-web-base'

const insuranceData = [
  { type: '职工医保', count: 625 },
  { type: '居民医保', count: 412 },
  { type: '新农合', count: 168 },
  { type: '自费', count: 81 },
]
</script>
```

</template>
</DemoBlock>

## 隐藏标签 + 自定义调色板

<DemoBlock title="隐藏标签后通过图例查看数据">
<div class="demo-frame demo-frame--h300">
  <div style="padding:16px;">
    <div class="demo-section">患者来源统计（标签隐藏模式）</div>
    <div style="display:flex; gap:8px; flex-wrap:wrap; padding-top:8px;">
      <span class="demo-tag" style="background:#5470c6; color:#fff;">本区居民 45%</span>
      <span class="demo-tag" style="background:#91cc75; color:#fff;">外区转诊 22%</span>
      <span class="demo-tag" style="background:#fac858; color:#fff;">急诊入院 18%</span>
      <span class="demo-tag" style="background:#ee6666; color:#fff;">体检入院 10%</span>
      <span class="demo-tag" style="background:#73c0de; color:#fff;">其他 5%</span>
    </div>
    <div style="padding-top:8px; color:#6B7790; font-size:12px;">
      提示：标签已隐藏，通过图例或悬停提示查看数据
    </div>
  </div>
</div>
<template #code>

```vue
<template>
  <df-pie-chart
    :data-source="sourceData"
    argument-field="name"
    value-field="value"
    :label-visible="false"
    :palette="['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de']"
    :export-enabled="true"
    title="患者来源统计"
  />
</template>

<script setup lang="ts">
import { DfPieChart } from 'df-web-base'

const sourceData = [
  { name: '本区居民', value: 45 },
  { name: '外区转诊', value: 22 },
  { name: '急诊入院', value: 18 },
  { name: '体检入院', value: 10 },
  { name: '其他', value: 5 },
]
</script>
```

</template>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| dataSource | 饼图数据源 | `any[]` | **必填** |
| argumentField | 分类字段名（扇区标签） | `string` | `'arg'` |
| valueField | 值字段名（扇区大小） | `string` | `'val'` |
| title | 图表标题 | `string` | -- |
| palette | 调色板名称或自定义颜色数组 | `string \| string[]` | `'Material'` |
| type | 图表类型：实心饼图或环形图 | `'pie' \| 'doughnut'` | `'doughnut'` |
| innerRadius | 环形图内半径比例（0~1），仅 `type='doughnut'` 有效 | `number` | `0.6` |
| showLegend | 是否显示图例 | `boolean` | `true` |
| legendPosition | 图例位置 | `'top' \| 'bottom' \| 'left' \| 'right'` | `'bottom'` |
| tooltipEnabled | 是否启用提示框 | `boolean` | `true` |
| tooltipFormat | 提示框值格式化 | `string \| object` | -- |
| labelVisible | 是否显示扇区标签 | `boolean` | `true` |
| labelFormat | 标签值格式化 | `string \| object` | -- |
| labelConnector | 是否显示标签连接线 | `boolean` | `true` |
| height | 图表高度 | `number \| string` | `400` |
| width | 图表宽度 | `number \| string` | `'100%'` |
| animation | 是否启用入场动画 | `boolean` | `true` |
| exportEnabled | 是否显示导出按钮 | `boolean` | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| point-click | 扇区被点击 | `(e: { target: { data, argument, value, percent } })` |
| legend-click | 图例项被点击 | `(e: { target: { name, isVisible } })` |
| done | 图表渲染完成 | `(e: { component })` |

### Methods（通过 ref 调用）

| 方法名 | 说明 | 参数 |
|--------|------|------|
| getInstance() | 获取 DevExtreme DxPieChart 原生实例 | -- |
| refresh() | 强制刷新图表 | -- |

### Slots

| 名称 | 说明 |
|------|------|
| center | 环形图中心区域自定义内容（仅 `type='doughnut'` 有效） |

## 引入方式

```typescript
import { DfPieChart } from 'df-web-base'
import type { DfPieChartProps } from 'df-web-base'
```

## 与 DevExtreme DxPieChart 的差异

| 特性 | DxPieChart | DfPieChart |
|------|-----------|-----------|
| 系列配置 | `<DxSeries>` 子组件 | `argumentField` + `valueField` props |
| 图例 | `<DxLegend>` 子组件 | `showLegend` + `legendPosition` props |
| 标签 | `<DxLabel>` 嵌套子组件 | `labelVisible` + `labelFormat` props |
| 中心模板 | `centerTemplate` prop | `center` 具名插槽 |

DfPieChart 将常用配置扁平化为 props，只保留单系列饼图场景。如需多系列或更复杂配置，通过 `getInstance()` 获取原生实例操作。
