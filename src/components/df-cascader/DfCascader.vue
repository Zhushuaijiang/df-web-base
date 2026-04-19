<template>
  <div class="df-cascader" :class="{ 'df-cascader--disabled': disabled, [`df-cascader--${size}`]: size }">
    <DxDropDownBox
      ref="dropDownRef"
      :value="displayText"
      :disabled="disabled"
      :read-only="readonly"
      :placeholder="placeholder"
      :show-clear-button="clearable"
      :width="width"
      :opened="opened"
      @opened="opened = true"
      @closed="opened = false"
    >
      <template #content>
        <div class="df-cascader__panels">
          <ul v-for="(col, level) in columns" :key="level" class="df-cascader__panel">
            <li
              v-for="item in col"
              :key="item[valueKey]"
              class="df-cascader__node"
              :class="{ 'is-active': isActive(item, level), 'is-disabled': item.disabled }"
              @click="handleSelect(item, level)"
            >
              <span>{{ item[labelKey] }}</span>
              <i v-if="item[childrenKey]?.length" class="dx-icon-chevronright df-cascader__arrow" />
            </li>
          </ul>
        </div>
      </template>
    </DxDropDownBox>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { DxDropDownBox } from 'devextreme-vue/drop-down-box'

const props = withDefaults(defineProps<{
  modelValue?: Array<string | number>
  options?: any[]
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  clearable?: boolean
  filterable?: boolean
  showAllLevels?: boolean
  collapseTags?: boolean
  separator?: string
  size?: 'large' | 'default' | 'small'
  width?: string | number
  props?: { value?: string; label?: string; children?: string; multiple?: boolean; checkStrictly?: boolean; emitPath?: boolean }
}>(), {
  modelValue: () => [],
  options: () => [],
  placeholder: '请选择',
  disabled: false,
  readonly: false,
  clearable: true,
  filterable: false,
  showAllLevels: true,
  collapseTags: false,
  separator: ' / ',
  size: 'default',
})

const emit = defineEmits<{
  'update:modelValue': [val: Array<string | number>]
  change: [val: Array<string | number>]
}>()

defineOptions({ name: 'DfCascader' })

const valueKey = computed(() => props.props?.value ?? 'value')
const labelKey = computed(() => props.props?.label ?? 'label')
const childrenKey = computed(() => props.props?.children ?? 'children')

const opened = ref(false)
const dropDownRef = ref()
const activePath = ref<any[]>([])

const columns = computed(() => {
  const cols: any[][] = [props.options]
  for (const item of activePath.value) {
    const children = item[childrenKey.value]
    if (children?.length) cols.push(children)
    else break
  }
  return cols
})

const displayText = computed(() => {
  if (!activePath.value.length) return ''
  const labels = activePath.value.map(i => i[labelKey.value])
  return props.showAllLevels ? labels.join(props.separator) : labels[labels.length - 1]
})

function isActive(item: any, level: number) {
  return activePath.value[level]?.[valueKey.value] === item[valueKey.value]
}

function handleSelect(item: any, level: number) {
  if (item.disabled) return
  // Update active path
  const newPath = [...activePath.value.slice(0, level), item]
  activePath.value = newPath

  const hasChildren = item[childrenKey.value]?.length
  if (!hasChildren) {
    // Leaf node: emit value and close
    const val = newPath.map(i => i[valueKey.value])
    emit('update:modelValue', val)
    emit('change', val)
    opened.value = false
  }
}

// Initialize active path from modelValue
watch(() => props.modelValue, (val) => {
  if (!val?.length) { activePath.value = []; return }
  const path: any[] = []
  let current = props.options
  for (const v of val) {
    const found = current.find((i: any) => i[valueKey.value] === v)
    if (!found) break
    path.push(found)
    current = found[childrenKey.value] ?? []
  }
  activePath.value = path
}, { immediate: true })

defineExpose({ dropDownRef })
</script>

<style scoped>
.df-cascader { display: inline-flex; }
.df-cascader--disabled { opacity: 0.6; pointer-events: none; }
.df-cascader__panels { display: flex; max-height: 280px; }
.df-cascader__panel { list-style: none; margin: 0; padding: 4px 0; min-width: 160px; max-height: 280px; overflow-y: auto; border-right: 1px solid var(--df-color-border-light, #e4e7ed); }
.df-cascader__panel:last-child { border-right: none; }
.df-cascader__node { display: flex; align-items: center; justify-content: space-between; padding: 8px 12px; font-size: 14px; cursor: pointer; }
.df-cascader__node:hover { background: var(--df-color-bg-secondary, #f5f7fa); }
.df-cascader__node.is-active { color: var(--df-color-primary, #409eff); font-weight: 700; }
.df-cascader__node.is-disabled { color: var(--df-color-text-disabled, #c0c4cc); cursor: not-allowed; }
.df-cascader__arrow { font-size: 12px; color: var(--df-color-text-disabled, #c0c4cc); }
</style>
