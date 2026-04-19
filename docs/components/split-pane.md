# DfSplitPane 分栏

分栏面板组件，支持拖拽调整比例。

> 🔧 基于 **自定义组件** 封装

## 基础用法

<DemoBlock title="水平分栏">
<df-split-pane style="height: 200px" :default-ratio="0.3">
<template #first>
<div style="padding: 16px; background: #f0f2f5; height: 100%; box-sizing: border-box;">左侧面板</div>
</template>
<template #second>
<div style="padding: 16px; height: 100%; box-sizing: border-box;">右侧面板</div>
</template>
</df-split-pane>
<template #code>

```vue
<df-split-pane style="height: 200px" :default-ratio="0.3">
  <template #first>
    <div style="padding: 16px; background: #f0f2f5; height: 100%;">左侧面板</div>
  </template>
  <template #second>
    <div style="padding: 16px; height: 100%;">右侧面板</div>
  </template>
</df-split-pane>
```

</template>
</DemoBlock>

## 垂直分栏

通过 `direction` 属性设置为 `vertical` 实现上下分栏。

<DemoBlock title="垂直分栏">
<df-split-pane style="height: 240px" direction="vertical" :default-ratio="0.4">
<template #first>
<div style="padding: 16px; background: #f0f2f5; height: 100%; box-sizing: border-box;">上方面板</div>
</template>
<template #second>
<div style="padding: 16px; height: 100%; box-sizing: border-box;">下方面板</div>
</template>
</df-split-pane>
<template #code>

```vue
<df-split-pane style="height: 240px" direction="vertical" :default-ratio="0.4">
  <template #first>
    <div style="padding: 16px; background: #f0f2f5; height: 100%;">上方面板</div>
  </template>
  <template #second>
    <div style="padding: 16px; height: 100%;">下方面板</div>
  </template>
</df-split-pane>
```

</template>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| direction | 分栏方向 | `'horizontal' \| 'vertical'` | 'horizontal' |
| defaultRatio | 默认比例 | `number` | 0.5 |
| min | 最小比例 | `number` | 0.1 |
| max | 最大比例 | `number` | 0.9 |
| splitterSize | 分割线宽度 (px) | `number` | 6 |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| resize | 比例变化 | `(ratio: number)` |

### Slots

| 插槽名 | 说明 |
|--------|------|
| first | 第一面板 |
| second | 第二面板 |

## 引入方式

```typescript
import { DfSplitPane } from 'df-web-base'
```

全量注册后可直接在模板中使用 `<df-split-pane>`。
