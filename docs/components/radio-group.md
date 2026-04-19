# DfRadioGroup 单选按钮组

基于 DevExtreme DxRadioGroup 封装的单选按钮组组件，支持字典编码自动加载。

> 🔧 基于 **DxRadioGroup** 封装

<script setup>
import { ref } from 'vue'

const selected = ref('1')
</script>

## 基础用法

通过 `dataSource` 传入选项数组，`v-model` 绑定选中值。

<DemoBlock title="基础用法">

<df-radio-group :data-source="[{ label: '选项一', value: '1' }, { label: '选项二', value: '2' }, { label: '选项三', value: '3' }]" display-expr="label" value-expr="value" v-model="selected"></df-radio-group>

<template #code>

```vue
<template>
  <df-radio-group
    :data-source="[
      { label: '选项一', value: '1' },
      { label: '选项二', value: '2' },
      { label: '选项三', value: '3' },
    ]"
    display-expr="label"
    value-expr="value"
    v-model="selected"
  />
</template>

<script setup>
import { ref } from 'vue'
const selected = ref('1')
</script>
```

</template>
</DemoBlock>

## 字典模式

通过 `dictCode` 自动从字典服务加载选项。

<DemoBlock title="字典模式">

<df-radio-group dict-code="sys_gender"></df-radio-group>

<template #code>

```vue
<df-radio-group dict-code="sys_gender" v-model="selected" />
```

</template>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| modelValue / v-model | 绑定值 | `string \| number \| null` | — |
| dictCode | 字典编码（自动查询字典服务） | `string` | — |
| dataSource | 自定义数据源 | `any[]` | — |
| displayExpr | 显示字段名 | `string` | `'label'` |
| valueExpr | 值字段名 | `string` | `'value'` |
| layout | 布局方向 | `'horizontal' \| 'vertical'` | `'vertical'` |
| disabled | 禁用 | `boolean` | `false` |
| visible | 是否可见 | `boolean` | `true` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:modelValue | 值变化 | `(value: string \| number \| null)` |
| valueChanged | 值变化（含完整事件对象） | `(e: { value, previousValue })` |

### Slots

| 插槽名 | 说明 | 作用域 |
|--------|------|---------|
| — | — | — |

## 引入方式

```typescript
import { DfRadioGroup } from 'df-web-base'
```

全量注册后可直接在模板中使用 `<df-radio-group>`。
