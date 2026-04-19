# useClipboard 剪贴板

将文本复制到系统剪贴板，自动回退到 `execCommand('copy')` 兼容旧浏览器，带已复制状态反馈。

## 基础用法

```vue
<template>
  <div>
    <span>{{ patientId }}</span>
    <df-button size="small" @click="copyId">
      {{ copied ? '已复制' : '复制' }}
    </df-button>
  </div>
</template>

<script setup lang="ts">
import { useClipboard } from 'df-web-base'

const { copy, copied } = useClipboard()
const patientId = 'P20240115001'

async function copyId() {
  await copy(patientId)
}
</script>
```

## 自定义复制状态持续时间

```typescript
const { copy, copied } = useClipboard({ copiedDuration: 3000 })
// copied 状态将持续 3000ms 后自动重置为 false
```

## 复制表格数据

```typescript
const { copy } = useClipboard()

function copyTableRow(row: Record<string, any>) {
  const text = Object.entries(row)
    .map(([k, v]) => `${k}: ${v}`)
    .join('\n')
  copy(text)
}
```

## API

### 参数

```typescript
function useClipboard(options?: UseClipboardOptions): UseClipboardReturn
```

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| options.copiedDuration | 复制成功后 `copied` 保持 `true` 的持续时间（毫秒） | `number` | `1500` |

### 返回值 UseClipboardReturn

| 属性/方法 | 说明 | 类型 |
|-----------|------|------|
| copy(text) | 复制文本到系统剪贴板。优先使用 `navigator.clipboard.writeText`，不可用时回退到 `document.execCommand('copy')`。返回 `true` 表示成功 | `(text: string) => Promise<boolean>` |
| copied | 是否刚刚复制成功（`copiedDuration` 毫秒后自动回到 `false`） | `Readonly<Ref<boolean>>` |

## 引入方式

```typescript
import { useClipboard } from 'df-web-base'
```
