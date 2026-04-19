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
</style>
