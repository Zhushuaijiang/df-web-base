# DfTable 表格

`DfTable` 是基于 DevExtreme `DxDataGrid` 的业务增强表格，适合 HIS 医共体项目中的基础列表、收费明细、主从详情、权限化操作列等典型场景。

相比原始 `DxDataGrid`，这一层封装重点提供：

- 更稳定的列模型：支持 `cellSlot`、`headerSlot`、`editSlot`、字典翻译、权限列、同值合并等。
- 更直接的操作列配置：兼容旧 `operationButtons`，新增 `operationColumn` 和 `actionColumn` 插槽。
- 更贴近业务的用法：支持 `columns` / `staticData` / `selectionMode` / `showPaging` 等更直观的别名。

> 当前版本的行合并为“当前页相邻行同值合并”，用于收费分类、医嘱分组等高频列表已足够；暂不承诺跨分页、跨分组的复杂合并行为。

<script setup>
const patientColumns = [
  { dataField: 'name', caption: '姓名', width: 90 },
  { dataField: 'gender', caption: '性别', width: 72 },
  { dataField: 'deptName', caption: '科室', minWidth: 120, headerSlot: 'deptHeader' },
  { dataField: 'status', caption: '就诊状态', width: 120, cellSlot: 'statusCell', allowFiltering: true },
  { dataField: 'admissionDate', caption: '入院日期', width: 120 },
]

const patientRows = [
  { id: 1, name: '张三', gender: '男', deptName: '呼吸内科', status: '住院', admissionDate: '2024-03-12' },
  { id: 2, name: '李四', gender: '女', deptName: '骨科', status: '待结算', admissionDate: '2024-03-16' },
  { id: 3, name: '王五', gender: '男', deptName: '心内科', status: '出院', admissionDate: '2024-03-18' },
]

const chargeColumns = [
  { dataField: 'chargeType', caption: '收费类别', width: 120, mergeRule: 'same-value' },
  { dataField: 'itemName', caption: '项目名称', minWidth: 180 },
  { dataField: 'spec', caption: '规格', width: 140 },
  { dataField: 'quantity', caption: '数量', width: 80, alignment: 'right' },
  { dataField: 'amount', caption: '金额', width: 100, alignment: 'right' },
]

const chargeRows = [
  { id: 1, chargeType: '西药费', itemName: '阿莫西林胶囊', spec: '0.25g×24粒', quantity: 2, amount: '32.00' },
  { id: 2, chargeType: '西药费', itemName: '葡萄糖注射液', spec: '250ml', quantity: 3, amount: '18.00' },
  { id: 3, chargeType: '检查费', itemName: '胸部CT', spec: '平扫', quantity: 1, amount: '220.00' },
  { id: 4, chargeType: '检查费', itemName: '心电图', spec: '常规', quantity: 1, amount: '35.00' },
]

const masterColumns = [
  { dataField: 'orderNo', caption: '医嘱号', width: 90 },
  { dataField: 'orderName', caption: '医嘱名称', minWidth: 200 },
  { dataField: 'doctorName', caption: '开嘱医师', width: 110 },
  { dataField: 'orderStatus', caption: '状态', width: 90, cellSlot: 'orderStatusCell' },
]

const masterRows = [
  { id: 1, orderNo: 'YZ001', orderName: '阿莫西林口服', doctorName: '李明', orderStatus: '执行中', frequency: '每日3次', execDept: '呼吸内科', remark: '饭后服用' },
  { id: 2, orderNo: 'YZ002', orderName: '葡萄糖静滴', doctorName: '王强', orderStatus: '待执行', frequency: '每日1次', execDept: '治疗室', remark: '注意输液速度' },
]

const scheduleColumns = [
  { dataField: 'deptName', caption: '科室', width: 120 },
  { dataField: 'doctorName', caption: '医生', width: 100 },
  { dataField: 'clinicDate', caption: '排班日期', width: 120 },
  { dataField: 'slotCount', caption: '余号', width: 80, alignment: 'right' },
]

const scheduleRows = [
  { id: 1, deptName: '呼吸内科', doctorName: '李明', clinicDate: '2024-04-01', slotCount: 12, locked: false },
  { id: 2, deptName: '骨科', doctorName: '赵峰', clinicDate: '2024-04-01', slotCount: 0, locked: true },
  { id: 3, deptName: '心内科', doctorName: '周玲', clinicDate: '2024-04-02', slotCount: 8, locked: false },
]
</script>

## 基础列表

<DemoBlock title="门诊患者列表（筛选 + 列头插槽）">
<div class="table-demo-frame">
<df-table
  :columns="patientColumns"
  :static-data="patientRows"
  key-expr="id"
  :use-fetch="false"
  selection-mode="multiple"
  :show-paging="false"
  show-filter-row
  show-header-filter
  height="280"
>
<template #toolbar>
<div class="table-demo-toolbar">
<div class="table-demo-toolbar__group">
<span class="table-demo-chip">患者 3 人</span>
<span class="table-demo-chip table-demo-chip--muted">今日入院 2 人</span>
</div>
<div class="table-demo-toolbar__group">
<DfButton type="primary" size="small">新增患者</DfButton>
<DfButton size="small">导出</DfButton>
</div>
</div>
</template>
<template #deptHeader>
<div class="table-demo-header">科室 / 病区</div>
</template>
<template #statusCell="{ data }">
<span class="table-demo-status" :class="`table-demo-status--${data.status}`">{{ data.status }}</span>
</template>
</df-table>
</div>
<template #code>

```vue
<DfTable
  :columns="columns"
  :static-data="rows"
  key-expr="id"
  :use-fetch="false"
  selection-mode="multiple"
  :show-paging="false"
  show-filter-row
  show-header-filter
  height="280"
>
  <template #toolbar>
    <div class="toolbar">
      <DfButton type="primary" size="small">新增患者</DfButton>
      <DfButton size="small">导出</DfButton>
    </div>
  </template>

  <template #deptHeader>
    <div>科室 / 病区</div>
  </template>

  <template #statusCell="{ data }">
    <DfTag :type="statusMap[data.status]">{{ data.status }}</DfTag>
  </template>
</DfTable>
```

</template>
</DemoBlock>

## 同值合并

<DemoBlock title="收费明细（相邻行同值合并）">
<div class="table-demo-frame">
<df-table
  :columns="chargeColumns"
  :static-data="chargeRows"
  key-expr="id"
  :use-fetch="false"
  :show-paging="false"
  height="260"
/>
</div>
<template #code>

```vue
const columns = [
  { dataField: 'chargeType', caption: '收费类别', width: 120, mergeRule: 'same-value' },
  { dataField: 'itemName', caption: '项目名称', minWidth: 180 },
  { dataField: 'amount', caption: '金额', width: 100, alignment: 'right' },
]

<DfTable
  :columns="columns"
  :static-data="chargeRows"
  key-expr="id"
  :use-fetch="false"
  :show-paging="false"
  height="260"
/>
```

</template>
</DemoBlock>

## 主从详情

<DemoBlock title="住院医嘱（Master Detail）">
<div class="table-demo-frame">
<df-table
  :columns="masterColumns"
  :static-data="masterRows"
  key-expr="id"
  :use-fetch="false"
  :show-paging="false"
  height="280"
>
<template #orderStatusCell="{ data }">
<span class="table-demo-status" :class="`table-demo-status--${data.orderStatus}`">{{ data.orderStatus }}</span>
</template>
<template #rowDetail="{ data }">
<div class="table-demo-detail">
<div class="table-demo-detail__item"><span>执行科室</span><b>{{ data.execDept }}</b></div>
<div class="table-demo-detail__item"><span>执行频次</span><b>{{ data.frequency }}</b></div>
<div class="table-demo-detail__item"><span>备注</span><b>{{ data.remark }}</b></div>
</div>
</template>
</df-table>
</div>
<template #code>

```vue
<DfTable
  :columns="masterColumns"
  :static-data="masterRows"
  key-expr="id"
  :use-fetch="false"
  :show-paging="false"
>
  <template #rowDetail="{ data }">
    <div class="detail-card">
      <span>执行科室：{{ data.execDept }}</span>
      <span>执行频次：{{ data.frequency }}</span>
      <span>备注：{{ data.remark }}</span>
    </div>
  </template>
</DfTable>
```

</template>
</DemoBlock>

## 自定义操作列

<DemoBlock title="门诊排班（增强操作列）">
<div class="table-demo-frame">
<df-table
  :columns="scheduleColumns"
  :static-data="scheduleRows"
  key-expr="id"
  :use-fetch="false"
  :show-paging="false"
  height="260"
  :operation-column="{ caption: '排班操作', width: 180, slotName: 'scheduleAction' }"
>
<template #scheduleAction="{ data }">
<div class="table-demo-actions">
<button class="table-demo-link" type="button">查看</button>
<button class="table-demo-link" type="button" :disabled="data.locked">编辑</button>
<button class="table-demo-link table-demo-link--danger" type="button" :disabled="data.locked">停诊</button>
</div>
</template>
</df-table>
</div>
<template #code>

```vue
<DfTable
  :columns="columns"
  :static-data="rows"
  key-expr="id"
  :use-fetch="false"
  :show-paging="false"
  :operation-column="{
    caption: '排班操作',
    width: 180,
    slotName: 'scheduleAction',
  }"
>
  <template #scheduleAction="{ data }">
    <div class="actions">
      <button type="button">查看</button>
      <button type="button" :disabled="data.locked">编辑</button>
      <button type="button" :disabled="data.locked">停诊</button>
    </div>
  </template>
</DfTable>
```

</template>
</DemoBlock>

## 兼容说明

`DfTable` 现在同时支持两套写法，旧页面可以继续跑，新页面建议优先使用更直观的字段：

| 推荐写法 | 兼容旧写法 | 说明 |
|--------|-----------|------|
| `columns` | `gridDataColumns` | 列定义 |
| `staticData` | `dataList` / `dataSource` | 静态列表 |
| `selectionMode` | `hasSelect + selectConfig.mode` | 选择模式 |
| `showPaging` | `hasPage` | 是否显示分页 |
| `fetch` | `fetchApi` | 远程加载函数 |
| `cellSlot` | `innerColumnTemplate` | 单元格模板 |

操作列优先级：

1. `actionColumn` 或自定义 `slotName` 插槽
2. `operationColumn.buttons`
3. 旧 `operationButtons`

## API

### 关键 Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| keyExpr | 行唯一键 | `string` | `'id'` |
| columns | 列定义数组 | `DfTableColumn[]` | `[]` |
| staticData | 静态数据 | `any[]` | — |
| fetch | 远程加载函数 | `(params) => Promise<FetchResult>` | — |
| useFetch | 是否走远程模式 | `boolean` | `true` |
| selectionMode | 选择模式 | `'none' \| 'single' \| 'multiple'` | `'none'` |
| showPaging | 是否显示分页 | `boolean` | `true` |
| showFilterRow | 是否显示筛选行 | `boolean` | `false` |
| showHeaderFilter | 是否显示表头筛选 | `boolean` | `false` |
| showGroupPanel | 是否显示分组面板 | `boolean` | `false` |
| showColumnChooser | 是否显示列选择器 | `boolean` | `false` |
| height | 表格高度 | `number \| string` | `'100%'` |
| minHeight | 最小高度 | `number \| string` | — |
| operationColumn | 操作列增强配置 | `OperationColumnConfig` | — |

### DfTableColumn

```ts
interface DfTableColumn {
  dataField: string
  caption?: string
  width?: number | string
  minWidth?: number
  fixed?: boolean
  fixedPosition?: 'left' | 'right'
  alignment?: 'left' | 'center' | 'right'
  dataType?: 'string' | 'number' | 'date' | 'boolean' | 'datetime'
  allowSorting?: boolean
  allowFiltering?: boolean
  allowExporting?: boolean
  filterType?: 'include' | 'exclude'
  cellSlot?: string
  headerSlot?: string
  editSlot?: string
  innerColumnTemplate?: string
  dictCode?: string
  permissionCode?: string
  groupIndex?: number
  mergeRule?: 'same-value' | ((currentRow, previousRow, rowIndex) => boolean)
  cssClass?: string
  showInColumnChooser?: boolean
}
```

### OperationColumnConfig

```ts
interface OperationColumnConfig {
  caption?: string
  width?: number
  visible?: boolean
  fixed?: boolean
  fixedPosition?: 'left' | 'right'
  permissionCode?: string
  slotName?: string
  buttons?: OperationButton[]
}
```

### Slots

| 插槽名 | 说明 |
|--------|------|
| toolbar | 表格上方工具栏 |
| rowDetail | 主从详情区域 |
| actionColumn / 自定义 slotName | 自定义操作列 |
| `cellSlot` 对应名称 | 自定义单元格 |
| `headerSlot` 对应名称 | 自定义列头 |

### Methods

| 方法名 | 说明 |
|--------|------|
| getInstance() | 获取 `DxDataGrid` 原生实例 |
| refreshPage() | 远程模式刷新当前页 |
| refreshData(dataList) | 静态模式替换数据 |
| setCurrentRow(row) | 设置当前聚焦行 |
| toggleAllSelection(selected) | 全选 / 全不选 |
| getSelectedRowKeys() | 获取选中 key |
| getSelectedRowsData() | 获取选中行数据 |
| exportGetColumns() | 获取当前可导出列 |
| exportFetchApi() | 获取导出数据 |

<style scoped>
.table-demo-frame {
  padding: 16px;
  background: linear-gradient(180deg, #f8fafc 0%, #eef4ff 100%);
  border: 1px solid #dbe7ff;
  border-radius: 16px;
}

.table-demo-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.table-demo-toolbar__group {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.table-demo-chip {
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 999px;
  background: #dbeafe;
  color: #1d4ed8;
  font-size: 12px;
  font-weight: 600;
}

.table-demo-chip--muted {
  background: #e2e8f0;
  color: #334155;
}

.table-demo-header {
  font-weight: 700;
  color: #1e293b;
}

.table-demo-status {
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
}

.table-demo-status--住院,
.table-demo-status--执行中 {
  background: #dcfce7;
  color: #166534;
}

.table-demo-status--待结算,
.table-demo-status--待执行 {
  background: #fef3c7;
  color: #92400e;
}

.table-demo-status--出院 {
  background: #e2e8f0;
  color: #475569;
}

.table-demo-detail {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  padding: 14px 16px;
  background: #fff;
  border: 1px solid #dbeafe;
  border-radius: 12px;
}

.table-demo-detail__item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 13px;
  color: #475569;
}

.table-demo-detail__item b {
  color: #0f172a;
}

.table-demo-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.table-demo-link {
  padding: 0;
  border: none;
  background: none;
  color: #2563eb;
  cursor: pointer;
}

.table-demo-link:disabled {
  color: #94a3b8;
  cursor: not-allowed;
}

.table-demo-link--danger {
  color: #dc2626;
}

@media (max-width: 768px) {
  .table-demo-toolbar {
    flex-direction: column;
    align-items: stretch;
  }

  .table-demo-detail {
    grid-template-columns: 1fr;
  }
}
</style>