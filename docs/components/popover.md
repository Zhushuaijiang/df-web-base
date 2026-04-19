# DfPopover 弹出框

自定义弹出框组件，支持 hover/click/focus 触发方式和明暗主题。

## 基础用法

<DemoBlock title="Hover 触发">
<df-popover content="这是一段弹出内容" placement="top"><df-button>Hover 激活</df-button></df-popover>
<template #code>

```vue
<df-popover content="这是一段弹出内容" placement="top">
  <df-button>Hover 激活</df-button>
</df-popover>
```

</template>
</DemoBlock>

## Click 触发

<DemoBlock title="点击触发">
<df-popover content="点击外部关闭" trigger="click" placement="bottom"><df-button>Click 激活</df-button></df-popover>
<template #code>

```vue
<df-popover content="点击外部关闭" trigger="click" placement="bottom">
  <df-button>Click 激活</df-button>
</df-popover>
```

</template>
</DemoBlock>

## 带标题

<DemoBlock title="带标题和暗色主题">
<df-popover title="提示" content="这是一段内容" placement="right" effect="dark"><df-button type="primary">暗色主题</df-button></df-popover>
<template #code>

```vue
<df-popover title="提示" content="这是一段内容" placement="right" effect="dark">
  <df-button type="primary">暗色主题</df-button>
</df-popover>
```

</template>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| trigger | 触发方式 | `'hover' \| 'click' \| 'focus' \| 'manual'` | `'hover'` |
| title | 标题 | `string` | — |
| content | 内容文本 | `string` | — |
| placement | 弹出位置 | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` |
| width | 弹出框宽度 | `string \| number` | — |
| effect | 主题 | `'dark' \| 'light'` | `'light'` |
| visible | 是否可见（受控） | `boolean` | — |
| offset | 偏移距离 | `number` | `8` |
| popperClass | 弹出框自定义类名 | `string` | — |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:visible | 可见状态变化 | `(val: boolean)` |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 触发元素 |
| content | 弹出内容 |

## 引入方式

```typescript
import { DfPopover } from 'df-web-base'
```
