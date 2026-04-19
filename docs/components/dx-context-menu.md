# DxContextMenu 右键菜单（Dx版）

基于 DevExtreme DxContextMenu 封装的右键菜单组件，提供完整的 DxContextMenu 功能。

> 🔧 基于 **DxContextMenu** 封装
> ⚠️ 本组件基于 DevExtreme DxContextMenu 封装，提供完整 Dx 功能。如需轻量版可使用 DfContextMenu（纯 Vue 实现）。

## 基础用法

通过 `dataSource` 配置菜单项，`target` 指定触发区域。

<DemoBlock title="基础右键菜单">

<df-dx-context-menu :data-source="[{ text: '复制', icon: 'dx-icon-copy' }, { text: '粘贴', icon: 'dx-icon-paste' }, { text: '删除', icon: 'dx-icon-trash', beginGroup: true }]" target="#context-menu-area"></df-dx-context-menu>
<div id="context-menu-area" style="padding: 40px; background: #f5f5f5; text-align: center; border-radius: 4px; border: 1px dashed #dcdfe6;">右键点击此区域</div>

<template #code>

```vue
<df-dx-context-menu
  :data-source="[
    { text: '复制', icon: 'dx-icon-copy' },
    { text: '粘贴', icon: 'dx-icon-paste' },
    { text: '删除', icon: 'dx-icon-trash', beginGroup: true },
  ]"
  target="#context-area"
  @item-click="onItemClick"
/>
<div id="context-area" style="padding: 40px;">右键点击此区域</div>
```

</template>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| dataSource | 菜单项数据源 | `any[]` | **必填** |
| target | 触发目标元素 | `string \| Element` | — |
| position | 弹出位置 | `string \| object` | — |
| showEvent | 触发事件 | `object` | `{ name: 'dxcontextmenu' }` |
| closeOnOutsideClick | 点击外部关闭 | `boolean` | `true` |
| animation | 动画配置 | `object` | — |
| disabled | 禁用 | `boolean` | `false` |
| width | 宽度 | `number \| string` | — |
| height | 高度 | `number \| string` | — |
| cssClass | 自定义 CSS 类名 | `string` | — |
| itemsExpr | 子菜单字段名 | `string` | `'items'` |
| displayExpr | 显示字段名 | `string \| function` | `'text'` |
| iconExpr | 图标字段名 | `string` | `'icon'` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| itemClick | 菜单项点击 | `(e: { itemData, itemIndex })` |
| showing | 显示中 | `(e)` |
| shown | 显示后 | `(e)` |
| hidden | 隐藏后 | `(e)` |
| contentReady | 内容就绪 | `(e)` |

### Slots

| 插槽名 | 说明 | 作用域 |
|--------|------|---------|
| — | — | — |

### Methods (via ref)

| 方法名 | 说明 | 参数 |
|--------|------|------|
| getInstance() | 获取 DxContextMenu 原生实例 | — |
| show() | 显示菜单 | — |
| hide() | 隐藏菜单 | — |

## 引入方式

```typescript
import { DxContextMenu } from 'df-web-base'
```

全量注册后可直接在模板中使用 `<df-dx-context-menu>`。
