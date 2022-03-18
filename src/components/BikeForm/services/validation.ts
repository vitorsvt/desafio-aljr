import { Describe, number, object } from 'superstruct';
import { BikeData } from '../models/BikeData';

export const bikeDataSchema: Describe<BikeData> = object({
    distance: number(),
    altimetry: number(),
    speed: number()
});
