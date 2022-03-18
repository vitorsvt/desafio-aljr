import { Pace } from '../models/Pace';

export function parsePace(pace: string): Pace {
    const [minutes, seconds] = pace.split(':');
    return {
        minutes: Number(minutes),
        seconds: Number(seconds)
    };
}
