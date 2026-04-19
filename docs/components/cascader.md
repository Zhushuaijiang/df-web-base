# DfCascader 级联选择

基于 DevExtreme DxDropDownBox 封装的级联选择组件，支持多级联动、路径显示。

> 🔧 基于 **DxDropDownBox** 封装

## 基础用法

<DemoBlock title="省市区选择">

<df-cascader placeholder="请选择地区" :options="[{ value: '1', label: '浙江省', children: [{ value: '1-1', label: '杭州市', children: [{ value: '1-1-1', label: '西湖区' }, { value: '1-1-2', label: '余杭区' }] }] }, { value: '2', label: '江苏省', children: [{ value: '2-1', label: '南京市', children: [{ value: '2-1-1', label: '鼓楼区' }] }] }]"></df-cascader>

<template #code>

```vue
<df-cascader
  v-model="value"
  :options="options"
  placeholder="请选择地区"
></df-cascader>
```

</template>
</DemoBlock>

## 自定义分隔符

<DemoBlock title="自定义分隔符">

<df-cascader separator=" > " placeholder="请选择" :options="[{ value: 'a', label: '分类 A', children: [{ value: 'a1', label: '子类 A-1' }, { value: 'a2', label: '子类 A-2' }] }, { value: 'b', label: '分类 B', children: [{ value: 'b1', label: '子类 B-1' }] }]"></df-cascader>

<template #code>

```vue
<df-cascader
  v-model="value"
  :options="options"
  separator=" > "
></df-cascader>
```

</template>
</DemoBlock>

## 不同尺寸

<DemoBlock title="尺寸">

<df-space direction="vertical">
  <df-cascader size="large" placeholder="大号" :options="[{ value: '1', label: '选项 1', children: [{ value: '1-1', label: '子选项 1' }] }]"></df-cascader>
  <df-cascader placeholder="默认" :options="[{ value: '1', label: '选项 1', children: [{ value: '1-1', label: '子选项 1' }] }]"></df-cascader>
  <df-cascader size="small" placeholder="小号" :options="[{ value: '1', label: '选项 1', children: [{ value: '1-1', label: '子选项 1' }] }]"></df-cascader>
</df-space>

<template #code>

```vue
<df-cascader size="large" placeholder="大号" :options="options"></df-cascader>
<df-cascader placeholder="默认" :options="options"></df-cascader>
<df-cascader size="small" placeholder="小号" :options="options"></df-cascader>
```

</template>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| modelValue / v-model | 绑定值 | `Array<string \| number>` | [] |
| options | 级联选项数据 | `any[]` | [] |
| placeholder | 占位文字 | `string` | '请选择' |
| disabled | 禁用 | `boolean` | false |
| readonly | 只读 | `boolean` | false |
| clearable | 可清空 | `boolean` | true |
| filterable | 可搜索 | `boolean` | false |
| showAllLevels | 显示完整路径 | `boolean` | true |
| collapseTags | 折叠标签 | `boolean` | false |
| separator | 路径分隔符 | `string` | ' / ' |
| size | 尺寸 | `'large' \| 'default' \| 'small'` | 'default' |
| width | 宽度 | `string \| number` | — |
| props | 字段配置 `{ value, label, children, multiple, checkStrictly, emitPath }` | `object` | — |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:modelValue | 值改变 | `(value)` |
| change | 选择变化 | `(value)` |

## 引入方式

```typescript
import { DfCascader } from 'df-web-base'
```

全量注册后可直接在模板中使用 `<df-cascader>`。
