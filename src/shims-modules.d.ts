/* eslint-disable @typescript-eslint/no-explicit-any */

declare module 'xlsx' {
  const utils: {
    aoa_to_sheet(data: any[][]): any
    book_new(): any
    book_append_sheet(workbook: any, worksheet: any, name?: string): void
  }
  function writeFile(workbook: any, filename: string): void
  export { utils, writeFile }
}
