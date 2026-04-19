# DfInput 输入框

基于 DevExtreme DxTextBox / DxTextArea 封装的输入框组件，支持文本、密码、数字、文本域多种模式。

> 🔧 基于 **DxTextBox / DxTextArea** 封装

## 基础用法

<DemoBlock title="基础输入框">

<df-input placeholder="请输入内容"></df-input>

<template #code>

```vue
<df-input placeholder="请输入内容"></df-input>
```

</template>
</DemoBlock>

## 可清空

设置 `clearable` 属性即可得到一个可清空的输入框。

<DemoBlock title="可清空输入框">

<df-input placeholder="可清空输入框" clearable></df-input>

<template #code>

```vue
<df-input placeholder="可清空输入框" clearable></df-input>
```

</template>
</DemoBlock>

## 密码输入框

使用 `show-password` 属性即可得到一个可切换显示密码的输入框。

<DemoBlock title="密码输入框">

<df-input type="password" placeholder="请输入密码" show-password></df-input>

<template #code>

```vue
<df-input type="password" placeholder="请输入密码" show-password></df-input>
```

</template>
</DemoBlock>

## 文本域

设置 `type="textarea"` 即可使用文本域，配合 `maxlength` 和 `show-word-limit` 显示字数统计。

<DemoBlock title="文本域">

<df-input type="textarea" placeholder="请输入内容" :maxlength="200" show-word-limit></df-input>

<template #code>

```vue
<df-input type="textarea" placeholder="请输入内容" :maxlength="200" show-word-limit></df-input>
```

</template>
</DemoBlock>

## 不同尺寸

通过 `size` 属性控制输入框大小。

<DemoBlock title="不同尺寸">

<df-space direction="vertical" :fill="true" style="width: 320px">
  <df-input placeholder="大号输入框" size="large"></df-input>
  <df-input placeholder="默认输入框" size="default"></df-input>
  <df-input placeholder="小号输入框" size="small"></df-input>
  <df-input placeholder="迷你输入框" size="mini"></df-input>
</df-space>

<template #code>

```vue
<df-space direction="vertical" :fill="true" style="width: 320px">
  <df-input placeholder="大号输入框" size="large"></df-input>
  <df-input placeholder="默认输入框" size="default"></df-input>
  <df-input placeholder="小号输入框" size="small"></df-input>
  <df-input placeholder="迷你输入框" size="mini"></df-input>
</df-space>
```

</template>
</DemoBlock>

## 禁用与只读

<DemoBlock title="禁用与只读">

<df-space direction="vertical" :fill="true" style="width: 320px">
  <df-input placeholder="禁用状态" disabled></df-input>
  <df-input placeholder="只读状态" readonly></df-input>
</df-space>

<template #code>

```vue
<df-space direction="vertical" :fill="true" style="width: 320px">
  <df-input placeholder="禁用状态" disabled></df-input>
  <df-input placeholder="只读状态" readonly></df-input>
</df-space>
```

</template>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| modelValue / v-model | 绑定值 | `string \| number` | '' |
| type | 输入类型 | `'text' \| 'password' \| 'textarea' \| 'number'` | 'text' |
| size | 尺寸 | `'large' \| 'default' \| 'small' \| 'mini'` | 'default' |
| placeholder | 占位文字 | `string` | '请输入' |
| disabled | 禁用 | `boolean` | false |
| readonly | 只读 | `boolean` | false |
| clearable | 可清空 | `boolean` | false |
| showPassword | 密码显示切换 | `boolean` | false |
| showWordLimit | 显示字数限制 | `boolean` | false |
| maxlength | 最大输入长度 | `number` | — |
| prefixIcon | 前缀图标 | `string` | — |
| suffixIcon | 后缀图标 | `string` | — |
| autosize | textarea 自适应高度 | `boolean \| { minRows?: number; maxRows?: number }` | false |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:modelValue | 值改变 | `(value: string \| number)` |
| input | 输入时触发 | `(value: string \| number)` |
| change | 值变化时触发 | `(value: string \| number)` |
| enter | 按下回车键 | `()` |
| focus | 获得焦点 | `(e: Event)` |
| blur | 失去焦点 | `(e: Event)` |

### Slots

| 插槽名 | 说明 |
|--------|------|
| prepend | 前置内容 |
| prefix | 前缀图标区域 |
| append | 后置内容 |
| suffix | 后缀图标区域 |

## 引入方式

```typescript
import { DfInput } from 'df-web-base'
```

全量注册后可直接在模板中使用 `<df-input>`。
