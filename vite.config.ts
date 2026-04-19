import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig(({ mode }) => ({
  plugins: [vue()],

  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },

  css: {
    // 抽取 CSS 到单独文件（包含 DevExtreme 主题样式）
    devSourcemap: mode === 'development',
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        silenceDeprecations: ['legacy-js-api'],
      },
    },
  },

  server: {
    port: 5001,
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    // 监听所有地址（容器/远程开发兼容）
    host: true,
  },

  build: {
    lib: {
      entry: resolve(__dirname, 'src/main.ts'),
      name: 'DfWebBase',
      formats: ['umd', 'es'],
      fileName: (format) => format === 'es' ? 'df-web-base.mjs' : 'df-web-base.umd.js',
    },
    rollupOptions: {
      external: [
        'vue',
        'axios',
        'exceljs',
        'file-saver',
        'devextreme',
        'devextreme-vue',
        /^devextreme\//,
        /^devextreme-vue\//,
        'dayjs',
      ],
      output: {
        globals: {
          vue: 'Vue',
          axios: 'axios',
          exceljs: 'ExcelJS',
          'file-saver': 'FileSaver',
          devextreme: 'DevExpress',
          'devextreme-vue': 'DevExpressVue',
          dayjs: 'dayjs',
        },
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },
    outDir: 'dist',
    sourcemap: mode === 'development',
    // 清空输出目录
    emptyOutDir: true,
    // 报告 gzip 大小
    reportCompressedSize: true,
    // 警告阈值（DevExtreme 较大，设为 2MB）
    chunkSizeWarningLimit: 2048,
  },

  // qiankun 微应用需要的配置
  base: mode === 'production' ? '/shared/df-web-base/' : '/',
}))
