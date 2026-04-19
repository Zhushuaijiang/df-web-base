# DfSplitter 分割面板

基于 DevExtreme DxSplitter 封装的分割面板组件，支持水平和垂直分割，可拖拽调整面板大小。

> 🔧 基于 **DxSplitter** 封装

## 基础用法

通过子元素定义面板，面板之间自动出现可拖拽的分割条。

<DemoBlock title="水平分割">

<df-splitter :height="200">
<df-splitter-panel :size="'30%'">左侧面板</df-splitter-panel>
<df-splitter-panel>右侧面板</df-splitter-panel>
</df-splitter>

<template #code>

```vue
<df-splitter :height="200">
  <df-splitter-panel :size="'30%'">左侧面板</df-splitter-panel>
  <df-splitter-panel>右侧面板</df-splitter-panel>
</df-splitter>
```

</template>
</DemoBlock>

## API

### DfSplitter Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| orientation | 分割方向 | `'horizontal' \| 'vertical'` | `'horizontal'` |
| separatorSize | 分割条大小 | `number` | `8` |
| separatorColor | 分割条颜色 | `string` | — |
| allowResize | 允许调整大小 | `boolean` | `true` |
| width | 宽度 | `number \| string` | `'100%'` |
| height | 高度 | `number \| string` | — |

### DfSplitterPanel Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| size | 面板初始大小 | `string \| number` | — |
| minSize | 最小大小 | `string \| number` | — |
| maxSize | 最大大小 | `string \| number` | — |
| collapsible | 可折叠 | `boolean` | `false` |
| collapsed | 是否已折叠 | `boolean` | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| resize | 面板大小变化 | `(e)` |
| resizeEnd | 调整结束 | `(e)` |
| collapse | 面板折叠 | `(e)` |
| expand | 面板展开 | `(e)` |

### Slots

| 插槽名 | 说明 | 作用域 |
|--------|------|---------|
| default | 面板内容 | — |

### Methods (via ref)

| 方法名 | 说明 | 参数 |
|--------|------|------|
| getInstance() | 获取 DxSplitter 原生实例 | — |

## 引入方式

```typescript
import { DfSplitter, DfSplitterPanel } from 'df-web-base'
```

全量注册后可直接在模板中使用 `<df-splitter>` 和 `<df-splitter-panel>`。
