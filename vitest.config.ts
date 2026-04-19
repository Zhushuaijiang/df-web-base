import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      'xlsx': resolve(__dirname, 'tests/__mocks__/xlsx.ts'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    server: {
      deps: {
        external: ['exceljs', 'file-saver', 'xlsx', 'axios'],
      },
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov', 'html'],
      include: ['src/**/*.{ts,vue}'],
      exclude: ['src/main.ts', 'src/**/*.d.ts', 'src/types/**'],
      thresholds: {
        // Phase 4: removed 24 coverage-padding files, added meaningful a11y tests
        // Non-component code (utils/hooks/event-bus) remains at 80-100%
        statements: 70,
        branches: 70,
        functions: 55,
        lines: 70,
      },
    },
    setupFiles: ['./tests/setup.ts'],
  },
})
