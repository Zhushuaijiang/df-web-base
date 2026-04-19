/**
 * 树形数据操作工具函数
 * 适用于机构树、科室树、菜单树等常见医疗信息化场景
 */

export interface TreeNode {
  [key: string]: unknown
  children?: TreeNode[]
}

/**
 * 扁平数组转树结构
 * @example
 * ```ts
 * const flat = [
 *   { id: '1', parentId: null, name: '总院' },
 *   { id: '2', parentId: '1', name: '内科' },
 *   { id: '3', parentId: '1', name: '外科' },
 * ]
 * const tree = buildTree(flat, { idKey: 'id', parentKey: 'parentId' })
 * ```
 */
export function buildTree<T extends Record<string, any>>(
  flatList: readonly T[],
  options?: {
    idKey?: string
    parentKey?: string
    childrenKey?: string
    rootValue?: string | number | null
  },
): (T & { children?: T[] })[] {
  const { idKey = 'id', parentKey = 'parentId', childrenKey = 'children', rootValue = null } = options ?? {}

  const map = new Map<string | number, T & Record<string, any>>()
  const result: (T & Record<string, any>)[] = []

  // First pass: index
  for (const item of flatList) {
    map.set(item[idKey], { ...item, [childrenKey]: [] })
  }

  // Second pass: link
  for (const item of flatList) {
    const node = map.get(item[idKey])!
    const parentVal = item[parentKey]

    if (parentVal === rootValue || parentVal === '' || parentVal === undefined) {
      result.push(node)
    } else {
      const parent = map.get(parentVal)
      if (parent) {
        (parent as Record<string, any>)[childrenKey] = [...(parent[childrenKey] ?? []), node]
      } else {
        result.push(node)
      }
    }
  }

  return result
}

/**
 * 树结构转扁平数组
 */
export function flattenTree<T extends Record<string, any>>(
  tree: readonly T[],
  childrenKey = 'children',
): Omit<T, 'children'>[] {
  const result: Omit<T, 'children'>[] = []

  function walk(nodes: readonly T[]) {
    for (const node of nodes) {
      const { [childrenKey]: children, ...rest } = node
      result.push(rest as Omit<T, 'children'>)
      if (Array.isArray(children) && children.length > 0) {
        walk(children)
      }
    }
  }

  walk(tree)
  return result
}

/**
 * 在树中查找节点
 */
export function findTreeNode<T extends Record<string, any>>(
  tree: readonly T[],
  predicate: (node: T) => boolean,
  childrenKey = 'children',
): T | undefined {
  for (const node of tree) {
    if (predicate(node)) return node
    const children = node[childrenKey]
    if (Array.isArray(children)) {
      const found = findTreeNode(children, predicate, childrenKey)
      if (found) return found
    }
  }
  return undefined
}

/**
 * 获取节点的所有祖先路径
 */
export function getTreePath<T extends Record<string, any>>(
  tree: readonly T[],
  predicate: (node: T) => boolean,
  childrenKey = 'children',
): T[] {
  const path: T[] = []

  function walk(nodes: readonly T[]): boolean {
    for (const node of nodes) {
      path.push(node)
      if (predicate(node)) return true
      const children = node[childrenKey]
      if (Array.isArray(children) && walk(children)) return true
      path.pop()
    }
    return false
  }

  walk(tree)
  return path
}

/**
 * 过滤树（保留匹配节点及其祖先链路）
 */
export function filterTree<T extends Record<string, any>>(
  tree: readonly T[],
  predicate: (node: T) => boolean,
  childrenKey = 'children',
): T[] {
  return tree.reduce<T[]>((acc, node) => {
    const children = node[childrenKey]
    const filteredChildren = Array.isArray(children) ? filterTree(children, predicate, childrenKey) : []

    if (predicate(node) || filteredChildren.length > 0) {
      acc.push({
        ...node,
        [childrenKey]: filteredChildren,
      })
    }

    return acc
  }, [])
}

/**
 * 遍历树中的每个节点
 */
export function walkTree<T extends Record<string, any>>(
  tree: readonly T[],
  callback: (node: T, depth: number, parent?: T) => void,
  childrenKey = 'children',
  depth = 0,
  parent?: T,
): void {
  for (const node of tree) {
    callback(node, depth, parent)
    const children = node[childrenKey]
    if (Array.isArray(children)) {
      walkTree(children, callback, childrenKey, depth + 1, node)
    }
  }
}

/**
 * 获取所有叶子节点
 */
export function getLeafNodes<T extends Record<string, any>>(
  tree: readonly T[],
  childrenKey = 'children',
): T[] {
  const leaves: T[] = []
  walkTree(tree, (node) => {
    const children = node[childrenKey]
    if (!Array.isArray(children) || children.length === 0) {
      leaves.push(node)
    }
  }, childrenKey)
  return leaves
}
