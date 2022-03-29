import { round } from '../../../services/mathUtils';
import { RunData } from '../models/RunData';

export function calculatePoints(data: RunData) {
    console.log(data);

    let base = 0;
    let altimetryIncrement: number[];

    if (data.pace.minutes < 5) {
        altimetryIncrement = [5, 5, 5, 5, 5, 10, 10];
        base = 70;
    } else if (data.pace.minutes < 6) {
        altimetryIncrement = [5, 5, 5, 5, 5, 10, 10];
        base = 60;
    } else if (data.pace.minutes < 8) {
        altimetryIncrement = [5, 5, 5, 5, 5, 10, 10];
        base = 50;
    } else if (data.pace.minutes < 10) {
        altimetryIncrement = [2.5, 2.5, 5, 5, 5, 15, 20];
        base = 35;
    } else if (data.pace.minutes < 12) {
        altimetryIncrement = [2.5, 2.5, 5, 5, 5, 15, 20];
        base = 25;
    } else {
        altimetryIncrement = [2.5, 2.5, 5, 5, 5, 15, 20];
        base = 15;
    }

    let increment = 0;
    const altimetryOptions = [50, 100, 200, 300, 400, 500, 1000];
    altimetryOptions.forEach((altimetry, index) => {
        if (data.altimetry > altimetry) {
            increment += altimetryIncrement[index];
        }
    });

    const points = (base + increment) * data.distance;

    return round(points);
}
