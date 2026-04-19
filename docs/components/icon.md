# DfIcon 图标

图标组件，自动添加 `dx-icon-` 前缀，支持自定义大小和颜色。

## 基础用法

<DemoBlock title="图标列表">
<df-space>
<df-icon name="add"></df-icon>
<df-icon name="edit"></df-icon>
<df-icon name="trash"></df-icon>
<df-icon name="search"></df-icon>
<df-icon name="save"></df-icon>
<df-icon name="close"></df-icon>
</df-space>
<template #code>

```vue
<df-space>
  <df-icon name="add" />
  <df-icon name="edit" />
  <df-icon name="trash" />
  <df-icon name="search" />
  <df-icon name="save" />
  <df-icon name="close" />
</df-space>
```

</template>
</DemoBlock>

## 自定义大小和颜色

<DemoBlock title="不同尺寸">
<df-space>
<df-icon name="user" size="16"></df-icon>
<df-icon name="user" size="24"></df-icon>
<df-icon name="user" size="32"></df-icon>
<df-icon name="user" size="48" color="#2AA890"></df-icon>
</df-space>
<template #code>

```vue
<df-space>
  <df-icon name="user" size="16" />
  <df-icon name="user" size="24" />
  <df-icon name="user" size="32" />
  <df-icon name="user" size="48" color="#2AA890" />
</df-space>
```

</template>
</DemoBlock>

## 可点击图标

<DemoBlock title="可点击">
<df-space>
<df-icon name="edit" size="20" clickable></df-icon>
<df-icon name="trash" size="20" clickable color="#F5222D"></df-icon>
</df-space>
<template #code>

```vue
<df-space>
  <df-icon name="edit" size="20" clickable />
  <df-icon name="trash" size="20" clickable color="#F5222D" />
</df-space>
```

</template>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| name | 图标名（自动加 `dx-icon-` 前缀） | `string` | `''` |
| size | 图标大小 | `number \| string` | — |
| color | 图标颜色 | `string` | — |
| clickable | 是否可点击（显示手型光标） | `boolean` | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| click | 点击时触发 | `(e: MouseEvent)` |

## 引入方式

```typescript
import { DfIcon } from 'df-web-base'
```
