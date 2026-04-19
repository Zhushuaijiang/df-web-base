import { inject, computed } from 'vue'
import { DF_UI_KEY } from '../../install'
import type { DfFormProps, DfFieldConfig } from '../../types/plugin'

/**
 * df-form 核心组合式函数
 * 桥接 DfUIOptions 注入到 DevExtreme DxForm 原生 API
 * 未注入时使用安全默认值（文档/演示模式）
 */
export function useDfForm(props: DfFormProps) {
  const dfui = inject(DF_UI_KEY, null)

  const formDefaults = dfui?.form ?? {}

  const formOptions = computed(() => ({
    labelLocation: formDefaults.labelLocation ?? 'left',
    colCount: props.colCount ?? formDefaults.colCount ?? 2,
    showColonAfterLabel: formDefaults.showColonAfterLabel ?? true,
    labelMode: formDefaults.labelMode ?? 'static',
  }))

  // 字典字段自动转为 DxSelectBox + lookup
  function buildEditorOptions(field: DfFieldConfig) {
    if (field.dictCode && dfui) {
      return {
        editorType: 'dxSelectBox' as const,
        editorOptions: {
          dataSource: { load: () => dfui.dict.resolve(field.dictCode!) },
          valueExpr: 'value',
          displayExpr: 'label',
          searchEnabled: true,
        },
      }
    }
    return {}
  }

  // 权限控制字段可见性（无注入时全部可见）
  function isFieldVisible(field: DfFieldConfig): boolean {
    if (!field.permissionCode) return true
    return dfui ? dfui.permission.check(field.permissionCode) : true
  }

  return { dfui, formOptions, buildEditorOptions, isFieldVisible }
}
