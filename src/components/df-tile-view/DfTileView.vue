<template>
  <div class="df-tile-view">
    <DxTileView
      ref="dxRef"
      :data-source="dataSource"
      :items="items"
      :base-item-width="baseItemWidth"
      :base-item-height="baseItemHeight"
      :item-margin="itemMargin"
      :direction="direction"
      :width="width"
      :height="height"
      @item-click="$emit('item-click', $event)"
    >
      <template #item="{ data, index }">
        <slot name="item" :data="data" :index="index" />
      </template>
    </DxTileView>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DxTileView } from 'devextreme-vue/tile-view'

defineOptions({ name: 'DfTileView' })

withDefaults(defineProps<{
  dataSource?: any[]
  items?: any[]
  baseItemWidth?: number
  baseItemHeight?: number
  itemMargin?: number
  direction?: 'horizontal' | 'vertical'
  width?: number | string
  height?: number | string
}>(), {
  baseItemWidth: 100,
  baseItemHeight: 100,
  itemMargin: 4,
  direction: 'horizontal',
})

defineEmits<{
  'item-click': [e: any]
}>()

const dxRef = ref()

function getInstance() {
  return dxRef.value?.instance
}

defineExpose({ getInstance })
</script>

<style scoped>
.df-tile-view {
  display: block;
}
</style>
