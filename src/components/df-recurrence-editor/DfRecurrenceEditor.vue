<template>
  <div class="df-recurrence-editor" :class="{ 'df-recurrence-editor--disabled': disabled, [`df-recurrence-editor--${size}`]: size }">
    <DxRecurrenceEditor
      ref="dxRef"
      :value="modelValue"
      :start-date="startDate"
      :end-date="endDate"
      :disabled="disabled"
      @value-changed="onValueChanged"
    />
  </div>
</template>

<script setup lang="ts">
import { inject, ref } from 'vue'
import { DxRecurrenceEditor } from 'devextreme-vue/recurrence-editor'
import { DF_UI_KEY } from '../../install'

defineOptions({ name: 'DfRecurrenceEditor' })

inject(DF_UI_KEY)

withDefaults(defineProps<{
  modelValue?: string
  startDate?: Date | string
  endDate?: Date | string
  disabled?: boolean
  size?: 'large' | 'default' | 'small'
}>(), {
  disabled: false,
  size: 'default',
})

const emit = defineEmits<{
  'update:modelValue': [val: string]
  change: [val: string]
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
.df-recurrence-editor--disabled {
  opacity: 0.6;
  pointer-events: none;
}
</style>
