# DfLookup 查找选择器

基于 DevExtreme DxLookup 封装的查找选择器组件，支持下拉搜索和分页加载。

> 🔧 基于 **DxLookup** 封装

<script setup>
import { ref } from 'vue'

const selected = ref('1')
</script>

## 基础用法

通过 `dataSource` 传入数据源，`v-model` 绑定选中值。

<DemoBlock title="基础用法">

<df-lookup :data-source="[{ label: '选项一', value: '1' }, { label: '选项二', value: '2' }, { label: '选项三', value: '3' }]" display-expr="label" value-expr="value" v-model="selected" placeholder="请选择"></df-lookup>

<template #code>

```vue
<template>
  <df-lookup
    :data-source="[
      { label: '选项一', value: '1' },
      { label: '选项二', value: '2' },
      { label: '选项三', value: '3' },
    ]"
    display-expr="label"
    value-expr="value"
    v-model="selected"
    placeholder="请选择"
  />
</template>

<script setup>
import { ref } from 'vue'
const selected = ref('1')
</script>
```

</template>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| modelValue / v-model | 绑定值 | `string \| number \| null` | — |
| dataSource | 数据源 | `any[] \| DataSource` | **必填** |
| displayExpr | 显示字段名 | `string \| function` | `'label'` |
| valueExpr | 值字段名 | `string` | `'value'` |
| placeholder | 占位文字 | `string` | `'请选择'` |
| searchEnabled | 启用搜索 | `boolean` | `true` |
| searchExpr | 搜索字段 | `string \| string[]` | — |
| searchMode | 搜索模式 | `'contains' \| 'startswith'` | `'contains'` |
| showClearButton | 显示清除按钮 | `boolean` | `true` |
| showPopupTitle | 弹出框显示标题 | `boolean` | `false` |
| title | 弹出框标题 | `string` | — |
| pageLoadMode | 分页模式 | `'nextButton' \| 'scrollBottom'` | — |
| dropDownOptions | 下拉框配置 | `object` | — |
| disabled | 禁用 | `boolean` | `false` |
| width | 宽度 | `number \| string` | `'100%'` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:modelValue | 值变化 | `(value)` |
| valueChanged | 值变化（含完整事件） | `(e: { value, previousValue })` |
| opened | 下拉框打开 | `(e)` |
| closed | 下拉框关闭 | `(e)` |

### Slots

| 插槽名 | 说明 | 作用域 |
|--------|------|---------|
| — | — | — |

### Methods (via ref)

| 方法名 | 说明 | 参数 |
|--------|------|------|
| getInstance() | 获取 DxLookup 原生实例 | — |
| open() | 打开下拉框 | — |
| close() | 关闭下拉框 | — |

## 引入方式

```typescript
import { DfLookup } from 'df-web-base'
```

全量注册后可直接在模板中使用 `<df-lookup>`。
