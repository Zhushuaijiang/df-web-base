# DfValidationGroup 验证组

基于 DevExtreme DxValidationGroup 封装的验证组组件，用于批量管理多个验证器。

> 🔧 基于 **DxValidationGroup** 封装

## 基础用法

将多个 `DfValidator` 包裹在 `DfValidationGroup` 内，可一次性验证所有字段。

<DemoBlock title="表单验证组">

<df-validation-group>
<df-validator :validation-rules="[{ type: 'required', message: '姓名必填' }]">
<df-input placeholder="姓名"></df-input>
</df-validator>
<df-validator :validation-rules="[{ type: 'required', message: '年龄必填' }, { type: 'numeric', message: '年龄必须为数字' }]">
<df-input placeholder="年龄"></df-input>
</df-validator>
</df-validation-group>

<template #code>

```vue
<df-validation-group ref="validationGroup">
  <df-validator :validation-rules="[{ type: 'required', message: '姓名必填' }]">
    <df-input v-model="name" placeholder="姓名" />
  </df-validator>
  <df-validator :validation-rules="[{ type: 'required', message: '年龄必填' }, { type: 'numeric', message: '年龄必须为数字' }]">
    <df-input v-model="age" placeholder="年龄" />
  </df-validator>
</df-validation-group>
```

</template>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| name | 验证组名称 | `string` | — |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| validated | 验证完成 | `(e: { isValid, validationRules, brokenRules })` |

### Slots

| 插槽名 | 说明 | 作用域 |
|--------|------|---------|
| default | 放置验证器和表单控件 | — |

### Methods (via ref)

| 方法名 | 说明 | 参数 |
|--------|------|------|
| getInstance() | 获取 DxValidationGroup 原生实例 | — |
| validate() | 验证组内所有验证器 | — |
| reset() | 重置所有验证状态 | — |

## 引入方式

```typescript
import { DfValidationGroup } from 'df-web-base'
```

全量注册后可直接在模板中使用 `<df-validation-group>`。
