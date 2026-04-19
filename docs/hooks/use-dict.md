# useDict 字典解析

字典数据解析组合式函数。传入字典编码，自动加载字典项并解析标签。

## 基础用法

```vue
<template>
  <div>
    <DfSelect v-model="gender" :items="items" />
    <span>标签：{{ getLabel(1) }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useDict } from 'df-web-base'

const gender = ref()
const { items, loading, getLabel } = useDict('gender')
</script>
```

## 手动重新加载

```typescript
const { items, load } = useDict('gender')

// 字典数据更新后手动重新加载
await load()
```

## API

```typescript
function useDict(dictCode: string): {
  items: Ref<DictItem[]>
  loading: Ref<boolean>
  load: () => Promise<void>
  getLabel: (value: string | number) => string
}
```

| 参数 | 说明 | 类型 | 必填 |
|------|------|------|------|
| dictCode | 字典编码 | `string` | 是 |

| 返回值 | 说明 | 类型 |
|--------|------|------|
| items | 字典项列表（自动加载） | `Ref<DictItem[]>` |
| loading | 加载状态 | `Ref<boolean>` |
| load | 手动重新加载字典 | `() => Promise<void>` |
| getLabel | 根据字典值获取显示标签 | `(value: string \| number) => string` |

### DictItem

```typescript
interface DictItem {
  label: string
  value: string | number
  [key: string]: unknown
}
```

> 未注入 DfUIOptions 时调用会抛出 `Error`。

## 引入方式

```typescript
import { useDict } from 'df-web-base'
```
