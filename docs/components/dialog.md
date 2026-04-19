# DfDialog 对话框

基于 DevExtreme DxPopup 封装的对话框组件，支持拖拽、尺寸预设和自定义底部。

> 🔧 基于 **DxPopup** 封装

<script setup>
import { ref } from 'vue'

const visible1 = ref(false)
const visible2 = ref(false)
const visible3 = ref(false)
const visible4 = ref(false)
const saving = ref(false)

function handleSave() {
  saving.value = true
  setTimeout(() => {
    saving.value = false
    visible4.value = false
  }, 1500)
}
</script>

## 基础用法

通过 `v-model` 控制显示隐藏。

<DemoBlock title="基础对话框">
<df-button type="primary" @click="visible1 = true">打开对话框</df-button>
<df-dialog v-model="visible1" title="编辑患者" size="md" @confirm="visible1 = false" @cancel="visible1 = false">
  <p>对话框内容区域，可放置表单、详情等任意内容。</p>
</df-dialog>
<template #code>

```vue
<template>
  <df-button type="primary" @click="visible = true">打开对话框</df-button>
  <df-dialog v-model="visible" title="编辑患者" size="md" @confirm="visible = false">
    <p>对话框内容</p>
  </df-dialog>
</template>

<script setup>
import { ref } from 'vue'
const visible = ref(false)
</script>
```

</template>
</DemoBlock>

## 不同尺寸

<DemoBlock title="尺寸预设">
<df-space>
  <df-button @click="visible2 = true">小尺寸 sm</df-button>
  <df-button @click="visible3 = true">大尺寸 lg</df-button>
</df-space>
<df-dialog v-model="visible2" title="小对话框 (sm)" size="sm" @confirm="visible2 = false" @cancel="visible2 = false">
  <p>sm = 480px 宽度，高度自适应。</p>
</df-dialog>
<df-dialog v-model="visible3" title="大对话框 (lg)" size="lg" @confirm="visible3 = false" @cancel="visible3 = false">
  <p>lg = 960px 宽度，80vh 高度。适合展示大量内容。</p>
</df-dialog>
<template #code>

```vue
<df-button @click="visibleSm = true">小尺寸 sm</df-button>
<df-button @click="visibleLg = true">大尺寸 lg</df-button>

<df-dialog v-model="visibleSm" title="小对话框" size="sm" @confirm="visibleSm = false">
  <p>sm = 480px 宽度</p>
</df-dialog>
<df-dialog v-model="visibleLg" title="大对话框" size="lg" @confirm="visibleLg = false">
  <p>lg = 960px 宽度，80vh 高度</p>
</df-dialog>
```

</template>
</DemoBlock>

## 确认加载状态

点击确认后模拟异步操作，按钮进入 loading 状态。

<DemoBlock title="加载状态">
<df-button type="primary" @click="visible4 = true">打开（带加载）</df-button>
<df-dialog v-model="visible4" title="保存确认" size="sm" :confirm-loading="saving" @confirm="handleSave" @cancel="visible4 = false">
  <p>确定保存当前数据吗？点击确认后将模拟 1.5 秒异步请求。</p>
</df-dialog>
<template #code>

```vue
<template>
  <df-button type="primary" @click="visible = true">打开</df-button>
  <df-dialog
    v-model="visible"
    title="保存确认"
    :confirm-loading="saving"
    @confirm="handleSave"
  >
    <p>确定保存当前数据吗？</p>
  </df-dialog>
</template>

<script setup>
import { ref } from 'vue'
const visible = ref(false)
const saving = ref(false)

function handleSave() {
  saving.value = true
  setTimeout(() => {
    saving.value = false
    visible.value = false
  }, 1500)
}
</script>
```

</template>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| modelValue / v-model | 对话框显示状态 | `boolean` | — |
| visible / v-model:visible | 兼容写法（与 modelValue 二选一） | `boolean` | — |
| title | 对话框标题 | `string` | `''` |
| width | 对话框宽度（优先于 size） | `number \| string` | — |
| height | 对话框高度（优先于 size） | `number \| string` | — |
| size | 尺寸预设 | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'fullscreen'` | `'md'` |
| showCloseButton | 是否显示右上角关闭按钮 | `boolean` | `true` |
| dragEnabled | 是否允许拖拽移动对话框 | `boolean` | `true` |
| closeOnOutsideClick | 点击遮罩层是否关闭对话框 | `boolean` | — |
| closeOnClickModal | `closeOnOutsideClick` 的兼容别名 | `boolean` | — |
| showDefaultFooter | 是否显示默认底部按钮（确定/取消） | `boolean` | `true` |
| confirmText | 确认按钮文字 | `string` | `'确定'` |
| cancelText | 取消按钮文字 | `string` | `'取消'` |
| confirmLoading | 确认按钮加载状态 | `boolean` | `false` |
| customClass | 自定义 CSS class | `string` | `''` |

### SIZE_MAP 尺寸预设表

| size | 宽度 | 高度 |
|------|------|------|
| `sm` | 480px | auto |
| `md` | 680px | auto |
| `lg` | 960px | 80vh |
| `xl` | 1200px | 85vh |
| `fullscreen` | 100vw | 100vh |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:modelValue | `v-model` 显示状态变化 | `(value: boolean)` |
| update:visible | `v-model:visible` 显示状态变化 | `(value: boolean)` |
| confirm | 点击确认按钮 | — |
| cancel | 点击取消按钮 | — |
| close | 对话框关闭（任何方式关闭都会触发） | — |
| shown | 对话框完全显示后触发（动画结束） | — |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 对话框正文内容 |
| footer | 自定义底部区域（替换默认的确定/取消按钮） |

## 自定义底部

```vue
<df-dialog v-model="visible" title="自定义底部" :show-default-footer="false">
  <p>内容区域</p>
  <template #footer>
    <df-button @click="visible = false">返回</df-button>
    <df-button type="primary" @click="save">提交审核</df-button>
    <df-button type="success" @click="saveAndPrint">提交并打印</df-button>
  </template>
</df-dialog>
```

## 全屏对话框

```vue
<df-dialog v-model="visible" title="病案详情" size="fullscreen">
  <!-- 全屏内容 -->
</df-dialog>
```

## 引入方式

```typescript
import { DfDialog } from 'df-web-base'
```

全量注册后可直接在模板中使用 `<df-dialog>`。
