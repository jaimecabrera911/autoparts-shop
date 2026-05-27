import { products } from './products';
import { categories } from './categories';
import { formatPrice } from './products';
import { getDisplayPrice } from '../lib/shop-filters';

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export type AdminOrder = {
  id: string;
  customer: string;
  email: string;
  date: string;
  status: OrderStatus;
  total: number;
  items: { name: string; sku: string; qty: number; price: number }[];
};

export type AdminCustomer = {
  id: string;
  name: string;
  email: string;
  orders: number;
  totalSpent: number;
  joined: string;
};

export const orderStatusLabels: Record<OrderStatus, string> = {
  pending: 'Pendiente',
  processing: 'En proceso',
  shipped: 'Enviado',
  delivered: 'Entregado',
  cancelled: 'Cancelado',
};

export const orderStatusColors: Record<OrderStatus, string> = {
  pending: 'bg-amber-100 text-amber-800',
  processing: 'bg-blue-100 text-blue-800',
  shipped: 'bg-violet-100 text-violet-800',
  delivered: 'bg-emerald-100 text-emerald-800',
  cancelled: 'bg-red-100 text-red-800',
};

export const adminOrders: AdminOrder[] = [
  {
    id: 'AP-2026-1042',
    customer: 'Carlos Mendoza',
    email: 'carlos.m@email.com',
    date: '2026-05-27',
    status: 'processing',
    total: 72.44,
    items: [
      { name: 'KRAFT 8800002 Sensor de velocidad', sku: '8800002', qty: 1, price: 7.19 },
      { name: 'RIDEX 295W0003 Motor limpiaparabrisas', sku: '295W0003', qty: 1, price: 55.25 },
      { name: 'ATE Sensor desgaste pastillas', sku: '24.8190-0984.2', qty: 1, price: 16.28 },
    ],
  },
  {
    id: 'AP-2026-1041',
    customer: 'Ana Rodríguez',
    email: 'ana.rodriguez@email.com',
    date: '2026-05-26',
    status: 'shipped',
    total: 61.62,
    items: [{ name: 'BOSCH S4 Batería de arranque', sku: '0092-S40-050', qty: 1, price: 61.62 }],
  },
  {
    id: 'AP-2026-1040',
    customer: 'Luis Herrera',
    email: 'luis.h@email.com',
    date: '2026-05-26',
    status: 'delivered',
    total: 223.7,
    items: [{ name: 'SACHS Volante bimasa', sku: '2294-002-013', qty: 1, price: 223.7 }],
  },
  {
    id: 'AP-2026-1039',
    customer: 'María Gómez',
    email: 'maria.gomez@email.com',
    date: '2026-05-25',
    status: 'pending',
    total: 189.38,
    items: [{ name: 'Pirelli P ZERO Neumático', sku: '1995700', qty: 1, price: 189.38 }],
  },
  {
    id: 'AP-2026-1038',
    customer: 'Pedro Sánchez',
    email: 'pedro.s@email.com',
    date: '2026-05-24',
    status: 'cancelled',
    total: 12.5,
    items: [{ name: 'CASTROL DOT 4', sku: '15036B', qty: 1, price: 12.5 }],
  },
  {
    id: 'AP-2026-1037',
    customer: 'Sofía Vega',
    email: 'sofia.vega@email.com',
    date: '2026-05-23',
    status: 'delivered',
    total: 279.33,
    items: [{ name: 'Hogert Carro herramientas', sku: 'HT7G081', qty: 1, price: 279.33 }],
  },
];

export const adminCustomers: AdminCustomer[] = [
  { id: 'c1', name: 'Carlos Mendoza', email: 'carlos.m@email.com', orders: 5, totalSpent: 412.5, joined: '2025-11-02' },
  { id: 'c2', name: 'Ana Rodríguez', email: 'ana.rodriguez@email.com', orders: 3, totalSpent: 198.2, joined: '2026-01-15' },
  { id: 'c3', name: 'Luis Herrera', email: 'luis.h@email.com', orders: 8, totalSpent: 1240.0, joined: '2025-08-20' },
  { id: 'c4', name: 'María Gómez', email: 'maria.gomez@email.com', orders: 2, totalSpent: 320.0, joined: '2026-03-10' },
  { id: 'c5', name: 'Pedro Sánchez', email: 'pedro.s@email.com', orders: 1, totalSpent: 12.5, joined: '2026-05-24' },
];

export function getDashboardStats() {
  const inStock = products.filter((p) => p.inStock).length;
  const outOfStock = products.length - inStock;
  const revenueMonth = adminOrders
    .filter((o) => o.status !== 'cancelled')
    .reduce((s, o) => s + o.total, 0);
  const pendingOrders = adminOrders.filter((o) => o.status === 'pending').length;

  return {
    totalProducts: products.length,
    inStock,
    outOfStock,
    totalOrders: adminOrders.length,
    pendingOrders,
    revenueMonth,
    totalCustomers: adminCustomers.length,
    categoriesCount: categories.length,
  };
}

export function getOrderById(id: string): AdminOrder | undefined {
  return adminOrders.find((o) => o.id === id);
}

export function getRecentActivity() {
  return [
    { type: 'order', text: 'Nuevo pedido AP-2026-1042', time: 'Hace 2 h' },
    { type: 'stock', text: 'MAHLE Compresor A/C — sin stock', time: 'Hace 5 h' },
    { type: 'order', text: 'Pedido AP-2026-1041 enviado', time: 'Ayer' },
    { type: 'product', text: 'Producto actualizado: RIDEX 295W0003', time: 'Ayer' },
    { type: 'customer', text: 'Nuevo registro: Pedro Sánchez', time: 'Hace 3 días' },
  ];
}

export function getTopProducts() {
  return products
    .filter((p) => p.salePrice || p.badge === 'new')
    .slice(0, 5)
    .map((p) => ({
      id: p.id,
      name: p.name,
      sku: p.sku,
      price: formatPrice(getDisplayPrice(p)),
      stock: p.inStock ? 'En stock' : 'Agotado',
    }));
}

export { formatPrice };
