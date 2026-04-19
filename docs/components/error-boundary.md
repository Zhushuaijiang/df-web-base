# DfErrorBoundary 错误边界

捕获子组件渲染错误并显示降级 UI，防止局部异常导致整个页面崩溃。

## 基础用法

<DemoBlock title="包裹子组件">
<df-error-boundary><df-button type="primary">正常组件</df-button></df-error-boundary>
<template #code>

```vue
<df-error-boundary>
  <df-button type="primary">正常组件</df-button>
</df-error-boundary>
```

</template>
</DemoBlock>

## 自定义提示

<DemoBlock title="自定义降级文案">
<df-error-boundary fallback-message="该模块加载异常"><df-button>子组件区域</df-button></df-error-boundary>
<template #code>

```vue
<df-error-boundary fallback-message="该模块加载异常">
  <SomeDangerousComponent />
</df-error-boundary>
```

</template>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| fallbackMessage | 自定义降级提示信息，未设置时显示默认错误描述 | `string` | — |
| stopPropagation | 是否阻止错误向父级传播 | `boolean` | `true` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| error | 捕获到子组件错误时触发 | `(error: Error, info: string)` |
| reset | 用户点击重试时触发 | — |

### Slots

| 插槽名 | 说明 | 作用域参数 |
|--------|------|-----------|
| default | 被包裹的内容 | — |
| fallback | 自定义降级 UI | `{ error: Error, info: string, retry: () => void }` |

### Expose

| 名称 | 说明 | 类型 |
|------|------|------|
| hasError | 当前是否处于错误状态 | `Ref<boolean>` |
| retry | 重置错误状态 | `() => void` |

## 引入方式

```typescript
import { DfErrorBoundary } from 'df-web-base'
```
