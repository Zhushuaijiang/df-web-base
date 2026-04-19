# DfScheduler 日程表

基于 DevExtreme 25.2 DxScheduler 封装，支持日/周/工作周/月/议程五种视图，内置资源管理和编辑功能。

> 基于 **DxScheduler** 封装 | 来源：`devextreme-vue/scheduler`

## 医生排班日程

<DemoBlock title="周视图 — 内科医生一周排班">
<div class="demo-frame demo-frame--h480">
  <div style="padding:16px;">
    <div class="demo-section">内科门诊排班 — 本周</div>
    <table class="demo-tbl">
      <thead>
        <tr>
          <th>时段</th>
          <th>周一</th>
          <th>周二</th>
          <th>周三</th>
          <th>周四</th>
          <th>周五</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><span class="demo-text--muted">上午</span><br><span style="font-size:12px; color:#6B7790;">08:00-12:00</span></td>
          <td><span class="demo-tag demo-tag--info">张医生</span><br><span style="font-size:12px;">专家门诊</span></td>
          <td><span class="demo-tag demo-tag--success">李医生</span><br><span style="font-size:12px;">普通门诊</span></td>
          <td><span class="demo-tag demo-tag--info">张医生</span><br><span style="font-size:12px;">专家门诊</span></td>
          <td><span class="demo-tag demo-tag--warning">王医生</span><br><span style="font-size:12px;">专科门诊</span></td>
          <td><span class="demo-tag demo-tag--success">李医生</span><br><span style="font-size:12px;">普通门诊</span></td>
        </tr>
        <tr>
          <td><span class="demo-text--muted">下午</span><br><span style="font-size:12px; color:#6B7790;">14:00-17:00</span></td>
          <td><span class="demo-tag demo-tag--success">李医生</span><br><span style="font-size:12px;">普通门诊</span></td>
          <td><span class="demo-tag demo-tag--warning">王医生</span><br><span style="font-size:12px;">专科门诊</span></td>
          <td><span class="demo-tag demo-tag--success">李医生</span><br><span style="font-size:12px;">普通门诊</span></td>
          <td><span class="demo-tag demo-tag--info">张医生</span><br><span style="font-size:12px;">专家门诊</span></td>
          <td><span class="demo-text--muted" style="font-size:12px;">无排班</span></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
<template #code>

```vue
<template>
  <df-scheduler
    :data-source="schedules"
    :current-date="currentWeekStart"
    current-view="week"
    :start-day-hour="8"
    :end-day-hour="18"
    :resources="[
      {
        fieldExpr: 'doctorId',
        dataSource: [
          { id: 1, text: '张医生', color: '#1e88e5' },
          { id: 2, text: '李医生', color: '#43a047' },
          { id: 3, text: '王医生', color: '#ff7043' },
        ],
        label: '医生',
      }
    ]"
    :height="600"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DfScheduler } from 'df-web-base'
import type { DfAppointment } from 'df-web-base'

const currentWeekStart = ref('2024-06-10')
const schedules = ref<DfAppointment[]>([
  {
    id: 1,
    text: '专家门诊',
    startDate: '2024-06-10 08:00',
    endDate: '2024-06-10 12:00',
    doctorId: 1,
  },
  {
    id: 2,
    text: '普通门诊',
    startDate: '2024-06-10 14:00',
    endDate: '2024-06-10 17:00',
    doctorId: 2,
  },
  {
    id: 3,
    text: '普通门诊',
    startDate: '2024-06-11 08:00',
    endDate: '2024-06-11 12:00',
    doctorId: 2,
  },
  {
    id: 4,
    text: '专科门诊',
    startDate: '2024-06-11 14:00',
    endDate: '2024-06-11 17:00',
    doctorId: 3,
  },
])
</script>
```

</template>
</DemoBlock>

## 手术安排日程

<DemoBlock title="日视图 — 手术室安排">
<div class="demo-frame demo-frame--h480">
  <div style="padding:16px;">
    <div class="demo-section">今日手术安排</div>
    <table class="demo-tbl">
      <thead>
        <tr><th>时间</th><th>手术名称</th><th>主刀医生</th><th>手术室</th><th>状态</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>08:00-10:00</td>
          <td>阑尾切除术</td>
          <td>张主任</td>
          <td>手术室1</td>
          <td><span class="demo-tag demo-tag--success">已完成</span></td>
        </tr>
        <tr>
          <td>10:00-12:00</td>
          <td>胆囊切除术</td>
          <td>李主任</td>
          <td>手术室1</td>
          <td><span class="demo-tag demo-tag--info">进行中</span></td>
        </tr>
        <tr>
          <td>14:00-16:30</td>
          <td>甲状腺切除术</td>
          <td>张主任</td>
          <td>手术室1</td>
          <td><span class="demo-tag demo-tag--warning">待开始</span></td>
        </tr>
        <tr>
          <td>08:30-11:00</td>
          <td>膝关节置换术</td>
          <td>王主任</td>
          <td>手术室2</td>
          <td><span class="demo-tag demo-tag--success">已完成</span></td>
        </tr>
        <tr>
          <td>13:00-15:00</td>
          <td>骨折内固定术</td>
          <td>王主任</td>
          <td>手术室2</td>
          <td><span class="demo-tag demo-tag--warning">待开始</span></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
<template #code>

```vue
<template>
  <df-scheduler
    :data-source="surgeryList"
    current-view="day"
    :start-day-hour="8"
    :end-day-hour="18"
    :cell-duration="15"
    :resources="[
      {
        fieldExpr: 'roomId',
        dataSource: [
          { id: 1, text: '手术室1', color: '#1e88e5' },
          { id: 2, text: '手术室2', color: '#43a047' },
        ],
        label: '手术室',
      }
    ]"
    :height="600"
    @appointment-click="onSurgeryClick"
    @appointment-adding="onSurgeryAdd"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DfScheduler } from 'df-web-base'
import type { DfAppointment } from 'df-web-base'

const surgeryList = ref<DfAppointment[]>([
  {
    id: 1,
    text: '阑尾切除术 — 张主任',
    startDate: '2024-06-10 08:00',
    endDate: '2024-06-10 10:00',
    roomId: 1,
  },
  {
    id: 2,
    text: '胆囊切除术 — 李主任',
    startDate: '2024-06-10 10:00',
    endDate: '2024-06-10 12:00',
    roomId: 1,
  },
  {
    id: 3,
    text: '膝关节置换术 — 王主任',
    startDate: '2024-06-10 08:30',
    endDate: '2024-06-10 11:00',
    roomId: 2,
  },
  {
    id: 4,
    text: '甲状腺切除术 — 张主任',
    startDate: '2024-06-10 14:00',
    endDate: '2024-06-10 16:30',
    roomId: 1,
  },
])

function onSurgeryClick(e: any) {
  console.log('查看手术详情：', e.appointmentData.text)
}

function onSurgeryAdd(e: any) {
  // 可在此处校验手术室是否冲突
  const overlapping = surgeryList.value.filter(
    (s) =>
      s.roomId === e.appointmentData.roomId &&
      new Date(e.appointmentData.startDate) < new Date(s.endDate) &&
      new Date(e.appointmentData.endDate) > new Date(s.startDate)
  )
  if (overlapping.length > 0) {
    e.cancel = true
    alert('该手术室此时段已有手术安排')
  }
}
</script>
```

</template>
</DemoBlock>

## 只读排班表

控制日程的增删改权限。

<DemoBlock title="只读模式 — 科室排班公示">
<div class="demo-frame demo-frame--h300">
  <div style="padding:16px;">
    <div class="demo-section demo-section--tight">护理部排班公示（只读）</div>
    <div style="padding-top:8px; color:#6B7790; font-size:12px;">
      此视图为只读模式，不支持编辑、拖拽和新增
    </div>
    <table class="demo-tbl" style="margin-top:8px;">
      <thead>
        <tr><th>班次</th><th>周一</th><th>周二</th><th>周三</th></tr>
      </thead>
      <tbody>
        <tr>
          <td><span class="demo-text--muted">白班</span></td>
          <td>护士A组</td><td>护士B组</td><td>护士A组</td>
        </tr>
        <tr>
          <td><span class="demo-text--muted">小夜班</span></td>
          <td>护士C</td><td>护士D</td><td>护士C</td>
        </tr>
        <tr>
          <td><span class="demo-text--muted">大夜班</span></td>
          <td>护士E</td><td>护士F</td><td>护士E</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
<template #code>

```vue
<!-- 只读日程表 -->
<df-scheduler :data-source="nurseSchedule" :editing="false" />

<!-- 精细化权限：可查看可拖拽，但禁止新增和删除 -->
<df-scheduler
  :data-source="nurseSchedule"
  :editing="{
    allowAdding: false,
    allowDeleting: false,
    allowUpdating: true,
    allowDragging: true,
  }"
/>
```

</template>
</DemoBlock>

## 通过 ref 操作日程

<DemoBlock title="程序化添加和滚动">
<div class="demo-frame demo-frame--h300">
  <div style="padding:16px;">
    <div class="demo-section">日程操作示例</div>
    <div class="demo-toolbar" style="padding-top:8px;">
      <button style="padding:4px 12px; border:1px solid #E8EBF0; border-radius:4px; background:#fff; cursor:pointer; font-size:12px;">添加急诊排班</button>
      <button style="padding:4px 12px; border:1px solid #E8EBF0; border-radius:4px; background:#fff; cursor:pointer; font-size:12px;">滚动到当前时间</button>
    </div>
    <div style="padding-top:8px; font-size:12px; color:#6B7790;">
      通过 ref 调用 addAppointment / scrollToTime / updateAppointment / deleteAppointment
    </div>
  </div>
</div>
<template #code>

```vue
<template>
  <df-scheduler ref="schedulerRef" :data-source="appointments" />
  <df-button @click="addEmergency">添加急诊排班</df-button>
  <df-button @click="scrollToNow">滚动到当前时间</df-button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DfScheduler } from 'df-web-base'

const schedulerRef = ref<InstanceType<typeof DfScheduler>>()

function addEmergency() {
  schedulerRef.value?.addAppointment({
    text: '急诊加班',
    startDate: new Date(),
    endDate: new Date(Date.now() + 3600000),
  })
}

function scrollToNow() {
  const now = new Date()
  schedulerRef.value?.scrollToTime(now.getHours(), now.getMinutes())
}
</script>
```

</template>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| dataSource | 日程数据源 | `DfAppointment[]` | **必填** |
| currentDate | 当前聚焦日期 | `Date \| string` | `new Date()` |
| currentView | 当前视图模式 | `'day' \| 'week' \| 'workWeek' \| 'month' \| 'agenda'` | `'week'` |
| views | 可切换的视图列表 | `ViewType[]` | `['day', 'week', 'workWeek', 'month']` |
| startDayHour | 时间轴起始小时（0~23） | `number` | `8` |
| endDayHour | 时间轴结束小时（1~24） | `number` | `18` |
| firstDayOfWeek | 每周首日（0=周日, 1=周一, ..., 6=周六） | `0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6` | `1` |
| cellDuration | 单元格时间间隔（分钟） | `number` | `30` |
| height | 组件高度 | `number \| string` | `600` |
| width | 组件宽度 | `number \| string` | `'100%'` |
| editing | 编辑权限配置。`true` 全部允许，`false` 全部禁止，或对象细粒度控制 | `boolean \| EditingConfig` | `true` |
| resources | 资源分组配置 | `DfSchedulerResource[]` | `[]` |
| showAllDayPanel | 是否显示全天日程面板 | `boolean` | `true` |
| showCurrentTimeIndicator | 是否显示当前时间红线 | `boolean` | `true` |
| textExpr | 日程标题字段名 | `string` | `'text'` |
| startDateExpr | 日程开始时间字段名 | `string` | `'startDate'` |
| endDateExpr | 日程结束时间字段名 | `string` | `'endDate'` |
| allDayExpr | 全天日程标记字段名 | `string` | `'allDay'` |

### DfAppointment 类型

```typescript
interface DfAppointment {
  /** 唯一标识 */
  id?: string | number
  /** 日程标题 */
  text: string
  /** 开始时间 */
  startDate: Date | string
  /** 结束时间 */
  endDate: Date | string
  /** 是否全天日程 */
  allDay?: boolean
  /** 备注描述 */
  description?: string
  /** 重复规则（iCalendar RRULE 格式） */
  recurrenceRule?: string
  /** 重复例外日期 */
  recurrenceException?: string
  /** 是否禁用（不可编辑） */
  disabled?: boolean
  /** 扩展字段（如 doctorId, roomId） */
  [key: string]: any
}
```

### DfSchedulerResource 类型

```typescript
interface DfSchedulerResource {
  /** 日程数据中的资源字段名 */
  fieldExpr: string
  /** 资源数据列表 */
  dataSource: any[]
  /** 资源分组标签 */
  label?: string
  /** 资源值字段 */
  valueExpr?: string
  /** 资源显示字段 */
  displayExpr?: string
  /** 资源颜色字段 */
  colorExpr?: string
}
```

### EditingConfig 类型

```typescript
interface EditingConfig {
  allowAdding?: boolean
  allowDeleting?: boolean
  allowUpdating?: boolean
  allowDragging?: boolean
}
```

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| appointment-adding | 日程即将添加时触发（可取消） | `(e: { appointmentData, cancel })` |
| appointment-added | 日程添加完成后触发 | `(e: { appointmentData })` |
| appointment-updating | 日程即将更新时触发（可取消） | `(e: { oldData, newData, cancel })` |
| appointment-updated | 日程更新完成后触发 | `(e: { appointmentData })` |
| appointment-deleting | 日程即将删除时触发（可取消） | `(e: { appointmentData, cancel })` |
| appointment-deleted | 日程删除完成后触发 | `(e: { appointmentData })` |
| appointment-click | 日程被单击 | `(e: { appointmentData, targetedAppointmentData })` |
| appointment-dbl-click | 日程被双击 | `(e: { appointmentData, targetedAppointmentData })` |
| cell-click | 空白单元格被点击 | `(e: { cellData: { startDate, endDate, groups } })` |

### Methods（通过 ref 调用）

| 方法名 | 说明 | 参数 |
|--------|------|------|
| getInstance() | 获取 DevExtreme DxScheduler 原生实例 | -- |
| scrollToTime(hours, minutes, date?) | 滚动时间轴到指定时间 | `hours: number, minutes: number, date?: Date` |
| addAppointment(appointment) | 程序化添加日程 | `appointment: DfAppointment` |
| updateAppointment(target, data) | 程序化更新日程 | `target: DfAppointment, data: Partial<DfAppointment>` |
| deleteAppointment(appointment) | 程序化删除日程 | `appointment: DfAppointment` |

### Slots

| 名称 | 说明 |
|------|------|
| default | 透传到 DxScheduler 内部，可使用 `DxResource`、`DxView` 等子组件扩展 |

## 引入方式

```typescript
import { DfScheduler } from 'df-web-base'
import type { DfSchedulerProps, DfAppointment, DfSchedulerResource } from 'df-web-base'
```

## 与 DevExtreme DxScheduler 的差异

| 特性 | DxScheduler | DfScheduler |
|------|-----------|-----------|
| 字段映射 | 内置 `xxxExpr` props | 相同 |
| 编辑配置 | `<DxEditing>` 子组件 | `editing` prop（对象或布尔值） |
| 资源 | `<DxResource>` 子组件 | `resources` 数组 prop |
| 默认首日 | 周日 (0) | 周一 (1)，更符合中国习惯 |
| 默认工作时间 | 0~24 | 8~18（标准工作时间） |
| 视图标签 | 英文 | 中文（日/周/工作周/月/议程） |

DfScheduler 统一了常用配置为 props，并调整默认值适配国内使用习惯。
