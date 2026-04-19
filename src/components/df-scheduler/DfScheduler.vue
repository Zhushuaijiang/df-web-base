<template>
  <div class="df-scheduler" :style="containerStyle">
    <DxScheduler
      ref="schedulerRef"
      :data-source="dataSource"
      :current-date="currentDate"
      :current-view="currentView ?? 'week'"
      :start-day-hour="startDayHour ?? 8"
      :end-day-hour="endDayHour ?? 18"
      :first-day-of-week="firstDayOfWeek ?? 1"
      :cell-duration="cellDuration ?? 30"
      :show-all-day-panel="showAllDayPanel ?? true"
      :show-current-time-indicator="showCurrentTimeIndicator ?? true"
      :editing="editing ?? true"
      :text-expr="textExpr ?? 'text'"
      :start-date-expr="startDateExpr ?? 'startDate'"
      :end-date-expr="endDateExpr ?? 'endDate'"
      :all-day-expr="allDayExpr ?? 'allDay'"
      @appointment-adding="$emit('appointment-adding', $event)"
      @appointment-added="$emit('appointment-added', $event)"
      @appointment-updating="$emit('appointment-updating', $event)"
      @appointment-updated="$emit('appointment-updated', $event)"
      @appointment-deleting="$emit('appointment-deleting', $event)"
      @appointment-deleted="$emit('appointment-deleted', $event)"
      @appointment-click="$emit('appointment-click', $event)"
      @appointment-dbl-click="$emit('appointment-dbl-click', $event)"
      @cell-click="$emit('cell-click', $event)"
    >
      <DxView
        v-for="view in availableViews"
        :key="view"
        :type="view"
        :name="viewLabels[view]"
      />

      <DxResource
        v-for="res in resources"
        :key="res.fieldExpr"
        :field-expr="res.fieldExpr"
        :data-source="res.dataSource"
        :label="res.label"
        :value-expr="res.valueExpr ?? 'id'"
        :display-expr="res.displayExpr ?? 'text'"
        :color-expr="res.colorExpr ?? 'color'"
      />

      <slot />
    </DxScheduler>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, type PropType } from 'vue'
import { DxScheduler, DxView, DxResource } from 'devextreme-vue/scheduler'
import type { DfAppointment, DfSchedulerResource } from './types'

type ViewType = 'day' | 'week' | 'workWeek' | 'month' | 'agenda'

const props = defineProps({
  dataSource: { type: Array as PropType<DfAppointment[]>, required: true },
  currentDate: { type: [Date, String] as PropType<Date | string>, default: () => new Date() },
  currentView: { type: String as PropType<ViewType>, default: 'week' },
  views: { type: Array as PropType<ViewType[]>, default: () => ['day', 'week', 'workWeek', 'month'] },
  startDayHour: { type: Number, default: 8 },
  endDayHour: { type: Number, default: 18 },
  firstDayOfWeek: { type: Number as PropType<0 | 1 | 2 | 3 | 4 | 5 | 6>, default: 1 },
  cellDuration: { type: Number, default: 30 },
  height: { type: [Number, String], default: 600 },
  width: { type: [Number, String], default: '100%' },
  editing: { type: [Boolean, Object], default: true },
  resources: { type: Array as PropType<DfSchedulerResource[]>, default: () => [] },
  showAllDayPanel: { type: Boolean, default: true },
  showCurrentTimeIndicator: { type: Boolean, default: true },
  textExpr: { type: String, default: 'text' },
  startDateExpr: { type: String, default: 'startDate' },
  endDateExpr: { type: String, default: 'endDate' },
  allDayExpr: { type: String, default: 'allDay' },
})

defineEmits<{
  'appointment-adding': [e: any]
  'appointment-added': [e: any]
  'appointment-updating': [e: any]
  'appointment-updated': [e: any]
  'appointment-deleting': [e: any]
  'appointment-deleted': [e: any]
  'appointment-click': [e: any]
  'appointment-dbl-click': [e: any]
  'cell-click': [e: any]
}>()

const schedulerRef = ref()

const viewLabels: Record<ViewType, string> = {
  day: '日',
  week: '周',
  workWeek: '工作周',
  month: '月',
  agenda: '议程',
}

const availableViews = computed(() => props.views)

const containerStyle = computed(() => ({
  height: typeof props.height === 'number' ? `${props.height}px` : props.height,
  width: typeof props.width === 'number' ? `${props.width}px` : props.width,
}))

function getInstance() {
  return schedulerRef.value?.instance
}

function scrollToTime(hours: number, minutes: number, date?: Date) {
  getInstance()?.scrollToTime(hours, minutes, date)
}

function addAppointment(appointment: DfAppointment) {
  getInstance()?.addAppointment(appointment)
}

function updateAppointment(target: DfAppointment, data: Partial<DfAppointment>) {
  getInstance()?.updateAppointment(target, data)
}

function deleteAppointment(appointment: DfAppointment) {
  getInstance()?.deleteAppointment(appointment)
}

defineExpose({ getInstance, scrollToTime, addAppointment, updateAppointment, deleteAppointment })
</script>

<style scoped>
.df-scheduler {
  width: 100%;
}
</style>
