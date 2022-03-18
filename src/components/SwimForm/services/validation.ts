import { Describe, number, object } from 'superstruct';
import { SwimData } from '../models/SwimData';

export const swimDataSchema: Describe<SwimData> = object({
    distance: number()
});
