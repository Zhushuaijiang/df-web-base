/**
 * 列配置持久化组合式函数
 * 替代 dx-table getGridViewConfigColumns / parseColumns
 *
 * 依赖翻转：
 * - getList(@/apis/gy-jichufw/datalayout) → DfUIOptions.columnConfig.fetchConfig()
 * - window.DFhelper → DfUIOptions.appContext
 * - localStorage 直接操作 → DfUIOptions.stateManager
 */
import { ref, inject, type Ref } from 'vue'
import { DF_UI_KEY } from '../../install'
import type { DfTableColumn, ColumnConfigItem, CustomConfig, SortFieldItem } from './types'
import { applyColumnConfig } from './table-utils'

export interface UseColumnConfigReturn {
  /** 展示用的最终列（业务列 + 云端配置合并） */
  tableColumns: Ref<DfTableColumn[]>
  /** 原始列配置（含云端信息，用于列配置弹窗） */
  configColumns: Ref<DfTableColumn[]>
  /** 从云端/本地解析出的表格级配置 */
  customConfig: Ref<CustomConfig>
  /** 排序配置 */
  sortConfig: Ref<SortFieldItem[]>
  /** 加载并解析列配置 */
  loadColumnConfig: () => Promise<void>
}

export function useColumnConfig(
  gridViewName: string | undefined,
  allowColumnConfig: boolean,
  businessColumns: Ref<DfTableColumn[]>,
): UseColumnConfigReturn {
  const dfui = inject(DF_UI_KEY)

  const tableColumns = ref<DfTableColumn[]>([])
  const configColumns = ref<DfTableColumn[]>([])
  const customConfig = ref<CustomConfig>({})
  const sortConfig = ref<SortFieldItem[]>([])

  // 缓存远端配置列表，避免重复请求
  let cachedRemoteList: ColumnConfigItem[] | null = null

  async function loadColumnConfig(): Promise<void> {
    // 没有 gridViewName 或不允许配置 → 直接用业务列
    if (!gridViewName || !allowColumnConfig) {
      tableColumns.value = [...businessColumns.value]
      configColumns.value = [...businessColumns.value]
      return
    }

    // 依赖翻转核心：通过 DfUIOptions 的适配器获取列配置
    // 而非直接 import 具体的 API 函数
    const columnConfigAdapter = dfui?.columnConfig
    const appContext = dfui?.appContext

    if (!columnConfigAdapter || !appContext) {
      // 未提供适配器 → 降级为业务列
      if (import.meta.env.DEV) {
        console.warn(
          '[DfTable] columnConfig 或 appContext 适配器未注入，列配置持久化不可用',
        )
      }
      tableColumns.value = [...businessColumns.value]
      configColumns.value = [...businessColumns.value]
      return
    }

    // 1. 先尝试本地缓存
    const localKey = `dx_table_config_${gridViewName}_${appContext.getUserId()}`
    let localConfig: ColumnConfigItem[] | null = null
    try {
      const stored = await dfui.stateManager.load(localKey)
      if (Array.isArray(stored) && stored.length) {
        localConfig = stored
      }
    } catch {
      // 忽略
    }

    // 2. 如果本地有配置，优先使用本地
    if (localConfig?.length) {
      const merged = applyColumnConfig(businessColumns.value, localConfig)
      tableColumns.value = merged
      configColumns.value = [...businessColumns.value]
      extractCustomConfig(localConfig)
      return
    }

    // 3. 否则请求远端配置
    try {
      if (!cachedRemoteList) {
        const appId = appContext.getAppId()
        cachedRemoteList = (await columnConfigAdapter.fetchConfig(gridViewName, 'dxTable', appId)) as unknown as ColumnConfigItem[]
      }

      if (cachedRemoteList?.length) {
        const merged = applyColumnConfig(businessColumns.value, cachedRemoteList)
        tableColumns.value = merged
        configColumns.value = [...businessColumns.value]
        extractCustomConfig(cachedRemoteList)
      } else {
        tableColumns.value = [...businessColumns.value]
        configColumns.value = [...businessColumns.value]
      }
    } catch (err) {
      if (import.meta.env.DEV) {
        console.error('[DfTable] 加载列配置失败:', err)
      }
      tableColumns.value = [...businessColumns.value]
      configColumns.value = [...businessColumns.value]
    }
  }

  /**
   * 从配置列表中提取表格级配置（排序、行交替等）
   */
  function extractCustomConfig(configList: any[]): void {
    // 远端配置可能包含 dataLayout1.guoLvTj 字段，存放 JSON 格式的 customConfig
    for (const item of configList) {
      if (item.dataLayout1?.guoLvTj) {
        try {
          const parsed = JSON.parse(item.dataLayout1.guoLvTj)
          if (parsed.customConfig) {
            customConfig.value = parsed.customConfig
            sortConfig.value = parsed.customConfig.sortConfig ?? []
          }
        } catch {
          // 忽略解析失败
        }
        break
      }
    }
  }

  return {
    tableColumns,
    configColumns,
    customConfig,
    sortConfig,
    loadColumnConfig,
  }
}
