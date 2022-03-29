import { round } from '../../../services/mathUtils';
import { SwimData } from '../models/SwimData';

export function calculatePoints(data: SwimData) {
    const quantity = data.distance / 100;
    const multiplier = 30;
    const points = quantity * multiplier;
    return {
        multiplier: multiplier,
        quantity: quantity,
        points: round(points)
    };
}
