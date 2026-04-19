# DfSankey 桑基图

基于 DevExtreme DxSankey 封装的桑基图组件，用于展示数据流向和转化关系。

> 🔧 基于 **DxSankey** 封装

## 基础用法

通过 `dataSource` 传入节点和链接数据。

<DemoBlock title="基础桑基图">

<df-sankey :data-source="[{ source: '门诊', target: '检查', weight: 500 }, { source: '门诊', target: '药房', weight: 300 }, { source: '检查', target: '住院', weight: 200 }, { source: '住院', target: '手术', weight: 100 }]" source-field="source" target-field="target" weight-field="weight" :height="300"></df-sankey>

<template #code>

```vue
<df-sankey
  :data-source="flows"
  source-field="source"
  target-field="target"
  weight-field="weight"
  :height="300"
/>
```

</template>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| dataSource | 数据源（链接数据） | `any[]` | **必填** |
| sourceField | 来源节点字段名 | `string` | `'source'` |
| targetField | 目标节点字段名 | `string` | `'target'` |
| weightField | 权重字段名 | `string` | `'weight'` |
| palette | 调色板 | `string \| string[]` | `'Material'` |
| nodeAlign | 节点对齐方式 | `'left' \| 'right' \| 'center' \| 'justify'` | `'justify'` |
| nodeWidth | 节点宽度 | `number` | — |
| nodePadding | 节点间距 | `number` | — |
| label | 标签配置 | `object` | — |
| tooltipEnabled | 启用提示框 | `boolean` | `true` |
| title | 标题 | `string` | — |
| width | 宽度 | `number \| string` | `'100%'` |
| height | 高度 | `number \| string` | — |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| nodeClick | 节点点击 | `(e: { target })` |
| linkClick | 链接点击 | `(e: { target })` |
| tooltipHidden | 提示框隐藏 | `(e)` |
| tooltipShown | 提示框显示 | `(e)` |

### Slots

| 插槽名 | 说明 | 作用域 |
|--------|------|---------|
| — | — | — |

### Methods (via ref)

| 方法名 | 说明 | 参数 |
|--------|------|------|
| getInstance() | 获取 DxSankey 原生实例 | — |

## 引入方式

```typescript
import { DfSankey } from 'df-web-base'
```

全量注册后可直接在模板中使用 `<df-sankey>`。
