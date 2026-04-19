# DfSelect 选择器

基于 DevExtreme DxSelectBox 封装的下拉选择组件，支持字典编码自动加载和自定义数据源。

> 🔧 基于 **DxSelectBox** 封装

## 基础用法

通过 `data-source` 传入选项数组，默认匹配 `label` 和 `value` 字段。

<DemoBlock title="基础选择器">

<df-select :data-source="[{ label: '选项一', value: '1' }, { label: '选项二', value: '2' }, { label: '选项三', value: '3' }]" placeholder="请选择"></df-select>

<template #code>

```vue
<df-select
  :data-source="[
    { label: '选项一', value: '1' },
    { label: '选项二', value: '2' },
    { label: '选项三', value: '3' },
  ]"
  placeholder="请选择"
/>
```

</template>
</DemoBlock>

## 禁用状态

<DemoBlock title="禁用状态">

<df-select :data-source="[{ label: '选项一', value: '1' }, { label: '选项二', value: '2' }]" disabled placeholder="禁用状态"></df-select>

<template #code>

```vue
<df-select
  :data-source="[
    { label: '选项一', value: '1' },
    { label: '选项二', value: '2' },
  ]"
  disabled
  placeholder="禁用状态"
/>
```

</template>
</DemoBlock>

## 字典模式

通过 `dict-code` 自动从字典服务加载选项，无需手动传入数据源。

<DemoBlock title="字典模式">

<df-select dict-code="sys_gender" placeholder="请选择性别"></df-select>

<template #code>

```vue
<df-select dict-code="sys_gender" placeholder="请选择性别"></df-select>
```

</template>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| modelValue / v-model | 绑定值 | `string \| number \| null` | — |
| dictCode | 字典编码（自动查询字典服务） | `string` | — |
| dataSource | 自定义数据源 | `DictItem[]` | — |
| displayExpr | 显示字段名 | `string` | 'label' |
| valueExpr | 值字段名 | `string` | 'value' |
| searchEnabled | 启用搜索 | `boolean` | true |
| showClearButton | 显示清除按钮 | `boolean` | true |
| placeholder | 占位文字 | `string` | '请选择' |
| disabled | 禁用 | `boolean` | false |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:modelValue | 值改变 | `(value: string \| number \| null)` |

## 引入方式

```typescript
import { DfSelect } from 'df-web-base'
```

全量注册后可直接在模板中使用 `<df-select>`。
