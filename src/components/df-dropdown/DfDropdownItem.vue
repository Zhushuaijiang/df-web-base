<template>
  <li class="df-dropdown-item" :class="{ 'is-disabled': disabled, 'is-divided': divided }" @click="handleClick">
    <i v-if="icon" :class="icon" class="df-dropdown-item__icon" />
    <slot />
  </li>
</template>

<script setup lang="ts">
import { inject } from 'vue'

const props = defineProps<{
  command?: string | number | object
  disabled?: boolean
  divided?: boolean
  icon?: string
}>()

defineOptions({ name: 'DfDropdownItem' })

const parent = inject<{ handleCommand: (cmd: any) => void }>('dfDropdown')

function handleClick() {
  if (props.disabled) return
  if (parent && props.command !== undefined) parent.handleCommand(props.command)
}
</script>

<style scoped>
.df-dropdown-item { list-style: none; padding: 5px 16px; cursor: pointer; font-size: var(--df-font-size, 14px); color: var(--df-color-text-primary, #303133); white-space: nowrap; display: flex; align-items: center; gap: 6px; }
.df-dropdown-item:hover { background: #ecf5ff; color: var(--df-color-primary, #409eff); }
.df-dropdown-item.is-disabled { color: #bbb; cursor: not-allowed; }
.df-dropdown-item.is-disabled:hover { background: transparent; color: #bbb; }
.df-dropdown-item.is-divided { border-top: 1px solid var(--df-color-border-light, #e4e7ed); margin-top: 4px; padding-top: 9px; }
.df-dropdown-item__icon { font-size: 14px; }
</style>
