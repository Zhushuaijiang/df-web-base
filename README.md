# df-web-base

> 医疗信息化（HIS）前端 UI 基座库 — 基于 Vue 3 + DevExtreme + qiankun 微前端架构

## 概览

`df-web-base` 是 YGT 微前端体系的 **共享 UI 基座**，封装 DevExtreme 组件并提供统一的主题、权限、字典、租户等基础能力。所有业务子应用通过 `npm install` 或 qiankun `loadMicroApp` 方式消费本库。

## 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Vue | 3.4 | 响应式 UI 框架 |
| TypeScript | 5.5 | 类型安全 |
| Vite | 5.4 | 构建工具 |
| DevExtreme | 25.2 | 企业级 UI 组件 |
| Vitest | 2.1 | 单元测试 |
| qiankun | - | 微前端通信 |

## 目录结构

```
df-web-base/
├── src/
│   ├── components/       # 增强 UI 组件
│   │   ├── df-table/     # DxDataGrid 封装
│   │   ├── df-form/      # DxForm 封装
│   │   ├── df-select/    # DxSelectBox 封装
│   │   ├── df-dict-tag/  # 字典标签
│   │   ├── df-dialog/    # DxPopup 对话框封装
│   │   ├── df-loading/   # 加载 spinner
│   │   └── df-error-boundary/
│   ├── hooks/            # 组合式函数
│   │   ├── useTable.ts
│   │   ├── useForm.ts
│   │   ├── usePermission.ts
│   │   ├── useDict.ts
│   │   ├── useHttp.ts
│   │   ├── useNotification.ts
│   │   └── useTenant.ts
│   ├── event-bus/        # 跨应用通信
│   ├── directives/       # 自定义指令
│   ├── constants/        # 共享常量
│   ├── styles/           # CSS 设计令牌
│   ├── types/            # TypeScript 类型
│   └── utils/            # 工具函数
├── tests/                # 单元测试
└── scripts/              # 构建脚本
```

## 快速开始

### 安装

```bash
# 作为工作区依赖
npm install

# 开发模式
npm run dev

# 构建 UMD 产物
npm run build

# 运行测试
npm run test
```

### 子应用中使用

```typescript
import { createApp } from 'vue'
import { createDfUI } from 'df-web-base'
import App from './App.vue'

const app = createApp(App)

app.use(createDfUI({
  http: axiosInstance,
  stateManager: { load, save, remove },
  dict: { resolve, getLabel },
  permission: { check, checkAll, checkAny },
  tenant: { getTenantId, getBranchId },
}))

app.mount('#app')
```

### 使用组件

```vue
<template>
  <DfTable
    :data-source="dataSource"
    :columns="columns"
    :page-size="20"
    storage-key="my-table"
  />
</template>
```

### 使用 Hooks

```typescript
import { usePermission, useDict, useHttp, useTenant } from 'df-web-base'

// 权限
const { has, hasAny } = usePermission()
if (has('patient:edit')) { /* ... */ }

// 字典
const { items, getLabel } = useDict('gender')

// HTTP
const { get, post } = useHttp()
const data = await get('/api/patients')

// 租户
const { tenantId, branchId } = useTenant()
```

### EventBus 跨应用通信

```typescript
import { useEventBus } from 'df-web-base'

// 组件内（自动清理）
const { on, emit } = useEventBus()
on('patient:selected', (patient) => { /* ... */ })

// 发送事件
emit('patient:selected', { id: '001', name: '张三' })
```

## 设计令牌

通过 CSS 自定义属性提供主题配置，见 `src/styles/variables.css`。

```css
/* 覆盖主题 */
:root {
  --df-primary: #1976d2;
  --df-radius-base: 4px;
}
```

## 测试

```bash
npm run test            # 运行所有测试
npm run test:coverage   # 测试 + 覆盖率报告
```

覆盖率阈值：statements ≥ 70%, branches ≥ 70%, functions ≥ 55%, lines ≥ 70%

## 构建产物

```
dist/
├── df-web-base.umd.js   # UMD bundle（qiankun 加载）
└── assets/
    └── style-xxx.css     # 提取的样式
```

## License

Private — 内部项目
