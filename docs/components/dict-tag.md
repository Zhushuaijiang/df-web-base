# DfDictTag 字典标签

字典值显示组件，通过字典编码和值自动查询对应标签。

## 基础用法

需在 install 时配置字典服务。通过 `dict-code` 指定字典编码，`value` 指定字典值。

<DemoBlock title="字典标签">

<df-space>
<df-dict-tag dict-code="sys_gender" :value="1"></df-dict-tag>
<df-dict-tag dict-code="sys_gender" :value="2"></df-dict-tag>
<df-dict-tag dict-code="sys_status" :value="0" tag></df-dict-tag>
<df-dict-tag dict-code="sys_status" :value="1" tag></df-dict-tag>
</df-space>

<template #code>

```vue
<df-space>
  <df-dict-tag dict-code="sys_gender" :value="1" />
  <df-dict-tag dict-code="sys_gender" :value="2" />
  <df-dict-tag dict-code="sys_status" :value="0" tag />
  <df-dict-tag dict-code="sys_status" :value="1" tag />
</df-space>
```

</template>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| dictCode | 字典编码（必填） | `string` | — |
| value | 字典值（必填） | `string \| number` | — |
| tag | 是否以标签样式显示 | `boolean` | — |
| color | 自定义颜色 | `string` | — |

## 引入方式

```typescript
import { DfDictTag } from 'df-web-base'
```

全量注册后可直接在模板中使用 `<df-dict-tag>`。
