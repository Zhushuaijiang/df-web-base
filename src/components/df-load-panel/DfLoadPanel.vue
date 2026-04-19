<template>
  <div class="df-load-panel">
    <DxLoadPanel
      ref="dxRef"
      :visible="modelValue"
      :message="message"
      :show-indicator="showIndicator"
      :shading="shading"
      :shading-color="shadingColor"
      :delay="delay"
      :close-on-outside-click="closeOnOutsideClick"
      :position="position"
      :container="container"
      @value-changed="onVisibleChanged"
      @shown="$emit('shown')"
      @hidden="$emit('hidden')"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DxLoadPanel } from 'devextreme-vue/load-panel'

defineOptions({ name: 'DfLoadPanel' })

withDefaults(defineProps<{
  modelValue?: boolean
  message?: string
  showIndicator?: boolean
  shading?: boolean
  shadingColor?: string
  delay?: number
  closeOnOutsideClick?: boolean
  position?: Record<string, any>
  container?: string | Element
}>(), {
  modelValue: false,
  message: 'Loading...',
  showIndicator: true,
  shading: true,
  shadingColor: 'rgba(0, 0, 0, 0.4)',
  delay: 0,
  closeOnOutsideClick: false,
})

const emit = defineEmits<{
  'update:modelValue': [val: boolean]
  shown: []
  hidden: []
}>()

const dxRef = ref()

function onVisibleChanged(e: any) {
  emit('update:modelValue', e.value)
}

function getInstance() {
  return dxRef.value?.instance
}

defineExpose({ getInstance })
</script>

<style scoped>
.df-load-panel {
  display: contents;
}
</style>
