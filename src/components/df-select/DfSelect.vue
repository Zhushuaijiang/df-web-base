<template>
  <DxSelectBox
    v-bind="selectOptions"
    :value="modelValue"
    aria-haspopup="listbox"
    @value-changed="onValueChanged"
  />
</template>

<script setup lang="ts">
import { inject, computed, ref, watch } from 'vue'
import { DxSelectBox } from 'devextreme-vue/select-box'
import { DF_UI_KEY } from '../../install'
import type { DictItem } from '../../types/plugin'
import type { DfSelectProps } from './types'
import type { DxValueChangedEvent } from '../../types/devextreme'

const props = defineProps<DfSelectProps>()

const emit = defineEmits<{
  'update:modelValue': [value: string | number | null]
}>()

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

const effectiveDataSource = computed(() =>
  props.dataSource ?? dictItems.value
)

const selectOptions = computed(() => ({
  dataSource: effectiveDataSource.value,
  displayExpr: props.displayExpr ?? 'label',
  valueExpr: props.valueExpr ?? 'value',
  searchEnabled: props.searchEnabled ?? true,
  showClearButton: props.showClearButton ?? true,
  placeholder: props.placeholder ?? '请选择',
  disabled: props.disabled ?? false,
}))

function onValueChanged(e: DxValueChangedEvent) {
  emit('update:modelValue', e.value as string | number | null)
}
</script>
