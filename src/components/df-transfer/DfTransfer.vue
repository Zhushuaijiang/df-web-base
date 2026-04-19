<template>
  <div class="df-transfer">
    <!-- Left panel -->
    <div class="df-transfer__panel">
      <div class="df-transfer__header">
        <label class="df-transfer__header-label"><DxCheckBox :value="leftAllChecked" :element-attr="{ class: 'df-transfer__header-check' }" @value-changed="toggleLeftAll" /> {{ titles[0] || '列表 1' }}</label>
        <span class="df-transfer__count">{{ leftChecked.length }}/{{ leftData.length }}</span>
      </div>
      <div v-if="filterable" class="df-transfer__filter">
        <DxTextBox :value="leftFilter" value-change-event="input" :placeholder="filterPlaceholder" @value-changed="onLeftFilterChange" />
      </div>
      <ul class="df-transfer__list">
        <li v-for="item in filteredLeftData" :key="item[keyProp]" class="df-transfer__item" :class="{ 'is-disabled': item[disabledProp] }">
          <label><DxCheckBox :value="leftChecked.includes(item[keyProp])" :disabled="item[disabledProp]" @value-changed="onLeftItemCheck(item[keyProp], $event)" /> {{ item[labelProp] }}</label>
        </li>
        <li v-if="!filteredLeftData.length" class="df-transfer__empty">无数据</li>
      </ul>
    </div>
    <!-- Buttons -->
    <div class="df-transfer__buttons">
      <DxButton icon="chevronright" :disabled="!leftChecked.length" @click="moveToRight" />
      <DxButton icon="chevronleft" :disabled="!rightChecked.length" @click="moveToLeft" />
    </div>
    <!-- Right panel -->
    <div class="df-transfer__panel">
      <div class="df-transfer__header">
        <label class="df-transfer__header-label"><DxCheckBox :value="rightAllChecked" :element-attr="{ class: 'df-transfer__header-check' }" @value-changed="toggleRightAll" /> {{ titles[1] || '列表 2' }}</label>
        <span class="df-transfer__count">{{ rightChecked.length }}/{{ rightData.length }}</span>
      </div>
      <div v-if="filterable" class="df-transfer__filter">
        <DxTextBox :value="rightFilter" value-change-event="input" :placeholder="filterPlaceholder" @value-changed="onRightFilterChange" />
      </div>
      <ul class="df-transfer__list">
        <li v-for="item in filteredRightData" :key="item[keyProp]" class="df-transfer__item" :class="{ 'is-disabled': item[disabledProp] }">
          <label><DxCheckBox :value="rightChecked.includes(item[keyProp])" :disabled="item[disabledProp]" @value-changed="onRightItemCheck(item[keyProp], $event)" /> {{ item[labelProp] }}</label>
        </li>
        <li v-if="!filteredRightData.length" class="df-transfer__empty">无数据</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { DxButton } from 'devextreme-vue/button'
import { DxTextBox } from 'devextreme-vue/text-box'
import { DxCheckBox } from 'devextreme-vue/check-box'

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

function onLeftFilterChange(e: { value?: string }) {
  leftFilter.value = e.value ?? ''
}
function onRightFilterChange(e: { value?: string }) {
  rightFilter.value = e.value ?? ''
}

function onLeftItemCheck(key: string | number, e: { value?: boolean }) {
  if (e.value) {
    leftChecked.value = [...leftChecked.value, key]
  } else {
    leftChecked.value = leftChecked.value.filter(k => k !== key)
  }
}
function onRightItemCheck(key: string | number, e: { value?: boolean }) {
  if (e.value) {
    rightChecked.value = [...rightChecked.value, key]
  } else {
    rightChecked.value = rightChecked.value.filter(k => k !== key)
  }
}

watch(leftChecked, v => emit('left-check-change', v))
watch(rightChecked, v => emit('right-check-change', v))
</script>

<style scoped>
.df-transfer { display: inline-flex; align-items: center; gap: 12px; }
.df-transfer__panel { width: 200px; border: 1px solid var(--df-color-border, #e4e7ed); border-radius: 4px; overflow: hidden; }
.df-transfer__header { display: flex; justify-content: space-between; align-items: center; padding: 8px 12px; background: var(--df-color-bg-secondary, #f5f7fa); font-size: var(--df-font-size-md, 14px); border-bottom: 1px solid var(--df-color-border, #e4e7ed); }
.df-transfer__header-label { display: flex; align-items: center; gap: 6px; cursor: pointer; }
.df-transfer__count { font-size: 12px; color: var(--df-color-text-secondary, #909399); }
.df-transfer__filter { padding: 8px; }
.df-transfer__list { list-style: none; margin: 0; padding: 4px 0; max-height: 240px; overflow-y: auto; }
.df-transfer__item { padding: 4px 12px; font-size: 14px; cursor: pointer; }
.df-transfer__item:hover { background: var(--df-color-bg-secondary, #f5f7fa); }
.df-transfer__item.is-disabled { color: var(--df-color-text-disabled, #c0c4cc); cursor: not-allowed; }
.df-transfer__item label { display: flex; align-items: center; gap: 6px; cursor: inherit; }
.df-transfer__empty { padding: 20px; text-align: center; color: var(--df-color-text-disabled, #c0c4cc); font-size: var(--df-font-size-md, 14px); }
.df-transfer__buttons { display: flex; flex-direction: column; gap: 8px; }
</style>
