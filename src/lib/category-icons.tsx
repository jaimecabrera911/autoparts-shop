import type { IconType } from 'react-icons';
import {
  MdBuild,
  MdElectricBolt,
  MdFilterAlt,
  MdLightbulb,
  MdLocalGasStation,
  MdSettings,
  MdTireRepair,
} from 'react-icons/md';
import { TbCar, TbDisc, TbEngine, TbManualGearbox, TbArrowsExchange } from 'react-icons/tb';

export const categoryIconBySlug: Record<string, IconType> = {
  brakes: TbDisc,
  engine: TbEngine,
  filters: MdFilterAlt,
  electrics: MdElectricBolt,
  suspension: MdSettings,
  lighting: MdLightbulb,
  'oils-fluids': MdLocalGasStation,
  transmission: TbManualGearbox,
  body: TbCar,
  tires: MdTireRepair,
  tools: MdBuild,
};

export function getCategoryIcon(slug: string): IconType {
  return categoryIconBySlug[slug] ?? TbArrowsExchange;
}
