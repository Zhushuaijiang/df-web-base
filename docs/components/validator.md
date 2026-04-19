# DfValidator 验证器

基于 DevExtreme DxValidator 封装的验证器组件，用于对表单控件进行验证。

> 🔧 基于 **DxValidator** 封装

## 基础用法

将 `DfValidator` 包裹在表单控件外部，通过 `validationRules` 配置验证规则。

<DemoBlock title="必填验证">

<df-validator :validation-rules="[{ type: 'required', message: '此项为必填' }]">
<df-input placeholder="请输入内容"></df-input>
</df-validator>

<template #code>

```vue
<df-validator :validation-rules="[{ type: 'required', message: '此项为必填' }]">
  <df-input v-model="value" placeholder="请输入内容" />
</df-validator>
```

</template>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| validationRules | 验证规则数组 | `ValidationRule[]` | **必填** |
| name | 验证器名称（用于 ValidationSummary） | `string` | — |
| validationGroup | 验证组名称 | `string` | — |

### ValidationRule 类型

```typescript
interface ValidationRule {
  type: 'required' | 'numeric' | 'range' | 'stringLength' | 'custom' | 'compare' | 'pattern' | 'email' | 'async'
  message?: string
  // 根据类型不同，还有额外属性
  min?: number
  max?: number
  pattern?: RegExp | string
  validationCallback?: (e: { value, rule, validator, data }) => boolean | Promise<boolean>
  reevaluate?: boolean
  ignoreEmptyValue?: boolean
  trim?: boolean
}
```

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| validated | 验证完成 | `(e: { isValid, validationRules, brokenRules, value })` |

### Slots

| 插槽名 | 说明 | 作用域 |
|--------|------|---------|
| default | 放置表单控件 | — |

### Methods (via ref)

| 方法名 | 说明 | 参数 |
|--------|------|------|
| getInstance() | 获取 DxValidator 原生实例 | — |
| validate() | 手动触发验证 | — |
| reset() | 重置验证状态 | — |
| focus() | 聚焦到关联控件 | — |

## 引入方式

```typescript
import { DfValidator } from 'df-web-base'
```

全量注册后可直接在模板中使用 `<df-validator>`。
