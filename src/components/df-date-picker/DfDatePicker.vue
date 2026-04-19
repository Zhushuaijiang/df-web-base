<template>
  <div class="df-date-picker" :class="{ 'df-date-picker--disabled': disabled, [`df-date-picker--${size}`]: size }">
    <template v-if="isRange">
      <DxDateRangeBox
        :start-date="rangeStart"
        :end-date="rangeEnd"
        :type="(dxType as any)"
        :display-format="displayFormat"
        :disabled="disabled"
        :read-only="readonly"
        :placeholder="startPlaceholder"
        :end-date-placeholder="endPlaceholder"
        :show-clear-button="clearable"
        :width="width"
        :opened-on-field-click="true"
        @value-changed="onRangeChanged"
      />
    </template>
    <template v-else>
      <DxDateBox
        :value="(modelValue as any)"
        :type="(dxType as any)"
        :display-format="displayFormat"
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
import { DxDateRangeBox } from 'devextreme-vue/date-range-box'

export type DatePickerType = 'date' | 'datetime' | 'daterange' | 'datetimerange' | 'month' | 'year' | 'week'

const props = withDefaults(defineProps<{
  modelValue?: Date | string | null | [Date | string | null, Date | string | null]
  type?: DatePickerType
  format?: string
  valueFormat?: string
  placeholder?: string
  startPlaceholder?: string
  endPlaceholder?: string
  clearable?: boolean
  disabled?: boolean
  readonly?: boolean
  size?: 'large' | 'default' | 'small'
  width?: string | number
  editable?: boolean
}>(), {
  type: 'date',
  placeholder: '请选择日期',
  startPlaceholder: '开始日期',
  endPlaceholder: '结束日期',
  clearable: true,
  disabled: false,
  readonly: false,
  size: 'default',
  editable: true,
})

const emit = defineEmits<{
  'update:modelValue': [val: any]
  change: [val: any]
}>()

defineOptions({ name: 'DfDatePicker' })

const isRange = computed(() => props.type === 'daterange' || props.type === 'datetimerange')

const dxType = computed(() => {
  const map: Record<string, string> = { date: 'date', datetime: 'datetime', daterange: 'date', datetimerange: 'datetime', month: 'date', year: 'date', week: 'date' }
  return map[props.type] ?? 'date'
})

const FORMAT_MAP: Record<string, string> = {
  date: 'yyyy-MM-dd', datetime: 'yyyy-MM-dd HH:mm:ss',
  daterange: 'yyyy-MM-dd', datetimerange: 'yyyy-MM-dd HH:mm:ss',
  month: 'yyyy-MM', year: 'yyyy', week: 'yyyy-ww',
}
const displayFormat = computed(() => props.format ?? FORMAT_MAP[props.type] ?? 'yyyy-MM-dd')

const rangeStart = computed(() => Array.isArray(props.modelValue) ? props.modelValue[0] : null)
const rangeEnd = computed(() => Array.isArray(props.modelValue) ? props.modelValue[1] : null)

function onValueChanged(e: any) {
  emit('update:modelValue', e.value)
  emit('change', e.value)
}

function onRangeChanged(e: any) {
  const val = e.value
  emit('update:modelValue', val)
  emit('change', val)
}
</script>

<style scoped>
.df-date-picker { display: inline-flex; }
.df-date-picker--disabled { opacity: 0.6; pointer-events: none; }
</style>
