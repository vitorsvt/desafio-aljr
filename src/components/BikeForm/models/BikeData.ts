import { ActivityData, ActivityType } from '../../../models/Activity';

export interface BikeData extends ActivityData<'bike'> {
    distance: number;
    altimetry: number;
    speed: number;
}

export function isBike(data: ActivityData<ActivityType>): data is BikeData {
    return data.type === 'bike';
}
