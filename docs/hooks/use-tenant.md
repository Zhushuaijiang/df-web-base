# useTenant 租户上下文

租户上下文组合式函数，封装 `DfUIOptions.tenant`，提供响应式的租户/分院信息。

## 基础用法

```vue
<template>
  <div>当前租户：{{ tenantId }}，分院：{{ branchId }}</div>
</template>

<script setup lang="ts">
import { useTenant } from 'df-web-base'

const { tenantId, branchId } = useTenant()
</script>
```

## 在请求中使用

```typescript
import { useTenant, useHttp } from 'df-web-base'

const { tenantId } = useTenant()
const { get } = useHttp()

// 自动携带租户信息
const patients = await get(`/api/${tenantId.value}/patients`)
```

## API

```typescript
function useTenant(): {
  tenantId: ComputedRef<string | number>
  branchId: ComputedRef<string | number>
}
```

| 返回值 | 说明 | 类型 |
|--------|------|------|
| tenantId | 当前租户 ID（响应式） | `ComputedRef<string \| number>` |
| branchId | 当前分院 ID（响应式） | `ComputedRef<string \| number>` |

> 未注入 DfUIOptions 时调用会抛出 `Error`。

## 引入方式

```typescript
import { useTenant } from 'df-web-base'
```
