<template>
  <div class="df-progress" :class="[`df-progress--${type}`, { 'df-progress--text-inside': textInside }]" role="progressbar" :aria-valuenow="percentage" aria-valuemin="0" aria-valuemax="100">
    <div v-if="type === 'line'" class="df-progress-bar">
      <div class="df-progress-bar__outer" :style="{ height: `${strokeWidth}px` }">
        <div class="df-progress-bar__inner" :style="barStyle">
          <span v-if="textInside && showText" class="df-progress-bar__innerText">{{ displayText }}</span>
        </div>
      </div>
    </div>
    <svg v-else :viewBox="`0 0 ${circleSize} ${circleSize}`" class="df-progress-circle" :style="{ width: `${width}px`, height: `${width}px` }">
      <circle :cx="circleSize / 2" :cy="circleSize / 2" :r="radius" fill="none" stroke="#e5e9f2" :stroke-width="relativeStrokeWidth" />
      <circle :cx="circleSize / 2" :cy="circleSize / 2" :r="radius" fill="none" :stroke="barColor" :stroke-width="relativeStrokeWidth"
        :stroke-dasharray="perimeter" :stroke-dashoffset="dashOffset" stroke-linecap="round"
        :style="{ transform: type === 'dashboard' ? 'rotate(125deg)' : 'rotate(-90deg)', transformOrigin: '50% 50%', transition: 'stroke-dashoffset .6s ease' }" />
    </svg>
    <span v-if="showText && !textInside" class="df-progress__text" :style="{ fontSize: `${progressTextSize}px` }">
      <slot>{{ displayText }}</slot>
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  type?: 'line' | 'circle' | 'dashboard'
  percentage?: number
  status?: '' | 'success' | 'exception' | 'warning'
  strokeWidth?: number
  textInside?: boolean
  width?: number
  showText?: boolean
  color?: string | Array<{ color: string; percentage: number }> | ((p: number) => string)
  format?: (p: number) => string
}>(), {
  type: 'line',
  percentage: 0,
  status: '',
  strokeWidth: 6,
  textInside: false,
  width: 126,
  showText: true,
})

defineOptions({ name: 'DfProgress' })

const STATUS_COLOR: Record<string, string> = { success: '#52C41A', exception: '#F5222D', warning: '#FAAD14' }

const barColor = computed(() => {
  if (props.color) {
    if (typeof props.color === 'string') return props.color
    if (typeof props.color === 'function') return props.color(props.percentage)
    const sorted = [...props.color].sort((a, b) => a.percentage - b.percentage)
    for (const c of sorted) { if (props.percentage <= c.percentage) return c.color }
    return sorted[sorted.length - 1]?.color ?? 'var(--df-color-primary, #409eff)'
  }
  return STATUS_COLOR[props.status] ?? 'var(--df-color-primary, #409eff)'
})

const barStyle = computed(() => ({
  width: `${props.percentage}%`,
  backgroundColor: barColor.value,
  transition: 'width .6s ease',
}))

const displayText = computed(() => props.format ? props.format(props.percentage) : `${props.percentage}%`)
const progressTextSize = computed(() => props.type === 'line' ? 12 + props.strokeWidth * 0.4 : props.width * 0.111 + 2)

// Circle/Dashboard
const circleSize = 100
const relativeStrokeWidth = computed(() => (props.strokeWidth / props.width * 100).toFixed(1))
const radius = computed(() => (circleSize - parseFloat(relativeStrokeWidth.value)) / 2)
const perimeter = computed(() => 2 * Math.PI * radius.value)
const dashOffset = computed(() => {
  const rate = props.type === 'dashboard' ? 0.75 : 1
  return perimeter.value * (1 - (props.percentage / 100) * rate)
})
</script>

<style scoped>
.df-progress { position: relative; line-height: 1; display: flex; align-items: center; }
.df-progress--line { width: 100%; }
.df-progress-bar { flex: 1; margin-right: var(--df-spacing-sm, 8px); }
.df-progress-bar__outer { border-radius: var(--df-radius-full, 9999px); background: var(--df-color-border, #E8EBF0); overflow: hidden; }
.df-progress-bar__inner { border-radius: var(--df-radius-full, 9999px); height: 100%; text-align: right; line-height: 1; white-space: nowrap; }
.df-progress-bar__innerText { display: inline-block; vertical-align: middle; color: #fff; font-size: var(--df-font-size-xs, 12px); margin: 0 5px; }
.df-progress__text { font-size: var(--df-font-size-md, 14px); color: var(--df-color-text-primary, #1A1A1A); white-space: nowrap; min-width: 50px; }
.df-progress--circle, .df-progress--dashboard { display: inline-flex; position: relative; }
.df-progress--circle .df-progress__text, .df-progress--dashboard .df-progress__text { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); }
.df-progress-circle { overflow: visible; }
</style>
