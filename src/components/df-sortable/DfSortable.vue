<template>
  <div class="df-sortable">
    <DxSortable
      ref="dxRef"
      :group="group"
      :allow-drop-inside-item="allowDropInsideItem"
      :allow-reordering="allowReordering"
      :handle="handle"
      :filter="filter"
      :drag-direction="dragDirection"
      :cursor-precision="cursorPrecision"
      @drag-start="$emit('drag-start', $event)"
      @drag-move="$emit('drag-move', $event)"
      @drag-end="$emit('drag-end', $event)"
      @change="$emit('change', $event)"
      @placeholder-appear="$emit('placeholder-appear', $event)"
      @placeholder-disappear="$emit('placeholder-disappear', $event)"
    >
      <slot />
    </DxSortable>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DxSortable } from 'devextreme-vue/sortable'

defineOptions({ name: 'DfSortable' })

withDefaults(defineProps<{
  group?: string
  allowDropInsideItem?: boolean
  allowReordering?: boolean
  handle?: string
  filter?: string
  dragDirection?: 'both' | 'horizontal' | 'vertical'
  cursorPrecision?: number
}>(), {
  allowDropInsideItem: false,
  allowReordering: true,
  dragDirection: 'both',
  cursorPrecision: 1,
})

defineEmits<{
  'drag-start': [e: any]
  'drag-move': [e: any]
  'drag-end': [e: any]
  change: [e: any]
  'placeholder-appear': [e: any]
  'placeholder-disappear': [e: any]
}>()

const dxRef = ref()

function getInstance() {
  return dxRef.value?.instance
}

defineExpose({ getInstance })
</script>

<style scoped>
.df-sortable {
  display: contents;
}
</style>
