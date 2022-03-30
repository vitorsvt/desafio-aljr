import {
    Button,
    Card,
    Group,
    SimpleGrid,
    Text,
    Title,
    Tooltip
} from '@mantine/core';
import localforage from 'localforage';
import { Key, useEffect } from 'react';
import create from 'zustand';

import { Activity } from '../../../models/Activity';
import { round } from '../../../services/mathUtils';
import { BikeData, isBike } from '../../BikeForm/models/BikeData';
import { BurpeeData, isBurpee } from '../../BurpeeForm/models/BurpeeData';
import { isRun, RunData } from '../../RunForm/models/RunData';
import { isSwim, SwimData } from '../../SwimForm/models/SwimData';

localforage.config({
    name: 'app',
    version: 1.0,
    storeName: 'saved_activities',
    description: 'persistent activities'
});

interface ActivityListState {
    activities: Activity[];
    loadActivities: () => void;
    addActivity: (activity: Activity) => void;
    removeActivity: (activity: Activity) => void;
    removeAll: () => void;
}

export const activityListStore = create<ActivityListState>((set) => ({
    activities: [],
    loadActivities: () =>
        localforage.getItem<Activity[]>('activities').then((activities) => {
            if (activities !== null) {
                return set(() => ({ activities }));
            }
        }),
    addActivity: (activity) =>
        set((state) => ({
            activities: [...state.activities, activity]
        })),
    removeActivity: (activity) =>
        set((state) => ({
            activities: state.activities.filter(
                (element) => element != activity
            )
        })),
    removeAll: () => set(() => ({ activities: [] }))
}));

export interface SwimListItemProps {
    data: SwimData;
}

export function SwimListItem({ data: { distance } }: SwimListItemProps) {
    return (
        <>
            <Card p="xs" withBorder>
                <Group direction="column" align="center" spacing={0}>
                    <Text color="gray" size="xs">
                        Distância
                    </Text>
                    <Text>{distance}</Text>
                </Group>
            </Card>
        </>
    );
}

export interface BurpeeListItemProps {
    data: BurpeeData;
}

export function BurpeeListItem({ data: { quantity } }: BurpeeListItemProps) {
    return (
        <>
            <Card p="xs" withBorder>
                <Group direction="column" align="center" spacing={0}>
                    <Text color="gray" size="xs">
                        Quantidade
                    </Text>
                    <Text>{quantity}</Text>
                </Group>
            </Card>
        </>
    );
}

export interface BikeListItemProps {
    data: BikeData;
}

export function BikeListItem({ data }: BikeListItemProps) {
    const { distance, altimetry, speed } = data;

    return (
        <>
            <Card p="xs" withBorder>
                <Group direction="column" align="center" spacing={0}>
                    <Text color="gray" size="xs">
                        Distância
                    </Text>
                    <Text>{distance} km</Text>
                </Group>
            </Card>
            <Card p="xs" withBorder>
                <Group direction="column" align="center" spacing={0}>
                    <Text color="gray" size="xs">
                        Altimetria
                    </Text>
                    <Text>{altimetry} m</Text>
                </Group>
            </Card>
            <Card p="xs" withBorder>
                <Group direction="column" align="center" spacing={0}>
                    <Text color="gray" size="xs">
                        Velocidade
                    </Text>
                    <Text>{speed} km/h</Text>
                </Group>
            </Card>
        </>
    );
}

export interface RunListItemProps {
    data: RunData;
}

export function RunListItem({ data }: RunListItemProps) {
    const {
        distance,
        altimetry,
        pace: { minutes, seconds }
    } = data;

    return (
        <>
            <Card p="xs" withBorder>
                <Group direction="column" align="center" spacing={0}>
                    <Text color="gray" size="xs">
                        Distância
                    </Text>
                    <Text>{distance} km</Text>
                </Group>
            </Card>
            <Card p="xs" withBorder>
                <Group direction="column" align="center" spacing={0}>
                    <Text color="gray" size="xs">
                        Altimetria
                    </Text>
                    <Text>{altimetry} m</Text>
                </Group>
            </Card>
            <Card p="xs" withBorder>
                <Group direction="column" align="center" spacing={0}>
                    <Text color="gray" size="xs">
                        Ritmo
                    </Text>
                    <Text>
                        {minutes}:{seconds} /km
                    </Text>
                </Group>
            </Card>
        </>
    );
}

export interface ActivityListItemProps {
    key: Key;
    activity: Activity;
}

export function ActivityListItem({ activity, key }: ActivityListItemProps) {
    const { data, score } = activity;
    const { quantity, multiplier, points } = score;
    const removeActivity = activityListStore((state) => state.removeActivity);

    let title = 'Atividade';
    let unit = '';

    if (isRun(data)) {
        unit = 'km';
        if (data.pace.minutes >= 8) {
            title = 'Caminhada';
        } else {
            title = 'Corrida';
        }
    } else if (isBike(data)) {
        unit = 'km';
        title = 'Pedalada';
    } else if (isBurpee(data)) {
        title = 'Burpee';
    } else if (isSwim(data)) {
        title = 'Natação';
    }

    return (
        <Card key={key} p="xl" withBorder>
            <Group direction="row" position="apart">
                <Text weight="bold" size="lg">
                    {title}
                </Text>
                <Button color="red" onClick={() => removeActivity(activity)}>
                    Excluir
                </Button>
            </Group>
            <SimpleGrid cols={2} mt="xl" spacing="xs">
                {isRun(data) && <RunListItem data={data} />}
                {isBike(data) && <BikeListItem data={data} />}
                {isBurpee(data) && <BurpeeListItem data={data} />}
                {isSwim(data) && <SwimListItem data={data} />}
                <Tooltip
                    transition="pop"
                    label={`${quantity}${unit} * ${multiplier} = ${points} pontos`}
                >
                    <Card p="xs" withBorder>
                        <Group direction="column" align="center" spacing={0}>
                            <Text color="gray" size="xs">
                                Pontuação
                            </Text>
                            <Text align="center">{points} pontos</Text>
                        </Group>
                    </Card>
                </Tooltip>
            </SimpleGrid>
        </Card>
    );
}

function activitiesToText(activities: Activity[]) {
    const lines: string[] = [];
    let total = 0;

    for (const { data, score } of activities) {
        let title = 'Atividade';
        let unit = '';

        if (isRun(data)) {
            unit = 'km';
            if (data.pace.minutes >= 8) {
                title = 'Caminhada';
            } else {
                title = 'Corrida';
            }
        } else if (isBurpee(data)) {
            title = 'Burpee';
        } else if (isBike(data)) {
            title = 'Pedalada';
        } else if (isSwim(data)) {
            title = 'Natação';
        }

        total += score.points;

        lines.push(
            `${title}: ${score.quantity}${unit} * ${score.multiplier} = ${score.points}`
        );
    }

    lines.push(`*Total: ${round(total)} pontos*`);

    return lines;
}

export function ActivityList() {
    const [removeAll, loadActivities, activities] = activityListStore(
        (state) => [state.removeAll, state.loadActivities, state.activities]
    );

    useEffect(() => {
        loadActivities();
    }, []);

    useEffect(() => {
        localforage.setItem('activities', activities);
    }, [activities]);

    return (
        <Group direction="column" spacing="xl" align="stretch" grow>
            <Title order={2}>Atividades salvas</Title>
            {activities.length === 0 && (
                <Card p="xl" sx={() => ({ borderStyle: 'dashed' })} withBorder>
                    <Text color="gray" align="center">
                        Nenhuma atividade salva...
                    </Text>
                </Card>
            )}
            {activities.map((score, index) => (
                <ActivityListItem key={index} activity={score} />
            ))}
            {activities.length > 0 && (
                <Card p="xl" withBorder>
                    {activitiesToText(activities).map((line, index) => (
                        <Text key={index}>{line}</Text>
                    ))}
                </Card>
            )}
            <Button color="red" onClick={removeAll}>
                Excluir tudo
            </Button>
        </Group>
    );
}
