/**
 * 字典/过滤器工具
 * 来源: df-web-utils/packages/filters/index.js
 */

/**
 * 从列表中按 key 匹配项, 返回对应显示值
 * 典型场景: 字典翻译、状态码转文字
 *
 * @param value - 待匹配的值
 * @param list - 数据列表
 * @param valueKey - 匹配字段, 默认 'value'
 * @param labelKey - 显示字段, 默认 'label'
 * @returns 匹配到的显示值, 未匹配返回原值
 */
export function filterValueByKey(
  value: string | number | null | undefined,
  list: Record<string, any>[],
  valueKey = 'value',
  labelKey = 'label',
): string {
  if (value == null || value === '') return ''
  const item = list.find((it) => String(it[valueKey]) === String(value))
  return item ? String(item[labelKey] ?? '') : String(value)
}

/**
 * 批量字典翻译
 * 将逗号分隔的多个值逐一翻译后拼接
 */
export function filterMultiValueByKey(
  value: string | null | undefined,
  list: Record<string, any>[],
  valueKey = 'value',
  labelKey = 'label',
  separator = ',',
): string {
  if (!value) return ''
  return value
    .split(separator)
    .map((v) => filterValueByKey(v.trim(), list, valueKey, labelKey))
    .join(separator)
}

/**
 * 将列表转换为 Map, 加速后续查找
 */
export function listToMap<T extends Record<string, any>>(
  list: T[],
  valueKey = 'value',
  labelKey = 'label',
): Map<string, string> {
  const map = new Map<string, string>()
  for (const item of list) {
    map.set(String(item[valueKey]), String(item[labelKey] ?? ''))
  }
  return map
}
