<template>
  <div class="df-text-editor" :class="rootClass">
    <DxHtmlEditor
      ref="editorRef"
      :value="modelValue"
      :height="height ?? 300"
      :width="width"
      :read-only="readOnly"
      :placeholder="placeholder ?? '请输入内容...'"
      :value-type="valueType ?? 'html'"
      @value-changed="onValueChanged"
      @focus-in="$emit('focus')"
      @focus-out="$emit('blur')"
    >
      <DxToolbar v-if="!readOnly" :multiline="toolbarMultiline ?? false">
        <DxItem name="undo" />
        <DxItem name="redo" />
        <DxItem name="separator" />
        <DxItem name="bold" />
        <DxItem name="italic" />
        <DxItem name="underline" />
        <DxItem name="strike" />
        <DxItem name="separator" />
        <DxItem name="alignLeft" />
        <DxItem name="alignCenter" />
        <DxItem name="alignRight" />
        <DxItem name="separator" />
        <DxItem name="orderedList" />
        <DxItem name="bulletList" />
        <DxItem name="separator" />
        <DxItem v-if="showHeaderFormat" name="header" :accepted-values="[1, 2, 3, false]" />
        <DxItem v-if="showFontSize" name="size" :accepted-values="(['10px','12px','14px','16px','18px','24px','36px'] as any)" />
        <DxItem v-if="showFontColor" name="color" />
        <DxItem v-if="showBackground" name="background" />
        <DxItem v-if="showLink" name="link" />
        <DxItem v-if="showImage" name="image" />
        <DxItem name="separator" />
        <DxItem name="clear" />
        <DxItem v-if="showCodeBlock" name="codeBlock" />
        <DxItem v-if="showBlockquote" name="blockquote" />
      </DxToolbar>

      <DxMediaResizing v-if="showImage" :enabled="true" />
    </DxHtmlEditor>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, type PropType } from 'vue'
import {
  DxHtmlEditor,
  DxToolbar,
  DxItem,
  DxMediaResizing,
} from 'devextreme-vue/html-editor'

const props = defineProps({
  modelValue: { type: String, default: '' },
  height: { type: [Number, String], default: 300 },
  width: { type: [Number, String], default: undefined },
  readOnly: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  placeholder: { type: String, default: '请输入内容...' },
  valueType: { type: String as PropType<'html' | 'markdown'>, default: 'html' },
  toolbarMultiline: { type: Boolean, default: false },
  showHeaderFormat: { type: Boolean, default: true },
  showFontSize: { type: Boolean, default: false },
  showFontColor: { type: Boolean, default: false },
  showBackground: { type: Boolean, default: false },
  showLink: { type: Boolean, default: true },
  showImage: { type: Boolean, default: true },
  showCodeBlock: { type: Boolean, default: false },
  showBlockquote: { type: Boolean, default: true },
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  change: [value: string]
  focus: []
  blur: []
}>()

const editorRef = ref()

const rootClass = computed(() => ({
  'df-text-editor--readonly': props.readOnly,
  'df-text-editor--disabled': props.disabled,
}))

function onValueChanged(e: any) {
  emit('update:modelValue', e.value as string)
  emit('change', e.value as string)
}

function getInstance() {
  return editorRef.value?.instance
}

function getLength() {
  return getInstance()?.getLength() ?? 0
}

function getText() {
  return getInstance()?.getText() ?? ''
}

function insertText(index: number, text: string) {
  getInstance()?.insertText(index, text)
}

function clearContent() {
  emit('update:modelValue', '')
}

defineExpose({ getInstance, getLength, getText, insertText, clearContent })
</script>

<style scoped>
.df-text-editor {
  border: 1px solid var(--df-color-border);
  border-radius: var(--df-radius-md, 4px);
  overflow: hidden;
}

.df-text-editor--disabled {
  opacity: 0.5;
  pointer-events: none;
}
</style>
