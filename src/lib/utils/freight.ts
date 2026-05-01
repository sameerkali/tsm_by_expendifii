import { PricingType } from '@/types/gr';

export function calculateFreight(
  pricingType: PricingType | string,
  rate: number,
  weight?: number,
  boxCount?: number,
): number {
  if (pricingType === PricingType.BOX) {
    return rate * (boxCount ?? 0);
  }
  // KG, KM, QUINTEL, TON — all multiply rate by the weight/quantity value
  return rate * (weight ?? 0);
}
