# DfTimeline 时间线

时间线组件，用于按时间顺序展示事件流程。子组件 `DfTimelineItem` 用于包裹每一项。

## 基础用法

通过 `timestamp` 属性设置时间戳，`type` 属性设置节点类型。

<DemoBlock title="基础时间线">

<df-timeline>
<df-timeline-item timestamp="2024-01-01">创建项目</df-timeline-item>
<df-timeline-item timestamp="2024-02-15" type="primary">完成开发</df-timeline-item>
<df-timeline-item timestamp="2024-03-01" type="success">通过审核</df-timeline-item>
<df-timeline-item timestamp="2024-03-10" type="warning">提交发布</df-timeline-item>
</df-timeline>

<template #code>

```vue
<df-timeline>
  <df-timeline-item timestamp="2024-01-01">创建项目</df-timeline-item>
  <df-timeline-item timestamp="2024-02-15" type="primary">完成开发</df-timeline-item>
  <df-timeline-item timestamp="2024-03-01" type="success">通过审核</df-timeline-item>
  <df-timeline-item timestamp="2024-03-10" type="warning">提交发布</df-timeline-item>
</df-timeline>
```

</template>
</DemoBlock>

## 节点类型

通过 `type` 属性设置节点颜色，支持 `primary`、`success`、`warning`、`danger`、`info` 五种类型。也可通过 `color` 属性自定义颜色。

<DemoBlock title="不同节点类型">

<df-timeline>
<df-timeline-item type="primary" timestamp="步骤一">primary 节点</df-timeline-item>
<df-timeline-item type="success" timestamp="步骤二">success 节点</df-timeline-item>
<df-timeline-item type="warning" timestamp="步骤三">warning 节点</df-timeline-item>
<df-timeline-item type="danger" timestamp="步骤四">danger 节点</df-timeline-item>
<df-timeline-item type="info" timestamp="步骤五">info 节点</df-timeline-item>
<df-timeline-item color="#906" timestamp="步骤六">自定义颜色</df-timeline-item>
</df-timeline>

<template #code>

```vue
<df-timeline>
  <df-timeline-item type="primary" timestamp="步骤一">primary 节点</df-timeline-item>
  <df-timeline-item type="success" timestamp="步骤二">success 节点</df-timeline-item>
  <df-timeline-item type="warning" timestamp="步骤三">warning 节点</df-timeline-item>
  <df-timeline-item type="danger" timestamp="步骤四">danger 节点</df-timeline-item>
  <df-timeline-item type="info" timestamp="步骤五">info 节点</df-timeline-item>
  <df-timeline-item color="#906" timestamp="步骤六">自定义颜色</df-timeline-item>
</df-timeline>
```

</template>
</DemoBlock>

## 时间戳位置与隐藏

通过 `placement` 属性控制时间戳显示在内容的上方或下方，`hideTimestamp` 属性隐藏时间戳。

<DemoBlock title="时间戳位置">

<df-timeline>
<df-timeline-item timestamp="2024-01-01" placement="top">时间戳在上方</df-timeline-item>
<df-timeline-item timestamp="2024-02-15" placement="bottom">时间戳在下方</df-timeline-item>
<df-timeline-item hide-timestamp>隐藏时间戳</df-timeline-item>
</df-timeline>

<template #code>

```vue
<df-timeline>
  <df-timeline-item timestamp="2024-01-01" placement="top">时间戳在上方</df-timeline-item>
  <df-timeline-item timestamp="2024-02-15" placement="bottom">时间戳在下方</df-timeline-item>
  <df-timeline-item hide-timestamp>隐藏时间戳</df-timeline-item>
</df-timeline>
```

</template>
</DemoBlock>

## DfTimeline API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| reverse | 倒序排列 | `boolean` | -- |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 放置 DfTimelineItem |

## DfTimelineItem API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| timestamp | 时间戳文本 | `string` | -- |
| hideTimestamp | 隐藏时间戳 | `boolean` | -- |
| placement | 时间戳位置 | `'top' \| 'bottom'` | 'bottom' |
| type | 节点类型 | `'' \| 'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | '' |
| color | 自定义节点颜色 | `string` | -- |
| size | 节点尺寸 | `'normal' \| 'large'` | 'normal' |
| icon | 节点图标 class | `string` | -- |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 时间线项内容 |
| dot | 自定义节点 |

## 引入方式

```typescript
import { DfTimeline, DfTimelineItem } from 'df-web-base'
```

全量注册后可直接在模板中使用 `<df-timeline>` 和 `<df-timeline-item>`。
