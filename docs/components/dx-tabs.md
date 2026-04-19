# DxTabs 标签页（Dx版）

基于 DevExtreme DxTabs 封装的标签页组件，提供完整的 DxTabs 功能。

> 🔧 基于 **DxTabs** 封装
> ⚠️ 本组件基于 DevExtreme DxTabs 封装，提供完整 Dx 功能。如需轻量版可使用 DfTabs（基于 DxTabPanel 的 Vue 实现）。

## 基础用法

通过 `dataSource` 传入标签项数据，`selectedIndex` 控制当前标签。

<DemoBlock title="基础标签页">

<df-dx-tabs :data-source="[{ text: '首页' }, { text: '产品' }, { text: '关于' }]" :selected-index="0"></df-dx-tabs>

<template #code>

```vue
<df-dx-tabs
  :data-source="[{ text: '首页' }, { text: '产品' }, { text: '关于' }]"
  :selected-index="0"
/>
```

</template>
</DemoBlock>

## 带图标标签

<DemoBlock title="带图标">

<df-dx-tabs :data-source="[{ text: '首页', icon: 'dx-icon-home' }, { text: '用户', icon: 'dx-icon-user' }, { text: '设置', icon: 'dx-icon-preferences' }]" :selected-index="0"></df-dx-tabs>

<template #code>

```vue
<df-dx-tabs
  :data-source="[
    { text: '首页', icon: 'dx-icon-home' },
    { text: '用户', icon: 'dx-icon-user' },
    { text: '设置', icon: 'dx-icon-preferences' },
  ]"
  :selected-index="0"
/>
```

</template>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| dataSource | 标签数据源 | `any[]` | **必填** |
| selectedIndex | 选中标签索引 | `number` | `0` |
| selectedItem | 选中项对象 | `any` | — |
| keyExpr | 主键字段 | `string` | — |
| displayExpr | 显示字段 | `string \| function` | `'text'` |
| iconExpr | 图标字段 | `string` | `'icon'` |
| scrollByContent | 内容可滚动 | `boolean` | `true` |
| scrollingEnabled | 启用滚动 | `boolean` | `false` |
| orientation | 方向 | `'horizontal' \| 'vertical'` | `'horizontal'` |
| stylingMode | 样式 | `'tabs' \| 'pills'` | `'tabs'` |
| showNavButtons | 显示导航按钮 | `boolean` | `false` |
| width | 宽度 | `number \| string` | `'100%'` |
| disabled | 禁用 | `boolean` | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:selectedIndex | 选中标签变化 | `(index: number)` |
| selectionChanged | 选中项变化 | `(e: { selectedItem, selectedIndex, previousItem, previousIndex })` |
| contentReady | 内容就绪 | `(e)` |

### Slots

| 插槽名 | 说明 | 作用域 |
|--------|------|---------|
| default | 自定义标签项 | `{ data, index }` |
| title | 自定义标签标题 | `{ data, index }` |

### Methods (via ref)

| 方法名 | 说明 | 参数 |
|--------|------|------|
| getInstance() | 获取 DxTabs 原生实例 | — |

## 引入方式

```typescript
import { DxTabs } from 'df-web-base'
```

全量注册后可直接在模板中使用 `<df-dx-tabs>`。
