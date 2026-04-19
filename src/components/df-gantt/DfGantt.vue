<template>
  <div class="df-gantt">
    <DxGantt
      ref="dxRef"
      :tasks="tasks"
      :dependencies="dependencies"
      :resources="resources"
      :resource-assignments="resourceAssignments"
      :columns="columns"
      :scale-type="scaleType"
      :title-position="titlePosition"
      :show-resources="showResources"
      :show-row-lines="showRowLines"
      :show-borders="showBorders"
      :allow-selection="allowSelection"
      :selected-row-key="selectedRowKey"
      :task-title-position="taskTitlePosition"
      :task-list-width="taskListWidth"
      :task-content-template="$slots.taskContent ? 'taskContentTpl' : undefined"
      :first-day-of-week="firstDayOfWeek"
      :width="width"
      :height="height"
      @selection-changed="$emit('selection-changed', $event)"
      @task-click="$emit('task-click', $event)"
      @task-dbl-click="$emit('task-dbl-click', $event)"
      @task-delete="$emit('task-delete', $event)"
      @task-insert="$emit('task-insert', $event)"
      @task-update="$emit('task-update', $event)"
      @task-moving="$emit('task-moving', $event)"
      @task-edit-dialog-showing="$emit('task-edit-dialog-showing', $event)"
      @content-ready="$emit('content-ready', $event)"
      @context-menu-preparing="$emit('context-menu-preparing', $event)"
      @scale-cell-prepared="$emit('scale-cell-prepared', $event)"
    >
      <slot />
      <template v-if="$slots.taskContent" #taskContentTpl="{ task, isParent, progress }">
        <slot name="taskContent" :task="task" :is-parent="isParent" :progress="progress" />
      </template>
    </DxGantt>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DxGantt } from 'devextreme-vue/gantt'
import type { DfGanttProps } from './types'

defineOptions({ name: 'DfGantt' })

withDefaults(defineProps<DfGanttProps>(), {
  scaleType: 'auto',
  titlePosition: 'outside',
  showResources: true,
  showRowLines: true,
  showBorders: true,
  allowSelection: false,
  taskTitlePosition: 'inside',
  taskListWidth: 440,
  firstDayOfWeek: 1,
})

defineEmits<{
  'selection-changed': [e: any]
  'task-click': [e: any]
  'task-dbl-click': [e: any]
  'task-delete': [e: any]
  'task-insert': [e: any]
  'task-update': [e: any]
  'task-moving': [e: any]
  'task-edit-dialog-showing': [e: any]
  'content-ready': [e: any]
  'context-menu-preparing': [e: any]
  'scale-cell-prepared': [e: any]
}>()

const dxRef = ref()

function getInstance() {
  return dxRef.value?.instance
}

function getSelectedRowKeys() {
  return dxRef.value?.instance?.getSelectedRowKeys()
}

function expandAll() {
  return dxRef.value?.instance?.expandAll()
}

function collapseAll() {
  return dxRef.value?.instance?.collapseAll()
}

function showTaskEditDialog(key: any) {
  return dxRef.value?.instance?.showTaskEditDialog(key)
}

function deleteTask(key: any) {
  return dxRef.value?.instance?.deleteTask(key)
}

function updateTask(key: number, data: Record<string, any>) {
  return dxRef.value?.instance?.updateTask(key, data)
}

function insertTask(data: Record<string, any>) {
  return dxRef.value?.instance?.insertTask(data)
}

defineExpose({ getInstance, getSelectedRowKeys, expandAll, collapseAll, showTaskEditDialog, deleteTask, updateTask, insertTask })
</script>

<style scoped>
.df-gantt {
  display: block;
  width: 100%;
  height: 100%;
  min-height: 400px;
}

.df-gantt :deep(.dx-gantt) {
  border: 1px solid var(--df-color-border-light, #e4e7ed);
  border-radius: 4px;
}
</style>
