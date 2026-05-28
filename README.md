# AutoParts — Demo Astro

E-commerce de **autopartes** (demo) con [Astro](https://astro.build) + Tailwind CSS 4.

Replica la **lógica de negocio** del tema [Mobex](https://enovathemes.com/mobex/home-6/) con un **diseño minimalista y moderno**. Especificación completa en [`docs/ESPECIFICACION-APLICATIVO-Y-DISEÑO.md`](docs/ESPECIFICACION-APLICATIVO-Y-DISEÑO.md).

## Requisitos

- Node.js 18+
- npm

## Instalación

```bash
npm install
npm run dev
```

Abre [http://localhost:4321](http://localhost:4321).

## Scripts

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build estático |
| `npm run preview` | Vista previa del build |
| `npm run deploy` | Build + publicar en Cloudflare Pages |

## Despliegue en Cloudflare

Guía completa: [`docs/DEPLOY-CLOUDFLARE.md`](docs/DEPLOY-CLOUDFLARE.md)

```bash
npx wrangler login   # una vez
npm run deploy
```

Proyecto Pages: **lujos-ramirez** → `https://lujos-ramirez.pages.dev`

## Rutas del demo

| Ruta | Descripción |
|------|-------------|
| `/` | Home + filtro vehículo |
| `/catalog` | Hub catálogo |
| `/shop` | Listado con filtros, vista tarjetas/tabla y exportar Excel |
| `/product/[slug]` | Detalle producto |
| `/cart` | Carrito (localStorage) |
| `/checkout` | Checkout guest (demo) |
| `/my-account` | Login / registro (UI) |
| `/my-account/garage` | Mi garaje |
| `/my-account/wishlist` | Wishlist demo |
| `/faq` | FAQ |
| `/contact` | Contacto |

## Panel de administración

| Ruta | Descripción |
|------|-------------|
| `/admin/login` | Login demo (cualquier contraseña) |
| `/admin` | Dashboard (KPIs, pedidos, actividad) |
| `/admin/orders` | Listado y detalle de pedidos |
| `/admin/products` | Catálogo y edición (UI demo) |
| `/admin/categories` | Categorías |
| `/admin/customers` | Clientes |
| `/admin/settings` | Configuración de tienda |

Acceso desde el footer (**Administración**) o directamente en `/admin/login`. La sesión demo se guarda en `sessionStorage` (`admin-auth=demo`).

## Productos mock

24 productos en `src/data/products.ts` con **imágenes remotas** del demo [Mobex](https://enovathemes.com/mobex/shop/) (`enovathemes.com/mobex/wp-content/uploads/…`). Solo para desarrollo/demo.

## Carrito (cliente)

El carrito usa `localStorage` (`src/lib/cart.ts`). Funciona sin backend:

- Añadir desde PLP o PDP
- Contador en header
- Checkout simula pedido y limpia el carrito

## Estructura

```
src/
  components/   # UI reutilizable (+ admin/)
  data/         # Productos, categorías y mock admin
  layouts/      # BaseLayout, AdminLayout
  lib/          # Carrito, filtros tienda
  pages/        # Tienda + admin/
  styles/       # global.css, admin.css
  styles/       # global.css + tokens
docs/           # Especificación producto/diseño
```

## Próximos pasos

- Conectar API / CMS (productos reales)
- Auth (NextAuth, Clerk, etc.)
- Integración pagos
- Búsqueda Meilisearch
