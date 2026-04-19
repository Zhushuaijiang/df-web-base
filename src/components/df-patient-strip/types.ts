export interface PatientInfo {
  /** 患者姓名 */
  name: string
  /** 性别 */
  gender?: string
  /** 年龄 */
  age?: string
  /** 床号 */
  bedNo?: string
  /** 住院号 */
  admissionNo?: string
  /** 门诊号 */
  outpatientNo?: string
  /** 科室 */
  department?: string
  /** 诊断 */
  diagnosis?: string
  /** 医保类型 */
  insuranceType?: string
  /** 过敏信息 */
  allergy?: string
  /** 主治医师 */
  doctor?: string
  /** 入院日期 */
  admissionDate?: string
  /** 自定义标签 */
  tags?: Array<{ text: string; type?: 'success' | 'warning' | 'danger' | 'info' }>
}

export interface DfPatientStripProps {
  /** 患者信息对象 */
  patient: PatientInfo
  /** 紧凑模式 */
  compact?: boolean
  /** 是否可点击 */
  clickable?: boolean
}
