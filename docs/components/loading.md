# DfLoading 加载

加载指示器组件，支持局部覆盖和全屏模式。

## 基础用法

<DemoBlock title="加载指示器">
<df-loading :loading="true" text="加载中..."></df-loading>
<template #code>

```vue
<df-loading :loading="true" text="加载中..." />
```

</template>
</DemoBlock>

## 无文字

<DemoBlock title="纯图标加载">
<df-loading :loading="true"></df-loading>
<template #code>

```vue
<df-loading :loading="true" />
```

</template>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| loading | 是否显示加载状态 | `boolean` | `false` |
| text | 加载提示文本 | `string` | `''` |
| fullscreen | 是否全屏覆盖 | `boolean` | `false` |

## 引入方式

```typescript
import { DfLoading } from 'df-web-base'
```
