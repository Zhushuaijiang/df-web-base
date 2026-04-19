# DfPivotGrid 透视表

基于 DevExtreme DxPivotGrid 封装的透视表组件，用于多维数据分析和汇总。

> 🔧 基于 **DxPivotGrid** 封装

## 基础用法

通过 `dataSource` 配置透视表的数据源、行维度、列维度和汇总方式。

<DemoBlock title="基础透视表">

<df-pivot-grid :data-source="{ fields: [{ area: 'row', caption: '科室', dataField: 'department' }, { area: 'column', caption: '类型', dataField: 'type' }, { area: 'data', caption: '人次', summaryType: 'count' }], store: [{ department: '内科', type: '门诊' }, { department: '内科', type: '住院' }, { department: '外科', type: '门诊' }] }" :height="300"></df-pivot-grid>

<template #code>

```vue
<df-pivot-grid
  :data-source="pivotConfig"
  :height="300"
/>
```

</template>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| dataSource | 透视表数据源配置 | `PivotGridDataSourceConfig` | **必填** |
| showColumnGrandTotals | 显示列总计 | `boolean` | `true` |
| showRowGrandTotals | 显示行总计 | `boolean` | `true` |
| showColumnTotals | 显示列小计 | `boolean` | `true` |
| showRowTotals | 显示行小计 | `boolean` | `true` |
| showTotalsPrior | 总计显示在前面 | `string` | — |
| rowHeaderLayout | 行标题布局 | `'standard' \| 'tree'` | `'standard'` |
| fieldPanel | 字段面板配置 | `object` | — |
| fieldChooser | 字段选择器配置 | `object` | — |
| export | 导出配置 | `object` | — |
| scrolling | 滚动配置 | `object` | — |
| width | 宽度 | `number \| string` | `'100%'` |
| height | 高度 | `number \| string` | — |
| disabled | 禁用 | `boolean` | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| cellClick | 单元格点击 | `(e: { cellData })` |
| cellPrepared | 单元格就绪 | `(e: { cellData, cellElement })` |
| contentReady | 内容就绪 | `(e)` |
| exported | 导出完成 | `(e)` |

### Slots

| 插槽名 | 说明 | 作用域 |
|--------|------|---------|
| — | — | — |

### Methods (via ref)

| 方法名 | 说明 | 参数 |
|--------|------|------|
| getInstance() | 获取 DxPivotGrid 原生实例 | — |
| refresh() | 刷新数据 | — |
| getDataSource() | 获取数据源实例 | — |
| bindChart(chart, integrationOptions) | 绑定图表 | `chart, options` |

## 引入方式

```typescript
import { DfPivotGrid } from 'df-web-base'
```

全量注册后可直接在模板中使用 `<df-pivot-grid>`。
