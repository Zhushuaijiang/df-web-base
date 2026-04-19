# DfPagination 分页

纯 CSS 实现的分页组件，支持页码切换、每页条数选择、快速跳转。

## 基础用法

<DemoBlock title="基础分页">
<df-pagination :total="100" :current-page="1" :page-size="10"></df-pagination>
<template #code>

```vue
<df-pagination :total="100" :current-page="1" :page-size="10" />
```

</template>
</DemoBlock>

## 带背景色

<DemoBlock title="背景色分页">
<df-pagination :total="200" :current-page="3" :page-size="10" background></df-pagination>
<template #code>

```vue
<df-pagination :total="200" :current-page="3" :page-size="10" background />
```

</template>
</DemoBlock>

## 小尺寸

<DemoBlock title="小型分页">
<df-pagination :total="50" :current-page="1" :page-size="10" small></df-pagination>
<template #code>

```vue
<df-pagination :total="50" :current-page="1" :page-size="10" small />
```

</template>
</DemoBlock>

## 完整功能

<DemoBlock title="完整 layout">
<df-pagination :total="500" :current-page="5" :page-size="20" background layout="total, sizes, prev, pager, next, jumper"></df-pagination>
<template #code>

```vue
<df-pagination
  :total="500"
  :current-page="5"
  :page-size="20"
  background
  layout="total, sizes, prev, pager, next, jumper"
/>
```

</template>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| total | 数据总条数 | `number` | `0` |
| pageSize | 每页显示条数 | `number` | `10` |
| currentPage | 当前页码（从 1 开始） | `number` | `1` |
| pageSizes | 每页条数下拉选项 | `number[]` | `[10, 20, 30, 50, 100]` |
| pagerCount | 页码按钮最大数量（奇数，5-21） | `number` | `7` |
| layout | 布局组件配置（逗号分隔），可选值：`prev`/`pager`/`next`/`sizes`/`total`/`jumper`/`->`(右对齐分隔) | `string` | `'prev, pager, next, jumper, ->, total'` |
| background | 页码按钮是否添加背景色 | `boolean` | `false` |
| small | 是否使用小尺寸模式 | `boolean` | `false` |
| disabled | 是否禁用所有交互 | `boolean` | `false` |
| hideOnSinglePage | 只有一页时是否隐藏分页 | `boolean` | `false` |

### TypeScript 类型定义

```typescript
import type { DfPaginationProps } from 'df-web-base'

interface DfPaginationProps {
  total?: number
  pageSize?: number
  currentPage?: number
  pageSizes?: number[]
  pagerCount?: number
  layout?: string
  background?: boolean
  small?: boolean
  disabled?: boolean
  hideOnSinglePage?: boolean
}
```

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:currentPage | 页码变化时触发（支持 `v-model:currentPage`） | `(val: number)` |
| update:pageSize | 每页条数变化时触发（支持 `v-model:pageSize`） | `(val: number)` |
| size-change | 每页条数变化时触发 | `(val: number)` |
| current-change | 当前页码变化时触发 | `(val: number)` |
| prev-click | 点击上一页按钮时触发 | `(val: number)` |
| next-click | 点击下一页按钮时触发 | `(val: number)` |

### 典型用法

```vue
<df-pagination
  v-model:currentPage="page"
  v-model:pageSize="size"
  :total="total"
  :page-sizes="[10, 20, 50]"
  background
  layout="total, sizes, prev, pager, next, jumper"
  @size-change="handleSizeChange"
  @current-change="handleCurrentChange"
/>
```

## 引入方式

```typescript
import { DfPagination } from 'df-web-base'
import type { DfPaginationProps } from 'df-web-base'
```

全量注册后可直接在模板中使用 `<df-pagination>`。
