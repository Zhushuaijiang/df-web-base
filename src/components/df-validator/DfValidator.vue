<template>
  <div class="df-validator">
    <DxValidator
      ref="dxRef"
      :validation-rules="validationRules"
      :validation-group="validationGroup"
      @validated="$emit('validated', $event)"
    >
      <slot />
    </DxValidator>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DxValidator } from 'devextreme-vue/validator'
import type { DfValidatorProps } from './types'

defineOptions({ name: 'DfValidator' })

withDefaults(defineProps<DfValidatorProps>(), {})

defineEmits<{
  validated: [e: any]
}>()

const dxRef = ref()

function getInstance() {
  return dxRef.value?.instance
}

function validate() {
  return dxRef.value?.instance?.validate()
}

function reset() {
  return dxRef.value?.instance?.reset()
}

defineExpose({ getInstance, validate, reset })
</script>

<style scoped>
.df-validator {
  display: contents;
}
</style>
