import {
    coerce,
    defaulted,
    Describe,
    literal,
    number,
    object,
    string
} from 'superstruct';
import { Pace } from '../models/Pace';
import { RunData } from '../models/RunData';
import { parsePace } from './parsePace';

const paceSchema: Describe<Pace> = object({
    minutes: number(),
    seconds: number()
});

export const runDataSchema: Describe<RunData> = object({
    type: defaulted(literal('run'), () => 'run'),
    distance: number(),
    altimetry: number(),
    pace: coerce(paceSchema, string(), parsePace)
});
