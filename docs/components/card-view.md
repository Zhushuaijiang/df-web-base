# DfCardView 卡片视图

基于 DevExtreme DxCardView 封装的卡片视图组件，以卡片形式展示数据集。

> 🔧 基于 **DxCardView** 封装

## 基础用法

通过 `dataSource` 传入数据，自动以卡片布局渲染。

<DemoBlock title="基础卡片视图">

<df-card-view :data-source="[{ name: '张三', department: '内科', status: '在诊' }, { name: '李四', department: '外科', status: '候诊' }]" :columns="[{ dataField: 'name', caption: '姓名' }, { dataField: 'department', caption: '科室' }, { dataField: 'status', caption: '状态' }]"></df-card-view>

<template #code>

```vue
<df-card-view
  :data-source="patients"
  :columns="[
    { dataField: 'name', caption: '姓名' },
    { dataField: 'department', caption: '科室' },
    { dataField: 'status', caption: '状态' },
  ]"
/>
```

</template>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| dataSource | 数据源 | `any[] \| DataSource` | **必填** |
| columns | 列配置数组 | `CardViewColumn[]` | — |
| keyExpr | 主键字段 | `string` | — |
| cardTemplate | 卡片模板 | `string \| function` | — |
| selectionMode | 选择模式 | `'none' \| 'single' \| 'multiple'` | `'none'` |
| selectedCardKeys | 选中卡片主键 | `any[]` | — |
| paging | 分页配置 | `object` | — |
| pager | 分页器配置 | `object` | — |
| searchPanel | 搜索面板配置 | `object` | — |
| filterPanel | 过滤面板配置 | `object` | — |
| headerFilter | 表头过滤配置 | `object` | — |
| width | 宽度 | `number \| string` | `'100%'` |
| height | 高度 | `number \| string` | — |
| disabled | 禁用 | `boolean` | `false` |
| noDataText | 空数据提示 | `string` | `'暂无数据'` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| cardClick | 卡片点击 | `(e: { cardData })` |
| selectionChanged | 选中项变化 | `(e: { selectedCards, selectedCardKeys })` |
| contentReady | 内容就绪 | `(e)` |

### Slots

| 插槽名 | 说明 | 作用域 |
|--------|------|---------|
| default | 自定义卡片内容 | `{ data, cardData, index }` |

### Methods (via ref)

| 方法名 | 说明 | 参数 |
|--------|------|------|
| getInstance() | 获取 DxCardView 原生实例 | — |
| refresh() | 刷新视图 | — |
| getSelectedCardKeys() | 获取选中卡片主键 | — |

## 引入方式

```typescript
import { DfCardView } from 'df-web-base'
```

全量注册后可直接在模板中使用 `<df-card-view>`。
