# DfForm 表单

基于 DevExtreme DxForm 封装的表单容器组件，支持字段配置化、字典自动绑定和权限控制。

> 🔧 基于 **DxForm** 封装

## 基础用法

<DemoBlock title="基础表单">
<df-form :form-data="{ name: '张三', gender: '1', age: 28 }" :fields="[{ dataField: 'name', label: '姓名', required: true }, { dataField: 'gender', label: '性别', editorType: 'dxSelectBox', editorOptions: { items: [{ value: '1', text: '男' }, { value: '2', text: '女' }], displayExpr: 'text', valueExpr: 'value' } }, { dataField: 'age', label: '年龄', editorType: 'dxNumberBox' }]" :col-count="1"></df-form>
<template #code>

```vue
<df-form
  :form-data="formData"
  :fields="fields"
  :col-count="1"
/>

<script setup>
const formData = reactive({ name: '张三', gender: '1', age: 28 })
const fields = [
  { dataField: 'name', label: '姓名', required: true },
  { dataField: 'gender', label: '性别', editorType: 'dxSelectBox',
    editorOptions: { items: [
      { value: '1', text: '男' },
      { value: '2', text: '女' }
    ], displayExpr: 'text', valueExpr: 'value' }
  },
  { dataField: 'age', label: '年龄', editorType: 'dxNumberBox' },
]
</script>
```

</template>
</DemoBlock>

## 多列布局

<DemoBlock title="两列表单">
<df-form :form-data="{ name: '', phone: '', email: '', address: '' }" :fields="[{ dataField: 'name', label: '姓名' }, { dataField: 'phone', label: '电话' }, { dataField: 'email', label: '邮箱', colSpan: 2 }]" :col-count="2"></df-form>
<template #code>

```vue
<df-form :form-data="formData" :fields="fields" :col-count="2" />

<script setup>
const fields = [
  { dataField: 'name', label: '姓名' },
  { dataField: 'phone', label: '电话' },
  { dataField: 'email', label: '邮箱', colSpan: 2 },
]
</script>
```

</template>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| formData | 表单数据对象（响应式，字段值通过 `dataField` 映射） | `Record<string, any>` | — |
| fields | 字段配置数组，声明每个表单项的编辑器、校验、布局等 | `DfFieldConfig[]` | — |
| colCount | 表单列数（字段自动按列排列） | `number` | `2` |
| readOnly | 全局只读模式（所有编辑器变为只读） | `boolean` | `false` |

### DfFieldConfig 字段配置类型

```typescript
interface DfFieldConfig {
  /** 字段名，对应 formData 中的 key */
  dataField: string
  /** 字段标签文字 */
  label?: string
  /** 编辑器类型（DevExtreme 编辑器名称） */
  editorType?: 'dxTextBox' | 'dxNumberBox' | 'dxSelectBox' | 'dxDateBox'
    | 'dxCheckBox' | 'dxSwitch' | 'dxTextArea' | 'dxRadioGroup' | string
  /** 字典编码。设置后自动转为 DxSelectBox + 从字典服务加载数据源 */
  dictCode?: string
  /** 权限编码。用户不具备此权限时隐藏该字段 */
  permissionCode?: string
  /** 列跨度（占几列宽度） */
  colSpan?: number
  /** 是否可见 */
  visible?: boolean
  /** 是否必填（自动添加必填校验和红色星号） */
  required?: boolean
  /** 编辑器原生配置（透传给对应的 DevExtreme 编辑器组件） */
  editorOptions?: Record<string, any>
}
```

#### editorType 常用值

| editorType | 编辑器 | 说明 |
|------------|--------|------|
| `dxTextBox` | 文本输入框 | 默认编辑器（不设 editorType 时使用） |
| `dxNumberBox` | 数字输入框 | 数字类型字段 |
| `dxSelectBox` | 下拉选择器 | 设置 `dictCode` 时自动使用 |
| `dxDateBox` | 日期选择器 | 日期/时间类型字段 |
| `dxCheckBox` | 复选框 | 布尔类型字段 |
| `dxSwitch` | 开关 | 布尔类型字段（替代 CheckBox） |
| `dxTextArea` | 文本域 | 多行文本输入 |
| `dxRadioGroup` | 单选按钮组 | 少量选项的单选 |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 透传到 DxForm 内部（可使用 `DxSimpleItem`、`DxGroupItem` 等子组件自定义布局） |

### Events / Methods

本组件不暴露自定义事件和方法。

## 字典自动绑定

设置 `dictCode` 后，DfForm 自动将该字段转为下拉选择器并从字典服务加载选项：

```vue
<df-form
  :form-data="formData"
  :fields="[
    { dataField: 'gender', label: '性别', dictCode: 'sys_gender' },
    { dataField: 'nation', label: '民族', dictCode: 'sys_nation' },
    { dataField: 'marital', label: '婚姻状况', dictCode: 'sys_marital_status' },
  ]"
  :col-count="3"
/>
```

## 权限控制字段

通过 `permissionCode` 控制字段可见性：

```vue
<df-form
  :form-data="formData"
  :fields="[
    { dataField: 'name', label: '姓名' },
    { dataField: 'salary', label: '工资', permissionCode: 'hr:salary:view' },
  ]"
/>
```

## 引入方式

```typescript
import { DfForm } from 'df-web-base'
import type { DfFormProps, DfFieldConfig } from 'df-web-base'
```
