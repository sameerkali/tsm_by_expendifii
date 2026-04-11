import { PricingType } from '@/types/gr';

export function calculateFreight(
  pricingType: PricingType,
  rate: number,
  weight?: number,
  boxCount?: number
): number {
  if (pricingType === PricingType.PRICE_BY_WEIGHT) {
    if (weight === undefined || weight === null) {
      throw new Error('Weight is required for Price by Weight');
    }
    return rate * weight;
  }

  if (pricingType === PricingType.PRICE_BY_BOX) {
    if (boxCount === undefined || boxCount === null) {
      throw new Error('Box count is required for Price by Box');
    }
    return rate * boxCount;
  }

  return 0;
}
