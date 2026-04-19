# DfStepper 步进条

基于 DevExtreme DxStepper 封装的步进条组件，用于引导用户按步骤完成任务。

> 🔧 基于 **DxStepper** 封装

## 基础用法

通过 `dataSource` 或子组件定义步骤列表。

<DemoBlock title="基础步进条">

<df-stepper :data-source="[{ title: '填写信息' }, { title: '确认信息' }, { title: '完成' }]" :selected-index="0" orientation="horizontal"></df-stepper>

<template #code>

```vue
<df-stepper
  :data-source="[
    { title: '填写信息' },
    { title: '确认信息' },
    { title: '完成' },
  ]"
  :selected-index="0"
  orientation="horizontal"
/>
```

</template>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| dataSource | 步骤数据源 | `any[]` | **必填** |
| selectedIndex | 当前步骤索引 | `number` | `0` |
| orientation | 方向 | `'horizontal' \| 'vertical'` | `'horizontal'` |
| linear | 线性模式（不可跳步） | `boolean` | `true` |
| titleExpr | 标题字段名 | `string` | `'title'` |
| iconExpr | 图标字段名 | `string` | `'icon'` |
| disabled | 禁用 | `boolean` | `false` |
| width | 宽度 | `number \| string` | `'100%'` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:selectedIndex | 步骤变化 | `(index: number)` |
| selectionChanged | 选中步骤变化 | `(e: { selectedIndex, previousIndex })` |

### Slots

| 插槽名 | 说明 | 作用域 |
|--------|------|---------|
| default | 自定义步骤内容 | `{ data, index }` |

### Methods (via ref)

| 方法名 | 说明 | 参数 |
|--------|------|------|
| getInstance() | 获取 DxStepper 原生实例 | — |

## 引入方式

```typescript
import { DfStepper } from 'df-web-base'
```

全量注册后可直接在模板中使用 `<df-stepper>`。
