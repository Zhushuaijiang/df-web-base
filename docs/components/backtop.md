# DfBacktop 回到顶部

回到顶部按钮，页面滚动超过指定高度后自动显示，点击平滑滚动回顶部。

## 基础用法

默认监听 `window` 滚动，滚动超过 `visibilityHeight` 后出现按钮。

<DemoBlock title="基础用法（滚动页面查看效果）">

<df-backtop :visibility-height="200" :right="40" :bottom="40" />

<template #code>

```vue
<df-backtop :visibility-height="200" :right="40" :bottom="40" />
```

</template>
</DemoBlock>

## 自定义位置

通过 `right` 和 `bottom` 属性调整按钮的位置。

<DemoBlock title="自定义位置">

<df-backtop :visibility-height="100" :right="80" :bottom="80" />

<template #code>

```vue
<df-backtop :visibility-height="100" :right="80" :bottom="80" />
```

</template>
</DemoBlock>

## 指定滚动容器

通过 `target` 属性指定一个 CSS 选择器，监听特定容器的滚动。

<DemoBlock title="指定滚动容器">

<div style="height: 200px; overflow-y: auto; border: 1px solid #e4e7ed; padding: 12px">
<p>滚动区域内容</p>
<p>向下滚动以查看效果...</p>
<p v-for="i in 30" :key="i">第 {{ i }} 行内容</p>
</div>
<df-backtop target=".demo-scroll-container" :visibility-height="50" />

<template #code>

```vue
<div class="demo-scroll-container" style="height: 200px; overflow-y: auto">
  <p v-for="i in 30" :key="i">第 {{ i }} 行内容</p>
</div>
<df-backtop target=".demo-scroll-container" :visibility-height="50" />
```

</template>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| visibilityHeight | 滚动高度阈值 | `number` | 200 |
| right | 距右侧距离 (px) | `number` | 40 |
| bottom | 距底部距离 (px) | `number` | 40 |
| target | 目标容器选择器 | `string` | -- |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| click | 点击触发 | `(e: MouseEvent)` |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 自定义按钮内容 |

## 引入方式

```typescript
import { DfBacktop } from 'df-web-base'
```

全量注册后可直接在模板中使用 `<df-backtop>`。
