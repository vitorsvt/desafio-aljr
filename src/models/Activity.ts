export type ActivityType = 'run' | 'swim' | 'burpee' | 'bike';

export interface ActivityData<T extends ActivityType> {
    readonly type: T;
}

export interface Score {
    quantity: number;
    multiplier: number;
    points: number;
}

export interface Activity {
    data: ActivityData<ActivityType>;
    score: Score;
}
