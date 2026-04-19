# DfGridLayout 网格布局

响应式 CSS Grid 布局容器。自动适配不同屏幕断点，控制列数、行列间距。

## 基础用法

<DemoBlock title="三列网格">
<df-grid-layout :cols="3" :col-gap="16" :row-gap="16">
<df-card-layout title="卡片 1"><div style="font-size:13px; color:#909399; text-align:center; padding:12px 0;">内容区域</div></df-card-layout>
<df-card-layout title="卡片 2"><div style="font-size:13px; color:#909399; text-align:center; padding:12px 0;">内容区域</div></df-card-layout>
<df-card-layout title="卡片 3"><div style="font-size:13px; color:#909399; text-align:center; padding:12px 0;">内容区域</div></df-card-layout>
<df-card-layout title="卡片 4"><div style="font-size:13px; color:#909399; text-align:center; padding:12px 0;">内容区域</div></df-card-layout>
<df-card-layout title="卡片 5"><div style="font-size:13px; color:#909399; text-align:center; padding:12px 0;">内容区域</div></df-card-layout>
</df-grid-layout>
<template #code>

```vue
<df-grid-layout :cols="3" :col-gap="16" :row-gap="16">
  <df-card-layout title="卡片 1">内容</df-card-layout>
  <df-card-layout title="卡片 2">内容</df-card-layout>
  <df-card-layout title="卡片 3">内容</df-card-layout>
  <df-card-layout title="卡片 4">内容</df-card-layout>
  <df-card-layout title="卡片 5">内容</df-card-layout>
</df-grid-layout>
```

</template>
</DemoBlock>

## 不同列数

<DemoBlock title="列数对比">
<div style="display:flex; flex-direction:column; gap:20px;">
<div>
<div style="font-size:12px; color:#909399; margin-bottom:8px;">2 列</div>
<df-grid-layout :cols="2" :col-gap="12" :row-gap="12">
<div style="background:#e6f7ff; border:1px solid #91d5ff; border-radius:4px; padding:16px; text-align:center; font-size:13px; color:#1890ff;">A</div>
<div style="background:#e6f7ff; border:1px solid #91d5ff; border-radius:4px; padding:16px; text-align:center; font-size:13px; color:#1890ff;">B</div>
<div style="background:#e6f7ff; border:1px solid #91d5ff; border-radius:4px; padding:16px; text-align:center; font-size:13px; color:#1890ff;">C</div>
<div style="background:#e6f7ff; border:1px solid #91d5ff; border-radius:4px; padding:16px; text-align:center; font-size:13px; color:#1890ff;">D</div>
</df-grid-layout>
</div>
<div>
<div style="font-size:12px; color:#909399; margin-bottom:8px;">4 列</div>
<df-grid-layout :cols="4" :col-gap="12" :row-gap="12">
<div style="background:#f6ffed; border:1px solid #b7eb8f; border-radius:4px; padding:16px; text-align:center; font-size:13px; color:#52c41a;">1</div>
<div style="background:#f6ffed; border:1px solid #b7eb8f; border-radius:4px; padding:16px; text-align:center; font-size:13px; color:#52c41a;">2</div>
<div style="background:#f6ffed; border:1px solid #b7eb8f; border-radius:4px; padding:16px; text-align:center; font-size:13px; color:#52c41a;">3</div>
<div style="background:#f6ffed; border:1px solid #b7eb8f; border-radius:4px; padding:16px; text-align:center; font-size:13px; color:#52c41a;">4</div>
</df-grid-layout>
</div>
</div>
<template #code>

```vue
<!-- 2 列 -->
<df-grid-layout :cols="2" :col-gap="12" :row-gap="12">
  <div>A</div>
  <div>B</div>
</df-grid-layout>

<!-- 4 列 -->
<df-grid-layout :cols="4" :col-gap="12" :row-gap="12">
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
</df-grid-layout>
```

</template>
</DemoBlock>

## 响应式

为不同断点指定不同列数，缩放浏览器窗口可查看效果。

<DemoBlock title="响应式断点">
<df-grid-layout :cols="4" :responsive="{sm:1, md:2, lg:3}" :col-gap="12" :row-gap="12">
<df-card-layout title="门诊"><div style="font-size:24px; font-weight:600; text-align:center; color:#1890ff; padding:8px 0;">128</div><div style="font-size:12px; text-align:center; color:#909399;">今日挂号</div></df-card-layout>
<df-card-layout title="住院"><div style="font-size:24px; font-weight:600; text-align:center; color:#52c41a; padding:8px 0;">45</div><div style="font-size:12px; text-align:center; color:#909399;">在院人数</div></df-card-layout>
<df-card-layout title="待审"><div style="font-size:24px; font-weight:600; text-align:center; color:#faad14; padding:8px 0;">12</div><div style="font-size:12px; text-align:center; color:#909399;">待审医嘱</div></df-card-layout>
<df-card-layout title="收费"><div style="font-size:24px; font-weight:600; text-align:center; color:#f5222d; padding:8px 0;">¥8.6w</div><div style="font-size:12px; text-align:center; color:#909399;">今日收入</div></df-card-layout>
</df-grid-layout>
<template #code>

```vue
<df-grid-layout
  :cols="4"
  :responsive="{ sm: 1, md: 2, lg: 3 }"
  :col-gap="12"
  :row-gap="12"
>
  <df-card-layout title="门诊">128</df-card-layout>
  <df-card-layout title="住院">45</df-card-layout>
  <df-card-layout title="待审">12</df-card-layout>
  <df-card-layout title="收费">¥8.6w</df-card-layout>
</df-grid-layout>
```

</template>
</DemoBlock>

**断点规则**：

| 断点 | 宽度范围 | 上例列数 |
|------|---------|---------|
| `sm` | < 768px | 1 列 |
| `md` | 768px – 991px | 2 列 |
| `lg` | 992px – 1199px | 3 列 |
| 默认 | ≥ 1200px | 4 列（`cols` prop） |

## 等高子元素

开启后同一行所有子元素高度一致。

<DemoBlock title="等高">
<df-grid-layout :cols="3" :col-gap="12" :row-gap="12" :equal-height="true">
<df-card-layout title="短内容"><div style="font-size:13px; color:#606266;">一行文字</div></df-card-layout>
<df-card-layout title="长内容"><div style="font-size:13px; color:#606266;">这里是一段比较长的内容，用于演示等高效果。当一个卡片内容较多时，同行的其他卡片也会自动拉伸到相同高度。</div></df-card-layout>
<df-card-layout title="中等"><div style="font-size:13px; color:#606266;">中等长度内容</div></df-card-layout>
</df-grid-layout>
<template #code>

```vue
<df-grid-layout :cols="3" :col-gap="12" :row-gap="12" :equal-height="true">
  <df-card-layout title="短内容">一行文字</df-card-layout>
  <df-card-layout title="长内容">很多很多内容...</df-card-layout>
  <df-card-layout title="中等">中等内容</df-card-layout>
</df-grid-layout>
```

</template>
</DemoBlock>

## 仪表盘示例

结合 `DfCardLayout` 实现典型 HIS 仪表盘页面。

<DemoBlock title="仪表盘布局">
<df-grid-layout :cols="4" :responsive="{sm:1, md:2, lg:3}" :col-gap="16" :row-gap="16" :equal-height="true">
<df-card-layout title="今日门诊" shadow="md"><div style="text-align:center; padding:12px 0;"><div style="font-size:32px; font-weight:700; color:#1890ff;">256</div><div style="font-size:12px; color:#909399; margin-top:4px;">较昨日 ↑ 12%</div></div></df-card-layout>
<df-card-layout title="待审核" shadow="md"><div style="text-align:center; padding:12px 0;"><div style="font-size:32px; font-weight:700; color:#faad14;">18</div><div style="font-size:12px; color:#909399; margin-top:4px;">需紧急处理 3 项</div></div></df-card-layout>
<df-card-layout title="住院人数" shadow="md"><div style="text-align:center; padding:12px 0;"><div style="font-size:32px; font-weight:700; color:#52c41a;">92</div><div style="font-size:12px; color:#909399; margin-top:4px;">床位使用率 87%</div></div></df-card-layout>
<df-card-layout title="今日收费" shadow="md"><div style="text-align:center; padding:12px 0;"><div style="font-size:32px; font-weight:700; color:#f5222d;">¥12.8w</div><div style="font-size:12px; color:#909399; margin-top:4px;">较昨日 ↑ 5%</div></div></df-card-layout>
</df-grid-layout>
<template #code>

```vue
<df-grid-layout
  :cols="4"
  :responsive="{ sm: 1, md: 2, lg: 3 }"
  :col-gap="16"
  :row-gap="16"
  :equal-height="true"
>
  <df-card-layout title="今日门诊" shadow="md">
    <StatCard :value="256" label="较昨日 ↑ 12%" />
  </df-card-layout>
  <df-card-layout title="待审核" shadow="md">
    <StatCard :value="18" label="需紧急处理 3 项" />
  </df-card-layout>
  <!-- ... -->
</df-grid-layout>
```

</template>
</DemoBlock>

## API

### Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `cols` | `number` | `3` | 默认列数 |
| `rowGap` | `number` | `16` | 行间距(px) |
| `colGap` | `number` | `16` | 列间距(px) |
| `responsive` | `GridResponsive` | `undefined` | 响应式断点配置 |
| `equalHeight` | `boolean` | `false` | 子元素是否等高 |

### Slots

| 插槽 | 说明 |
|------|------|
| `default` | 网格子元素，自动按 cols 列排列 |

### TypeScript 类型

```typescript
import type { DfGridLayoutProps, GridResponsive } from 'df-web-base'

interface GridResponsive {
  sm?: number   // < 768px 时的列数
  md?: number   // < 992px 时的列数
  lg?: number   // < 1200px 时的列数
}

interface DfGridLayoutProps {
  cols?: number
  rowGap?: number
  colGap?: number
  responsive?: GridResponsive
  equalHeight?: boolean
}
```

### 跨列

子元素可用 `grid-column: span N` 跨越多列：

```vue
<df-grid-layout :cols="4">
  <div style="grid-column: span 2;">占 2 列</div>
  <div>占 1 列</div>
  <div>占 1 列</div>
</df-grid-layout>
```

---

## 导入

```typescript
import { DfGridLayout } from 'df-web-base'
import type { DfGridLayoutProps, GridResponsive } from 'df-web-base'
```
