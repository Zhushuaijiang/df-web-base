<template>
  <div
    class="df-patient-strip"
    :class="{
      'df-patient-strip--compact': compact,
      'df-patient-strip--clickable': clickable,
    }"
    @click="onClick"
  >
    <div class="df-patient-strip__body">
      <!-- Patient name -->
      <span class="df-patient-strip__name">{{ patient.name }}</span>

      <!-- Inline info fields -->
      <template v-for="field in visibleFields" :key="field.key">
        <span class="df-patient-strip__divider" />
        <span class="df-patient-strip__field">
          <span v-if="field.label" class="df-patient-strip__label">{{ field.label }}</span>
          <span class="df-patient-strip__value">{{ field.value }}</span>
        </span>
      </template>

      <!-- Tags -->
      <template v-if="patient.tags && patient.tags.length">
        <span class="df-patient-strip__divider" />
        <span
          v-for="(tag, idx) in patient.tags"
          :key="idx"
          class="df-patient-strip__tag"
          :class="tag.type ? `df-patient-strip__tag--${tag.type}` : ''"
        >{{ tag.text }}</span>
      </template>

      <!-- Allergy -->
      <template v-if="patient.allergy">
        <span class="df-patient-strip__divider" />
        <span class="df-patient-strip__allergy">
          <slot name="allergy">
            <i class="dx-icon-warning df-patient-strip__allergy-icon" />
            <span>{{ patient.allergy }}</span>
          </slot>
        </span>
      </template>

      <!-- Extra slot -->
      <slot name="extra" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { DfPatientStripProps, PatientInfo } from './types'

defineOptions({ name: 'DfPatientStrip' })

const props = withDefaults(defineProps<DfPatientStripProps>(), {
  compact: true,
  clickable: false,
})

const emit = defineEmits<{
  click: [patient: PatientInfo]
}>()

interface FieldDef {
  key: keyof PatientInfo
  label: string
  value: string
}

const visibleFields = computed<FieldDef[]>(() => {
  const p = props.patient
  const fields: FieldDef[] = []

  if (p.gender) fields.push({ key: 'gender', label: '', value: p.gender })
  if (p.age) fields.push({ key: 'age', label: '', value: p.age })
  if (p.bedNo) fields.push({ key: 'bedNo', label: '', value: p.bedNo })
  if (p.department) fields.push({ key: 'department', label: '', value: p.department })
  if (p.diagnosis) fields.push({ key: 'diagnosis', label: '', value: p.diagnosis })

  return fields
})

function onClick() {
  if (props.clickable) {
    emit('click', props.patient)
  }
}
</script>

<style scoped>
.df-patient-strip {
  display: flex;
  align-items: center;
  height: 42px;
  padding: 0 var(--df-spacing-md, 16px);
  background: var(--df-color-bg-surface, #fff);
  border-bottom: 1px solid var(--df-color-border-light, #f0f2f5);
  box-sizing: border-box;
}

.df-patient-strip--compact {
  height: 36px;
}

.df-patient-strip--clickable {
  cursor: pointer;
  transition: background 0.15s;
}

.df-patient-strip--clickable:hover {
  background: var(--df-color-bg-hover, #f5f7fa);
}

.df-patient-strip__body {
  display: flex;
  align-items: center;
  gap: var(--df-spacing-xs, 4px);
  min-width: 0;
  overflow: hidden;
  font-size: var(--df-font-size-sm, 13px);
  color: #1A1A1A;
  line-height: 1;
}

/* Patient name — bold, prominent */
.df-patient-strip__name {
  font-weight: 600;
  font-size: var(--df-font-size-base, 14px);
  color: #1A1A1A;
  white-space: nowrap;
  flex-shrink: 0;
}

/* Divider between fields */
.df-patient-strip__divider {
  display: inline-block;
  width: 1px;
  height: 12px;
  margin: 0 var(--df-spacing-xs, 4px);
  background: var(--df-color-border, #dcdfe6);
  flex-shrink: 0;
}

/* Inline field */
.df-patient-strip__field {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  white-space: nowrap;
}

.df-patient-strip__label {
  color: var(--df-color-text-secondary, #909399);
  font-size: var(--df-font-size-xs, 12px);
}

.df-patient-strip__value {
  color: #1A1A1A;
}

/* Tags */
.df-patient-strip__tag {
  display: inline-flex;
  align-items: center;
  height: 18px;
  padding: 0 var(--df-spacing-xs, 4px);
  font-size: 11px;
  border-radius: var(--df-radius-sm, 4px);
  white-space: nowrap;
  background: var(--df-color-secondary-50, #F5F6F8);
  color: var(--df-color-secondary-500, #6B7790);
  border: 1px solid var(--df-color-secondary-200, #D1D6E0);
}

.df-patient-strip__tag--success {
  background: var(--df-color-success-light, #F6FFED);
  color: var(--df-color-success, #52C41A);
  border-color: #d9f7be;
}

.df-patient-strip__tag--warning {
  background: var(--df-color-warning-light, #FFFBE6);
  color: var(--df-color-warning, #FAAD14);
  border-color: #ffe58f;
}

.df-patient-strip__tag--danger {
  background: var(--df-color-error-light, #FFF2F0);
  color: var(--df-color-error, #F5222D);
  border-color: #ffccc7;
}

.df-patient-strip__tag--info {
  background: var(--df-color-primary-50, #E8F5F3);
  color: var(--df-color-primary, #2AA890);
  border-color: var(--df-color-primary-100, #C5E8E3);
}

/* Allergy — red warning */
.df-patient-strip__allergy {
  display: inline-flex;
  align-items: center;
  gap: var(--df-spacing-xs, 4px);
  color: var(--df-color-error, #F5222D);
  font-size: var(--df-font-size-xs, 12px);
  font-weight: 500;
  white-space: nowrap;
  flex-shrink: 0;
}

.df-patient-strip__allergy-icon {
  font-size: 14px;
}

/* Print styles */
@media print {
  .df-patient-strip__tag,
  .df-patient-strip__allergy-icon {
    display: none;
  }

  .df-patient-strip {
    border-bottom: 1px solid #333;
  }
}
</style>
