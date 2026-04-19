<template>
  <div class="df-speed-dial-action">
    <DxSpeedDialAction
      ref="dxRef"
      :icon="icon"
      :label="label"
      :index="index"
      :visible="visible"
      :disabled="disabled"
      :hint="hint"
      @click="$emit('click', $event)"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DxSpeedDialAction } from 'devextreme-vue/speed-dial-action'

defineOptions({ name: 'DfSpeedDialAction' })

withDefaults(defineProps<{
  icon?: string
  label?: string
  index?: number
  visible?: boolean
  disabled?: boolean
  hint?: string
}>(), {
  visible: true,
  disabled: false,
  index: 0,
})

defineEmits<{
  click: [e: any]
}>()

const dxRef = ref()

function getInstance() {
  return dxRef.value?.instance
}

defineExpose({ getInstance })
</script>

<style scoped>
.df-speed-dial-action {
  display: contents;
}
</style>
