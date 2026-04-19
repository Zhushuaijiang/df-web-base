<template>
  <div class="df-dx-table" :class="[props.gridClass, { 'row-alternation-enabled': finalRowAlternation }]">
    <div v-if="slots.toolbar" class="df-dx-table__toolbar">
      <slot name="toolbar" />
    </div>

    <DxDataGrid
      ref="gridRef"
      :data-source="gridStore"
      :key-expr="props.keyExpr"
      :remote-operations="finalRemoteOperations"
      :style="resolvedGridStyle"
      :show-borders="true"
      :show-column-lines="true"
      :show-row-lines="true"
      :hover-state-enabled="props.hoverStateEnabled !== false"
      :row-alternation-enabled="finalRowAlternation"
      :column-auto-width="true"
      :allow-column-resizing="true"
      :allow-column-reordering="true"
      column-resizing-mode="widget"
      v-bind="$attrs"
      @context-menu-preparing="onContextMenuPreparing"
      @content-ready="onContentReady"
      @row-prepared="onRowPrepared"
      @initialized="onGridInitialized"
      @cell-prepared="onCellPrepared"
      @selection-changed="onSelectionChanged"
      @row-updated="onRowUpdated"
      @row-click="emit('row-click', $event)"
      @focused-row-changed="emit('focused-row-changed', $event)"
    >
      <!-- 排序模式 -->
      <DxSorting mode="multiple" />

      <DxFilterRow v-if="props.showFilterRow" :visible="true" />
      <DxHeaderFilter v-if="props.showHeaderFilter" :visible="true" />
      <DxGroupPanel v-if="props.showGroupPanel" :visible="true" />
      <DxColumnChooser v-if="props.showColumnChooser" :enabled="true" mode="select" />
      <DxMasterDetail v-if="hasRowDetail" :enabled="true" template="rowDetail" />

      <!-- 动态列 -->
      <DxColumn
        v-for="item in finalColumns"
        :key="item.dataField"
        v-bind="item"
      />

      <template
        v-for="item in columnsWithCellSlot"
        :key="`${item.dataField}-cell-slot`"
        #[item.cellSlot]="slotProps"
      >
        <slot :name="item.cellSlot" v-bind="getCellSlotBindings(slotProps)" />
      </template>

      <template
        v-for="item in columnsWithHeaderSlot"
        :key="`${item.dataField}-header-slot`"
        #[item.headerSlot]="slotProps"
      >
        <slot :name="item.headerSlot" v-bind="getHeaderSlotBindings(slotProps, item)" />
      </template>

      <template
        v-for="item in columnsWithEditSlot"
        :key="`${item.dataField}-edit-slot`"
        #[item.editSlot]="slotProps"
      >
        <slot :name="item.editSlot" v-bind="getEditSlotBindings(slotProps)" />
      </template>

      <template v-if="hasRowDetail" #rowDetail="{ data: detailData }">
        <slot name="rowDetail" v-bind="getRowDetailBindings(detailData)" />
      </template>

      <!-- 分页 -->
      <DxPaging
        :page-size="mergedPageConfig.size"
        :enabled="resolvedHasPage"
      />
      <DxPager
        :show-page-size-selector="true"
        :allowed-page-sizes="mergedPageConfig.sizes"
        :display-mode="mergedPageConfig.mode"
        :show-info="true"
        :show-navigation-buttons="true"
        :visible="resolvedHasPage"
      />

      <!-- 列固定 -->
      <DxColumnFixing :enabled="true" />

      <!-- 选择 -->
      <DxSelection
        v-if="resolvedHasSelect"
        :select-all-mode="mergedSelectConfig.allMode"
        :show-check-boxes-mode="mergedSelectConfig.boxMode"
        :mode="mergedSelectConfig.mode"
      />

      <!-- 操作按钮列模板 -->
      <template v-if="hasOperationColumn" #[operationSlotName]="slotProps">
        <slot
          :name="operationSlotName"
          v-bind="getOperationSlotBindings(slotProps)"
          :buttons="resolvedOperationButtons"
        >
          <div class="df-dx-table-operation-buttons">
            <template v-for="(btn, idx) in visibleOperationButtons(getOperationRowInfo(slotProps).data, getOperationRowInfo(slotProps).rowIndex)" :key="getOperationButtonKey(btn, idx)">
              <button
                class="df-dx-table-operation-btn"
                :class="btn.cssClass"
                :disabled="isOperationButtonDisabled(btn, getOperationRowInfo(slotProps).data, getOperationRowInfo(slotProps).rowIndex)"
                type="button"
                @click="btn.click(getOperationRowInfo(slotProps).data, getOperationRowInfo(slotProps).rowIndex, idx)"
              >
                {{ btn.text ?? btn.name }}
              </button>
            </template>
          </div>
        </slot>
      </template>

      <!-- 透传默认插槽 -->
      <slot />
    </DxDataGrid>
  </div>
</template>

<script setup lang="ts">
/**
 * DfTable — df-web-base 核心表格组件
 *
 * 对标 df-web-bui dx-table 的完整 API，依赖全部翻转：
 * ┌──────────────────────────────────────────────────────────────┐
 * │ dx-table (bui)              → DfTable (df-web-base)         │
 * ├──────────────────────────────────────────────────────────────┤
 * │ this.$DxCustomStore         → import('devextreme/...')      │
 * │ @/apis/.../datalayout       → DfUIOptions.columnConfig      │
 * │ window.DFhelper             → DfUIOptions.appContext         │
 * │ this.$store.state.config    → DfUIOptions.permission        │
 * │ window.globalEvent          → DfUIOptions.permission        │
 * │ this.$message               → useNotification               │
 * │ lodash/cloneDeep            → structuredClone / spread      │
 * │ Vue 2 Options API + mixins  → Vue 3 Composition API         │
 * └──────────────────────────────────────────────────────────────┘
 */
import {
  computed,
  shallowRef,
  watch,
  onMounted,
  inject,
  useSlots,
} from 'vue'
import {
  DxDataGrid,
  DxColumn,
  DxPaging,
  DxPager,
  DxSelection,
  DxSorting,
  DxColumnFixing,
  DxFilterRow,
  DxHeaderFilter,
  DxGroupPanel,
  DxColumnChooser,
  DxMasterDetail,
} from 'devextreme-vue/data-grid'
import { DF_UI_KEY } from '../../install'

import type {
  DfTableProps,
  DfTableColumn,
  PageConfig,
  IndexConfig,
  OperationButton,
  OperationColumnConfig,
  SortFieldItem,
} from './types'
import type {
  DxCellPreparedEvent,
  DxRowPreparedEvent,
  DxRowClickEvent,
  DxSelectionChangedEvent,
  DxContentReadyEvent,
  DxInitializedEvent,
  DxRowUpdatedEvent,
  DxContextMenuPreparingEvent,
  DxFocusedRowChangedEvent,
  DxDataGridInstance,
} from '../../types/devextreme'
import {
  DEFAULT_PAGE_CONFIG,
  DEFAULT_SELECT_CONFIG,
  DEFAULT_INDEX_CONFIG,
} from './types'
import {
  makeUpColumn,
  formatCellStyleByCondition,
  formatRowStyleByCondition,
  bindMenuRowData,
  canUsePermission,
} from './table-utils'
import { useTableStore } from './useTableStore'
import { useColumnConfig } from './useColumnConfig'
import { useTableSelection } from './useTableSelection'

// ─── Props ──────────────────────────────────────────────────────────

const props = withDefaults(
  defineProps<DfTableProps>(),
  {
    keyExpr: 'id',
    useFetch: true,
    autoLoad: true,
    hasPage: true,
    hasSelect: false,
    hasIndex: false,
    hoverStateEnabled: true,
    rowAlternationEnabled: true,
    allowColumnConfig: true,
    operationWidth: 80,
    isEditMode: false,
  },
)

// ─── Emits ──────────────────────────────────────────────────────────

const emit = defineEmits<{
  'row-click': [e: DxRowClickEvent]
  'selection-changed': [e: DxSelectionChangedEvent]
  'focused-row-changed': [e: DxFocusedRowChangedEvent]
  'sort-config-load': [configList: SortFieldItem[]]
  'column-change': [columns: DfTableColumn[]]
  'update': [payload: { key: unknown; values: Record<string, unknown>; items: Record<string, unknown>[] }]
  'content-ready': [e: DxContentReadyEvent]
  'initialized': [e: DxInitializedEvent]
}>()

// ─── DfUIOptions 注入 ──────────────────────────────────────────────

const _dfui = inject(DF_UI_KEY, null)
const slots = useSlots()

// ─── Grid 实例引用 ──────────────────────────────────────────────────

const gridRef = shallowRef<InstanceType<typeof DxDataGrid>>()

function getGridInstance(): DxDataGridInstance | null {
  const instance = (gridRef.value as { $_instance?: DxDataGridInstance })?.$_instance ?? gridRef.value?.instance
  return (instance as DxDataGridInstance | undefined) ?? null
}

// ─── 合并配置 ──────────────────────────────────────────────────────

const mergedPageConfig = computed<Required<PageConfig>>(() => ({
  ...DEFAULT_PAGE_CONFIG,
  ...props.pageConfig,
}))

const mergedSelectConfig = computed(() => ({
  ...DEFAULT_SELECT_CONFIG,
  ...(props.selectionMode && props.selectionMode !== 'none' ? { mode: props.selectionMode } : {}),
  ...props.selectConfig,
}))

const indexConfigSetting = computed<IndexConfig>(() => ({
  ...DEFAULT_INDEX_CONFIG,
  ...props.indexConfig,
}))

// ─── 业务列（含序号列）──────────────────────────────────────────────

const businessColumns = computed<DfTableColumn[]>(() => {
  const cols = [...(props.gridDataColumns ?? props.columns ?? [])]
  return resolvedHasIndex.value
    ? [indexConfigSetting.value as DfTableColumn, ...cols]
    : cols
})

// ─── 列配置持久化 ──────────────────────────────────────────────────

const {
  tableColumns,
  customConfig,
  sortConfig,
  loadColumnConfig,
} = useColumnConfig(props.gridViewName, props.allowColumnConfig, businessColumns)

// ─── 数据仓库 ──────────────────────────────────────────────────────

const {
  gridStore,
  loading,
  initStore,
  refreshPage,
  refreshData,
  exportGetColumns,
  exportFetchApi,
} = useTableStore(props, getGridInstance, sortConfig, () => exportableColumns.value)

// ─── 级联选择 ──────────────────────────────────────────────────────

const {
  handleSelectionChanged: handleCascadeSelection,
  validateCascadeConfig,
  isCascadeEnabled,
} = useTableSelection(
  () => mergedSelectConfig.value,
  getGridInstance,
  () => props.keyExpr,
)

// ─── 计算属性 ──────────────────────────────────────────────────────

const resolvedHasPage = computed(() => props.showPaging ?? props.hasPage ?? true)

const resolvedHasSelect = computed(() => {
  if (props.selectionMode) {
    return props.selectionMode !== 'none'
  }
  return props.hasSelect ?? false
})

const resolvedHasIndex = computed(() => props.hasIndex ?? false)

const permissionChecker = computed(() => _dfui?.permission?.check)

const operationColumnConfig = computed<OperationColumnConfig>(() => ({
  caption: '操作',
  width: props.operationWidth,
  fixed: true,
  fixedPosition: 'right',
  slotName: 'actionColumn',
  visible: true,
  ...props.operationColumn,
}))

const operationSlotName = computed(() => operationColumnConfig.value.slotName ?? 'actionColumn')

const resolvedOperationButtons = computed<OperationButton[]>(() => {
  return operationColumnConfig.value.buttons ?? props.operationButtons ?? []
})

const hasOperationColumn = computed(() => {
  if (!operationColumnConfig.value.visible) return false
  if (!canUsePermission(permissionChecker.value, operationColumnConfig.value.permissionCode)) {
    return false
  }
  return !!slots[operationSlotName.value] || resolvedOperationButtons.value.length > 0
})

const hasRowDetail = computed(() => !!slots.rowDetail)

const finalRowAlternation = computed(() =>
  customConfig.value.rowAlternationEnabled ?? props.rowAlternationEnabled,
)

const finalRemoteOperations = computed(() =>
  props.remoteOperations ?? !!props.useFetch,
)

const resolvedGridStyle = computed(() => {
  const styles: string[] = []

  if (props.gridStyle) {
    styles.push(props.gridStyle)
  }

  if (props.height !== undefined) {
    styles.push(`height: ${normalizeSize(props.height)}`)
  } else if (!props.gridStyle?.includes('height')) {
    styles.push('height: 100%')
  }

  if (props.minHeight !== undefined) {
    styles.push(`min-height: ${normalizeSize(props.minHeight)}`)
  }

  return styles.join('; ')
})

const exportableColumns = computed(() =>
  finalColumns.value.filter((column) => column.allowExporting !== false && !['__index', '__action'].includes(column.dataField)),
)

const columnsWithCellSlot = computed(() =>
  finalColumns.value.filter((column) => !!column.cellSlot),
)

const columnsWithHeaderSlot = computed(() =>
  finalColumns.value.filter((column) => !!column.headerSlot),
)

const columnsWithEditSlot = computed(() =>
  finalColumns.value.filter((column) => !!column.editSlot),
)

/** 最终展示列 = tableColumns 经 makeUpColumn 标准化 + 操作列 */
const finalColumns = computed<DfTableColumn[]>(() => {
  const source = tableColumns.value.length > 0 ? tableColumns.value : businessColumns.value
  if (!source.length) return []

  const cols = source
    .filter((col) => canUsePermission(permissionChecker.value, col.permissionCode))
    .map((col: DfTableColumn) => makeUpColumn(applyDictColumn({ ...col })))

  // 操作按钮列
  if (hasOperationColumn.value) {
    cols.push({
      caption: operationColumnConfig.value.caption,
      dataField: '__action',
      fixed: operationColumnConfig.value.fixed,
      fixedPosition: operationColumnConfig.value.fixedPosition,
      cellTemplate: operationSlotName.value,
      width: operationColumnConfig.value.width,
      renderAsync: true,
      allowEditing: false,
      allowSorting: false,
      allowFiltering: false,
      allowExporting: false,
      showInColumnChooser: false,
    })
  }

  return cols
})

// ─── 生命周期 ──────────────────────────────────────────────────────

onMounted(async () => {
  await loadColumnConfig()
  initStore()

  if (isCascadeEnabled()) {
    validateCascadeConfig()
  }

  // 通知排序配置
  if (sortConfig.value.length) {
    emit('sort-config-load', sortConfig.value)
  }
})

// 监听 gridDataColumns 变化 → 重新加载列配置
watch(
  () => props.gridDataColumns ?? props.columns,
  () => {
    loadColumnConfig()
  },
)

// ─── 事件处理 ──────────────────────────────────────────────────────

function onContentReady(e: DxContentReadyEvent) {
  loading.value = false
  emit('content-ready', e)
}

function onGridInitialized(e: DxInitializedEvent) {
  emit('initialized', e)
}

function onRowUpdated(event: DxRowUpdatedEvent) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const comp = event.component as any
  emit('update', {
    key: event.key,
    values: event.data ?? event.newData ?? {},
    items: comp?.getDataSource?.()?._items ?? [],
  })
}

function onCellPrepared(e: DxCellPreparedEvent) {
  if (e.rowType === 'header' || !e.column?.dataField) return
  const column = finalColumns.value.find(
    (col: DfTableColumn) => col.dataField === e.column!.dataField,
  )
  if (!column) return
  formatCellStyleByCondition(e, column as any)
  applyMergedCellStyle(e, column)
}

function onRowPrepared(event: DxRowPreparedEvent) {
  const { data, rowElement, rowIndex } = event
  if (!data || !rowElement || rowIndex == null) return

  // 用户自定义行 class
  if (props.rowClassName) {
    const className = props.rowClassName({ row: data, rowIndex })
    if (className) {
      rowElement.classList.add(className)
    }
  }

  // 条件行样式
  formatRowStyleByCondition({
    event,
    rowStyles: customConfig.value.rowStyle,
    rowExpression: customConfig.value.rowExpression,
  })
}

function onSelectionChanged(event: DxSelectionChangedEvent) {
  // 级联选择处理
  handleCascadeSelection(event)
  // 冒泡给父组件
  emit('selection-changed', event)
}

function onContextMenuPreparing(e: DxContextMenuPreparingEvent) {
  if (e.target === 'header') {
    e.items = []
    const headerMenus = props.generateHeaderMenu?.(e) ?? []
    for (const menu of headerMenus) {
      e.items.push(menu)
    }
  }

  if (e.target === 'content') {
    e.items = []
    if (!e?.row?.data) return
    const row = e.row.data
    const rowMenus = props.generateRowMenu?.(e) ?? []
    for (const menu of rowMenus) {
      bindMenuRowData(menu, row)
      e.items.push(menu)
    }
  }
}

// ─── 对外方法 ──────────────────────────────────────────────────────

/** 设置当前聚焦行 */
function setCurrentRow(row: Record<string, any> = {}) {
  const instance = getGridInstance()
  if (!instance) return
  const key = row[props.keyExpr]
  if (key && loading.value) {
    setTimeout(() => instance.option('focusedRowKey', key))
  } else {
    instance.option('focusedRowKey', key)
  }
}

/** 全选/全不选 */
async function toggleAllSelection(isSelected: boolean) {
  const instance = getGridInstance()
  if (!instance) return
  if (isSelected) {
    await instance.selectAll()
  } else {
    await instance.deselectAll()
  }
}

/** 获取选中行 Keys */
function getSelectedRowKeys(): unknown[] {
  return getGridInstance()?.getSelectedRowKeys() ?? []
}

/** 获取选中行数据 */
function getSelectedRowsData(): Record<string, unknown>[] {
  return getGridInstance()?.getSelectedRowsData() ?? []
}

/** 更新视图布局 */
function updateDimensions() {
  getGridInstance()?.updateDimensions()
}

defineExpose({
  /** 获取 DevExtreme dxDataGrid 原生实例 */
  getInstance: getGridInstance,
  /** 刷新数据（fetch 模式） */
  refreshPage,
  /** 更新静态数据 */
  refreshData,
  /** 设置当前聚焦行 */
  setCurrentRow,
  /** 全选/全不选 */
  toggleAllSelection,
  /** 获取选中行 Keys */
  getSelectedRowKeys,
  /** 获取选中行数据 */
  getSelectedRowsData,
  /** 更新视图布局 */
  updateDimensions,
  /** 导出：获取列信息 */
  exportGetColumns,
  /** 导出：获取数据 */
  exportFetchApi,
})

function normalizeSize(size: number | string): string {
  return typeof size === 'number' ? `${size}px` : size
}

function applyDictColumn(column: DfTableColumn): DfTableColumn {
  if (!column.dictCode || column.lookup || column.customizeText || !_dfui?.dict) {
    return column
  }

  return {
    ...column,
    customizeText: ({ value }) => _dfui.dict.getLabel(column.dictCode as string, value as string | number),
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function visibleOperationButtons(row: Record<string, unknown>, rowIndex: number): OperationButton[] {
  return resolvedOperationButtons.value.filter((button) => {
    if (!canUsePermission(permissionChecker.value, button.permissionCode)) {
      return false
    }
    return !button.showable || button.showable(row, rowIndex)
  })
}

function getOperationButtonKey(btn: OperationButton, idx: number): string {
  return `${btn.name ?? btn.text ?? idx}`
}

function isOperationButtonDisabled(button: OperationButton, row: Record<string, unknown>, rowIndex: number): boolean {
  if (typeof button.disabled === 'function') {
    return button.disabled(row, rowIndex)
  }
  return !!button.disabled
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function resolveOperationRowIndex(row: any): number {
  return row?.rowIndex ?? row?.dataIndex ?? 0
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getCellSlotBindings(slotProps: any) {
  const scoped = slotProps?.data ?? slotProps ?? {}

  return {
    data: scoped.data ?? scoped,
    value: scoped.value,
    text: scoped.text,
    column: scoped.column ?? slotProps?.column,
    row: scoped,
    rowIndex: scoped.rowIndex ?? slotProps?.rowIndex ?? 0,
    raw: slotProps,
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getHeaderSlotBindings(slotProps: any, column: DfTableColumn) {
  return {
    column,
    data: slotProps?.column ?? column,
    raw: slotProps,
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getEditSlotBindings(slotProps: any) {
  const scoped = slotProps?.data ?? slotProps ?? {}

  return {
    data: scoped.data ?? scoped,
    value: scoped.value,
    setValue: slotProps?.setValue,
    column: scoped.column ?? slotProps?.column,
    row: scoped,
    rowIndex: scoped.rowIndex ?? slotProps?.rowIndex ?? 0,
    raw: slotProps,
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getRowDetailBindings(slotProps: any) {
  return {
    data: slotProps?.data ?? slotProps,
    row: slotProps,
    raw: slotProps,
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getOperationSlotBindings(slotProps: any) {
  const scoped = slotProps?.data ?? slotProps ?? {}
  const rowData = scoped.data ?? scoped

  return {
    data: rowData,
    row: scoped,
    value: scoped.value,
    column: scoped.column ?? slotProps?.column,
    rowIndex: resolveOperationRowIndex(scoped),
    raw: slotProps,
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getOperationRowInfo(slotProps: any): { data: Record<string, unknown>; rowIndex: number } {
  const scoped = slotProps?.data ?? slotProps ?? {}
  const rowData = scoped.data ?? scoped
  return { data: rowData as Record<string, unknown>, rowIndex: resolveOperationRowIndex(scoped) }
}

function applyMergedCellStyle(e: DxCellPreparedEvent, column: DfTableColumn): void {
  if (!column.mergeRule || e.rowType !== 'data' || !e.component || !e.rowIndex || e.rowIndex <= 0) {
    return
  }

  const previousRow = e.component.getVisibleRows?.()?.[e.rowIndex - 1]?.data
  const currentRow = e.data
  if (!previousRow || !currentRow || !e.cellElement) return

  const shouldMerge =
    column.mergeRule === 'same-value'
      ? (currentRow as Record<string, unknown>)[column.dataField] === (previousRow as Record<string, unknown>)[column.dataField]
      : column.mergeRule(currentRow as any, previousRow as any, e.rowIndex)

  if (!shouldMerge) return

  e.cellElement.classList.add('df-dx-table-cell--merged')
  e.cellElement.style.borderTop = '0'
  e.cellElement.style.color = 'transparent'
}
</script>

<style scoped>
.df-dx-table {
  width: 100%;
  position: relative;
}

.df-dx-table__toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
}

.df-dx-table-operation-buttons {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;
}

.df-dx-table-operation-btn {
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  font-size: 12px;
  line-height: 1.5;
  color: var(--df-primary, #337ab7);
  background: none;
  border: none;
  cursor: pointer;
  white-space: nowrap;
}

.df-dx-table-operation-btn:hover {
  color: var(--df-primary-hover, #286090);
  text-decoration: underline;
}

.df-dx-table-operation-btn:disabled {
  color: var(--df-text-secondary, #999);
  cursor: not-allowed;
  text-decoration: none;
}

.df-dx-table-cell--merged {
  user-select: none;
}
</style>
