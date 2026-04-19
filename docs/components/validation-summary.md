# DfValidationSummary 验证摘要

基于 DevExtreme DxValidationSummary 封装的验证摘要组件，汇总显示所有验证错误信息。

> 🔧 基于 **DxValidationSummary** 封装

## 基础用法

放在 `DfValidationGroup` 内部，自动收集并显示所有验证错误。

<DemoBlock title="验证摘要">

<df-validation-group>
<df-validator :validation-rules="[{ type: 'required', message: '用户名必填' }]">
<df-input placeholder="用户名"></df-input>
</df-validator>
<df-validator :validation-rules="[{ type: 'required', message: '密码必填' }]">
<df-input placeholder="密码"></df-input>
</df-validator>
<df-validation-summary></df-validation-summary>
</df-validation-group>

<template #code>

```vue
<df-validation-group>
  <df-validator :validation-rules="[{ type: 'required', message: '用户名必填' }]">
    <df-input v-model="username" placeholder="用户名" />
  </df-validator>
  <df-validator :validation-rules="[{ type: 'required', message: '密码必填' }]">
    <df-input v-model="password" placeholder="密码" />
  </df-validator>
  <df-validation-summary />
</df-validation-group>
```

</template>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| validationGroup | 验证组名称（不填则使用最近的 ValidationGroup） | `string` | — |
| items | 自定义错误项 | `any[]` | — |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| itemClick | 错误项点击 | `(e: { itemData })` |
| contentReady | 内容就绪 | `(e)` |

### Slots

| 插槽名 | 说明 | 作用域 |
|--------|------|---------|
| — | — | — |

## 引入方式

```typescript
import { DfValidationSummary } from 'df-web-base'
```

全量注册后可直接在模板中使用 `<df-validation-summary>`。
