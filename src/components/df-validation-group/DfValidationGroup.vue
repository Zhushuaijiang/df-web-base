<template>
  <div class="df-validation-group">
    <DxValidationGroup ref="dxRef">
      <slot />
    </DxValidationGroup>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DxValidationGroup } from 'devextreme-vue/validation-group'

defineOptions({ name: 'DfValidationGroup' })

const dxRef = ref()

function validate() {
  return dxRef.value?.instance?.validate()
}

function reset() {
  return dxRef.value?.instance?.reset()
}

defineExpose({ validate, reset })
</script>

<style scoped>
.df-validation-group {
  display: contents;
}
</style>
