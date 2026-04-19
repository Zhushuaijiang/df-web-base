# DfDrawer 抽屉

基于 DevExtreme DxPopup 封装的抽屉组件，从屏幕边缘滑入。

> 🔧 基于 **DxPopup** 封装

<script setup>
import { ref } from 'vue'

const visibleRight = ref(false)
const visibleLeft = ref(false)
const visibleWide = ref(false)
</script>

## 基础用法

通过 `v-model` 控制显示隐藏，`direction` 控制弹出方向。

<DemoBlock title="基础抽屉">
<df-space>
  <df-button type="primary" @click="visibleRight = true">从右侧打开</df-button>
  <df-button @click="visibleLeft = true">从左侧打开</df-button>
</df-space>
<df-drawer v-model="visibleRight" title="患者详情（右侧）" size="30%">
  <p style="color:#606266;">这是从右侧滑入的抽屉，默认方向为 <code>rtl</code>。</p>
  <p style="color:#909399; margin-top:12px;">适用于查看详情、编辑表单等场景。</p>
</df-drawer>
<df-drawer v-model="visibleLeft" title="导航菜单（左侧）" direction="ltr" size="280px">
  <ul style="list-style:none; padding:0; margin:0;">
    <li style="padding:10px 0; border-bottom:1px solid #ebeef5; color:#303133;">门诊管理</li>
    <li style="padding:10px 0; border-bottom:1px solid #ebeef5; color:#303133;">住院管理</li>
    <li style="padding:10px 0; border-bottom:1px solid #ebeef5; color:#303133;">药房管理</li>
    <li style="padding:10px 0; color:#303133;">收费结算</li>
  </ul>
</df-drawer>
<template #code>

```vue
<template>
  <df-button type="primary" @click="visibleRight = true">从右侧打开</df-button>
  <df-button @click="visibleLeft = true">从左侧打开</df-button>

  <df-drawer v-model="visibleRight" title="患者详情" size="30%">
    <p>抽屉内容</p>
  </df-drawer>

  <df-drawer v-model="visibleLeft" title="导航菜单" direction="ltr" size="280px">
    <p>左侧抽屉</p>
  </df-drawer>
</template>

<script setup>
import { ref } from 'vue'
const visibleRight = ref(false)
const visibleLeft = ref(false)
</script>
```

</template>
</DemoBlock>

## 自定义宽度

<DemoBlock title="宽抽屉">
<df-button @click="visibleWide = true">打开 60% 宽度抽屉</df-button>
<df-drawer v-model="visibleWide" title="病案详情" size="60%">
  <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px;">
    <div style="background:#f5f7fa; padding:16px; border-radius:4px;">
      <div style="font-weight:600; margin-bottom:8px; color:#303133;">基本信息</div>
      <p style="color:#909399; font-size:13px; margin:4px 0;">姓名：张三</p>
      <p style="color:#909399; font-size:13px; margin:4px 0;">性别：男</p>
      <p style="color:#909399; font-size:13px; margin:4px 0;">年龄：45</p>
    </div>
    <div style="background:#f5f7fa; padding:16px; border-radius:4px;">
      <div style="font-weight:600; margin-bottom:8px; color:#303133;">就诊信息</div>
      <p style="color:#909399; font-size:13px; margin:4px 0;">科室：内科</p>
      <p style="color:#909399; font-size:13px; margin:4px 0;">医生：李医生</p>
      <p style="color:#909399; font-size:13px; margin:4px 0;">日期：2024-01-15</p>
    </div>
  </div>
</df-drawer>
<template #code>

```vue
<df-button @click="visible = true">打开 60% 宽度抽屉</df-button>
<df-drawer v-model="visible" title="病案详情" size="60%">
  <!-- 内容 -->
</df-drawer>
```

</template>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| modelValue / v-model | 显示/隐藏 | `boolean` | false |
| title | 标题 | `string` | '' |
| size | 宽度/高度 | `string \| number` | '30%' |
| direction | 方向 | `'rtl' \| 'ltr' \| 'ttb' \| 'btt'` | 'rtl' |
| modal | 遮罩 | `boolean` | true |
| showClose | 关闭按钮 | `boolean` | true |
| wrapperClosable | 点击遮罩关闭 | `boolean` | true |
| destroyOnClose | 关闭后销毁 | `boolean` | false |
| withHeader | 显示头部 | `boolean` | true |
| beforeClose | 关闭前回调，返回 false 可阻止关闭 | `() => boolean \| Promise<boolean>` | — |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| open | 打开动画开始 | `()` |
| opened | 打开动画结束 | `()` |
| close | 关闭动画开始 | `()` |
| closed | 关闭动画结束 | `()` |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 抽屉内容 |
| footer | 底部内容 |

## 引入方式

```typescript
import { DfDrawer } from 'df-web-base'
```

全量注册后可直接在模板中使用 `<df-drawer>`。
