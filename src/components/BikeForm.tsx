import { useForm } from 'react-hook-form';
import { superstructResolver } from '@hookform/resolvers/superstruct';
import { TextInput, Title, Group, Button, Text, Paper } from '@mantine/core';
import { object, Describe, number } from 'superstruct';
import create from 'zustand';

export interface BikeData {
    distance: number;
    altimetry: number;
    speed: number;
}

const BikeDataSchema: Describe<BikeData> = object({
    distance: number(),
    altimetry: number(),
    speed: number()
});

const useStore = create<BikeState>((set) => ({
    points: 0,
    setPoints: (value) => set((_) => ({ points: value }))
}));

function calculateBikePoints(data: BikeData) {
    let base = 0;

    if (data.speed > 28) {
        base = 12;
    } else if (data.speed > 20) {
        base = 11;
    } else {
        base = 10;
    }

    let increment = 0;
    const altimetryOptions = [150, 300, 450, 600, 750, 999, 1999];
    const altimetryIncrement = [2.5, 1.0, 0.5, 0.5, 0.5, 0.5, 0.5];
    altimetryOptions.forEach((altimetry, index) => {
        if (data.altimetry > altimetry) {
            increment += altimetryIncrement[index];
        }
    });

    const points = (base + increment) * data.distance;

    const round = (number: number) => {
        return Math.round(number * 100) / 100;
    };

    return round(points);
}

export interface BikeState {
    points: number;
    setPoints: (value: number) => void;
}

function stringToFloat(text: string): number {
    return parseFloat(text.replace(',', '.'));
}

export function BikeForm() {
    const points = useStore((state) => state.points);
    const setPoints = useStore((state) => state.setPoints);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<BikeData>({
        resolver: superstructResolver(BikeDataSchema)
    });

    return (
        <Paper
            component="form"
            my="xl"
            onSubmit={handleSubmit((data) => {
                setPoints(calculateBikePoints(data));
            })}
        >
            <Group direction="column" position="center" grow>
                <Title order={2}>Pontuação de pedalada</Title>
                <TextInput
                    variant="filled"
                    placeholder="Distância"
                    label="Distância"
                    description="Valor em quilômetros"
                    required
                    {...register('distance', { setValueAs: stringToFloat })}
                    error={errors.distance?.message}
                />
                <TextInput
                    variant="filled"
                    placeholder="Altimetria"
                    label="Altimetria"
                    description="Valor em metros"
                    required
                    {...register('altimetry', { valueAsNumber: true })}
                    error={errors.altimetry?.message}
                />
                <TextInput
                    variant="filled"
                    placeholder="Velocidade"
                    label="Velocidade"
                    description="Valor em km/h"
                    required
                    {...register('speed', { setValueAs: stringToFloat })}
                    error={errors.speed?.message}
                />

                <Button color="red" type="submit">
                    Calcular pontuação
                </Button>

                <Text color="gray">{`Pontuação: ${points}`}</Text>
            </Group>
        </Paper>
    );
}
