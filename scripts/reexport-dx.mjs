/**
 * 将零值 DX 包装组件替换为直接 re-export
 *
 * 用法: node scripts/reexport-dx.mjs
 */
import { writeFileSync, unlinkSync, existsSync, readdirSync } from 'fs'
import { resolve, join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const COMPS = join(ROOT, 'src/components')

// 映射: df-目录名 → { dxModule: 'devextreme-vue/xxx', dxName: 'DxXxx', exports: ['DfXxx'] }
const REEXPORTS = {
  'df-accordion':        { dxModule: 'devextreme-vue/accordion',        dxName: 'DxAccordion',       exports: ['DfAccordion'] },
  'df-action-sheet':     { dxModule: 'devextreme-vue/action-sheet',     dxName: 'DxActionSheet',     exports: ['DfActionSheet'] },
  'df-autocomplete':     { dxModule: 'devextreme-vue/autocomplete',     dxName: 'DxAutocomplete',   exports: ['DfAutocomplete'] },
  'df-bar-gauge':        { dxModule: 'devextreme-vue/bar-gauge',        dxName: 'DxBarGauge',        exports: ['DfBarGauge'] },
  'df-box':              { dxModule: 'devextreme-vue/box',              dxName: 'DxBox',             exports: ['DfBox'] },
  'df-bullet':           { dxModule: 'devextreme-vue/bullet',           dxName: 'DxBullet',          exports: ['DfBullet'] },
  'df-calendar':         { dxModule: 'devextreme-vue/calendar',         dxName: 'DxCalendar',        exports: ['DfCalendar'] },
  'df-card-view':        { dxModule: 'devextreme-vue/card-view',        dxName: 'DxCardView',        exports: ['DfCardView'] },
  'df-circular-gauge':   { dxModule: 'devextreme-vue/circular-gauge',   dxName: 'DxCircularGauge',   exports: ['DfCircularGauge'] },
  'df-color-picker':     { dxModule: 'devextreme-vue/color-box',        dxName: 'DxColorBox',        exports: ['DfColorPicker'] },
  'df-diagram':          { dxModule: 'devextreme-vue/diagram',          dxName: 'DxDiagram',         exports: ['DfDiagram'] },
  'df-draggable':        { dxModule: 'devextreme-vue/draggable',        dxName: 'DxDraggable',       exports: ['DfDraggable'] },
  'df-dx-button-group':  { dxModule: 'devextreme-vue/button-group',     dxName: 'DxButtonGroup',     exports: ['DfDxButtonGroup'] },
  'df-dx-context-menu':  { dxModule: 'devextreme-vue/context-menu',     dxName: 'DxContextMenu',     exports: ['DfDxContextMenu'] },
  'df-dx-drawer':        { dxModule: 'devextreme-vue/drawer',           dxName: 'DxDrawer',          exports: ['DfDxDrawer'] },
  'df-dx-menu':          { dxModule: 'devextreme-vue/menu',             dxName: 'DxMenu',            exports: ['DfDxMenu'] },
  'df-dx-pagination':    { dxModule: 'devextreme-vue/pagination',       dxName: 'DxPagination',      exports: ['DfDxPagination'] },
  'df-dx-popover':       { dxModule: 'devextreme-vue/popover',          dxName: 'DxPopover',         exports: ['DfDxPopover'] },
  'df-dx-tabs':          { dxModule: 'devextreme-vue/tabs',             dxName: 'DxTabs',            exports: ['DfDxTabs'] },
  'df-filter-builder':   { dxModule: 'devextreme-vue/filter-builder',   dxName: 'DxFilterBuilder',   exports: ['DfFilterBuilder'] },
  'df-funnel':           { dxModule: 'devextreme-vue/funnel',           dxName: 'DxFunnel',          exports: ['DfFunnel'] },
  'df-gallery':          { dxModule: 'devextreme-vue/gallery',          dxName: 'DxGallery',         exports: ['DfGallery'] },
  'df-gantt':            { dxModule: 'devextreme-vue/gantt',            dxName: 'DxGantt',           exports: ['DfGantt'] },
  'df-linear-gauge':     { dxModule: 'devextreme-vue/linear-gauge',     dxName: 'DxLinearGauge',     exports: ['DfLinearGauge'] },
  'df-list':             { dxModule: 'devextreme-vue/list',             dxName: 'DxList',            exports: ['DfList'] },
  'df-load-indicator':   { dxModule: 'devextreme-vue/load-indicator',   dxName: 'DxLoadIndicator',   exports: ['DfLoadIndicator'] },
  'df-load-panel':       { dxModule: 'devextreme-vue/load-panel',       dxName: 'DxLoadPanel',       exports: ['DfLoadPanel'] },
  'df-multi-view':       { dxModule: 'devextreme-vue/multi-view',       dxName: 'DxMultiView',       exports: ['DfMultiView'] },
  'df-pivot-grid':       { dxModule: 'devextreme-vue/pivot-grid',       dxName: 'DxPivotGrid',       exports: ['DfPivotGrid'] },
  'df-polar-chart':      { dxModule: 'devextreme-vue/polar-chart',      dxName: 'DxPolarChart',      exports: ['DfPolarChart'] },
  'df-progress-bar':     { dxModule: 'devextreme-vue/progress-bar',     dxName: 'DxProgressBar',     exports: ['DfProgressBar'] },
  'df-range-selector':   { dxModule: 'devextreme-vue/range-selector',   dxName: 'DxRangeSelector',   exports: ['DfRangeSelector'] },
  'df-range-slider':     { dxModule: 'devextreme-vue/range-slider',     dxName: 'DxRangeSlider',     exports: ['DfRangeSlider'] },
  'df-recurrence-editor':{ dxModule: 'devextreme-vue/recurrence-editor',dxName: 'DxRecurrenceEditor',exports: ['DfRecurrenceEditor'] },
  'df-resizable':        { dxModule: 'devextreme-vue/resizable',        dxName: 'DxResizable',       exports: ['DfResizable'] },
  'df-responsive-box':   { dxModule: 'devextreme-vue/responsive-box',   dxName: 'DxResponsiveBox',   exports: ['DfResponsiveBox'] },
  'df-sankey':           { dxModule: 'devextreme-vue/sankey',           dxName: 'DxSankey',          exports: ['DfSankey'] },
  'df-scrollbar':        { dxModule: 'devextreme-vue/scroll-view',      dxName: 'DxScrollView',      exports: ['DfScrollbar'] },
  'df-sortable':         { dxModule: 'devextreme-vue/sortable',         dxName: 'DxSortable',        exports: ['DfSortable'] },
  'df-sparkline':        { dxModule: 'devextreme-vue/sparkline',        dxName: 'DxSparkline',       exports: ['DfSparkline'] },
  'df-speed-dial-action':{ dxModule: 'devextreme-vue/speed-dial-action',dxName: 'DxSpeedDialAction', exports: ['DfSpeedDialAction'] },
  'df-splitter':         { dxModule: 'devextreme-vue/splitter',         dxName: 'DxSplitter',        exports: ['DfSplitter'] },
  'df-stepper':          { dxModule: 'devextreme-vue/stepper',          dxName: 'DxStepper',         exports: ['DfStepper'] },
  'df-tile-view':        { dxModule: 'devextreme-vue/tile-view',        dxName: 'DxTileView',        exports: ['DfTileView'] },
  'df-toast':            { dxModule: 'devextreme-vue/toast',            dxName: 'DxToast',           exports: ['DfToast'] },
  'df-tree-map':         { dxModule: 'devextreme-vue/tree-map',         dxName: 'DxTreeMap',         exports: ['DfTreeMap'] },
  'df-validation-group': { dxModule: 'devextreme-vue/validation-group', dxName: 'DxValidationGroup', exports: ['DfValidationGroup'] },
  'df-validation-summary':{dxModule:'devextreme-vue/validation-summary',dxName: 'DxValidationSummary',exports:['DfValidationSummary'] },
  'df-validator':        { dxModule: 'devextreme-vue/validator',        dxName: 'DxValidator',       exports: ['DfValidator'] },
}

let processed = 0
let deletedVue = 0
let deletedTypes = 0

for (const [dir, info] of Object.entries(REEXPORTS)) {
  const dirPath = join(COMPS, dir)
  if (!existsSync(dirPath)) {
    console.log(`SKIP ${dir} — directory not found`)
    continue
  }

  // 1. Write new index.ts (re-export DX directly)
  const indexContent = `// Direct re-export of DevExtreme component — no wrapper
export { ${info.dxName} as ${info.exports[0]} } from '${info.dxModule}'
`
  writeFileSync(join(dirPath, 'index.ts'), indexContent)
  processed++

  // 2. Delete .vue files
  const files = readdirSync(dirPath)
  for (const f of files) {
    if (f.endsWith('.vue')) {
      unlinkSync(join(dirPath, f))
      deletedVue++
      console.log(`  DEL ${dir}/${f}`)
    }
    // Delete types.ts only if it only re-exports DX types
    if (f === 'types.ts') {
      unlinkSync(join(dirPath, f))
      deletedTypes++
      console.log(`  DEL ${dir}/${f}`)
    }
  }

  console.log(`✓ ${dir} → ${info.dxName} as ${info.exports[0]}`)
}

console.log(`\nDone: ${processed} components converted, ${deletedVue} .vue deleted, ${deletedTypes} types.ts deleted`)
