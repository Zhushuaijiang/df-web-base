<template>
  <div v-if="false" />
</template>

<script setup lang="ts">
import { inject, onMounted, onBeforeUnmount, watch } from 'vue'

const props = withDefaults(defineProps<{
  label?: string
  name: string | number
  icon?: string
  closable?: boolean
  disabled?: boolean
  lazy?: boolean
}>(), {
  label: '',
  disabled: false,
  closable: false,
  lazy: false,
})

defineOptions({ name: 'DfTabPane' })

const slots = defineSlots<{ default?: () => any }>()

const parent = inject<{
  addPane: (p: any) => void
  removePane: (n: string | number) => void
}>('dfTabs')!

function buildPane() {
  return {
    name: props.name,
    label: props.label,
    icon: props.icon,
    closable: props.closable,
    disabled: props.disabled,
    lazy: props.lazy,
    component: slots.default ? { render: () => slots.default!() } : undefined,
  }
}

onMounted(() => parent.addPane(buildPane()))
watch(() => [props.label, props.name, props.icon, props.closable, props.disabled], () => parent.addPane(buildPane()))
onBeforeUnmount(() => parent.removePane(props.name))
</script>
