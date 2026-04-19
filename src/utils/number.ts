/**
 * 数字处理工具
 * 来源: df-web-utils/packages/method/index.js
 */

/**
 * 数字格式化 (千分位)
 * @param num - 数字或字符串
 * @param decimals - 小数位数 (默认 2)
 */
export function formatNum(num: number | string, decimals = 2): string {
  const n = Number(num)
  if (Number.isNaN(n)) return ''

  const fixed = n.toFixed(decimals)
  const parts = fixed.split('.')
  parts[0] = parts[0]!.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return parts.join('.')
}

/**
 * 数字格式化 (不补零, 保留有效小数)
 * @param num - 数字或字符串
 * @param decimals - 最大小数位数 (默认 2)
 */
export function formatNumDec(num: number | string, decimals = 2): string {
  const n = Number(num)
  if (Number.isNaN(n)) return ''

  const factor = Math.pow(10, decimals)
  const rounded = Math.round(n * factor) / factor
  return rounded.toString()
}

/**
 * 金额转中文大写
 * 来源: df-web-utils ToString
 */
export function amountToChinese(num: number | string): string {
  const n = Number(num)
  if (Number.isNaN(n)) return ''

  if (n === 0) return '零元整'

  const digits = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
  const radices = ['', '拾', '佰', '仟']
  const bigRadices = ['', '万', '亿', '兆']
  const decimalsStr = ['角', '分']

  const isNegative = n < 0
  const absStr = Math.abs(n).toFixed(2)
  const [intPart, decPart] = absStr.split('.')

  let result = ''

  // 整数部分
  if (intPart && Number(intPart) > 0) {
    let zeroCount = 0
    const intLen = intPart.length

    for (let i = 0; i < intLen; i++) {
      const digit = Number(intPart![i])
      const quotient = Math.floor((intLen - i - 1) / 4)
      const modulus = (intLen - i - 1) % 4

      if (digit === 0) {
        zeroCount++
      } else {
        if (zeroCount > 0) {
          result += digits[0]!
        }
        zeroCount = 0
        result += digits[digit]! + radices[modulus]!
      }

      if (modulus === 0 && zeroCount < 4) {
        result += bigRadices[quotient]!
      }
    }

    result += '元'
  }

  // 小数部分
  if (decPart) {
    const jiao = Number(decPart[0]!)
    const fen = Number(decPart[1]!)

    if (jiao === 0 && fen === 0) {
      result += '整'
    } else {
      if (jiao > 0) {
        result += digits[jiao]! + decimalsStr[0]!
      } else if (Number(intPart) > 0) {
        result += digits[0]!
      }
      if (fen > 0) {
        result += digits[fen]! + decimalsStr[1]!
      }
    }
  } else {
    result += '整'
  }

  return isNegative ? `负${result}` : result
}

/**
 * 安全的四则运算 (避免浮点精度问题)
 */
export const safeCalc = {
  add(a: number, b: number): number {
    const precision = Math.max(getDecimalLength(a), getDecimalLength(b))
    const factor = Math.pow(10, precision)
    return (Math.round(a * factor) + Math.round(b * factor)) / factor
  },
  subtract(a: number, b: number): number {
    return safeCalc.add(a, -b)
  },
  multiply(a: number, b: number): number {
    const precA = getDecimalLength(a)
    const precB = getDecimalLength(b)
    const factor = Math.pow(10, precA + precB)
    return (Math.round(a * Math.pow(10, precA)) * Math.round(b * Math.pow(10, precB))) / factor
  },
  divide(a: number, b: number): number {
    if (b === 0) throw new Error('Division by zero')
    const precA = getDecimalLength(a)
    const precB = getDecimalLength(b)
    return (Math.round(a * Math.pow(10, precA)) / Math.round(b * Math.pow(10, precB))) * Math.pow(10, precB - precA)
  },
}

function getDecimalLength(num: number): number {
  const str = String(num)
  const idx = str.indexOf('.')
  return idx === -1 ? 0 : str.length - idx - 1
}
