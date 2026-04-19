# DfTextEditor 富文本编辑器

基于 DevExtreme 25.2 DxHtmlEditor 封装，支持 HTML 和 Markdown 两种值类型，可配置工具栏按钮。

> 🔧 基于 **DxHtmlEditor** 封装 | 来源：`devextreme-vue/html-editor`

<script setup>
import { ref, computed } from 'vue'

const content1 = ref('<p>患者入院后生命体征稳定...</p>')
const content2 = ref('')
const readonlyHtml = ref('<h3>入院诊断</h3><p>1. 高血压病3级（极高危）</p><p>2. 2型糖尿病</p>')
</script>

## 基础用法

<DemoBlock title="基础富文本">
<df-text-editor v-model="content1" :height="200" placeholder="请输入病程记录..." />
<template #code>

```vue
<template>
  <df-text-editor v-model="content" :height="200" placeholder="请输入病程记录..." />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const content = ref('<p>患者入院后...</p>')
</script>
```

</template>
</DemoBlock>

## 完整工具栏

开启所有工具栏选项。

<DemoBlock title="完整工具栏">
<df-text-editor
  v-model="content2"
  :height="300"
  :toolbar-multiline="true"
  :show-header-format="true"
  :show-font-size="true"
  :show-font-color="true"
  :show-background="true"
  :show-link="true"
  :show-image="true"
  :show-code-block="true"
  :show-blockquote="true"
  placeholder="请输入内容..."
/>
<template #code>

```vue
<df-text-editor
  v-model="content"
  :height="300"
  :toolbar-multiline="true"
  :show-header-format="true"
  :show-font-size="true"
  :show-font-color="true"
  :show-background="true"
  :show-link="true"
  :show-image="true"
  :show-code-block="true"
  :show-blockquote="true"
/>
```

</template>
</DemoBlock>

## 只读展示

<DemoBlock title="只读模式">
<df-text-editor :model-value="readonlyHtml" :read-only="true" :height="150" />
<template #code>

```vue
<df-text-editor :model-value="htmlContent" :read-only="true" :height="150" />
```

</template>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| modelValue (v-model) | 编辑器内容（HTML 或 Markdown 字符串） | `string` | `''` |
| height | 编辑器高度 | `number \| string` | `300` |
| width | 编辑器宽度 | `number \| string` | — |
| readOnly | 只读模式（内容不可编辑，可选中复制） | `boolean` | `false` |
| disabled | 禁用模式（整个组件灰化） | `boolean` | `false` |
| placeholder | 空内容时的占位提示 | `string` | `'请输入内容...'` |
| valueType | 内容值类型。`'html'` 输出 HTML，`'markdown'` 输出 Markdown | `'html' \| 'markdown'` | `'html'` |
| toolbarMultiline | 工具栏按钮是否多行显示 | `boolean` | `false` |
| showHeaderFormat | 是否显示标题格式按钮（H1~H5、Normal） | `boolean` | `true` |
| showFontSize | 是否显示字号选择器 | `boolean` | `false` |
| showFontColor | 是否显示字体颜色选择器 | `boolean` | `false` |
| showBackground | 是否显示背景色选择器 | `boolean` | `false` |
| showLink | 是否显示插入链接按钮 | `boolean` | `true` |
| showImage | 是否显示插入图片按钮 | `boolean` | `true` |
| showCodeBlock | 是否显示代码块按钮 | `boolean` | `false` |
| showBlockquote | 是否显示引用块按钮 | `boolean` | `true` |

### 内置工具栏按钮

无论上述 `showXxx` props 的值如何，以下基础按钮始终显示：

- **加粗** (Bold)
- **斜体** (Italic)
- **下划线** (Underline)
- **删除线** (Strike)
- **有序列表** (Ordered List)
- **无序列表** (Bullet List)
- **文本对齐** (Align Left / Center / Right / Justify)
- **撤销/重做** (Undo / Redo)
- **清除格式** (Clear Formatting)

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:modelValue | 内容变更时触发（v-model） | `(value: string)` |
| change | 内容变更时触发 | `(value: string)` |
| focus | 编辑器获得焦点 | — |
| blur | 编辑器失去焦点 | — |

### Methods（通过 ref 调用）

| 方法名 | 说明 | 参数 | 返回值 |
|--------|------|------|--------|
| getInstance() | 获取 DevExtreme DxHtmlEditor 原生实例 | — | `dxHtmlEditor` |
| getLength() | 获取内容字符数 | — | `number` |
| getText() | 获取纯文本内容（去除 HTML 标签） | — | `string` |
| insertText(index, text) | 在指定位置插入纯文本 | `index: number, text: string` | — |
| clearContent() | 清空编辑器内容 | — | — |

### Slots

本组件无具名插槽。

## 引入方式

```typescript
import { DfTextEditor } from 'df-web-base'
```

## 与 DevExtreme DxHtmlEditor 的差异

| 特性 | DxHtmlEditor | DfTextEditor |
|------|-------------|-------------|
| 工具栏配置 | `<DxToolbar>` + `<DxItem>` 子组件 | `showXxx` 布尔 props |
| 值绑定 | `value` prop | `v-model` (modelValue) |
| 事件 | `onValueChanged` | `change` + `update:modelValue` + `focus` + `blur` |
| 默认工具栏 | 需手动配置每个按钮 | 预设常用按钮，通过 props 增减 |
| Markdown 支持 | `valueType` prop | 相同 |

DfTextEditor 预设了合理的工具栏配置，通过开关式 props 控制高级按钮的显隐。
