/**
 * 数据仓库组合式函数
 * 替代 dx-table minix/init.js + minix/index.js
 *
 * 依赖翻转：
 * - this.$DxCustomStore → import CustomStore from 'devextreme/data/custom_store'
 * - this.fetchApi(prop) → props.fetchApi（由业务层注入）
 * - window.DFhelper → 不再依赖
 */
import { ref, shallowRef, watch, type Ref, type ShallowRef } from 'vue'
import type { DfTableColumn, DfTableProps, FetchParams, FetchResult, SortFieldItem } from './types'
import type { DxDataGridInstance } from '../../types/devextreme'
import { parseIndex } from './table-utils'

export interface UseTableStoreReturn {
  /** 表格数据源（CustomStore 或静态数组） */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  gridStore: ShallowRef<any>
  /** 加载状态 */
  loading: Ref<boolean>
  /** 是否允许加载 */
  allowLoad: Ref<boolean>
  /** 初始化仓库 */
  initStore: () => void
  /** 刷新（fetch 模式） */
  refreshPage: (firstPage?: boolean) => Promise<void>
  /** 更新数据（静态模式） */
  refreshData: (dataList: Record<string, unknown>[]) => Promise<void>
  /** 获取 grid 实例 */
  getGridInstance: () => DxDataGridInstance | null
  /** 导出时获取列信息 */
  exportGetColumns: () => DfTableColumn[]
  /** 导出时获取数据 */
  exportFetchApi: (query?: Record<string, unknown>) => Promise<FetchResult>
}

export function useTableStore(
  props: DfTableProps,
  getGridInstance: () => DxDataGridInstance | null,
  sortConfig: Ref<SortFieldItem[]>,
  getExportableColumns?: () => DfTableColumn[],
): UseTableStoreReturn {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const gridStore = shallowRef<any>([])
  const loading = ref(true)
  const allowLoad = ref(props.autoLoad !== false)

  /**
   * 执行 fetchApi，构建分页/排序参数
   * 对应 dx-table minix/index.js 的 minixFetchApi
   */
  async function executeFetch(
    loadOptions: unknown,
    extraQuery: Record<string, unknown> = {},
  ): Promise<FetchResult> {
    const handler = props.fetchApi ?? props.fetch
    if (!handler) {
      return { list: [], totalRows: 0 }
    }

    const instance = getGridInstance()
    const pageIndex = (instance?.pageIndex?.() ?? 0) + 1
    const pageSize = instance?.pageSize?.() ?? props.pageConfig?.size ?? 20

    const opts = loadOptions as Record<string, unknown>
    const sortItems = (opts.sort ?? []) as Array<{ selector: string; desc: boolean }>
    const configSortList = sortConfig.value

    // v1 单列排序兼容
    const firstSort = sortItems[0]
    const sort = firstSort
      ? { sortField: firstSort.selector, sortType: firstSort.desc ? 'DESC' as const : 'ASC' as const }
      : {}

    // v2 多列排序
    const sortFieldList: SortFieldItem[] = sortItems.map((s: { selector: string; desc: boolean }) => {
      const origin = configSortList.find((el) => el.sortField === s.selector)
      const customItem = origin?.sortDirection === 'CUSTOM' ? origin : undefined
      return {
        sortField: origin?.aliasDataField ?? s.selector,
        sortType: s.desc ? 'DESC' as const : 'ASC' as const,
        sortPlus: customItem?.customFn,
      }
    })

    const params: FetchParams = {
      pageIndex,
      pageSize,
      ...sort,
      sortFieldList,
      ...extraQuery,
    }

    return handler(params)
  }

  /**
   * 初始化 CustomStore（fetch 模式）或直接赋值（静态模式）
   * 对应 dx-table minix/init.js 的 minixInit
   */
  function initStore(): void {
    if (!props.useFetch) {
      const data = props.dataList ?? props.staticData ?? props.dataSource ?? []
      gridStore.value = props.hasIndex ? parseIndex(data) : data
      return
    }

    // 动态 import CustomStore 避免非 fetch 场景的冗余依赖
    import('devextreme/data/custom_store').then(({ default: CustomStore }) => {
      gridStore.value = new CustomStore({
        key: props.keyExpr,

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        async load(loadOptions: unknown) {
          loading.value = true

          if (!allowLoad.value) {
            return { data: [], totalCount: 0 }
          }

          try {
            const result = await executeFetch(loadOptions)
            const data = props.hasIndex ? parseIndex(result.list) : result.list

            return {
              data,
              totalCount: result.totalRows ?? result.totalCount ?? 0,
            }
          } catch (err) {
            if (import.meta.env.DEV) {
              console.error('[DfTable] load error:', err)
            }
            throw err
          }
        },

        onLoaded() {
          loading.value = false
        },

        async update(key: string | number, values: Record<string, unknown>) {
          if (props.beforeUpdateAction) {
            await props.beforeUpdateAction(key, values)
          }
          // update 事件通过 DxDataGrid 的 @row-updated 冒泡给父组件
        },

        // 合并业务层自定义 store 方法
        ...props.customStore,
      })
    })
  }

  /**
   * 刷新页面（fetch 模式）
   * 对应 dx-table 的 refreshPage
   */
  async function refreshPage(firstPage?: boolean): Promise<void> {
    const instance = getGridInstance()
    if (!instance) return

    if (!allowLoad.value) {
      allowLoad.value = true
      instance.option('focusedRowKey', undefined)
    }

    if (firstPage) {
      instance.pageIndex(0)
      instance.option('focusedRowKey', undefined)
    }

    await instance.refresh()
  }

  /**
   * 更新静态数据
   * 对应 dx-table 的 refreshData
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function refreshData(dataList: Record<string, unknown>[]): Promise<void> {
    allowLoad.value = true
    const instance = getGridInstance()
    instance?.option('focusedRowKey', undefined)

    if (props.useFetch) {
      // fetch 模式下不应调用 refreshData
      if (import.meta.env.DEV) {
        console.warn('[DfTable] useFetch 模式下请使用 refreshPage')
      }
      await refreshPage()
      return
    }

    const data = props.hasIndex ? parseIndex(dataList) : dataList
    gridStore.value = data
  }

  // 监听 dataList 变化（静态模式）
  watch(
    () => props.dataList,
    (nv) => {
      if (props.useFetch) return
      if (!nv) return
      const data = props.hasIndex ? parseIndex(nv) : nv
      gridStore.value = data
    },
  )

  watch(
    () => props.staticData ?? props.dataSource,
    (nv) => {
      if (props.useFetch) return
      if (!nv) return
      const data = props.hasIndex ? parseIndex(nv) : nv
      gridStore.value = data
    },
  )

  // ─── 导出支持（对应 minix/export.js）────────────────────────────

  function exportGetColumns(): DfTableColumn[] {
    if (getExportableColumns) {
      return getExportableColumns()
    }

    const instance = getGridInstance()
    if (!instance) return []
    const columns = (instance.option('columns') as Record<string, unknown>[])
      .filter((e) => !['__index', 'action', '__action'].includes(e.dataField as string))
    return columns.map((col) => instance.columnOption(col.dataField as string)) as unknown as DfTableColumn[]
  }

  async function exportFetchApi(query: Record<string, unknown> = {}): Promise<FetchResult> {
    const instance = getGridInstance()
    if (!instance) return { list: [], totalRows: 0 }

    if (props.useFetch) {
      const dataStore = instance.getDataSource()
      return executeFetch(dataStore._storeLoadOptions ?? {}, query)
    }

    const items = instance.getDataSource()?._items ?? []
    return { list: items, totalRows: items.length, pageCount: 1 }
  }

  return {
    gridStore,
    loading,
    allowLoad,
    initStore,
    refreshPage,
    refreshData,
    getGridInstance,
    exportGetColumns,
    exportFetchApi,
  }
}
