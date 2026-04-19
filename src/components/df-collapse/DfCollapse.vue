<template>
  <div class="df-collapse" role="tablist" aria-multiselectable="true">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { provide, ref, watch } from 'vue'

const props = withDefaults(defineProps<{
  modelValue?: string | number | Array<string | number>
  accordion?: boolean
}>(), { accordion: false })

const emit = defineEmits<{
  'update:modelValue': [val: string | number | Array<string | number>]
  change: [val: string | number | Array<string | number>]
}>()

defineOptions({ name: 'DfCollapse' })

const activeNames = ref<Array<string | number>>(
  Array.isArray(props.modelValue) ? props.modelValue : props.modelValue !== undefined ? [props.modelValue] : [],
)

watch(() => props.modelValue, (v) => {
  activeNames.value = Array.isArray(v) ? v : v !== undefined ? [v] : []
})

function toggle(name: string | number) {
  if (props.accordion) {
    const val = activeNames.value[0] === name ? [] : [name]
    activeNames.value = val
    emit('update:modelValue', val.length ? val[0]! : '')
    emit('change', val.length ? val[0]! : '')
  } else {
    const idx = activeNames.value.indexOf(name)
    const next = idx > -1
      ? [...activeNames.value.slice(0, idx), ...activeNames.value.slice(idx + 1)]
      : [...activeNames.value, name]
    activeNames.value = next
    emit('update:modelValue', next)
    emit('change', next)
  }
}

provide('dfCollapse', { activeNames, toggle })
</script>

<style scoped>
.df-collapse { border-top: 1px solid var(--df-color-border, #e4e7ed); border-bottom: 1px solid var(--df-color-border, #e4e7ed); }
</style>
