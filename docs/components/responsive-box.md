# DfResponsiveBox 响应式布局

基于 DevExtreme DxResponsiveBox 封装的响应式布局组件，根据屏幕尺寸自动调整布局。

> 🔧 基于 **DxResponsiveBox** 封装

## 基础用法

通过 `cols` 和 `rows` 定义网格，`items` 配置每个元素的位置和大小。

<DemoBlock title="响应式布局">

<df-responsive-box :cols="[{ ratio: 1 }]" :rows="[{ ratio: 1 }, { ratio: 2 }]" :items="[{ location: { row: 0, col: 0 }, text: '头部' }, { location: { row: 1, col: 0 }, text: '内容区' }]" :height="200"></df-responsive-box>

<template #code>

```vue
<df-responsive-box
  :cols="[{ ratio: 1 }]"
  :rows="[{ ratio: 1 }, { ratio: 2 }]"
  :items="layoutItems"
  :height="200"
/>
```

</template>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| cols | 列配置 | `ResponsiveBoxCol[]` | **必填** |
| rows | 行配置 | `ResponsiveBoxRow[]` | **必填** |
| items | 元素配置 | `ResponsiveBoxItem[]` | — |
| screenByWidth | 屏幕宽度断点函数 | `function` | — |
| singleColumnScreen | 单列布局断点 | `string` | `'xs'` |
| width | 宽度 | `number \| string` | `'100%'` |
| height | 高度 | `number \| string` | — |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| contentReady | 内容就绪 | `(e)` |

### Slots

| 插槽名 | 说明 | 作用域 |
|--------|------|---------|
| default | 自定义内容 | — |

### Methods (via ref)

| 方法名 | 说明 | 参数 |
|--------|------|------|
| getInstance() | 获取 DxResponsiveBox 原生实例 | — |

## 引入方式

```typescript
import { DfResponsiveBox } from 'df-web-base'
```

全量注册后可直接在模板中使用 `<df-responsive-box>`。
