<template>
  <ul class="df-menu" :class="classes" role="menubar">
    <slot />
  </ul>
</template>

<script setup lang="ts">
import { provide, ref, computed, watch } from 'vue'

export type MenuMode = 'horizontal' | 'vertical'

const props = withDefaults(defineProps<{
  mode?: MenuMode
  defaultActive?: string
  collapse?: boolean
  backgroundColor?: string
  textColor?: string
  activeTextColor?: string
  uniqueOpened?: boolean
  router?: boolean
}>(), {
  mode: 'vertical',
  defaultActive: '',
  collapse: false,
  backgroundColor: '',
  textColor: '',
  activeTextColor: '',
  uniqueOpened: false,
  router: false,
})

const emit = defineEmits<{
  select: [index: string, indexPath: string[]]
  open: [index: string, indexPath: string[]]
  close: [index: string, indexPath: string[]]
}>()

defineOptions({ name: 'DfMenu' })

const activeIndex = ref(props.defaultActive)
const openedMenus = ref<string[]>([])

watch(() => props.defaultActive, v => { activeIndex.value = v })

const classes = computed(() => [
  `df-menu--${props.mode}`,
  { 'df-menu--collapse': props.collapse },
])

function handleSelect(index: string, indexPath: string[]) {
  activeIndex.value = index
  emit('select', index, indexPath)
}

function handleOpen(index: string, indexPath: string[]) {
  if (props.uniqueOpened) {
    openedMenus.value = openedMenus.value.filter(i => indexPath.includes(i))
  }
  if (!openedMenus.value.includes(index)) {
    openedMenus.value = [...openedMenus.value, index]
  }
  emit('open', index, indexPath)
}

function handleClose(index: string, indexPath: string[]) {
  openedMenus.value = openedMenus.value.filter(i => i !== index)
  emit('close', index, indexPath)
}

provide('dfMenu', {
  props,
  activeIndex,
  openedMenus,
  handleSelect,
  handleOpen,
  handleClose,
})

defineExpose({ activeIndex, openedMenus })
</script>

<style scoped>
.df-menu {
  list-style: none; margin: 0; padding: 0;
  background: v-bind('props.backgroundColor || "#fff"');
  color: v-bind('props.textColor || "#303133"');
  font-size: 14px;
}

.df-menu--horizontal {
  display: flex; align-items: center;
  border-bottom: 1px solid #e6e6e6;
}

.df-menu--vertical {
  display: flex; flex-direction: column;
  border-right: 1px solid #e6e6e6;
}

.df-menu--collapse { width: 56px; }
</style>
