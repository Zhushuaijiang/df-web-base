<script setup>
import { ref } from 'vue'

const count = ref(0)
const inputVal = ref('')
const dialogVisible = ref(false)
const switchVal = ref(false)
const sliderVal = ref(30)
const selectVal = ref('')
const selectOptions = [
  { label: '内科', value: 'neike' },
  { label: '外科', value: 'waike' },
  { label: '妇产科', value: 'fuchanke' },
  { label: '儿科', value: 'erke' },
  { label: '骨科', value: 'guke' },
]
</script>

# 在线演练场

本页所有组件均为**实时运行**的 Vue 实例 —— 点击按钮、输入文字、打开弹窗、拖动滑块，都是真实交互。

> 每个组件文档的 DemoBlock 标题栏都有 📋 **一键复制代码** 按钮。

---

## 按钮交互

<DemoBlock title="点击计数器">
<df-space>
  <df-button type="primary" @click="count++">点击次数: {{ count }}</df-button>
  <df-button type="danger" @click="count = 0">重置</df-button>
</df-space>
<template #code>

```vue
<template>
  <df-space>
    <df-button type="primary" @click="count++">点击次数: {{ count }}</df-button>
    <df-button type="danger" @click="count = 0">重置</df-button>
  </df-space>
</template>

<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>
```

</template>
</DemoBlock>

## 表单输入

<DemoBlock title="输入框 & 选择器 & 开关" vertical>
<div style="display:flex;flex-direction:column;gap:12px;max-width:400px;width:100%">
  <df-input v-model="inputVal" placeholder="输入患者姓名..." clearable />
  <df-tag v-if="inputVal" type="success" style="align-self:flex-start">你输入了: {{ inputVal }}</df-tag>
  <df-select v-model="selectVal" placeholder="选择科室" :options="selectOptions" clearable />
  <df-tag v-if="selectVal" type="primary" style="align-self:flex-start">已选: {{ selectVal }}</df-tag>
  <df-switch v-model="switchVal" active-text="VIP" inactive-text="普通" />
</div>
<template #code>

```vue
<template>
  <df-input v-model="name" placeholder="输入患者姓名..." clearable />
  <df-tag v-if="name" type="success">你输入了: {{ name }}</df-tag>
  <df-select v-model="dept" placeholder="选择科室" :options="options" clearable />
  <df-switch v-model="vip" active-text="VIP" inactive-text="普通" />
</template>

<script setup>
import { ref } from 'vue'
const name = ref('')
const dept = ref('')
const vip = ref(false)
const options = [
  { label: '内科', value: 'neike' },
  { label: '外科', value: 'waike' },
]
</script>
```

</template>
</DemoBlock>

## 对话框

<DemoBlock title="打开/关闭对话框">
<df-button type="primary" @click="dialogVisible = true">打开对话框</df-button>
<df-dialog v-model="dialogVisible" title="患者信息" size="md" @confirm="dialogVisible = false" @cancel="dialogVisible = false">
  <div style="display:flex;flex-direction:column;gap:12px">
    <p style="margin:0">这是一个实时渲染的对话框，点击确认或取消关闭。</p>
    <df-input placeholder="在弹窗内输入..." />
  </div>
</df-dialog>
<template #code>

```vue
<template>
  <df-button type="primary" @click="visible = true">打开对话框</df-button>
  <df-dialog v-model="visible" title="患者信息" size="md"
    @confirm="visible = false" @cancel="visible = false">
    <p>对话框内容</p>
    <df-input placeholder="在弹窗内输入..." />
  </df-dialog>
</template>

<script setup>
import { ref } from 'vue'
const visible = ref(false)
</script>
```

</template>
</DemoBlock>

## 标签 & 徽章

<DemoBlock title="标签类型与徽章">
<df-space wrap>
  <df-tag>默认</df-tag>
  <df-tag type="primary">主要</df-tag>
  <df-tag type="success">成功</df-tag>
  <df-tag type="warning">警告</df-tag>
  <df-tag type="danger">危险</df-tag>
  <df-tag type="info">信息</df-tag>
  <df-badge :value="12"><df-button>消息</df-button></df-badge>
  <df-badge :value="200" :max="99"><df-button>通知</df-button></df-badge>
  <df-badge is-dot><df-button>待办</df-button></df-badge>
</df-space>
<template #code>

```vue
<df-space wrap>
  <df-tag>默认</df-tag>
  <df-tag type="primary">主要</df-tag>
  <df-tag type="success">成功</df-tag>
  <df-badge :value="12"><df-button>消息</df-button></df-badge>
  <df-badge is-dot><df-button>待办</df-button></df-badge>
</df-space>
```

</template>
</DemoBlock>

## 按钮全类型

<DemoBlock title="按钮尺寸 & 状态">
<div style="display:flex;flex-direction:column;gap:12px;width:100%">
  <df-space wrap>
    <df-button type="primary" size="large">大按钮</df-button>
    <df-button type="primary">默认尺寸</df-button>
    <df-button type="primary" size="small">小按钮</df-button>
  </df-space>
  <df-space wrap>
    <df-button type="primary" :loading="true">加载中...</df-button>
    <df-button type="primary" disabled>禁用</df-button>
    <df-button type="primary" plain>朴素按钮</df-button>
    <df-button type="success" round>圆角按钮</df-button>
  </df-space>
</div>
<template #code>

```vue
<df-space wrap>
  <df-button type="primary" size="large">大按钮</df-button>
  <df-button type="primary">默认尺寸</df-button>
  <df-button type="primary" size="small">小按钮</df-button>
</df-space>
<df-space wrap>
  <df-button type="primary" :loading="true">加载中...</df-button>
  <df-button type="primary" disabled>禁用</df-button>
  <df-button type="primary" plain>朴素按钮</df-button>
  <df-button type="success" round>圆角按钮</df-button>
</df-space>
```

</template>
</DemoBlock>

---

## 组件文档入口

| 分类 | 组件 | 说明 |
|------|------|------|
| 基础 | [Button](/components/button) · [Icon](/components/icon) · [Tag](/components/tag) · [Link](/components/link) | 按钮、图标、标签、链接 |
| 表单 | [Input](/components/input) · [Select](/components/select) · [Form](/components/form) · [DatePicker](/components/date-picker) | 输入、选择、表单、日期 |
| 数据 | [Table](/components/table) · [Tree](/components/tree) · [Pagination](/components/pagination) · [Card](/components/card) | 表格、树、分页、卡片 |
| 反馈 | [Dialog](/components/dialog) · [Drawer](/components/drawer) · [Message](/components/message) · [Notification](/components/notification) | 弹窗、抽屉、消息、通知 |
| 布局 | [SearchLayout](/components/search-layout) · [DetailLayout](/components/detail-layout) · [AppShell](/components/app-shell) | 搜索/详情布局、应用外壳 |
