# DfButtonGroup 按钮组

将多个按钮组合在一起，自动处理首尾圆角和边框重叠。

## 基础用法

将 `DfButton` 放入 `DfButtonGroup` 中即可。

<DemoBlock title="基础按钮组">

<df-button-group>
<df-button>上一页</df-button>
<df-button>下一页</df-button>
</df-button-group>

<template #code>

```vue
<df-button-group>
  <df-button>上一页</df-button>
  <df-button>下一页</df-button>
</df-button-group>
```

</template>
</DemoBlock>

## 按钮类型组合

在按钮组中混用不同类型的按钮。

<DemoBlock title="不同类型">

<df-button-group>
<df-button type="primary">确认</df-button>
<df-button type="warning">重置</df-button>
<df-button type="danger">删除</df-button>
</df-button-group>

<template #code>

```vue
<df-button-group>
  <df-button type="primary">确认</df-button>
  <df-button type="warning">重置</df-button>
  <df-button type="danger">删除</df-button>
</df-button-group>
```

</template>
</DemoBlock>

## 带图标按钮组

配合 `DfButton` 的 `icon` 属性使用图标按钮。

<DemoBlock title="带图标">

<df-button-group>
<df-button type="primary">新增</df-button>
<df-button type="primary">编辑</df-button>
<df-button type="primary">删除</df-button>
</df-button-group>

<template #code>

```vue
<df-button-group>
  <df-button type="primary">新增</df-button>
  <df-button type="primary">编辑</df-button>
  <df-button type="primary">删除</df-button>
</df-button-group>
```

</template>
</DemoBlock>

## API

### Props

无额外 Props。

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 放置 DfButton 组件 |

## 引入方式

```typescript
import { DfButtonGroup } from 'df-web-base'
```

全量注册后可直接在模板中使用 `<df-button-group>`。
