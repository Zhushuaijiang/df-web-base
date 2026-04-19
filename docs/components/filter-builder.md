# DfFilterBuilder 过滤条件构建器

基于 DevExtreme 25.2 DxFilterBuilder 封装，支持可视化构建复杂过滤条件，通过 v-model 获取结构化的过滤表达式。

> 基于 **DxFilterBuilder** 封装 | 来源：`devextreme-vue/filter-builder`

## 患者信息查询

<DemoBlock title="患者信息多条件过滤">
<div class="demo-frame demo-frame--h420">
  <div style="padding:16px;">
    <div class="demo-section">患者查询条件</div>
    <div style="border:1px solid #E8EBF0; border-radius:4px; padding:12px; margin-top:8px; background:#FAFBFC;">
      <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
        <span style="padding:2px 8px; border:1px solid #E8EBF0; border-radius:4px; font-size:12px; background:#fff;">AND</span>
        <span style="font-size:12px; color:#6B7790;">匹配所有条件</span>
      </div>
      <div style="border-left:2px solid #2AA890; padding-left:12px; margin-left:8px;">
        <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
          <select style="height:28px; border:1px solid #E8EBF0; border-radius:4px; font-size:12px; padding:0 8px;">
            <option>患者姓名</option>
          </select>
          <select style="height:28px; border:1px solid #E8EBF0; border-radius:4px; font-size:12px; padding:0 8px;">
            <option>包含</option>
          </select>
          <input type="text" value="张" style="height:28px; border:1px solid #E8EBF0; border-radius:4px; font-size:12px; padding:0 8px; width:120px;" />
        </div>
        <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
          <select style="height:28px; border:1px solid #E8EBF0; border-radius:4px; font-size:12px; padding:0 8px;">
            <option>年龄</option>
          </select>
          <select style="height:28px; border:1px solid #E8EBF0; border-radius:4px; font-size:12px; padding:0 8px;">
            <option>>=</option>
          </select>
          <input type="number" value="18" style="height:28px; border:1px solid #E8EBF0; border-radius:4px; font-size:12px; padding:0 8px; width:80px;" />
        </div>
        <div style="display:flex; align-items:center; gap:8px;">
          <select style="height:28px; border:1px solid #E8EBF0; border-radius:4px; font-size:12px; padding:0 8px;">
            <option>是否医保</option>
          </select>
          <select style="height:28px; border:1px solid #E8EBF0; border-radius:4px; font-size:12px; padding:0 8px;">
            <option>=</option>
          </select>
          <select style="height:28px; border:1px solid #E8EBF0; border-radius:4px; font-size:12px; padding:0 8px;">
            <option>是</option>
          </select>
        </div>
      </div>
    </div>
    <div style="margin-top:12px;">
      <div class="demo-section demo-section--tight">生成的过滤表达式</div>
      <pre style="background:#F7F8FA; padding:8px; border-radius:4px; font-size:12px; margin-top:4px; color:#1A1A1A;">[["patientName","contains","张"],"and",["age",">=",18],"and",["isInsured","=",true]]</pre>
    </div>
  </div>
</div>
<template #code>

```vue
<template>
  <df-filter-builder v-model="filterValue" :fields="patientFields" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DfFilterBuilder } from 'df-web-base'
import type { DfFilterField } from 'df-web-base'

const filterValue = ref<any[] | null>(null)

const patientFields: DfFilterField[] = [
  { dataField: 'patientName', caption: '患者姓名', dataType: 'string' },
  { dataField: 'age', caption: '年龄', dataType: 'number' },
  { dataField: 'admissionDate', caption: '入院日期', dataType: 'date' },
  {
    dataField: 'isInsured',
    caption: '是否医保',
    dataType: 'boolean',
    trueText: '是',
    falseText: '否',
  },
  {
    dataField: 'department',
    caption: '科室',
    dataType: 'string',
    lookup: {
      dataSource: [
        { value: 'neike', text: '内科' },
        { value: 'waike', text: '外科' },
        { value: 'erke', text: '儿科' },
        { value: 'fuke', text: '妇产科' },
        { value: 'guke', text: '骨科' },
      ],
    },
  },
]
</script>
```

</template>
</DemoBlock>

## 处方查询（限制操作符）

通过 `filterOperations` 限制每个字段可用的操作符，`format` 格式化数值显示。

<DemoBlock title="处方查询 — 限制操作符和格式化">
<div class="demo-frame demo-frame--h360">
  <div style="padding:16px;">
    <div class="demo-section">处方查询条件</div>
    <div style="border:1px solid #E8EBF0; border-radius:4px; padding:12px; margin-top:8px; background:#FAFBFC;">
      <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
        <span style="padding:2px 8px; border:1px solid #E8EBF0; border-radius:4px; font-size:12px; background:#fff;">AND</span>
      </div>
      <div style="border-left:2px solid #2AA890; padding-left:12px; margin-left:8px;">
        <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
          <select style="height:28px; border:1px solid #E8EBF0; border-radius:4px; font-size:12px; padding:0 8px;">
            <option>药品名称</option>
          </select>
          <select style="height:28px; border:1px solid #E8EBF0; border-radius:4px; font-size:12px; padding:0 8px;">
            <option>包含</option>
          </select>
          <input type="text" value="阿莫西林" style="height:28px; border:1px solid #E8EBF0; border-radius:4px; font-size:12px; padding:0 8px; width:120px;" />
        </div>
        <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
          <select style="height:28px; border:1px solid #E8EBF0; border-radius:4px; font-size:12px; padding:0 8px;">
            <option>处方金额</option>
          </select>
          <select style="height:28px; border:1px solid #E8EBF0; border-radius:4px; font-size:12px; padding:0 8px;">
            <option>between</option>
          </select>
          <input type="text" value="100" style="height:28px; border:1px solid #E8EBF0; border-radius:4px; font-size:12px; padding:0 8px; width:80px;" />
          <span style="font-size:12px; color:#6B7790;">~</span>
          <input type="text" value="500" style="height:28px; border:1px solid #E8EBF0; border-radius:4px; font-size:12px; padding:0 8px; width:80px;" />
          <span style="font-size:12px; color:#6B7790;">元</span>
        </div>
        <div style="display:flex; align-items:center; gap:8px;">
          <select style="height:28px; border:1px solid #E8EBF0; border-radius:4px; font-size:12px; padding:0 8px;">
            <option>处方日期</option>
          </select>
          <select style="height:28px; border:1px solid #E8EBF0; border-radius:4px; font-size:12px; padding:0 8px;">
            <option>>=</option>
          </select>
          <input type="date" style="height:28px; border:1px solid #E8EBF0; border-radius:4px; font-size:12px; padding:0 8px;" />
        </div>
      </div>
    </div>
  </div>
</div>
<template #code>

```vue
<template>
  <df-filter-builder v-model="filter" :fields="prescriptionFields" :max-group-level="2" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DfFilterBuilder } from 'df-web-base'
import type { DfFilterField } from 'df-web-base'

const filter = ref<any[] | null>(null)

const prescriptionFields: DfFilterField[] = [
  {
    dataField: 'drugName',
    caption: '药品名称',
    dataType: 'string',
    filterOperations: ['contains', '=', 'startswith'],
  },
  {
    dataField: 'amount',
    caption: '处方金额',
    dataType: 'number',
    filterOperations: ['=', '>', '>=', '<', '<=', 'between'],
    format: { type: 'fixedPoint', precision: 2 },
  },
  {
    dataField: 'prescriptionDate',
    caption: '处方日期',
    dataType: 'date',
    filterOperations: ['=', '>', '>=', '<', '<=', 'between'],
  },
  {
    dataField: 'doctorName',
    caption: '开方医生',
    dataType: 'string',
    filterOperations: ['contains', '='],
  },
  {
    dataField: 'status',
    caption: '处方状态',
    dataType: 'string',
    lookup: {
      dataSource: [
        { value: 'active', text: '有效' },
        { value: 'completed', text: '已完成' },
        { value: 'cancelled', text: '已取消' },
      ],
    },
  },
]
</script>
```

</template>
</DemoBlock>

## 医保费用筛选（限制分组层级）

通过 `maxGroupLevel` 防止过度嵌套，通过 ref 获取过滤表达式用于查询。

<DemoBlock title="医保费用筛选 + 应用查询">
<div class="demo-frame demo-frame--h420">
  <div style="padding:16px;">
    <div class="demo-section">医保费用条件筛选（最多 2 层嵌套）</div>
    <div style="border:1px solid #E8EBF0; border-radius:4px; padding:12px; margin-top:8px; background:#FAFBFC;">
      <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
        <span style="padding:2px 8px; border:1px solid #E8EBF0; border-radius:4px; font-size:12px; background:#fff;">AND</span>
      </div>
      <div style="border-left:2px solid #2AA890; padding-left:12px; margin-left:8px;">
        <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
          <select style="height:28px; border:1px solid #E8EBF0; border-radius:4px; font-size:12px; padding:0 8px;">
            <option>医保类型</option>
          </select>
          <select style="height:28px; border:1px solid #E8EBF0; border-radius:4px; font-size:12px; padding:0 8px;">
            <option>=</option>
          </select>
          <select style="height:28px; border:1px solid #E8EBF0; border-radius:4px; font-size:12px; padding:0 8px;">
            <option>职工医保</option>
          </select>
        </div>
        <div style="display:flex; align-items:center; gap:8px;">
          <select style="height:28px; border:1px solid #E8EBF0; border-radius:4px; font-size:12px; padding:0 8px;">
            <option>报销金额</option>
          </select>
          <select style="height:28px; border:1px solid #E8EBF0; border-radius:4px; font-size:12px; padding:0 8px;">
            <option>>=</option>
          </select>
          <input type="text" value="500" style="height:28px; border:1px solid #E8EBF0; border-radius:4px; font-size:12px; padding:0 8px; width:80px;" />
        </div>
      </div>
    </div>
    <div style="margin-top:12px;">
      <button style="padding:6px 20px; background:#2AA890; color:#fff; border:none; border-radius:4px; font-size:12px; cursor:pointer;">应用过滤</button>
    </div>
    <div style="margin-top:12px;">
      <div class="demo-section demo-section--tight">getFilterExpression() 输出</div>
      <pre style="background:#F7F8FA; padding:8px; border-radius:4px; font-size:12px; margin-top:4px; color:#1A1A1A;">[["insuranceType","=","zhigong"],"and",["reimburseAmount",">=",500]]</pre>
    </div>
  </div>
</div>
<template #code>

```vue
<template>
  <df-filter-builder
    ref="builderRef"
    v-model="filter"
    :fields="insuranceFields"
    :max-group-level="2"
  />
  <df-button type="default" @click="applyFilter">应用过滤</df-button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DfFilterBuilder, DfButton } from 'df-web-base'
import type { DfFilterField } from 'df-web-base'

const builderRef = ref<InstanceType<typeof DfFilterBuilder>>()
const filter = ref<any[] | null>(null)

const insuranceFields: DfFilterField[] = [
  { dataField: 'patientName', caption: '患者姓名', dataType: 'string' },
  {
    dataField: 'insuranceType',
    caption: '医保类型',
    dataType: 'string',
    lookup: {
      dataSource: [
        { value: 'zhigong', text: '职工医保' },
        { value: 'jumin', text: '居民医保' },
        { value: 'xinnonghe', text: '新农合' },
      ],
    },
  },
  {
    dataField: 'reimburseAmount',
    caption: '报销金额',
    dataType: 'number',
    format: { type: 'fixedPoint', precision: 2 },
  },
  { dataField: 'settleDate', caption: '结算日期', dataType: 'date' },
]

function applyFilter() {
  const expression = builderRef.value?.getFilterExpression()
  // 将 expression 传给后端接口查询
  console.log('过滤表达式：', expression)
  // fetchPatientList(expression)
}
</script>
```

</template>
</DemoBlock>

## 过滤表达式格式

DfFilterBuilder 输出的 `modelValue` 是嵌套数组结构：

```typescript
// 单条件
['field', 'operator', 'value']

// 组合条件（AND）
[['field1', '=', 'value1'], 'and', ['field2', '>', 100]]

// 嵌套分组
[
  [['name', 'contains', '张'], 'or', ['name', 'contains', '李']],
  'and',
  ['age', '>=', 18]
]
```

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| modelValue (v-model) | 过滤条件表达式 | `any[] \| null` | `null` |
| fields | 可选字段定义数组 | `DfFilterField[]` | **必填** |
| maxGroupLevel | 最大分组嵌套层级。`undefined` 不限制 | `number` | -- |
| allowHierarchyFields | 是否启用层级字段（如 `address.city`） | `boolean` | `false` |
| customOperations | 自定义操作符扩展 | `CustomOperation[]` | `[]` |

### DfFilterField 类型

```typescript
interface DfFilterField {
  /** 数据字段名 */
  dataField: string
  /** 字段显示名称 */
  caption?: string
  /** 字段数据类型 */
  dataType?: 'string' | 'number' | 'date' | 'boolean' | 'object' | 'datetime'
  /** 允许的过滤操作符。不设置则根据 dataType 自动生成 */
  filterOperations?: DfFilterOperation[]
  /** 枚举值查找配置（下拉选择） */
  lookup?: {
    dataSource: any[]
    valueExpr?: string
    displayExpr?: string
  }
  /** 值格式化 */
  format?: string | object
  /** boolean 类型为 true 时显示的文本 */
  trueText?: string
  /** boolean 类型为 false 时显示的文本 */
  falseText?: string
}
```

### DfFilterOperation 类型

```typescript
type DfFilterOperation =
  | '='       // 等于
  | '<>'      // 不等于
  | '<'       // 小于
  | '<='      // 小于等于
  | '>'       // 大于
  | '>='      // 大于等于
  | 'contains'     // 包含
  | 'notcontains'  // 不包含
  | 'startswith'   // 开头是
  | 'endswith'     // 结尾是
  | 'between'      // 介于
  | 'isblank'      // 为空
  | 'isnotblank'   // 不为空
```

### CustomOperation 类型

```typescript
interface CustomOperation {
  /** 操作符名称 */
  name: string
  /** 显示文本 */
  caption: string
  /** 支持的数据类型 */
  dataTypes?: string[]
  /** 是否需要输入值 */
  hasValue?: boolean
  /** 图标 */
  icon?: string
  /** 自定义过滤表达式生成函数 */
  calculateFilterExpression?: (filterValue: any, field: any) => any[]
}
```

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:modelValue | 过滤条件变更时触发（v-model） | `(value: any[] \| null)` |
| change | 过滤条件变更时触发 | `(value: any[] \| null)` |

### Methods（通过 ref 调用）

| 方法名 | 说明 | 参数 |
|--------|------|------|
| getInstance() | 获取 DevExtreme DxFilterBuilder 原生实例 | -- |
| getFilterExpression() | 获取当前过滤条件表达式，可传给后端 DataSource 过滤 | -- |

### Slots

本组件无具名插槽。

## 引入方式

```typescript
import { DfFilterBuilder } from 'df-web-base'
import type { DfFilterField, DfFilterOperation, DfFilterValue } from 'df-web-base'
```

## 与 DevExtreme DxFilterBuilder 的差异

| 特性 | DxFilterBuilder | DfFilterBuilder |
|------|----------------|-----------------|
| 值绑定 | `value` prop | `v-model` (modelValue) |
| 字段配置 | `<DxField>` 子组件 | `fields` 数组 prop |
| 自定义操作符 | `<DxCustomOperation>` | `customOperations` prop |
| 事件 | `onValueChanged` | `change` + `update:modelValue` |
