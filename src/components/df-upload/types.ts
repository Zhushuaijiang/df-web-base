export interface UploadFile {
  name: string
  url?: string
  status?: 'ready' | 'uploading' | 'success' | 'fail'
  uid?: string
  size?: number
  raw?: File
}

export interface DfUploadProps {
  action?: string
  headers?: Record<string, string>
  multiple?: boolean
  data?: Record<string, string>
  name?: string
  drag?: boolean
  accept?: string
  autoUpload?: boolean
  showFileList?: boolean
  fileList?: UploadFile[]
  limit?: number
  maxSize?: number
  disabled?: boolean
  tip?: string
  buttonText?: string
  dragText?: string
  httpMethod?: string
  withCredentials?: boolean
  beforeUpload?: (file: File) => boolean | Promise<boolean>
  onExceed?: (files: File[], fileList: UploadFile[]) => void
}

export interface DfUploadEmits {
  'update:fileList': [list: UploadFile[]]
  change: [file: UploadFile, list: UploadFile[]]
  success: [response: any, file: UploadFile, list: UploadFile[]]
  error: [err: any, file: UploadFile, list: UploadFile[]]
  progress: [event: any, file: UploadFile, list: UploadFile[]]
  exceed: [files: File[], list: UploadFile[]]
  remove: [file: UploadFile, list: UploadFile[]]
}
