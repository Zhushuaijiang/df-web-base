# DfImage 图片

图片组件，支持多种适配方式、加载占位、加载失败占位和图片预览。

## 基础用法

通过 `src` 属性设置图片地址，`fit` 属性设置适配方式。

<DemoBlock title="不同适配方式">

<df-space>
<df-image style="width: 100px; height: 100px" fit="fill" src="https://picsum.photos/200/200" />
<df-image style="width: 100px; height: 100px" fit="contain" src="https://picsum.photos/200/200" />
<df-image style="width: 100px; height: 100px" fit="cover" src="https://picsum.photos/200/200" />
<df-image style="width: 100px; height: 100px" fit="none" src="https://picsum.photos/200/200" />
</df-space>

<template #code>

```vue
<df-space>
  <df-image style="width: 100px; height: 100px" fit="fill" src="https://picsum.photos/200/200" />
  <df-image style="width: 100px; height: 100px" fit="contain" src="https://picsum.photos/200/200" />
  <df-image style="width: 100px; height: 100px" fit="cover" src="https://picsum.photos/200/200" />
  <df-image style="width: 100px; height: 100px" fit="none" src="https://picsum.photos/200/200" />
</df-space>
```

</template>
</DemoBlock>

## 加载失败

当图片地址无效时，显示加载失败占位。可通过 `error` 插槽自定义失败内容。

<DemoBlock title="加载失败">

<df-space>
<df-image style="width: 100px; height: 100px" src="invalid-url.jpg" />
<df-image style="width: 100px; height: 100px" src="invalid-url.jpg">
<template #error><span style="color: #f56c6c">加载失败</span></template>
</df-image>
</df-space>

<template #code>

```vue
<df-space>
  <df-image style="width: 100px; height: 100px" src="invalid-url.jpg" />
  <df-image style="width: 100px; height: 100px" src="invalid-url.jpg">
    <template #error>
      <span style="color: #f56c6c">加载失败</span>
    </template>
  </df-image>
</df-space>
```

</template>
</DemoBlock>

## 图片预览

设置 `previewSrcList` 属性后，点击图片可打开全屏预览，支持多图切换。

<DemoBlock title="图片预览（点击图片查看）">

<df-space>
<df-image style="width: 120px; height: 80px; cursor: pointer" fit="cover" src="https://picsum.photos/seed/a/400/300" :preview-src-list="['https://picsum.photos/seed/a/400/300', 'https://picsum.photos/seed/b/400/300', 'https://picsum.photos/seed/c/400/300']" />
<df-image style="width: 120px; height: 80px; cursor: pointer" fit="cover" src="https://picsum.photos/seed/b/400/300" :preview-src-list="['https://picsum.photos/seed/a/400/300', 'https://picsum.photos/seed/b/400/300', 'https://picsum.photos/seed/c/400/300']" />
</df-space>

<template #code>

```vue
<df-image
  style="width: 120px; height: 80px; cursor: pointer"
  fit="cover"
  src="https://picsum.photos/seed/a/400/300"
  :preview-src-list="[
    'https://picsum.photos/seed/a/400/300',
    'https://picsum.photos/seed/b/400/300',
    'https://picsum.photos/seed/c/400/300',
  ]"
/>
```

</template>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| src | 图片地址 | `string` | -- |
| fit | 适配方式 | `'fill' \| 'contain' \| 'cover' \| 'none' \| 'scale-down'` | 'fill' |
| alt | 替代文字 | `string` | -- |
| lazy | 懒加载 | `boolean` | false |
| previewSrcList | 预览图片列表 | `string[]` | [] |
| zIndex | 预览层级 | `number` | 2000 |
| initialIndex | 预览初始索引 | `number` | 0 |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| load | 加载成功 | `(e: Event)` |
| error | 加载失败 | `(e: Event)` |
| switch | 预览切换图片 | `(index: number)` |

### Slots

| 插槽名 | 说明 |
|--------|------|
| placeholder | 加载中占位 |
| error | 加载失败占位 |

## 引入方式

```typescript
import { DfImage } from 'df-web-base'
```

全量注册后可直接在模板中使用 `<df-image>`。
