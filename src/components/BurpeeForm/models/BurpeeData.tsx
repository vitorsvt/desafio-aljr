import { ActivityData, ActivityType } from '../../../models/Activity';

export interface BurpeeData extends ActivityData<'burpee'> {
    quantity: number;
}

export function isBurpee(data: ActivityData<ActivityType>): data is BurpeeData {
    return data.type === 'burpee';
}
