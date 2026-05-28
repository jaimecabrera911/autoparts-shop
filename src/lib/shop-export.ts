import { site } from '../data/site';

export type ShopExportRow = {
  SKU: string;
  Nombre: string;
  Marca: string;
  Categoría: string;
  'Precio venta': number;
  'Precio lista': number;
  Oferta: string;
  Stock: string;
  MPN: string;
  EAN: string;
  URL: string;
};

export async function exportRowsToExcel(rows: ShopExportRow[], filename?: string) {
  if (rows.length === 0) return;

  const XLSX = await import('xlsx');
  const sheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, sheet, 'Productos');

  const date = new Date().toISOString().slice(0, 10);
  const name = filename ?? `${site.excelFilePrefix}-${date}.xlsx`;
  XLSX.writeFile(workbook, name);
}
