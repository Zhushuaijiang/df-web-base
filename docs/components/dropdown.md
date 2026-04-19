# DfDropdown 下拉菜单

下拉菜单组件。子组件 `DfDropdownMenu` 和 `DfDropdownItem` 用于构建菜单项。

## 基础用法

通过默认插槽放置触发元素，`#dropdown` 插槽放置菜单内容。

<DemoBlock title="基础下拉菜单">

<df-dropdown>
<df-button type="primary">更多操作 <i class="dx-icon-spindown"></i></df-button>
<template #dropdown>
<df-dropdown-menu>
<df-dropdown-item command="edit">编辑</df-dropdown-item>
<df-dropdown-item command="copy">复制</df-dropdown-item>
<df-dropdown-item command="delete" divided>删除</df-dropdown-item>
</df-dropdown-menu>
</template>
</df-dropdown>

<template #code>

```vue
<df-dropdown>
  <df-button type="primary">
    更多操作 <i class="dx-icon-spindown" />
  </df-button>
  <template #dropdown>
    <df-dropdown-menu>
      <df-dropdown-item command="edit">编辑</df-dropdown-item>
      <df-dropdown-item command="copy">复制</df-dropdown-item>
      <df-dropdown-item command="delete" divided>删除</df-dropdown-item>
    </df-dropdown-menu>
  </template>
</df-dropdown>
```

</template>
</DemoBlock>

## 触发方式

通过 `trigger` 设置触发方式，支持 `hover`（默认）和 `click`。

<DemoBlock title="点击触发">

<df-dropdown trigger="click">
<df-button type="primary">点击触发 <i class="dx-icon-spindown"></i></df-button>
<template #dropdown>
<df-dropdown-menu>
<df-dropdown-item command="edit">编辑</df-dropdown-item>
<df-dropdown-item command="delete">删除</df-dropdown-item>
</df-dropdown-menu>
</template>
</df-dropdown>

<template #code>

```vue
<df-dropdown trigger="click">
  <df-button type="primary">
    点击触发 <i class="dx-icon-spindown" />
  </df-button>
  <template #dropdown>
    <df-dropdown-menu>
      <df-dropdown-item command="edit">编辑</df-dropdown-item>
      <df-dropdown-item command="delete">删除</df-dropdown-item>
    </df-dropdown-menu>
  </template>
</df-dropdown>
```

</template>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| trigger | 触发方式 | `'hover' \| 'click'` | 'hover' |
| placement | 弹出位置 | `'bottom' \| 'bottom-start' \| 'bottom-end' \| 'top' \| 'top-start' \| 'top-end'` | 'bottom-end' |
| hideOnClick | 点击后关闭 | `boolean` | true |
| splitButton | 分裂按钮模式 | `boolean` | false |
| disabled | 禁用 | `boolean` | false |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| command | 菜单项点击 | `(command)` |
| visible-change | 可见性变化 | `(visible: boolean)` |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 触发元素 |
| dropdown | 下拉菜单内容 |

## DfDropdownMenu API

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 放置 DfDropdownItem |

## DfDropdownItem API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| command | 命令标识 | `string \| number \| object` | — |
| disabled | 禁用 | `boolean` | false |
| divided | 显示分隔线 | `boolean` | false |
| icon | 图标类名 | `string` | — |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 菜单项文字 |

## 引入方式

```typescript
import { DfDropdown, DfDropdownMenu, DfDropdownItem } from 'df-web-base'
```

全量注册后可直接在模板中使用 `<df-dropdown>`、`<df-dropdown-menu>` 和 `<df-dropdown-item>`。
