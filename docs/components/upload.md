# DfUpload 上传

基于 DevExtreme DxFileUploader 封装的文件上传组件，支持拖拽上传、多文件、大小限制。

> 🔧 基于 **DxFileUploader** 封装

## 基础用法

<DemoBlock title="点击上传">

<df-upload action="/api/upload" :limit="3" tip="只能上传 jpg/png 文件，且不超过 2MB"></df-upload>

<template #code>

```vue
<df-upload
  action="/api/upload"
  :limit="3"
  tip="只能上传 jpg/png 文件，且不超过 2MB"
></df-upload>
```

</template>
</DemoBlock>

## 拖拽上传

<DemoBlock title="拖拽上传">

<df-upload action="/api/upload" drag accept=".jpg,.png,.gif"></df-upload>

<template #code>

```vue
<df-upload
  action="/api/upload"
  drag
  accept=".jpg,.png,.gif"
></df-upload>
```

</template>
</DemoBlock>

## 多文件上传

<DemoBlock title="多文件">

<df-upload action="/api/upload" multiple :limit="5" tip="最多上传 5 个文件"></df-upload>

<template #code>

```vue
<df-upload
  action="/api/upload"
  multiple
  :limit="5"
  tip="最多上传 5 个文件"
></df-upload>
```

</template>
</DemoBlock>

## 禁用状态

<DemoBlock title="禁用上传">

<df-upload action="/api/upload" disabled></df-upload>

<template #code>

```vue
<df-upload
  action="/api/upload"
  disabled
></df-upload>
```

</template>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| action | 上传地址 | `string` | '' |
| headers | 请求头 | `Record<string, string>` | — |
| multiple | 多文件 | `boolean` | false |
| data | 附加参数 | `Record<string, string>` | — |
| name | 文件字段名 | `string` | 'file' |
| drag | 拖拽上传 | `boolean` | false |
| accept | 接受的文件类型 | `string` | — |
| autoUpload | 自动上传 | `boolean` | true |
| showFileList | 显示文件列表 | `boolean` | true |
| fileList | 文件列表 | `UploadFile[]` | [] |
| limit | 最大上传数量 | `number` | — |
| maxSize | 最大文件大小 (bytes) | `number` | — |
| disabled | 禁用 | `boolean` | false |
| tip | 提示文字 | `string` | — |
| buttonText | 按钮文字 | `string` | '点击上传' |
| dragText | 拖拽区提示 | `string` | '将文件拖到此处，或点击上传' |
| httpMethod | 请求方法 | `string` | 'POST' |
| withCredentials | 携带凭证 | `boolean` | false |
| beforeUpload | 上传前钩子 | `(file) => boolean \| Promise<boolean>` | — |
| onExceed | 超出限制回调 | `(files, fileList) => void` | — |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:fileList | 文件列表变化 | `(list: UploadFile[])` |
| change | 文件状态变化 | `(file, list)` |
| success | 上传成功 | `(response, file, list)` |
| error | 上传失败 | `(error, file, list)` |
| progress | 上传进度 | `(event, file, list)` |
| exceed | 超出限制 | `(files, list)` |
| remove | 文件移除 | `(file, list)` |

### Slots

| 插槽名 | 说明 |
|--------|------|
| tip | 自定义提示信息 |

### Methods

| 方法名 | 说明 | 参数 |
|--------|------|------|
| clearFiles | 清空文件列表 | — |
| abort | 中止上传 | — |

## 引入方式

```typescript
import { DfUpload } from 'df-web-base'
```

全量注册后可直接在模板中使用 `<df-upload>`。
