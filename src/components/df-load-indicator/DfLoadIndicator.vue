<template>
  <div class="df-load-indicator">
    <DxLoadIndicator
      ref="dxRef"
      :width="width"
      :height="height"
      :hint="hint"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DxLoadIndicator } from 'devextreme-vue/load-indicator'

defineOptions({ name: 'DfLoadIndicator' })

withDefaults(defineProps<{
  width?: number | string
  height?: number | string
  hint?: string
}>(), {
  width: 24,
  height: 24,
})

const dxRef = ref()

function getInstance() {
  return dxRef.value?.instance
}

defineExpose({ getInstance })
</script>

<style scoped>
.df-load-indicator {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
</style>
