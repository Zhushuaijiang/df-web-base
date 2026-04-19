import { describe, it, expect } from 'vitest'
import {
  DEFAULT_PAGE_SIZES,
  DEFAULT_PAGE_SIZE,
  DICT_CACHE_TTL,
  STATE_SAVE_DELAY,
  MASK_CHAR,
  DATE_FORMAT,
  DATETIME_FORMAT,
  APP_NAME,
  BUS_EVENTS,
} from '../../src/constants'

describe('constants', () => {
  it('DEFAULT_PAGE_SIZES 包含 20/50/100', () => {
    expect(DEFAULT_PAGE_SIZES).toEqual([20, 50, 100])
  })

  it('DEFAULT_PAGE_SIZE 为 20', () => {
    expect(DEFAULT_PAGE_SIZE).toBe(20)
  })

  it('DICT_CACHE_TTL 为 5 分钟', () => {
    expect(DICT_CACHE_TTL).toBe(300000)
  })

  it('STATE_SAVE_DELAY 为 1000ms', () => {
    expect(STATE_SAVE_DELAY).toBe(1000)
  })

  it('MASK_CHAR 为 *', () => {
    expect(MASK_CHAR).toBe('*')
  })

  it('日期格式常量', () => {
    expect(DATE_FORMAT).toBe('YYYY-MM-DD')
    expect(DATETIME_FORMAT).toBe('YYYY-MM-DD HH:mm:ss')
  })

  it('APP_NAME 为 df-web-base', () => {
    expect(APP_NAME).toBe('df-web-base')
  })

  it('BUS_EVENTS 包含所有事件名', () => {
    expect(BUS_EVENTS.GLOBAL_STATE_CHANGE).toBe('globalState:change')
    expect(BUS_EVENTS.TENANT_CHANGE).toBe('tenant:change')
    expect(BUS_EVENTS.DICT_CACHE_CLEAR).toBe('dict:cache:clear')
    expect(BUS_EVENTS.THEME_CHANGE).toBe('theme:change')
  })
})
