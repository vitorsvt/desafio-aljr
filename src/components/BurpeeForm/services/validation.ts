import { defaulted, Describe, literal, number, object } from 'superstruct';
import { BurpeeData } from '../models/BurpeeData';

export const burpeeDataSchema: Describe<BurpeeData> = object({
    type: defaulted(literal('burpee'), () => 'burpee'),
    quantity: number()
});
