<template>
  <div class="df-toast">
    <DxToast
      ref="dxRef"
      :visible="modelValue"
      :message="message"
      :type="type"
      :display-time="displayTime"
      :position="position"
      :animation="animation"
      :shading="shading"
      @value-changed="onVisibleChanged"
      @hidden="$emit('hidden')"
      @shown="$emit('shown')"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DxToast } from 'devextreme-vue/toast'

defineOptions({ name: 'DfToast' })

export type ToastType = 'custom' | 'error' | 'info' | 'success' | 'warning'

const props = withDefaults(defineProps<{
  modelValue?: boolean
  message?: string
  type?: ToastType
  displayTime?: number
  position?: string | Record<string, any>
  animation?: Record<string, any>
  shading?: boolean
}>(), {
  modelValue: false,
  message: '',
  type: 'info',
  displayTime: 2000,
  shading: false,
})

const emit = defineEmits<{
  'update:modelValue': [val: boolean]
  hidden: []
  shown: []
}>()

const dxRef = ref()

function onVisibleChanged(e: any) {
  emit('update:modelValue', e.value)
}

function show(msg?: string) {
  if (msg !== undefined) {
    Object.assign(props, { message: msg })
  }
  emit('update:modelValue', true)
}

function hide() {
  emit('update:modelValue', false)
}

function getInstance() {
  return dxRef.value?.instance
}

defineExpose({ getInstance, show, hide })
</script>

<style scoped>
.df-toast {
  display: contents;
}
</style>
