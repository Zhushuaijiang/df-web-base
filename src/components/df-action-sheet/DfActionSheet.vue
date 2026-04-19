<template>
  <div class="df-action-sheet">
    <DxActionSheet
      ref="dxRef"
      :data-source="dataSource"
      :visible="modelValue"
      :title="title"
      :show-title="showTitle"
      :show-cancel-button="showCancelButton"
      :cancel-text="cancelText"
      :target="target"
      :use-popover="usePopover"
      @value-changed="onVisibleChanged"
      @item-click="$emit('item-click', $event)"
      @cancel-click="$emit('cancel-click')"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DxActionSheet } from 'devextreme-vue/action-sheet'

defineOptions({ name: 'DfActionSheet' })

withDefaults(defineProps<{
  dataSource?: any[]
  modelValue?: boolean
  title?: string
  showTitle?: boolean
  showCancelButton?: boolean
  cancelText?: string
  target?: string | Element
  usePopover?: boolean
}>(), {
  modelValue: false,
  showTitle: true,
  showCancelButton: true,
  cancelText: 'Cancel',
  usePopover: false,
})

const emit = defineEmits<{
  'update:modelValue': [val: boolean]
  'item-click': [e: any]
  'cancel-click': []
}>()

const dxRef = ref()

function onVisibleChanged(e: { value: boolean }) {
  emit('update:modelValue', e.value)
}

function getInstance() {
  return dxRef.value?.instance
}

defineExpose({ getInstance })
</script>

<style scoped>
.df-action-sheet {
  display: contents;
}
</style>
