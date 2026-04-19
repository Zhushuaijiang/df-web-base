<template>
  <div class="df-input-number" :class="classes">
    <DxNumberBox
      :value="(modelValue ?? undefined)"
      :min="min"
      :max="max"
      :step="step"
      :disabled="disabled"
      :read-only="readonly"
      :placeholder="placeholder"
      :show-spin-buttons="controls"
      :show-clear-button="false"
      :format="precisionFormat"
      :width="width"
      @value-changed="onValueChanged"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { DxNumberBox } from 'devextreme-vue/number-box'

const props = withDefaults(defineProps<{
  modelValue?: number | null
  min?: number
  max?: number
  step?: number
  stepStrictly?: boolean
  precision?: number
  disabled?: boolean
  readonly?: boolean
  controls?: boolean
  controlsPosition?: '' | 'right'
  size?: 'large' | 'default' | 'small'
  placeholder?: string
  width?: string | number
}>(), {
  min: -Infinity,
  max: Infinity,
  step: 1,
  stepStrictly: false,
  disabled: false,
  readonly: false,
  controls: true,
  controlsPosition: '',
  size: 'default',
  placeholder: '',
})

const emit = defineEmits<{
  'update:modelValue': [val: number | null]
  change: [cur: number | null, old: number | null]
}>()

defineOptions({ name: 'DfInputNumber' })

const classes = computed(() => [
  `df-input-number--${props.size}`,
  { 'df-input-number--disabled': props.disabled },
])

const precisionFormat = computed(() =>
  props.precision !== undefined ? `#,##0.${'0'.repeat(props.precision)}` : undefined,
)

function onValueChanged(e: any) {
  let val: number | null = e.value ?? null
  const prev: number | null = e.previousValue ?? null
  if (val !== null) {
    if (props.stepStrictly && val % props.step !== 0) val = Math.round(val / props.step) * props.step
    if (val < props.min) val = props.min
    if (val > props.max) val = props.max
    if (props.precision !== undefined) val = parseFloat(val.toFixed(props.precision))
  }
  emit('update:modelValue', val)
  emit('change', val, prev)
}
</script>

<style scoped>
.df-input-number { display: inline-flex; }
.df-input-number--disabled { opacity: 0.6; }
</style>
