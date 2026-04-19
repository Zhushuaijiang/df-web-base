<template>
  <div class="df-upload" :class="{ 'df-upload--drag': drag }">
    <DxFileUploader
      ref="uploaderRef"
      :accept="accept"
      :multiple="multiple"
      :upload-url="action"
      :upload-headers="headers"
      :name="name"
      :max-file-size="maxSize"
      :allowed-file-extensions="acceptExtensions"
      :upload-mode="autoUpload ? 'instantly' : 'useButtons'"
      :show-file-list="showFileList"
      :select-button-text="buttonText"
      :label-text="drag ? dragText : ''"
      :upload-method="(httpMethod as any)"
      :with-credentials="withCredentials"
      :disabled="disabled"
      drop-zone=".df-upload--drag"
      @value-changed="onFilesChanged"
      @uploaded="onUploaded"
      @upload-error="onError"
      @progress="onProgress"
    />
    <div v-if="tip || $slots.tip" class="df-upload__tip">
      <slot name="tip">{{ tip }}</slot>
    </div>
    <!-- Custom file list -->
    <ul v-if="showFileList && fileList.length" class="df-upload__list">
      <li v-for="(file, idx) in fileList" :key="file.uid ?? idx" class="df-upload__list-item" :class="`df-upload__list-item--${file.status}`">
        <span class="df-upload__list-name">{{ file.name }}</span>
        <i class="dx-icon-close df-upload__list-remove" @click="handleRemove(idx)" />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { DxFileUploader } from 'devextreme-vue/file-uploader'
import type { UploadFile, DfUploadProps } from './types'

const props = withDefaults(defineProps<DfUploadProps>(), {
  action: '',
  multiple: false,
  name: 'file',
  drag: false,
  autoUpload: true,
  showFileList: true,
  fileList: () => [],
  disabled: false,
  buttonText: '点击上传',
  dragText: '将文件拖到此处，或点击上传',
  httpMethod: 'POST',
  withCredentials: false,
})

const emit = defineEmits<{
  'update:fileList': [list: UploadFile[]]
  change: [file: UploadFile, list: UploadFile[]]
  success: [response: any, file: UploadFile, list: UploadFile[]]
  error: [err: any, file: UploadFile, list: UploadFile[]]
  progress: [event: any, file: UploadFile, list: UploadFile[]]
  exceed: [files: File[], list: UploadFile[]]
  remove: [file: UploadFile, list: UploadFile[]]
}>()

defineOptions({ name: 'DfUpload' })

const uploaderRef = ref()

const acceptExtensions = computed(() =>
  props.accept ? props.accept.split(',').map(s => s.trim()) : undefined,
)

function onFilesChanged(e: { value?: File[] }) {
  const files = e.value ?? []
  if (props.limit && props.fileList.length + files.length > props.limit) {
    props.onExceed?.(files as any, props.fileList)
    emit('exceed', files as any, props.fileList)
    return
  }
}

function onUploaded(e: any) {
  const file: UploadFile = { name: e.file.name, status: 'success', size: e.file.size }
  const newList = [...props.fileList, file]
  emit('update:fileList', newList)
  emit('success', e.request?.response, file, newList)
  emit('change', file, newList)
}

function onError(e: any) {
  const file: UploadFile = { name: e.file?.name ?? '', status: 'fail' }
  emit('error', e.error, file, props.fileList)
}

function onProgress(e: any) {
  const file: UploadFile = { name: e.file?.name ?? '', status: 'uploading' }
  emit('progress', e, file, props.fileList)
}

function handleRemove(idx: number) {
  const file = props.fileList[idx]
  if (!file) return
  const newList = [...props.fileList.slice(0, idx), ...props.fileList.slice(idx + 1)]
  emit('update:fileList', newList)
  emit('remove', file, newList)
}

function clearFiles() { uploaderRef.value?.instance?.reset() }
function abort() { uploaderRef.value?.instance?.abortUpload() }

defineExpose({ clearFiles, abort, uploaderRef })
</script>

<style scoped>
.df-upload { display: inline-block; }
.df-upload--drag { border: 1px dashed var(--df-color-border, #d9d9d9); border-radius: var(--df-radius-base, 6px); padding: var(--df-spacing-5, 20px); text-align: center; cursor: pointer; transition: border-color var(--df-transition-fast, .3s); }
.df-upload--drag:hover { border-color: var(--df-color-primary, #409eff); }
.df-upload__tip { font-size: 12px; color: var(--df-color-text-secondary, #909399); margin-top: 8px; }
.df-upload__list { list-style: none; padding: 0; margin: 8px 0 0; }
.df-upload__list-item { display: flex; align-items: center; justify-content: space-between; padding: 4px 8px; font-size: 14px; border-radius: 4px; transition: background .3s; }
.df-upload__list-item:hover { background: var(--df-color-bg-secondary, #f5f7fa); }
.df-upload__list-item--success .df-upload__list-name { color: var(--df-color-success, #52C41A); }
.df-upload__list-item--fail .df-upload__list-name { color: var(--df-color-error, #F5222D); }
.df-upload__list-remove { cursor: pointer; color: var(--df-color-text-placeholder, #909399); font-size: var(--df-font-size-xs, 12px); }
.df-upload__list-remove:hover { color: var(--df-color-primary, #409eff); }
</style>
