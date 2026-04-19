# DfStatCard 统计指标卡片

仪表盘高频组件：图标 + 数值 + 标签 + 可选趋势。参考：运营监管-今日动态（住院药品收入、住院药占比、手术例数等）。

## 基础用法

<DemoBlock title="6种颜色变体">
<div style="display:grid; grid-template-columns:repeat(3,1fr); gap:12px;">
<df-stat-card value="47,744" label="全额收入(元)" variant="blue" icon-text="💰"></df-stat-card>
<df-stat-card value="681" label="在院人数" variant="green" icon-text="👥"></df-stat-card>
<df-stat-card value="13" label="手术例数" variant="orange" icon-text="🔪"></df-stat-card>
<df-stat-card value="17.14%" label="住院药占比" variant="red" icon-text="💊"></df-stat-card>
<df-stat-card value="160" label="医师数" variant="purple" icon-text="👨‍⚕️"></df-stat-card>
<df-stat-card value="201" label="科室数" variant="default" icon-text="🏠"></df-stat-card>
</div>
<template #code>

```vue
<DfGridLayout :cols="3" :col-gap="12" :row-gap="12">
  <DfStatCard value="47,744" label="全额收入(元)" variant="blue" icon-text="💰" />
  <DfStatCard value="681" label="在院人数" variant="green" icon-text="👥" />
  <DfStatCard value="13" label="手术例数" variant="orange" icon-text="🔪" />
  <DfStatCard value="17.14%" label="住院药占比" variant="red" icon-text="💊" />
  <DfStatCard value="160" label="医师数" variant="purple" icon-text="👨‍⚕️" />
  <DfStatCard value="201" label="科室数" icon-text="🏠" />
</DfGridLayout>
```

</template>
</DemoBlock>

## 带趋势指标

<DemoBlock title="趋势箭头">
<div style="display:grid; grid-template-columns:repeat(4,1fr); gap:12px;">
<df-stat-card value="26.397" label="门诊收入(万元)" variant="blue" :trend="12.5"></df-stat-card>
<df-stat-card value="21.347" label="住院收入(万元)" variant="green" :trend="-3.2"></df-stat-card>
<df-stat-card value="1914" label="挂号总人次" variant="default" :trend="8.1"></df-stat-card>
<df-stat-card value="104" label="出院人次" variant="default" :trend="-1.5"></df-stat-card>
</div>
<template #code>

```vue
<DfGridLayout :cols="4" :col-gap="12">
  <DfStatCard value="26.397" label="门诊收入(万元)" variant="blue" :trend="12.5" />
  <DfStatCard value="21.347" label="住院收入(万元)" variant="green" :trend="-3.2" />
  <DfStatCard value="1914" label="挂号总人次" :trend="8.1" />
  <DfStatCard value="104" label="出院人次" :trend="-1.5" />
</DfGridLayout>
```

</template>
</DemoBlock>

## 自定义插槽

<DemoBlock title="自定义图标和数值">
<div style="display:grid; grid-template-columns:repeat(2,1fr); gap:12px;">
<df-stat-card variant="blue">
<template #icon><div style="font-size:24px;">📊</div></template>
<template #value><span style="font-size:22px; font-weight:700;">3,685</span> <span style="font-size:12px; color:#909399;">元</span></template>
<template #label>住院药品收入</template>
</df-stat-card>
<df-stat-card variant="green">
<template #icon><div style="font-size:24px;">📈</div></template>
<template #value><span style="font-size:22px; font-weight:700; color:#67c23a;">98.5%</span></template>
<template #label>数据完整性得分</template>
</df-stat-card>
</div>
<template #code>

```vue
<DfStatCard variant="blue">
  <template #icon><SvgIcon name="chart" /></template>
  <template #value>
    <span style="font-size:22px; font-weight:700;">3,685</span>
    <span style="font-size:12px; color:#909399;">元</span>
  </template>
  <template #label>住院药品收入</template>
</DfStatCard>
```

</template>
</DemoBlock>

## 搭配 DfDashboardLayout

<DemoBlock title="完整仪表盘示例">
<div style="background:#f0f2f5; padding:16px; border-radius:8px; border:1px solid #ebeef5;">
<div style="display:flex; gap:12px; margin-bottom:16px;">
<div style="flex:1; background:#1890ff; color:#fff; padding:14px 20px; border-radius:6px;">
<div style="font-size:20px; font-weight:700;">47.744 万</div>
<div style="font-size:12px; opacity:0.85; margin-top:2px;">全额收入</div>
</div>
<div style="flex:1; background:#52c41a; color:#fff; padding:14px 20px; border-radius:6px;">
<div style="font-size:20px; font-weight:700;">12</div>
<div style="font-size:12px; opacity:0.85; margin-top:2px;">在线服务</div>
</div>
</div>
<div style="display:grid; grid-template-columns:repeat(4,1fr); gap:12px;">
<df-stat-card value="3,685" label="住院药品收入(元)" variant="blue"></df-stat-card>
<df-stat-card value="17.14%" label="住院药占比" variant="orange"></df-stat-card>
<df-stat-card value="681" label="在院人数" variant="green"></df-stat-card>
<df-stat-card value="13" label="手术例数" variant="red"></df-stat-card>
</div>
</div>
<template #code>

```vue
<DfDashboardLayout>
  <template #kpi>
    <div style="display:flex; gap:12px;">
      <div class="kpi-card blue">47.744 万 / 全额收入</div>
      <div class="kpi-card green">12 / 在线服务</div>
    </div>
  </template>
  <template #cards>
    <DfGridLayout :cols="4">
      <DfStatCard value="3,685" label="住院药品收入(元)" variant="blue" />
      <DfStatCard value="17.14%" label="住院药占比" variant="orange" />
      <DfStatCard value="681" label="在院人数" variant="green" />
      <DfStatCard value="13" label="手术例数" variant="red" />
    </DfGridLayout>
  </template>
</DfDashboardLayout>
```

</template>
</DemoBlock>

## API

### Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `value` | `string \| number` | — | 数值 |
| `label` | `string` | — | 标签 |
| `iconText` | `string` | — | 图标文字（无 slot 时使用） |
| `variant` | `'blue' \| 'green' \| 'orange' \| 'red' \| 'purple' \| 'default'` | `'default'` | 颜色变体 |
| `trend` | `number` | — | 趋势百分比，正数上升(红)，负数下降(绿) |

### Slots

| 插槽 | 说明 |
|------|------|
| `icon` | 自定义图标区域 |
| `value` | 自定义数值显示 |
| `label` | 自定义标签 |

---

## 导入

```typescript
import { DfStatCard } from 'df-web-base'
import type { DfStatCardProps } from 'df-web-base'
```
