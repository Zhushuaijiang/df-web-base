# DfDiagram 图表编辑器

基于 DevExtreme DxDiagram 封装的图表编辑器组件，支持流程图、组织结构图等可视化编辑。

> 🔧 基于 **DxDiagram** 封装

## 基础用法

通过 `simpleView` 简化工具栏，`autoZoomMode` 自动缩放。

<DemoBlock title="基础图表编辑器">

<df-diagram :height="400" simple-view auto-zoom-mode="fitWidth"></df-diagram>

<template #code>

```vue
<df-diagram :height="400" simple-view auto-zoom-mode="fitWidth" />
```

</template>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| nodes | 节点数据源 | `any[] \| object` | — |
| edges | 边数据源 | `any[] \| object` | — |
| dataSource | 统一数据源（含 nodes 和 edges） | `object` | — |
| simpleView | 简化视图（隐藏工具栏） | `boolean` | `false` |
| readOnly | 只读模式 | `boolean` | `false` |
| autoZoomMode | 自动缩放模式 | `'fitContent' \| 'fitWidth' \| 'disabled'` | `'disabled'` |
| zoomLevel | 缩放级别 | `number` | `1` |
| showGrid | 显示网格 | `boolean` | `true` |
| snapToGrid | 吸附到网格 | `boolean` | `true` |
| gridSize | 网格大小 | `number` | `0.5` |
| units | 单位 | `'in' \| 'cm' \| 'px'` | `'in'` |
| pageColor | 页面背景色 | `string` | — |
| toolbox | 工具箱配置 | `object` | — |
| propertiesPanel | 属性面板配置 | `object` | — |
| export | 导出配置 | `object` | — |
| width | 宽度 | `number \| string` | `'100%'` |
| height | 高度 | `number \| string` | — |
| disabled | 禁用 | `boolean` | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| requestEditOperation | 请求编辑操作 | `(e: { operation, allowed })` |
| requestLayoutUpdate | 请求布局更新 | `(e)` |
| selectionChanged | 选中元素变化 | `(e: { items })` |
| contentReady | 内容就绪 | `(e)` |
| customCommand | 自定义命令 | `(e: { name })` |
| itemDblClick | 双击元素 | `(e: { item })` |

### Slots

| 插槽名 | 说明 | 作用域 |
|--------|------|---------|
| — | — | — |

### Methods (via ref)

| 方法名 | 说明 | 参数 |
|--------|------|------|
| getInstance() | 获取 DxDiagram 原生实例 | — |
| exportTo(format) | 导出图表 | `'svg' \| 'png' \| 'jpg'` |
| importFrom(data, format) | 导入图表 | `data, format` |
| scrollToItem(id) | 滚动到指定元素 | `id` |
| zoomToFit() | 缩放以适应 | — |

## 引入方式

```typescript
import { DfDiagram } from 'df-web-base'
```

全量注册后可直接在模板中使用 `<df-diagram>`。
