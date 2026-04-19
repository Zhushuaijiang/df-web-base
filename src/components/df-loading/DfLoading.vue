<template>
  <transition name="df-loading-fade">
    <div v-if="loading" class="df-loading" :class="{ 'df-loading--fullscreen': fullscreen }">
      <div class="df-loading__spinner">
        <svg viewBox="0 0 50 50" class="df-loading__circular">
          <circle cx="25" cy="25" r="20" fill="none" class="df-loading__path" />
        </svg>
      </div>
      <p v-if="text" class="df-loading__text">{{ text }}</p>
    </div>
  </transition>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    /** 是否显示加载状态 */
    loading?: boolean
    /** 加载提示文本 */
    text?: string
    /** 是否全屏覆盖 */
    fullscreen?: boolean
  }>(),
  {
    loading: false,
    text: '',
    fullscreen: false,
  },
)
</script>

<style scoped>
.df-loading {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.8);
  z-index: var(--df-z-modal, 1050);
}

.df-loading--fullscreen {
  position: fixed;
}

.df-loading__spinner {
  width: 40px;
  height: 40px;
}

.df-loading__circular {
  animation: df-loading-rotate 2s linear infinite;
  width: 100%;
  height: 100%;
}

.df-loading__path {
  stroke: var(--df-color-primary, #1976d2);
  stroke-width: 3;
  stroke-linecap: round;
  animation: df-loading-dash 1.5s ease-in-out infinite;
}

.df-loading__text {
  margin-top: var(--df-spacing-sm, 8px);
  font-size: var(--df-font-size-sm, 13px);
  color: var(--df-color-text-secondary, #666);
}

.df-loading-fade-enter-active,
.df-loading-fade-leave-active {
  transition: opacity var(--df-transition-normal, 250ms);
}

.df-loading-fade-enter-from,
.df-loading-fade-leave-to {
  opacity: 0;
}

@keyframes df-loading-rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes df-loading-dash {
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
}
</style>
