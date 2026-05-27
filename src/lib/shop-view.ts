import { bindAddToCart } from './bind-add-to-cart';
import { exportRowsToExcel, type ShopExportRow } from './shop-export';

export type ShopViewMode = 'grid' | 'table';

const STORAGE_KEY = 'shop-view-mode';

export function getStoredViewMode(): ShopViewMode {
  const v = localStorage.getItem(STORAGE_KEY);
  return v === 'table' ? 'table' : 'grid';
}

export function setViewMode(mode: ShopViewMode) {
  localStorage.setItem(STORAGE_KEY, mode);
  applyViewMode(mode);
}

function applyViewMode(mode: ShopViewMode) {
  const grid = document.getElementById('shop-grid-view');
  const table = document.getElementById('shop-table-view');
  const btnGrid = document.getElementById('shop-view-grid');
  const btnTable = document.getElementById('shop-view-table');

  const isGrid = mode === 'grid';
  grid?.classList.toggle('hidden', !isGrid);
  table?.classList.toggle('hidden', isGrid);

  btnGrid?.setAttribute('aria-pressed', String(isGrid));
  btnTable?.setAttribute('aria-pressed', String(!isGrid));
  btnGrid?.classList.toggle('is-active', isGrid);
  btnTable?.classList.toggle('is-active', !isGrid);
}

function readExportData(): ShopExportRow[] {
  const el = document.getElementById('shop-export-data');
  if (!el?.textContent) return [];
  try {
    return JSON.parse(el.textContent) as ShopExportRow[];
  } catch {
    return [];
  }
}

export function initShopViewControls() {
  applyViewMode(getStoredViewMode());
  bindAddToCart(document.getElementById('shop-results') ?? document);

  document.getElementById('shop-view-grid')?.addEventListener('click', () => setViewMode('grid'));
  document.getElementById('shop-view-table')?.addEventListener('click', () => setViewMode('table'));

  document.getElementById('shop-export-excel')?.addEventListener('click', async () => {
    const rows = readExportData();
    const btn = document.getElementById('shop-export-excel') as HTMLButtonElement | null;
    if (!rows.length) {
      alert('No hay productos para exportar con los filtros actuales.');
      return;
    }
    btn?.setAttribute('disabled', 'true');
    try {
      await exportRowsToExcel(rows);
    } finally {
      btn?.removeAttribute('disabled');
    }
  });
}
