/**
 * IndexedDB 封装
 * 来源: df-web-utils/packages/indexedDb/index.js
 */

export interface IndexedDbStore {
  name: string
  keyPath: string
  indexes?: Array<{
    name: string
    keyPath: string
    unique?: boolean
  }>
}

export interface IndexedDbConfig {
  dbName: string
  version?: number
  stores: IndexedDbStore[]
}

export class IndexedDb {
  private db: IDBDatabase | null = null
  private readonly config: IndexedDbConfig

  constructor(config: IndexedDbConfig) {
    this.config = { ...config, version: config.version ?? 1 }
  }

  /**
   * 打开/初始化数据库
   */
  async open(): Promise<IDBDatabase> {
    if (this.db) return this.db

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.config.dbName, this.config.version)

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result
        for (const store of this.config.stores) {
          if (!db.objectStoreNames.contains(store.name)) {
            const objectStore = db.createObjectStore(store.name, { keyPath: store.keyPath })
            store.indexes?.forEach((idx) => {
              objectStore.createIndex(idx.name, idx.keyPath, { unique: idx.unique ?? false })
            })
          }
        }
      }

      request.onsuccess = (event) => {
        this.db = (event.target as IDBOpenDBRequest).result
        resolve(this.db)
      }

      request.onerror = () => {
        reject(new Error(`Failed to open IndexedDB: ${this.config.dbName}`))
      }
    })
  }

  /**
   * 获取事务中的 ObjectStore
   */
  private async getStore(storeName: string, mode: IDBTransactionMode = 'readonly'): Promise<IDBObjectStore> {
    const db = await this.open()
    const tx = db.transaction(storeName, mode)
    return tx.objectStore(storeName)
  }

  /**
   * 新增记录
   */
  async add<T>(storeName: string, data: T): Promise<IDBValidKey> {
    const store = await this.getStore(storeName, 'readwrite')
    return new Promise((resolve, reject) => {
      const request = store.add(data)
      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  }

  /**
   * 更新记录（存在则更新，不存在则新增）
   */
  async put<T>(storeName: string, data: T): Promise<IDBValidKey> {
    const store = await this.getStore(storeName, 'readwrite')
    return new Promise((resolve, reject) => {
      const request = store.put(data)
      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  }

  /**
   * 按主键获取
   */
  async get<T = unknown>(storeName: string, key: IDBValidKey): Promise<T | undefined> {
    const store = await this.getStore(storeName)
    return new Promise((resolve, reject) => {
      const request = store.get(key)
      request.onsuccess = () => resolve(request.result as T | undefined)
      request.onerror = () => reject(request.error)
    })
  }

  /**
   * 获取全部记录
   */
  async getAll<T = unknown>(storeName: string): Promise<T[]> {
    const store = await this.getStore(storeName)
    return new Promise((resolve, reject) => {
      const request = store.getAll()
      request.onsuccess = () => resolve(request.result as T[])
      request.onerror = () => reject(request.error)
    })
  }

  /**
   * 按索引查询
   */
  async getByIndex<T = unknown>(storeName: string, indexName: string, value: IDBValidKey): Promise<T[]> {
    const store = await this.getStore(storeName)
    const index = store.index(indexName)
    return new Promise((resolve, reject) => {
      const request = index.getAll(value)
      request.onsuccess = () => resolve(request.result as T[])
      request.onerror = () => reject(request.error)
    })
  }

  /**
   * 按主键删除
   */
  async delete(storeName: string, key: IDBValidKey): Promise<void> {
    const store = await this.getStore(storeName, 'readwrite')
    return new Promise((resolve, reject) => {
      const request = store.delete(key)
      request.onsuccess = () => resolve()
      request.onerror = () => reject(request.error)
    })
  }

  /**
   * 清空表
   */
  async clear(storeName: string): Promise<void> {
    const store = await this.getStore(storeName, 'readwrite')
    return new Promise((resolve, reject) => {
      const request = store.clear()
      request.onsuccess = () => resolve()
      request.onerror = () => reject(request.error)
    })
  }

  /**
   * 记录总数
   */
  async count(storeName: string): Promise<number> {
    const store = await this.getStore(storeName)
    return new Promise((resolve, reject) => {
      const request = store.count()
      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  }

  /**
   * 关闭数据库连接
   */
  close(): void {
    this.db?.close()
    this.db = null
  }
}
