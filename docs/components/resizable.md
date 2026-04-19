# DfResizable 可调整大小

基于 DevExtreme DxResizable 封装的可调整大小容器组件，支持拖拽调整宽高。

> 🔧 基于 **DxResizable** 封装

## 基础用法

通过 `handles` 指定可拖拽的调整方向。

<DemoBlock title="基础用法">

<df-resizable handles="right bottom" :width="200" :height="150" style="border: 1px solid #dcdfe6; padding: 12px;">拖拽右下角调整大小</df-resizable>

<template #code>

```vue
<df-resizable handles="right bottom" :width="200" :height="150">
  <div style="padding: 12px">拖拽右下角调整大小</div>
</df-resizable>
```

</template>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| width | 宽度 | `number` | — |
| height | 高度 | `number` | — |
| minWidth | 最小宽度 | `number` | `20` |
| maxWidth | 最大宽度 | `number` | — |
| minHeight | 最小高度 | `number` | `20` |
| maxHeight | 最大高度 | `number` | — |
| handles | 可调整的方向 | `'top' \| 'bottom' \| 'left' \| 'right' \| 'top right' \| 'bottom right' \| ...` | `'right'` |
| area | 限制调整范围 | `string \| Element` | — |
| keepAspectRatio | 保持宽高比 | `boolean` | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| resize | 尺寸变化 | `(e: { width, height, event })` |
| resizeEnd | 调整结束 | `(e: { width, height })` |
| resizeStart | 调整开始 | `(e)` |

### Slots

| 插槽名 | 说明 | 作用域 |
|--------|------|---------|
| default | 容器内容 | — |

### Methods (via ref)

| 方法名 | 说明 | 参数 |
|--------|------|------|
| getInstance() | 获取 DxResizable 原生实例 | — |

## 引入方式

```typescript
import { DfResizable } from 'df-web-base'
```

全量注册后可直接在模板中使用 `<df-resizable>`。
