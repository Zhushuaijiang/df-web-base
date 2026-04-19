/**
 * 验证规则基础接口
 *
 * 所有验证规则共享的基础属性。每种具体规则类型扩展此接口。
 */
interface DfValidationRuleBase {
  /** 规则类型标识 */
  type: string
  /** 验证失败时显示的消息 */
  message?: string
}

/**
 * 必填验证规则
 *
 * 确保字段不为空。空字符串、null、undefined 均视为无效。
 *
 * @example
 * ```ts
 * const required: DfRequiredRule = {
 *   type: 'required',
 *   message: '此字段为必填项',
 * }
 * ```
 */
export interface DfRequiredRule extends DfValidationRuleBase {
  type: 'required'
  /** 是否将仅包含空格的值视为有效，默认 `false` */
  trim?: boolean
}

/**
 * 数值范围验证规则
 *
 * 验证数值是否在指定范围内。
 *
 * @example
 * ```ts
 * const range: DfRangeRule = {
 *   type: 'range',
 *   min: 0,
 *   max: 150,
 *   message: '年龄必须在 0 到 150 之间',
 * }
 * ```
 */
export interface DfRangeRule extends DfValidationRuleBase {
  type: 'range'
  /** 最小值（包含） */
  min?: number
  /** 最大值（包含） */
  max?: number
  /** 是否允许空值通过验证，默认 `true` */
  allowBlank?: boolean
}

/**
 * 字符串长度验证规则
 *
 * 验证文本值的字符长度是否在指定范围内。
 *
 * @example
 * ```ts
 * const stringLength: DfStringLengthRule = {
 *   type: 'stringLength',
 *   min: 2,
 *   max: 50,
 *   message: '长度必须在 2 到 50 个字符之间',
 * }
 * ```
 */
export interface DfStringLengthRule extends DfValidationRuleBase {
  type: 'stringLength'
  /** 最小长度（包含） */
  min?: number
  /** 最大长度（包含） */
  max?: number
  /** 是否在验证前修剪首尾空格 */
  trim?: boolean
  /** 是否允许空值通过验证，默认 `true` */
  allowBlank?: boolean
}

/**
 * 正则表达式验证规则
 *
 * 使用正则表达式验证值是否匹配指定模式。
 *
 * @example
 * ```ts
 * const pattern: DfPatternRule = {
 *   type: 'pattern',
 *   pattern: /^[a-zA-Z0-9_]+$/,
 *   message: '只允许字母、数字和下划线',
 * }
 * ```
 */
export interface DfPatternRule extends DfValidationRuleBase {
  type: 'pattern'
  /** 正则表达式 */
  pattern: RegExp | string
}

/**
 * 邮箱验证规则
 *
 * 验证值是否为有效的邮箱格式。
 *
 * @example
 * ```ts
 * const email: DfEmailRule = {
 *   type: 'email',
 *   message: '请输入有效的邮箱地址',
 * }
 * ```
 */
export interface DfEmailRule extends DfValidationRuleBase {
  type: 'email'
}

/**
 * 比较验证规则
 *
 * 将当前字段的值与另一个字段或常量值进行比较。
 *
 * @example
 * ```ts
 * // 密码确认
 * const compare: DfCompareRule = {
 *   type: 'compare',
 *   comparisonTarget: () => password.value,
 *   comparisonType: '==',
 *   message: '两次输入的密码不一致',
 * }
 *
 * // 日期不早于今天
 * const dateCompare: DfCompareRule = {
 *   type: 'compare',
 *   comparisonTarget: () => new Date(),
 *   comparisonType: '>=',
 *   message: '日期不能早于今天',
 * }
 * ```
 */
export interface DfCompareRule extends DfValidationRuleBase {
  type: 'compare'
  /** 比较目标值的获取函数 */
  comparisonTarget: () => any
  /**
   * 比较运算符
   * - `'=='` 等于
   * - `'!='` 不等于
   * - `'>'` 大于
   * - `'>='` 大于等于
   * - `'<'` 小于
   * - `'<='` 小于等于
   */
  comparisonType?: '==' | '!=' | '>' | '>=' | '<' | '<='
}

/**
 * 自定义验证规则
 *
 * 使用自定义函数执行验证逻辑。函数返回 true 表示验证通过，
 * 返回字符串表示验证失败（字符串作为错误消息）。
 *
 * @example
 * ```ts
 * const custom: DfCustomRule = {
 *   type: 'custom',
 *   validationCallback: (e) => {
 *     // 身份证号校验
 *     return /^\d{17}[\dXx]$/.test(e.value) || '请输入有效的身份证号'
 *   },
 * }
 * ```
 */
export interface DfCustomRule extends DfValidationRuleBase {
  type: 'custom'
  /** 自定义验证回调函数，返回 true 或错误消息字符串 */
  validationCallback: (e: { value: any; rule: any; validator: any; data: any }) => boolean | string | Promise<boolean | string>
  /** 是否在值改变时重新验证 */
  reevaluate?: boolean
}

/**
 * 异步验证规则
 *
 * 使用异步函数执行验证，适合需要调用后端接口的场景。
 *
 * @example
 * ```ts
 * const asyncRule: DfAsyncRule = {
 *   type: 'async',
 *   validationCallback: async (e) => {
 *     const res = await checkUsername(e.value)
 *     return res.available || '用户名已被占用'
 *   },
 *   message: '验证中...',
 * }
 * ```
 */
export interface DfAsyncRule extends DfValidationRuleBase {
  type: 'async'
  /** 异步验证回调函数 */
  validationCallback: (e: { value: any; rule: any; validator: any; data: any }) => Promise<boolean | string>
}

/**
 * 组合验证规则类型
 *
 * DfValidator 支持的所有验证规则类型的联合类型。
 */
export type DfValidationRule =
  | DfRequiredRule
  | DfRangeRule
  | DfStringLengthRule
  | DfPatternRule
  | DfEmailRule
  | DfCompareRule
  | DfCustomRule
  | DfAsyncRule

/**
 * 验证结果
 *
 * 由 `validate()` 方法返回，包含验证状态和错误信息。
 */
export interface DfValidationResult {
  /** 验证是否通过 */
  isValid: boolean
  /** 验证失败的规则列表 */
  brokenRules?: Array<{
    /** 规则类型 */
    type: string
    /** 错误消息 */
    message: string
    /** 验证器引用 */
    validator: any
  }>
  /** 验证状态：'valid' | 'invalid' | 'pending' */
  status: 'valid' | 'invalid' | 'pending'
}

/**
 * DfValidator 组件属性
 *
 * 验证器用于包裹表单控件，提供声明式验证规则。
 * 需放置在表单控件组件内部，配合 DfValidationGroup 使用。
 *
 * @example
 * ```vue
 * <DfForm>
 *   <DfValidationGroup>
 *     <DfInput v-model="username">
 *       <DfValidator :validation-rules="[
 *         { type: 'required', message: '请输入用户名' },
 *         { type: 'stringLength', min: 3, max: 20, message: '长度需在 3-20 之间' },
 *       ]" />
 *     </DfInput>
 *
 *     <DfInput v-model="email">
 *       <DfValidator :validation-rules="[
 *         { type: 'required', message: '请输入邮箱' },
 *         { type: 'email', message: '邮箱格式不正确' },
 *       ]" />
 *     </DfInput>
 *
 *     <DfValidationSummary />
 *   </DfValidationGroup>
 * </DfForm>
 * ```
 */
export interface DfValidatorProps {
  /**
   * 验证规则列表，按顺序依次执行。
   *
   * 接受 DfValidationRule 类型（提供类型提示和文档）或任意规则数组。
   * 实际运行时传递给 DevExtreme DxValidator 组件。
   *
   * @example
   * ```ts
   * :validation-rules="[
   *   { type: 'required', message: '此字段为必填项' },
   *   { type: 'email', message: '请输入有效的邮箱地址' },
   * ]"
   * ```
   */
  validationRules?: any[]
  /** 验证分组名称，配合 DfValidationGroup 使用 */
  validationGroup?: string
}
