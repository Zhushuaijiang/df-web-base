<template>
  <div class="df-tabs">
    <DxTabPanel
      ref="tabPanelRef"
      :items="tabItems"
      :selected-index="activeIndex"
      :swipe-enabled="false"
      :animation-enabled="animated"
      :loop="false"
      item-title-template="titleTemplate"
      item-template="contentTemplate"
      @selection-changed="onSelectionChanged"
    >
      <template #titleTemplate="{ data }">
        <div class="df-tabs__title" :class="{ 'is-closable': data.closable }">
          <i v-if="data.icon" :class="data.icon" class="df-tabs__icon" />
          <span>{{ data.label }}</span>
          <i v-if="data.closable" class="dx-icon-close df-tabs__close" @click.stop="handleRemove(data.name)" />
        </div>
      </template>
      <template #contentTemplate="{ data }">
        <div class="df-tabs__content">
          <component :is="data.component" v-if="data.component" />
          <template v-else>{{ data.content }}</template>
        </div>
      </template>
    </DxTabPanel>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, provide, reactive } from 'vue'
import { DxTabPanel } from 'devextreme-vue/tab-panel'
import type { Component } from 'vue'

export interface TabItem {
  name: string | number
  label: string
  icon?: string
  closable?: boolean
  disabled?: boolean
  lazy?: boolean
  component?: Component
  content?: string
}

const props = withDefaults(defineProps<{
  modelValue?: string | number
  type?: '' | 'card' | 'border-card'
  closable?: boolean
  addable?: boolean
  animated?: boolean
  beforeLeave?: (newName: string | number, oldName: string | number) => boolean | Promise<boolean>
}>(), {
  type: '',
  closable: false,
  addable: false,
  animated: true,
})

const emit = defineEmits<{
  'update:modelValue': [val: string | number]
  'tab-click': [tab: TabItem, e: Event]
  'tab-remove': [name: string | number]
  'tab-add': []
}>()

defineOptions({ name: 'DfTabs' })

const panes = reactive<TabItem[]>([])

const tabItems = computed(() => panes.map(p => ({
  name: p.name,
  label: p.label,
  icon: p.icon,
  closable: props.closable || p.closable,
  disabled: p.disabled,
  component: p.component,
  content: p.content,
})))

const activeIndex = computed(() => {
  const idx = panes.findIndex(p => p.name === props.modelValue)
  return idx >= 0 ? idx : 0
})

async function onSelectionChanged(e: { addedItems?: unknown[]; removedItems?: unknown[] }) {
  const idx = (e as any).component?.option?.('selectedIndex') ?? 0
  const pane = panes[idx]
  if (!pane) return
  if (props.beforeLeave) {
    const allow = await props.beforeLeave(pane.name, props.modelValue ?? '')
    if (!allow) return
  }
  emit('update:modelValue', pane.name)
}

function handleRemove(name: string | number) { emit('tab-remove', name) }

function addPane(pane: TabItem) {
  const idx = panes.findIndex(p => p.name === pane.name)
  if (idx === -1) panes.push(pane)
  else panes.splice(idx, 1, pane)
}

function removePane(name: string | number) {
  const idx = panes.findIndex(p => p.name === name)
  if (idx > -1) panes.splice(idx, 1)
}

provide('dfTabs', { addPane, removePane, props })

const tabPanelRef = ref()
</script>

<style scoped>
.df-tabs { width: 100%; }
.df-tabs__title { display: inline-flex; align-items: center; gap: 4px; padding: 0 4px; }
.df-tabs__icon { font-size: 14px; }
.df-tabs__close { font-size: 12px; border-radius: 50%; margin-left: 2px; cursor: pointer; }
.df-tabs__close:hover { background: var(--df-color-text-disabled, #c0c4cc); color: #fff; }
.df-tabs__content { padding: 12px 0; min-height: 40px; }
</style>
