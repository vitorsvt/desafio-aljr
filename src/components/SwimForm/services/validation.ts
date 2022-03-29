import { defaulted, Describe, literal, number, object } from 'superstruct';
import { SwimData } from '../models/SwimData';

export const swimDataSchema: Describe<SwimData> = object({
    type: defaulted(literal('swim'), () => 'swim'),
    distance: number()
});
