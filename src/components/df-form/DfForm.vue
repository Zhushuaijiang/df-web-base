<template>
  <div class="df-form">
    <DxForm
      :form-data="props.formData"
      :read-only="props.readOnly"
      v-bind="formOptions"
    >
      <DxSimpleItem
        v-for="field in visibleFields"
        :key="field.dataField"
        :data-field="field.dataField"
        :label="{ text: field.label }"
        :col-span="field.colSpan"
        :is-required="field.required"
        v-bind="buildEditorOptions(field)"
      />
      <slot />
    </DxForm>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { DxForm, DxSimpleItem } from 'devextreme-vue/form'
import { useDfForm } from './useForm'
import type { DfFormProps } from '../../types/plugin'

const props = withDefaults(defineProps<DfFormProps>(), {
  readOnly: false,
})

const { formOptions, buildEditorOptions, isFieldVisible } = useDfForm(props)

const visibleFields = computed(() =>
  (props.fields ?? []).filter(isFieldVisible)
)
</script>

<style scoped>
.df-form {
  width: 100%;
}

/* UI规范：表单间距 12px，标签右对齐 */
.df-form :deep(.dx-form-item) {
  padding-right: var(--df-form-gutter, 12px);
  padding-bottom: var(--df-form-gutter, 12px);
}

.df-form :deep(.dx-field-item-label) {
  text-align: right;
}
</style>
