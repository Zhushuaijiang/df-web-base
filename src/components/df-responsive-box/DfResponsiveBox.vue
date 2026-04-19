<template>
  <div class="df-responsive-box">
    <DxResponsiveBox
      ref="dxRef"
      :single-column-screen="singleColumnScreen"
      :rows="rows"
      :cols="cols"
      :screen-by-width="screenByWidth as any"
      :width="width"
      :height="height"
    >
      <slot />
    </DxResponsiveBox>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DxResponsiveBox } from 'devextreme-vue/responsive-box'

defineOptions({ name: 'DfResponsiveBox' })

withDefaults(defineProps<{
  singleColumnScreen?: string
  rows?: any[]
  cols?: any[]
  screenByWidth?: (width: number) => string
  width?: number | string
  height?: number | string
}>(), {})

const dxRef = ref()

function getInstance() {
  return dxRef.value?.instance
}

defineExpose({ getInstance })
</script>

<style scoped>
.df-responsive-box {
  display: block;
  width: 100%;
}
</style>
