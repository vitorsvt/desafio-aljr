import { round } from '../../../services/mathUtils';
import { SwimData } from '../models/SwimData';

export function calculatePoints(data: SwimData) {
    const multiplier = data.distance / 100;
    const points = multiplier * 30;
    return round(points);
}
