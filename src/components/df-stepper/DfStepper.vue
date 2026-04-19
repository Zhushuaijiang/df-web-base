<template>
  <div class="df-stepper" :class="{ [`df-stepper--${orientation}`]: orientation, [`df-stepper--${size}`]: size }">
    <DxStepper
      ref="dxRef"
      :selected-index="modelValue"
      :items="items"
      :orientation="orientation"
      :linear="linear"
      :select-on-focus="selectOnFocus"
      @selection-changed="onSelectionChanged"
    >
      <template v-if="$slots.item" #item="{ data, index }">
        <slot name="item" :data="data" :index="index" />
      </template>
    </DxStepper>
  </div>
</template>

<script setup lang="ts">
import { inject, ref } from 'vue'
import { DxStepper } from 'devextreme-vue/stepper'
import { DF_UI_KEY } from '../../install'

defineOptions({ name: 'DfStepper' })

inject(DF_UI_KEY)

withDefaults(defineProps<{
  modelValue?: number
  items?: any[]
  orientation?: 'horizontal' | 'vertical'
  linear?: boolean
  selectOnFocus?: boolean
  size?: 'large' | 'default' | 'small'
}>(), {
  modelValue: 0,
  orientation: 'horizontal',
  linear: false,
  selectOnFocus: true,
  size: 'default',
})

const emit = defineEmits<{
  'update:modelValue': [val: number]
  change: [val: number]
}>()

const dxRef = ref()

function onSelectionChanged(e: any) {
  emit('update:modelValue', e.selectedIndex)
  emit('change', e.selectedIndex)
}

function getInstance() {
  return dxRef.value?.instance
}

defineExpose({ getInstance })
</script>

<style scoped>
.df-stepper {
  display: block;
}
</style>
