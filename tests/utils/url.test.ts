import { describe, it, expect } from 'vitest'
import { getUrlParam, getUrlQuery, buildQueryString } from '../../src/utils/url'

describe('url', () => {
  describe('getUrlParam', () => {
    it('从指定 URL 获取参数', () => {
      expect(getUrlParam('name', 'http://localhost/page?name=test&age=20')).toBe('test')
    })

    it('参数不存在返回 null', () => {
      expect(getUrlParam('missing', 'http://localhost/page?foo=bar')).toBeNull()
    })
  })

  describe('getUrlQuery', () => {
    it('获取所有查询参数', () => {
      const params = getUrlQuery('http://localhost/page?a=1&b=2&c=hello')
      expect(params).toEqual({ a: '1', b: '2', c: 'hello' })
    })

    it('无参数返回空对象', () => {
      expect(getUrlQuery('http://localhost/page')).toEqual({})
    })
  })

  describe('buildQueryString', () => {
    it('构建查询字符串', () => {
      const qs = buildQueryString({ page: 1, size: 20, name: 'test' })
      expect(qs).toContain('page=1')
      expect(qs).toContain('size=20')
      expect(qs).toContain('name=test')
      expect(qs.startsWith('?')).toBe(true)
    })

    it('过滤 undefined 值', () => {
      const qs = buildQueryString({ a: '1', b: undefined })
      expect(qs).toContain('a=1')
      expect(qs).not.toContain('b=')
    })

    it('空参数返回空字符串', () => {
      expect(buildQueryString({})).toBe('')
    })

    it('布尔值转字符串', () => {
      const qs = buildQueryString({ active: true })
      expect(qs).toBe('?active=true')
    })
  })
})
