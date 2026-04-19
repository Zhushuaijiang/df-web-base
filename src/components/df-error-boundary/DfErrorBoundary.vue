<template>
  <slot v-if="!hasError" />
  <slot v-else name="fallback" :error="caughtError" :info="errorInfo" :retry="retry">
    <div class="df-error-boundary">
      <div class="df-error-boundary__icon">⚠</div>
      <p class="df-error-boundary__message">{{ displayMessage }}</p>
      <button class="df-error-boundary__retry" @click="retry">重试</button>
    </div>
  </slot>
</template>

<script setup lang="ts">
import { ref, computed, onErrorCaptured } from 'vue'

const props = withDefaults(defineProps<{
  /** 自定义错误提示文案，未设置时显示默认带 info 的提示 */
  fallbackMessage?: string
  /** 是否阻止错误向父级传播，默认 true */
  stopPropagation?: boolean
}>(), {
  stopPropagation: true,
})

const emit = defineEmits<{
  /** 捕获到子组件错误时触发 */
  error: [error: Error, info: string]
  /** 用户点击重试时触发 */
  reset: []
}>()

const hasError = ref(false)
const caughtError = ref<Error | null>(null)
const errorInfo = ref('')

const displayMessage = computed(() =>
  props.fallbackMessage || (errorInfo.value ? `组件渲染异常 (${errorInfo.value})` : '组件加载异常，请重试'),
)

onErrorCaptured((error: Error, _instance, info) => {
  hasError.value = true
  caughtError.value = error
  errorInfo.value = info

  console.error('[DfErrorBoundary]', error, info)
  emit('error', error, info)

  return !props.stopPropagation
})

function retry() {
  hasError.value = false
  caughtError.value = null
  errorInfo.value = ''
  emit('reset')
}

defineExpose({ hasError, retry })
</script>

<style scoped>
.df-error-boundary {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  color: var(--df-color-error, #d32f2f);
  background: var(--df-color-error-bg, #fdecea);
  border-radius: var(--df-radius-md, 8px);
  min-height: 120px;
}

.df-error-boundary__icon {
  font-size: 32px;
  margin-bottom: 8px;
}

.df-error-boundary__message {
  margin: 0 0 12px;
  font-size: var(--df-font-size-md, 14px);
  color: var(--df-color-text-secondary, #666);
}

.df-error-boundary__retry {
  padding: 6px 16px;
  border: 1px solid var(--df-color-primary, #1976d2);
  border-radius: var(--df-radius-sm, 4px);
  background: transparent;
  color: var(--df-color-primary, #1976d2);
  cursor: pointer;
  font-size: var(--df-font-size-md, 14px);
  box-sizing: border-box;
}

.df-error-boundary__retry:hover {
  background: var(--df-color-primary, #1976d2);
  color: #fff;
}
</style>
