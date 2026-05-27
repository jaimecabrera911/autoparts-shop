export type CartLine = {
  productId: string;
  slug: string;
  name: string;
  sku: string;
  price: number;
  qty: number;
  image?: string;
};

const STORAGE_KEY = 'autoparts-cart';

export function getCart(): CartLine[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartLine[]) : [];
  } catch {
    return [];
  }
}

export function saveCart(lines: CartLine[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  window.dispatchEvent(new CustomEvent('cart-updated'));
}

export function getCartCount(): number {
  return getCart().reduce((sum, line) => sum + line.qty, 0);
}

export function addToCart(line: Omit<CartLine, 'qty'>, qty = 1): void {
  const cart = getCart();
  const existing = cart.find((l) => l.productId === line.productId);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ ...line, qty });
  }
  saveCart(cart);
}

export function updateQty(productId: string, qty: number): void {
  const cart = getCart().map((l) =>
    l.productId === productId ? { ...l, qty: Math.max(1, qty) } : l,
  );
  saveCart(cart.filter((l) => l.qty > 0));
}

export function removeFromCart(productId: string): void {
  saveCart(getCart().filter((l) => l.productId !== productId));
}

export function clearCart(): void {
  saveCart([]);
}

export function getCartSubtotal(lines: CartLine[]): number {
  return lines.reduce((sum, l) => sum + l.price * l.qty, 0);
}
