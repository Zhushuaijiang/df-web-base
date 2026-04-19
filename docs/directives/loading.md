# v-loading 加载遮罩指令

在元素上添加加载遮罩层的自定义指令，支持局部遮罩和全屏遮罩。

## 基础用法

```vue
<template>
  <div v-loading="isLoading" style="min-height: 200px">
    <p>表格或内容区域</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isLoading = ref(true)

setTimeout(() => {
  isLoading.value = false
}, 2000)
</script>
```

## 全屏遮罩

添加 `.fullscreen` 修饰符使遮罩覆盖整个页面。

```vue
<div v-loading.fullscreen="isLoading">
  触发全屏加载
</div>
```

## 配合异步请求

```vue
<template>
  <div v-loading="loading" style="min-height: 300px">
    <df-table :data-list="tableData" :grid-data-columns="columns" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const loading = ref(false)
const tableData = ref([])

onMounted(async () => {
  loading.value = true
  try {
    const res = await http.get('/api/patients')
    tableData.value = res.data
  } finally {
    loading.value = false
  }
})
</script>
```

## API

### 指令绑定值

| 值 | 说明 | 类型 |
|----|------|------|
| `v-loading="expression"` | 表达式为 `true` 时显示遮罩，为 `false` 时隐藏 | `boolean` |

### 修饰符

| 修饰符 | 说明 |
|--------|------|
| `.fullscreen` | 遮罩挂载到 `body`，覆盖整个视口 |

### 工作原理

- 默认模式：在绑定元素内部插入绝对定位的遮罩层（需要元素有 `position: relative`，指令会自动添加）
- 全屏模式：遮罩层挂载到 `<body>`，使用 `position: fixed` 覆盖整个视口
- 遮罩层包含旋转动画的 loading 图标

## 注册方式

全量安装 `df-web-base` 时自动注册。手动注册：

```typescript
import { vLoading } from 'df-web-base'

app.directive('loading', vLoading)
```
