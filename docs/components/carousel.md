# DfCarousel 走马灯

走马灯/轮播图组件。子组件 `DfCarouselItem` 用于包裹每一项。

## 基础用法

通过 `height` 设置轮播高度，在内部放置 `df-carousel-item`。

<DemoBlock title="基础走马灯">

<df-carousel height="200px" :autoplay="false">
<df-carousel-item><div style="background:#2AA890;color:#fff;height:100%;display:flex;align-items:center;justify-content:center;font-size:24px;">1</div></df-carousel-item>
<df-carousel-item><div style="background:#409EFF;color:#fff;height:100%;display:flex;align-items:center;justify-content:center;font-size:24px;">2</div></df-carousel-item>
<df-carousel-item><div style="background:#E6A23C;color:#fff;height:100%;display:flex;align-items:center;justify-content:center;font-size:24px;">3</div></df-carousel-item>
</df-carousel>

<template #code>

```vue
<df-carousel height="200px">
  <df-carousel-item>
    <div style="background:#2AA890;color:#fff;height:100%;display:flex;align-items:center;justify-content:center;font-size:24px;">
      1
    </div>
  </df-carousel-item>
  <df-carousel-item>
    <div style="background:#409EFF;color:#fff;height:100%;display:flex;align-items:center;justify-content:center;font-size:24px;">
      2
    </div>
  </df-carousel-item>
  <df-carousel-item>
    <div style="background:#E6A23C;color:#fff;height:100%;display:flex;align-items:center;justify-content:center;font-size:24px;">
      3
    </div>
  </df-carousel-item>
</df-carousel>
```

</template>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| height | 高度 | `string \| number` | '300px' |
| autoplay | 自动播放 | `boolean` | true |
| interval | 自动播放间隔 (ms) | `number` | 3000 |
| showIndicators | 显示指示器 | `boolean` | true |
| showArrow | 箭头显示 | `'always' \| 'hover' \| 'never'` | 'hover' |
| type | 类型 | `'default' \| 'card'` | 'default' |
| direction | 方向 | `'horizontal' \| 'vertical'` | 'horizontal' |
| loop | 循环播放 | `boolean` | true |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| change | 切换时触发 | `(current, prev)` |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 放置 DfCarouselItem |

## 引入方式

```typescript
import { DfCarousel } from 'df-web-base'
```

全量注册后可直接在模板中使用 `<df-carousel>`。
