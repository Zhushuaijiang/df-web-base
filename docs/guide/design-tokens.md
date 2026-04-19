# 设计规范

df-web-base 遵循统一的 HIS 医疗系统设计规范。

## 色彩系统

| 变量 | 色值 | 用途 |
|------|------|------|
| `--df-color-primary` | `#2AA890` | 主色（医疗专用青色） |
| `--df-color-success` | `#52C41A` | 成功 |
| `--df-color-warning` | `#FAAD14` | 警告 |
| `--df-color-danger` | `#F5222D` | 危险/错误 |
| `--df-color-info` | `#1890FF` | 信息 |
| `--df-text-primary` | `#1A2030` | 主要文字 |
| `--df-text-regular` | `#4A5568` | 常规文字 |
| `--df-text-secondary` | `#8C95A6` | 次要文字 |
| `--df-text-placeholder` | `#B0B8C9` | 占位符文字 |
| `--df-bg-page` | `#E9E9EC` | 页面背景 |
| `--df-bg-card` | `#FFFFFF` | 卡片背景 |
| `--df-border-light` | `#E4E7EB` | 浅色边框 |

## 间距系统

基础间距单位：**4px**

| Token | 值 | 用途 |
|-------|-----|------|
| `--df-spacing-xs` | 4px | 最小间距 |
| `--df-spacing-sm` | 8px | 紧凑间距 |
| `--df-spacing-md` | 12px | 标准间距 |
| `--df-spacing-lg` | 16px | 宽松间距 |
| `--df-spacing-xl` | 24px | 大间距 |

## 圆角

| Token | 值 | 用途 |
|-------|-----|------|
| `--df-radius-sm` | 2px | 小型元素 |
| `--df-radius-base` | 4px | 按钮、输入框 |
| `--df-radius-lg` | 8px | 卡片、弹框 |
| `--df-radius-round` | 20px | 胶囊型元素 |

## 字体

| Token | 值 |
|-------|-----|
| `--df-font-size-xs` | 12px |
| `--df-font-size-sm` | 13px |
| `--df-font-size-base` | 14px |
| `--df-font-size-lg` | 16px |
| `--df-font-size-xl` | 18px |
| `--df-font-size-xxl` | 20px |

## 阴影

| Token | 值 |
|-------|-----|
| `--df-shadow-sm` | `0 1px 2px rgba(0,0,0,0.06)` |
| `--df-shadow-base` | `0 2px 8px rgba(0,0,0,0.08)` |
| `--df-shadow-lg` | `0 4px 16px rgba(0,0,0,0.12)` |

## 尺寸规范

### 按钮尺寸

| 尺寸 | 高度 | 内边距 | 字号 |
|------|------|--------|------|
| large | 40px | 16px 20px | 16px |
| default | 32px | 8px 16px | 14px |
| small | 28px | 4px 12px | 13px |
| mini | 24px | 2px 8px | 12px |

### 输入框尺寸

| 尺寸 | 高度 |
|------|------|
| large | 40px |
| default | 32px |
| small | 28px |

### 弹框尺寸预设

| 预设 | 宽度 |
|------|------|
| sm | 480px |
| md | 640px |
| lg | 960px |
| xl | 1200px |
| fullscreen | 100vw × 100vh |
