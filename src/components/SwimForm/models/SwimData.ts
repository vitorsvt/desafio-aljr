import { ActivityData, ActivityType } from '../../../models/Activity';

export interface SwimData extends ActivityData<'swim'> {
    distance: number;
}

export function isSwim(data: ActivityData<ActivityType>): data is SwimData {
    return data.type === 'swim';
}
