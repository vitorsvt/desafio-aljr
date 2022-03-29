import { defaulted, Describe, literal, number, object } from 'superstruct';
import { BikeData } from '../models/BikeData';

export const bikeDataSchema: Describe<BikeData> = object({
    type: defaulted(literal('bike'), () => 'bike'),
    distance: number(),
    altimetry: number(),
    speed: number()
});
