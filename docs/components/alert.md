# DfAlert 警告

页面内嵌的警告提示组件，支持多种类型、图标和可关闭模式。

## 基础用法

通过 `type` 属性设置警告类型，`show-icon` 显示对应图标。

<DemoBlock title="警告类型">

<df-space direction="vertical" fill>
<df-alert title="成功提示" type="success" show-icon />
<df-alert title="警告提示" type="warning" show-icon />
<df-alert title="消息提示" type="info" show-icon />
<df-alert title="错误提示" type="error" show-icon />
</df-space>

<template #code>

```vue
<df-space direction="vertical" fill>
  <df-alert title="成功提示" type="success" show-icon />
  <df-alert title="警告提示" type="warning" show-icon />
  <df-alert title="消息提示" type="info" show-icon />
  <df-alert title="错误提示" type="error" show-icon />
</df-space>
```

</template>
</DemoBlock>

## 带描述

通过 `description` 属性或 default slot 添加辅助描述文字。

<DemoBlock title="带描述文字">

<df-space direction="vertical" fill>
<df-alert title="消息提示" type="info" show-icon description="这是一条辅助描述文字，用于补充说明。" />
<df-alert title="成功提示" type="success" show-icon>
这里是自定义的描述内容。
</df-alert>
</df-space>

<template #code>

```vue
<df-space direction="vertical" fill>
  <df-alert title="消息提示" type="info" show-icon description="这是一条辅助描述文字，用于补充说明。" />
  <df-alert title="成功提示" type="success" show-icon>
    这里是自定义的描述内容。
  </df-alert>
</df-space>
```

</template>
</DemoBlock>

## 深色主题

通过 `effect` 属性切换深色主题。

<DemoBlock title="深色主题">

<df-space direction="vertical" fill>
<df-alert title="成功" type="success" show-icon effect="dark" />
<df-alert title="警告" type="warning" show-icon effect="dark" />
<df-alert title="消息" type="info" show-icon effect="dark" />
<df-alert title="错误" type="error" show-icon effect="dark" />
</df-space>

<template #code>

```vue
<df-space direction="vertical" fill>
  <df-alert title="成功" type="success" show-icon effect="dark" />
  <df-alert title="警告" type="warning" show-icon effect="dark" />
  <df-alert title="消息" type="info" show-icon effect="dark" />
  <df-alert title="错误" type="error" show-icon effect="dark" />
</df-space>
```

</template>
</DemoBlock>

## 居中与关闭

设置 `center` 使内容居中，设置 `closable` 控制是否可关闭。

<DemoBlock title="居中 / 关闭">

<df-space direction="vertical" fill>
<df-alert title="居中的警告" type="warning" show-icon center />
<df-alert title="不可关闭" type="info" :closable="false" />
<df-alert title="自定义关闭文字" type="success" close-text="知道了" />
</df-space>

<template #code>

```vue
<df-space direction="vertical" fill>
  <df-alert title="居中的警告" type="warning" show-icon center />
  <df-alert title="不可关闭" type="info" :closable="false" />
  <df-alert title="自定义关闭文字" type="success" close-text="知道了" />
</df-space>
```

</template>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| title | 标题文本 | `string` | `''` |
| description | 辅助描述文本 | `string` | `''` |
| type | 警告类型，决定颜色和图标 | `'success' \| 'warning' \| 'info' \| 'error'` | `'info'` |
| closable | 是否可关闭 | `boolean` | `true` |
| closeText | 关闭按钮的自定义文字（替代默认 × 图标） | `string` | `''` |
| showIcon | 是否显示类型对应的图标 | `boolean` | `false` |
| center | 文字是否居中 | `boolean` | `false` |
| effect | 主题风格 | `'light' \| 'dark'` | `'light'` |

### TypeScript 类型定义

```typescript
import type { DfAlertProps } from 'df-web-base'

type AlertType = 'success' | 'warning' | 'info' | 'error'
type AlertEffect = 'light' | 'dark'

interface DfAlertProps {
  title?: string
  description?: string
  type?: AlertType
  closable?: boolean
  closeText?: string
  showIcon?: boolean
  center?: boolean
  effect?: AlertEffect
}
```

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| close | 关闭按钮被点击时触发 | `(e: MouseEvent)` |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 自定义描述内容，覆盖 `description` prop |
| title | 自定义标题内容，覆盖 `title` prop |

## 引入方式

```typescript
import { DfAlert } from 'df-web-base'
import type { DfAlertProps } from 'df-web-base'
```

全量注册后可直接在模板中使用 `<df-alert>`。
