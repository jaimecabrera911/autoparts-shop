import { addToCart } from './cart';
import { products } from '../data/products';

export function bindAddToCart(root: ParentNode = document) {
  root.querySelectorAll<HTMLButtonElement>('.add-to-cart').forEach((btn) => {
    if (btn.dataset.bound === 'true') return;
    btn.dataset.bound = 'true';
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-product-id');
      const product = products.find((p) => p.id === id);
      if (!product) return;
      addToCart({
        productId: product.id,
        slug: product.slug,
        name: product.name,
        sku: product.sku,
        price: product.salePrice ?? product.price,
        image: product.image,
      });
      const label = product.inStock ? 'Añadir al carrito' : 'Agotado';
      const shortLabel = product.inStock ? 'Añadir' : 'Agotado';
      const prev = btn.textContent;
      btn.textContent = '✓ Añadido';
      setTimeout(() => {
        btn.textContent = prev === shortLabel || prev === label ? prev : label;
      }, 1500);
    });
  });
}
