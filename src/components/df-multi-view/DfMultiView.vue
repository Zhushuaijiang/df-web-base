<template>
  <div class="df-multi-view">
    <DxMultiView
      ref="dxRef"
      :data-source="dataSource"
      :items="items"
      :selected-index="modelValue"
      :loop="loop"
      :animation-enabled="animationEnabled"
      :swipe-enabled="swipeEnabled"
      :defer-rendering="deferRendering"
      @selection-changed="onSelectionChanged"
    >
      <template #item="{ data, index }">
        <slot name="item" :data="data" :index="index" />
      </template>
    </DxMultiView>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DxMultiView } from 'devextreme-vue/multi-view'

defineOptions({ name: 'DfMultiView' })

withDefaults(defineProps<{
  dataSource?: any[]
  items?: any[]
  modelValue?: number
  loop?: boolean
  animationEnabled?: boolean
  swipeEnabled?: boolean
  deferRendering?: boolean
}>(), {
  modelValue: 0,
  loop: false,
  animationEnabled: true,
  swipeEnabled: true,
  deferRendering: true,
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
.df-multi-view {
  display: block;
}
</style>
