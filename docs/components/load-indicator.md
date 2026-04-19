# DfLoadIndicator 加载指示器

基于 DevExtreme DxLoadIndicator 封装的旋转加载指示器组件，用于表示操作正在进行中。

> 🔧 基于 **DxLoadIndicator** 封装

## 基础用法

显示一个旋转的圆形加载指示器。

<DemoBlock title="基础用法">

<df-load-indicator></df-load-indicator>

<template #code>

```vue
<df-load-indicator />
```

</template>
</DemoBlock>

## 不同尺寸

通过 `width` 和 `height` 控制指示器大小。

<DemoBlock title="不同尺寸">

<df-space>
<df-load-indicator :width="24" :height="24"></df-load-indicator>
<df-load-indicator :width="40" :height="40"></df-load-indicator>
<df-load-indicator :width="60" :height="60"></df-load-indicator>
</df-space>

<template #code>

```vue
<df-space>
  <df-load-indicator :width="24" :height="24" />
  <df-load-indicator :width="40" :height="40" />
  <df-load-indicator :width="60" :height="60" />
</df-space>
```

</template>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| visible | 是否显示 | `boolean` | `true` |
| width | 宽度 | `number` | `32` |
| height | 高度 | `number` | `32` |
| hint | 提示文字 | `string` | — |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| — | — | — |

### Slots

| 插槽名 | 说明 | 作用域 |
|--------|------|---------|
| — | — | — |

## 引入方式

```typescript
import { DfLoadIndicator } from 'df-web-base'
```

全量注册后可直接在模板中使用 `<df-load-indicator>`。
