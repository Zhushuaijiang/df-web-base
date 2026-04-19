<template>
  <div class="df-calendar" :class="{ [`df-calendar--${size}`]: size }">
    <DxCalendar
      :value="modelValue"
      :min="min"
      :max="max"
      :disabled="disabled"
      :read-only="readonly"
      :first-day-of-week="firstDayOfWeek"
      :show-today-button="showToday"
      :zoom-level="zoomLevel"
      :max-zoom-level="maxZoomLevel"
      :min-zoom-level="minZoomLevel"
      :width="width"
      :cell-template="$slots.cell ? 'cellTpl' : undefined"
      @value-changed="onValueChanged"
    >
      <template v-if="$slots.cell" #cellTpl="{ data }">
        <slot name="cell" :date="data.date" :text="data.text" :view="data.view" />
      </template>
    </DxCalendar>
  </div>
</template>

<script setup lang="ts">
import { DxCalendar } from 'devextreme-vue/calendar'

export type CalendarZoomLevel = 'month' | 'year' | 'decade' | 'century'

withDefaults(defineProps<{
  modelValue?: Date | string | null
  min?: Date | string
  max?: Date | string
  disabled?: boolean
  readonly?: boolean
  firstDayOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6
  showToday?: boolean
  zoomLevel?: CalendarZoomLevel
  maxZoomLevel?: CalendarZoomLevel
  minZoomLevel?: CalendarZoomLevel
  size?: 'large' | 'default' | 'small'
  width?: string | number
}>(), {
  disabled: false,
  readonly: false,
  firstDayOfWeek: 1,
  showToday: true,
  zoomLevel: 'month',
  maxZoomLevel: 'month',
  minZoomLevel: 'century',
  size: 'default',
})

const emit = defineEmits<{
  'update:modelValue': [val: Date | null]
  change: [val: Date | null]
}>()

defineOptions({ name: 'DfCalendar' })

function onValueChanged(e: any) {
  emit('update:modelValue', e.value as Date | null)
  emit('change', e.value as Date | null)
}
</script>

<style scoped>
.df-calendar {
  display: inline-block;
}
</style>
