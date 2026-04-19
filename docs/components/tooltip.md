# DfTooltip 文字提示

基于 DevExtreme DxTooltip 封装的文字提示组件。

> 🔧 基于 **DxTooltip** 封装

## 基础用法

<DemoBlock title="不同方向">
<df-space>
<df-tooltip content="顶部提示"><df-button>上</df-button></df-tooltip>
<df-tooltip content="底部提示" position="bottom"><df-button>下</df-button></df-tooltip>
<df-tooltip content="左侧提示" position="left"><df-button>左</df-button></df-tooltip>
<df-tooltip content="右侧提示" position="right"><df-button>右</df-button></df-tooltip>
</df-space>
<template #code>

```vue
<df-space>
  <df-tooltip content="顶部提示"><df-button>上</df-button></df-tooltip>
  <df-tooltip content="底部提示" position="bottom"><df-button>下</df-button></df-tooltip>
  <df-tooltip content="左侧提示" position="left"><df-button>左</df-button></df-tooltip>
  <df-tooltip content="右侧提示" position="right"><df-button>右</df-button></df-tooltip>
</df-space>
```

</template>
</DemoBlock>

## 主题

通过 `effect` 属性设置 `dark` 或 `light` 主题。

<DemoBlock title="明暗主题">
<df-space>
<df-tooltip content="暗色主题"><df-button>暗色</df-button></df-tooltip>
<df-tooltip content="亮色主题" effect="light"><df-button>亮色</df-button></df-tooltip>
</df-space>
<template #code>

```vue
<df-space>
  <df-tooltip content="暗色主题"><df-button>暗色</df-button></df-tooltip>
  <df-tooltip content="亮色主题" effect="light"><df-button>亮色</df-button></df-tooltip>
</df-space>
```

</template>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| content | 提示内容 | `string` | '' |
| position | 弹出位置 | `'top' \| 'bottom' \| 'left' \| 'right'` | 'top' |
| effect | 主题 | `'dark' \| 'light'` | 'dark' |
| showDelay | 显示延迟 (ms) | `number` | 200 |
| hideDelay | 隐藏延迟 (ms) | `number` | 100 |
| disabled | 禁用 | `boolean` | false |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 触发元素 |
| content | 自定义提示内容 |

## 引入方式

```typescript
import { DfTooltip } from 'df-web-base'
```

全量注册后可直接在模板中使用 `<df-tooltip>`。
