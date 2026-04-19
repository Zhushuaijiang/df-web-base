# DxPagination 分页（Dx版）

基于 DevExtreme DxPagination 封装的轻量分页组件，提供完整的 DxPagination 功能。

> 🔧 基于 **DxPagination** 封装
> ⚠️ 本组件基于 DevExtreme DxPagination 封装，提供完整 Dx 功能。如需轻量版可使用 DfPagination（纯 CSS 实现）。

## 基础用法

通过 `totalCount` 设置总数，`pageSize` 设置每页条数，`pageIndex` 控制当前页。

<DemoBlock title="基础分页">

<df-dx-pagination :total-count="100" :page-size="10" :page-index="0"></df-dx-pagination>

<template #code>

```vue
<df-dx-pagination
  :total-count="100"
  :page-size="10"
  :page-index="0"
/>
```

</template>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| totalCount | 数据总条数 | `number` | **必填** |
| pageSize | 每页条数 | `number` | `10` |
| pageIndex | 当前页索引（从 0 开始） | `number` | `0` |
| allowedPageSizes | 可选每页条数 | `number[]` | — |
| showPageSizeSelector | 显示每页条数选择器 | `boolean` | `false` |
| showNavigationButtons | 显示导航按钮 | `boolean` | `true` |
| showInfo | 显示分页信息 | `boolean` | `false` |
| maxPagesCount | 最多显示的页码数 | `number` | `10` |
| pageCount | 总页数（可选，替代 totalCount） | `number` | — |
| hasKnownLastPage | 已知最后一页 | `boolean` | `true` |
| pagesNavigatorVisible | 页码导航可见 | `boolean` | `true` |
| disabled | 禁用 | `boolean` | `false` |
| width | 宽度 | `number \| string` | — |
| visible | 是否可见 | `boolean` | `true` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:pageIndex | 页码变化 | `(index: number)` |
| pageIndexChanged | 页码变化 | `(index: number)` |
| update:pageSize | 每页条数变化 | `(size: number)` |
| pageSizeChanged | 每页条数变化 | `(size: number)` |

### Slots

| 插槽名 | 说明 | 作用域 |
|--------|------|---------|
| — | — | — |

## 引入方式

```typescript
import { DxPagination } from 'df-web-base'
```

全量注册后可直接在模板中使用 `<df-dx-pagination>`。
