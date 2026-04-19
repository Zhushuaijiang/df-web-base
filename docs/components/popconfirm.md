# DfPopconfirm 确认弹出

点击元素弹出确认框，常用于删除等危险操作前的二次确认。

## 基础用法

<DemoBlock title="基础确认">
<df-popconfirm title="确定删除这条记录吗？"><df-button type="danger">删除</df-button></df-popconfirm>
<template #code>

```vue
<df-popconfirm title="确定删除这条记录吗？">
  <df-button type="danger">删除</df-button>
</df-popconfirm>
```

</template>
</DemoBlock>

## 自定义按钮文字

<DemoBlock title="自定义按钮">
<df-popconfirm title="确认提交表单？" confirm-button-text="提交" cancel-button-text="再想想" placement="bottom"><df-button type="primary">提交表单</df-button></df-popconfirm>
<template #code>

```vue
<df-popconfirm
  title="确认提交表单？"
  confirm-button-text="提交"
  cancel-button-text="再想想"
  placement="bottom"
>
  <df-button type="primary">提交表单</df-button>
</df-popconfirm>
```

</template>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| title | 确认标题 | `string` | `'确定执行此操作吗？'` |
| confirmButtonText | 确认按钮文字 | `string` | `'确定'` |
| cancelButtonText | 取消按钮文字 | `string` | `'取消'` |
| confirmButtonType | 确认按钮类型 | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'primary'` |
| icon | 图标类名 | `string` | `'dx-icon-warning'` |
| iconColor | 图标颜色 | `string` | `'#e6a23c'` |
| hideIcon | 是否隐藏图标 | `boolean` | `false` |
| placement | 弹出位置 | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` |
| width | 弹出框宽度 | `number \| string` | `220` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| confirm | 点击确认 | — |
| cancel | 点击取消 | — |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 触发元素 |

## 引入方式

```typescript
import { DfPopconfirm } from 'df-web-base'
```
