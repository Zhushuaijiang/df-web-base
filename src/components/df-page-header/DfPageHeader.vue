<template>
  <div class="df-page-header" :class="{ 'df-page-header--has-back': showBack }">
    <div v-if="showBack" class="df-page-header__back" @click="onBack">
      <i class="dx-icon-back" />
      <span v-if="backText" class="df-page-header__back-text">{{ backText }}</span>
    </div>

    <div class="df-page-header__content">
      <div class="df-page-header__main">
        <h3 class="df-page-header__title">
          <slot name="title">{{ title }}</slot>
        </h3>
        <span v-if="subTitle || $slots.subTitle" class="df-page-header__subtitle">
          <slot name="subTitle">{{ subTitle }}</slot>
        </span>
      </div>

      <div v-if="$slots.extra" class="df-page-header__extra">
        <slot name="extra" />
      </div>
    </div>

    <div v-if="$slots.default" class="df-page-header__body">
      <slot />
    </div>

    <div v-if="$slots.breadcrumb" class="df-page-header__breadcrumb">
      <slot name="breadcrumb" />
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  title?: string
  subTitle?: string
  showBack?: boolean
  backText?: string
}>(), {
  title: '',
  subTitle: '',
  showBack: true,
  backText: '返回',
})

const emit = defineEmits<{
  back: []
}>()

defineOptions({ name: 'DfPageHeader' })

function onBack() {
  emit('back')
}
</script>

<style scoped>
.df-page-header {
  padding: 16px 20px;
  background: var(--df-color-bg-surface, #fff);
  border-bottom: 1px solid var(--df-color-border-light, #e4e7ed);
}

.df-page-header__breadcrumb {
  margin-bottom: 12px;
}

.df-page-header__back {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 8px;
  font-size: 14px;
  color: var(--df-text-color-regular, #606266);
  cursor: pointer;
  transition: color 0.2s;
}

.df-page-header__back:hover {
  color: var(--df-color-primary, #1890ff);
}

.df-page-header__content {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.df-page-header__main {
  flex: 1;
  min-width: 0;
}

.df-page-header__title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: var(--df-color-text-primary, #303133);
  line-height: 1.5;
}

.df-page-header__subtitle {
  display: block;
  margin-top: 4px;
  font-size: 13px;
  color: var(--df-color-text-secondary, #909399);
  line-height: 1.5;
}

.df-page-header__extra {
  flex-shrink: 0;
  margin-left: 16px;
}

.df-page-header__body {
  margin-top: 16px;
}
</style>
