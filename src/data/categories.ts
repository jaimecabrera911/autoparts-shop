export type Category = {
  slug: string;
  name: string;
  icon: string;
};

export const categories: Category[] = [
  { slug: 'brakes', name: 'Frenos', icon: '◉' },
  { slug: 'engine', name: 'Motor', icon: '⚙' },
  { slug: 'filters', name: 'Filtros', icon: '◎' },
  { slug: 'electrics', name: 'Eléctrico', icon: '⚡' },
  { slug: 'suspension', name: 'Suspensión', icon: '↕' },
  { slug: 'lighting', name: 'Iluminación', icon: '◐' },
  { slug: 'oils-fluids', name: 'Aceites y fluidos', icon: '◈' },
  { slug: 'transmission', name: 'Transmisión', icon: '⇄' },
  { slug: 'body', name: 'Carrocería', icon: '▣' },
  { slug: 'tires', name: 'Neumáticos', icon: '○' },
  { slug: 'tools', name: 'Herramientas', icon: '🔧' },
];

export const vehicleMakes = [
  'Audi',
  'BMW',
  'Chevrolet',
  'Ford',
  'Honda',
  'Hyundai',
  'Mercedes-Benz',
  'Nissan',
  'Toyota',
  'Volkswagen',
];
