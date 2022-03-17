import { useForm } from 'react-hook-form';
import { superstructResolver } from '@hookform/resolvers/superstruct';
import { Title, Group, Button, Text, Paper, TextInput } from '@mantine/core';
import { object, Describe, number } from 'superstruct';
import create from 'zustand';

export interface SwimData {
    distance: number;
}

const SwimDataSchema: Describe<SwimData> = object({
    distance: number()
});

const useStore = create<SwimState>((set) => ({
    points: 0,
    setPoints: (value) => set((_) => ({ points: value }))
}));

function calculateSwimPoints(data: SwimData) {
    const multiplier = data.distance / 100;

    const points = multiplier * 30;

    const round = (number: number) => {
        return Math.round(number * 100) / 100;
    };

    return round(points);
}

export interface SwimState {
    points: number;
    setPoints: (value: number) => void;
}

function stringToFloat(text: string): number {
    const value = parseFloat(text.replace(',', '.'));
    return value;
}

export function SwimForm() {
    const points = useStore((state) => state.points);
    const setPoints = useStore((state) => state.setPoints);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<SwimData>({
        resolver: superstructResolver(SwimDataSchema)
    });

    return (
        <Paper
            component="form"
            my="xl"
            onSubmit={handleSubmit((data) => {
                setPoints(calculateSwimPoints(data));
            })}
        >
            <Group direction="column" position="center" grow>
                <Title order={2}>Pontuação de natação</Title>
                <TextInput
                    variant="filled"
                    placeholder="Distância"
                    label="Distância"
                    description="Distância em metros"
                    required
                    {...register('distance', { setValueAs: stringToFloat })}
                    error={errors.distance?.message}
                />

                <Button color="red" type="submit">
                    Calcular pontuação
                </Button>

                <Text color="gray">{`Pontuação: ${points}`}</Text>
            </Group>
        </Paper>
    );
}
