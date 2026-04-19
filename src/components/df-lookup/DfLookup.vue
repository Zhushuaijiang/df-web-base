<template>
  <div class="df-lookup" :class="{ 'df-lookup--disabled': disabled, [`df-lookup--${size}`]: size }">
    <DxLookup
      ref="dxRef"
      :value="modelValue"
      :data-source="dataSource ?? (dictItems.length ? dictItems : undefined)"
      :items="items ?? (dictItems.length ? undefined : undefined)"
      :value-expr="valueExpr ?? 'value'"
      :display-expr="displayExpr ?? 'label'"
      :search-enabled="searchEnabled"
      :search-mode="(searchMode as any)"
      :search-expr="searchExpr"
      :search-timeout="searchTimeout"
      :min-search-length="minSearchLength"
      :page-size="pageSize"
      :show-popup-title="showPopupTitle"
      :title="title"
      :placeholder="placeholder"
      :disabled="disabled"
      :read-only="readonly"
      :width="width"
      @value-changed="onValueChanged"
    />
  </div>
</template>

<script setup lang="ts">
import { inject, ref, watch } from 'vue'
import { DxLookup } from 'devextreme-vue/lookup'
import { DF_UI_KEY } from '../../install'
import type { DictItem } from '../../types/plugin'

defineOptions({ name: 'DfLookup' })

const props = withDefaults(defineProps<{
  modelValue?: any
  /** 字典编码（与 dataSource / items 二选一） */
  dictCode?: string
  dataSource?: any[] | Record<string, any>
  items?: any[]
  valueExpr?: string
  displayExpr?: string | ((data: any) => string)
  searchEnabled?: boolean
  searchMode?: string
  searchExpr?: string | string[]
  searchTimeout?: number
  minSearchLength?: number
  pageSize?: number | false
  showPopupTitle?: boolean
  title?: string
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  width?: number | string
  size?: 'large' | 'default' | 'small'
}>(), {
  searchEnabled: true,
  searchMode: 'contains',
  searchTimeout: 500,
  minSearchLength: 0,
  pageSize: false,
  showPopupTitle: false,
  placeholder: 'Select...',
  disabled: false,
  readonly: false,
  size: 'default',
})

const dfui = inject(DF_UI_KEY)
const dictItems = ref<DictItem[]>([])

// 如果指定了 dictCode，自动加载字典数据
if (props.dictCode && dfui) {
  dfui.dict.resolve(props.dictCode).then((items) => {
    dictItems.value = items
  })
}

// 响应 dictCode 变化
watch(() => props.dictCode, async (newCode) => {
  if (newCode && dfui) {
    dictItems.value = await dfui.dict.resolve(newCode)
  } else {
    dictItems.value = []
  }
})

const emit = defineEmits<{
  'update:modelValue': [val: any]
  change: [val: any]
}>()

const dxRef = ref()

function onValueChanged(e: any) {
  emit('update:modelValue', e.value)
  emit('change', e.value)
}

function getInstance() {
  return dxRef.value?.instance
}

defineExpose({ getInstance })
</script>

<style scoped>
.df-lookup :deep(.dx-lookup) {
  border: 1px solid var(--df-color-border, #d9d9d9);
  border-radius: var(--df-radius-base, 4px);
}
.df-lookup--disabled {
  opacity: 0.6;
  pointer-events: none;
}
</style>
