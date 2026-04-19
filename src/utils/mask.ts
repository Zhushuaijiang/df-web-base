/**
 * 数据脱敏工具函数
 * 适用于患者隐私数据保护场景（姓名、身份证、手机号、地址等）
 *
 * 遵循《个人信息安全规范》(GB/T 35273) 脱敏规则
 */

const MASK = '*'

/**
 * 手机号脱敏：保留前3后4
 * @example maskPhone('13812345678') → '138****5678'
 */
export function maskPhone(phone: string): string {
  if (!phone || phone.length < 7) return phone ?? ''
  const cleaned = phone.replace(/\s/g, '')
  return cleaned.slice(0, 3) + MASK.repeat(4) + cleaned.slice(-4)
}

/**
 * 身份证号脱敏：保留前6后4
 * @example maskIdCard('110101199001011234') → '110101********1234'
 */
export function maskIdCard(idCard: string): string {
  if (!idCard || idCard.length < 10) return idCard ?? ''
  return idCard.slice(0, 6) + MASK.repeat(idCard.length - 10) + idCard.slice(-4)
}

/**
 * 姓名脱敏：保留首字，其余用*
 * @example maskName('张三丰') → '张**'
 */
export function maskName(name: string): string {
  if (!name) return ''
  if (name.length <= 1) return name
  return name[0] + MASK.repeat(name.length - 1)
}

/**
 * 地址脱敏：保留省市，详细地址脱敏
 * @example maskAddress('浙江省杭州市西湖区xxx路xxx号') → '浙江省杭州市****'
 */
export function maskAddress(address: string, keepLength = 6): string {
  if (!address) return ''
  if (address.length <= keepLength) return address
  return address.slice(0, keepLength) + MASK.repeat(4)
}

/**
 * 银行卡号脱敏：保留前4后4
 * @example maskBankCard('6222021234567890') → '6222********7890'
 */
export function maskBankCard(cardNo: string): string {
  if (!cardNo || cardNo.length < 8) return cardNo ?? ''
  const cleaned = cardNo.replace(/\s/g, '')
  return cleaned.slice(0, 4) + MASK.repeat(cleaned.length - 8) + cleaned.slice(-4)
}

/**
 * 邮箱脱敏：保留首字符和@后域名
 * @example maskEmail('zhangsan@hospital.com') → 'z*******@hospital.com'
 */
export function maskEmail(email: string): string {
  if (!email || !email.includes('@')) return email ?? ''
  const [local, domain] = email.split('@')
  if (!local || local.length <= 1) return email
  return local[0] + MASK.repeat(local.length - 1) + '@' + domain
}

/**
 * 医保卡号脱敏：保留前4后4
 */
export function maskInsuranceNo(no: string): string {
  if (!no || no.length < 8) return no ?? ''
  return no.slice(0, 4) + MASK.repeat(no.length - 8) + no.slice(-4)
}

/**
 * 通用脱敏函数
 * @param value 原始值
 * @param keepStart 保留前几位
 * @param keepEnd 保留后几位
 */
export function maskGeneric(value: string, keepStart = 1, keepEnd = 0): string {
  if (!value) return ''
  const len = value.length
  if (len <= keepStart + keepEnd) return value
  const maskLen = len - keepStart - keepEnd
  return value.slice(0, keepStart) + MASK.repeat(maskLen) + value.slice(len - keepEnd || len)
}

/**
 * 按字段类型自动脱敏
 */
export function autoMask(value: string, type: 'phone' | 'idCard' | 'name' | 'address' | 'bankCard' | 'email' | 'insuranceNo'): string {
  const maskFns: Record<string, (v: string) => string> = {
    phone: maskPhone,
    idCard: maskIdCard,
    name: maskName,
    address: maskAddress,
    bankCard: maskBankCard,
    email: maskEmail,
    insuranceNo: maskInsuranceNo,
  }
  return (maskFns[type] ?? maskGeneric)(value)
}
