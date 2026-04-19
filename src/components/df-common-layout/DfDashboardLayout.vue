<template>
  <div class="df-dashboard-layout">
    <!-- KPI Bar -->
    <section v-if="$slots.kpi" class="df-dashboard-layout__kpi">
      <slot name="kpi" />
    </section>

    <!-- Filter bar -->
    <div v-if="$slots.filter" class="df-dashboard-layout__filter">
      <slot name="filter" />
    </div>

    <!-- Cards Section -->
    <section v-if="$slots.cards" class="df-dashboard-layout__cards">
      <slot name="cards" />
    </section>

    <!-- Charts Section -->
    <section v-if="$slots.charts" class="df-dashboard-layout__charts" :style="chartsGridStyle">
      <slot name="charts" />
    </section>

    <!-- Table Section -->
    <section v-if="$slots.table" class="df-dashboard-layout__table">
      <slot name="table" />
    </section>

    <!-- Default slot for custom content -->
    <div v-if="$slots.default && !$slots.kpi && !$slots.cards && !$slots.charts" class="df-dashboard-layout__custom">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

/**
 * DfDashboardLayout — 仪表盘布局
 *
 * 行业最佳实践：
 * - 可配置图表列数
 * - 筛选栏插槽 (filter)
 * - 统一 design tokens
 * - 响应式：移动端图表列数自动调整
 */
defineOptions({ name: 'DfDashboardLayout' })

const props = withDefaults(defineProps<{
  /** 图表区列数 */
  chartCols?: number
}>(), {
  chartCols: 2,
})

const chartsGridStyle = computed(() => ({
  gridTemplateColumns: `repeat(${props.chartCols}, 1fr)`,
}))
</script>

<style scoped>
.df-dashboard-layout {
  display: flex;
  flex-direction: column;
  gap: var(--df-spacing-4, 16px);
  height: 100%;
  width: 100%;
  padding: var(--df-spacing-4, 16px);
  overflow: auto;
}

.df-dashboard-layout__kpi {
  flex-shrink: 0;
}

.df-dashboard-layout__filter {
  flex-shrink: 0;
}

.df-dashboard-layout__cards {
  flex-shrink: 0;
}

.df-dashboard-layout__charts {
  flex: 1;
  min-height: 0;
  display: grid;
  gap: var(--df-spacing-4, 16px);
}

.df-dashboard-layout__table {
  flex-shrink: 0;
}

.df-dashboard-layout__custom {
  flex: 1;
}

/* ─── Responsive ─── */
@media (max-width: 768px) {
  .df-dashboard-layout__charts {
    grid-template-columns: 1fr !important;
  }
}
</style>
