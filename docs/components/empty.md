# DfEmpty 空状态

空状态提示组件，用于数据为空或页面无内容时的占位提示。

## 基础用法

通过 `description` 设置描述文字。

<DemoBlock title="基础用法">

<df-empty description="暂无数据" />

<template #code>

```vue
<df-empty description="暂无数据" />
```

</template>
</DemoBlock>

## 自定义图片大小

通过 `image-size` 属性调整空状态图片的大小。

<DemoBlock title="自定义图片大小">

<df-empty description="暂无数据" :image-size="100" />

<template #code>

```vue
<df-empty description="暂无数据" :image-size="100" />
```

</template>
</DemoBlock>

## 底部操作区

使用 `bottom` slot 添加操作按钮。

<DemoBlock title="底部操作区">

<df-empty description="还没有任何内容">
<template #bottom>
<df-button type="primary">创建数据</df-button>
</template>
</df-empty>

<template #code>

```vue
<df-empty description="还没有任何内容">
  <template #bottom>
    <df-button type="primary">创建数据</df-button>
  </template>
</df-empty>
```

</template>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| description | 描述文字 | `string` | `'暂无数据'` |
| imageSize | 图片大小 | `number` | `160` |

### Slots

| 插槽名 | 说明 |
|--------|------|
| image | 自定义图片 |
| default | 自定义描述 |
| bottom | 底部操作区域 |

## 引入方式

```typescript
import { DfEmpty } from 'df-web-base'
```
