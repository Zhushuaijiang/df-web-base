# DfAppShell 应用外壳布局

所有 HIS 页面的顶层布局框架：深色侧边栏导航 + 蓝色顶栏 + 主内容区。参考：人员中心、基础平台、运营监管等全部页面。

## 基础用法

<DemoBlock title="标准应用外壳">
<div style="height:360px; border:1px solid #ebeef5; border-radius:4px; overflow:hidden;">
<df-app-shell logo="医疗管理平台" :sidebar-width="180" :header-height="44" style="height:100%;">
<template #sidebar>
<div style="padding:8px 0;">
<div style="padding:10px 20px; color:rgba(255,255,255,0.85); font-size:13px; background:rgba(255,255,255,0.08); cursor:pointer;">📊 首页</div>
<div style="padding:10px 20px; color:rgba(255,255,255,0.65); font-size:13px; cursor:pointer;">👥 人员中心</div>
<div style="padding:10px 20px; color:rgba(255,255,255,0.65); font-size:13px; cursor:pointer;">🏥 基础平台</div>
<div style="padding:10px 20px; color:rgba(255,255,255,0.65); font-size:13px; cursor:pointer;">📈 运营监管</div>
<div style="padding:10px 20px; color:rgba(255,255,255,0.65); font-size:13px; cursor:pointer;">⚙️ 系统管理</div>
</div>
</template>
<template #headerRight>
<span style="font-size:13px; color:#fff;">欢迎！超级管理员</span>
</template>
<template #default>
<div style="padding:24px; background:#f0f2f5; height:100%; box-sizing:border-box;">
<div style="background:#fff; border-radius:4px; padding:20px; font-size:13px; color:#606266;">主内容区域 — 放置 DfSearchLayout / DfTreeGridLayout 等页面布局</div>
</div>
</template>
</df-app-shell>
</div>
<template #code>

```vue
<DfAppShell logo="医疗管理平台" :sidebar-width="200">
  <template #sidebar="{ collapsed }">
    <DfMenu :items="menuItems" :collapsed="collapsed" />
  </template>
  <template #headerRight>
    <span>欢迎！{{ userName }}</span>
  </template>
  <template #default>
    <!-- 页面内容 -->
    <DfSearchLayout> ... </DfSearchLayout>
  </template>
</DfAppShell>
```

</template>
</DemoBlock>

## 侧边栏折叠

点击顶部汉堡按钮可折叠/展开侧边栏，折叠后仅显示图标。

<DemoBlock title="折叠效果">
<div style="height:320px; border:1px solid #ebeef5; border-radius:4px; overflow:hidden;">
<df-app-shell logo="管理平台" logo-icon="◆" :sidebar-width="180" :sidebar-collapsed-width="60" :default-sidebar-collapsed="true" :header-height="44" style="height:100%;">
<template #sidebar>
<div style="padding:8px 0;">
<div style="padding:10px; text-align:center; color:rgba(255,255,255,0.85); font-size:18px;" title="首页">📊</div>
<div style="padding:10px; text-align:center; color:rgba(255,255,255,0.65); font-size:18px;" title="人员">👥</div>
<div style="padding:10px; text-align:center; color:rgba(255,255,255,0.65); font-size:18px;" title="基础">🏥</div>
</div>
</template>
<template #headerRight>
<span style="font-size:13px; color:#fff;">超级管理员</span>
</template>
<template #default>
<div style="padding:20px; background:#f0f2f5; height:100%; box-sizing:border-box; display:flex; align-items:center; justify-content:center; color:#909399; font-size:13px;">
折叠后的主内容区域（宽度自适应）
</div>
</template>
</df-app-shell>
</div>
<template #code>

```vue
<DfAppShell
  logo="管理平台"
  :sidebar-width="200"
  :sidebar-collapsed-width="64"
  :default-sidebar-collapsed="true"
>
  <template #sidebar="{ collapsed }">
    <!-- 折叠时只显示图标，展开时显示图标+文字 -->
    <DfMenu :items="menuItems" :collapsed="collapsed" />
  </template>
</DfAppShell>
```

</template>
</DemoBlock>

## API

### Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `logo` | `string` | `''` | Logo 文字（展开时显示） |
| `logoIcon` | `string` | `'◆'` | Logo 图标（折叠时显示） |
| `sidebarWidth` | `number` | `220` | 侧边栏展开宽度(px) |
| `sidebarCollapsedWidth` | `number` | `64` | 侧边栏折叠宽度(px) |
| `defaultSidebarCollapsed` | `boolean` | `false` | 侧边栏默认折叠 |
| `headerHeight` | `number` | `50` | 顶部栏高度(px) |

### Slots

| 插槽 | 作用域参数 | 说明 |
|------|-----------|------|
| `sidebar` | `{ collapsed: boolean }` | 侧边栏导航内容 |
| `sidebarHeader` | `{ collapsed: boolean }` | 侧边栏顶部（默认显示 logo） |
| `sidebarFooter` | `{ collapsed: boolean }` | 侧边栏底部 |
| `headerLeft` | — | 顶栏左侧（默认显示折叠按钮） |
| `headerRight` | — | 顶栏右侧（用户信息等） |
| `default` | — | 主内容区域 |

### Expose

| 方法/属性 | 类型 | 说明 |
|----------|------|------|
| `isSidebarCollapsed` | `Ref<boolean>` | 当前折叠状态 |
| `toggleSidebar()` | `() => void` | 切换折叠 |
| `expandSidebar()` | `() => void` | 展开侧边栏 |
| `collapseSidebar()` | `() => void` | 折叠侧边栏 |

### CSS 变量

| 变量 | 默认值 | 说明 |
|------|--------|------|
| `--df-app-shell-sidebar-bg` | `#001529` | 侧边栏背景色 |
| `--df-app-shell-sidebar-text` | `rgba(255,255,255,0.85)` | 侧边栏文字色 |
| `--df-app-shell-header-bg` | `#1890ff` | 顶栏背景色 |
| `--df-app-shell-header-text` | `#fff` | 顶栏文字色 |

### 布局结构

```
┌─────────────────────────────────────────────────┐
│ Header (blue bar)               #headerRight    │
├──────────┬──────────────────────────────────────┤
│          │                                       │
│ Sidebar  │         Main Content (#default)       │
│ (dark)   │                                       │
│ #sidebar │                                       │
│          │                                       │
│          │                                       │
└──────────┴──────────────────────────────────────┘
```

---

## 导入

```typescript
import { DfAppShell } from 'df-web-base'
import type { DfAppShellProps } from 'df-web-base'
```
