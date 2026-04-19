# DfBox 弹性布局

基于 DevExtreme DxBox 封装的弹性布局容器组件，基于 CSS Flexbox 实现。

> 🔧 基于 **DxBox** 封装

## 基础用法

通过 `direction` 设置主轴方向，子项通过 `ratio` 属性分配空间。

<DemoBlock title="水平弹性布局">

<df-box direction="row" :height="60">
<div :ratio="1" style="background: #e6f7ff; padding: 8px;">1:1</div>
<div :ratio="2" style="background: #f6ffed; padding: 8px;">1:2</div>
<div :ratio="1" style="background: #fff7e6; padding: 8px;">1:1</div>
</df-box>

<template #code>

```vue
<df-box direction="row" :height="60">
  <div :ratio="1" style="background: #e6f7ff; padding: 8px">1:1</div>
  <div :ratio="2" style="background: #f6ffed; padding: 8px">1:2</div>
  <div :ratio="1" style="background: #fff7e6; padding: 8px">1:1</div>
</df-box>
```

</template>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| direction | 主轴方向 | `'row' \| 'col' \| 'row-reverse' \| 'col-reverse'` | `'row'` |
| align | 交叉轴对齐 | `'start' \| 'end' \| 'center' \| 'stretch' \| 'baseline'` | — |
| crossAlign | 行对齐 | `'start' \| 'end' \| 'center' \| 'stretch'` | — |
| width | 宽度 | `number \| string` | `'100%'` |
| height | 高度 | `number \| string` | — |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| — | — | — |

### Slots

| 插槽名 | 说明 | 作用域 |
|--------|------|---------|
| default | 放置子元素，子元素通过 `ratio`、`baseSize`、`shrink` 控制弹性 | — |

## 引入方式

```typescript
import { DfBox } from 'df-web-base'
```

全量注册后可直接在模板中使用 `<df-box>`。
