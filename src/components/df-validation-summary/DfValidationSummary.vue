<template>
  <div class="df-validation-summary">
    <DxValidationSummary
      ref="dxRef"
      :validation-group="validationGroup"
      @validation-requested="$emit('validation-requested', $event)"
      @customize-item="$emit('customize-item', $event)"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DxValidationSummary } from 'devextreme-vue/validation-summary'

defineOptions({ name: 'DfValidationSummary' })

withDefaults(defineProps<{
  validationGroup?: string
}>(), {})

defineEmits<{
  'validation-requested': [e: any]
  'customize-item': [e: any]
}>()

const dxRef = ref()

function getInstance() {
  return dxRef.value?.instance
}

function validate() {
  return dxRef.value?.instance?.validate()
}

defineExpose({ getInstance, validate })
</script>

<style scoped>
.df-validation-summary {
  display: block;
}
</style>
