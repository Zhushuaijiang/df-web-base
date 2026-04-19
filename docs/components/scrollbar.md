# DfScrollbar 滚动条

基于 DevExtreme DxScrollView 封装的自定义滚动条容器。

> 🔧 基于 **DxScrollView** 封装

## 基础用法

<DemoBlock title="基础滚动条">
<df-scrollbar height="120px">
  <p>滚动内容第 1 行</p>
  <p>滚动内容第 2 行</p>
  <p>滚动内容第 3 行</p>
  <p>滚动内容第 4 行</p>
  <p>滚动内容第 5 行</p>
  <p>滚动内容第 6 行</p>
  <p>滚动内容第 7 行</p>
  <p>滚动内容第 8 行</p>
</df-scrollbar>
<template #code>

```vue
<df-scrollbar height="120px">
  <p>滚动内容第 1 行</p>
  <p>滚动内容第 2 行</p>
  <p>滚动内容第 3 行</p>
  <p>滚动内容第 4 行</p>
  <p>滚动内容第 5 行</p>
  <p>滚动内容第 6 行</p>
  <p>滚动内容第 7 行</p>
  <p>滚动内容第 8 行</p>
</df-scrollbar>
```

</template>
</DemoBlock>

## 横向滚动

通过 `direction` 属性设置为 `horizontal` 启用横向滚动。

<DemoBlock title="横向滚动">
<df-scrollbar height="80px" direction="horizontal">
  <div style="display: flex; white-space: nowrap; padding: 16px;">
    <div style="flex-shrink: 0; width: 200px; height: 50px; background: #f0f2f5; margin-right: 12px; display: flex; align-items: center; justify-content: center; border-radius: 4px;">卡片 A</div>
    <div style="flex-shrink: 0; width: 200px; height: 50px; background: #f0f2f5; margin-right: 12px; display: flex; align-items: center; justify-content: center; border-radius: 4px;">卡片 B</div>
    <div style="flex-shrink: 0; width: 200px; height: 50px; background: #f0f2f5; margin-right: 12px; display: flex; align-items: center; justify-content: center; border-radius: 4px;">卡片 C</div>
    <div style="flex-shrink: 0; width: 200px; height: 50px; background: #f0f2f5; margin-right: 12px; display: flex; align-items: center; justify-content: center; border-radius: 4px;">卡片 D</div>
    <div style="flex-shrink: 0; width: 200px; height: 50px; background: #f0f2f5; display: flex; align-items: center; justify-content: center; border-radius: 4px;">卡片 E</div>
  </div>
</df-scrollbar>
<template #code>

```vue
<df-scrollbar height="80px" direction="horizontal">
  <div style="display: flex; white-space: nowrap; padding: 16px;">
    <div style="flex-shrink: 0; width: 200px; height: 50px; background: #f0f2f5; margin-right: 12px; display: flex; align-items: center; justify-content: center; border-radius: 4px;">卡片 A</div>
    <div style="flex-shrink: 0; width: 200px; height: 50px; background: #f0f2f5; margin-right: 12px; display: flex; align-items: center; justify-content: center; border-radius: 4px;">卡片 B</div>
    <div style="flex-shrink: 0; width: 200px; height: 50px; background: #f0f2f5; display: flex; align-items: center; justify-content: center; border-radius: 4px;">卡片 C</div>
  </div>
</df-scrollbar>
```

</template>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| height | 高度 | `string \| number` | — |
| width | 宽度 | `string \| number` | — |
| direction | 滚动方向 | `'vertical' \| 'horizontal' \| 'both'` | 'vertical' |
| native | 使用原生滚动条 | `boolean` | false |
| showScrollbar | 滚动条显示策略 | `'onScroll' \| 'onHover' \| 'always' \| 'never'` | 'onHover' |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 滚动内容 |

## 引入方式

```typescript
import { DfScrollbar } from 'df-web-base'
```

全量注册后可直接在模板中使用 `<df-scrollbar>`。
