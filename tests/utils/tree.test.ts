import { describe, it, expect } from 'vitest'
import {
  buildTree,
  flattenTree,
  findTreeNode,
  getTreePath,
  filterTree,
  walkTree,
  getLeafNodes,
} from '../../src/utils/tree'

describe('tree utils', () => {
  const flatData = [
    { id: '1', parentId: null, name: '总院' },
    { id: '2', parentId: '1', name: '内科' },
    { id: '3', parentId: '1', name: '外科' },
    { id: '4', parentId: '2', name: '消化内科' },
    { id: '5', parentId: '2', name: '呼吸内科' },
    { id: '6', parentId: '3', name: '骨科' },
  ]

  const treeData = buildTree(flatData, { idKey: 'id', parentKey: 'parentId' })

  describe('buildTree', () => {
    it('should convert flat array to tree', () => {
      expect(treeData).toHaveLength(1)
      expect(treeData[0].name).toBe('总院')
      expect(treeData[0].children).toHaveLength(2)
    })

    it('should handle empty array', () => {
      expect(buildTree([])).toEqual([])
    })

    it('should handle flat data with missing parent', () => {
      const data = [
        { id: '1', parentId: null, name: 'A' },
        { id: '2', parentId: '999', name: 'B' },
      ]
      const tree = buildTree(data)
      expect(tree).toHaveLength(2) // orphan goes to root
    })

    it('should use custom keys', () => {
      const data = [
        { code: 'A', pCode: '', label: 'Root' },
        { code: 'B', pCode: 'A', label: 'Child' },
      ]
      const tree = buildTree(data, { idKey: 'code', parentKey: 'pCode', rootValue: '' })
      expect(tree).toHaveLength(1)
      expect(tree[0].children).toHaveLength(1)
    })
  })

  describe('flattenTree', () => {
    it('should flatten tree to array', () => {
      const flat = flattenTree(treeData)
      expect(flat).toHaveLength(6)
    })

    it('should handle empty tree', () => {
      expect(flattenTree([])).toEqual([])
    })
  })

  describe('findTreeNode', () => {
    it('should find a node by predicate', () => {
      const node = findTreeNode(treeData, (n) => n.name === '消化内科')
      expect(node).toBeDefined()
      expect(node!.id).toBe('4')
    })

    it('should return undefined if not found', () => {
      expect(findTreeNode(treeData, (n) => n.name === '不存在')).toBeUndefined()
    })
  })

  describe('getTreePath', () => {
    it('should return path from root to target', () => {
      const path = getTreePath(treeData, (n) => n.id === '4')
      expect(path.map((n) => n.name)).toEqual(['总院', '内科', '消化内科'])
    })

    it('should return empty if not found', () => {
      expect(getTreePath(treeData, (n) => n.id === '999')).toEqual([])
    })
  })

  describe('filterTree', () => {
    it('should filter and preserve ancestor chain', () => {
      const filtered = filterTree(treeData, (n) => n.name === '骨科')
      expect(filtered).toHaveLength(1) // 总院
      expect(filtered[0].children).toHaveLength(1) // 外科
      expect(filtered[0].children![0].children).toHaveLength(1) // 骨科
    })

    it('should return empty if nothing matches', () => {
      expect(filterTree(treeData, () => false)).toEqual([])
    })
  })

  describe('walkTree', () => {
    it('should visit all nodes with depth', () => {
      const visited: { name: string; depth: number }[] = []
      walkTree(treeData, (node, depth) => {
        visited.push({ name: node.name, depth })
      })
      expect(visited).toHaveLength(6)
      expect(visited[0]).toEqual({ name: '总院', depth: 0 })
      expect(visited[1]).toEqual({ name: '内科', depth: 1 })
    })
  })

  describe('getLeafNodes', () => {
    it('should return only leaf nodes', () => {
      const leaves = getLeafNodes(treeData)
      const names = leaves.map((n) => n.name)
      expect(names).toContain('消化内科')
      expect(names).toContain('呼吸内科')
      expect(names).toContain('骨科')
      expect(names).not.toContain('总院')
      expect(names).not.toContain('内科')
    })
  })
})
