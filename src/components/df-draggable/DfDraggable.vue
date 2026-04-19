<template>
  <div class="df-draggable">
    <DxDraggable
      ref="dxRef"
      :group="group"
      :clone="clone"
      :handle="handle"
      :drag-direction="dragDirection"
      :bound-zone="boundZone"
      :immediate="immediate"
      :drag-template="$slots.dragTemplate ? 'dragTpl' : undefined"
      @drag-start="$emit('drag-start', $event)"
      @drag-move="$emit('drag-move', $event)"
      @drag-end="$emit('drag-end', $event)"
    >
      <slot />
      <template #dragTpl="{ itemElement }">
        <slot name="dragTemplate" :item-element="itemElement" />
      </template>
    </DxDraggable>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DxDraggable } from 'devextreme-vue/draggable'
import type { DfDraggableProps, DfDraggableEmits } from './types'

defineOptions({ name: 'DfDraggable' })

withDefaults(defineProps<DfDraggableProps>(), {
  clone: false,
  dragDirection: 'both',
  immediate: false,
})

defineEmits<DfDraggableEmits>()

const dxRef = ref()

function getInstance() {
  return dxRef.value?.instance
}

defineExpose({ getInstance })
</script>

<style scoped>
.df-draggable {
  display: contents;
}
</style>
