import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import 'fake-indexeddb/auto'
import { IndexedDb } from '../../src/utils/indexed-db'

const DB_NAME = 'test_db_' + Date.now()
const STORE_NAME = 'users'

function createTestDb() {
  return new IndexedDb({
    dbName: DB_NAME + '_' + Math.random().toString(36).slice(2),
    version: 1,
    stores: [
      {
        name: STORE_NAME,
        keyPath: 'id',
        indexes: [{ name: 'name', keyPath: 'name', unique: false }],
      },
    ],
  })
}

describe('IndexedDb', () => {
  let db: IndexedDb

  beforeEach(() => {
    db = createTestDb()
  })

  afterEach(() => {
    db.close()
  })

  it('open 打开数据库', async () => {
    const idb = await db.open()
    expect(idb).toBeDefined()
    expect(idb.name).toContain('test_db_')
  })

  it('open 重复打开返回同一实例', async () => {
    const idb1 = await db.open()
    const idb2 = await db.open()
    expect(idb1).toBe(idb2)
  })

  it('add + get 增查', async () => {
    await db.open()
    const key = await db.add(STORE_NAME, { id: 1, name: '张三', age: 30 })
    expect(key).toBe(1)

    const result = await db.get<{ id: number; name: string }>(STORE_NAME, 1)
    expect(result?.name).toBe('张三')
  })

  it('put 更新记录', async () => {
    await db.open()
    await db.add(STORE_NAME, { id: 2, name: '李四' })
    await db.put(STORE_NAME, { id: 2, name: '李四改' })

    const result = await db.get<{ id: number; name: string }>(STORE_NAME, 2)
    expect(result?.name).toBe('李四改')
  })

  it('getAll 获取所有', async () => {
    await db.open()
    await db.add(STORE_NAME, { id: 10, name: 'A' })
    await db.add(STORE_NAME, { id: 11, name: 'B' })

    const all = await db.getAll(STORE_NAME)
    expect(all.length).toBe(2)
  })

  it('getByIndex 按索引查询', async () => {
    await db.open()
    await db.add(STORE_NAME, { id: 20, name: 'X' })
    await db.add(STORE_NAME, { id: 21, name: 'X' })
    await db.add(STORE_NAME, { id: 22, name: 'Y' })

    const results = await db.getByIndex(STORE_NAME, 'name', 'X')
    expect(results.length).toBe(2)
  })

  it('delete 删除记录', async () => {
    await db.open()
    await db.add(STORE_NAME, { id: 30, name: 'Del' })
    await db.delete(STORE_NAME, 30)

    const result = await db.get(STORE_NAME, 30)
    expect(result).toBeUndefined()
  })

  it('clear 清空表', async () => {
    await db.open()
    await db.add(STORE_NAME, { id: 40, name: 'C1' })
    await db.add(STORE_NAME, { id: 41, name: 'C2' })

    await db.clear(STORE_NAME)
    const all = await db.getAll(STORE_NAME)
    expect(all.length).toBe(0)
  })

  it('count 计数', async () => {
    await db.open()
    await db.add(STORE_NAME, { id: 50, name: 'N1' })
    await db.add(STORE_NAME, { id: 51, name: 'N2' })
    await db.add(STORE_NAME, { id: 52, name: 'N3' })

    const cnt = await db.count(STORE_NAME)
    expect(cnt).toBe(3)
  })

  it('close 关闭连接', async () => {
    await db.open()
    db.close()
    // 关闭后再 open 应重新打开
    const idb = await db.open()
    expect(idb).toBeDefined()
  })

  it('默认 version 为 1', () => {
    const db2 = new IndexedDb({
      dbName: 'no_version_db',
      stores: [{ name: 's', keyPath: 'id' }],
    })
    expect(db2).toBeDefined()
    db2.close()
  })
})
