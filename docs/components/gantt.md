# DfGantt 甘特图

基于 DevExtreme DxGantt 封装的甘特图组件，用于项目任务进度可视化管理。

> 🔧 基于 **DxGantt** 封装

## 基础用法

通过 `tasks`、`dependencies`、`resources` 等配置甘特图数据。

<DemoBlock title="基础甘特图">

<df-gantt :tasks="[{ id: 1, title: '需求分析', start: '2024-01-01', end: '2024-01-10', progress: 100 }, { id: 2, title: '系统设计', start: '2024-01-11', end: '2024-01-20', progress: 60, parentId: 0 }, { id: 3, title: '编码开发', start: '2024-01-21', end: '2024-02-15', progress: 30, parentId: 0 }]" :dependencies="[{ id: 1, predecessorId: 1, successorId: 2 }, { id: 2, predecessorId: 2, successorId: 3 }]" :height="300" :show-row-lines="true" :show-column-lines="true"></df-gantt>

<template #code>

```vue
<df-gantt
  :tasks="tasks"
  :dependencies="dependencies"
  :height="300"
  :show-row-lines="true"
/>
```

</template>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| tasks | 任务数据源 | `any[] \| object` | **必填** |
| dependencies | 依赖关系数据源 | `any[] \| object` | — |
| resources | 资源数据源 | `any[] \| object` | — |
| resourceAssignments | 资源分配数据源 | `any[] \| object` | — |
| columns | 列配置 | `object[]` | — |
| scaleType | 时间刻度类型 | `'minutes' \| 'hours' \| 'sixHours' \| 'days' \| 'weeks' \| 'months' \| 'quarters' \| 'years'` | `'days'` |
| showRowLines | 显示行线 | `boolean` | `false` |
| showColumnLines | 显示列线 | `boolean` | `false` |
| taskTitlePosition | 任务标题位置 | `'inside' \| 'outside' \| 'none'` | `'inside'` |
| taskTooltipContent | 提示框内容模板 | `string \| function` | — |
| firstDayOfWeek | 每周起始日 | `number` | `0` |
| startDate | 起始日期 | `Date \| string` | — |
| endDate | 结束日期 | `Date \| string` | — |
| allowSelection | 允许选择任务 | `boolean` | `true` |
| selectedRowKey | 选中任务主键 | `any` | — |
| editing | 编辑配置 | `object` | — |
| sorting | 排序配置 | `object` | — |
| filterRow | 过滤行配置 | `object` | — |
| headerFilter | 表头过滤配置 | `object` | — |
| toolbar | 工具栏配置 | `object[]` | — |
| stripLines | 条纹线配置 | `object[]` | — |
| viewPreset | 预设视图 | `string` | — |
| width | 宽度 | `number \| string` | `'100%'` |
| height | 高度 | `number \| string` | — |
| disabled | 禁用 | `boolean` | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| taskClick | 任务点击 | `(e: { key, event })` |
| taskDblClick | 任务双击 | `(e: { key, event })` |
| selectionChanged | 选中任务变化 | `(e: { selectedRowKey })` |
| taskInserting | 任务插入中 | `(e: { values, cancel })` |
| taskInserted | 任务插入后 | `(e: { values, key })` |
| taskUpdating | 任务更新中 | `(e: { key, values, cancel })` |
| taskUpdated | 任务更新后 | `(e: { key, values })` |
| taskDeleting | 任务删除中 | `(e: { key, cancel })` |
| taskDeleted | 任务删除后 | `(e: { key })` |
| scaleCellPrepared | 刻度单元格就绪 | `(e)` |
| contentReady | 内容就绪 | `(e)` |
| customCommand | 自定义命令 | `(e: { name })` |

### Slots

| 插槽名 | 说明 | 作用域 |
|--------|------|---------|
| — | — | — |

### Methods (via ref)

| 方法名 | 说明 | 参数 |
|--------|------|------|
| getInstance() | 获取 DxGantt 原生实例 | — |
| expandAll() | 展开所有任务 | — |
| collapseAll() | 折叠所有任务 | — |
| scrollToTask(key) | 滚动到指定任务 | `key` |
| showCriticalPaths() | 显示关键路径 | — |
| hideCriticalPaths() | 隐藏关键路径 | — |
| exportToPdf() | 导出为 PDF | — |

## 引入方式

```typescript
import { DfGantt } from 'df-web-base'
```

全量注册后可直接在模板中使用 `<df-gantt>`。
