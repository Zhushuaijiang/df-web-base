<template>
  <div class="df-pagination" :class="{ 'df-pagination--small': small, 'df-pagination--bg': background }">
    <!-- 左侧组 -->
    <template v-for="part in leftLayout" :key="part">
      <span v-if="part === 'total'" class="df-pagination__total">共 {{ total }} 条</span>
      <DxSelectBox
        v-if="part === 'sizes'"
        :items="pageSizeItems"
        :value="internalPageSize"
        value-expr="value"
        display-expr="label"
        :width="120"
        @value-changed="(e: any) => onSizeChange(e.value)"
      />
      <DxButton v-if="part === 'prev'" icon="chevronleft" :disabled="internalCurrentPage <= 1" @click="prev" />
      <ul v-if="part === 'pager'" class="df-pagination__pager">
        <li v-for="p in pagers" :key="p" :class="{ active: p === internalCurrentPage, 'df-pagination__ellipsis': p < 0 }" @click="p > 0 && goTo(p)">
          {{ p > 0 ? p : '...' }}
        </li>
      </ul>
      <DxButton v-if="part === 'next'" icon="chevronright" :disabled="internalCurrentPage >= totalPages" @click="next" />
      <span v-if="part === 'jumper'" class="df-pagination__jump">
        前往
        <DxNumberBox
          :value="internalCurrentPage"
          :min="1"
          :max="totalPages"
          :width="60"
          @value-changed="(e: any) => onJump(e.value)"
        />
        页
      </span>
    </template>
    <!-- 弹性间距 -->
    <div v-if="hasSpacer" class="df-pagination__spacer" />
    <!-- 右侧组 -->
    <template v-for="part in rightLayout" :key="part">
      <span v-if="part === 'total'" class="df-pagination__total">共 {{ total }} 条</span>
      <DxSelectBox
        v-if="part === 'sizes'"
        :items="pageSizeItems"
        :value="internalPageSize"
        value-expr="value"
        display-expr="label"
        :width="120"
        @value-changed="(e: any) => onSizeChange(e.value)"
      />
      <DxButton v-if="part === 'prev'" icon="chevronleft" :disabled="internalCurrentPage <= 1" @click="prev" />
      <ul v-if="part === 'pager'" class="df-pagination__pager">
        <li v-for="p in pagers" :key="p" :class="{ active: p === internalCurrentPage, 'df-pagination__ellipsis': p < 0 }" @click="p > 0 && goTo(p)">
          {{ p > 0 ? p : '...' }}
        </li>
      </ul>
      <DxButton v-if="part === 'next'" icon="chevronright" :disabled="internalCurrentPage >= totalPages" @click="next" />
      <span v-if="part === 'jumper'" class="df-pagination__jump">
        前往
        <DxNumberBox
          :value="internalCurrentPage"
          :min="1"
          :max="totalPages"
          :width="60"
          @value-changed="(e: any) => onJump(e.value)"
        />
        页
      </span>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { DxButton } from 'devextreme-vue/button'
import { DxSelectBox } from 'devextreme-vue/select-box'
import { DxNumberBox } from 'devextreme-vue/number-box'
import type { DfPaginationProps } from './types'

const props = withDefaults(defineProps<DfPaginationProps>(), {
  total: 0,
  pageSize: 10,
  currentPage: 1,
  pageSizes: () => [10, 20, 30, 50, 100],
  pagerCount: 7,
  layout: 'prev, pager, next, jumper, ->, total',
  background: false,
  small: false,
  disabled: false,
  hideOnSinglePage: false,
})

const emit = defineEmits<{
  'update:currentPage': [val: number]
  'update:pageSize': [val: number]
  'size-change': [val: number]
  'current-change': [val: number]
  'prev-click': [val: number]
  'next-click': [val: number]
}>()

defineOptions({ name: 'DfPagination' })

const internalCurrentPage = ref(props.currentPage)
const internalPageSize = ref(props.pageSize)

watch(() => props.currentPage, v => { internalCurrentPage.value = v })
watch(() => props.pageSize, v => { internalPageSize.value = v })

const totalPages = computed(() => Math.max(1, Math.ceil(props.total / internalPageSize.value)))
const layoutParts = computed(() => props.layout.split(',').map(s => s.trim()).filter(Boolean))
const spacerIndex = computed(() => layoutParts.value.indexOf('->'))
const hasSpacer = computed(() => spacerIndex.value > -1)
const leftLayout = computed(() => hasSpacer.value ? layoutParts.value.slice(0, spacerIndex.value) : layoutParts.value)
const rightLayout = computed(() => hasSpacer.value ? layoutParts.value.slice(spacerIndex.value + 1) : [])

const pageSizeItems = computed(() => props.pageSizes.map(s => ({ value: s, label: `${s} 条/页` })))

const pagers = computed(() => {
  const count = props.pagerCount
  const current = internalCurrentPage.value
  const total = totalPages.value
  if (total <= count) return Array.from({ length: total }, (_, i) => i + 1)
  const half = Math.floor(count / 2)
  let start = Math.max(2, current - half)
  let end = Math.min(total - 1, current + half)
  if (current <= half + 1) end = count - 1
  if (current >= total - half) start = total - count + 2
  const pages: number[] = [1]
  if (start > 2) pages.push(-1)
  for (let i = start; i <= end; i++) pages.push(i)
  if (end < total - 1) pages.push(-2)
  if (total > 1) pages.push(total)
  return pages
})

function goTo(p: number) {
  const page = Math.max(1, Math.min(p, totalPages.value))
  internalCurrentPage.value = page
  emit('update:currentPage', page)
  emit('current-change', page)
}

function prev() { goTo(internalCurrentPage.value - 1); emit('prev-click', internalCurrentPage.value) }
function next() { goTo(internalCurrentPage.value + 1); emit('next-click', internalCurrentPage.value) }

function onSizeChange(val: number) {
  internalPageSize.value = val
  emit('update:pageSize', val)
  emit('size-change', val)
  goTo(1)
}

function onJump(val: number) {
  if (!isNaN(val)) goTo(val)
}
</script>

<style scoped>
.df-pagination {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  font-size: var(--df-font-size, 14px);
  color: var(--df-color-text-primary, #303133);
  user-select: none;
  background: var(--df-color-white, #fff);
  padding: 8px 0;
  box-sizing: border-box;
}

.df-pagination--small {
  font-size: 12px;
  gap: 4px;
  padding: 4px 0;
}

/* ─── 弹性间距 ─── */
.df-pagination__spacer {
  flex: 1;
}

/* ─── 总条数 ─── */
.df-pagination__total {
  color: var(--df-color-text-secondary, #666);
  font-size: var(--df-font-size, 14px);
  white-space: nowrap;
  line-height: 28px;
  box-sizing: border-box;
}

/* ─── 页码列表 ─── */
.df-pagination__pager {
  list-style: none;
  display: flex;
  align-items: center;
  gap: 4px;
  margin: 0;
  padding: 0;
}

.df-pagination__pager li {
  width: 28px;
  height: 28px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  cursor: pointer;
  font-size: var(--df-font-size, 14px);
  color: var(--df-color-text-primary, #303133);
  border: 1px solid transparent;
  box-sizing: border-box;
  transition: all 150ms;
}

.df-pagination__pager li:hover {
  color: var(--df-color-primary, #1890ff);
}

.df-pagination__pager li.active {
  color: var(--df-color-white, #fff);
  background: var(--df-color-primary, #1890ff);
  font-weight: 700;
  border-color: var(--df-color-primary, #1890ff);
}

.df-pagination__pager li.df-pagination__ellipsis {
  cursor: default;
  color: var(--df-color-text-secondary, #909399);
  border: none;
}

.df-pagination--bg .df-pagination__pager li {
  background: var(--df-color-bg-secondary, #f1f2f2);
  border: 1px solid var(--df-color-border-light, #e3e3e3);
}

.df-pagination--bg .df-pagination__pager li:hover {
  background: var(--df-color-border-light, #e3e3e3);
}

.df-pagination--bg .df-pagination__pager li.active {
  background: var(--df-color-primary, #1890ff);
  border-color: var(--df-color-primary, #1890ff);
  color: var(--df-color-white, #fff);
}

/* ─── 快速跳转 ─── */
.df-pagination__jump {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  white-space: nowrap;
  color: var(--df-color-text-secondary, #666);
  font-size: var(--df-font-size, 14px);
  line-height: 28px;
  box-sizing: border-box;
}

/* ─── 小尺寸覆盖 ─── */
.df-pagination--small .df-pagination__total {
  font-size: 12px;
  line-height: 24px;
}

.df-pagination--small .df-pagination__pager li {
  width: 24px;
  height: 24px;
  font-size: 12px;
}

.df-pagination--small .df-pagination__pager {
  gap: 2px;
}

.df-pagination--small .df-pagination__jump {
  font-size: 12px;
  line-height: 24px;
}
</style>
