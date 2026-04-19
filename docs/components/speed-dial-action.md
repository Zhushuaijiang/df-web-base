# DfSpeedDialAction 悬浮操作按钮

基于 DevExtreme DxSpeedDialAction 封装的悬浮操作按钮（FAB），用于触发高频操作。

> 🔧 基于 **DxSpeedDialAction** 封装

## 基础用法

放置在页面中即可显示为悬浮按钮，点击触发操作。

<DemoBlock title="基础用法">

<df-speed-dial-action icon="dx-icon-add" label="新增"></df-speed-dial-action>

<template #code>

```vue
<df-speed-dial-action
  icon="dx-icon-add"
  label="新增"
  @click="handleAdd"
/>
```

</template>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| icon | 图标类名 | `string` | — |
| label | 提示文字 | `string` | — |
| hint | 鼠标悬停提示 | `string` | — |
| index | 展开顺序索引 | `number` | `0` |
| visible | 是否可见 | `boolean` | `true` |
| disabled | 禁用 | `boolean` | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| click | 按钮点击 | `(e: { event })` |

### Slots

| 插槽名 | 说明 | 作用域 |
|--------|------|---------|
| — | — | — |

## 引入方式

```typescript
import { DfSpeedDialAction } from 'df-web-base'
```

全量注册后可直接在模板中使用 `<df-speed-dial-action>`。
