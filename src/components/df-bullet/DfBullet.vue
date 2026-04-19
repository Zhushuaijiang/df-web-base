<template>
  <div class="df-bullet">
    <DxBullet
      ref="dxRef"
      :value="value"
      :target="target"
      :start-scale-value="startScaleValue"
      :end-scale-value="endScaleValue"
      :color="color"
      :tooltip="tooltip"
      :margin="margin"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DxBullet } from 'devextreme-vue/bullet'

defineOptions({ name: 'DfBullet' })

withDefaults(defineProps<{
  value?: number
  target?: number
  startScaleValue?: number
  endScaleValue?: number
  color?: string
  tooltip?: Record<string, any>
  margin?: { top?: number; bottom?: number; left?: number; right?: number }
}>(), {
  value: 0,
  target: 0,
  startScaleValue: 0,
  endScaleValue: 100,
})

const dxRef = ref()

function getInstance() {
  return dxRef.value?.instance
}

defineExpose({ getInstance })
</script>

<style scoped>
.df-bullet {
  display: inline-block;
}
</style>
