# DfAutocomplete 自动完成

基于 DevExtreme DxAutocomplete 封装的自动完成搜索组件，支持防抖、自定义建议项。

> 🔧 基于 **DxAutocomplete** 封装

## 基础用法

<DemoBlock title="输入搜索建议">

<df-autocomplete placeholder="输入城市名称" :fetch-suggestions="(query, cb) => { const cities = ['北京', '上海', '广州', '深圳', '杭州', '成都', '武汉', '南京']; cb(cities.filter(c => c.includes(query)).map(c => ({ value: c }))); }"></df-autocomplete>

<template #code>

```vue
<df-autocomplete
  v-model="value"
  :fetch-suggestions="fetchSuggestions"
  placeholder="输入城市名称"
></df-autocomplete>
```

</template>
</DemoBlock>

## 禁用状态

<DemoBlock title="禁用">

<df-autocomplete placeholder="已禁用" disabled></df-autocomplete>

<template #code>

```vue
<df-autocomplete
  placeholder="已禁用"
  disabled
></df-autocomplete>
```

</template>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| modelValue / v-model | 绑定值 | `string` | '' |
| fetchSuggestions | 获取建议方法 | `(query, callback) => void` | — |
| placeholder | 占位文字 | `string` | '请输入' |
| disabled | 禁用 | `boolean` | false |
| readonly | 只读 | `boolean` | false |
| clearable | 可清空 | `boolean` | true |
| size | 尺寸 | `'large' \| 'default' \| 'small'` | 'default' |
| debounce | 防抖延迟 (ms) | `number` | 300 |
| minLength | 触发搜索最小字符数 | `number` | 1 |
| valueExpr | 值字段 | `string` | 'value' |
| searchExpr | 搜索字段 | `string \| string[]` | 'value' |
| maxCount | 最大显示条数 | `number` | 10 |
| triggerOnFocus | 聚焦时触发 | `boolean` | true |
| width | 宽度 | `string \| number` | — |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:modelValue | 值改变 | `(value: string)` |
| select | 选中建议项 | `(item)` |
| input | 输入时触发 | `(value: string)` |
| focus | 聚焦 | `(e: Event)` |
| blur | 失焦 | `(e: Event)` |
| change | 值变化 | `(value: string)` |

### Slots

| 插槽名 | 说明 |
|--------|------|
| item | 自定义建议项渲染，参数 `{ item }` |
| prefix | 前缀内容 |

### Methods

| 方法名 | 说明 | 参数 |
|--------|------|------|
| focus | 聚焦 | — |

## 引入方式

```typescript
import { DfAutocomplete } from 'df-web-base'
```

全量注册后可直接在模板中使用 `<df-autocomplete>`。
