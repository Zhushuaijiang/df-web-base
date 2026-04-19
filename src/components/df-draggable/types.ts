export interface DfDraggableProps {
  group?: string
  clone?: boolean
  handle?: string
  dragDirection?: 'both' | 'horizontal' | 'vertical'
  boundZone?: (element: HTMLElement) => boolean
  immediate?: boolean
}

export interface DfDraggableEmits {
  'drag-start': [e: any]
  'drag-move': [e: any]
  'drag-end': [e: any]
}
