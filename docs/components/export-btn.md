# DfExportBtn 导出按钮

数据导出组件，支持列选择、分组导出和 Excel 下载。配合 `getColumns` 和 `fetchApi` 实现数据分页获取与导出。

## 基础用法

<DemoBlock title="导出按钮">
<df-export-btn></df-export-btn>
<template #code>

```vue
<df-export-btn />
```

</template>
</DemoBlock>

## 自定义按钮

<DemoBlock title="自定义按钮样式">
<df-export-btn :btn-config="{ text: '导出报表', type: 'primary' }"></df-export-btn>
<template #code>

```vue
<df-export-btn :btn-config="{ text: '导出报表', type: 'primary' }" />
```

</template>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| btnConfig | 按钮配置 | `{ text?: string, icon?: string, type?: string }` | — |
| fetchApi | 数据获取 API（分页获取） | `(params: { pageIndex, pageSize }) => Promise<{ rows, total }>` | — |
| dataList | 直接传入的数据列表（与 fetchApi 二选一） | `Record<string, unknown>[]` | — |
| fileTitle | 导出文件名 | `string` | `'导出数据'` |
| formatItem | 格式化行数据 | `(row) => Record<string, unknown>` | — |
| getColumns | 获取列配置 | `() => DfTableColumn[]` | — |
| pageSize | 分页大小 | `number` | `500` |
| exportViewName | 导出视图名称 | `string` | — |
| groupByFields | 分组字段 | `string[]` | `[]` |
| subtotalFields | 小计字段 | `string[]` | `[]` |
| totalFields | 合计字段 | `string[]` | `[]` |

## 引入方式

```typescript
import { DfExportBtn } from 'df-web-base'
```
