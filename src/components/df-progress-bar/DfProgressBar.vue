<template>
  <div class="df-progress-bar" :class="{ 'df-progress-bar--disabled': disabled }">
    <DxProgressBar
      ref="dxRef"
      :value="modelValue"
      :min="min"
      :max="max"
      :width="width"
      :show-status="showStatus"
      :status-format="statusFormat"
      :disabled="disabled"
      @value-changed="onValueChanged"
      @complete="$emit('complete')"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DxProgressBar } from 'devextreme-vue/progress-bar'

defineOptions({ name: 'DfProgressBar' })

withDefaults(defineProps<{
  modelValue?: number
  min?: number
  max?: number
  width?: string | number
  showStatus?: boolean
  statusFormat?: (ratio: number, value: number) => string
  disabled?: boolean
}>(), {
  modelValue: 0,
  min: 0,
  max: 100,
  showStatus: true,
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [val: number]
  change: [val: number]
  complete: []
}>()

const dxRef = ref()

function onValueChanged(e: any) {
  emit('update:modelValue', e.value)
  emit('change', e.value)
}

function getInstance() {
  return dxRef.value?.instance
}

defineExpose({ getInstance })
</script>

<style scoped>
.df-progress-bar {
  width: 100%;
}

.df-progress-bar--disabled {
  opacity: 0.6;
  pointer-events: none;
}
</style>
