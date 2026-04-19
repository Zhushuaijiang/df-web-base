# DfDropDownButton 下拉按钮

基于 DevExtreme DxDropDownButton 封装的下拉按钮组件，点击展开操作菜单。

> 🔧 基于 **DxDropDownButton** 封装

## 基础用法

通过 `items` 配置下拉菜单项，`text` 设置按钮文字。

<DemoBlock title="基础用法">

<df-drop-down-button text="操作" :items="[{ text: '编辑' }, { text: '复制' }, { text: '删除' }]"></df-drop-down-button>

<template #code>

```vue
<df-drop-down-button
  text="操作"
  :items="[
    { text: '编辑' },
    { text: '复制' },
    { text: '删除' },
  ]"
/>
```

</template>
</DemoBlock>

## 带图标

<DemoBlock title="带图标">

<df-drop-down-button text="新增" icon="dx-icon-add" :items="[{ text: '新增患者' }, { text: '批量导入' }]"></df-drop-down-button>

<template #code>

```vue
<df-drop-down-button
  text="新增"
  icon="dx-icon-add"
  :items="[{ text: '新增患者' }, { text: '批量导入' }]"
/>
```

</template>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| text | 按钮文字 | `string` | — |
| icon | 按钮图标 | `string` | — |
| type | 按钮类型 | `'normal' \| 'default' \| 'back' \| 'danger' \| 'success'` | `'normal'` |
| stylingMode | 样式模式 | `'contained' \| 'outlined' \| 'text'` | `'contained'` |
| items | 下拉菜单项 | `any[]` | **必填** |
| displayExpr | 显示字段名 | `string \| function` | `'text'` |
| keyExpr | 主键字段名 | `string` | — |
| selectedItem | 当前选中项 | `any` | — |
| useSelectMode | 选中模式（点击后保持选中） | `boolean` | `false` |
| splitButton | 分离按钮（左侧点击 + 右侧下拉） | `boolean` | `false` |
| showArrowIcon | 显示下拉箭头 | `boolean` | `true` |
| dropDownOptions | 下拉框配置 | `object` | — |
| disabled | 禁用 | `boolean` | `false` |
| width | 宽度 | `number \| string` | — |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| onItemClick | 菜单项点击 | `(e: { itemData, itemIndex })` |
| buttonClick | 主按钮点击（splitButton 模式） | `(e)` |
| selectionChanged | 选中项变化 | `(e: { item, previousItem })` |
| opened | 下拉框打开 | `(e)` |
| closed | 下拉框关闭 | `(e)` |

### Slots

| 插槽名 | 说明 | 作用域 |
|--------|------|---------|
| — | — | — |

### Methods (via ref)

| 方法名 | 说明 | 参数 |
|--------|------|------|
| getInstance() | 获取 DxDropDownButton 原生实例 | — |
| open() | 打开下拉框 | — |
| close() | 关闭下拉框 | — |

## 引入方式

```typescript
import { DfDropDownButton } from 'df-web-base'
```

全量注册后可直接在模板中使用 `<df-drop-down-button>`。
