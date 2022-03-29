import { round } from '../../../services/mathUtils';
import { BikeData } from '../models/BikeData';

export function calculatePoints(data: BikeData) {
    let base = 0;

    if (data.speed > 28) {
        base = 12;
    } else if (data.speed > 20) {
        base = 11;
    } else {
        base = 10;
    }

    let increment = 0;
    const altimetryOptions = [150, 300, 450, 600, 750, 999, 1999];
    const altimetryIncrement = [2.5, 1.0, 0.5, 0.5, 0.5, 0.5, 0.5];
    altimetryOptions.forEach((altimetry, index) => {
        if (data.altimetry > altimetry) {
            increment += altimetryIncrement[index];
        }
    });

    const multiplier = base + increment;
    const points = multiplier * data.distance;

    return {
        multiplier: multiplier,
        quantity: data.distance,
        points: round(points)
    };
}
