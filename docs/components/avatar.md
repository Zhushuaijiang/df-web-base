# DfAvatar 头像

头像组件，支持图片、图标和文字三种模式，可自定义尺寸和形状。

## 基础用法

通过 `icon`、`src` 或 default slot 分别使用图标、图片或文字头像。

<DemoBlock title="头像模式">

<df-space>
<df-avatar icon="dx-icon-user" />
<df-avatar>张</df-avatar>
<df-avatar shape="square" :size="40">DF</df-avatar>
</df-space>

<template #code>

```vue
<df-space>
  <df-avatar icon="dx-icon-user" />
  <df-avatar>张</df-avatar>
  <df-avatar shape="square" :size="40">DF</df-avatar>
</df-space>
```

</template>
</DemoBlock>

## 不同尺寸

通过 `size` 属性设置头像尺寸，支持预设值和自定义数值。

<DemoBlock title="头像尺寸">

<df-space :size="16">
<df-avatar :size="64">大</df-avatar>
<df-avatar size="large">大号</df-avatar>
<df-avatar size="default">默认</df-avatar>
<df-avatar size="small">小号</df-avatar>
</df-space>

<template #code>

```vue
<df-space :size="16">
  <df-avatar :size="64">大</df-avatar>
  <df-avatar size="large">大号</df-avatar>
  <df-avatar size="default">默认</df-avatar>
  <df-avatar size="small">小号</df-avatar>
</df-space>
```

</template>
</DemoBlock>

## 形状

通过 `shape` 属性设置圆形或方形头像。

<DemoBlock title="头像形状">

<df-space :size="16">
<df-avatar shape="circle" icon="dx-icon-user" />
<df-avatar shape="square" icon="dx-icon-user" />
<df-avatar shape="circle">圆</df-avatar>
<df-avatar shape="square">方</df-avatar>
</df-space>

<template #code>

```vue
<df-space :size="16">
  <df-avatar shape="circle" icon="dx-icon-user" />
  <df-avatar shape="square" icon="dx-icon-user" />
  <df-avatar shape="circle">圆</df-avatar>
  <df-avatar shape="square">方</df-avatar>
</df-space>
```

</template>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| size | 尺寸 | `'large' \| 'default' \| 'small' \| number` | `'default'` |
| shape | 形状 | `'circle' \| 'square'` | `'circle'` |
| src | 图片地址 | `string` | — |
| alt | 替代文字 | `string` | — |
| icon | 图标类名 | `string` | — |
| fit | 图片适配 | `'fill' \| 'contain' \| 'cover' \| 'none' \| 'scale-down'` | `'cover'` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| error | 图片加载失败 | `(e: Event)` |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 自定义内容（文字） |

## 引入方式

```typescript
import { DfAvatar } from 'df-web-base'
```
