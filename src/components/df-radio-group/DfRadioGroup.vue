<template>
  <div class="df-radio-group" :class="{ 'df-radio-group--disabled': disabled, [`df-radio-group--${size}`]: size }">
    <DxRadioGroup
      ref="dxRef"
      :value="modelValue"
      :data-source="dataSource ?? (dictItems.length ? dictItems : undefined)"
      :items="items ?? (dictItems.length ? undefined : undefined)"
      :value-expr="valueExpr ?? 'value'"
      :display-expr="displayExpr ?? 'label'"
      :layout="layout"
      :disabled="disabled"
      :access-key="accessKey"
      @value-changed="onValueChanged"
    />
  </div>
</template>

<script setup lang="ts">
import { inject, ref, watch } from 'vue'
import { DxRadioGroup } from 'devextreme-vue/radio-group'
import { DF_UI_KEY } from '../../install'
import type { DictItem } from '../../types/plugin'

defineOptions({ name: 'DfRadioGroup' })

const props = withDefaults(defineProps<{
  modelValue?: any
  /** 字典编码（与 dataSource / items 二选一） */
  dictCode?: string
  /** 自定义数据源 */
  dataSource?: any[] | Record<string, any>
  /** 静态数据项 */
  items?: DictItem[]
  valueExpr?: string
  displayExpr?: string | ((data: any) => string)
  layout?: 'horizontal' | 'vertical'
  disabled?: boolean
  size?: 'large' | 'default' | 'small'
  accessKey?: string
}>(), {
  layout: 'vertical',
  disabled: false,
  size: 'default',
})

const emit = defineEmits<{
  'update:modelValue': [val: any]
  change: [val: any]
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
.df-radio-group :deep(.dx-radiogroup) {
  font-size: var(--df-font-size, 14px);
}
.df-radio-group--small :deep(.dx-radiogroup) {
  font-size: 12px;
}
.df-radio-group--large :deep(.dx-radiogroup) {
  font-size: 16px;
}
</style>
