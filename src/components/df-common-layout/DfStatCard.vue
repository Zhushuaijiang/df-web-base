<template>
  <div
    class="df-stat-card"
    :class="[`df-stat-card--${variant}`, { 'df-stat-card--clickable': clickable, 'df-stat-card--loading': loading }]"
    role="figure"
    :aria-label="`${label}: ${value}`"
  >
    <template v-if="loading">
      <div class="df-stat-card__skeleton-icon" />
      <div class="df-stat-card__skeleton-content">
        <div class="df-stat-card__skeleton-value" />
        <div class="df-stat-card__skeleton-label" />
      </div>
    </template>
    <template v-else>
      <div class="df-stat-card__icon" :class="[`df-stat-card__icon--${variant}`]">
        <slot name="icon">
          <span class="df-stat-card__icon-default">{{ iconText }}</span>
        </slot>
      </div>
      <div class="df-stat-card__content">
        <div class="df-stat-card__value">
          <slot name="value">{{ formattedValue }}</slot>
        </div>
        <div class="df-stat-card__label">
          <slot name="label">{{ label }}</slot>
        </div>
      </div>
      <div v-if="trend != null" class="df-stat-card__trend" :class="trendClass">
        <span class="df-stat-card__trend-arrow">{{ trend >= 0 ? '↑' : '↓' }}</span>
        <span>{{ Math.abs(trend) }}%</span>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

/**
 * DfStatCard — 统计指标卡片
 *
 * 行业最佳实践：
 * - 骨架屏 loading 态
 * - 数字格式化 (千分位)
 * - 可点击态
 * - ARIA 可访问
 * - 统一 design tokens
 */
defineOptions({ name: 'DfStatCard' })

const props = withDefaults(defineProps<{
  /** 数值 */
  value?: string | number
  /** 标签 */
  label?: string
  /** 图标文字 */
  iconText?: string
  /** 颜色变体 */
  variant?: 'blue' | 'green' | 'orange' | 'red' | 'purple' | 'default'
  /** 趋势百分比 */
  trend?: number
  /** 加载态 */
  loading?: boolean
  /** 是否可点击 */
  clickable?: boolean
  /** 数字格式化（千分位） */
  formatNumber?: boolean
}>(), {
  variant: 'default',
  loading: false,
  clickable: false,
  formatNumber: true,
})

const formattedValue = computed(() => {
  if (typeof props.value === 'string') return props.value
  if (!props.formatNumber || props.value == null) return String(props.value ?? '')
  return props.value.toLocaleString('zh-CN')
})

const trendClass = computed(() =>
  props.trend != null
    ? props.trend >= 0 ? 'df-stat-card__trend--up' : 'df-stat-card__trend--down'
    : '',
)
</script>

<style scoped>
.df-stat-card {
  display: flex;
  align-items: center;
  gap: var(--df-spacing-3, 12px);
  padding: var(--df-spacing-4, 16px) var(--df-spacing-5, 20px);
  background: var(--df-color-bg-surface, #fff);
  border-radius: var(--df-radius-md, 8px);
  border: 1px solid var(--df-color-border-light, #f0f2f5);
  transition: box-shadow var(--df-transition-fast, 0.15s ease);
}

.df-stat-card--clickable {
  cursor: pointer;
}

.df-stat-card--clickable:hover {
  box-shadow: var(--df-shadow-md, 0 4px 8px rgba(26, 32, 48, 0.08));
}

.df-stat-card--clickable:active {
  box-shadow: var(--df-shadow-sm, 0 1px 2px rgba(26, 32, 48, 0.06));
}

/* ─── Skeleton Loading ─── */
.df-stat-card--loading {
  pointer-events: none;
}

.df-stat-card__skeleton-icon {
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  border-radius: var(--df-radius-md, 8px);
  background: linear-gradient(90deg, var(--df-color-bg-secondary, #f0f0f0) 25%, var(--df-color-bg-tertiary, #e8e8e8) 50%, var(--df-color-bg-secondary, #f0f0f0) 75%);
  background-size: 200% 100%;
  animation: df-skeleton-pulse 1.5s ease-in-out infinite;
}

.df-stat-card__skeleton-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--df-spacing-sm, 8px);
}

.df-stat-card__skeleton-value {
  height: 24px;
  width: 60%;
  border-radius: var(--df-radius-sm, 4px);
  background: linear-gradient(90deg, var(--df-color-bg-secondary, #f0f0f0) 25%, var(--df-color-bg-tertiary, #e8e8e8) 50%, var(--df-color-bg-secondary, #f0f0f0) 75%);
  background-size: 200% 100%;
  animation: df-skeleton-pulse 1.5s ease-in-out infinite;
}

.df-stat-card__skeleton-label {
  height: 14px;
  width: 80%;
  border-radius: var(--df-radius-sm, 4px);
  background: linear-gradient(90deg, var(--df-color-bg-secondary, #f0f0f0) 25%, var(--df-color-bg-tertiary, #e8e8e8) 50%, var(--df-color-bg-secondary, #f0f0f0) 75%);
  background-size: 200% 100%;
  animation: df-skeleton-pulse 1.5s ease-in-out infinite;
}

@keyframes df-skeleton-pulse {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* ─── Icon ─── */
.df-stat-card__icon {
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  border-radius: var(--df-radius-md, 8px);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--df-font-size-2xl, 20px);
  background: var(--df-color-primary-50, #ecf5ff);
  color: var(--df-color-primary, #1890ff);
}

.df-stat-card__icon--blue { background: var(--df-color-primary-bg, #ecf5ff); color: var(--df-color-primary, #1890ff); }
.df-stat-card__icon--green { background: var(--df-color-success-bg, #f0f9eb); color: var(--df-color-success, #67c23a); }
.df-stat-card__icon--orange { background: var(--df-color-warning-bg, #fdf6ec); color: var(--df-color-warning, #e6a23c); }
.df-stat-card__icon--red { background: var(--df-color-error-bg, #fef0f0); color: var(--df-color-error, #f56c6c); }
.df-stat-card__icon--purple { background: var(--df-color-info-bg, #f4ecfb); color: var(--df-color-info, #9b59b6); }

.df-stat-card__icon-default {
  font-size: var(--df-font-size-xl, 18px);
  font-weight: var(--df-font-weight-bold, 700);
}

/* ─── Content ─── */
.df-stat-card__content {
  flex: 1;
  min-width: 0;
}

.df-stat-card__value {
  font-size: 22px;
  font-weight: var(--df-font-weight-bold, 700);
  color: var(--df-color-text-primary, #1A1A1A);
  line-height: var(--df-line-height-tight, 1.25);
  font-family: var(--df-font-family-number, 'DIN Alternate', 'Helvetica Neue', sans-serif);
}

.df-stat-card__label {
  font-size: var(--df-font-size-sm, 13px);
  color: var(--df-color-text-secondary, #6B7790);
  margin-top: var(--df-spacing-xs, 4px);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* ─── Trend ─── */
.df-stat-card__trend {
  flex-shrink: 0;
  font-size: var(--df-font-size-xs, 12px);
  font-weight: var(--df-font-weight-semibold, 600);
  display: flex;
  align-items: center;
  gap: 2px;
  padding: var(--df-spacing-xs, 4px) var(--df-spacing-sm, 8px);
  border-radius: var(--df-radius-sm, 4px);
}

.df-stat-card__trend--up {
  color: var(--df-color-error, #f56c6c);
  background: var(--df-color-error-bg, #fef0f0);
}

.df-stat-card__trend--down {
  color: var(--df-color-success, #67c23a);
  background: var(--df-color-success-bg, #f0f9eb);
}
</style>
