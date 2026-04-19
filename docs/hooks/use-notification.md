# useNotification 全局通知

跨微应用共享的消息通知组合式函数。基于模块级 `ref`，多个组件实例共享同一份通知队列。

## 基础用法

```typescript
import { useNotification } from 'df-web-base'

const { success, warning, error, info } = useNotification()

success('保存成功')
warning('数据即将过期')
error('请求失败')
info('系统将在 5 分钟后维护')
```

## 自定义持续时间

```typescript
const { success } = useNotification()

// 持续 5 秒（默认 3 秒）
success('操作成功', 5000)

// 不自动消失
success('永久通知', 0)
```

## 手动管理通知

```typescript
const { success, remove, clearAll } = useNotification()

const id = success('可关闭通知')

// 手动关闭单条
remove(id)

// 清除所有通知
clearAll()
```

## 读取通知列表

```typescript
const { notifications } = useNotification()

// notifications 是只读的响应式数组
watch(notifications, (list) => {
  console.log('当前通知数:', list.length)
})
```

## API

```typescript
function useNotification(): {
  notifications: Readonly<Ref<DfNotification[]>>
  success: (message: string, duration?: number) => number
  warning: (message: string, duration?: number) => number
  error: (message: string, duration?: number) => number
  info: (message: string, duration?: number) => number
  remove: (id: number) => void
  clearAll: () => void
}
```

### DfNotification

```typescript
interface DfNotification {
  id: number
  type: 'success' | 'warning' | 'error' | 'info'
  message: string
  duration: number  // 毫秒，0 表示不自动消失
}
```

| 方法/属性 | 说明 | 类型 |
|-----------|------|------|
| notifications | 当前通知列表（只读） | `Readonly<Ref<DfNotification[]>>` |
| success | 成功通知 | `(msg, duration?) => number` |
| warning | 警告通知 | `(msg, duration?) => number` |
| error | 错误通知 | `(msg, duration?) => number` |
| info | 信息通知 | `(msg, duration?) => number` |
| remove | 按 ID 移除通知 | `(id: number) => void` |
| clearAll | 清除所有通知 | `() => void` |

> 默认 duration 为 3000ms。返回值为通知 ID，可用于手动 `remove`。

## 引入方式

```typescript
import { useNotification } from 'df-web-base'
```
