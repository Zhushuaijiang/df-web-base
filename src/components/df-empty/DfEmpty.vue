<template>
  <div class="df-empty">
    <div class="df-empty__image">
      <slot name="image">
        <svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
          <rect x="40" y="30" width="120" height="70" rx="4" fill="#f5f7fa" stroke="#dcdfe6" stroke-width="1"/>
          <line x1="60" y1="55" x2="140" y2="55" stroke="#dcdfe6" stroke-width="2" stroke-linecap="round"/>
          <line x1="60" y1="70" x2="120" y2="70" stroke="#e4e7ed" stroke-width="2" stroke-linecap="round"/>
          <line x1="60" y1="85" x2="100" y2="85" stroke="#ebeef5" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </slot>
    </div>
    <p class="df-empty__description">
      <slot>{{ description }}</slot>
    </p>
    <div v-if="$slots.bottom" class="df-empty__bottom">
      <slot name="bottom" />
    </div>
  </div>
</template>

<script setup lang="ts">
export interface DfEmptyProps {
  description?: string
  imageSize?: number
}

withDefaults(defineProps<DfEmptyProps>(), {
  description: '暂无数据',
  imageSize: 160,
})

defineOptions({ name: 'DfEmpty' })

</script>

<style scoped>
.df-empty { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 40px 0; }
.df-empty__image { width: v-bind('imageSize + "px"'); }
.df-empty__image svg { width: 100%; height: auto; }
.df-empty__description { margin: 12px 0 0; font-size: 14px; color: var(--df-color-text-secondary, #909399); }
.df-empty__bottom { margin-top: 16px; }
</style>
