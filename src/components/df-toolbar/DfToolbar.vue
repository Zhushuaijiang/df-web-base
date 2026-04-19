<template>
  <div class="df-toolbar" :class="rootClass">
    <DxToolbar>
      <DxItem
        v-for="item in visibleItems"
        :key="item.name"
        :widget="item.widget"
        :location="item.location ?? 'before'"
        :options="item.options"
        :disabled="item.disabled"
        :css-class="item.cssClass"
      />
      <slot />
    </DxToolbar>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, type PropType } from 'vue'
import { DxToolbar, DxItem } from 'devextreme-vue/toolbar'
import { DF_UI_KEY } from '../../install'
import type { DfToolbarItem } from './types'

const props = defineProps({
  items: { type: Array as PropType<DfToolbarItem[]>, default: () => [] },
  bordered: { type: Boolean, default: false },
})

const dfui = inject(DF_UI_KEY, undefined)

const visibleItems = computed(() =>
  props.items.filter((item) => {
    if (item.visible === false) return false
    if (item.permissionCode && dfui) {
      return dfui.permission.check(item.permissionCode)
    }
    return true
  }),
)

const rootClass = computed(() => ({
  'df-toolbar--bordered': props.bordered,
}))
</script>

<style scoped>
.df-toolbar {
  padding: var(--df-spacing-sm) 0;
}

.df-toolbar--bordered {
  border-bottom: 1px solid var(--df-color-border);
  padding-bottom: var(--df-spacing-md);
  margin-bottom: var(--df-spacing-md);
}
</style>
