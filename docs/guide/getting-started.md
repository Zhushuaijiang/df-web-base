# 快速开始

## 安装

```bash
npm install df-web-base
```

## 全量注册

在主应用入口中全量注册所有组件：

```typescript
import { createApp } from 'vue'
import { install as installDfUI } from 'df-web-base'
import 'df-web-base/dist/assets/style.css'

const app = createApp(App)

app.use(installDfUI, {
  http: axiosInstance,          // axios 实例
  stateManager: {               // 状态管理（token 等）
    load: (key) => localStorage.getItem(key),
    save: (key, val) => localStorage.setItem(key, val),
    remove: (key) => localStorage.removeItem(key),
  },
  dict: {                       // 字典服务
    resolve: (code) => fetchDictByCode(code),
    getLabel: (code, value) => getDictLabel(code, value),
  },
  permission: {                 // 权限服务
    check: (code) => hasPermission(code),
    checkAll: (codes) => codes.every(hasPermission),
    checkAny: (codes) => codes.some(hasPermission),
  },
  tenant: {                     // 租户服务
    getTenantId: () => currentTenantId,
    getBranchId: () => currentBranchId,
  },
})

app.mount('#app')
```

## 按需引入

```typescript
import { DfButton, DfTable, DfDialog } from 'df-web-base'
```

## 在模板中使用

全量注册后直接在模板使用：

```vue
<template>
  <df-button type="primary" @click="handleClick">
    点击按钮
  </df-button>

  <df-table
    :columns="columns"
    :data-source="dataSource"
    has-page
    has-select
  />

  <df-dialog v-model="visible" title="编辑" size="md">
    <df-form :form-data="formData" :fields="fields" />
  </df-dialog>
</template>
```

## 设计变量

组件库使用 `--df-*` CSS 变量控制主题：

```css
:root {
  --df-color-primary: #2AA890;
  --df-color-success: #52C41A;
  --df-color-warning: #FAAD14;
  --df-color-danger: #F5222D;
  --df-color-info: #1890FF;
  --df-spacing-base: 4px;
  --df-border-radius: 4px;
  --df-font-size-base: 14px;
}
```

自定义主题只需覆盖这些变量即可。
