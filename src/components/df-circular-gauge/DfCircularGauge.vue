<template>
  <div class="df-circular-gauge">
    <DxCircularGauge
      ref="dxRef"
      :value="modelValue"
      :subvalues="subvalues"
      :geometry="geometry"
      :scale="scale"
      :range-container="rangeContainer"
      :value-indicator="valueIndicator"
      :subvalue-indicator="subvalueIndicator"
      :title="titleConfig"
      :tooltip="tooltipConfig"
      :animation="animation"
    >
      <template v-if="$slots.centerTemplate" #center-template="{ value }">
        <slot name="centerTemplate" :value="value" />
      </template>
    </DxCircularGauge>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { DxCircularGauge } from 'devextreme-vue/circular-gauge'

defineOptions({ name: 'DfCircularGauge' })

const props = withDefaults(defineProps<{
  modelValue?: number
  subvalues?: number[]
  geometry?: Record<string, any>
  scale?: Record<string, any>
  rangeContainer?: Record<string, any>
  valueIndicator?: Record<string, any>
  subvalueIndicator?: Record<string, any>
  title?: string | Record<string, any>
  tooltip?: Record<string, any>
  animation?: Record<string, any>
}>(), {
  animation: () => ({ enabled: true, duration: 1000 }),
})

const titleConfig = computed(() => typeof props.title === 'string' ? { text: props.title } : props.title)
const tooltipConfig = computed(() => typeof props.tooltip === 'boolean' ? { enabled: props.tooltip } : props.tooltip)

const dxRef = ref()

function getInstance() {
  return dxRef.value?.instance
}

defineExpose({ getInstance })
</script>

<style scoped>
.df-circular-gauge {
  display: inline-block;
}
</style>
