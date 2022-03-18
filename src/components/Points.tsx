import { Text } from '@mantine/core';

export interface PointsProps {
    useStore(param: (a: { points: number }) => number): number;
}

export function Points({ useStore }: PointsProps) {
    const points = useStore((state) => state.points);

    return <Text color="gray">{`Pontuação: ${points}`}</Text>;
}
