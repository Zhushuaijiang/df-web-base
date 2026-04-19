<template>
  <div class="df-tag-select" :class="{ 'df-tag-select--disabled': disabled, [`df-tag-select--${size}`]: size }">
    <DxTagBox
      ref="dxRef"
      :value="modelValue"
      :data-source="dataSource"
      :display-expr="displayExpr"
      :value-expr="valueExpr"
      :placeholder="placeholder"
      :disabled="disabled"
      :read-only="readonly"
      :show-clear-button="clearable"
      :search-enabled="filterable"
      :max-displayed-tags="collapseTags ? maxDisplayedTags : undefined"
      :show-multi-tag-only="collapseTags"
      :show-selection-controls="showCheckAll"
      :apply-value-mode="applyMode"
      :accept-custom-value="allowCreate"
      :max-filter-query-length="500"
      :open-on-field-click="true"
      :show-drop-down-button="true"
      :width="width"
      :height="height"
      @value-changed="onValueChanged"
      @selection-changed="onSelectionChanged"
      @custom-item-creating="onCustomItem"
      @opened="$emit('visible-change', true)"
      @closed="$emit('visible-change', false)"
    >
      <template v-if="$slots.item" #item="{ data }">
        <slot name="item" :item="data" />
      </template>
      <template v-if="$slots.tag" #tag="{ data }">
        <slot name="tag" :item="data" />
      </template>
    </DxTagBox>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DxTagBox } from 'devextreme-vue/tag-box'

const props = withDefaults(defineProps<{
  modelValue?: Array<string | number>
  dataSource?: any[] | object
  displayExpr?: string
  valueExpr?: string
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  clearable?: boolean
  filterable?: boolean
  allowCreate?: boolean
  collapseTags?: boolean
  maxDisplayedTags?: number
  showCheckAll?: boolean
  size?: 'large' | 'default' | 'small'
  width?: string | number
  height?: string | number
  applyMode?: 'instantly' | 'useButtons'
}>(), {
  modelValue: () => [],
  dataSource: () => [],
  displayExpr: 'label',
  valueExpr: 'value',
  placeholder: '请选择',
  disabled: false,
  readonly: false,
  clearable: true,
  filterable: true,
  allowCreate: false,
  collapseTags: false,
  maxDisplayedTags: 1,
  showCheckAll: false,
  size: 'default',
  applyMode: 'instantly',
})

const emit = defineEmits<{
  'update:modelValue': [val: Array<string | number>]
  change: [val: Array<string | number>]
  'remove-tag': [val: string | number]
  'visible-change': [visible: boolean]
}>()

defineOptions({ name: 'DfTagSelect' })

const dxRef = ref()

function onValueChanged(e: any) {
  const val: Array<string | number> = e.value ?? []
  const prev: Array<string | number> = e.previousValue ?? []
  emit('update:modelValue', val)
  emit('change', val)

  // Detect removed tags
  const removed = prev.filter(v => !val.includes(v))
  for (const r of removed) {
    emit('remove-tag', r)
  }
}

function onSelectionChanged(_e: any) {
  // selection-changed fires alongside value-changed; handled above
}

function onCustomItem(e: any) {
  if (!props.allowCreate) return
  const text = e.text?.trim()
  if (!text) return
  e.customItem = { [props.displayExpr]: text, [props.valueExpr]: text }
}

function focus() { dxRef.value?.instance?.focus() }
function blur() { dxRef.value?.instance?.blur() }

defineExpose({ focus, blur, dxRef })
</script>

<style scoped>
.df-tag-select { display: inline-flex; width: 100%; }
.df-tag-select--disabled { opacity: .6; pointer-events: none; }
.df-tag-select--small :deep(.dx-texteditor) { font-size: 12px; }
.df-tag-select--small :deep(.dx-texteditor-input) { height: 28px; }
.df-tag-select--small :deep(.dx-texteditor-container) { min-height: 28px; }
.df-tag-select--small :deep(.dx-tag) { font-size: 12px; padding: 0 6px; height: 20px; }
.df-tag-select--large :deep(.dx-texteditor) { font-size: 16px; }
.df-tag-select--large :deep(.dx-texteditor-input) { height: 40px; }
.df-tag-select--large :deep(.dx-texteditor-container) { min-height: 40px; }
.df-tag-select--large :deep(.dx-tag) { font-size: 14px; padding: 2px 10px; }

:deep(.dx-tag) {
  background: var(--df-color-primary-light, #ecf5ff);
  color: var(--df-color-primary, #409eff);
  border: 1px solid var(--df-color-primary-light, #d9ecff);
  border-radius: 4px;
}

:deep(.dx-tag-remove-button::before) {
  color: var(--df-color-primary, #409eff);
}
</style>
