<template>
  <div class="df-transfer">
    <!-- Left panel -->
    <div class="df-transfer__panel">
      <div class="df-transfer__header">
        <label><input type="checkbox" :checked="leftAllChecked" :indeterminate="leftIndeterminate" @change="toggleLeftAll" /> {{ titles[0] || '列表 1' }}</label>
        <span class="df-transfer__count">{{ leftChecked.length }}/{{ leftData.length }}</span>
      </div>
      <div v-if="filterable" class="df-transfer__filter">
        <input v-model="leftFilter" type="text" :placeholder="filterPlaceholder" class="df-transfer__filter-input" />
      </div>
      <ul class="df-transfer__list">
        <li v-for="item in filteredLeftData" :key="item[keyProp]" class="df-transfer__item" :class="{ 'is-disabled': item[disabledProp] }">
          <label><input v-model="leftChecked" type="checkbox" :value="item[keyProp]" :disabled="item[disabledProp]" /> {{ item[labelProp] }}</label>
        </li>
        <li v-if="!filteredLeftData.length" class="df-transfer__empty">无数据</li>
      </ul>
    </div>
    <!-- Buttons -->
    <div class="df-transfer__buttons">
      <button class="df-transfer__btn" :disabled="!leftChecked.length" @click="moveToRight">
        <i class="dx-icon-chevronright" />
      </button>
      <button class="df-transfer__btn" :disabled="!rightChecked.length" @click="moveToLeft">
        <i class="dx-icon-chevronleft" />
      </button>
    </div>
    <!-- Right panel -->
    <div class="df-transfer__panel">
      <div class="df-transfer__header">
        <label><input type="checkbox" :checked="rightAllChecked" :indeterminate="rightIndeterminate" @change="toggleRightAll" /> {{ titles[1] || '列表 2' }}</label>
        <span class="df-transfer__count">{{ rightChecked.length }}/{{ rightData.length }}</span>
      </div>
      <div v-if="filterable" class="df-transfer__filter">
        <input v-model="rightFilter" type="text" :placeholder="filterPlaceholder" class="df-transfer__filter-input" />
      </div>
      <ul class="df-transfer__list">
        <li v-for="item in filteredRightData" :key="item[keyProp]" class="df-transfer__item" :class="{ 'is-disabled': item[disabledProp] }">
          <label><input v-model="rightChecked" type="checkbox" :value="item[keyProp]" :disabled="item[disabledProp]" /> {{ item[labelProp] }}</label>
        </li>
        <li v-if="!filteredRightData.length" class="df-transfer__empty">无数据</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

const props = withDefaults(defineProps<{
  modelValue?: Array<string | number>
  data?: any[]
  titles?: [string, string]
  filterable?: boolean
  filterPlaceholder?: string
  filterMethod?: (query: string, item: any) => boolean
  targetOrder?: 'original' | 'push' | 'unshift'
  props?: { key?: string; label?: string; disabled?: string }
}>(), {
  modelValue: () => [],
  data: () => [],
  titles: () => ['', ''] as [string, string],
  filterable: false,
  filterPlaceholder: '请输入搜索内容',
  targetOrder: 'original',
})

const emit = defineEmits<{
  'update:modelValue': [val: Array<string | number>]
  change: [val: Array<string | number>, direction: 'left' | 'right', movedKeys: Array<string | number>]
  'left-check-change': [checked: Array<string | number>]
  'right-check-change': [checked: Array<string | number>]
}>()

defineOptions({ name: 'DfTransfer' })

const keyProp = computed(() => props.props?.key ?? 'key')
const labelProp = computed(() => props.props?.label ?? 'label')
const disabledProp = computed(() => props.props?.disabled ?? 'disabled')

const leftFilter = ref('')
const rightFilter = ref('')
const leftChecked = ref<Array<string | number>>([])
const rightChecked = ref<Array<string | number>>([])

const rightKeySet = computed(() => new Set(props.modelValue))
const leftData = computed(() => props.data.filter(i => !rightKeySet.value.has(i[keyProp.value])))
const rightData = computed(() => props.data.filter(i => rightKeySet.value.has(i[keyProp.value])))

function filterList(list: any[], query: string) {
  if (!query) return list
  if (props.filterMethod) return list.filter(i => props.filterMethod!(query, i))
  return list.filter(i => String(i[labelProp.value]).includes(query))
}

const filteredLeftData = computed(() => filterList(leftData.value, leftFilter.value))
const filteredRightData = computed(() => filterList(rightData.value, rightFilter.value))

const leftAllChecked = computed(() => leftData.value.length > 0 && leftChecked.value.length === leftData.value.filter(i => !i[disabledProp.value]).length)
const rightAllChecked = computed(() => rightData.value.length > 0 && rightChecked.value.length === rightData.value.filter(i => !i[disabledProp.value]).length)
const leftIndeterminate = computed(() => leftChecked.value.length > 0 && !leftAllChecked.value)
const rightIndeterminate = computed(() => rightChecked.value.length > 0 && !rightAllChecked.value)

function toggleLeftAll() {
  leftChecked.value = leftAllChecked.value ? [] : leftData.value.filter(i => !i[disabledProp.value]).map(i => i[keyProp.value])
}
function toggleRightAll() {
  rightChecked.value = rightAllChecked.value ? [] : rightData.value.filter(i => !i[disabledProp.value]).map(i => i[keyProp.value])
}

function moveToRight() {
  const newVal = [...props.modelValue, ...leftChecked.value]
  emit('update:modelValue', newVal)
  emit('change', newVal, 'right', [...leftChecked.value])
  leftChecked.value = []
}

function moveToLeft() {
  const removeSet = new Set(rightChecked.value)
  const newVal = props.modelValue.filter(k => !removeSet.has(k))
  emit('update:modelValue', newVal)
  emit('change', newVal, 'left', [...rightChecked.value])
  rightChecked.value = []
}

watch(leftChecked, v => emit('left-check-change', v))
watch(rightChecked, v => emit('right-check-change', v))
</script>

<style scoped>
.df-transfer { display: inline-flex; align-items: center; gap: 12px; }
.df-transfer__panel { width: 200px; border: 1px solid var(--df-color-border, #e4e7ed); border-radius: 4px; overflow: hidden; }
.df-transfer__header { display: flex; justify-content: space-between; align-items: center; padding: 8px 12px; background: var(--df-color-bg-secondary, #f5f7fa); font-size: var(--df-font-size-md, 14px); border-bottom: 1px solid var(--df-color-border, #e4e7ed); }
.df-transfer__count { font-size: 12px; color: var(--df-color-text-secondary, #909399); }
.df-transfer__filter { padding: 8px; }
.df-transfer__filter-input { width: 100%; padding: 4px 8px; border: 1px solid var(--df-color-border, #dcdfe6); border-radius: var(--df-radius-sm, 4px); font-size: var(--df-font-size-sm, 13px); box-sizing: border-box; }
.df-transfer__list { list-style: none; margin: 0; padding: 4px 0; max-height: 240px; overflow-y: auto; }
.df-transfer__item { padding: 4px 12px; font-size: 14px; cursor: pointer; }
.df-transfer__item:hover { background: var(--df-color-bg-secondary, #f5f7fa); }
.df-transfer__item.is-disabled { color: var(--df-color-text-disabled, #c0c4cc); cursor: not-allowed; }
.df-transfer__item label { display: flex; align-items: center; gap: 6px; cursor: inherit; }
.df-transfer__empty { padding: 20px; text-align: center; color: var(--df-color-text-disabled, #c0c4cc); font-size: var(--df-font-size-md, 14px); }
.df-transfer__buttons { display: flex; flex-direction: column; gap: 8px; }
.df-transfer__btn { width: 32px; height: 32px; border-radius: 50%; border: 1px solid var(--df-color-border, #dcdfe6); background: var(--df-color-bg-surface, #fff); cursor: pointer; display: flex; align-items: center; justify-content: center; }
.df-transfer__btn:not(:disabled):hover { color: var(--df-color-primary, #409eff); border-color: var(--df-color-primary, #409eff); }
.df-transfer__btn:disabled { color: var(--df-color-text-disabled, #c0c4cc); cursor: not-allowed; }
</style>
