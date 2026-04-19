/**
 * SessionStorage 缓存工具
 * 支持 TTL 过期、命名空间隔离
 * 来源: df-web-utils/packages/method/index.js cache
 */

interface CacheItem<T = unknown> {
  value: T
  expire: number | null // 过期时间戳, null 表示永不过期
}

const DEFAULT_NAMESPACE = 'df_cache_'

/**
 * 创建带命名空间的缓存实例
 */
export function createCache(namespace = DEFAULT_NAMESPACE) {
  function buildKey(key: string): string {
    return `${namespace}${key}`
  }

  return {
    /**
     * 设置缓存
     * @param key - 缓存键
     * @param value - 缓存值
     * @param ttl - 过期时间 (秒), 不传则永不过期
     */
    set<T>(key: string, value: T, ttl?: number): void {
      const item: CacheItem<T> = {
        value,
        expire: ttl ? Date.now() + ttl * 1000 : null,
      }

      try {
        sessionStorage.setItem(buildKey(key), JSON.stringify(item))
      } catch {
        // sessionStorage 满了, 清理过期数据后重试
        cleanExpired()
        try {
          sessionStorage.setItem(buildKey(key), JSON.stringify(item))
        } catch {
          // 仍然失败则忽略
        }
      }
    },

    /**
     * 获取缓存
     * @returns 缓存值, 过期或不存在返回 null
     */
    get<T = unknown>(key: string): T | null {
      const raw = sessionStorage.getItem(buildKey(key))
      if (!raw) return null

      try {
        const item: CacheItem<T> = JSON.parse(raw)
        if (item.expire !== null && Date.now() > item.expire) {
          sessionStorage.removeItem(buildKey(key))
          return null
        }
        return item.value
      } catch {
        return null
      }
    },

    /**
     * 删除缓存
     */
    remove(key: string): void {
      sessionStorage.removeItem(buildKey(key))
    },

    /**
     * 清空当前命名空间下所有缓存
     */
    clear(): void {
      const keysToRemove: string[] = []
      for (let i = 0; i < sessionStorage.length; i++) {
        const k = sessionStorage.key(i)
        if (k?.startsWith(namespace)) {
          keysToRemove.push(k)
        }
      }
      keysToRemove.forEach((k) => sessionStorage.removeItem(k))
    },
  }

  /** 清理过期缓存 */
  function cleanExpired(): void {
    const now = Date.now()
    const keysToRemove: string[] = []

    for (let i = 0; i < sessionStorage.length; i++) {
      const k = sessionStorage.key(i)
      if (!k?.startsWith(namespace)) continue

      try {
        const item: CacheItem = JSON.parse(sessionStorage.getItem(k) ?? '')
        if (item.expire !== null && now > item.expire) {
          keysToRemove.push(k)
        }
      } catch {
        // 解析失败的也清理掉
        keysToRemove.push(k!)
      }
    }

    keysToRemove.forEach((k) => sessionStorage.removeItem(k))
  }
}

/** 默认缓存实例 */
export const cache = createCache()
