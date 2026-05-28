import React from 'react';
import type { IconType } from 'react-icons';
import {
  HiOutlineArrowRight,
  HiOutlineSquares2X2,
  HiOutlineTag,
  HiOutlineTruck,
} from 'react-icons/hi2';
import type { Category } from '../../data/categories';
import { getCategoryIcon } from '../../lib/category-icons';

type Props = {
  categories: Category[];
  vehicleMakes: string[];
  brands: string[];
};

function HubCard({
  href,
  icon: Icon,
  title,
  description,
  children,
}: {
  href: string;
  icon: IconType;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="group flex h-full flex-col rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-sm)] transition-all hover:border-[var(--color-accent)] hover:shadow-md md:p-8"
    >
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-[var(--color-accent)] transition-colors group-hover:bg-[var(--color-accent)] group-hover:text-white">
        <Icon className="h-6 w-6" aria-hidden />
      </span>
      <h2 className="mt-5 text-lg font-semibold tracking-tight group-hover:text-[var(--color-accent)]">
        {title}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">{description}</p>
      <div className="mt-4 flex-1">{children}</div>
      <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-[var(--color-accent)]">
        Explorar
        <HiOutlineArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </a>
  );
}

export default function CatalogHub({ categories, vehicleMakes, brands }: Props) {
  return (
    <div className="catalog-hub">
      <header className="catalog-hub__intro">
        <p className="text-sm font-semibold uppercase tracking-wider text-[var(--color-accent)]">
          Lujos Ramirez
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">Catálogo</h1>
        <p className="mt-3 max-w-2xl text-[var(--color-muted)]">
          Navega por marca de vehículo, tipo de pieza o fabricante. Todos los enlaces respetan los
          filtros de la tienda.
        </p>
      </header>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        <HubCard
          href="/shop"
          icon={HiOutlineTruck}
          title="Por marca de auto"
          description="Encuentra repuestos compatibles con las marcas más buscadas."
        >
          <ul className="flex flex-wrap gap-2">
            {vehicleMakes.slice(0, 8).map((make) => (
              <li key={make}>
                <span className="rounded-full border border-[var(--color-border)] bg-[var(--color-bg)] px-2.5 py-1 text-xs font-medium text-[var(--color-text)]">
                  {make}
                </span>
              </li>
            ))}
          </ul>
        </HubCard>

        <HubCard
          href="/shop"
          icon={HiOutlineSquares2X2}
          title="Por categoría de pieza"
          description="Frenos, motor, filtros, iluminación y más departamentos técnicos."
        >
          <ul className="space-y-2">
            {categories.slice(0, 5).map((cat) => {
              const Icon = getCategoryIcon(cat.slug);
              return (
                <li key={cat.slug}>
                  <span className="flex items-center gap-2 text-sm text-[var(--color-muted)]">
                    <Icon className="h-4 w-4 shrink-0 text-[var(--color-accent)]" aria-hidden />
                    {cat.name}
                  </span>
                </li>
              );
            })}
          </ul>
        </HubCard>

        <HubCard
          href="/shop"
          icon={HiOutlineTag}
          title="Por marca de repuesto"
          description="Fabricantes originales y alternativos de confianza."
        >
          <ul className="flex flex-wrap gap-2">
            {brands.slice(0, 8).map((brand) => (
              <li key={brand}>
                <span className="rounded-full border border-[var(--color-border)] bg-[var(--color-bg)] px-2.5 py-1 text-xs font-medium">
                  {brand}
                </span>
              </li>
            ))}
          </ul>
        </HubCard>
      </div>

      <section className="mt-16" aria-labelledby="catalog-categories-heading">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 id="catalog-categories-heading" className="text-xl font-semibold">
              Todas las categorías
            </h2>
            <p className="mt-1 text-sm text-[var(--color-muted)]">
              {categories.length} departamentos en inventario
            </p>
          </div>
          <a href="/shop" className="text-sm font-medium text-[var(--color-accent)]">
            Ver tienda completa →
          </a>
        </div>

        <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((cat) => {
            const Icon = getCategoryIcon(cat.slug);
            return (
              <li key={cat.slug}>
                <a
                  href={`/shop?category=${cat.slug}`}
                  className="group flex h-full flex-col items-center gap-3 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 text-center transition-all hover:border-[var(--color-accent)] hover:shadow-sm"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-teal-50 text-[var(--color-accent)] transition-colors group-hover:bg-[var(--color-accent)] group-hover:text-white">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <span className="text-sm font-medium leading-snug">{cat.name}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="mt-14" aria-labelledby="catalog-makes-heading">
        <h2 id="catalog-makes-heading" className="text-xl font-semibold">
          Marcas de vehículo
        </h2>
        <p className="mt-1 text-sm text-[var(--color-muted)]">
          Selecciona una marca y afina el modelo en la tienda.
        </p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {vehicleMakes.map((make) => (
            <li key={make}>
              <a
                href={`/shop?make=${encodeURIComponent(make)}`}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 text-sm font-medium transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
              >
                <HiOutlineTruck className="h-4 w-4 opacity-60" aria-hidden />
                {make}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14" aria-labelledby="catalog-brands-heading">
        <h2 id="catalog-brands-heading" className="text-xl font-semibold">
          Marcas de repuesto
        </h2>
        <p className="mt-1 text-sm text-[var(--color-muted)]">
          Filtra la tienda por fabricante.
        </p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {brands.map((brand) => (
            <li key={brand}>
              <a
                href={`/shop?brand=${encodeURIComponent(brand)}`}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 text-sm font-medium transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
              >
                <HiOutlineTag className="h-4 w-4 opacity-60" aria-hidden />
                {brand}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
