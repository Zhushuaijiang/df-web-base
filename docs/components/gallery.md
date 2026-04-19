# DfGallery 图片画廊

基于 DevExtreme DxGallery 封装的图片画廊组件，支持滑动浏览和缩略图导航。

> 🔧 基于 **DxGallery** 封装

## 基础用法

通过 `dataSource` 传入图片 URL 数组，`height` 设置画廊高度。

<DemoBlock title="基础用法">

<df-gallery :data-source="['https://picsum.photos/400/200?random=1', 'https://picsum.photos/400/200?random=2', 'https://picsum.photos/400/200?random=3']" :height="200" :loop="true"></df-gallery>

<template #code>

```vue
<df-gallery
  :data-source="['url1.jpg', 'url2.jpg', 'url3.jpg']"
  :height="200"
  :loop="true"
/>
```

</template>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| dataSource | 图片 URL 数组 | `string[]` | **必填** |
| height | 画廊高度 | `number \| string` | — |
| width | 画廊宽度 | `number \| string` | `'100%'` |
| initialSlideIndex | 初始幻灯片索引 | `number` | `0` |
| loop | 循环播放 | `boolean` | `false` |
| slideshowDelay | 自动播放间隔（毫秒），0 为不自动播放 | `number` | `0` |
| showIndicator | 显示指示器 | `boolean` | `true` |
| showNavButtons | 显示导航按钮 | `boolean` | `true` |
| stretchImages | 图片拉伸填充 | `boolean` | `false` |
| animationDuration | 切换动画时长（毫秒） | `number` | `400` |
| disabled | 禁用交互 | `boolean` | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| selectedItemChanged | 当前项变化 | `(e: { item, component })` |
| selectionChanged | 选中项变化 | `(e)` |
| contentReady | 内容就绪 | `(e)` |

### Slots

| 插槽名 | 说明 | 作用域 |
|--------|------|---------|
| — | — | — |

### Methods (via ref)

| 方法名 | 说明 | 参数 |
|--------|------|------|
| getInstance() | 获取 DxGallery 原生实例 | — |
| goToItem(index) | 跳转到指定索引项 | `index: number` |
| prevItem() | 切换到上一项 | — |
| nextItem() | 切换到下一项 | — |

## 引入方式

```typescript
import { DfGallery } from 'df-web-base'
```

全量注册后可直接在模板中使用 `<df-gallery>`。
