<template>
  <div class="df-splitter">
    <DxSplitter
      ref="dxRef"
      :orientation="orientation"
      :width="width"
      :height="height"
      :separator-size="separatorSize"
      :initial-item-size="initialItemSize"
      :item-size="itemSize"
      @resize="$emit('resize', $event)"
      @resize-end="$emit('resize-end', $event)"
      @resize-start="$emit('resize-start', $event)"
    >
      <slot />
    </DxSplitter>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DxSplitter } from 'devextreme-vue/splitter'

defineOptions({ name: 'DfSplitter' })

withDefaults(defineProps<{
  orientation?: 'horizontal' | 'vertical'
  width?: number | string
  height?: number | string
  separatorSize?: number
  initialItemSize?: string
  itemSize?: string | ((itemEl: HTMLElement, idx: number) => string)
}>(), {
  orientation: 'horizontal',
  separatorSize: 8,
})

defineEmits<{
  resize: [e: any]
  'resize-end': [e: any]
  'resize-start': [e: any]
}>()

const dxRef = ref()

function getInstance() {
  return dxRef.value?.instance
}

defineExpose({ getInstance })
</script>

<style scoped>
.df-splitter {
  display: block;
}
</style>
