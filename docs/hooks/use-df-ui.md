# useDfUI 全局配置访问

一次性获取 `DfUIOptions` 各模块 + 全局通知的便捷组合式函数。所有组件内部推荐使用此 Hook 替代直接 `inject(DF_UI_KEY)`。

## 基础用法

```typescript
import { useDfUI } from 'df-web-base'

const { dfui, http, dict, permission, tenant, notification } = useDfUI()

// 未注入时 dfui 为 undefined，其余模块可能不可用
if (dfui) {
  const data = await http.get('/api/patients')
}
```

## Strict 模式

`useDfUIStrict` 在未注入时直接抛出错误，适用于必须依赖注入才能工作的场景。

```typescript
import { useDfUIStrict } from 'df-web-base'

// 如果 DfUIOptions 未注入，立即抛出 Error
const { dfui, http } = useDfUIStrict()
```

## API

### useDfUI

```typescript
function useDfUI(): {
  dfui: DfUIOptions | undefined
  http: DfUIOptions['http']
  dict: DfUIOptions['dict']
  permission: DfUIOptions['permission']
  tenant: DfUIOptions['tenant']
  appContext: DfUIOptions['appContext']
  notification: ReturnType<typeof useNotification>
}
```

| 返回值 | 说明 | 类型 |
|--------|------|------|
| dfui | 原始 DfUIOptions 对象，未注入时为 `undefined` | `DfUIOptions \| undefined` |
| http | HTTP 客户端（axios 实例） | `AxiosInstance \| undefined` |
| dict | 字典解析服务 | `DictService \| undefined` |
| permission | 权限检查服务 | `PermissionService \| undefined` |
| tenant | 租户上下文服务 | `TenantService \| undefined` |
| appContext | 应用全局上下文 | `unknown` |
| notification | 全局通知（始终可用） | `UseNotificationReturn` |

### useDfUIStrict

```typescript
function useDfUIStrict(): {
  dfui: DfUIOptions
  http: NonNullable<DfUIOptions['http']>
}
```

未注入时抛出 `Error`，保证返回值非空。

## 引入方式

```typescript
import { useDfUI, useDfUIStrict } from 'df-web-base'
```
