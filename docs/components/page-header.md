# DfPageHeader 页头

页头组件，常用于详情页顶部，包含返回按钮、标题、副标题和额外操作区。

## 基础用法

<DemoBlock title="带返回的页头">
<df-page-header title="用户详情" sub-title="ID: 10086"></df-page-header>
<template #code>

```vue
<df-page-header title="用户详情" sub-title="ID: 10086" />
```

</template>
</DemoBlock>

## 无返回按钮

<DemoBlock title="隐藏返回">
<df-page-header title="系统设置" :show-back="false"></df-page-header>
<template #code>

```vue
<df-page-header title="系统设置" :show-back="false" />
```

</template>
</DemoBlock>

## 自定义返回文字

<DemoBlock title="自定义返回文字">
<df-page-header title="编辑订单" back-text="返回列表"></df-page-header>
<template #code>

```vue
<df-page-header title="编辑订单" back-text="返回列表" />
```

</template>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| title | 标题 | `string` | `''` |
| subTitle | 副标题 | `string` | `''` |
| showBack | 是否显示返回按钮 | `boolean` | `true` |
| backText | 返回按钮文字 | `string` | `'返回'` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| back | 点击返回 | — |

### Slots

| 插槽名 | 说明 |
|--------|------|
| title | 标题内容 |
| subTitle | 副标题内容 |
| extra | 右侧额外区域 |
| default | 主体内容区 |
| breadcrumb | 面包屑区域 |

## 引入方式

```typescript
import { DfPageHeader } from 'df-web-base'
```
