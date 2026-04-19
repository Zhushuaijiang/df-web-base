# Mask 数据脱敏工具

遵循 GB/T 35273《信息安全技术 个人信息安全规范》的数据脱敏函数集。

## 基础用法

```typescript
import { maskPhone, maskIdCard, maskName } from 'df-web-base'

maskPhone('13812345678')           // '138****5678'
maskIdCard('110101199001011234')   // '110101********1234'
maskName('张三丰')                  // '张**'
```

## 所有脱敏函数

```typescript
import {
  maskPhone,
  maskIdCard,
  maskName,
  maskAddress,
  maskBankCard,
  maskEmail,
  maskInsuranceNo,
  maskGeneric,
  autoMask,
} from 'df-web-base'

// 手机号：保留前3后4
maskPhone('13812345678')               // '138****5678'

// 身份证：保留前6后4
maskIdCard('110101199001011234')        // '110101********1234'
maskIdCard('110101990010112')           // '110101******112'（15位旧身份证）

// 姓名：保留首字
maskName('张三')                        // '张*'
maskName('张三丰')                      // '张**'
maskName('欧阳明')                      // '欧**'

// 地址：保留前 N 个字符
maskAddress('北京市朝阳区某某路100号')     // '北京市朝阳***'
maskAddress('上海市浦东新区', 4)          // '上海市浦***'

// 银行卡：保留前4后4
maskBankCard('6222021234567890')        // '6222********7890'

// 邮箱：用户名部分脱敏
maskEmail('zhangsan@hospital.com')     // 'z*******@hospital.com'

// 医保号：保留前4后4
maskInsuranceNo('YB12345678')          // 'YB12****5678'

// 通用脱敏：指定保留前/后字符数
maskGeneric('ABCDEFGH', 2, 2)          // 'AB****GH'
maskGeneric('ABCDEFGH', 1, 0)          // 'A*******'
```

## autoMask 自动脱敏

根据 `type` 参数自动选择对应的脱敏函数。

```typescript
import { autoMask } from 'df-web-base'

autoMask('13812345678', 'phone')              // '138****5678'
autoMask('110101199001011234', 'idCard')      // '110101********1234'
autoMask('张三丰', 'name')                     // '张**'
autoMask('北京市朝阳区某某路100号', 'address') // '北京市朝阳***'
autoMask('6222021234567890', 'bankCard')      // '6222********7890'
autoMask('zhangsan@hospital.com', 'email')    // 'z*******@hospital.com'
autoMask('YB12345678', 'insuranceNo')         // 'YB12****5678'
```

## 在表格中使用

配合 DfTable 的列模板脱敏显示：

```vue
<df-table :grid-data-columns="columns" :data-list="patients">
  <template #phoneColumn="{ data }">
    {{ maskPhone(data.phone) }}
  </template>
  <template #idCardColumn="{ data }">
    {{ maskIdCard(data.idCard) }}
  </template>
</df-table>
```

## API

### maskPhone

```typescript
function maskPhone(phone: string): string
```

保留前 3 位和后 4 位，中间替换为 `****`。输入不合法时原样返回。

### maskIdCard

```typescript
function maskIdCard(idCard: string): string
```

- 18 位：保留前 6 位和后 4 位（`110101********1234`）
- 15 位：保留前 6 位和后 3 位（`110101******112`）
- 其他长度：原样返回

### maskName

```typescript
function maskName(name: string): string
```

保留首字，其余替换为 `*`。空字符串原样返回。

### maskAddress

```typescript
function maskAddress(address: string, keepLength?: number): string
```

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| address | 地址字符串 | `string` | **必填** |
| keepLength | 保留前几个字符 | `number` | `6` |

### maskBankCard

```typescript
function maskBankCard(cardNo: string): string
```

保留前 4 位和后 4 位，中间替换为 `****`。

### maskEmail

```typescript
function maskEmail(email: string): string
```

用户名部分保留首字符，其余替换为 `*`，域名部分完整保留。

### maskInsuranceNo

```typescript
function maskInsuranceNo(no: string): string
```

保留前 4 位和后 4 位，中间替换为 `****`。

### maskGeneric

```typescript
function maskGeneric(value: string, keepStart?: number, keepEnd?: number): string
```

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| value | 待脱敏字符串 | `string` | **必填** |
| keepStart | 保留前几位 | `number` | `1` |
| keepEnd | 保留后几位 | `number` | `0` |

### autoMask

```typescript
function autoMask(
  value: string,
  type: 'phone' | 'idCard' | 'name' | 'address' | 'bankCard' | 'email' | 'insuranceNo'
): string
```

根据 `type` 自动调用对应的脱敏函数。

## 引入方式

```typescript
import {
  maskPhone,
  maskIdCard,
  maskName,
  maskAddress,
  maskBankCard,
  maskEmail,
  maskInsuranceNo,
  maskGeneric,
  autoMask,
} from 'df-web-base'
```
