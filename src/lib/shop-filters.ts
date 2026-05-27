import type { Product } from '../data/products';
import { products } from '../data/products';

export type SortOption =
  | 'relevance'
  | 'price_asc'
  | 'price_desc'
  | 'name_asc'
  | 'name_desc'
  | 'newest';

export type ShopFilterState = {
  q: string;
  category: string;
  brands: string[];
  make: string;
  model: string;
  onSale: boolean;
  inStock: boolean;
  newOnly: boolean;
  priceMin: number | null;
  priceMax: number | null;
  sort: SortOption;
};

export function getDisplayPrice(product: Product): number {
  return product.salePrice ?? product.price;
}

export function parseShopFilters(searchParams: URLSearchParams): ShopFilterState {
  const priceMinRaw = searchParams.get('price_min');
  const priceMaxRaw = searchParams.get('price_max');

  return {
    q: searchParams.get('q')?.trim() ?? '',
    category: searchParams.get('category') ?? '',
    brands: searchParams.getAll('brand').filter(Boolean),
    make: searchParams.get('make') ?? '',
    model: searchParams.get('model')?.trim() ?? '',
    onSale: searchParams.get('on_sale') === '1',
    inStock: searchParams.get('in_stock') === '1',
    newOnly: searchParams.get('new') === '1',
    priceMin: priceMinRaw ? Number(priceMinRaw) : null,
    priceMax: priceMaxRaw ? Number(priceMaxRaw) : null,
    sort: (searchParams.get('sort') as SortOption) || 'relevance',
  };
}

export function filterProducts(list: Product[], filters: ShopFilterState): Product[] {
  let result = [...list];
  const q = filters.q.toLowerCase();

  if (q) {
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.mpn.toLowerCase().includes(q),
    );
  }

  if (filters.category) {
    result = result.filter((p) => p.category === filters.category);
  }

  if (filters.brands.length > 0) {
    const set = new Set(filters.brands.map((b) => b.toLowerCase()));
    result = result.filter((p) => set.has(p.brand.toLowerCase()));
  }

  if (filters.make) {
    const makeLower = filters.make.toLowerCase();
    result = result.filter((p) =>
      p.compatibility.some((c) => c.make.toLowerCase() === makeLower),
    );
  }

  if (filters.model) {
    const modelLower = filters.model.toLowerCase();
    result = result.filter((p) =>
      p.compatibility.some((c) => c.model.toLowerCase().includes(modelLower)),
    );
  }

  if (filters.onSale) {
    result = result.filter((p) => p.salePrice != null);
  }

  if (filters.inStock) {
    result = result.filter((p) => p.inStock);
  }

  if (filters.newOnly) {
    result = result.filter((p) => p.badge === 'new');
  }

  if (filters.priceMin != null && !Number.isNaN(filters.priceMin)) {
    result = result.filter((p) => getDisplayPrice(p) >= filters.priceMin!);
  }

  if (filters.priceMax != null && !Number.isNaN(filters.priceMax)) {
    result = result.filter((p) => getDisplayPrice(p) <= filters.priceMax!);
  }

  return sortProducts(result, filters.sort, q);
}

export function sortProducts(
  list: Product[],
  sort: SortOption,
  q = '',
): Product[] {
  const items = [...list];

  switch (sort) {
    case 'price_asc':
      return items.sort((a, b) => getDisplayPrice(a) - getDisplayPrice(b));
    case 'price_desc':
      return items.sort((a, b) => getDisplayPrice(b) - getDisplayPrice(a));
    case 'name_asc':
      return items.sort((a, b) => a.name.localeCompare(b.name));
    case 'name_desc':
      return items.sort((a, b) => b.name.localeCompare(a.name));
    case 'newest':
      return items.sort((a, b) => {
        const aNew = a.badge === 'new' ? 1 : 0;
        const bNew = b.badge === 'new' ? 1 : 0;
        return bNew - aNew;
      });
    case 'relevance':
    default:
      if (!q) return items;
      return items.sort((a, b) => scoreRelevance(b, q) - scoreRelevance(a, q));
  }
}

function scoreRelevance(product: Product, q: string): number {
  const name = product.name.toLowerCase();
  const sku = product.sku.toLowerCase();
  if (sku === q) return 100;
  if (name.startsWith(q)) return 80;
  if (sku.includes(q)) return 60;
  if (name.includes(q)) return 40;
  if (product.brand.toLowerCase().includes(q)) return 20;
  return 0;
}

export function getCatalogMeta() {
  const prices = products.map(getDisplayPrice);
  const brands = [...new Set(products.map((p) => p.brand))].sort((a, b) =>
    a.localeCompare(b),
  );

  return {
    brands,
    priceMin: Math.floor(Math.min(...prices)),
    priceMax: Math.ceil(Math.max(...prices)),
    totalProducts: products.length,
  };
}

export function countByCategory(list: Product[]): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const p of list) {
    counts[p.category] = (counts[p.category] ?? 0) + 1;
  }
  return counts;
}

export function countByBrand(list: Product[], category?: string): Record<string, number> {
  const base = category ? list.filter((p) => p.category === category) : list;
  const counts: Record<string, number> = {};
  for (const p of base) {
    counts[p.brand] = (counts[p.brand] ?? 0) + 1;
  }
  return counts;
}

/** Construye query string preservando filtros al cambiar uno */
export function buildShopUrl(
  current: ShopFilterState,
  patch: Partial<ShopFilterState> & { reset?: boolean },
): string {
  if (patch.reset) {
    const keepQ = patch.q ?? current.q;
    if (keepQ) return `/shop?q=${encodeURIComponent(keepQ)}`;
    return '/shop';
  }

  const next: ShopFilterState = { ...current, ...patch };

  const params = new URLSearchParams();
  if (next.q) params.set('q', next.q);
  if (next.category) params.set('category', next.category);
  next.brands.forEach((b) => params.append('brand', b));
  if (next.make) params.set('make', next.make);
  if (next.model) params.set('model', next.model);
  if (next.onSale) params.set('on_sale', '1');
  if (next.inStock) params.set('in_stock', '1');
  if (next.newOnly) params.set('new', '1');
  if (next.priceMin != null) params.set('price_min', String(next.priceMin));
  if (next.priceMax != null) params.set('price_max', String(next.priceMax));
  if (next.sort && next.sort !== 'relevance') params.set('sort', next.sort);

  const qs = params.toString();
  return qs ? `/shop?${qs}` : '/shop';
}

export function getActiveFilterLabels(
  filters: ShopFilterState,
  categoryName?: string,
): { key: string; label: string; href: string }[] {
  const chips: { key: string; label: string; href: string }[] = [];

  if (filters.q) {
    chips.push({
      key: 'q',
      label: `Búsqueda: ${filters.q}`,
      href: buildShopUrl(filters, { q: '' }),
    });
  }
  if (filters.category && categoryName) {
    chips.push({
      key: 'category',
      label: categoryName,
      href: buildShopUrl(filters, { category: '' }),
    });
  }
  filters.brands.forEach((brand) => {
    chips.push({
      key: `brand-${brand}`,
      label: brand,
      href: buildShopUrl(filters, {
        brands: filters.brands.filter((b) => b !== brand),
      }),
    });
  });
  if (filters.make) {
    chips.push({
      key: 'make',
      label: `Vehículo: ${filters.make}${filters.model ? ` ${filters.model}` : ''}`,
      href: buildShopUrl(filters, { make: '', model: '' }),
    });
  } else if (filters.model) {
    chips.push({
      key: 'model',
      label: `Modelo: ${filters.model}`,
      href: buildShopUrl(filters, { model: '' }),
    });
  }
  if (filters.onSale) {
    chips.push({
      key: 'on_sale',
      label: 'En oferta',
      href: buildShopUrl(filters, { onSale: false }),
    });
  }
  if (filters.inStock) {
    chips.push({
      key: 'in_stock',
      label: 'Solo en stock',
      href: buildShopUrl(filters, { inStock: false }),
    });
  }
  if (filters.newOnly) {
    chips.push({
      key: 'new',
      label: 'Novedades',
      href: buildShopUrl(filters, { newOnly: false }),
    });
  }
  if (filters.priceMin != null || filters.priceMax != null) {
    const min = filters.priceMin ?? '…';
    const max = filters.priceMax ?? '…';
    chips.push({
      key: 'price',
      label: `Precio: $${min} – $${max}`,
      href: buildShopUrl(filters, { priceMin: null, priceMax: null }),
    });
  }

  return chips;
}
