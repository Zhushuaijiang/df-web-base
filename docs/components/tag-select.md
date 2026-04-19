# DfTagSelect 标签选择

基于 DevExtreme DxTagBox 封装的标签多选组件。

> 🔧 基于 **DxTagBox** 封装

## 基础用法

通过 `data-source` 传入选项数组，默认匹配 `label` 和 `value` 字段。

<DemoBlock title="基础标签选择">
<df-tag-select :data-source="[{ label: 'HTML', value: 'html' }, { label: 'CSS', value: 'css' }, { label: 'JavaScript', value: 'js' }, { label: 'TypeScript', value: 'ts' }, { label: 'Vue', value: 'vue' }]" placeholder="选择技能"></df-tag-select>
<template #code>

```vue
<df-tag-select
  :data-source="[
    { label: 'HTML', value: 'html' },
    { label: 'CSS', value: 'css' },
    { label: 'JavaScript', value: 'js' },
    { label: 'TypeScript', value: 'ts' },
    { label: 'Vue', value: 'vue' },
  ]"
  placeholder="选择技能"
/>
```

</template>
</DemoBlock>

## 禁用状态

<DemoBlock title="禁用状态">
<df-tag-select :data-source="[{ label: '选项一', value: '1' }, { label: '选项二', value: '2' }]" disabled placeholder="禁用状态"></df-tag-select>
<template #code>

```vue
<df-tag-select
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

## 折叠标签

设置 `collapse-tags` 折叠多选标签，通过 `max-displayed-tags` 控制折叠后显示数量。

<DemoBlock title="折叠标签">
<df-tag-select :data-source="[{ label: 'HTML', value: 'html' }, { label: 'CSS', value: 'css' }, { label: 'JavaScript', value: 'js' }, { label: 'TypeScript', value: 'ts' }, { label: 'Vue', value: 'vue' }]" collapse-tags :max-displayed-tags="2" placeholder="选择技能"></df-tag-select>
<template #code>

```vue
<df-tag-select
  :data-source="[
    { label: 'HTML', value: 'html' },
    { label: 'CSS', value: 'css' },
    { label: 'JavaScript', value: 'js' },
    { label: 'TypeScript', value: 'ts' },
    { label: 'Vue', value: 'vue' },
  ]"
  collapse-tags
  :max-displayed-tags="2"
  placeholder="选择技能"
/>
```

</template>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| modelValue / v-model | 绑定值 | `Array<string \| number>` | [] |
| dataSource | 数据源 | `any[]` | [] |
| displayExpr | 显示字段 | `string` | 'label' |
| valueExpr | 值字段 | `string` | 'value' |
| placeholder | 占位文字 | `string` | '请选择' |
| disabled | 禁用 | `boolean` | false |
| clearable | 可清空 | `boolean` | true |
| filterable | 可搜索 | `boolean` | true |
| allowCreate | 允许创建新标签 | `boolean` | false |
| collapseTags | 折叠标签 | `boolean` | false |
| maxDisplayedTags | 折叠后显示数量 | `number` | 1 |
| showCheckAll | 显示全选按钮 | `boolean` | false |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:modelValue | 值改变 | `(value)` |
| change | 选择变化 | `(value)` |
| remove-tag | 移除标签 | `(value)` |
| visible-change | 下拉框显隐 | `(visible: boolean)` |

### Slots

| 插槽名 | 说明 |
|--------|------|
| item | 自定义下拉项渲染 |
| tag | 自定义标签渲染 |

## 引入方式

```typescript
import { DfTagSelect } from 'df-web-base'
```

全量注册后可直接在模板中使用 `<df-tag-select>`。
