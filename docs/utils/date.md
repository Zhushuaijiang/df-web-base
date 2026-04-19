# Date 日期工具函数

基于 dayjs 的日期格式化与计算函数集，面向医疗场景提供年龄计算、住院天数等特定功能。

## 格式化

```typescript
import { formatDate, formatDateTime, formatTime } from 'df-web-base'

formatDate('2024-01-15')           // '2024-01-15'
formatDate(new Date())             // '2024-01-15'
formatDate('2024-01-15', 'YYYY年MM月DD日') // '2024年01月15日'

formatDateTime('2024-01-15 14:30') // '2024-01-15 14:30:00'
formatTime('2024-01-15 14:30:00')  // '14:30:00'
```

## 年龄计算

```typescript
import { getAge, getAgeText } from 'df-web-base'

getAge('1990-05-20')     // 33（周岁）
getAgeText('2024-01-01') // '0岁15天'
getAgeText('2023-06-15') // '0岁7个月'
getAgeText('1990-05-20') // '33岁'
```

## 日期范围快捷值

```typescript
import { getDateRange } from 'df-web-base'

getDateRange('today')     // ['2024-01-15', '2024-01-15']
getDateRange('yesterday') // ['2024-01-14', '2024-01-14']
getDateRange('thisWeek')  // ['2024-01-15', '2024-01-21']
getDateRange('lastWeek')  // ['2024-01-08', '2024-01-14']
getDateRange('thisMonth') // ['2024-01-01', '2024-01-31']
getDateRange('lastMonth') // ['2023-12-01', '2023-12-31']
getDateRange('thisYear')  // ['2024-01-01', '2024-12-31']
```

## 日期比较

```typescript
import { isSameDay, diffDays, isDateInRange } from 'df-web-base'

isSameDay('2024-01-15', new Date('2024-01-15'))  // true
diffDays('2024-01-10', '2024-01-15')             // 5
isDateInRange('2024-01-15', '2024-01-01', '2024-01-31') // true
```

## 住院天数

```typescript
import { getStayDays } from 'df-web-base'

// 已出院：入院日期到出院日期
getStayDays('2024-01-10', '2024-01-15')  // 5

// 在院：入院日期到今天
getStayDays('2024-01-10')                // 动态计算
```

## API

### formatDate

```typescript
function formatDate(date: DateInput, format?: string): string
```

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| date | 日期值 | `string \| number \| Date \| Dayjs` | **必填** |
| format | 输出格式 | `string` | `'YYYY-MM-DD'` |

### formatDateTime

```typescript
function formatDateTime(date: DateInput, format?: string): string
```

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| date | 日期值 | `DateInput` | **必填** |
| format | 输出格式 | `string` | `'YYYY-MM-DD HH:mm:ss'` |

### formatTime

```typescript
function formatTime(date: DateInput, format?: string): string
```

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| date | 日期值 | `DateInput` | **必填** |
| format | 输出格式 | `string` | `'HH:mm:ss'` |

### getAge

```typescript
function getAge(birthday: DateInput): number
```

返回周岁数（整数）。

### getAgeText

```typescript
function getAgeText(birthday: DateInput): string
```

返回年龄描述文本：
- 不满 1 个月：`'X天'`
- 不满 1 岁：`'X岁X个月'`（实际为 `'0岁X个月'`）
- 1 岁及以上：`'X岁'`

### isSameDay

```typescript
function isSameDay(a: DateInput, b: DateInput): boolean
```

### getDateRange

```typescript
function getDateRange(
  preset: 'today' | 'yesterday' | 'thisWeek' | 'lastWeek' | 'thisMonth' | 'lastMonth' | 'thisYear'
): [string, string]
```

返回 `[startDate, endDate]`，格式为 `'YYYY-MM-DD'`。周计算以周一为首日。

### diffDays

```typescript
function diffDays(start: DateInput, end: DateInput): number
```

返回两个日期之间的天数差（绝对值）。

### getStayDays

```typescript
function getStayDays(admissionDate: DateInput, dischargeDate?: DateInput): number
```

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| admissionDate | 入院日期 | `DateInput` | **必填** |
| dischargeDate | 出院日期。不传则使用当前日期 | `DateInput` | `new Date()` |

### isDateInRange

```typescript
function isDateInRange(date: DateInput, start: DateInput, end: DateInput): boolean
```

判断日期是否在 `[start, end]` 闭区间内。

### DateInput 类型

```typescript
type DateInput = string | number | Date | Dayjs
```

## 引入方式

```typescript
import {
  formatDate,
  formatDateTime,
  formatTime,
  getAge,
  getAgeText,
  isSameDay,
  getDateRange,
  diffDays,
  getStayDays,
  isDateInRange,
} from 'df-web-base'
```
