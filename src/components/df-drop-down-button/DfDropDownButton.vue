<template>
  <div class="df-drop-down-button" :class="{ [`df-drop-down-button--${size}`]: size }">
    <DxDropDownButton
      ref="dxRef"
      :data-source="dataSource ?? (dictItems.length ? dictItems : undefined)"
      :items="items ?? (dictItems.length ? undefined : undefined)"
      :text="text"
      :icon="icon"
      :type="type"
      :styling-mode="stylingMode"
      :split-button="splitButton"
      :display-expr="displayExpr ?? 'label'"
      :key-expr="keyExpr ?? 'value'"
      :selected-item-key="selectedItemKey"
      :use-select-mode="useSelectMode"
      :show-arrow-icon="showArrowIcon"
      :disabled="disabled"
      :drop-down-options="dropDownOptions"
      @item-click="$emit('item-click', $event)"
      @selection-changed="$emit('selection-changed', $event)"
      @button-click="$emit('button-click', $event)"
    >
      <template #item="{ data }">
        <slot name="item" :data="data" />
      </template>
    </DxDropDownButton>
  </div>
</template>

<script setup lang="ts">
import { inject, ref, watch } from 'vue'
import { DxDropDownButton } from 'devextreme-vue/drop-down-button'
import { DF_UI_KEY } from '../../install'
import type { DictItem } from '../../types/plugin'

defineOptions({ name: 'DfDropDownButton' })

const props = withDefaults(defineProps<{
  /** 字典编码（与 dataSource / items 二选一） */
  dictCode?: string
  dataSource?: any[] | Record<string, any>
  items?: DictItem[]
  text?: string
  icon?: string
  type?: 'back' | 'danger' | 'default' | 'normal' | 'success'
  stylingMode?: 'contained' | 'outlined' | 'text'
  splitButton?: boolean
  displayExpr?: string | ((data: any) => string)
  keyExpr?: string
  selectedItemKey?: any
  useSelectMode?: boolean
  showArrowIcon?: boolean
  disabled?: boolean
  dropDownOptions?: Record<string, any>
  size?: 'large' | 'default' | 'small'
}>(), {
  splitButton: false,
  showArrowIcon: true,
  disabled: false,
  useSelectMode: false,
  type: 'normal',
  stylingMode: 'contained',
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

defineEmits<{
  'item-click': [e: any]
  'selection-changed': [e: any]
  'button-click': [e: any]
}>()

const dxRef = ref()

function getInstance() {
  return dxRef.value?.instance
}

defineExpose({ getInstance })
</script>

<style scoped>
.df-drop-down-button {
  display: inline-block;
}
</style>
