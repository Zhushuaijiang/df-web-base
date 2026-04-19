# useLoading 加载状态管理

管理异步操作的 loading 状态，支持引用计数（多个并发异步操作共享同一 loading 状态时自动管理）。

## 基础用法

```vue
<template>
  <div v-loading="loading">
    <df-button @click="fetchData">加载数据</df-button>
    <div v-if="data">{{ data }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useLoading } from 'df-web-base'

const { loading, startLoading, endLoading, withLoading } = useLoading()
const data = ref(null)

async function fetchData() {
  data.value = await withLoading(async () => {
    const res = await fetch('/api/patients')
    return res.json()
  })
}
</script>
```

## withLoading 自动管理

`withLoading` 自动在异步函数执行前后切换 loading 状态，出错时也会自动关闭。

```typescript
const { loading, withLoading } = useLoading()

// 自动开始 → 执行 → 结束（即使抛异常也会 endLoading）
const result = await withLoading(async () => {
  const res = await http.post('/api/save', formData)
  return res.data
})
```

## 引用计数（并发安全）

多次调用 `startLoading` 时，内部引用计数递增，只有所有操作都调用 `endLoading` 后才真正关闭 loading。

```typescript
const { loading, startLoading, endLoading } = useLoading()

startLoading() // refCount: 1, loading: true
startLoading() // refCount: 2, loading: true

endLoading()   // refCount: 1, loading: true（仍在加载）
endLoading()   // refCount: 0, loading: false（全部完成）
```

## 重置状态

`reset()` 强制将引用计数归零并关闭 loading。

```typescript
const { loading, reset } = useLoading()

// 在组件卸载或路由切换时强制重置
onBeforeUnmount(() => {
  reset()
})
```

## API

### 参数

```typescript
function useLoading(initialState?: boolean): UseLoadingReturn
```

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| initialState | 初始 loading 状态 | `boolean` | `false` |

### 返回值 UseLoadingReturn

| 属性/方法 | 说明 | 类型 |
|-----------|------|------|
| loading | 只读的 loading 响应式状态 | `Readonly<Ref<boolean>>` |
| startLoading() | 开始加载（引用计数 +1） | `() => void` |
| endLoading() | 结束加载（引用计数 -1，归零时关闭） | `() => void` |
| withLoading(fn) | 执行异步函数并自动管理 loading 状态。函数抛异常时也会自动 endLoading | `<T>(fn: () => Promise<T>) => Promise<T>` |
| reset() | 强制重置：引用计数归零，loading 设为 false | `() => void` |

## 引入方式

```typescript
import { useLoading } from 'df-web-base'
```
