# useDebounce / useDebounceFn 防抖

提供两种防抖能力：`useDebounce` 对响应式值防抖，`useDebounceFn` 对函数调用防抖。

## useDebounce — 值防抖

将一个频繁变化的响应式值延迟同步到 debounced 变量，适用于搜索输入等场景。

```vue
<template>
  <df-input v-model="keyword" placeholder="输入关键词搜索..." />
  <div>实际搜索关键词：{{ debouncedKeyword }}</div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useDebounce } from 'df-web-base'

const keyword = ref('')
const debouncedKeyword = useDebounce(keyword, 500)

watch(debouncedKeyword, (val) => {
  // 用户停止输入 500ms 后才执行搜索
  fetchSearchResults(val)
})
</script>
```

## useDebounceFn — 函数防抖

对任意函数进行防抖包装，返回 `run` 和 `cancel`。

```vue
<template>
  <df-button @click="debouncedSave.run">保存</df-button>
  <df-button @click="debouncedSave.cancel">取消</df-button>
</template>

<script setup lang="ts">
import { useDebounceFn } from 'df-web-base'

async function save() {
  await http.post('/api/save', formData.value)
}

const debouncedSave = useDebounceFn(save, 300)
</script>
```

## 搜索 + 防抖完整示例

```vue
<template>
  <df-input v-model="searchText" placeholder="搜索患者..." clearable />
  <df-table :data-list="results" :grid-data-columns="columns" />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useDebounce } from 'df-web-base'

const searchText = ref('')
const debouncedText = useDebounce(searchText, 300)
const results = ref([])

watch(debouncedText, async (keyword) => {
  if (!keyword) { results.value = []; return }
  const res = await http.get('/api/patients/search', { params: { keyword } })
  results.value = res.data
})
</script>
```

## API

### useDebounce

```typescript
function useDebounce<T>(value: Ref<T>, delay?: number): Ref<T>
```

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| value | 源响应式引用 | `Ref<T>` | **必填** |
| delay | 防抖延迟（毫秒） | `number` | `300` |

**返回值**: `Ref<T>` — 防抖后的响应式值，在源值停止变化 `delay` 毫秒后才更新。

### useDebounceFn

```typescript
function useDebounceFn<T extends (...args: any[]) => any>(
  fn: T,
  delay?: number
): { run: (...args: Parameters<T>) => void; cancel: () => void }
```

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| fn | 需要防抖的原始函数 | `T` | **必填** |
| delay | 防抖延迟（毫秒） | `number` | `300` |

**返回值**:

| 属性 | 说明 | 类型 |
|------|------|------|
| run | 防抖后的调用函数。连续调用只执行最后一次（延迟 delay ms） | `(...args: Parameters<T>) => void` |
| cancel | 取消当前挂起的防抖调用 | `() => void` |

## 引入方式

```typescript
import { useDebounce, useDebounceFn } from 'df-web-base'
```
