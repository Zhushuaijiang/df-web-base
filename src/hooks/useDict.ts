import { inject, ref } from 'vue'
import { DF_UI_KEY } from '../install'
import type { DictItem } from '../types/plugin'

/**
 * 字典解析组合式函数
 */
export function useDict(dictCode: string) {
  const dfui = inject(DF_UI_KEY)
  if (!dfui) {
    throw new Error('[useDict] DfUIOptions 未注入')
  }

  const d = dfui
  const items = ref<DictItem[]>([])
  const loading = ref(false)

  async function load() {
    loading.value = true
    try {
      items.value = await d.dict.resolve(dictCode)
    } finally {
      loading.value = false
    }
  }

  function getLabel(value: string | number): string {
    return d.dict.getLabel(dictCode, value)
  }

  // 自动加载
  load()

  return { items, loading, load, getLabel }
}
