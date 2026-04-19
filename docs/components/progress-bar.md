# DfProgressBar 进度条

基于 DevExtreme DxProgressBar 封装的进度条组件，用于显示任务完成进度。

> 🔧 基于 **DxProgressBar** 封装

## 基础用法

通过 `value` 设置当前进度值，`min` 和 `max` 设置范围。

<DemoBlock title="基础用法">

<df-progress-bar :value="60" :min="0" :max="100"></df-progress-bar>

<template #code>

```vue
<df-progress-bar :value="60" :min="0" :max="100" />
```

</template>
</DemoBlock>

## 显示状态标签

通过 `showStatus` 在进度条右侧显示百分比文字。

<DemoBlock title="带状态标签">

<df-progress-bar :value="45" :max="100" show-status></df-progress-bar>

<template #code>

```vue
<df-progress-bar :value="45" :max="100" show-status />
```

</template>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| value | 当前值 | `number` | `0` |
| min | 最小值 | `number` | `0` |
| max | 最大值 | `number` | `100` |
| showStatus | 显示状态标签 | `boolean` | `false` |
| disabled | 禁用 | `boolean` | `false` |
| hint | 提示文字 | `string` | — |
| width | 宽度 | `number \| string` | `'100%'` |
| height | 高度 | `number \| string` | — |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| onComplete | 进度达到最大值时触发 | `(e: { value, component })` |
| valueChanged | 值变化时触发 | `(e: { value, previousValue })` |

### Slots

| 插槽名 | 说明 | 作用域 |
|--------|------|---------|
| — | — | — |

## 引入方式

```typescript
import { DfProgressBar } from 'df-web-base'
```

全量注册后可直接在模板中使用 `<df-progress-bar>`。
