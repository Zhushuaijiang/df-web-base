<template>
  <div class="df-box">
    <DxBox
      ref="dxRef"
      :direction="direction"
      :width="width"
      :height="height"
      :align="align"
      :cross-align="crossAlign"
    >
      <slot />
    </DxBox>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DxBox } from 'devextreme-vue/box'

defineOptions({ name: 'DfBox' })

withDefaults(defineProps<{
  direction?: 'row' | 'col'
  width?: number | string
  height?: number | string
  align?: 'start' | 'center' | 'end' | 'space-around' | 'space-between'
  crossAlign?: 'start' | 'center' | 'end' | 'stretch'
}>(), {
  direction: 'row',
  align: 'start',
  crossAlign: 'stretch',
})

const dxRef = ref()

function getInstance() {
  return dxRef.value?.instance
}

defineExpose({ getInstance })
</script>

<style scoped>
.df-box {
  display: block;
}
</style>
