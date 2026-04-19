/**
 * 级联选择组合式函数
 * 替代 dx-table utils/cascadeSelectHelper.js
 *
 * 依赖翻转：无外部依赖，纯逻辑
 */
import type { SelectConfig, CascadeSelectConfig } from './types'

interface CascadeContext {
  /** 是否正在处理级联（防止递归） */
  processing: boolean
}

export interface UseTableSelectionReturn {
  /** 处理 selection-changed 事件 */
  handleSelectionChanged: (event: any) => void
  /** 验证级联配置是否合法 */
  validateCascadeConfig: () => boolean
  /** 级联是否启用 */
  isCascadeEnabled: () => boolean
}

export function useTableSelection(
  selectConfig: () => SelectConfig | undefined,
  getGridInstance: () => any,
  keyExpr: () => string,
): UseTableSelectionReturn {
  const ctx: CascadeContext = { processing: false }

  function getCascadeConfig(): CascadeSelectConfig | undefined {
    return selectConfig()?.cascadeSelect
  }

  function isCascadeEnabled(): boolean {
    const config = getCascadeConfig()
    return !!config?.enabled && !!config.groupField
  }

  function validateCascadeConfig(): boolean {
    const config = getCascadeConfig()
    if (!config?.enabled) return true

    if (!config.groupField) {
      if (import.meta.env.DEV) {
        console.warn('[DfTable] cascadeSelect.groupField 不能为空')
      }
      return false
    }
    return true
  }

  /**
   * 处理级联选择
   * 当选中/取消一行时，自动联动同组的其他行
   */
  function handleSelectionChanged(event: any): void {
    if (!isCascadeEnabled() || ctx.processing) return

    const config = getCascadeConfig()!
    const instance = getGridInstance()
    if (!instance) return

    const { currentSelectedRowKeys = [], currentDeselectedRowKeys = [] } = event

    // 判断是选中还是取消
    const isSelect = currentSelectedRowKeys.length > 0
    const isDeselect = currentDeselectedRowKeys.length > 0

    // 方向控制
    if (config.direction === 'select' && !isSelect) return
    if (config.direction === 'deselect' && !isDeselect) return

    const changedKeys = isSelect ? currentSelectedRowKeys : currentDeselectedRowKeys
    if (!changedKeys.length) return

    // 获取所有数据
    const allData = instance.getDataSource()?.items?.() ?? []
    if (!allData.length) return

    // 找出被操作行的 groupField 值
    const groupValues = new Set<any>()
    for (const key of changedKeys) {
      const row = allData.find((r: any) => r[keyExpr()] === key)
      if (row && row[config.groupField] !== undefined) {
        groupValues.add(row[config.groupField])
      }
    }

    if (!groupValues.size) return

    // 找出同组的所有 key
    const sameGroupKeys: any[] = []
    for (const row of allData) {
      if (groupValues.has(row[config.groupField])) {
        sameGroupKeys.push(row[keyExpr()])
      }
    }

    // 防递归
    ctx.processing = true
    try {
      if (isSelect) {
        instance.selectRows(sameGroupKeys, true)
      } else {
        instance.deselectRows(sameGroupKeys)
      }
    } finally {
      // 延迟释放锁，等 DevExtreme 事件处理完
      setTimeout(() => {
        ctx.processing = false
      }, 0)
    }
  }

  return {
    handleSelectionChanged,
    validateCascadeConfig,
    isCascadeEnabled,
  }
}
