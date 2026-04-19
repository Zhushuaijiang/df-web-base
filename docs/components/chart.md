# DfChart 图表

基于 DevExtreme 25.2 DxChart 封装，支持折线图、柱状图、面积图等多种图表类型，内置常用配置简化开发。

> 基于 **DxChart** 封装 | 来源：`devextreme-vue/chart`

## 门诊就诊量统计

<DemoBlock title="科室就诊量对比（多系列柱状图）">
<div class="demo-frame demo-frame--h400">
  <div style="padding:16px;">
    <div class="demo-section">各科室就诊量统计</div>
    <table class="demo-tbl">
      <thead>
        <tr><th>科室</th><th>门诊</th><th>住院</th><th>急诊</th></tr>
      </thead>
      <tbody>
        <tr><td>内科</td><td>320</td><td>85</td><td>42</td></tr>
        <tr><td>外科</td><td>210</td><td>120</td><td>38</td></tr>
        <tr><td>儿科</td><td>280</td><td>45</td><td>65</td></tr>
        <tr><td>妇产科</td><td>190</td><td>78</td><td>22</td></tr>
        <tr><td>骨科</td><td>150</td><td>95</td><td>30</td></tr>
      </tbody>
    </table>
  </div>
</div>
<template #code>

```vue
<template>
  <df-chart
    :data-source="deptData"
    :series="[
      { valueField: 'menzhen', name: '门诊', type: 'bar' },
      { valueField: 'zhuyuan', name: '住院', type: 'bar' },
      { valueField: 'jizhen', name: '急诊', type: 'bar' },
    ]"
    argument-field="department"
    title="各科室就诊量统计"
    palette="Soft Pastel"
    :height="400"
  />
</template>

<script setup lang="ts">
import { DfChart } from 'df-web-base'

const deptData = [
  { department: '内科', menzhen: 320, zhuyuan: 85, jizhen: 42 },
  { department: '外科', menzhen: 210, zhuyuan: 120, jizhen: 38 },
  { department: '儿科', menzhen: 280, zhuyuan: 45, jizhen: 65 },
  { department: '妇产科', menzhen: 190, zhuyuan: 78, jizhen: 22 },
  { department: '骨科', menzhen: 150, zhuyuan: 95, jizhen: 30 },
]
</script>
```

</template>
</DemoBlock>

## 费用趋势分析

<DemoBlock title="住院费用月度趋势（面积图 + 折线对比）">
<div class="demo-frame demo-frame--h360">
  <div style="padding:16px;">
    <div class="demo-section">月度费用趋势对比</div>
    <table class="demo-tbl">
      <thead>
        <tr><th>月份</th><th>实际费用(万)</th><th>预算(万)</th></tr>
      </thead>
      <tbody>
        <tr><td>1月</td><td>285</td><td>300</td></tr>
        <tr><td>2月</td><td>243</td><td>280</td></tr>
        <tr><td>3月</td><td>312</td><td>310</td></tr>
        <tr><td>4月</td><td>298</td><td>305</td></tr>
        <tr><td>5月</td><td>326</td><td>310</td></tr>
        <tr><td>6月</td><td>351</td><td>320</td></tr>
      </tbody>
    </table>
  </div>
</div>
<template #code>

```vue
<template>
  <df-chart
    :data-source="trendData"
    :series="[
      { valueField: 'actual', name: '实际费用', type: 'area' },
      { valueField: 'target', name: '预算', type: 'spline' },
    ]"
    argument-field="month"
    title="住院费用月度趋势"
    :crosshair-enabled="true"
    :zoom-enabled="true"
    legend-position="top"
    tooltip-format="currency"
    value-axis-label="万元"
    :height="360"
  />
</template>

<script setup lang="ts">
import { DfChart } from 'df-web-base'

const trendData = [
  { month: '1月', actual: 285, target: 300 },
  { month: '2月', actual: 243, target: 280 },
  { month: '3月', actual: 312, target: 310 },
  { month: '4月', actual: 298, target: 305 },
  { month: '5月', actual: 326, target: 310 },
  { month: '6月', actual: 351, target: 320 },
]
</script>
```

</template>
</DemoBlock>

## 医保费用构成（堆叠柱状图）

<DemoBlock title="按月份展示医保/自费/其他费用构成">
<div class="demo-frame demo-frame--h360">
  <div style="padding:16px;">
    <div class="demo-section">费用构成堆叠分析</div>
    <table class="demo-tbl">
      <thead>
        <tr><th>月份</th><th>医保</th><th>自费</th><th>其他</th></tr>
      </thead>
      <tbody>
        <tr><td>1月</td><td class="demo-cell--right">180</td><td class="demo-cell--right">75</td><td class="demo-cell--right">30</td></tr>
        <tr><td>2月</td><td class="demo-cell--right">156</td><td class="demo-cell--right">62</td><td class="demo-cell--right">25</td></tr>
        <tr><td>3月</td><td class="demo-cell--right">210</td><td class="demo-cell--right">72</td><td class="demo-cell--right">30</td></tr>
        <tr><td>4月</td><td class="demo-cell--right">195</td><td class="demo-cell--right">68</td><td class="demo-cell--right">35</td></tr>
      </tbody>
    </table>
    <div style="padding-top:8px;">
      <span class="demo-tag demo-tag--info">医保</span>
      <span class="demo-tag demo-tag--success">自费</span>
      <span class="demo-tag demo-tag--warning">其他</span>
    </div>
  </div>
</div>
<template #code>

```vue
<template>
  <df-chart
    :data-source="feeData"
    :series="[
      { valueField: 'yibao', name: '医保', type: 'stackedbar' },
      { valueField: 'zifei', name: '自费', type: 'stackedbar' },
      { valueField: 'other', name: '其他', type: 'stackedbar' },
    ]"
    argument-field="month"
    title="住院费用构成（万元）"
    :export-enabled="true"
  />
</template>

<script setup lang="ts">
import { DfChart } from 'df-web-base'

const feeData = [
  { month: '1月', yibao: 180, zifei: 75, other: 30 },
  { month: '2月', yibao: 156, zifei: 62, other: 25 },
  { month: '3月', yibao: 210, zifei: 72, other: 30 },
  { month: '4月', yibao: 195, zifei: 68, other: 35 },
]
</script>
```

</template>
</DemoBlock>

## 药品使用量排名（旋转条形图）

设置 `rotated` 使图表横向展示，适合排名类数据。

<DemoBlock title="药品使用量 Top 8（横向柱状图）">
<div class="demo-frame demo-frame--h420">
  <div style="padding:16px;">
    <div class="demo-section">本月药品使用量排名</div>
    <table class="demo-tbl">
      <thead>
        <tr><th>药品名称</th><th class="demo-cell--right">使用量(盒)</th></tr>
      </thead>
      <tbody>
        <tr><td>阿莫西林胶囊</td><td class="demo-cell--right"><span class="demo-text--strong">2,856</span></td></tr>
        <tr><td>布洛芬缓释胶囊</td><td class="demo-cell--right">2,340</td></tr>
        <tr><td>头孢克洛片</td><td class="demo-cell--right">1,985</td></tr>
        <tr><td>奥美拉唑肠溶胶囊</td><td class="demo-cell--right">1,762</td></tr>
        <tr><td>氯雷他定片</td><td class="demo-cell--right">1,543</td></tr>
        <tr><td>阿托伐他汀钙片</td><td class="demo-cell--right">1,321</td></tr>
        <tr><td>硝苯地平控释片</td><td class="demo-cell--right">1,105</td></tr>
        <tr><td>二甲双胍片</td><td class="demo-cell--right">987</td></tr>
      </tbody>
    </table>
  </div>
</div>
<template #code>

```vue
<template>
  <df-chart
    :data-source="drugData"
    :series="[{ valueField: 'count', name: '使用量(盒)', type: 'bar', color: '#2AA890' }]"
    argument-field="name"
    :rotated="true"
    title="本月药品使用量 Top 8"
    :height="420"
    :scroll-enabled="true"
  />
</template>

<script setup lang="ts">
import { DfChart } from 'df-web-base'

const drugData = [
  { name: '阿莫西林胶囊', count: 2856 },
  { name: '布洛芬缓释胶囊', count: 2340 },
  { name: '头孢克洛片', count: 1985 },
  { name: '奥美拉唑肠溶胶囊', count: 1762 },
  { name: '氯雷他定片', count: 1543 },
  { name: '阿托伐他汀钙片', count: 1321 },
  { name: '硝苯地平控释片', count: 1105 },
  { name: '二甲双胍片', count: 987 },
]
</script>
```

</template>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| dataSource | 图表数据源 | `any[]` | **必填** |
| series | 系列配置数组 | `DfChartSeries[]` | **必填** |
| argumentField | 参数轴字段名（X 轴） | `string` | `'arg'` |
| title | 图表标题 | `string` | -- |
| palette | 调色板名称或自定义颜色数组。内置：`'Material'` `'Soft Pastel'` `'Harmony Light'` `'Pastel'` `'Bright'` `'Soft'` `'Ocean'` `'Office'` `'Vintage'` `'Violet'` `'Carmine'` `'Dark Moon'` `'Soft Blue'` `'Dark Violet'` `'Green Mist'` | `string \| string[]` | `'Material'` |
| rotated | 是否旋转图表（横向柱状图） | `boolean` | `false` |
| showLegend | 是否显示图例 | `boolean` | `true` |
| legendPosition | 图例位置 | `'top' \| 'bottom' \| 'left' \| 'right'` | `'bottom'` |
| tooltipEnabled | 是否启用数据点提示 | `boolean` | `true` |
| tooltipFormat | 提示框值格式化 | `string \| object` | -- |
| argumentAxisLabel | X 轴标签文本 | `string` | -- |
| valueAxisLabel | Y 轴标签文本 | `string` | -- |
| valueAxisFormat | Y 轴值格式化 | `string \| object` | -- |
| height | 图表高度 | `number \| string` | `400` |
| width | 图表宽度 | `number \| string` | `'100%'` |
| animation | 是否启用入场动画 | `boolean` | `true` |
| crosshairEnabled | 是否启用十字线（鼠标悬停时显示辅助线） | `boolean` | `false` |
| zoomEnabled | 是否允许鼠标滚轮缩放 | `boolean` | `false` |
| scrollEnabled | 是否允许拖拽滚动 | `boolean` | `false` |
| exportEnabled | 是否显示导出按钮（PNG/SVG/PDF） | `boolean` | `false` |

### DfChartSeries 类型

系列配置对象，定义每条数据线/柱的展示方式。

```typescript
interface DfChartSeries {
  /** 数据源中对应的值字段名 */
  valueField: string
  /** 系列名称（图例显示文本） */
  name?: string
  /** 图表类型 */
  type?: 'line' | 'bar' | 'area' | 'scatter' | 'spline' | 'stepline' | 'stackedbar' | 'fullstackedbar'
  /** 指定系列颜色 */
  color?: string
  /** 多值轴时指定轴名称 */
  axis?: string
  /** 数据标签配置 */
  label?: {
    visible?: boolean
    format?: string | object
  }
}
```

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| point-click | 数据点被点击 | `(e: { target: { data, series, argument, value } })` |
| legend-click | 图例项被点击 | `(e: { target: { name, isVisible } })` |
| done | 图表渲染完成 | `(e: { component })` |

### Methods（通过 ref 调用）

| 方法名 | 说明 | 参数 |
|--------|------|------|
| getInstance() | 获取 DevExtreme DxChart 原生实例，可调用所有 DxChart 底层方法 | -- |
| refresh() | 强制刷新图表（重新渲染） | -- |

### Slots

本组件无具名插槽。

## 引入方式

```typescript
import { DfChart } from 'df-web-base'
import type { DfChartProps, DfChartSeries } from 'df-web-base'
```

全量注册后可直接在模板中使用 `<df-chart>`。

## 与 DevExtreme DxChart 的差异

| 特性 | DxChart | DfChart |
|------|---------|---------|
| 系列配置 | 嵌套子组件 `<DxSeries>` | 扁平 `series` 数组 prop |
| 图例 | `<DxLegend>` 子组件 | `showLegend` + `legendPosition` props |
| 提示框 | `<DxTooltip>` 子组件 | `tooltipEnabled` + `tooltipFormat` props |
| 缩放/滚动 | `<DxZoomAndPan>` 子组件 | `zoomEnabled` + `scrollEnabled` props |
| 导出 | `<DxExport>` 子组件 | `exportEnabled` prop |
| 调色板 | `palette` prop | 相同 |

DfChart 将常用的嵌套子组件配置提升为顶层 props，简化使用。如需更高级的 DxChart 功能，可通过 `getInstance()` 获取原生实例。
