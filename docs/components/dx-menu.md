# DxMenu 导航菜单（Dx版）

基于 DevExtreme DxMenu 封装的导航菜单组件，提供完整的 DxMenu 功能。

> 🔧 基于 **DxMenu** 封装
> ⚠️ 本组件基于 DevExtreme DxMenu 封装，提供完整 Dx 功能。如需轻量版可使用 DfMenu（纯 Vue 实现）。

## 基础用法

通过 `dataSource` 传入菜单结构数据。

<DemoBlock title="水平菜单">

<df-dx-menu :data-source="[{ text: '首页' }, { text: '门诊管理', items: [{ text: '挂号' }, { text: '就诊' }] }, { text: '住院管理', items: [{ text: '入院' }, { text: '出院' }] }, { text: '系统设置' }]"></df-dx-menu>

<template #code>

```vue
<df-dx-menu
  :data-source="[
    { text: '首页' },
    { text: '门诊管理', items: [{ text: '挂号' }, { text: '就诊' }] },
    { text: '住院管理', items: [{ text: '入院' }, { text: '出院' }] },
    { text: '系统设置' },
  ]"
/>
```

</template>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| dataSource | 菜单数据源（支持多级嵌套） | `any[]` | **必填** |
| orientation | 方向 | `'horizontal' \| 'vertical'` | `'horizontal'` |
| displayExpr | 显示字段名 | `string \| function` | `'text'` |
| iconExpr | 图标字段名 | `string` | `'icon'` |
| itemsExpr | 子菜单字段名 | `string` | `'items'` |
| keyExpr | 主键字段名 | `string` | — |
| selectedIndex | 选中项索引 | `number` | — |
| selectedItem | 选中项对象 | `any` | — |
| showFirstSubmenuMode | 一级子菜单显示模式 | `string \| object` | — |
| showSubmenuMode | 子菜单显示模式 | `string \| object` | — |
| hideSubmenuOnMouseLeave | 鼠标移出时隐藏子菜单 | `boolean` | `false` |
| adaptivityEnabled | 启用自适应 | `boolean` | `false` |
| width | 宽度 | `number \| string` | `'100%'` |
| height | 高度 | `number \| string` | — |
| disabled | 禁用 | `boolean` | `false` |
| cssClass | 自定义 CSS 类名 | `string` | — |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| itemClick | 菜单项点击 | `(e: { itemData, itemIndex })` |
| selectionChanged | 选中项变化 | `(e: { selectedItem, selectedIndex })` |
| submenuShowing | 子菜单显示中 | `(e)` |
| submenuShown | 子菜单显示后 | `(e)` |
| submenuHidden | 子菜单隐藏后 | `(e)` |
| contentReady | 内容就绪 | `(e)` |

### Slots

| 插槽名 | 说明 | 作用域 |
|--------|------|---------|
| default | 自定义菜单项 | `{ data, index }` |

### Methods (via ref)

| 方法名 | 说明 | 参数 |
|--------|------|------|
| getInstance() | 获取 DxMenu 原生实例 | — |

## 引入方式

```typescript
import { DxMenu } from 'df-web-base'
```

全量注册后可直接在模板中使用 `<df-dx-menu>`。
