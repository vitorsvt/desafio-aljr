import { ActivityData, ActivityType } from '../../../models/Activity';
import { Pace } from './Pace';

export interface RunData extends ActivityData<'run'> {
    distance: number;
    altimetry: number;
    pace: Pace;
}

export function isRun(object: ActivityData<ActivityType>): object is RunData {
    return object.type === 'run';
}
