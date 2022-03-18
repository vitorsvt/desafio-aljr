import { Describe, number, object } from 'superstruct';
import { BurpeeData } from '../models/BurpeeData';

export const burpeeDataSchema: Describe<BurpeeData> = object({
    quantity: number()
});
