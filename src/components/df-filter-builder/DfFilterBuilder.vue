<template>
  <div class="df-filter-builder">
    <DxFilterBuilder
      ref="filterRef"
      :fields="fields"
      :value="(modelValue as any)"
      :max-group-level="maxGroupLevel"
      :allow-hierarchy-fields="allowHierarchyFields ?? false"
      @value-changed="onValueChanged"
    >
      <DxCustomOperation
        v-for="op in customOperations"
        :key="op.name"
        :name="op.name"
        :caption="op.caption"
        :data-types="(op.dataTypes as any)"
        :has-value="op.hasValue ?? true"
        :icon="op.icon"
        :calculate-filter-expression="op.calculateFilterExpression"
      />
    </DxFilterBuilder>
  </div>
</template>

<script setup lang="ts">
import { ref, type PropType } from 'vue'
import { DxFilterBuilder, DxCustomOperation } from 'devextreme-vue/filter-builder'
import type { DfFilterField, DfFilterValue } from './types'

interface CustomOperation {
  name: string
  caption: string
  dataTypes?: string[]
  hasValue?: boolean
  icon?: string
  calculateFilterExpression?: (filterValue: any, field: any) => any[]
}

defineProps({
  modelValue: { type: [Array, null] as PropType<DfFilterValue>, default: null },
  fields: { type: Array as PropType<DfFilterField[]>, required: true },
  maxGroupLevel: { type: Number, default: undefined },
  allowHierarchyFields: { type: Boolean, default: false },
  customOperations: { type: Array as PropType<CustomOperation[]>, default: () => [] },
})

const emit = defineEmits<{
  'update:modelValue': [value: DfFilterValue]
  change: [value: DfFilterValue]
}>()

const filterRef = ref()

function onValueChanged(e: any) {
  emit('update:modelValue', e.value as DfFilterValue)
  emit('change', e.value as DfFilterValue)
}

function getInstance() {
  return filterRef.value?.instance
}

function getFilterExpression(): any[] | null {
  return getInstance()?.getFilterExpression() ?? null
}

defineExpose({ getInstance, getFilterExpression })
</script>

<style scoped>
.df-filter-builder {
  padding: var(--df-spacing-sm);
}
</style>
