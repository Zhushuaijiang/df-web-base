# DfContextMenu 右键菜单

右键菜单组件，命令式调用。通过 `ref` 获取实例，手动调用 `show(x, y)` 显示菜单。

> 📌 该组件**不包含 slot**，需要自行在触发区域监听 `@contextmenu.prevent`，再调用 `menuRef.show(e.clientX, e.clientY)`。

<script setup>
import { ref } from 'vue'
import { DfMessage } from '@/components/df-message'

const basicMenuRef = ref()
const tableMenuRef = ref()

const basicItems = [
  { label: '复制', command: 'copy', icon: 'dx-icon-copy' },
  { label: '粘贴', command: 'paste', icon: 'dx-icon-paste' },
  { label: '删除', command: 'delete', divided: true },
]

const tableItems = [
  { label: '查看详情', command: 'view' },
  { label: '编辑', command: 'edit' },
  { label: '删除', command: 'delete', divided: true },
  { label: '打印', command: 'print' },
]

function onBasicRightClick(e) {
  basicMenuRef.value.show(e.clientX, e.clientY)
}

function onTableRightClick(e) {
  tableMenuRef.value.show(e.clientX, e.clientY)
}

function onSelect(cmd) {
  DfMessage.info('选中: ' + cmd)
}
</script>

## 基础用法

在触发区域监听 `@contextmenu.prevent`，通过 `ref` 调用 `show(x, y)` 弹出菜单。

<DemoBlock title="基础右键菜单">
<div @contextmenu.prevent="onBasicRightClick" style="padding:40px; background:#f5f5f5; text-align:center; border-radius:4px; border:1px dashed #dcdfe6; color:#606266; user-select:none; cursor:context-menu;">
  👆 右键点击此区域
</div>
<df-context-menu ref="basicMenuRef" :items="basicItems" @select="onSelect" />
<template #code>

```vue
<template>
  <div @contextmenu.prevent="onRightClick">
    右键点击此区域
  </div>

  <df-context-menu
    ref="menuRef"
    :items="items"
    @select="onSelect"
  />
</template>

<script setup>
import { ref } from 'vue'

const menuRef = ref()

const items = [
  { label: '复制', command: 'copy', icon: 'dx-icon-copy' },
  { label: '粘贴', command: 'paste', icon: 'dx-icon-paste' },
  { label: '删除', command: 'delete', divided: true },
]

function onRightClick(e) {
  menuRef.value.show(e.clientX, e.clientY)
}

function onSelect(cmd) {
  console.log('选中:', cmd)
}
</script>
```

</template>
</DemoBlock>

## 表格行右键

<DemoBlock title="表格场景">
<table @contextmenu.prevent="onTableRightClick" style="width:100%; border-collapse:collapse; font-size:13px; cursor:context-menu;">
  <thead>
    <tr style="background:#f5f7fa;">
      <th style="padding:10px 12px; text-align:left; border-bottom:1px solid #ebeef5; color:#909399;">姓名</th>
      <th style="padding:10px 12px; text-align:left; border-bottom:1px solid #ebeef5; color:#909399;">科室</th>
      <th style="padding:10px 12px; text-align:left; border-bottom:1px solid #ebeef5; color:#909399;">状态</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="padding:10px 12px; border-bottom:1px solid #ebeef5; color:#303133;">张三</td>
      <td style="padding:10px 12px; border-bottom:1px solid #ebeef5; color:#606266;">内科</td>
      <td style="padding:10px 12px; border-bottom:1px solid #ebeef5; color:#67c23a;">在院</td>
    </tr>
    <tr>
      <td style="padding:10px 12px; border-bottom:1px solid #ebeef5; color:#303133;">李四</td>
      <td style="padding:10px 12px; border-bottom:1px solid #ebeef5; color:#606266;">外科</td>
      <td style="padding:10px 12px; border-bottom:1px solid #ebeef5; color:#e6a23c;">待审</td>
    </tr>
  </tbody>
</table>
<df-context-menu ref="tableMenuRef" :items="tableItems" @select="onSelect" />
<template #code>

```vue
<template>
  <table @contextmenu.prevent="onRightClick">
    <tr><td>张三</td><td>内科</td><td>在院</td></tr>
    <tr><td>李四</td><td>外科</td><td>待审</td></tr>
  </table>

  <df-context-menu
    ref="menuRef"
    :items="tableItems"
    @select="onSelect"
  />
</template>

<script setup>
import { ref } from 'vue'

const menuRef = ref()

const tableItems = [
  { label: '查看详情', command: 'view' },
  { label: '编辑', command: 'edit' },
  { label: '删除', command: 'delete', divided: true },
  { label: '打印', command: 'print' },
]

function onRightClick(e) {
  menuRef.value.show(e.clientX, e.clientY)
}

function onSelect(cmd) {
  console.log('选中:', cmd)
}
</script>
```

</template>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| items | 菜单项配置 `{ label, command?, icon?, shortcut?, disabled?, divided? }` | `ContextMenuItem[]` | [] |
| trigger | 触发事件 | `string` | 'contextmenu' |
| appendToBody | 挂载到 body | `boolean` | true |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| select | 菜单项选择 | `(command, item)` |
| show | 菜单显示 | `()` |
| hide | 菜单隐藏 | `()` |

## 引入方式

```typescript
import { DfContextMenu } from 'df-web-base'
```

全量注册后可直接在模板中使用 `<df-context-menu>`。
