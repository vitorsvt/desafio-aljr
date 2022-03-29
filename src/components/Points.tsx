import { Card, Text } from '@mantine/core';

export interface PointsProps {
    useStore(param: (a: { points: number }) => number): number;
}

export function Points({ useStore }: PointsProps) {
    const points = useStore((state) => state.points);

    if (points === 0) {
        return <></>;
    }

    return (
        <Card p="xl" withBorder>
            <Text align="center" color="gray">{`Pontuação: ${points}`}</Text>
        </Card>
    );
}
