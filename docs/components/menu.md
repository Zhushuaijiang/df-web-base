# DfMenu 菜单

菜单组件，支持水平和垂直模式、子菜单折叠、手风琴效果。子组件 `DfMenuItem`、`DfSubmenu`、`DfMenuItemGroup` 用于构建菜单结构。

## 基础用法

<DemoBlock title="垂直菜单">

<df-menu default-active="1" style="width: 256px">
<df-menu-item index="1">首页</df-menu-item>
<df-submenu index="2">
<template #title>门诊管理</template>
<df-menu-item index="2-1">挂号</df-menu-item>
<df-menu-item index="2-2">就诊</df-menu-item>
</df-submenu>
<df-submenu index="3">
<template #title>住院管理</template>
<df-menu-item index="3-1">入院</df-menu-item>
<df-menu-item index="3-2">出院</df-menu-item>
</df-submenu>
<df-menu-item index="4">系统设置</df-menu-item>
</df-menu>

<template #code>

```vue
<df-menu default-active="1">
  <df-menu-item index="1">首页</df-menu-item>
  <df-submenu index="2">
    <template #title>门诊管理</template>
    <df-menu-item index="2-1">挂号</df-menu-item>
    <df-menu-item index="2-2">就诊</df-menu-item>
  </df-submenu>
  <df-submenu index="3">
    <template #title>住院管理</template>
    <df-menu-item index="3-1">入院</df-menu-item>
    <df-menu-item index="3-2">出院</df-menu-item>
  </df-submenu>
  <df-menu-item index="4">系统设置</df-menu-item>
</df-menu>
```

</template>
</DemoBlock>

## 水平菜单

<DemoBlock title="水平模式">

<df-menu mode="horizontal" default-active="1">
<df-menu-item index="1">首页</df-menu-item>
<df-menu-item index="2">产品</df-menu-item>
<df-menu-item index="3">解决方案</df-menu-item>
<df-menu-item index="4">关于我们</df-menu-item>
</df-menu>

<template #code>

```vue
<df-menu mode="horizontal" default-active="1">
  <df-menu-item index="1">首页</df-menu-item>
  <df-menu-item index="2">产品</df-menu-item>
  <df-menu-item index="3">解决方案</df-menu-item>
  <df-menu-item index="4">关于我们</df-menu-item>
</df-menu>
```

</template>
</DemoBlock>

## 菜单分组

<DemoBlock title="分组菜单">

<df-menu default-active="1-1" style="width: 256px">
<df-menu-item-group title="常用功能">
<df-menu-item index="1-1">仪表盘</df-menu-item>
<df-menu-item index="1-2">消息中心</df-menu-item>
</df-menu-item-group>
<df-menu-item-group title="管理">
<df-menu-item index="2-1">用户管理</df-menu-item>
<df-menu-item index="2-2">权限设置</df-menu-item>
</df-menu-item-group>
</df-menu>

<template #code>

```vue
<df-menu default-active="1-1">
  <df-menu-item-group title="常用功能">
    <df-menu-item index="1-1">仪表盘</df-menu-item>
    <df-menu-item index="1-2">消息中心</df-menu-item>
  </df-menu-item-group>
  <df-menu-item-group title="管理">
    <df-menu-item index="2-1">用户管理</df-menu-item>
    <df-menu-item index="2-2">权限设置</df-menu-item>
  </df-menu-item-group>
</df-menu>
```

</template>
</DemoBlock>

## API

### DfMenu Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| mode | 模式 | `'horizontal' \| 'vertical'` | 'vertical' |
| defaultActive | 默认激活菜单项 | `string` | '' |
| collapse | 折叠（仅 vertical） | `boolean` | false |
| backgroundColor | 背景色 | `string` | '' |
| textColor | 文字颜色 | `string` | '' |
| activeTextColor | 激活文字颜色 | `string` | '' |
| uniqueOpened | 只保持一个子菜单展开 | `boolean` | false |
| router | 路由模式 | `boolean` | false |

### DfMenu Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| select | 菜单项选择 | `(index, indexPath)` |
| open | 子菜单展开 | `(index, indexPath)` |
| close | 子菜单关闭 | `(index, indexPath)` |

### DfMenuItem Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| index | 唯一标识 | `string` | — |
| icon | 图标类名 | `string` | — |
| disabled | 禁用 | `boolean` | false |
| route | 路由路径 | `string \| object` | — |

### DfSubmenu Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| index | 唯一标识 | `string` | — |
| icon | 图标类名 | `string` | — |
| disabled | 禁用 | `boolean` | false |

### DfMenuItemGroup Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| title | 分组标题 | `string` | — |

### Slots

| 插槽名 | 所属组件 | 说明 |
|--------|----------|------|
| default | DfMenu | 放置 DfMenuItem / DfSubmenu |
| default | DfMenuItem | 菜单项文字 |
| title | DfSubmenu | 子菜单标题 |
| default | DfSubmenu | 子菜单内容 |
| title | DfMenuItemGroup | 自定义分组标题 |
| default | DfMenuItemGroup | 分组内容 |

## 引入方式

```typescript
import { DfMenu, DfMenuItem, DfSubmenu, DfMenuItemGroup } from 'df-web-base'
```

全量注册后可直接在模板中使用 `<df-menu>`。
