<template>
  <div class="df-resizable">
    <DxResizable
      ref="dxRef"
      :width="width"
      :height="height"
      :min-width="minWidth"
      :max-width="maxWidth"
      :min-height="minHeight"
      :max-height="maxHeight"
      :handles="handles"
      :area="area"
      @resize="$emit('resize', $event)"
      @resize-start="$emit('resize-start', $event)"
      @resize-end="$emit('resize-end', $event)"
    >
      <slot />
    </DxResizable>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DxResizable } from 'devextreme-vue/resizable'

defineOptions({ name: 'DfResizable' })

withDefaults(defineProps<{
  width?: number | string
  height?: number | string
  minWidth?: number
  maxWidth?: number
  minHeight?: number
  maxHeight?: number
  handles?: 'top' | 'bottom' | 'left' | 'right' | 'top right' | 'bottom right' | 'bottom left' | 'top left' | string
  area?: string | Element
}>(), {
  handles: 'right bottom',
})

defineEmits<{
  resize: [e: any]
  'resize-start': [e: any]
  'resize-end': [e: any]
}>()

const dxRef = ref()

function getInstance() {
  return dxRef.value?.instance
}

defineExpose({ getInstance })
</script>

<style scoped>
.df-resizable {
  display: inline-block;
}
</style>
