import { inject } from 'vue'
import { DF_UI_KEY } from '../../install'
import type { DfTableColumn } from './types'

/**
 * df-table 外部辅助组合式函数
 * 供消费端使用，提供字典列 lookup 构建、权限列过滤等便捷方法
 */
export function useDfTable() {
  const dfui = inject(DF_UI_KEY)
  if (!dfui) {
    throw new Error('[useDfTable] DfUIOptions 未注入，请确保已调用 app.use(createDfUI(options))')
  }

  const d = dfui

  /**
   * 构建字典列的 DevExtreme lookup 配置
   * 消费端用法：{ ...column, lookup: buildColumnLookup('gender') }
   */
  function buildColumnLookup(dictCode: string) {
    return {
      dataSource: { load: () => d.dict.resolve(dictCode) },
      valueExpr: 'value',
      displayExpr: 'label',
    }
  }

  /**
   * 按权限过滤列
   * 消费端用法：:grid-data-columns="filterColumnsByPermission(columns)"
   */
  function filterColumnsByPermission(columns: DfTableColumn[]): DfTableColumn[] {
    return columns.filter((col) =>
      col.permissionCode ? d.permission.check(col.permissionCode) : true,
    )
  }

  /**
   * 字典值翻译（用于 customizeText）
   */
  function dictCustomizeText(dictCode: string) {
    return ({ value }: { value: any }) => d.dict.getLabel(dictCode, value)
  }

  return {
    dfui: d,
    buildColumnLookup,
    filterColumnsByPermission,
    dictCustomizeText,
  }
}
