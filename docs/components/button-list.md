# DfButtonList 按钮列表

按钮列表组件，当按钮超过最大可见数量时自动折叠到"更多"下拉菜单中。

## 基础用法

通过 `buttons` 配置按钮，超出 `max-visible` 的自动折叠。

<DemoBlock title="基础按钮列表">

<df-button-list :buttons='[{"label":"新增","type":"primary","command":"add"},{"label":"编辑","type":"success","command":"edit"},{"label":"删除","type":"danger","command":"delete"},{"label":"导出","command":"export"},{"label":"打印","command":"print"}]' :max-visible="3"></df-button-list>

<template #code>

```vue
<df-button-list
  :buttons="[
    { label: '新增', type: 'primary', command: 'add' },
    { label: '编辑', type: 'success', command: 'edit' },
    { label: '删除', type: 'danger', command: 'delete' },
    { label: '导出', command: 'export' },
    { label: '打印', command: 'print' },
  ]"
  :max-visible="3"
/>
```

</template>
</DemoBlock>

## 不同尺寸

通过 `size` 控制按钮大小。

<DemoBlock title="不同尺寸">

<df-button-list :buttons='[{"label":"新增","type":"primary","command":"add"},{"label":"编辑","command":"edit"},{"label":"删除","type":"danger","command":"delete"}]' :max-visible="3" size="small"></df-button-list>

<template #code>

```vue
<df-button-list
  :buttons="[
    { label: '新增', type: 'primary', command: 'add' },
    { label: '编辑', command: 'edit' },
    { label: '删除', type: 'danger', command: 'delete' },
  ]"
  :max-visible="3"
  size="small"
/>
```

</template>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| buttons | 按钮配置数组 `{ label, type?, icon?, disabled?, command? }` | `ButtonItem[]` | [] |
| maxVisible | 最大可见按钮数 | `number` | 3 |
| moreText | 更多按钮文字 | `string` | '更多' |
| size | 按钮尺寸 | `'large' \| 'default' \| 'small'` | 'default' |
| autoCollapse | 是否自动折叠 | `boolean` | false |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| click | 按钮点击 | `(item: ButtonItem)` |
| command | 更多菜单点击 | `(command: string)` |

### Slots

| 插槽名 | 说明 |
|--------|------|
| button | 自定义按钮渲染 |

## 引入方式

```typescript
import { DfButtonList } from 'df-web-base'
```

全量注册后可直接在模板中使用 `<df-button-list>`。
