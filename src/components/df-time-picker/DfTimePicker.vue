<template>
  <div class="df-time-picker" :class="{ 'df-time-picker--disabled': disabled, [`df-time-picker--${size}`]: size }">
    <template v-if="isRange">
      <div class="df-time-picker__range">
        <DxDateBox
          :value="(rangeStart as any)"
          type="time"
          :display-format="format"
          :disabled="disabled"
          :read-only="readonly"
          :placeholder="startPlaceholder"
          :show-clear-button="clearable"
          :width="rangeWidth"
          :opened-on-field-click="true"
          @value-changed="onStartChanged"
        />
        <span class="df-time-picker__separator">{{ rangeSeparator }}</span>
        <DxDateBox
          :value="(rangeEnd as any)"
          type="time"
          :display-format="format"
          :disabled="disabled"
          :read-only="readonly"
          :placeholder="endPlaceholder"
          :show-clear-button="clearable"
          :width="rangeWidth"
          :opened-on-field-click="true"
          @value-changed="onEndChanged"
        />
      </div>
    </template>
    <template v-else>
      <DxDateBox
        :value="(modelValue as any)"
        type="time"
        :display-format="format"
        :disabled="disabled"
        :read-only="readonly"
        :placeholder="placeholder"
        :show-clear-button="clearable"
        :width="width"
        :opened-on-field-click="true"
        @value-changed="onValueChanged"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { DxDateBox } from 'devextreme-vue/date-box'

const props = withDefaults(defineProps<{
  modelValue?: Date | string | null | [Date | string | null, Date | string | null]
  isRange?: boolean
  format?: string
  placeholder?: string
  startPlaceholder?: string
  endPlaceholder?: string
  rangeSeparator?: string
  clearable?: boolean
  disabled?: boolean
  readonly?: boolean
  size?: 'large' | 'default' | 'small'
  width?: string | number
}>(), {
  isRange: false,
  format: 'HH:mm:ss',
  placeholder: '请选择时间',
  startPlaceholder: '开始时间',
  endPlaceholder: '结束时间',
  rangeSeparator: '至',
  clearable: true,
  disabled: false,
  readonly: false,
  size: 'default',
})

const emit = defineEmits<{
  'update:modelValue': [val: any]
  change: [val: any]
}>()

defineOptions({ name: 'DfTimePicker' })

const rangeStart = computed(() => {
  if (Array.isArray(props.modelValue)) return props.modelValue[0] ?? null
  return null
})

const rangeEnd = computed(() => {
  if (Array.isArray(props.modelValue)) return props.modelValue[1] ?? null
  return null
})

const rangeWidth = computed(() => {
  if (props.width) {
    const w = typeof props.width === 'number' ? props.width : parseInt(props.width, 10)
    return isNaN(w) ? undefined : Math.floor((w - 30) / 2)
  }
  return undefined
})

function onValueChanged(e: any) {
  emit('update:modelValue', e.value)
  emit('change', e.value)
}

function onStartChanged(e: any) {
  const val: [any, any] = [e.value, rangeEnd.value]
  emit('update:modelValue', val)
  emit('change', val)
}

function onEndChanged(e: any) {
  const val: [any, any] = [rangeStart.value, e.value]
  emit('update:modelValue', val)
  emit('change', val)
}
</script>

<style scoped>
.df-time-picker {
  display: inline-block;
}

.df-time-picker__range {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.df-time-picker__separator {
  color: var(--df-color-text-secondary, #909399);
  font-size: 14px;
  flex-shrink: 0;
}

.df-time-picker--small :deep(.dx-texteditor-input) {
  font-size: 12px;
  height: 28px;
}

.df-time-picker--small :deep(.dx-texteditor-container) {
  height: 28px;
}

.df-time-picker--large :deep(.dx-texteditor-input) {
  font-size: 16px;
  height: 40px;
}

.df-time-picker--large :deep(.dx-texteditor-container) {
  height: 40px;
}

.df-time-picker--disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
