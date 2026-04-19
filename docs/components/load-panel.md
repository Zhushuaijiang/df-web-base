# DfLoadPanel 加载面板

基于 DevExtreme DxLoadPanel 封装的加载遮罩面板，覆盖目标区域并显示加载状态。

> 🔧 基于 **DxLoadPanel** 封装

<script setup>
import { ref } from 'vue'

const loading = ref(false)

function showLoading() {
  loading.value = true
  setTimeout(() => { loading.value = false }, 2000)
}
</script>

## 基础用法

通过 `v-model` 控制显示，`message` 设置提示文字。点击按钮触发加载面板。

<DemoBlock title="基础用法">

<div style="position: relative; height: 200px; border: 1px solid #e0e0e0; border-radius: 4px;">
  <df-button type="primary" @click="showLoading" style="margin: 16px;">显示加载面板</df-button>
  <df-load-panel v-model="loading" message="加载中，请稍候..." container="parent" :shading="true"></df-load-panel>
</div>

<template #code>

```vue
<template>
  <div style="position: relative; height: 200px;">
    <df-button type="primary" @click="showLoading">显示加载面板</df-button>
    <df-load-panel
      v-model="loading"
      message="加载中，请稍候..."
      container="parent"
      :shading="true"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const loading = ref(false)

function showLoading() {
  loading.value = true
  setTimeout(() => { loading.value = false }, 2000)
}
</script>
```

</template>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| visible / v-model | 是否显示 | `boolean` | `false` |
| message | 提示文字 | `string` | `''` |
| showIndicator | 显示旋转指示器 | `boolean` | `true` |
| showPane | 显示面板背景 | `boolean` | `true` |
| shading | 是否显示遮罩层 | `boolean` | `true` |
| shadingColor | 遮罩颜色 | `string` | `'rgba(0, 0, 0, 0.5)'` |
| delay | 延迟显示时间（毫秒） | `number` | `0` |
| closeOnOutsideClick | 点击外部关闭 | `boolean` | `false` |
| position | 定位 | `string \| object` | `'center'` |
| width | 面板宽度 | `number \| string` | — |
| height | 面板高度 | `number \| string` | — |
| container | 遮罩容器 | `string \| Element` | — |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:visible | 显示状态变化 | `(val: boolean)` |
| hidden | 隐藏后触发 | `(e)` |
| shown | 显示后触发 | `(e)` |

### Slots

| 插槽名 | 说明 | 作用域 |
|--------|------|---------|
| — | — | — |

## 引入方式

```typescript
import { DfLoadPanel } from 'df-web-base'
```

全量注册后可直接在模板中使用 `<df-load-panel>`。
