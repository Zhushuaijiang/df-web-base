# usePermission 权限判断

权限检查组合式函数，封装 `DfUIOptions.permission`，提供便捷的模板内权限检查。

## 基础用法

```vue
<template>
  <DfButton v-if="has('patient:edit')" @click="onEdit">编辑</DfButton>
  <DfButton v-if="hasAny(['patient:delete', 'patient:admin'])">删除</DfButton>
</template>

<script setup lang="ts">
import { usePermission } from 'df-web-base'

const { has, hasAny, hasAll } = usePermission()
</script>
```

## 批量权限检查

```typescript
const { hasAll, hasAny } = usePermission()

// 必须拥有全部权限
if (hasAll(['patient:edit', 'patient:audit'])) {
  // 同时拥有编辑和审核权限
}

// 拥有任一权限即可
if (hasAny(['patient:edit', 'patient:admin'])) {
  // 拥有编辑或管理员权限
}
```

## API

```typescript
function usePermission(): {
  has: (code: string) => boolean
  hasAll: (codes: string[]) => boolean
  hasAny: (codes: string[]) => boolean
}
```

| 返回值 | 说明 | 类型 |
|--------|------|------|
| has | 检查单个权限 | `(code: string) => boolean` |
| hasAll | 检查是否拥有所有权限 | `(codes: string[]) => boolean` |
| hasAny | 检查是否拥有任一权限 | `(codes: string[]) => boolean` |

> 未注入 DfUIOptions 时调用会抛出 `Error`。

## 引入方式

```typescript
import { usePermission } from 'df-web-base'
```
