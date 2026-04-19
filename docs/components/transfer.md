# DfTransfer 穿梭框

穿梭框组件，支持双向选择、搜索过滤、自定义数据字段。

<script setup>
import { ref } from 'vue'

const value1 = ref([1, 3])
const value2 = ref([])
</script>

## 基础用法

<DemoBlock title="基础穿梭框">

<df-transfer v-model="value1" :data="[{ key: 0, label: '选项 1' }, { key: 1, label: '选项 2' }, { key: 2, label: '选项 3' }, { key: 3, label: '选项 4' }, { key: 4, label: '选项 5' }, { key: 5, label: '选项 6', disabled: true }]" :titles="['可选', '已选']"></df-transfer>

<template #code>

```vue
<template>
  <df-transfer
    v-model="value"
    :data="data"
    :titles="['可选', '已选']"
  />
</template>

<script setup>
import { ref } from 'vue'
const value = ref([1, 3])
const data = [
  { key: 0, label: '选项 1' },
  { key: 1, label: '选项 2' },
  { key: 2, label: '选项 3' },
  { key: 3, label: '选项 4' },
  { key: 4, label: '选项 5' },
  { key: 5, label: '选项 6', disabled: true },
]
</script>
```

</template>
</DemoBlock>

## 可搜索

<DemoBlock title="搜索过滤">

<df-transfer v-model="value2" :data="[{ key: 0, label: '北京' }, { key: 1, label: '上海' }, { key: 2, label: '广州' }, { key: 3, label: '深圳' }, { key: 4, label: '杭州' }, { key: 5, label: '成都' }]" :titles="['源列表', '目标列表']" filterable></df-transfer>

<template #code>

```vue
<df-transfer
  v-model="value"
  :data="cities"
  :titles="['源列表', '目标列表']"
  filterable
/>
```

</template>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| modelValue / v-model | 右侧列表的值 | `Array<string \| number>` | [] |
| data | 数据源 | `any[]` | [] |
| titles | 左右列表标题 | `[string, string]` | ['', ''] |
| filterable | 可搜索 | `boolean` | false |
| filterPlaceholder | 搜索占位文字 | `string` | '请输入搜索内容' |
| filterMethod | 自定义搜索方法 | `(query, item) => boolean` | — |
| targetOrder | 右侧列表排序 | `'original' \| 'push' \| 'unshift'` | 'original' |
| props | 数据字段配置 `{ key, label, disabled }` | `object` | — |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:modelValue | 值改变 | `(value)` |
| change | 选择变化 | `(value, direction, movedKeys)` |
| left-check-change | 左侧勾选变化 | `(checked)` |
| right-check-change | 右侧勾选变化 | `(checked)` |

## 引入方式

```typescript
import { DfTransfer } from 'df-web-base'
```

全量注册后可直接在模板中使用 `<df-transfer>`。
