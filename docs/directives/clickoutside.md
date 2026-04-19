# v-clickoutside 外部点击指令

检测元素外部的点击事件，常用于关闭下拉菜单、弹出面板等场景。

## 基础用法

```vue
<template>
  <div class="dropdown-wrapper">
    <df-button @click="visible = !visible">打开菜单</df-button>
    <div v-if="visible" v-clickoutside="handleClose" class="dropdown-menu">
      <div class="menu-item">选项 1</div>
      <div class="menu-item">选项 2</div>
      <div class="menu-item">选项 3</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)

function handleClose() {
  visible.value = false
}
</script>
```

## 搜索面板场景

```vue
<template>
  <div v-clickoutside="closePanel">
    <df-input v-model="keyword" @focus="showPanel = true" placeholder="搜索患者..." />
    <div v-if="showPanel" class="search-panel">
      <div v-for="item in results" :key="item.id" @click="selectItem(item)">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showPanel = ref(false)
const keyword = ref('')
const results = ref([])

function closePanel() {
  showPanel.value = false
}

function selectItem(item: any) {
  keyword.value = item.name
  showPanel.value = false
}
</script>
```

## API

### 指令绑定值

| 值 | 说明 | 类型 |
|----|------|------|
| `v-clickoutside="handler"` | 点击元素外部时调用的回调函数 | `(event: MouseEvent) => void` |

### 工作原理

- 在 `document` 上监听 `mousedown` 和 `mouseup` 事件
- 判断事件目标是否在绑定元素内部
- 如果两次事件目标都不在元素内部，触发回调函数
- 组件卸载时自动清理事件监听

### 注意事项

- 回调函数接收原始 `MouseEvent` 作为参数
- 使用 `mousedown` + `mouseup` 组合判断，避免拖拽选中文本时误触发
- 指令绑定值必须是函数引用，不能是表达式

## 注册方式

全量安装 `df-web-base` 时自动注册。手动注册：

```typescript
import { vClickoutside } from 'df-web-base'

app.directive('clickoutside', vClickoutside)
```
