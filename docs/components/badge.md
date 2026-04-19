# DfBadge 徽章

徽章组件，用于显示数量或状态标记，支持数字、圆点和多种类型。

## 基础用法

使用 `value` 设置徽章显示的数字，`max` 设置最大值。

<DemoBlock title="数字徽章">

<df-space :size="24">
<df-badge :value="12"><df-button>消息</df-button></df-badge>
<df-badge :value="200" :max="99"><df-button>评论</df-button></df-badge>
<df-badge value="new"><df-button>通知</df-button></df-badge>
</df-space>

<template #code>

```vue
<df-space :size="24">
  <df-badge :value="12"><df-button>消息</df-button></df-badge>
  <df-badge :value="200" :max="99"><df-button>评论</df-button></df-badge>
  <df-badge value="new"><df-button>通知</df-button></df-badge>
</df-space>
```

</template>
</DemoBlock>

## 圆点模式

设置 `is-dot` 属性使用圆点徽章。

<DemoBlock title="圆点徽章">

<df-space :size="24">
<df-badge is-dot><df-button>新消息</df-button></df-badge>
<df-badge is-dot type="success"><df-button>状态</df-button></df-badge>
<df-badge is-dot type="warning"><df-button>提醒</df-button></df-badge>
</df-space>

<template #code>

```vue
<df-space :size="24">
  <df-badge is-dot><df-button>新消息</df-button></df-badge>
  <df-badge is-dot type="success"><df-button>状态</df-button></df-badge>
  <df-badge is-dot type="warning"><df-button>提醒</df-button></df-badge>
</df-space>
```

</template>
</DemoBlock>

## 不同类型

通过 `type` 属性设置徽章颜色。

<DemoBlock title="徽章类型">

<df-space :size="24">
<df-badge :value="5" type="primary"><df-button>主要</df-button></df-badge>
<df-badge :value="5" type="success"><df-button>成功</df-button></df-badge>
<df-badge :value="5" type="warning"><df-button>警告</df-button></df-badge>
<df-badge :value="5" type="danger"><df-button>危险</df-button></df-badge>
<df-badge :value="5" type="info"><df-button>信息</df-button></df-badge>
</df-space>

<template #code>

```vue
<df-space :size="24">
  <df-badge :value="5" type="primary"><df-button>主要</df-button></df-badge>
  <df-badge :value="5" type="success"><df-button>成功</df-button></df-badge>
  <df-badge :value="5" type="warning"><df-button>警告</df-button></df-badge>
  <df-badge :value="5" type="danger"><df-button>危险</df-button></df-badge>
  <df-badge :value="5" type="info"><df-button>信息</df-button></df-badge>
</df-space>
```

</template>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| value | 显示值 | `string \| number` | `''` |
| max | 最大值（超出显示 max+） | `number` | — |
| isDot | 圆点模式 | `boolean` | `false` |
| hidden | 隐藏 | `boolean` | `false` |
| type | 类型 | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'danger'` |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 被包裹内容 |

## 引入方式

```typescript
import { DfBadge } from 'df-web-base'
```
