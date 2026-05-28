# Desplegar en Cloudflare Pages

El proyecto es un sitio **estático** (Astro `output: static`). No hace falta el adaptador `@astrojs/cloudflare`.

## Opción A — Desde tu PC (Wrangler CLI)

### 1. Requisitos

- Cuenta en [Cloudflare](https://dash.cloudflare.com/sign-up)
- Node.js 20+

### 2. Instalar dependencias

```bash
npm install
```

### 3. Iniciar sesión en Cloudflare

```bash
npx wrangler login
```

Se abrirá el navegador para autorizar Wrangler.

### 4. Desplegar

```bash
npm run deploy
```

La primera vez Wrangler puede pedir crear el proyecto **lujos-ramirez** (nombre en `wrangler.toml`).

URL típica: `https://lujos-ramirez.pages.dev`

### 5. (Opcional) Dominio propio

En **Workers & Pages** → tu proyecto → **Custom domains** → añade tu dominio y actualiza la variable de entorno:

| Variable   | Valor ejemplo                    |
|-----------|-----------------------------------|
| `SITE_URL` | `https://tudominio.com`          |

Vuelve a desplegar para que Astro genere URLs canónicas correctas.

---

## Opción B — Git (recomendado para CI/CD)

1. Sube el repo a **GitHub** o **GitLab**.
2. En Cloudflare: **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
3. Configuración del build:

| Campo              | Valor              |
|--------------------|--------------------|
| Framework preset   | Astro              |
| Build command      | `npm run build`    |
| Build output dir   | `dist`             |
| Node.js version    | `20`               |

4. Variables de entorno (Settings → Environment variables):

| Variable   | Production                          |
|-----------|--------------------------------------|
| `SITE_URL` | `https://<tu-proyecto>.pages.dev`   |

5. Guarda y despliega. Cada push a `main` publicará automáticamente.

---

## Comandos útiles

```bash
npm run build              # Solo generar dist/
npm run deploy             # Build + subir a Pages
npm run deploy:preview     # Despliegue en rama preview
npx wrangler pages project list
```

## Solución de problemas

- **Build falla en Cloudflare**: usa Node 20 (archivo `.node-version` incluido).
- **Página en blanco**: revisa que **Build output directory** sea `dist`, no `.astro` ni `build`.
- **React no hidrata**: el build local debe pasar (`npm run build`) antes de subir.
