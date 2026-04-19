# DfBreadcrumb 面包屑

面包屑导航组件，用于显示当前页面路径。子组件 `DfBreadcrumbItem` 用于每一级。

## 基础用法

默认使用 `/` 作为分隔符。

<DemoBlock title="基础面包屑">

<df-breadcrumb>
<df-breadcrumb-item>首页</df-breadcrumb-item>
<df-breadcrumb-item>门诊管理</df-breadcrumb-item>
<df-breadcrumb-item>挂号列表</df-breadcrumb-item>
</df-breadcrumb>

<template #code>

```vue
<df-breadcrumb>
  <df-breadcrumb-item>首页</df-breadcrumb-item>
  <df-breadcrumb-item>门诊管理</df-breadcrumb-item>
  <df-breadcrumb-item>挂号列表</df-breadcrumb-item>
</df-breadcrumb>
```

</template>
</DemoBlock>

## 自定义分隔符

通过 `separator` 属性修改分隔符文本，或通过 `separatorIcon` 属性使用图标作为分隔符。

<DemoBlock title="自定义分隔符">

<df-breadcrumb separator="-">
<df-breadcrumb-item>首页</df-breadcrumb-item>
<df-breadcrumb-item>系统管理</df-breadcrumb-item>
<df-breadcrumb-item>用户管理</df-breadcrumb-item>
</df-breadcrumb>

<template #code>

```vue
<df-breadcrumb separator="-">
  <df-breadcrumb-item>首页</df-breadcrumb-item>
  <df-breadcrumb-item>系统管理</df-breadcrumb-item>
  <df-breadcrumb-item>用户管理</df-breadcrumb-item>
</df-breadcrumb>
```

</template>
</DemoBlock>

## DfBreadcrumbItem API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| to | 路由跳转对象，同 vue-router 的 to | `string \| object` | -- |
| replace | 路由跳转时使用 replace | `boolean` | -- |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| click | 点击时触发 | -- |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 面包屑项文本 |

## DfBreadcrumb API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| separator | 分隔符 | `string` | '/' |
| separatorIcon | 分隔符图标 class | `string` | -- |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 放置 DfBreadcrumbItem |

## 引入方式

```typescript
import { DfBreadcrumb, DfBreadcrumbItem } from 'df-web-base'
```

全量注册后可直接在模板中使用 `<df-breadcrumb>` 和 `<df-breadcrumb-item>`。
