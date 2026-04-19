# useForm 表单辅助

DfForm 核心组合式函数，桥接 `DfUIOptions` 注入到 DevExtreme DxForm 配置。提供表单默认值、字典字段自动转换、权限字段控制。

## 基础用法

```typescript
import { useForm } from 'df-web-base'

// useForm 需要传入 DfFormProps
const { formOptions, buildEditorOptions, isFieldVisible } = useForm(props)
```

## 表单全局配置

```typescript
const { formOptions } = useForm(props)

// formOptions 是响应式的，合并了 DfUIOptions.form 中的默认值
// { labelLocation, colCount, showColonAfterLabel, labelMode }
```

## 字典字段自动转换

```typescript
const { buildEditorOptions } = useForm(props)

const field = {
  dataField: 'gender',
  dictCode: 'gender',
}

const editorOptions = buildEditorOptions(field)
// 自动生成 dxSelectBox + 字典数据源
```

## 权限控制字段可见性

```typescript
const { isFieldVisible } = useForm(props)

const fields = [
  { dataField: 'name' },
  { dataField: 'idCard', permissionCode: 'patient:idcard' },
]

const visibleFields = fields.filter(isFieldVisible)
// 无权限字段自动隐藏
```

## API

```typescript
function useForm(props: DfFormProps): {
  dfui: DfUIOptions | null
  formOptions: ComputedRef<{
    labelLocation: string
    colCount: number
    showColonAfterLabel: boolean
    labelMode: string
  }>
  buildEditorOptions: (field: DfFieldConfig) => Record<string, unknown>
  isFieldVisible: (field: DfFieldConfig) => boolean
}
```

| 返回值 | 说明 | 类型 |
|--------|------|------|
| dfui | 原始 DfUIOptions（可能为 null） | `DfUIOptions \| null` |
| formOptions | 合并后的表单配置 | `ComputedRef<FormOptions>` |
| buildEditorOptions | 字典字段转 DxSelectBox | `(field) => EditorOptions` |
| isFieldVisible | 权限过滤字段 | `(field) => boolean` |

> 未注入 DfUIOptions 时使用安全默认值（文档/演示模式），字段全部可见。

## 引入方式

```typescript
import { useForm } from 'df-web-base'
```
