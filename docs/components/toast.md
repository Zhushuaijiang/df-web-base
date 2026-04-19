# DfToast 轻提示

基于 DevExtreme DxToast 封装的轻量提示组件，用于在页面顶部或底部短暂显示消息。

> 🔧 基于 **DxToast** 封装

<script setup>
import { ref } from 'vue'

const successVisible = ref(false)
const infoVisible = ref(false)
const warningVisible = ref(false)
const errorVisible = ref(false)
</script>

## 基础用法

通过 `v-model` 控制显示，`message` 设置内容，`type` 设置提示类型。

<DemoBlock title="基础用法">

<df-button type="success" @click="successVisible = true">成功提示</df-button>
<df-toast v-model:visible="successVisible" message="操作成功" type="success"></df-toast>

<template #code>

```vue
<template>
  <df-button type="success" @click="visible = true">成功提示</df-button>
  <df-toast v-model:visible="visible" message="操作成功" type="success" />
</template>

<script setup>
import { ref } from 'vue'
const visible = ref(false)
</script>
```

</template>
</DemoBlock>

## 不同类型

支持 `info`、`success`、`warning`、`error` 四种类型。

<DemoBlock title="不同类型">

<df-space>
<df-button @click="infoVisible = true">信息</df-button>
<df-button type="success" @click="successVisible = true">成功</df-button>
<df-button type="warning" @click="warningVisible = true">警告</df-button>
<df-button type="danger" @click="errorVisible = true">错误</df-button>
</df-space>
<df-toast v-model:visible="infoVisible" message="信息提示" type="info"></df-toast>
<df-toast v-model:visible="warningVisible" message="警告提示" type="warning"></df-toast>
<df-toast v-model:visible="errorVisible" message="错误提示" type="error"></df-toast>

<template #code>

```vue
<template>
  <df-space>
    <df-button @click="infoVis = true">信息</df-button>
    <df-button type="success" @click="successVis = true">成功</df-button>
    <df-button type="warning" @click="warnVis = true">警告</df-button>
    <df-button type="danger" @click="errorVis = true">错误</df-button>
  </df-space>
  <df-toast v-model:visible="infoVis" message="信息提示" type="info" />
  <df-toast v-model:visible="successVis" message="操作成功" type="success" />
  <df-toast v-model:visible="warnVis" message="警告提示" type="warning" />
  <df-toast v-model:visible="errorVis" message="错误提示" type="error" />
</template>

<script setup>
import { ref } from 'vue'
const infoVis = ref(false)
const successVis = ref(false)
const warnVis = ref(false)
const errorVis = ref(false)
</script>
```

</template>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| visible / v-model | 是否显示 | `boolean` | `false` |
| message | 提示内容 | `string` | `''` |
| type | 提示类型 | `'info' \| 'success' \| 'warning' \| 'error' \| 'custom'` | `'info'` |
| displayTime | 显示时长（毫秒） | `number` | `2000` |
| position | 显示位置 | `'top' \| 'bottom' \| 'center' \| { at, my, of }` | `'bottom center'` |
| width | 宽度 | `number \| string` | — |
| height | 高度 | `number \| string` | — |
| animation | 动画配置 | `object` | — |

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
import { DfToast } from 'df-web-base'
```

全量注册后可直接在模板中使用 `<df-toast>`。
