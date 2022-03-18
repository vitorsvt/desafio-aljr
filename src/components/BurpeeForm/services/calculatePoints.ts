import { round } from '../../../utils/mathUtils';
import { BurpeeData } from '../models/BurpeeData';

export function calculatePoints(data: BurpeeData) {
    let multiplier = 0.0;

    if (data.quantity < 10) {
        multiplier = 0.0;
    } else if (data.quantity < 20) {
        multiplier = 1.0;
    } else if (data.quantity < 40) {
        multiplier = 1.5;
    } else if (data.quantity < 70) {
        multiplier = 2.0;
    } else if (data.quantity < 100) {
        multiplier = 3.0;
    } else {
        multiplier = 4.0;
    }

    const points = data.quantity * multiplier;

    return round(points);
}
