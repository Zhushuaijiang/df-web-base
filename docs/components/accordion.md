# DfAccordion 手风琴

基于 DevExtreme DxAccordion 封装的手风琴折叠组件，支持多面板展开和动画效果。

> 🔧 基于 **DxAccordion** 封装

## 基础用法

通过 `dataSource` 传入面板数据，每个数据项对应一个可折叠面板。

<DemoBlock title="基础手风琴">

<df-accordion :data-source="[{ title: '基本信息', content: '患者基本信息内容' }, { title: '诊断记录', content: '诊断记录内容' }, { title: '处方信息', content: '处方信息内容' }]" title-expr="title" content-expr="content"></df-accordion>

<template #code>

```vue
<df-accordion
  :data-source="[
    { title: '基本信息', content: '患者基本信息内容' },
    { title: '诊断记录', content: '诊断记录内容' },
    { title: '处方信息', content: '处方信息内容' },
  ]"
  title-expr="title"
  content-expr="content"
/>
```

</template>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| dataSource | 面板数据源 | `any[]` | **必填** |
| titleExpr | 标题字段名 | `string` | `'title'` |
| contentExpr | 内容字段名 | `string` | `'content'` |
| multiple | 允许同时展开多个面板 | `boolean` | `false` |
| collapsible | 允许折叠已展开面板 | `boolean` | `true` |
| animationDuration | 动画时长（毫秒） | `number` | `300` |
| disabled | 禁用 | `boolean` | `false` |
| selectedIndex | 当前展开面板索引 | `number` | `0` |
| width | 宽度 | `number \| string` | `'100%'` |
| height | 高度 | `number \| string` | — |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| selectionChanged | 选中面板变化 | `(e: { addedItems, removedItems })` |
| contentReady | 内容就绪 | `(e)` |
| itemTitleClick | 标题点击 | `(e: { itemData, itemIndex })` |

### Slots

| 插槽名 | 说明 | 作用域 |
|--------|------|---------|
| default | 自定义面板内容 | `{ data, index }` |
| title | 自定义标题 | `{ data, index }` |

### Methods (via ref)

| 方法名 | 说明 | 参数 |
|--------|------|------|
| getInstance() | 获取 DxAccordion 原生实例 | — |

## 引入方式

```typescript
import { DfAccordion } from 'df-web-base'
```

全量注册后可直接在模板中使用 `<df-accordion>`。
