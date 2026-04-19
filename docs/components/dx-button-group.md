# DxButtonGroup 按钮组（Dx版）

基于 DevExtreme DxButtonGroup 封装的按钮组组件，提供完整的 DxButtonGroup 功能。

> 🔧 基于 **DxButtonGroup** 封装
> ⚠️ 本组件基于 DevExtreme DxButtonGroup 封装，提供完整 Dx 功能。如需轻量版可使用 DfButtonGroup（纯 Vue 实现）。

## 基础用法

通过 `items` 传入按钮项配置。

<DemoBlock title="基础按钮组">

<df-dx-button-group :items="[{ text: '左' }, { text: '中' }, { text: '右' }]"></df-dx-button-group>

<template #code>

```vue
<df-dx-button-group :items="[{ text: '左' }, { text: '中' }, { text: '右' }]" />
```

</template>
</DemoBlock>

## 单选模式

<DemoBlock title="单选按钮组">

<df-dx-button-group :items="[{ text: '日' }, { text: '周' }, { text: '月' }, { text: '年' }]" :selected-items="[0]" selection-mode="single"></df-dx-button-group>

<template #code>

```vue
<df-dx-button-group
  :items="[{ text: '日' }, { text: '周' }, { text: '月' }, { text: '年' }]"
  selection-mode="single"
/>
```

</template>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| items | 按钮项数组 | `any[]` | **必填** |
| selectedItem | 选中项（单选模式） | `any` | — |
| selectedItems | 选中项数组 | `any[]` | — |
| selectionMode | 选择模式 | `'single' \| 'multiple' \| 'none'` | `'single'` |
| keyExpr | 主键字段名 | `string` | — |
| displayExpr | 显示字段名 | `string \| function` | `'text'` |
| iconExpr | 图标字段名 | `string` | `'icon'` |
| stylingMode | 样式模式 | `'contained' \| 'outlined' \| 'text'` | `'contained'` |
| type | 按钮类型 | `'normal' \| 'default' \| 'back' \| 'danger' \| 'success'` | `'normal'` |
| width | 宽度 | `number \| string` | — |
| disabled | 禁用 | `boolean` | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| selectionChanged | 选中项变化 | `(e: { addedItems, removedItems, selectedItem })` |
| onItemClick | 按钮点击 | `(e: { itemData, itemIndex })` |
| contentReady | 内容就绪 | `(e)` |

### Slots

| 插槽名 | 说明 | 作用域 |
|--------|------|---------|
| — | — | — |

### Methods (via ref)

| 方法名 | 说明 | 参数 |
|--------|------|------|
| getInstance() | 获取 DxButtonGroup 原生实例 | — |

## 引入方式

```typescript
import { DxButtonGroup } from 'df-web-base'
```

全量注册后可直接在模板中使用 `<df-dx-button-group>`。
