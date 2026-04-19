<template>
  <div class="df-gallery">
    <DxGallery
      ref="dxRef"
      :data-source="dataSource"
      :height="height"
      :width="width"
      :initial-selected-index="initialSelectedIndex"
      :loop="loop"
      :slideshow-delay="slideshowDelay"
      :show-nav-buttons="showNavButtons"
      :show-indicator="showIndicator"
      :stretch-images="stretchImages"
      @selection-changed="onSelectionChanged"
      @item-click="$emit('item-click', $event)"
    >
      <template #item="{ data, index }">
        <slot name="item" :data="data" :index="index" />
      </template>
    </DxGallery>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DxGallery } from 'devextreme-vue/gallery'

defineOptions({ name: 'DfGallery' })

withDefaults(defineProps<{
  dataSource?: any[]
  height?: number | string
  width?: number | string
  initialSelectedIndex?: number
  loop?: boolean
  slideshowDelay?: number
  showNavButtons?: boolean
  showIndicator?: boolean
  stretchImages?: boolean
}>(), {
  initialSelectedIndex: 0,
  loop: false,
  slideshowDelay: 0,
  showNavButtons: true,
  showIndicator: true,
  stretchImages: false,
})

const emit = defineEmits<{
  'selection-changed': [index: number]
  'item-click': [e: any]
}>()

const dxRef = ref()

function onSelectionChanged(e: any) {
  emit('selection-changed', e.itemIndex)
}

function getInstance() {
  return dxRef.value?.instance
}

defineExpose({ getInstance })
</script>

<style scoped>
.df-gallery {
  display: inline-block;
}
</style>
