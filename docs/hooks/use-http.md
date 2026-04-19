# useHttp HTTP 请求

封装 `DfUIOptions.http`（Axios 实例），提供类型安全的请求快捷方法。

## 基础用法

```typescript
import { useHttp } from 'df-web-base'

const { get, post, put, del } = useHttp()

// GET
const patients = await get('/api/patients')

// POST
const result = await post('/api/patients', { name: '张三', age: 45 })

// PUT
await put('/api/patients/001', { name: '张三', age: 46 })

// DELETE
await del('/api/patients/001')
```

## 泛型返回值

```typescript
interface Patient { id: string; name: string }

const patient = await get<Patient>('/api/patients/001')
// patient 类型为 Patient
```

## 直接访问 Axios 实例

```typescript
const { http } = useHttp()

// 使用完整 Axios API
http.interceptors.request.use((config) => {
  config.headers['X-Custom'] = 'value'
  return config
})
```

## API

```typescript
function useHttp(): {
  http: AxiosInstance
  get<T>(url: string, config?: AxiosRequestConfig): Promise<T>
  post<T>(url: string, body?: Record<string, unknown>, config?: AxiosRequestConfig): Promise<T>
  put<T>(url: string, body?: Record<string, unknown>, config?: AxiosRequestConfig): Promise<T>
  del<T>(url: string, config?: AxiosRequestConfig): Promise<T>
}
```

| 返回值 | 说明 | 类型 |
|--------|------|------|
| http | 原始 Axios 实例 | `AxiosInstance` |
| get | GET 请求，自动解包 `data` | `<T>(url, config?) => Promise<T>` |
| post | POST 请求，自动解包 `data` | `<T>(url, body?, config?) => Promise<T>` |
| put | PUT 请求，自动解包 `data` | `<T>(url, body?, config?) => Promise<T>` |
| del | DELETE 请求，自动解包 `data` | `<T>(url, config?) => Promise<T>` |

> 未注入 DfUIOptions 时调用会抛出 `Error`。

## 引入方式

```typescript
import { useHttp } from 'df-web-base'
```
