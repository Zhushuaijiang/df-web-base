import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'df-web-base',
  description: '基于 Vue 3 + DevExtreme 25.2 的 HIS 组件库',
  lang: 'zh-CN',
  base: '/',

  themeConfig: {
    logo: false,
    outline: { level: [2, 3], label: '目录' },
    search: { provider: 'local' },

    nav: [
      { text: '指南', link: '/guide/introduction' },
      { text: '组件', link: '/components/button' },
      { text: 'Hooks', link: '/hooks/use-loading' },
      { text: '工具函数', link: '/utils/tree' },
      { text: '指令', link: '/directives/loading' },
      { text: '在线演练', link: '/guide/playground' },
    ],

    sidebar: {
      '/guide/': [
        {
          text: '基础',
          items: [
            { text: '介绍', link: '/guide/introduction' },
            { text: '快速开始', link: '/guide/getting-started' },
            { text: '设计规范', link: '/guide/design-tokens' },
            { text: '在线演练', link: '/guide/playground' },
          ],
        },
      ],
      '/components/': [
        {
          text: '基础组件',
          collapsed: false,
          items: [
            { text: 'Button 按钮', link: '/components/button' },
            { text: 'ButtonGroup 按钮组', link: '/components/button-group' },
            { text: 'ButtonList 按钮列表', link: '/components/button-list' },
            { text: 'Icon 图标', link: '/components/icon' },
            { text: 'Link 链接', link: '/components/link' },
            { text: 'Tag 标签', link: '/components/tag' },
          ],
        },
        {
          text: '表单组件',
          collapsed: false,
          items: [
            { text: 'Input 输入框', link: '/components/input' },
            { text: 'InputNumber 数字输入框', link: '/components/input-number' },
            { text: 'Select 选择器', link: '/components/select' },
            { text: 'Checkbox 复选框', link: '/components/checkbox' },
            { text: 'Radio 单选框', link: '/components/radio' },
            { text: 'RadioGroup 单选组', link: '/components/radio-group' },
            { text: 'Switch 开关', link: '/components/switch' },
            { text: 'DatePicker 日期选择', link: '/components/date-picker' },
            { text: 'TimePicker 时间选择', link: '/components/time-picker' },
            { text: 'ColorPicker 颜色选择', link: '/components/color-picker' },
            { text: 'Slider 滑块', link: '/components/slider' },
            { text: 'RangeSlider 范围滑块', link: '/components/range-slider' },
            { text: 'Rate 评分', link: '/components/rate' },
            { text: 'Autocomplete 自动完成', link: '/components/autocomplete' },
            { text: 'Cascader 级联选择', link: '/components/cascader' },
            { text: 'TreeSelect 树选择', link: '/components/tree-select' },
            { text: 'TagSelect 标签选择', link: '/components/tag-select' },
            { text: 'Lookup 查找选择', link: '/components/lookup' },
            { text: 'Transfer 穿梭框', link: '/components/transfer' },
            { text: 'Upload 上传', link: '/components/upload' },
            { text: 'Form 表单', link: '/components/form' },
            { text: 'Validator 验证器', link: '/components/validator' },
            { text: 'ValidationGroup 验证组', link: '/components/validation-group' },
            { text: 'ValidationSummary 验证摘要', link: '/components/validation-summary' },
          ],
        },
        {
          text: '数据展示',
          collapsed: false,
          items: [
            { text: 'Table 表格', link: '/components/table' },
            { text: 'TreeTable 树表格', link: '/components/tree-table' },
            { text: 'Tree 树形控件', link: '/components/tree' },
            { text: 'List 列表', link: '/components/list' },
            { text: 'Pagination 分页', link: '/components/pagination' },
            { text: 'Badge 徽章', link: '/components/badge' },
            { text: 'Avatar 头像', link: '/components/avatar' },
            { text: 'Card 卡片', link: '/components/card' },
            { text: 'CardView 卡片视图', link: '/components/card-view' },
            { text: 'Carousel 走马灯', link: '/components/carousel' },
            { text: 'Collapse 折叠面板', link: '/components/collapse' },
            { text: 'Divider 分割线', link: '/components/divider' },
            { text: 'Empty 空状态', link: '/components/empty' },
            { text: 'Image 图片', link: '/components/image' },
            { text: 'Gallery 图册', link: '/components/gallery' },
            { text: 'Progress 进度条', link: '/components/progress' },
            { text: 'ProgressBar 进度条(DX)', link: '/components/progress-bar' },
            { text: 'Timeline 时间线', link: '/components/timeline' },
            { text: 'Steps 步骤条', link: '/components/steps' },
            { text: 'Stepper 步进器', link: '/components/stepper' },
            { text: 'Calendar 日历', link: '/components/calendar' },
            { text: 'TileView 磁贴视图', link: '/components/tile-view' },
            { text: 'DictTag 字典标签', link: '/components/dict-tag' },
            { text: 'ExportBtn 导出按钮', link: '/components/export-btn' },
          ],
        },
        {
          text: '导航组件',
          collapsed: false,
          items: [
            { text: 'Breadcrumb 面包屑', link: '/components/breadcrumb' },
            { text: 'Dropdown 下拉菜单', link: '/components/dropdown' },
            { text: 'DropDownButton 下拉按钮', link: '/components/drop-down-button' },
            { text: 'Menu 菜单', link: '/components/menu' },
            { text: 'PageHeader 页头', link: '/components/page-header' },
            { text: 'Tabs 标签页', link: '/components/tabs' },
            { text: 'Accordion 手风琴', link: '/components/accordion' },
            { text: 'ActionSheet 操作面板', link: '/components/action-sheet' },
            { text: 'SpeedDialAction 快速操作', link: '/components/speed-dial-action' },
            { text: 'Backtop 回到顶部', link: '/components/backtop' },
          ],
        },
        {
          text: '反馈组件',
          collapsed: false,
          items: [
            { text: 'Dialog 对话框', link: '/components/dialog' },
            { text: 'Drawer 抽屉', link: '/components/drawer' },
            { text: 'Loading 加载', link: '/components/loading' },
            { text: 'LoadIndicator 加载指示器', link: '/components/load-indicator' },
            { text: 'LoadPanel 加载面板', link: '/components/load-panel' },
            { text: 'Message 消息', link: '/components/message' },
            { text: 'MessageBox 消息弹框', link: '/components/message-box' },
            { text: 'Notification 通知', link: '/components/notification' },
            { text: 'Toast 轻提示', link: '/components/toast' },
            { text: 'Alert 警告', link: '/components/alert' },
            { text: 'Tooltip 文字提示', link: '/components/tooltip' },
            { text: 'Popover 弹出框', link: '/components/popover' },
            { text: 'Popconfirm 确认弹出', link: '/components/popconfirm' },
            { text: 'ContextMenu 右键菜单', link: '/components/context-menu' },
          ],
        },
        {
          text: '布局组件',
          collapsed: false,
          items: [
            { text: 'Space 间距', link: '/components/space' },
            { text: 'Box 弹性盒子', link: '/components/box' },
            { text: 'ResponsiveBox 响应式盒子', link: '/components/responsive-box' },
            { text: 'Scrollbar 滚动条', link: '/components/scrollbar' },
            { text: 'SplitPane 分栏', link: '/components/split-pane' },
            { text: 'Splitter 分割器', link: '/components/splitter' },
            { text: 'Resizable 可调整大小', link: '/components/resizable' },
            { text: 'Draggable 可拖拽', link: '/components/draggable' },
            { text: 'Sortable 可排序', link: '/components/sortable' },
            { text: 'MultiView 多视图', link: '/components/multi-view' },
            { text: 'SearchLayout 搜索列表布局', link: '/components/search-layout' },
            { text: 'DetailLayout 详情编辑布局', link: '/components/detail-layout' },
            { text: 'CardLayout 卡片布局', link: '/components/card-layout' },
            { text: 'GridLayout 网格布局', link: '/components/grid-layout' },
            { text: 'AppShell 应用外壳', link: '/components/app-shell' },
            { text: 'TreeGridLayout 左树右表', link: '/components/tree-grid-layout' },
            { text: 'DashboardLayout 仪表盘', link: '/components/dashboard-layout' },
            { text: 'TimelineLayout 时间轴', link: '/components/timeline-layout' },
            { text: 'FormLayout 分段表单', link: '/components/form-layout' },
            { text: 'StatCard 统计卡片', link: '/components/stat-card' },
            { text: 'PatientStrip 患者信息条', link: '/components/patient-strip' },
          ],
        },
        {
          text: '图表与可视化',
          collapsed: false,
          items: [
            { text: 'Chart 图表', link: '/components/chart' },
            { text: 'PieChart 饼图', link: '/components/pie-chart' },
            { text: 'PolarChart 极坐标图', link: '/components/polar-chart' },
            { text: 'Funnel 漏斗图', link: '/components/funnel' },
            { text: 'Sankey 桑基图', link: '/components/sankey' },
            { text: 'TreeMap 矩形树图', link: '/components/tree-map' },
            { text: 'Sparkline 迷你图', link: '/components/sparkline' },
            { text: 'Bullet 子弹图', link: '/components/bullet' },
            { text: 'BarGauge 条形仪表', link: '/components/bar-gauge' },
            { text: 'CircularGauge 圆形仪表', link: '/components/circular-gauge' },
            { text: 'LinearGauge 线性仪表', link: '/components/linear-gauge' },
            { text: 'RangeSelector 范围选择器', link: '/components/range-selector' },
            { text: 'PivotGrid 透视表', link: '/components/pivot-grid' },
          ],
        },
        {
          text: '高级组件',
          collapsed: false,
          items: [
            { text: 'Scheduler 日程', link: '/components/scheduler' },
            { text: 'Gantt 甘特图', link: '/components/gantt' },
            { text: 'Diagram 流程图', link: '/components/diagram' },
            { text: 'FilterBuilder 筛选构建器', link: '/components/filter-builder' },
            { text: 'TextEditor 富文本编辑器', link: '/components/text-editor' },
            { text: 'Toolbar 工具栏', link: '/components/toolbar' },
            { text: 'RecurrenceEditor 重复规则', link: '/components/recurrence-editor' },
          ],
        },
        {
          text: 'DX 原生封装',
          collapsed: true,
          items: [
            { text: 'DxButtonGroup 按钮组', link: '/components/dx-button-group' },
            { text: 'DxContextMenu 右键菜单', link: '/components/dx-context-menu' },
            { text: 'DxDrawer 抽屉', link: '/components/dx-drawer' },
            { text: 'DxMenu 菜单', link: '/components/dx-menu' },
            { text: 'DxPagination 分页', link: '/components/dx-pagination' },
            { text: 'DxPopover 弹出框', link: '/components/dx-popover' },
            { text: 'DxTabs 标签页', link: '/components/dx-tabs' },
          ],
        },
        {
          text: '其他',
          collapsed: false,
          items: [
            { text: 'ErrorBoundary 错误边界', link: '/components/error-boundary' },
          ],
        },
      ],
      '/hooks/': [
        {
          text: 'Hooks 组合式函数',
          items: [
            { text: 'useDfUI 全局配置', link: '/hooks/use-df-ui' },
            { text: 'useHttp 请求', link: '/hooks/use-http' },
            { text: 'useDict 字典', link: '/hooks/use-dict' },
            { text: 'usePermission 权限', link: '/hooks/use-permission' },
            { text: 'useTenant 租户', link: '/hooks/use-tenant' },
            { text: 'useTable 表格辅助', link: '/hooks/use-table' },
            { text: 'useForm 表单辅助', link: '/hooks/use-form' },
            { text: 'useNotification 通知', link: '/hooks/use-notification' },
            { text: 'useLoading 加载状态', link: '/hooks/use-loading' },
            { text: 'useDebounce 防抖', link: '/hooks/use-debounce' },
            { text: 'useClipboard 剪贴板', link: '/hooks/use-clipboard' },
          ],
        },
      ],
      '/utils/': [
        {
          text: '工具函数',
          items: [
            { text: 'tree 树操作', link: '/utils/tree' },
            { text: 'date 日期处理', link: '/utils/date' },
            { text: 'mask 数据脱敏', link: '/utils/mask' },
          ],
        },
      ],
      '/directives/': [
        {
          text: '指令',
          items: [
            { text: 'v-loading 加载', link: '/directives/loading' },
            { text: 'v-clickoutside 点击外部', link: '/directives/clickoutside' },
          ],
        },
      ],
    },

    socialLinks: [],
    footer: {
      message: 'df-web-base · Vue 3 + DevExtreme 25.2 HIS 组件库',
    },
  },

  vite: {
    plugins: [
      {
        name: 'vue-runtime-compiler',
        config(_, env) {
          // 仅客户端构建使用包含模板编译器的 Vue 完整版
          // SSR 构建保持默认解析, 避免 Node ESM 兼容问题
          if (env.isSsrBuild) return
          return {
            resolve: {
              alias: [
                { find: /^vue$/, replacement: 'vue/dist/vue.esm-bundler.js' },
              ],
            },
          }
        },
      },
    ],
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          silenceDeprecations: ['legacy-js-api'],
        },
      },
    },
    build: {
      chunkSizeWarningLimit: 8192,
    },
    resolve: {
      alias: {
        '@': new URL('../../src', import.meta.url).pathname,
      },
    },
    ssr: {
      // DevExtreme 及其依赖不支持 Node ESM 原生导入:
      // - devextreme-vue/button 是目录导入, Node ESM 不支持
      // - rrule 是 CommonJS, 不支持 named ESM exports
      // - inferno 是 DevExtreme 的渲染引擎依赖
      // 全部标记为 noExternal, 由 Vite 打包进 server bundle.
      // DevExtreme 内部对 window/document 做了 typeof 守卫, SSR 安全.
      noExternal: [
        'devextreme',
        'devextreme-vue',
        'inferno',
        'rrule',
        /^devextreme\//,
        /^devextreme-vue\//,
      ],
    },
    optimizeDeps: {
      include: [
        'devextreme-vue/button',
        'devextreme-vue/data-grid',
        'devextreme-vue/tree-list',
        'devextreme-vue/select-box',
        'devextreme-vue/text-box',
        'devextreme-vue/date-box',
        'devextreme-vue/drawer',
        'devextreme-vue/popup',
        'devextreme-vue/context-menu',
        'devextreme-vue/menu',
        'devextreme-vue/chart',
        'devextreme-vue/scheduler',
        'devextreme-vue/form',
        'devextreme-vue/tabs',
      ],
    },
  },
})
