<template>
  <span class="df-dict-tag" :class="tagClass" :style="tagStyle">{{ displayText }}</span>
</template>

<script setup lang="ts">
import { inject, ref, computed, watch } from 'vue'
import { DF_UI_KEY } from '../../install'

const props = defineProps<{
  /** 字典编码 */
  dictCode: string
  /** 字典值 */
  value: string | number
  /** 显示为标签样式 */
  tag?: boolean
  /** 自定义颜色 */
  color?: string
}>()

const dfui = inject(DF_UI_KEY)

const displayText = ref<string>('')

function resolve() {
  if (!dfui) {
    displayText.value = String(props.value)
    return
  }
  displayText.value = dfui.dict.getLabel(props.dictCode, props.value) || String(props.value)
}

// 初始化 + 监听变化
resolve()
watch(() => [props.dictCode, props.value], resolve)

const tagClass = computed(() => ({
  'df-dict-tag--badge': props.tag,
}))

const tagStyle = computed(() =>
  props.color ? { backgroundColor: props.color, color: '#fff' } : undefined,
)
</script>

<style scoped>
.df-dict-tag {
  display: inline;
}

.df-dict-tag--badge {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  background-color: var(--df-color-tag-bg, #f0f0f0);
  color: var(--df-color-tag-text, #333);
}
</style>
