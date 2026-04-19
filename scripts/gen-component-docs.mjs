/**
 * df-web-base 组件文档生成器
 * 根据组件元数据生成 VitePress Markdown 文档页面
 *
 * 运行: node scripts/gen-component-docs.mjs
 */
import { writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DOCS_DIR = join(__dirname, '..', 'docs', 'components')

// ─── 完整组件元数据 ───
const COMPONENTS = [
  // ────────── 基础组件 ──────────
  {
    slug: 'button',
    name: 'DfButton',
    zhName: '按钮',
    desc: '基于 DevExtreme DxButton 封装的按钮组件，支持多种类型、尺寸、防抖点击和加载状态。',
    dx: 'DxButton',
    props: [
      { name: 'type', type: `'default' \\| 'primary' \\| 'success' \\| 'warning' \\| 'danger' \\| 'info' \\| 'text'`, default: `'default'`, desc: '按钮类型' },
      { name: 'size', type: `'large' \\| 'default' \\| 'small' \\| 'mini'`, default: `'default'`, desc: '按钮尺寸' },
      { name: 'icon', type: 'string', default: '—', desc: '图标类名 (dx-icon-*)' },
      { name: 'loading', type: 'boolean', default: 'false', desc: '加载状态' },
      { name: 'disabled', type: 'boolean', default: 'false', desc: '禁用状态' },
      { name: 'plain', type: 'boolean', default: 'false', desc: '朴素按钮' },
      { name: 'round', type: 'boolean', default: 'false', desc: '圆角按钮' },
      { name: 'circle', type: 'boolean', default: 'false', desc: '圆形按钮' },
      { name: 'hint', type: 'string', default: '—', desc: '工具提示文字' },
      { name: 'text', type: 'string', default: '—', desc: '按钮文字（替代 slot）' },
      { name: 'debounce', type: 'number', default: '500', desc: '防抖间隔 (ms)' },
    ],
    events: [{ name: 'click', params: '(e: Event)', desc: '点击时触发（已防抖）' }],
    slots: [{ name: 'default', desc: '按钮内容' }],
    demos: [
      {
        title: '基础用法',
        desc: '通过 `type` 属性设置按钮类型。',
        code: `<template>
  <df-space>
    <df-button>默认按钮</df-button>
    <df-button type="primary">主要按钮</df-button>
    <df-button type="success">成功按钮</df-button>
    <df-button type="warning">警告按钮</df-button>
    <df-button type="danger">危险按钮</df-button>
    <df-button type="info">信息按钮</df-button>
    <df-button type="text">文字按钮</df-button>
  </df-space>
</template>`,
      },
      {
        title: '禁用与加载',
        desc: '通过 `disabled` 和 `loading` 控制按钮状态。',
        code: `<template>
  <df-space>
    <df-button type="primary" disabled>禁用按钮</df-button>
    <df-button type="primary" loading>加载中</df-button>
  </df-space>
</template>`,
      },
      {
        title: '图标与尺寸',
        desc: '通过 `icon` 设置图标，`size` 设置尺寸。',
        code: `<template>
  <df-space>
    <df-button type="primary" icon="dx-icon-add" size="large">大号</df-button>
    <df-button type="primary" icon="dx-icon-edit">默认</df-button>
    <df-button type="primary" icon="dx-icon-trash" size="small">小号</df-button>
    <df-button type="primary" icon="dx-icon-search" size="mini">迷你</df-button>
  </df-space>
</template>`,
      },
    ],
  },
  {
    slug: 'button-group',
    name: 'DfButtonGroup',
    zhName: '按钮组',
    desc: '将多个按钮组合在一起，自动处理首尾圆角。',
    dx: null,
    props: [],
    events: [],
    slots: [{ name: 'default', desc: '放置 DfButton 组件' }],
    demos: [
      {
        title: '基础用法',
        desc: '将 DfButton 放入 DfButtonGroup 中即可。',
        code: `<template>
  <df-button-group>
    <df-button type="primary" icon="dx-icon-chevrondoubleleft">上一页</df-button>
    <df-button type="primary" icon="dx-icon-chevrondoubleright">下一页</df-button>
  </df-button-group>
</template>`,
      },
    ],
  },
  {
    slug: 'button-list',
    name: 'DfButtonList',
    zhName: '按钮列表',
    desc: '按钮列表组件，当按钮超过最大可见数量时自动折叠到"更多"下拉菜单中。',
    dx: null,
    props: [
      { name: 'buttons', type: 'ButtonItem[]', default: '[]', desc: '按钮配置数组' },
      { name: 'maxVisible', type: 'number', default: '3', desc: '最大可见按钮数' },
      { name: 'moreText', type: 'string', default: `'更多'`, desc: '更多按钮文字' },
      { name: 'size', type: `'large' \\| 'default' \\| 'small'`, default: `'default'`, desc: '按钮尺寸' },
      { name: 'autoCollapse', type: 'boolean', default: 'false', desc: '是否自动折叠' },
    ],
    events: [
      { name: 'click', params: '(item: ButtonItem)', desc: '按钮点击' },
      { name: 'command', params: '(command: string)', desc: '更多菜单点击' },
    ],
    slots: [{ name: 'button', desc: '自定义按钮渲染' }],
    demos: [
      {
        title: '基础用法',
        desc: '通过 `buttons` 配置按钮，超出 `maxVisible` 的自动折叠。',
        code: `<script setup lang="ts">
const buttons = [
  { text: '新增', type: 'primary', command: 'add' },
  { text: '编辑', type: 'success', command: 'edit' },
  { text: '删除', type: 'danger', command: 'delete' },
  { text: '导出', command: 'export' },
  { text: '打印', command: 'print' },
]
<\/script>
<template>
  <df-button-list :buttons="buttons" :max-visible="3" />
</template>`,
      },
    ],
  },
  {
    slug: 'icon',
    name: 'DfIcon',
    zhName: '图标',
    desc: '图标组件，自动添加 `dx-icon-` 前缀，支持自定义大小和颜色。',
    dx: null,
    props: [
      { name: 'name', type: 'string', default: `''`, desc: '图标名称 (不含 dx-icon- 前缀)' },
      { name: 'size', type: 'number | string', default: '—', desc: '图标大小' },
      { name: 'color', type: 'string', default: '—', desc: '图标颜色' },
      { name: 'clickable', type: 'boolean', default: 'false', desc: '是否可点击（显示手型光标）' },
    ],
    events: [{ name: 'click', params: '(e: MouseEvent)', desc: '点击时触发' }],
    slots: [],
    demos: [
      {
        title: '基础用法',
        desc: 'DevExtreme 内置图标，通过 name 属性指定。',
        code: `<template>
  <df-space>
    <df-icon name="home" :size="24" />
    <df-icon name="search" :size="24" color="#2AA890" />
    <df-icon name="edit" :size="24" clickable />
    <df-icon name="trash" :size="24" color="#F5222D" />
  </df-space>
</template>`,
      },
    ],
  },
  {
    slug: 'link',
    name: 'DfLink',
    zhName: '链接',
    desc: '文字链接组件，支持不同类型颜色、下划线和禁用状态。',
    dx: null,
    props: [
      { name: 'type', type: `'default' \\| 'primary' \\| 'success' \\| 'warning' \\| 'danger' \\| 'info'`, default: `'default'`, desc: '链接类型' },
      { name: 'underline', type: 'boolean', default: 'true', desc: '是否显示下划线' },
      { name: 'disabled', type: 'boolean', default: 'false', desc: '禁用状态' },
      { name: 'href', type: 'string', default: '—', desc: '链接地址' },
      { name: 'icon', type: 'string', default: '—', desc: '图标类名' },
      { name: 'target', type: 'string', default: `'_self'`, desc: '打开方式' },
    ],
    events: [{ name: 'click', params: '(e: MouseEvent)', desc: '点击时触发' }],
    slots: [{ name: 'default', desc: '链接文字' }],
    demos: [
      {
        title: '基础用法',
        code: `<template>
  <df-space>
    <df-link>默认链接</df-link>
    <df-link type="primary">主要链接</df-link>
    <df-link type="success">成功链接</df-link>
    <df-link type="warning">警告链接</df-link>
    <df-link type="danger">危险链接</df-link>
    <df-link type="info">信息链接</df-link>
    <df-link disabled>禁用链接</df-link>
  </df-space>
</template>`,
      },
    ],
  },
  {
    slug: 'tag',
    name: 'DfTag',
    zhName: '标签',
    desc: '标签组件，用于标记和分类，支持多种类型、尺寸和可关闭模式。',
    dx: null,
    props: [
      { name: 'text', type: 'string', default: '—', desc: '标签文字（替代 slot）' },
      { name: 'type', type: `'' \\| 'primary' \\| 'success' \\| 'warning' \\| 'danger' \\| 'info'`, default: `''`, desc: '标签类型' },
      { name: 'closable', type: 'boolean', default: 'false', desc: '可关闭' },
      { name: 'color', type: 'string', default: '—', desc: '自定义背景色' },
      { name: 'size', type: `'large' \\| 'default' \\| 'small' \\| 'mini'`, default: `'default'`, desc: '尺寸' },
      { name: 'effect', type: `'dark' \\| 'light' \\| 'plain'`, default: `'light'`, desc: '主题效果' },
      { name: 'hit', type: 'boolean', default: 'false', desc: '描边样式' },
      { name: 'round', type: 'boolean', default: 'false', desc: '圆角样式' },
    ],
    events: [
      { name: 'click', params: '(e: MouseEvent)', desc: '点击时触发' },
      { name: 'close', params: '(e: MouseEvent)', desc: '关闭时触发' },
    ],
    slots: [{ name: 'default', desc: '标签内容' }],
    demos: [
      {
        title: '基础用法',
        code: `<template>
  <df-space>
    <df-tag>默认</df-tag>
    <df-tag type="primary">主要</df-tag>
    <df-tag type="success">成功</df-tag>
    <df-tag type="warning">警告</df-tag>
    <df-tag type="danger">危险</df-tag>
    <df-tag type="info">信息</df-tag>
  </df-space>
</template>`,
      },
      {
        title: '可关闭与圆角',
        code: `<template>
  <df-space>
    <df-tag closable type="primary">可关闭</df-tag>
    <df-tag round type="success">圆角标签</df-tag>
    <df-tag effect="dark" type="danger">深色</df-tag>
    <df-tag effect="plain" type="warning">朴素</df-tag>
  </df-space>
</template>`,
      },
    ],
  },

  // ────────── 表单组件 ──────────
  {
    slug: 'input',
    name: 'DfInput',
    zhName: '输入框',
    desc: '基于 DevExtreme DxTextBox / DxTextArea 封装的输入框组件，支持文本、密码、数字、文本域多种模式。',
    dx: 'DxTextBox / DxTextArea',
    props: [
      { name: 'modelValue / v-model', type: 'string | number', default: '—', desc: '绑定值' },
      { name: 'type', type: `'text' \\| 'password' \\| 'textarea' \\| 'number'`, default: `'text'`, desc: '输入类型' },
      { name: 'size', type: `'large' \\| 'default' \\| 'small'`, default: `'default'`, desc: '尺寸' },
      { name: 'placeholder', type: 'string', default: '—', desc: '占位文字' },
      { name: 'disabled', type: 'boolean', default: 'false', desc: '禁用' },
      { name: 'readonly', type: 'boolean', default: 'false', desc: '只读' },
      { name: 'clearable', type: 'boolean', default: 'false', desc: '可清空' },
      { name: 'showPassword', type: 'boolean', default: 'false', desc: '密码显示切换' },
      { name: 'showWordLimit', type: 'boolean', default: 'false', desc: '显示字数限制' },
      { name: 'maxlength', type: 'number', default: '—', desc: '最大输入长度' },
      { name: 'prefixIcon', type: 'string', default: '—', desc: '前缀图标' },
      { name: 'suffixIcon', type: 'string', default: '—', desc: '后缀图标' },
    ],
    events: [
      { name: 'update:modelValue', params: '(value: string | number)', desc: '值改变' },
      { name: 'enter', params: '()', desc: '按下回车键' },
      { name: 'focus', params: '()', desc: '获得焦点' },
      { name: 'blur', params: '()', desc: '失去焦点' },
    ],
    slots: [
      { name: 'prepend', desc: '前置内容' },
      { name: 'prefix', desc: '前缀图标区域' },
      { name: 'append', desc: '后置内容' },
      { name: 'suffix', desc: '后缀图标区域' },
    ],
    demos: [
      {
        title: '基础用法',
        code: `<script setup lang="ts">
import { ref } from 'vue'
const value = ref('')
<\/script>
<template>
  <df-input v-model="value" placeholder="请输入内容" />
</template>`,
      },
      {
        title: '不同类型',
        code: `<script setup lang="ts">
import { ref } from 'vue'
const text = ref('')
const pwd = ref('')
const area = ref('')
<\/script>
<template>
  <df-space direction="vertical" :fill="true" style="width: 320px">
    <df-input v-model="text" placeholder="文本输入" clearable />
    <df-input v-model="pwd" type="password" placeholder="密码输入" show-password />
    <df-input v-model="area" type="textarea" placeholder="文本域" :maxlength="200" show-word-limit />
  </df-space>
</template>`,
      },
    ],
  },
  {
    slug: 'input-number',
    name: 'DfInputNumber',
    zhName: '数字输入框',
    desc: '基于 DevExtreme DxNumberBox 封装的数字输入组件，支持步进、精度、范围限制。',
    dx: 'DxNumberBox',
    props: [
      { name: 'modelValue / v-model', type: 'number | null', default: '—', desc: '绑定值' },
      { name: 'min', type: 'number', default: '-Infinity', desc: '最小值' },
      { name: 'max', type: 'number', default: 'Infinity', desc: '最大值' },
      { name: 'step', type: 'number', default: '1', desc: '步长' },
      { name: 'precision', type: 'number', default: '—', desc: '精度（小数位数）' },
      { name: 'disabled', type: 'boolean', default: 'false', desc: '禁用' },
      { name: 'controls', type: 'boolean', default: 'true', desc: '显示增减按钮' },
      { name: 'controlsPosition', type: `'' \\| 'right'`, default: `''`, desc: '增减按钮位置' },
      { name: 'size', type: `'large' \\| 'default' \\| 'small'`, default: `'default'`, desc: '尺寸' },
      { name: 'placeholder', type: 'string', default: `''`, desc: '占位文字' },
      { name: 'width', type: 'string | number', default: '—', desc: '宽度' },
    ],
    events: [
      { name: 'update:modelValue', params: '(value: number | null)', desc: '值改变' },
      { name: 'change', params: '(current: number, old: number)', desc: '值变化后触发' },
    ],
    slots: [],
    demos: [
      {
        title: '基础用法',
        code: `<script setup lang="ts">
import { ref } from 'vue'
const num = ref(1)
<\/script>
<template>
  <df-input-number v-model="num" :min="1" :max="10" />
</template>`,
      },
    ],
  },
  {
    slug: 'select',
    name: 'DfSelect',
    zhName: '选择器',
    desc: '基于 DevExtreme DxSelectBox 封装的下拉选择组件，支持字典编码自动加载和自定义数据源。',
    dx: 'DxSelectBox',
    props: [
      { name: 'modelValue / v-model', type: 'string | number | null', default: '—', desc: '绑定值' },
      { name: 'dictCode', type: 'string', default: '—', desc: '字典编码（自动查询字典服务）' },
      { name: 'dataSource', type: 'DictItem[]', default: '—', desc: '自定义数据源' },
      { name: 'displayExpr', type: 'string', default: `'label'`, desc: '显示字段名' },
      { name: 'valueExpr', type: 'string', default: `'value'`, desc: '值字段名' },
      { name: 'searchEnabled', type: 'boolean', default: 'true', desc: '启用搜索' },
      { name: 'showClearButton', type: 'boolean', default: 'true', desc: '显示清除按钮' },
      { name: 'placeholder', type: 'string', default: `'请选择'`, desc: '占位文字' },
      { name: 'disabled', type: 'boolean', default: 'false', desc: '禁用' },
    ],
    events: [{ name: 'update:modelValue', params: '(value: string | number)', desc: '值改变' }],
    slots: [],
    demos: [
      {
        title: '基础用法',
        code: `<script setup lang="ts">
import { ref } from 'vue'
const value = ref(null)
const options = [
  { label: '选项一', value: '1' },
  { label: '选项二', value: '2' },
  { label: '选项三', value: '3' },
]
<\/script>
<template>
  <df-select v-model="value" :data-source="options" placeholder="请选择" />
</template>`,
      },
      {
        title: '字典模式',
        desc: '通过 `dictCode` 自动从字典服务加载选项。',
        code: `<template>
  <!-- 需要在 install 时配置 dict 服务 -->
  <df-select v-model="value" dict-code="sys_gender" />
</template>`,
      },
    ],
  },
  {
    slug: 'checkbox',
    name: 'DfCheckbox',
    zhName: '复选框',
    desc: '基于 DevExtreme DxCheckBox 封装的复选框组件，支持单选和数组多选模式。',
    dx: 'DxCheckBox',
    props: [
      { name: 'modelValue / v-model', type: 'boolean | string[] | number[]', default: 'false', desc: '绑定值' },
      { name: 'checkedValue', type: 'string | number', default: '—', desc: '选中时的值（数组模式）' },
      { name: 'label', type: 'string', default: '—', desc: '标签文字' },
      { name: 'disabled', type: 'boolean', default: 'false', desc: '禁用' },
      { name: 'indeterminate', type: 'boolean', default: 'false', desc: '半选状态' },
      { name: 'size', type: `'default' \\| 'small' \\| 'mini'`, default: `'default'`, desc: '尺寸' },
    ],
    events: [
      { name: 'update:modelValue', params: '(value)', desc: '值改变' },
      { name: 'change', params: '(value)', desc: '状态变化' },
    ],
    slots: [{ name: 'default', desc: '标签内容' }],
    demos: [
      {
        title: '基础用法',
        code: `<script setup lang="ts">
import { ref } from 'vue'
const checked = ref(false)
<\/script>
<template>
  <df-checkbox v-model="checked" label="同意协议" />
</template>`,
      },
    ],
  },
  {
    slug: 'radio',
    name: 'DfRadio',
    zhName: '单选框',
    desc: '单选框组组件，支持普通和按钮样式。',
    dx: null,
    props: [
      { name: 'modelValue / v-model', type: 'string | number', default: '—', desc: '绑定值' },
      { name: 'options', type: 'RadioOption[]', default: '[]', desc: '选项数组 `{ label, value, disabled? }`' },
      { name: 'disabled', type: 'boolean', default: 'false', desc: '禁用' },
      { name: 'size', type: `'default' \\| 'small' \\| 'mini'`, default: `'default'`, desc: '尺寸' },
      { name: 'button', type: 'boolean', default: 'false', desc: '按钮样式' },
    ],
    events: [
      { name: 'update:modelValue', params: '(value)', desc: '值改变' },
      { name: 'change', params: '(value)', desc: '选中变化' },
    ],
    slots: [],
    demos: [
      {
        title: '基础用法',
        code: `<script setup lang="ts">
import { ref } from 'vue'
const value = ref('1')
const options = [
  { label: '选项一', value: '1' },
  { label: '选项二', value: '2' },
  { label: '选项三', value: '3' },
]
<\/script>
<template>
  <df-radio v-model="value" :options="options" />
</template>`,
      },
    ],
  },
  {
    slug: 'switch',
    name: 'DfSwitch',
    zhName: '开关',
    desc: '基于 DevExtreme DxSwitch 封装的开关组件。',
    dx: 'DxSwitch',
    props: [
      { name: 'modelValue / v-model', type: 'boolean | string | number', default: 'false', desc: '绑定值' },
      { name: 'activeValue', type: 'boolean | string | number', default: 'true', desc: '打开时的值' },
      { name: 'inactiveValue', type: 'boolean | string | number', default: 'false', desc: '关闭时的值' },
      { name: 'activeText', type: 'string', default: `''`, desc: '打开时的文字' },
      { name: 'inactiveText', type: 'string', default: `''`, desc: '关闭时的文字' },
      { name: 'disabled', type: 'boolean', default: 'false', desc: '禁用' },
      { name: 'width', type: 'number', default: '44', desc: '开关宽度' },
    ],
    events: [
      { name: 'update:modelValue', params: '(value)', desc: '值改变' },
      { name: 'change', params: '(value)', desc: '状态变化' },
    ],
    slots: [],
    demos: [
      {
        title: '基础用法',
        code: `<script setup lang="ts">
import { ref } from 'vue'
const value = ref(false)
<\/script>
<template>
  <df-switch v-model="value" />
  <df-switch v-model="value" active-text="开" inactive-text="关" />
</template>`,
      },
    ],
  },
  {
    slug: 'date-picker',
    name: 'DfDatePicker',
    zhName: '日期选择',
    desc: '基于 DevExtreme DxDateBox / DxDateRangeBox 封装的日期选择组件，支持日期、日期时间、范围选择。',
    dx: 'DxDateBox / DxDateRangeBox',
    props: [
      { name: 'modelValue / v-model', type: 'Date | string | null | [Date, Date]', default: '—', desc: '绑定值' },
      { name: 'type', type: `'date' \\| 'datetime' \\| 'daterange' \\| 'datetimerange' \\| 'month' \\| 'year' \\| 'week'`, default: `'date'`, desc: '选择器类型' },
      { name: 'format', type: 'string', default: '—', desc: '显示格式' },
      { name: 'valueFormat', type: 'string', default: '—', desc: '值格式' },
      { name: 'placeholder', type: 'string', default: `'请选择日期'`, desc: '占位文字' },
      { name: 'clearable', type: 'boolean', default: 'true', desc: '可清空' },
      { name: 'disabled', type: 'boolean', default: 'false', desc: '禁用' },
      { name: 'size', type: `'large' \\| 'default' \\| 'small'`, default: `'default'`, desc: '尺寸' },
      { name: 'width', type: 'string | number', default: '—', desc: '宽度' },
    ],
    events: [
      { name: 'update:modelValue', params: '(value)', desc: '值改变' },
      { name: 'change', params: '(value)', desc: '日期变化' },
    ],
    slots: [],
    demos: [
      {
        title: '基础用法',
        code: `<script setup lang="ts">
import { ref } from 'vue'
const date = ref(null)
const dateRange = ref(null)
<\/script>
<template>
  <df-space direction="vertical">
    <df-date-picker v-model="date" placeholder="选择日期" />
    <df-date-picker v-model="date" type="datetime" placeholder="选择日期时间" />
    <df-date-picker v-model="dateRange" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" />
  </df-space>
</template>`,
      },
    ],
  },
  {
    slug: 'time-picker',
    name: 'DfTimePicker',
    zhName: '时间选择',
    desc: '基于 DevExtreme DxDateBox 封装的时间选择组件。',
    dx: 'DxDateBox',
    props: [
      { name: 'modelValue / v-model', type: 'Date | string | null', default: '—', desc: '绑定值' },
      { name: 'isRange', type: 'boolean', default: 'false', desc: '是否为范围选择' },
      { name: 'format', type: 'string', default: `'HH:mm:ss'`, desc: '显示格式' },
      { name: 'placeholder', type: 'string', default: `'请选择时间'`, desc: '占位文字' },
      { name: 'clearable', type: 'boolean', default: 'true', desc: '可清空' },
      { name: 'disabled', type: 'boolean', default: 'false', desc: '禁用' },
      { name: 'size', type: `'large' \\| 'default' \\| 'small'`, default: `'default'`, desc: '尺寸' },
    ],
    events: [
      { name: 'update:modelValue', params: '(value)', desc: '值改变' },
      { name: 'change', params: '(value)', desc: '时间变化' },
    ],
    slots: [],
    demos: [
      {
        title: '基础用法',
        code: `<script setup lang="ts">
import { ref } from 'vue'
const time = ref(null)
<\/script>
<template>
  <df-time-picker v-model="time" placeholder="选择时间" />
</template>`,
      },
    ],
  },
  {
    slug: 'color-picker',
    name: 'DfColorPicker',
    zhName: '颜色选择',
    desc: '基于 DevExtreme DxColorBox 封装的颜色选择组件。',
    dx: 'DxColorBox',
    props: [
      { name: 'modelValue / v-model', type: 'string', default: `''`, desc: '绑定色值' },
      { name: 'disabled', type: 'boolean', default: 'false', desc: '禁用' },
      { name: 'clearable', type: 'boolean', default: 'true', desc: '可清空' },
      { name: 'showAlpha', type: 'boolean', default: 'false', desc: '支持透明度' },
      { name: 'placeholder', type: 'string', default: `'请选择颜色'`, desc: '占位文字' },
      { name: 'size', type: `'large' \\| 'default' \\| 'small'`, default: `'default'`, desc: '尺寸' },
      { name: 'predefine', type: 'string[]', default: '—', desc: '预定义颜色' },
    ],
    events: [
      { name: 'update:modelValue', params: '(value: string)', desc: '值改变' },
      { name: 'change', params: '(value: string)', desc: '颜色变化' },
    ],
    slots: [],
    demos: [
      {
        title: '基础用法',
        code: `<script setup lang="ts">
import { ref } from 'vue'
const color = ref('#2AA890')
<\/script>
<template>
  <df-color-picker v-model="color" />
</template>`,
      },
    ],
  },
  {
    slug: 'slider',
    name: 'DfSlider',
    zhName: '滑块',
    desc: '基于 DevExtreme DxSlider 封装的滑块组件。',
    dx: 'DxSlider',
    props: [
      { name: 'modelValue / v-model', type: 'number', default: '0', desc: '绑定值' },
      { name: 'min', type: 'number', default: '0', desc: '最小值' },
      { name: 'max', type: 'number', default: '100', desc: '最大值' },
      { name: 'step', type: 'number', default: '1', desc: '步长' },
      { name: 'disabled', type: 'boolean', default: 'false', desc: '禁用' },
      { name: 'showTooltip', type: 'boolean', default: 'true', desc: '显示提示' },
      { name: 'showInput', type: 'boolean', default: 'false', desc: '显示输入框' },
      { name: 'vertical', type: 'boolean', default: 'false', desc: '垂直模式' },
      { name: 'range', type: 'boolean', default: 'false', desc: '范围选择' },
    ],
    events: [
      { name: 'update:modelValue', params: '(value: number)', desc: '值改变' },
      { name: 'change', params: '(value: number)', desc: '拖动结束' },
    ],
    slots: [],
    demos: [
      {
        title: '基础用法',
        code: `<script setup lang="ts">
import { ref } from 'vue'
const value = ref(30)
<\/script>
<template>
  <df-slider v-model="value" />
  <df-slider v-model="value" show-input />
</template>`,
      },
    ],
  },
  {
    slug: 'rate',
    name: 'DfRate',
    zhName: '评分',
    desc: '评分组件，支持半星、自定义图标和颜色。',
    dx: null,
    props: [
      { name: 'modelValue / v-model', type: 'number', default: '0', desc: '绑定值' },
      { name: 'max', type: 'number', default: '5', desc: '最大分值' },
      { name: 'disabled', type: 'boolean', default: 'false', desc: '禁用' },
      { name: 'allowHalf', type: 'boolean', default: 'false', desc: '允许半星' },
      { name: 'size', type: `'large' \\| 'default' \\| 'small'`, default: `'default'`, desc: '尺寸' },
      { name: 'activeColor', type: 'string', default: `'#FAAD14'`, desc: '激活颜色' },
      { name: 'showText', type: 'boolean', default: 'false', desc: '显示评分文字' },
      { name: 'showScore', type: 'boolean', default: 'false', desc: '显示分数' },
    ],
    events: [
      { name: 'update:modelValue', params: '(value: number)', desc: '值改变' },
      { name: 'change', params: '(value: number)', desc: '评分变化' },
    ],
    slots: [],
    demos: [
      {
        title: '基础用法',
        code: `<script setup lang="ts">
import { ref } from 'vue'
const score = ref(3)
<\/script>
<template>
  <df-rate v-model="score" />
  <df-rate v-model="score" allow-half show-score />
</template>`,
      },
    ],
  },
  {
    slug: 'autocomplete',
    name: 'DfAutocomplete',
    zhName: '自动完成',
    desc: '基于 DevExtreme DxAutocomplete 封装的自动完成搜索组件。',
    dx: 'DxAutocomplete',
    props: [
      { name: 'modelValue / v-model', type: 'string', default: `''`, desc: '绑定值' },
      { name: 'fetchSuggestions', type: '(query, callback) => void', default: '—', desc: '获取建议方法' },
      { name: 'placeholder', type: 'string', default: `'请输入'`, desc: '占位文字' },
      { name: 'clearable', type: 'boolean', default: 'true', desc: '可清空' },
      { name: 'debounce', type: 'number', default: '300', desc: '防抖延迟 (ms)' },
      { name: 'minLength', type: 'number', default: '1', desc: '触发搜索最小字符数' },
    ],
    events: [
      { name: 'update:modelValue', params: '(value: string)', desc: '值改变' },
      { name: 'select', params: '(item)', desc: '选中建议项' },
    ],
    slots: [
      { name: 'item', desc: '自定义建议项渲染' },
      { name: 'prefix', desc: '前缀内容' },
    ],
    demos: [
      {
        title: '基础用法',
        code: `<script setup lang="ts">
import { ref } from 'vue'
const value = ref('')
const fetchSuggestions = (query, cb) => {
  const results = ['北京', '上海', '广州', '深圳']
    .filter(item => item.includes(query))
    .map(item => ({ value: item }))
  cb(results)
}
<\/script>
<template>
  <df-autocomplete v-model="value" :fetch-suggestions="fetchSuggestions" placeholder="输入城市" />
</template>`,
      },
    ],
  },
  {
    slug: 'cascader',
    name: 'DfCascader',
    zhName: '级联选择',
    desc: '基于 DevExtreme DxDropDownBox 封装的级联选择组件。',
    dx: 'DxDropDownBox',
    props: [
      { name: 'modelValue / v-model', type: 'Array<string | number>', default: '[]', desc: '绑定值' },
      { name: 'options', type: 'any[]', default: '[]', desc: '级联选项数据' },
      { name: 'placeholder', type: 'string', default: `'请选择'`, desc: '占位文字' },
      { name: 'disabled', type: 'boolean', default: 'false', desc: '禁用' },
      { name: 'clearable', type: 'boolean', default: 'true', desc: '可清空' },
      { name: 'filterable', type: 'boolean', default: 'false', desc: '可搜索' },
      { name: 'showAllLevels', type: 'boolean', default: 'true', desc: '显示完整路径' },
      { name: 'separator', type: 'string', default: `' / '`, desc: '路径分隔符' },
      { name: 'size', type: `'large' \\| 'default' \\| 'small'`, default: `'default'`, desc: '尺寸' },
    ],
    events: [
      { name: 'update:modelValue', params: '(value)', desc: '值改变' },
      { name: 'change', params: '(value)', desc: '选择变化' },
    ],
    slots: [],
    demos: [
      {
        title: '基础用法',
        code: `<script setup lang="ts">
import { ref } from 'vue'
const value = ref([])
const options = [
  { value: '1', label: '浙江', children: [
    { value: '1-1', label: '杭州', children: [
      { value: '1-1-1', label: '西湖区' }
    ]}
  ]},
  { value: '2', label: '江苏', children: [
    { value: '2-1', label: '南京' }
  ]},
]
<\/script>
<template>
  <df-cascader v-model="value" :options="options" />
</template>`,
      },
    ],
  },
  {
    slug: 'tree-select',
    name: 'DfTreeSelect',
    zhName: '树选择',
    desc: '基于 DevExtreme DxDropDownBox + DxTreeView 封装的树形选择组件。',
    dx: 'DxDropDownBox + DxTreeView',
    props: [
      { name: 'modelValue / v-model', type: 'string | number | Array', default: '—', desc: '绑定值' },
      { name: 'data', type: 'any[]', default: '[]', desc: '树数据' },
      { name: 'valueExpr', type: 'string', default: `'id'`, desc: '值字段' },
      { name: 'displayExpr', type: 'string', default: `'text'`, desc: '显示字段' },
      { name: 'multiple', type: 'boolean', default: 'false', desc: '多选' },
      { name: 'checkStrictly', type: 'boolean', default: 'false', desc: '父子不关联' },
      { name: 'filterable', type: 'boolean', default: 'false', desc: '可搜索' },
      { name: 'placeholder', type: 'string', default: `'请选择'`, desc: '占位文字' },
      { name: 'disabled', type: 'boolean', default: 'false', desc: '禁用' },
    ],
    events: [
      { name: 'update:modelValue', params: '(value)', desc: '值改变' },
      { name: 'change', params: '(value)', desc: '选择变化' },
    ],
    slots: [],
    demos: [
      {
        title: '基础用法',
        code: `<script setup lang="ts">
import { ref } from 'vue'
const value = ref(null)
const treeData = [
  { id: 1, text: '一级 1', children: [
    { id: 11, text: '二级 1-1' },
    { id: 12, text: '二级 1-2' },
  ]},
  { id: 2, text: '一级 2', children: [
    { id: 21, text: '二级 2-1' },
  ]},
]
<\/script>
<template>
  <df-tree-select v-model="value" :data="treeData" />
</template>`,
      },
    ],
  },
  {
    slug: 'tag-select',
    name: 'DfTagSelect',
    zhName: '标签选择',
    desc: '基于 DevExtreme DxTagBox 封装的标签多选组件。',
    dx: 'DxTagBox',
    props: [
      { name: 'modelValue / v-model', type: 'Array<string | number>', default: '[]', desc: '绑定值' },
      { name: 'dataSource', type: 'any[]', default: '[]', desc: '数据源' },
      { name: 'displayExpr', type: 'string', default: `'label'`, desc: '显示字段' },
      { name: 'valueExpr', type: 'string', default: `'value'`, desc: '值字段' },
      { name: 'placeholder', type: 'string', default: `'请选择'`, desc: '占位文字' },
      { name: 'disabled', type: 'boolean', default: 'false', desc: '禁用' },
      { name: 'clearable', type: 'boolean', default: 'true', desc: '可清空' },
      { name: 'filterable', type: 'boolean', default: 'true', desc: '可搜索' },
      { name: 'allowCreate', type: 'boolean', default: 'false', desc: '允许创建新标签' },
      { name: 'collapseTags', type: 'boolean', default: 'false', desc: '折叠标签' },
      { name: 'maxDisplayedTags', type: 'number', default: '1', desc: '折叠后显示数量' },
      { name: 'showCheckAll', type: 'boolean', default: 'false', desc: '显示全选按钮' },
    ],
    events: [
      { name: 'update:modelValue', params: '(value)', desc: '值改变' },
      { name: 'selection-changed', params: '()', desc: '选择变化' },
    ],
    slots: [
      { name: 'item', desc: '自定义下拉项渲染' },
      { name: 'tag', desc: '自定义标签渲染' },
    ],
    demos: [
      {
        title: '基础用法',
        code: `<script setup lang="ts">
import { ref } from 'vue'
const value = ref([])
const options = [
  { label: 'HTML', value: 'html' },
  { label: 'CSS', value: 'css' },
  { label: 'JavaScript', value: 'js' },
  { label: 'TypeScript', value: 'ts' },
  { label: 'Vue', value: 'vue' },
]
<\/script>
<template>
  <df-tag-select v-model="value" :data-source="options" placeholder="选择技能" />
</template>`,
      },
    ],
  },
  {
    slug: 'transfer',
    name: 'DfTransfer',
    zhName: '穿梭框',
    desc: '穿梭框组件，支持双向选择、搜索过滤。',
    dx: null,
    props: [
      { name: 'modelValue / v-model', type: 'Array<string | number>', default: '[]', desc: '右侧列表的值' },
      { name: 'data', type: 'any[]', default: '[]', desc: '数据源' },
      { name: 'titles', type: '[string, string]', default: `['', '']`, desc: '左右列表标题' },
      { name: 'filterable', type: 'boolean', default: 'false', desc: '可搜索' },
      { name: 'filterPlaceholder', type: 'string', default: `'请输入搜索内容'`, desc: '搜索占位文字' },
    ],
    events: [
      { name: 'update:modelValue', params: '(value)', desc: '值改变' },
      { name: 'change', params: '(value, direction, movedKeys)', desc: '选择变化' },
    ],
    slots: [],
    demos: [
      {
        title: '基础用法',
        code: `<script setup lang="ts">
import { ref } from 'vue'
const value = ref([1])
const data = Array.from({ length: 10 }, (_, i) => ({
  key: i,
  label: \`选项 \${i + 1}\`,
  disabled: i === 5,
}))
<\/script>
<template>
  <df-transfer v-model="value" :data="data" :titles="['可选', '已选']" filterable />
</template>`,
      },
    ],
  },
  {
    slug: 'upload',
    name: 'DfUpload',
    zhName: '上传',
    desc: '基于 DevExtreme DxFileUploader 封装的文件上传组件，支持拖拽上传。',
    dx: 'DxFileUploader',
    props: [
      { name: 'action', type: 'string', default: `''`, desc: '上传地址' },
      { name: 'headers', type: 'Record<string, string>', default: '—', desc: '请求头' },
      { name: 'multiple', type: 'boolean', default: 'false', desc: '多文件' },
      { name: 'drag', type: 'boolean', default: 'false', desc: '拖拽上传' },
      { name: 'accept', type: 'string', default: '—', desc: '接受的文件类型' },
      { name: 'autoUpload', type: 'boolean', default: 'true', desc: '自动上传' },
      { name: 'showFileList', type: 'boolean', default: 'true', desc: '显示文件列表' },
      { name: 'fileList', type: 'UploadFile[]', default: '—', desc: '文件列表' },
      { name: 'limit', type: 'number', default: '—', desc: '最大上传数量' },
      { name: 'maxSize', type: 'number', default: '—', desc: '最大文件大小 (bytes)' },
      { name: 'disabled', type: 'boolean', default: 'false', desc: '禁用' },
      { name: 'tip', type: 'string', default: '—', desc: '提示文字' },
    ],
    events: [
      { name: 'success', params: '(response, file)', desc: '上传成功' },
      { name: 'error', params: '(error, file)', desc: '上传失败' },
      { name: 'progress', params: '(event, file)', desc: '上传进度' },
      { name: 'change', params: '(file)', desc: '文件状态变化' },
    ],
    slots: [{ name: 'tip', desc: '提示信息' }],
    demos: [
      {
        title: '基础用法',
        code: `<template>
  <df-upload action="/api/upload" :limit="3" tip="只能上传 jpg/png 文件，且不超过 2MB" />
</template>`,
      },
      {
        title: '拖拽上传',
        code: `<template>
  <df-upload action="/api/upload" drag accept=".jpg,.png,.gif" />
</template>`,
      },
    ],
  },
  {
    slug: 'form',
    name: 'DfForm',
    zhName: '表单',
    desc: '基于 DevExtreme DxForm 封装的表单容器组件，支持字段配置化和验证。',
    dx: 'DxForm',
    props: [
      { name: 'formData', type: 'object', default: '—', desc: '表单数据对象（必填）' },
      { name: 'fields', type: 'FormField[]', default: '—', desc: '字段配置数组' },
      { name: 'readOnly', type: 'boolean', default: 'false', desc: '只读模式' },
    ],
    events: [],
    slots: [{ name: 'default', desc: '自定义表单项' }],
    demos: [
      {
        title: '基础用法',
        code: `<script setup lang="ts">
import { ref } from 'vue'
const formData = ref({ name: '', age: null, gender: '' })
<\/script>
<template>
  <df-form :form-data="formData">
    <df-input v-model="formData.name" placeholder="姓名" />
    <df-input-number v-model="formData.age" placeholder="年龄" />
  </df-form>
</template>`,
      },
    ],
  },

  // ────────── 数据展示 ──────────
  {
    slug: 'table',
    name: 'DfTable',
    zhName: '表格',
    desc: '基于 DevExtreme DxDataGrid 封装的核心表格组件，支持分页、排序、选择、列固定、操作按钮等完整功能。',
    dx: 'DxDataGrid',
    props: [
      { name: 'columns', type: 'TableColumn[]', default: '[]', desc: '列配置' },
      { name: 'dataSource', type: 'any[] | DataStore', default: '—', desc: '数据源' },
      { name: 'hasPage', type: 'boolean', default: 'false', desc: '显示分页' },
      { name: 'hasSelect', type: 'boolean', default: 'false', desc: '显示选择列' },
      { name: 'keyExpr', type: 'string', default: `'id'`, desc: '行唯一键' },
      { name: 'operationButtons', type: 'OperationButton[]', default: '—', desc: '操作按钮' },
      { name: 'hoverStateEnabled', type: 'boolean', default: 'true', desc: '行悬停高亮' },
    ],
    events: [
      { name: 'row-click', params: '(e)', desc: '行点击' },
      { name: 'focused-row-changed', params: '(e)', desc: '焦点行变化' },
      { name: 'selection-changed', params: '(e)', desc: '选择变化' },
    ],
    slots: [{ name: '[column.slot]', desc: '列模板插槽（动态名称）' }],
    demos: [
      {
        title: '基础用法',
        code: `<script setup lang="ts">
import { ref } from 'vue'
const columns = [
  { dataField: 'name', caption: '姓名', width: 120 },
  { dataField: 'age', caption: '年龄', width: 80 },
  { dataField: 'department', caption: '科室' },
]
const data = [
  { id: 1, name: '张三', age: 30, department: '内科' },
  { id: 2, name: '李四', age: 25, department: '外科' },
  { id: 3, name: '王五', age: 35, department: '儿科' },
]
<\/script>
<template>
  <df-table :columns="columns" :data-source="data" key-expr="id" has-page has-select />
</template>`,
      },
    ],
  },
  {
    slug: 'tree-table',
    name: 'DfTreeTable',
    zhName: '树表格',
    desc: '基于 DevExtreme DxTreeList 封装的树形表格组件，支持父子级数据展示。',
    dx: 'DxTreeList',
    props: [
      { name: 'columns', type: 'any[]', default: '[]', desc: '列配置' },
      { name: 'dataSource', type: 'any[]', default: '[]', desc: '数据源' },
      { name: 'rowKey', type: 'string', default: `'id'`, desc: '行唯一键' },
      { name: 'parentIdExpr', type: 'string', default: `'parentId'`, desc: '父级 ID 字段' },
      { name: 'defaultExpandAll', type: 'boolean', default: 'false', desc: '默认全部展开' },
      { name: 'showCheckbox', type: 'boolean', default: 'false', desc: '显示复选框' },
      { name: 'sortable', type: 'boolean', default: 'false', desc: '可排序' },
      { name: 'filterable', type: 'boolean', default: 'false', desc: '可过滤' },
      { name: 'emptyText', type: 'string', default: `'暂无数据'`, desc: '空数据提示' },
    ],
    events: [
      { name: 'row-click', params: '(e)', desc: '行点击' },
      { name: 'selection-changed', params: '(e)', desc: '选择变化' },
      { name: 'row-expanded', params: '(e)', desc: '行展开' },
      { name: 'row-collapsed', params: '(e)', desc: '行折叠' },
    ],
    slots: [
      { name: '[column.slot]', desc: '列模板插槽' },
      { name: 'toolbar', desc: '工具栏' },
    ],
    demos: [
      {
        title: '基础用法',
        code: `<script setup lang="ts">
const columns = [
  { dataField: 'name', caption: '名称' },
  { dataField: 'code', caption: '编码', width: 120 },
]
const data = [
  { id: 1, parentId: 0, name: '总院', code: '001' },
  { id: 2, parentId: 1, name: '内科', code: '001-01' },
  { id: 3, parentId: 1, name: '外科', code: '001-02' },
  { id: 4, parentId: 2, name: '心内科', code: '001-01-01' },
]
<\/script>
<template>
  <df-tree-table :columns="columns" :data-source="data" default-expand-all />
</template>`,
      },
    ],
  },
  {
    slug: 'tree',
    name: 'DfTree',
    zhName: '树形控件',
    desc: '基于 DevExtreme DxTreeView 封装的树形组件，支持懒加载、拖拽、虚拟滚动。',
    dx: 'DxTreeView',
    props: [
      { name: 'data', type: 'any[]', default: '[]', desc: '树数据' },
      { name: 'nodeKey', type: 'string', default: `'id'`, desc: '节点唯一键' },
      { name: 'displayExpr', type: 'string', default: `'text'`, desc: '显示字段' },
      { name: 'showCheckbox', type: 'boolean', default: 'false', desc: '显示复选框' },
      { name: 'checkStrictly', type: 'boolean', default: 'false', desc: '父子不关联' },
      { name: 'defaultExpandAll', type: 'boolean', default: 'false', desc: '全部展开' },
      { name: 'highlightCurrent', type: 'boolean', default: 'false', desc: '高亮当前节点' },
      { name: 'accordion', type: 'boolean', default: 'false', desc: '手风琴模式' },
      { name: 'filterable', type: 'boolean', default: 'false', desc: '可搜索' },
      { name: 'draggable', type: 'boolean', default: 'false', desc: '可拖拽' },
      { name: 'virtualMode', type: 'boolean', default: 'false', desc: '虚拟滚动' },
    ],
    events: [
      { name: 'node-click', params: '(data)', desc: '节点点击' },
      { name: 'check-change', params: '(data)', desc: '选中变化' },
    ],
    slots: [{ name: 'default', desc: '自定义节点内容' }],
    demos: [
      {
        title: '基础用法',
        code: `<script setup lang="ts">
const treeData = [
  { id: 1, text: '一级 1', children: [
    { id: 11, text: '二级 1-1' },
    { id: 12, text: '二级 1-2' },
  ]},
  { id: 2, text: '一级 2', children: [
    { id: 21, text: '二级 2-1' },
  ]},
]
<\/script>
<template>
  <df-tree :data="treeData" default-expand-all show-checkbox />
</template>`,
      },
    ],
  },
  {
    slug: 'pagination',
    name: 'DfPagination',
    zhName: '分页',
    desc: '分页器组件，独立使用时控制数据分页。',
    dx: null,
    props: [
      { name: 'total', type: 'number', default: '0', desc: '总条目数' },
      { name: 'pageSize / v-model:pageSize', type: 'number', default: '10', desc: '每页条数' },
      { name: 'currentPage / v-model:currentPage', type: 'number', default: '1', desc: '当前页' },
      { name: 'pageSizes', type: 'number[]', default: '[10, 20, 30, 50, 100]', desc: '每页条数选项' },
      { name: 'layout', type: 'string', default: `'prev, pager, next, jumper, ->, total'`, desc: '布局' },
      { name: 'background', type: 'boolean', default: 'false', desc: '按钮背景色' },
      { name: 'disabled', type: 'boolean', default: 'false', desc: '禁用' },
    ],
    events: [
      { name: 'size-change', params: '(size: number)', desc: '每页条数变化' },
      { name: 'current-change', params: '(page: number)', desc: '当前页变化' },
    ],
    slots: [],
    demos: [
      {
        title: '基础用法',
        code: `<script setup lang="ts">
import { ref } from 'vue'
const currentPage = ref(1)
const pageSize = ref(10)
<\/script>
<template>
  <df-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :total="100" background />
</template>`,
      },
    ],
  },
  {
    slug: 'badge',
    name: 'DfBadge',
    zhName: '徽章',
    desc: '徽章组件，用于显示数量或状态标记。',
    dx: null,
    props: [
      { name: 'value', type: 'string | number', default: `''`, desc: '显示值' },
      { name: 'max', type: 'number', default: '—', desc: '最大值（超出显示 max+）' },
      { name: 'isDot', type: 'boolean', default: 'false', desc: '圆点模式' },
      { name: 'hidden', type: 'boolean', default: 'false', desc: '隐藏' },
      { name: 'type', type: `'primary' \\| 'success' \\| 'warning' \\| 'danger' \\| 'info'`, default: `'danger'`, desc: '类型' },
    ],
    events: [],
    slots: [{ name: 'default', desc: '被包裹内容' }],
    demos: [
      {
        title: '基础用法',
        code: `<template>
  <df-space :size="24">
    <df-badge :value="12"><df-button>消息</df-button></df-badge>
    <df-badge :value="200" :max="99"><df-button>评论</df-button></df-badge>
    <df-badge is-dot><df-button>通知</df-button></df-badge>
  </df-space>
</template>`,
      },
    ],
  },
  {
    slug: 'avatar',
    name: 'DfAvatar',
    zhName: '头像',
    desc: '头像组件，支持图片、图标和文字三种模式。',
    dx: null,
    props: [
      { name: 'size', type: `'large' \\| 'default' \\| 'small' \\| number`, default: `'default'`, desc: '尺寸' },
      { name: 'shape', type: `'circle' \\| 'square'`, default: `'circle'`, desc: '形状' },
      { name: 'src', type: 'string', default: '—', desc: '图片地址' },
      { name: 'alt', type: 'string', default: '—', desc: '替代文字' },
      { name: 'icon', type: 'string', default: '—', desc: '图标类名' },
      { name: 'fit', type: `'fill' \\| 'contain' \\| 'cover' \\| 'none' \\| 'scale-down'`, default: `'cover'`, desc: '图片适配' },
    ],
    events: [{ name: 'error', params: '(e: Event)', desc: '图片加载失败' }],
    slots: [{ name: 'default', desc: '自定义内容（文字）' }],
    demos: [
      {
        title: '基础用法',
        code: `<template>
  <df-space>
    <df-avatar icon="dx-icon-user" />
    <df-avatar>张</df-avatar>
    <df-avatar shape="square" :size="40">DF</df-avatar>
  </df-space>
</template>`,
      },
    ],
  },
  {
    slug: 'card',
    name: 'DfCard',
    zhName: '卡片',
    desc: '卡片容器组件。',
    dx: null,
    props: [
      { name: 'header', type: 'string', default: '—', desc: '标题' },
      { name: 'shadow', type: `'always' \\| 'hover' \\| 'never'`, default: `'always'`, desc: '阴影模式' },
      { name: 'bodyStyle', type: 'object | string', default: '—', desc: '内容区域样式' },
    ],
    events: [],
    slots: [
      { name: 'header', desc: '自定义头部' },
      { name: 'default', desc: '卡片内容' },
    ],
    demos: [
      {
        title: '基础用法',
        code: `<template>
  <df-card header="卡片标题" shadow="hover">
    <p>这是卡片内容。</p>
  </df-card>
</template>`,
      },
    ],
  },
  {
    slug: 'carousel',
    name: 'DfCarousel',
    zhName: '走马灯',
    desc: '走马灯/轮播图组件。子组件 `DfCarouselItem` 用于包裹每一项。',
    dx: null,
    props: [
      { name: 'height', type: 'string | number', default: `'300px'`, desc: '高度' },
      { name: 'autoplay', type: 'boolean', default: 'true', desc: '自动播放' },
      { name: 'interval', type: 'number', default: '3000', desc: '自动播放间隔 (ms)' },
      { name: 'showIndicators', type: 'boolean', default: 'true', desc: '显示指示器' },
      { name: 'showArrow', type: `'always' \\| 'hover' \\| 'never'`, default: `'hover'`, desc: '箭头显示' },
      { name: 'type', type: `'default' \\| 'card'`, default: `'default'`, desc: '类型' },
      { name: 'direction', type: `'horizontal' \\| 'vertical'`, default: `'horizontal'`, desc: '方向' },
      { name: 'loop', type: 'boolean', default: 'true', desc: '循环播放' },
    ],
    events: [{ name: 'change', params: '(current, prev)', desc: '切换时触发' }],
    slots: [{ name: 'default', desc: '放置 DfCarouselItem' }],
    demos: [
      {
        title: '基础用法',
        code: `<template>
  <df-carousel height="200px">
    <df-carousel-item v-for="i in 4" :key="i">
      <div style="background: #2AA890; color: #fff; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 24px;">
        {{ i }}
      </div>
    </df-carousel-item>
  </df-carousel>
</template>`,
      },
    ],
  },
  {
    slug: 'collapse',
    name: 'DfCollapse',
    zhName: '折叠面板',
    desc: '折叠面板组件。子组件 `DfCollapseItem` 用于包裹每一项。',
    dx: null,
    props: [
      { name: 'modelValue / v-model', type: 'string | number | Array', default: '—', desc: '当前展开的面板' },
      { name: 'accordion', type: 'boolean', default: 'false', desc: '手风琴模式' },
    ],
    events: [{ name: 'change', params: '(activeNames)', desc: '展开项变化' }],
    slots: [{ name: 'default', desc: '放置 DfCollapseItem' }],
    demos: [
      {
        title: '基础用法',
        code: `<script setup lang="ts">
import { ref } from 'vue'
const active = ref(['1'])
<\/script>
<template>
  <df-collapse v-model="active">
    <df-collapse-item title="面板一" name="1">内容一</df-collapse-item>
    <df-collapse-item title="面板二" name="2">内容二</df-collapse-item>
    <df-collapse-item title="面板三" name="3">内容三</df-collapse-item>
  </df-collapse>
</template>`,
      },
    ],
  },
  {
    slug: 'divider',
    name: 'DfDivider',
    zhName: '分割线',
    desc: '分割线组件。',
    dx: null,
    props: [
      { name: 'direction', type: `'horizontal' \\| 'vertical'`, default: `'horizontal'`, desc: '方向' },
      { name: 'contentPosition', type: `'left' \\| 'center' \\| 'right'`, default: `'center'`, desc: '文字位置' },
      { name: 'borderStyle', type: `'solid' \\| 'dashed' \\| 'dotted'`, default: `'solid'`, desc: '边框样式' },
    ],
    events: [],
    slots: [{ name: 'default', desc: '分割线文字' }],
    demos: [
      {
        title: '基础用法',
        code: `<template>
  <p>段落一</p>
  <df-divider />
  <p>段落二</p>
  <df-divider content-position="left">左侧文字</df-divider>
  <p>段落三</p>
  <df-divider border-style="dashed">虚线</df-divider>
</template>`,
      },
    ],
  },
  {
    slug: 'empty',
    name: 'DfEmpty',
    zhName: '空状态',
    desc: '空状态提示组件。',
    dx: null,
    props: [
      { name: 'description', type: 'string', default: `'暂无数据'`, desc: '描述文字' },
      { name: 'imageSize', type: 'number', default: '160', desc: '图片大小' },
    ],
    events: [],
    slots: [
      { name: 'image', desc: '自定义图片' },
      { name: 'default', desc: '自定义描述' },
      { name: 'bottom', desc: '底部操作区域' },
    ],
    demos: [
      {
        title: '基础用法',
        code: `<template>
  <df-empty description="暂无数据" />
  <df-empty>
    <template #bottom>
      <df-button type="primary">创建数据</df-button>
    </template>
  </df-empty>
</template>`,
      },
    ],
  },
  {
    slug: 'image',
    name: 'DfImage',
    zhName: '图片',
    desc: '图片组件，支持懒加载和预览。',
    dx: null,
    props: [
      { name: 'src', type: 'string', default: '—', desc: '图片地址' },
      { name: 'fit', type: `'fill' \\| 'contain' \\| 'cover' \\| 'none' \\| 'scale-down'`, default: `'fill'`, desc: '适配方式' },
      { name: 'alt', type: 'string', default: '—', desc: '替代文字' },
      { name: 'lazy', type: 'boolean', default: 'false', desc: '懒加载' },
      { name: 'previewSrcList', type: 'string[]', default: '[]', desc: '预览图片列表' },
      { name: 'zIndex', type: 'number', default: '2000', desc: '预览层级' },
    ],
    events: [
      { name: 'load', params: '(e: Event)', desc: '加载成功' },
      { name: 'error', params: '(e: Event)', desc: '加载失败' },
    ],
    slots: [
      { name: 'placeholder', desc: '加载中占位' },
      { name: 'error', desc: '加载失败占位' },
    ],
    demos: [
      {
        title: '基础用法',
        code: `<template>
  <df-space>
    <df-image style="width: 100px; height: 100px" fit="cover" src="https://via.placeholder.com/200" />
    <df-image style="width: 100px; height: 100px" fit="contain" src="https://via.placeholder.com/200" />
  </df-space>
</template>`,
      },
    ],
  },
  {
    slug: 'progress',
    name: 'DfProgress',
    zhName: '进度条',
    desc: '进度条组件，支持线形、环形、仪表盘三种形态。',
    dx: null,
    props: [
      { name: 'type', type: `'line' \\| 'circle' \\| 'dashboard'`, default: `'line'`, desc: '类型' },
      { name: 'percentage', type: 'number', default: '0', desc: '百分比 (0-100)' },
      { name: 'status', type: `'' \\| 'success' \\| 'exception' \\| 'warning'`, default: `''`, desc: '状态' },
      { name: 'strokeWidth', type: 'number', default: '6', desc: '线宽' },
      { name: 'textInside', type: 'boolean', default: 'false', desc: '文字在线内' },
      { name: 'showText', type: 'boolean', default: 'true', desc: '显示文字' },
      { name: 'color', type: 'string | Array | Function', default: '—', desc: '自定义颜色' },
    ],
    events: [],
    slots: [{ name: 'default', desc: '自定义文字内容' }],
    demos: [
      {
        title: '基础用法',
        code: `<template>
  <df-space direction="vertical" fill style="width: 400px">
    <df-progress :percentage="20" />
    <df-progress :percentage="50" status="success" />
    <df-progress :percentage="80" status="warning" />
    <df-progress :percentage="100" status="exception" />
  </df-space>
</template>`,
      },
    ],
  },
  {
    slug: 'timeline',
    name: 'DfTimeline',
    zhName: '时间线',
    desc: '时间线组件。子组件 `DfTimelineItem` 用于包裹每一项。',
    dx: null,
    props: [
      { name: 'reverse', type: 'boolean', default: '—', desc: '倒序' },
    ],
    events: [],
    slots: [{ name: 'default', desc: '放置 DfTimelineItem' }],
    demos: [
      {
        title: '基础用法',
        code: `<template>
  <df-timeline>
    <df-timeline-item timestamp="2024-01-01">创建项目</df-timeline-item>
    <df-timeline-item timestamp="2024-02-15" type="success">完成开发</df-timeline-item>
    <df-timeline-item timestamp="2024-03-01" type="warning">提交审核</df-timeline-item>
  </df-timeline>
</template>`,
      },
    ],
  },
  {
    slug: 'steps',
    name: 'DfSteps',
    zhName: '步骤条',
    desc: '步骤条组件。子组件 `DfStep` 用于定义每一步。',
    dx: null,
    props: [
      { name: 'active', type: 'number', default: '0', desc: '当前步骤（从 0 开始）' },
      { name: 'direction', type: `'horizontal' \\| 'vertical'`, default: `'horizontal'`, desc: '方向' },
      { name: 'alignCenter', type: 'boolean', default: 'false', desc: '居中对齐' },
      { name: 'simple', type: 'boolean', default: 'false', desc: '简洁风格' },
      { name: 'finishStatus', type: `'wait' \\| 'process' \\| 'finish' \\| 'success' \\| 'error'`, default: `'finish'`, desc: '已完成步骤状态' },
      { name: 'processStatus', type: `'wait' \\| 'process' \\| 'finish' \\| 'success' \\| 'error'`, default: `'process'`, desc: '当前步骤状态' },
    ],
    events: [],
    slots: [{ name: 'default', desc: '放置 DfStep' }],
    demos: [
      {
        title: '基础用法',
        code: `<template>
  <df-steps :active="1">
    <df-step title="挂号" description="完成挂号" />
    <df-step title="就诊" description="当前步骤" />
    <df-step title="取药" description="等待中" />
  </df-steps>
</template>`,
      },
    ],
  },
  {
    slug: 'calendar',
    name: 'DfCalendar',
    zhName: '日历',
    desc: '基于 DevExtreme DxCalendar 封装的日历组件。',
    dx: 'DxCalendar',
    props: [
      { name: 'modelValue / v-model', type: 'Date | string | null', default: '—', desc: '绑定日期' },
      { name: 'min', type: 'Date | string', default: '—', desc: '最小日期' },
      { name: 'max', type: 'Date | string', default: '—', desc: '最大日期' },
      { name: 'disabled', type: 'boolean', default: 'false', desc: '禁用' },
      { name: 'firstDayOfWeek', type: '0-6', default: '1', desc: '每周起始日' },
      { name: 'zoomLevel', type: `'month' \\| 'year' \\| 'decade' \\| 'century'`, default: `'month'`, desc: '缩放级别' },
      { name: 'size', type: `'large' \\| 'default' \\| 'small'`, default: `'default'`, desc: '尺寸' },
    ],
    events: [
      { name: 'update:modelValue', params: '(value)', desc: '值改变' },
      { name: 'change', params: '(value)', desc: '日期变化' },
    ],
    slots: [{ name: 'cell', desc: '自定义日期单元格' }],
    demos: [
      {
        title: '基础用法',
        code: `<script setup lang="ts">
import { ref } from 'vue'
const date = ref(new Date())
<\/script>
<template>
  <df-calendar v-model="date" />
</template>`,
      },
    ],
  },
  {
    slug: 'dict-tag',
    name: 'DfDictTag',
    zhName: '字典标签',
    desc: '字典值显示组件，通过字典编码和值自动查询对应标签。',
    dx: null,
    props: [
      { name: 'dictCode', type: 'string', default: '—', desc: '字典编码（必填）' },
      { name: 'value', type: 'string | number', default: '—', desc: '字典值（必填）' },
      { name: 'tag', type: 'boolean', default: '—', desc: '是否以标签样式显示' },
      { name: 'color', type: 'string', default: '—', desc: '自定义颜色' },
    ],
    events: [],
    slots: [],
    demos: [
      {
        title: '基础用法',
        desc: '需在 install 时配置字典服务。',
        code: `<template>
  <df-dict-tag dict-code="sys_gender" :value="1" />
  <df-dict-tag dict-code="sys_status" :value="0" tag />
</template>`,
      },
    ],
  },
  {
    slug: 'export-btn',
    name: 'DfExportBtn',
    zhName: '导出按钮',
    desc: '导出按钮组件，支持列选择和分组导出。',
    dx: null,
    props: [
      { name: 'btnConfig', type: '{ type?, icon?, text? }', default: '—', desc: '按钮配置' },
      { name: 'columnConfig', type: 'ColumnConfig[]', default: '—', desc: '导出列配置' },
      { name: 'groupByFields', type: 'string[]', default: '—', desc: '分组字段' },
      { name: 'subtotalFields', type: 'string[]', default: '—', desc: '小计字段' },
      { name: 'totalFields', type: 'string[]', default: '—', desc: '合计字段' },
    ],
    events: [{ name: 'export', params: '(columns, options)', desc: '点击导出' }],
    slots: [],
    demos: [
      {
        title: '基础用法',
        code: `<script setup lang="ts">
const columns = [
  { dataField: 'name', caption: '姓名' },
  { dataField: 'department', caption: '科室' },
]
<\/script>
<template>
  <df-export-btn :column-config="columns" />
</template>`,
      },
    ],
  },

  // ────────── 导航组件 ──────────
  {
    slug: 'breadcrumb',
    name: 'DfBreadcrumb',
    zhName: '面包屑',
    desc: '面包屑导航组件。子组件 `DfBreadcrumbItem` 用于每一级。',
    dx: null,
    props: [
      { name: 'separator', type: 'string', default: `'/'`, desc: '分隔符' },
      { name: 'separatorIcon', type: 'string', default: '—', desc: '分隔符图标' },
    ],
    events: [],
    slots: [{ name: 'default', desc: '放置 DfBreadcrumbItem' }],
    demos: [
      {
        title: '基础用法',
        code: `<template>
  <df-breadcrumb>
    <df-breadcrumb-item>首页</df-breadcrumb-item>
    <df-breadcrumb-item>门诊管理</df-breadcrumb-item>
    <df-breadcrumb-item>挂号列表</df-breadcrumb-item>
  </df-breadcrumb>
</template>`,
      },
    ],
  },
  {
    slug: 'dropdown',
    name: 'DfDropdown',
    zhName: '下拉菜单',
    desc: '下拉菜单组件。子组件 `DfDropdownMenu` 和 `DfDropdownItem` 用于构建菜单项。',
    dx: null,
    props: [
      { name: 'trigger', type: `'hover' \\| 'click'`, default: `'hover'`, desc: '触发方式' },
      { name: 'placement', type: `'bottom' \\| 'bottom-start' \\| 'bottom-end' \\| 'top' \\| 'top-start' \\| 'top-end'`, default: `'bottom-end'`, desc: '弹出位置' },
      { name: 'hideOnClick', type: 'boolean', default: 'true', desc: '点击后关闭' },
      { name: 'splitButton', type: 'boolean', default: 'false', desc: '分裂按钮模式' },
      { name: 'disabled', type: 'boolean', default: 'false', desc: '禁用' },
    ],
    events: [
      { name: 'command', params: '(command)', desc: '菜单项点击' },
      { name: 'visible-change', params: '(visible: boolean)', desc: '可见性变化' },
    ],
    slots: [
      { name: 'default', desc: '触发元素' },
      { name: 'dropdown', desc: '下拉菜单内容' },
    ],
    demos: [
      {
        title: '基础用法',
        code: `<template>
  <df-dropdown @command="(cmd) => console.log(cmd)">
    <df-button type="primary">
      更多操作 <df-icon name="spindown" />
    </df-button>
    <template #dropdown>
      <df-dropdown-menu>
        <df-dropdown-item command="edit">编辑</df-dropdown-item>
        <df-dropdown-item command="copy">复制</df-dropdown-item>
        <df-dropdown-item command="delete" divided>删除</df-dropdown-item>
      </df-dropdown-menu>
    </template>
  </df-dropdown>
</template>`,
      },
    ],
  },
  {
    slug: 'menu',
    name: 'DfMenu',
    zhName: '菜单',
    desc: '菜单组件。子组件 `DfMenuItem`、`DfSubmenu`、`DfMenuItemGroup` 用于构建菜单结构。',
    dx: null,
    props: [
      { name: 'mode', type: `'horizontal' \\| 'vertical'`, default: `'vertical'`, desc: '模式' },
      { name: 'defaultActive', type: 'string', default: `''`, desc: '默认激活菜单项' },
      { name: 'collapse', type: 'boolean', default: 'false', desc: '折叠（仅 vertical）' },
      { name: 'backgroundColor', type: 'string', default: `''`, desc: '背景色' },
      { name: 'textColor', type: 'string', default: `''`, desc: '文字颜色' },
      { name: 'activeTextColor', type: 'string', default: `''`, desc: '激活文字颜色' },
      { name: 'uniqueOpened', type: 'boolean', default: 'false', desc: '只保持一个子菜单展开' },
      { name: 'router', type: 'boolean', default: 'false', desc: '路由模式' },
    ],
    events: [
      { name: 'select', params: '(index, indexPath)', desc: '菜单项选择' },
      { name: 'open', params: '(index, indexPath)', desc: '子菜单展开' },
      { name: 'close', params: '(index, indexPath)', desc: '子菜单关闭' },
    ],
    slots: [{ name: 'default', desc: '放置 DfMenuItem / DfSubmenu' }],
    demos: [
      {
        title: '基础用法',
        code: `<template>
  <df-menu default-active="1">
    <df-menu-item index="1">
      <df-icon name="home" /> 首页
    </df-menu-item>
    <df-submenu index="2">
      <template #title><df-icon name="folder" /> 门诊</template>
      <df-menu-item index="2-1">挂号</df-menu-item>
      <df-menu-item index="2-2">就诊</df-menu-item>
    </df-submenu>
    <df-menu-item index="3">
      <df-icon name="preferences" /> 设置
    </df-menu-item>
  </df-menu>
</template>`,
      },
    ],
  },
  {
    slug: 'page-header',
    name: 'DfPageHeader',
    zhName: '页头',
    desc: '页面头部组件，包含返回按钮、标题和操作区域。',
    dx: null,
    props: [
      { name: 'title', type: 'string', default: `''`, desc: '标题' },
      { name: 'subTitle', type: 'string', default: `''`, desc: '副标题' },
      { name: 'showBack', type: 'boolean', default: 'true', desc: '显示返回按钮' },
      { name: 'backText', type: 'string', default: `'返回'`, desc: '返回按钮文字' },
    ],
    events: [{ name: 'back', params: '()', desc: '点击返回' }],
    slots: [
      { name: 'title', desc: '自定义标题' },
      { name: 'subTitle', desc: '自定义副标题' },
      { name: 'extra', desc: '右侧操作区域' },
      { name: 'default', desc: '内容区域' },
      { name: 'breadcrumb', desc: '面包屑区域' },
    ],
    demos: [
      {
        title: '基础用法',
        code: `<template>
  <df-page-header title="患者列表" sub-title="门诊管理" @back="() => {}">
    <template #extra>
      <df-button type="primary">新增患者</df-button>
    </template>
  </df-page-header>
</template>`,
      },
    ],
  },
  {
    slug: 'tabs',
    name: 'DfTabs',
    zhName: '标签页',
    desc: '基于 DevExtreme DxTabPanel 封装的标签页组件。子组件 `DfTabPane` 定义每个面板。',
    dx: 'DxTabPanel',
    props: [
      { name: 'modelValue / v-model', type: 'string | number', default: '—', desc: '当前激活标签' },
      { name: 'type', type: `'' \\| 'card' \\| 'border-card'`, default: `''`, desc: '标签类型' },
      { name: 'closable', type: 'boolean', default: 'false', desc: '可关闭' },
      { name: 'addable', type: 'boolean', default: 'false', desc: '可新增' },
      { name: 'animated', type: 'boolean', default: 'true', desc: '动画效果' },
    ],
    events: [
      { name: 'tab-click', params: '(tab, e)', desc: '标签点击' },
      { name: 'tab-remove', params: '(name)', desc: '标签移除' },
      { name: 'tab-add', params: '()', desc: '新增标签' },
    ],
    slots: [{ name: 'default', desc: '放置 DfTabPane' }],
    demos: [
      {
        title: '基础用法',
        code: `<script setup lang="ts">
import { ref } from 'vue'
const activeTab = ref('1')
<\/script>
<template>
  <df-tabs v-model="activeTab">
    <df-tab-pane label="基本信息" name="1">基本信息内容</df-tab-pane>
    <df-tab-pane label="诊断记录" name="2">诊断记录内容</df-tab-pane>
    <df-tab-pane label="处方信息" name="3">处方信息内容</df-tab-pane>
  </df-tabs>
</template>`,
      },
    ],
  },
  {
    slug: 'backtop',
    name: 'DfBacktop',
    zhName: '回到顶部',
    desc: '回到顶部按钮，滚动超过阈值后显示。',
    dx: null,
    props: [
      { name: 'visibilityHeight', type: 'number', default: '200', desc: '滚动高度阈值' },
      { name: 'right', type: 'number', default: '40', desc: '距右侧距离 (px)' },
      { name: 'bottom', type: 'number', default: '40', desc: '距底部距离 (px)' },
      { name: 'target', type: 'string', default: '—', desc: '目标容器选择器' },
    ],
    events: [{ name: 'click', params: '(e: MouseEvent)', desc: '点击触发' }],
    slots: [{ name: 'default', desc: '自定义按钮内容' }],
    demos: [
      {
        title: '基础用法',
        code: `<template>
  <!-- 默认监听 window 滚动 -->
  <df-backtop :visibility-height="200" :right="40" :bottom="40" />
</template>`,
      },
    ],
  },

  // ────────── 反馈组件 ──────────
  {
    slug: 'dialog',
    name: 'DfDialog',
    zhName: '对话框',
    desc: '基于 DevExtreme DxPopup 封装的对话框组件，支持拖拽、尺寸预设和自定义底部。',
    dx: 'DxPopup',
    props: [
      { name: 'modelValue / v-model', type: 'boolean', default: '—', desc: '显示/隐藏' },
      { name: 'title', type: 'string', default: `''`, desc: '标题' },
      { name: 'width', type: 'number | string', default: '—', desc: '宽度' },
      { name: 'height', type: 'number | string', default: '—', desc: '高度' },
      { name: 'size', type: `'sm' \\| 'md' \\| 'lg' \\| 'xl' \\| 'fullscreen'`, default: `'md'`, desc: '尺寸预设' },
      { name: 'showCloseButton', type: 'boolean', default: 'true', desc: '显示关闭按钮' },
      { name: 'dragEnabled', type: 'boolean', default: 'true', desc: '可拖拽' },
      { name: 'showDefaultFooter', type: 'boolean', default: 'true', desc: '显示默认底部按钮' },
      { name: 'confirmText', type: 'string', default: `'确定'`, desc: '确认按钮文字' },
      { name: 'cancelText', type: 'string', default: `'取消'`, desc: '取消按钮文字' },
      { name: 'confirmLoading', type: 'boolean', default: 'false', desc: '确认按钮加载状态' },
    ],
    events: [
      { name: 'update:modelValue', params: '(value: boolean)', desc: '显示状态变化' },
      { name: 'confirm', params: '()', desc: '点击确认' },
      { name: 'cancel', params: '()', desc: '点击取消' },
      { name: 'close', params: '()', desc: '关闭' },
      { name: 'shown', params: '()', desc: '显示完成' },
    ],
    slots: [
      { name: 'default', desc: '对话框内容' },
      { name: 'footer', desc: '自定义底部' },
    ],
    demos: [
      {
        title: '基础用法',
        code: `<script setup lang="ts">
import { ref } from 'vue'
const visible = ref(false)
<\/script>
<template>
  <df-button type="primary" @click="visible = true">打开对话框</df-button>
  <df-dialog v-model="visible" title="编辑患者" size="md" @confirm="visible = false">
    <p>对话框内容</p>
  </df-dialog>
</template>`,
      },
    ],
  },
  {
    slug: 'drawer',
    name: 'DfDrawer',
    zhName: '抽屉',
    desc: '基于 DevExtreme DxPopup 封装的抽屉组件，从屏幕边缘滑入。',
    dx: 'DxPopup',
    props: [
      { name: 'modelValue / v-model', type: 'boolean', default: 'false', desc: '显示/隐藏' },
      { name: 'title', type: 'string', default: `''`, desc: '标题' },
      { name: 'size', type: 'string | number', default: `'30%'`, desc: '宽度/高度' },
      { name: 'direction', type: `'rtl' \\| 'ltr' \\| 'ttb' \\| 'btt'`, default: `'rtl'`, desc: '方向' },
      { name: 'modal', type: 'boolean', default: 'true', desc: '遮罩' },
      { name: 'showClose', type: 'boolean', default: 'true', desc: '关闭按钮' },
      { name: 'wrapperClosable', type: 'boolean', default: 'true', desc: '点击遮罩关闭' },
      { name: 'destroyOnClose', type: 'boolean', default: 'false', desc: '关闭后销毁' },
    ],
    events: [
      { name: 'open', params: '()', desc: '打开' },
      { name: 'close', params: '()', desc: '关闭' },
    ],
    slots: [
      { name: 'default', desc: '抽屉内容' },
      { name: 'footer', desc: '底部内容' },
    ],
    demos: [
      {
        title: '基础用法',
        code: `<script setup lang="ts">
import { ref } from 'vue'
const visible = ref(false)
<\/script>
<template>
  <df-button @click="visible = true">打开抽屉</df-button>
  <df-drawer v-model="visible" title="患者详情" size="40%">
    <p>抽屉内容</p>
  </df-drawer>
</template>`,
      },
    ],
  },
  {
    slug: 'loading',
    name: 'DfLoading',
    zhName: '加载',
    desc: '加载指示器组件。',
    dx: null,
    props: [
      { name: 'loading', type: 'boolean', default: 'false', desc: '加载状态' },
      { name: 'text', type: 'string', default: `''`, desc: '加载文字' },
      { name: 'fullscreen', type: 'boolean', default: 'false', desc: '全屏模式' },
    ],
    events: [],
    slots: [],
    demos: [
      {
        title: '基础用法',
        code: `<script setup lang="ts">
import { ref } from 'vue'
const loading = ref(true)
<\/script>
<template>
  <df-loading :loading="loading" text="加载中..." />
</template>`,
      },
    ],
  },
  {
    slug: 'message',
    name: 'DfMessage',
    zhName: '消息',
    desc: '全局消息提示，函数式调用。',
    dx: null,
    props: [
      { name: 'message', type: 'string', default: `''`, desc: '消息内容' },
      { name: 'type', type: `'success' \\| 'warning' \\| 'info' \\| 'error'`, default: `'info'`, desc: '消息类型' },
      { name: 'duration', type: 'number', default: '3000', desc: '显示时长 (ms)，0 为不自动关闭' },
      { name: 'showClose', type: 'boolean', default: 'false', desc: '显示关闭按钮' },
      { name: 'center', type: 'boolean', default: 'false', desc: '居中显示' },
      { name: 'offset', type: 'number', default: '20', desc: '顶部偏移' },
    ],
    events: [],
    slots: [],
    demos: [
      {
        title: '函数式调用',
        code: `<script setup lang="ts">
import { DfMessage } from 'df-web-base'

function showMessage() {
  DfMessage({ message: '操作成功', type: 'success' })
}
function showError() {
  DfMessage({ message: '操作失败', type: 'error', showClose: true })
}
<\/script>
<template>
  <df-space>
    <df-button type="success" @click="showMessage">成功消息</df-button>
    <df-button type="danger" @click="showError">错误消息</df-button>
  </df-space>
</template>`,
      },
    ],
  },
  {
    slug: 'message-box',
    name: 'DfMessageBox',
    zhName: '消息弹框',
    desc: '消息弹框，用于 alert/confirm/prompt 场景，函数式调用。',
    dx: null,
    props: [
      { name: 'title', type: 'string', default: `'提示'`, desc: '标题' },
      { name: 'message', type: 'string', default: `''`, desc: '内容' },
      { name: 'type', type: `'' \\| 'success' \\| 'warning' \\| 'info' \\| 'error'`, default: `''`, desc: '图标类型' },
      { name: 'boxType', type: `'alert' \\| 'confirm' \\| 'prompt'`, default: `'alert'`, desc: '弹框类型' },
      { name: 'confirmButtonText', type: 'string', default: `'确定'`, desc: '确认按钮文字' },
      { name: 'cancelButtonText', type: 'string', default: `'取消'`, desc: '取消按钮文字' },
      { name: 'showInput', type: 'boolean', default: 'false', desc: '显示输入框 (prompt)' },
      { name: 'inputPlaceholder', type: 'string', default: '—', desc: '输入框占位文字' },
    ],
    events: [],
    slots: [],
    demos: [
      {
        title: '函数式调用',
        code: `<script setup lang="ts">
import { DfMessageBox } from 'df-web-base'

function confirmDelete() {
  DfMessageBox({
    title: '确认删除',
    message: '确定删除该患者记录吗？',
    type: 'warning',
    boxType: 'confirm',
    callback: (action) => {
      if (action === 'confirm') {
        console.log('已删除')
      }
    }
  })
}
<\/script>
<template>
  <df-button type="danger" @click="confirmDelete">删除</df-button>
</template>`,
      },
    ],
  },
  {
    slug: 'notification',
    name: 'DfNotification',
    zhName: '通知',
    desc: '全局通知提示，函数式调用。',
    dx: null,
    props: [
      { name: 'title', type: 'string', default: `''`, desc: '标题' },
      { name: 'message', type: 'string', default: `''`, desc: '内容' },
      { name: 'type', type: `'success' \\| 'warning' \\| 'info' \\| 'error'`, default: `'info'`, desc: '类型' },
      { name: 'duration', type: 'number', default: '4500', desc: '显示时长 (ms)' },
      { name: 'position', type: `'top-right' \\| 'top-left' \\| 'bottom-right' \\| 'bottom-left'`, default: `'top-right'`, desc: '位置' },
      { name: 'showClose', type: 'boolean', default: 'true', desc: '显示关闭按钮' },
      { name: 'offset', type: 'number', default: '16', desc: '偏移' },
    ],
    events: [],
    slots: [],
    demos: [
      {
        title: '函数式调用',
        code: `<script setup lang="ts">
import { DfNotification } from 'df-web-base'

function notify() {
  DfNotification({
    title: '操作提示',
    message: '患者信息已保存成功',
    type: 'success',
  })
}
<\/script>
<template>
  <df-button @click="notify">通知</df-button>
</template>`,
      },
    ],
  },
  {
    slug: 'alert',
    name: 'DfAlert',
    zhName: '警告',
    desc: '页面内嵌的警告提示组件。',
    dx: null,
    props: [
      { name: 'title', type: 'string', default: `''`, desc: '标题' },
      { name: 'description', type: 'string', default: `''`, desc: '描述' },
      { name: 'type', type: `'success' \\| 'warning' \\| 'info' \\| 'error'`, default: `'info'`, desc: '类型' },
      { name: 'closable', type: 'boolean', default: 'true', desc: '可关闭' },
      { name: 'showIcon', type: 'boolean', default: 'false', desc: '显示图标' },
      { name: 'center', type: 'boolean', default: 'false', desc: '居中' },
      { name: 'effect', type: `'light' \\| 'dark'`, default: `'light'`, desc: '主题' },
    ],
    events: [{ name: 'close', params: '(e: MouseEvent)', desc: '关闭时触发' }],
    slots: [
      { name: 'title', desc: '自定义标题' },
      { name: 'default', desc: '自定义描述' },
    ],
    demos: [
      {
        title: '基础用法',
        code: `<template>
  <df-space direction="vertical" fill>
    <df-alert title="成功提示" type="success" show-icon />
    <df-alert title="警告提示" type="warning" show-icon />
    <df-alert title="消息提示" type="info" show-icon description="详细描述文字" />
    <df-alert title="错误提示" type="error" show-icon />
  </df-space>
</template>`,
      },
    ],
  },
  {
    slug: 'tooltip',
    name: 'DfTooltip',
    zhName: '文字提示',
    desc: '基于 DevExtreme DxTooltip 封装的文字提示组件。',
    dx: 'DxTooltip',
    props: [
      { name: 'content', type: 'string', default: `''`, desc: '提示内容' },
      { name: 'position', type: `'top' \\| 'bottom' \\| 'left' \\| 'right'`, default: `'top'`, desc: '弹出位置' },
      { name: 'effect', type: `'dark' \\| 'light'`, default: `'dark'`, desc: '主题' },
      { name: 'showDelay', type: 'number', default: '200', desc: '显示延迟 (ms)' },
      { name: 'hideDelay', type: 'number', default: '100', desc: '隐藏延迟 (ms)' },
      { name: 'disabled', type: 'boolean', default: 'false', desc: '禁用' },
    ],
    events: [],
    slots: [
      { name: 'default', desc: '触发元素' },
      { name: 'content', desc: '自定义提示内容' },
    ],
    demos: [
      {
        title: '基础用法',
        code: `<template>
  <df-space>
    <df-tooltip content="顶部提示">
      <df-button>上</df-button>
    </df-tooltip>
    <df-tooltip content="底部提示" position="bottom">
      <df-button>下</df-button>
    </df-tooltip>
  </df-space>
</template>`,
      },
    ],
  },
  {
    slug: 'popover',
    name: 'DfPopover',
    zhName: '弹出框',
    desc: '弹出框组件。',
    dx: null,
    props: [
      { name: 'trigger', type: `'hover' \\| 'click' \\| 'focus' \\| 'manual'`, default: `'hover'`, desc: '触发方式' },
      { name: 'title', type: 'string', default: '—', desc: '标题' },
      { name: 'content', type: 'string', default: '—', desc: '内容' },
      { name: 'placement', type: `'top' \\| 'bottom' \\| 'left' \\| 'right'`, default: `'top'`, desc: '弹出位置' },
      { name: 'width', type: 'string | number', default: '—', desc: '宽度' },
      { name: 'effect', type: `'dark' \\| 'light'`, default: `'light'`, desc: '主题' },
    ],
    events: [{ name: 'update:visible', params: '(value: boolean)', desc: '可见性变化' }],
    slots: [
      { name: 'default', desc: '触发元素' },
      { name: 'content', desc: '弹出框内容' },
    ],
    demos: [
      {
        title: '基础用法',
        code: `<template>
  <df-popover title="标题" content="这是一段弹出内容" trigger="click">
    <df-button>点击弹出</df-button>
  </df-popover>
</template>`,
      },
    ],
  },
  {
    slug: 'popconfirm',
    name: 'DfPopconfirm',
    zhName: '确认弹出',
    desc: '确认弹出框，用于二次确认场景。',
    dx: null,
    props: [
      { name: 'title', type: 'string', default: `'确定执行此操作吗？'`, desc: '确认信息' },
      { name: 'confirmButtonText', type: 'string', default: `'确定'`, desc: '确认按钮文字' },
      { name: 'cancelButtonText', type: 'string', default: `'取消'`, desc: '取消按钮文字' },
      { name: 'confirmButtonType', type: `'primary' \\| 'success' \\| 'warning' \\| 'danger'`, default: `'primary'`, desc: '确认按钮类型' },
      { name: 'icon', type: 'string', default: `'dx-icon-warning'`, desc: '图标' },
      { name: 'iconColor', type: 'string', default: `'#e6a23c'`, desc: '图标颜色' },
      { name: 'placement', type: `'top' \\| 'bottom' \\| 'left' \\| 'right'`, default: `'top'`, desc: '弹出位置' },
    ],
    events: [
      { name: 'confirm', params: '()', desc: '确认' },
      { name: 'cancel', params: '()', desc: '取消' },
    ],
    slots: [{ name: 'default', desc: '触发元素' }],
    demos: [
      {
        title: '基础用法',
        code: `<template>
  <df-popconfirm title="确定删除吗？" @confirm="() => console.log('deleted')">
    <df-button type="danger">删除</df-button>
  </df-popconfirm>
</template>`,
      },
    ],
  },
  {
    slug: 'context-menu',
    name: 'DfContextMenu',
    zhName: '右键菜单',
    desc: '右键菜单组件。',
    dx: null,
    props: [
      { name: 'items', type: 'ContextMenuItem[]', default: '[]', desc: '菜单项配置 `{ command, text, icon?, disabled?, divided? }`' },
      { name: 'trigger', type: 'string', default: `'contextmenu'`, desc: '触发事件' },
      { name: 'appendToBody', type: 'boolean', default: 'true', desc: '挂载到 body' },
    ],
    events: [
      { name: 'select', params: '(command, item)', desc: '菜单项选择' },
      { name: 'show', params: '()', desc: '菜单显示' },
      { name: 'hide', params: '()', desc: '菜单隐藏' },
    ],
    slots: [],
    demos: [
      {
        title: '基础用法',
        code: `<script setup lang="ts">
const menuItems = [
  { command: 'copy', text: '复制' },
  { command: 'paste', text: '粘贴' },
  { command: 'delete', text: '删除', divided: true },
]
<\/script>
<template>
  <df-context-menu :items="menuItems" @select="(cmd) => console.log(cmd)">
    <div style="padding: 40px; background: #f5f5f5; text-align: center">
      右键点击此区域
    </div>
  </df-context-menu>
</template>`,
      },
    ],
  },

  // ────────── 布局组件 ──────────
  {
    slug: 'space',
    name: 'DfSpace',
    zhName: '间距',
    desc: '间距容器组件，自动处理子元素间的间距。',
    dx: null,
    props: [
      { name: 'direction', type: `'horizontal' \\| 'vertical'`, default: `'horizontal'`, desc: '方向' },
      { name: 'size', type: `'small' \\| 'default' \\| 'large' \\| number`, default: `'default'`, desc: '间距大小' },
      { name: 'wrap', type: 'boolean', default: 'false', desc: '自动换行' },
      { name: 'alignment', type: `'stretch' \\| 'center' \\| 'flex-start' \\| 'flex-end'`, default: `'center'`, desc: '对齐方式' },
      { name: 'fill', type: 'boolean', default: 'false', desc: '子元素填满宽度' },
    ],
    events: [],
    slots: [{ name: 'default', desc: '子元素' }],
    demos: [
      {
        title: '基础用法',
        code: `<template>
  <df-space>
    <df-button type="primary">按钮一</df-button>
    <df-button>按钮二</df-button>
    <df-button>按钮三</df-button>
  </df-space>
  <df-space direction="vertical" fill>
    <df-card header="卡片一">内容一</df-card>
    <df-card header="卡片二">内容二</df-card>
  </df-space>
</template>`,
      },
    ],
  },
  {
    slug: 'scrollbar',
    name: 'DfScrollbar',
    zhName: '滚动条',
    desc: '基于 DevExtreme DxScrollView 封装的自定义滚动条容器。',
    dx: 'DxScrollView',
    props: [
      { name: 'height', type: 'string | number', default: '—', desc: '高度' },
      { name: 'width', type: 'string | number', default: '—', desc: '宽度' },
      { name: 'direction', type: `'vertical' \\| 'horizontal' \\| 'both'`, default: `'vertical'`, desc: '滚动方向' },
      { name: 'native', type: 'boolean', default: 'false', desc: '使用原生滚动条' },
      { name: 'showScrollbar', type: `'onScroll' \\| 'onHover' \\| 'always' \\| 'never'`, default: `'onHover'`, desc: '滚动条显示策略' },
    ],
    events: [],
    slots: [{ name: 'default', desc: '滚动内容' }],
    demos: [
      {
        title: '基础用法',
        code: `<template>
  <df-scrollbar height="200px">
    <p v-for="i in 20" :key="i">滚动内容 {{ i }}</p>
  </df-scrollbar>
</template>`,
      },
    ],
  },
  {
    slug: 'split-pane',
    name: 'DfSplitPane',
    zhName: '分栏',
    desc: '分栏面板组件，支持拖拽调整比例。',
    dx: null,
    props: [
      { name: 'direction', type: `'horizontal' \\| 'vertical'`, default: `'horizontal'`, desc: '分栏方向' },
      { name: 'defaultRatio', type: 'number', default: '0.5', desc: '默认比例' },
      { name: 'min', type: 'number', default: '0.1', desc: '最小比例' },
      { name: 'max', type: 'number', default: '0.9', desc: '最大比例' },
      { name: 'splitterSize', type: 'number', default: '6', desc: '分割线宽度 (px)' },
    ],
    events: [{ name: 'resize', params: '(ratio: number)', desc: '比例变化' }],
    slots: [
      { name: 'first', desc: '第一面板' },
      { name: 'second', desc: '第二面板' },
    ],
    demos: [
      {
        title: '基础用法',
        code: `<template>
  <df-split-pane style="height: 300px" :default-ratio="0.3">
    <template #first>
      <div style="padding: 16px">左侧面板</div>
    </template>
    <template #second>
      <div style="padding: 16px">右侧面板</div>
    </template>
  </df-split-pane>
</template>`,
      },
    ],
  },

  // ────────── 其他 ──────────
  {
    slug: 'error-boundary',
    name: 'DfErrorBoundary',
    zhName: '错误边界',
    desc: '错误边界组件，捕获子组件渲染错误并显示降级 UI。',
    dx: null,
    props: [
      { name: 'fallbackMessage', type: 'string', default: '—', desc: '降级提示信息' },
    ],
    events: [],
    slots: [{ name: 'default', desc: '被包裹的内容' }],
    demos: [
      {
        title: '基础用法',
        code: `<template>
  <df-error-boundary fallback-message="该模块加载异常">
    <SomeDangerousComponent />
  </df-error-boundary>
</template>`,
      },
    ],
  },
]

// ─── 生成单个组件文档 ───
function generateDoc(comp) {
  const lines = []

  // 标题
  lines.push(`# ${comp.name} ${comp.zhName}`)
  lines.push('')

  // 描述
  lines.push(comp.desc)
  lines.push('')

  // DevExtreme 标记
  if (comp.dx) {
    lines.push(`> 🔧 基于 **${comp.dx}** 封装`)
    lines.push('')
  }

  // 演示
  for (const demo of comp.demos) {
    lines.push(`## ${demo.title}`)
    lines.push('')
    if (demo.desc) {
      lines.push(demo.desc)
      lines.push('')
    }
    lines.push('```vue')
    lines.push(demo.code)
    lines.push('```')
    lines.push('')
  }

  // API 部分
  lines.push('## API')
  lines.push('')

  // Props
  if (comp.props.length > 0) {
    lines.push('### Props')
    lines.push('')
    lines.push('| 属性名 | 说明 | 类型 | 默认值 |')
    lines.push('|--------|------|------|--------|')
    for (const p of comp.props) {
      lines.push(`| ${p.name} | ${p.desc} | \`${p.type}\` | ${p.default} |`)
    }
    lines.push('')
  }

  // Events
  if (comp.events.length > 0) {
    lines.push('### Events')
    lines.push('')
    lines.push('| 事件名 | 说明 | 回调参数 |')
    lines.push('|--------|------|----------|')
    for (const e of comp.events) {
      lines.push(`| ${e.name} | ${e.desc} | \`${e.params}\` |`)
    }
    lines.push('')
  }

  // Slots
  if (comp.slots.length > 0) {
    lines.push('### Slots')
    lines.push('')
    lines.push('| 插槽名 | 说明 |')
    lines.push('|--------|------|')
    for (const s of comp.slots) {
      lines.push(`| ${s.name} | ${s.desc} |`)
    }
    lines.push('')
  }

  // 导入方式
  lines.push('## 引入方式')
  lines.push('')
  lines.push('```typescript')
  lines.push(`import { ${comp.name} } from 'df-web-base'`)
  lines.push('```')
  lines.push('')
  lines.push(`全量注册后可直接在模板中使用 \`<${toKebab(comp.name)}>\`。`)
  lines.push('')

  return lines.join('\n')
}

function toKebab(name) {
  return name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}

// ─── 主逻辑 ───
if (!existsSync(DOCS_DIR)) {
  mkdirSync(DOCS_DIR, { recursive: true })
}

let created = 0
for (const comp of COMPONENTS) {
  const filePath = join(DOCS_DIR, `${comp.slug}.md`)
  const content = generateDoc(comp)
  writeFileSync(filePath, content, 'utf-8')
  created++
  console.log(`✓ ${comp.slug}.md`)
}

console.log(`\n✅ 生成完毕: ${created} 个组件文档页面`)
