# useTable 表格辅助

DfTable 外部辅助组合式函数，提供字典列 lookup 构建、权限列过滤等便捷方法。

## 基础用法

```typescript
import { useTable } from 'df-web-base'

const { buildColumnLookup, filterColumnsByPermission, dictCustomizeText } = useTable()
```

## 构建字典列 lookup

```typescript
const columns = [
  { dataField: 'name', caption: '姓名' },
  {
    dataField: 'gender',
    caption: '性别',
    lookup: buildColumnLookup('gender'),
  },
]
// lookup 自动从字典加载选项，valueExpr='value', displayExpr='label'
```

## 按权限过滤列

```typescript
const allColumns = [
  { dataField: 'name', caption: '姓名' },
  { dataField: 'amount', caption: '金额', permissionCode: 'finance:view' },
  { dataField: 'diagnosis', caption: '诊断', permissionCode: 'emr:view' },
]

const visibleColumns = filterColumnsByPermission(allColumns)
// 自动过滤掉用户无权限的列
```

## 字典值翻译

用于 `customizeText` 回调：

```typescript
const columns = [
  {
    dataField: 'gender',
    caption: '性别',
    customizeText: dictCustomizeText('gender'),
  },
]
// 自动将性别代码翻译为中文标签
```

## API

```typescript
function useTable(): {
  dfui: DfUIOptions
  buildColumnLookup: (dictCode: string) => {
    dataSource: { load: () => Promise<DictItem[]> }
    valueExpr: string
    displayExpr: string
  }
  filterColumnsByPermission: (columns: DfTableColumn[]) => DfTableColumn[]
  dictCustomizeText: (dictCode: string) => (cellInfo: { value: unknown }) => string
}
```

| 返回值 | 说明 | 类型 |
|--------|------|------|
| dfui | 原始 DfUIOptions | `DfUIOptions` |
| buildColumnLookup | 构建 DevExtreme lookup 配置 | `(dictCode) => LookupConfig` |
| filterColumnsByPermission | 过滤无权限列 | `(columns) => DfTableColumn[]` |
| dictCustomizeText | 字典值翻译（用于 customizeText） | `(dictCode) => (cellInfo) => string` |

> 未注入 DfUIOptions 时调用会抛出 `Error`。

## 引入方式

```typescript
import { useTable } from 'df-web-base'
```
