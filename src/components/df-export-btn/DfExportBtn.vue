<template>
  <div class="df-export-btn">
    <df-button
      :type="props.btnConfig?.type ?? 'default'"
      :icon="props.btnConfig?.icon"
      @click="openDialog"
    >
      {{ props.btnConfig?.text ?? '导出' }}
    </df-button>

    <!-- 导出配置弹窗 -->
    <df-dialog
      v-model="dialogVisible"
      title="导出配置"
      width="720px"
      custom-class="df-export-file"
      :close-on-click-modal="false"
      @close="handleClose"
    >
      <div class="export-dialog-body">
        <!-- 列选择区域 -->
        <div class="export-columns">
          <div class="group-title">选择导出列</div>
          <div class="extension-group">
            <div class="group-list">
              <div
                v-for="col in exportColumns"
                :key="col.dataField"
                class="list-item"
                :class="{ active: col.checked }"
                @click="toggleColumn(col)"
              >
                <input
                  type="checkbox"
                  :checked="col.checked"
                  style="margin-right: 4px; pointer-events: none"
                />
                {{ col.caption }}
              </div>
            </div>
          </div>
        </div>

        <!-- 分组/小计/合计字段 (如果配置了) -->
        <template v-if="hasGroupConfig">
          <div v-if="props.groupByFields?.length" class="export-columns" style="margin-top: 12px">
            <div class="group-title">分组字段</div>
            <div class="extension-group">
              <div class="group-list">
                <div
                  v-for="field in props.groupByFields"
                  :key="field"
                  class="list-item active"
                >
                  {{ getFieldCaption(field) }}
                </div>
              </div>
            </div>
          </div>

          <div v-if="props.subtotalFields?.length" class="export-columns" style="margin-top: 12px">
            <div class="group-title">小计字段</div>
            <div class="extension-group">
              <div class="group-list">
                <div
                  v-for="field in props.subtotalFields"
                  :key="field"
                  class="list-item active"
                >
                  {{ getFieldCaption(field) }}
                </div>
              </div>
            </div>
          </div>

          <div v-if="props.totalFields?.length" class="export-columns" style="margin-top: 12px">
            <div class="group-title">合计字段</div>
            <div class="extension-group">
              <div class="group-list">
                <div
                  v-for="field in props.totalFields"
                  :key="field"
                  class="list-item active"
                >
                  {{ getFieldCaption(field) }}
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>

      <template #footer>
        <df-button @click="dialogVisible = false">取消</df-button>
        <df-button type="primary" :loading="exporting" @click="handleExport">
          {{ exporting ? '导出中...' : '确认导出' }}
        </df-button>
      </template>
    </df-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useDfUI } from '../../hooks/useDfUI'
import { exportToExcel } from './excel-export'
import type { DfExportBtnProps, ExportColumnItem } from './types'

const props = withDefaults(defineProps<DfExportBtnProps>(), {
  pageSize: 500,
  fileTitle: '导出数据',
  groupByFields: () => [],
  subtotalFields: () => [],
  totalFields: () => [],
})

defineOptions({ name: 'DfExportBtn' })

const { notification } = useDfUI()

const dialogVisible = ref(false)
const exporting = ref(false)
const exportColumns = ref<(ExportColumnItem & { checked: boolean })[]>([])

const hasGroupConfig = computed(
  () =>
    (props.groupByFields?.length ?? 0) > 0 ||
    (props.subtotalFields?.length ?? 0) > 0 ||
    (props.totalFields?.length ?? 0) > 0
)

/** 打开弹窗, 初始化列 */
function openDialog(): void {
  initColumns()
  dialogVisible.value = true
}

/** 初始化列配置 */
function initColumns(): void {
  const columns = props.getColumns?.() ?? []
  exportColumns.value = columns
    .filter((col) => col.dataField && col.visible !== false)
    .map((col) => ({
      dataField: col.dataField!,
      caption: col.caption ?? col.dataField ?? '',
      width: col.width as number | undefined,
      alignment: col.alignment as ExportColumnItem['alignment'],
      dataType: col.dataType,
      checked: true,
    }))
}

/** 切换列选中状态 */
function toggleColumn(col: ExportColumnItem & { checked: boolean }): void {
  col.checked = !col.checked
}

/** 获取字段显示名 */
function getFieldCaption(field: string): string {
  const col = exportColumns.value.find((c) => c.dataField === field)
  return col?.caption ?? field
}

/** 关闭弹窗 */
function handleClose(): void {
  exporting.value = false
}

/** 执行导出 */
async function handleExport(): Promise<void> {
  const selectedColumns = exportColumns.value.filter((col) => col.checked)
  if (selectedColumns.length === 0) {
    notification?.warning('请至少选择一列')
    return
  }

  exporting.value = true

  try {
    let allRows: Record<string, unknown>[] = []

    if (props.dataList && props.dataList.length > 0) {
      // 直接使用传入的数据
      allRows = props.dataList
    } else if (props.fetchApi) {
      // 分页获取全部数据
      allRows = await fetchAllData()
    }

    if (allRows.length === 0) {
      notification?.warning('没有可导出的数据')
      exporting.value = false
      return
    }

    await exportToExcel({
      fileName: props.fileTitle,
      columns: selectedColumns,
      rows: allRows,
      groupByFields: props.groupByFields,
      subtotalFields: props.subtotalFields,
      totalFields: props.totalFields,
      formatItem: props.formatItem,
    })

    notification?.success('导出成功')
    dialogVisible.value = false
  } catch (error) {
    console.error('Export failed:', error)
    notification?.error('导出失败，请重试')
  } finally {
    exporting.value = false
  }
}

/** 分页获取全部数据 */
async function fetchAllData(): Promise<Record<string, unknown>[]> {
  if (!props.fetchApi) return []

  const allRows: Record<string, unknown>[] = []
  let pageIndex = 1
  let hasMore = true

  while (hasMore) {
    const result = await props.fetchApi({
      pageIndex,
      pageSize: props.pageSize,
    })

    if (result.rows && result.rows.length > 0) {
      allRows.push(...result.rows)
      hasMore = allRows.length < result.total
      pageIndex++
    } else {
      hasMore = false
    }
  }

  return allRows
}

watch(dialogVisible, (val) => {
  if (!val) {
    exporting.value = false
  }
})
</script>
