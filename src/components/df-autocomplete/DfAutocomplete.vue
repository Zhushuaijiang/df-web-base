<template>
  <div class="df-autocomplete" :class="{ 'df-autocomplete--disabled': disabled, [`df-autocomplete--${size}`]: size }">
    <DxAutocomplete
      ref="dxRef"
      :value="modelValue"
      :data-source="dataSource"
      :min-search-length="minLength"
      :placeholder="placeholder"
      :disabled="disabled"
      :read-only="readonly"
      :show-clear-button="clearable"
      :search-timeout="debounce"
      :value-expr="valueExpr"
      :search-expr="searchExpr"
      :max-item-count="maxCount"
      :opened="opened"
      :width="width"
      @value-changed="onValueChanged"
      @item-click="onSelect"
      @input="onInput"
      @focus-in="onFocus"
      @focus-out="onBlur"
      @opened="opened = true"
      @closed="opened = false"
    >
      <template v-if="$slots.item" #item="{ data }">
        <slot name="item" :item="data" />
      </template>
      <template v-if="$slots.prefix" #dropDownButton>
        <slot name="prefix" />
      </template>
    </DxAutocomplete>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DxAutocomplete } from 'devextreme-vue/autocomplete'

const props = withDefaults(defineProps<{
  modelValue?: string
  fetchSuggestions?: (query: string, cb: (results: any[]) => void) => void
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  clearable?: boolean
  size?: 'large' | 'default' | 'small'
  debounce?: number
  minLength?: number
  valueExpr?: string
  searchExpr?: string | string[]
  maxCount?: number
  triggerOnFocus?: boolean
  width?: string | number
}>(), {
  modelValue: '',
  placeholder: '请输入',
  disabled: false,
  readonly: false,
  clearable: true,
  size: 'default',
  debounce: 300,
  minLength: 1,
  valueExpr: 'value',
  searchExpr: 'value',
  maxCount: 10,
  triggerOnFocus: true,
})

const emit = defineEmits<{
  'update:modelValue': [val: string]
  select: [item: any]
  input: [val: string]
  focus: [e: Event]
  blur: [e: Event]
  change: [val: string]
}>()

defineOptions({ name: 'DfAutocomplete' })

const dxRef = ref()
const opened = ref(false)
const dataSource = ref<any[]>([])

// Handle fetchSuggestions callback pattern
function loadSuggestions(query: string) {
  if (props.fetchSuggestions) {
    props.fetchSuggestions(query, (results) => {
      dataSource.value = results
    })
  }
}

function onValueChanged(e: any) {
  const val: string = e.value ?? ''
  emit('update:modelValue', val)
  emit('change', val)
  if (val && val.length >= props.minLength) {
    loadSuggestions(val)
  }
}

function onSelect(e: any) {
  emit('select', e.itemData)
}

function onInput(e: any) {
  const val = e.event?.target?.value ?? ''
  emit('input', val)
}

function onFocus(e: any) {
  emit('focus', e.event)
  if (props.triggerOnFocus && props.modelValue) {
    loadSuggestions(props.modelValue)
  }
}

function onBlur(e: any) { emit('blur', e.event) }

function focus() { dxRef.value?.instance?.focus() }

defineExpose({ focus, dxRef })
</script>

<style scoped>
.df-autocomplete { display: inline-flex; width: 100%; }
.df-autocomplete--disabled { opacity: .6; pointer-events: none; }
.df-autocomplete--small :deep(.dx-texteditor-input) { height: 28px; font-size: 12px; }
.df-autocomplete--small :deep(.dx-texteditor-container) { height: 28px; }
.df-autocomplete--large :deep(.dx-texteditor-input) { height: 40px; font-size: 16px; }
.df-autocomplete--large :deep(.dx-texteditor-container) { height: 40px; }
</style>
