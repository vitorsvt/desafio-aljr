import { useForm } from 'react-hook-form';
import { superstructResolver } from '@hookform/resolvers/superstruct';
import { Title, Group, Button, Text, Paper, TextInput } from '@mantine/core';
import { object, Describe, number } from 'superstruct';
import create from 'zustand';

export interface BurpeeData {
    quantity: number;
}

const BurpeeDataSchema: Describe<BurpeeData> = object({
    quantity: number()
});

const useStore = create<BurpeeState>((set) => ({
    points: 0,
    setPoints: (value) => set((_) => ({ points: value }))
}));

function calculateBurpeePoints(data: BurpeeData) {
    let multiplier = 0.0;

    if (data.quantity < 10) {
        multiplier = 0.0;
    } else if (data.quantity < 20) {
        multiplier = 1.0;
    } else if (data.quantity < 40) {
        multiplier = 1.5;
    } else if (data.quantity < 70) {
        multiplier = 2.0;
    } else if (data.quantity < 100) {
        multiplier = 3.0;
    } else {
        multiplier = 4.0;
    }

    const points = data.quantity * multiplier;

    const round = (number: number) => {
        return Math.round(number * 100) / 100;
    };

    return round(points);
}

export interface BurpeeState {
    points: number;
    setPoints: (value: number) => void;
}

export function BurpeeForm() {
    const points = useStore((state) => state.points);
    const setPoints = useStore((state) => state.setPoints);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<BurpeeData>({
        resolver: superstructResolver(BurpeeDataSchema)
    });

    return (
        <Paper
            component="form"
            my="xl"
            onSubmit={handleSubmit((data) => {
                setPoints(calculateBurpeePoints(data));
            })}
        >
            <Group direction="column" position="center" grow>
                <Title order={2}>Calcular pontuação de burpees</Title>
                <TextInput
                    variant="filled"
                    placeholder="Burpees"
                    label="Burpees"
                    description="Quantidade total"
                    required
                    {...register('quantity', {
                        valueAsNumber: true
                    })}
                    error={errors.quantity?.message}
                />

                <Button color="red" type="submit">
                    Calcular pontuação
                </Button>

                <Text color="gray">{`Pontuação: ${points}`}</Text>
            </Group>
        </Paper>
    );
}
