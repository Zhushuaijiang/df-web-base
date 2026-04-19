# DfSteps 步骤条

步骤条组件，用于引导用户完成流程。子组件 `DfStep` 用于定义每一步。

## 基础用法

通过 `active` 属性设置当前激活步骤（从 0 开始）。

<DemoBlock title="基础步骤条">

<df-steps :active="1">
<df-step title="挂号" description="完成挂号" />
<df-step title="就诊" description="当前步骤" />
<df-step title="取药" description="等待中" />
</df-steps>

<template #code>

```vue
<df-steps :active="1">
  <df-step title="挂号" description="完成挂号" />
  <df-step title="就诊" description="当前步骤" />
  <df-step title="取药" description="等待中" />
</df-steps>
```

</template>
</DemoBlock>

## 步骤状态

通过 `finishStatus` 和 `processStatus` 控制已完成步骤和当前步骤的显示状态，也可以在 `DfStep` 上单独设置 `status`。

<DemoBlock title="不同状态">

<df-steps :active="1" finish-status="success">
<df-step title="第一步" description="已完成" />
<df-step title="第二步" description="进行中" />
<df-step title="第三步" description="待处理" />
</df-steps>

<template #code>

```vue
<df-steps :active="1" finish-status="success">
  <df-step title="第一步" description="已完成" />
  <df-step title="第二步" description="进行中" />
  <df-step title="第三步" description="待处理" />
</df-steps>
```

</template>
</DemoBlock>

## 带错误状态

在 `DfStep` 上设置 `status="error"` 可标记某一步为错误状态。

<DemoBlock title="错误步骤">

<df-steps :active="1">
<df-step title="提交" description="已完成" />
<df-step title="审核" status="error" description="审核驳回" />
<df-step title="发布" description="等待中" />
</df-steps>

<template #code>

```vue
<df-steps :active="1">
  <df-step title="提交" description="已完成" />
  <df-step title="审核" status="error" description="审核驳回" />
  <df-step title="发布" description="等待中" />
</df-steps>
```

</template>
</DemoBlock>

## 竖向步骤条

设置 `direction="vertical"` 使步骤条垂直排列。

<DemoBlock title="竖向步骤条">

<df-steps :active="1" direction="vertical" style="height: 200px">
<df-step title="注册" description="填写基本信息" />
<df-step title="实名认证" description="上传身份证" />
<df-step title="开通服务" description="选择套餐" />
</df-steps>

<template #code>

```vue
<df-steps :active="1" direction="vertical" style="height: 200px">
  <df-step title="注册" description="填写基本信息" />
  <df-step title="实名认证" description="上传身份证" />
  <df-step title="开通服务" description="选择套餐" />
</df-steps>
```

</template>
</DemoBlock>

## DfSteps API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| active | 当前步骤（从 0 开始） | `number` | 0 |
| direction | 方向 | `'horizontal' \| 'vertical'` | 'horizontal' |
| alignCenter | 居中对齐 | `boolean` | false |
| simple | 简洁风格 | `boolean` | false |
| finishStatus | 已完成步骤状态 | `'wait' \| 'process' \| 'finish' \| 'success' \| 'error'` | 'finish' |
| processStatus | 当前步骤状态 | `'wait' \| 'process' \| 'finish' \| 'success' \| 'error'` | 'process' |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 放置 DfStep |

## DfStep API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| title | 标题 | `string` | -- |
| description | 描述 | `string` | -- |
| icon | 图标 class | `string` | -- |
| status | 当前步骤状态，设置后覆盖父级计算 | `'wait' \| 'process' \| 'finish' \| 'success' \| 'error'` | -- |

### Slots

| 插槽名 | 说明 |
|--------|------|
| title | 自定义标题 |
| description | 自定义描述 |
| icon | 自定义图标 |

## 引入方式

```typescript
import { DfSteps, DfStep } from 'df-web-base'
```

全量注册后可直接在模板中使用 `<df-steps>` 和 `<df-step>`。
