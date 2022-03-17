import { useForm } from 'react-hook-form';
import { superstructResolver } from '@hookform/resolvers/superstruct';
import { TextInput, Title, Group, Button, Text, Paper } from '@mantine/core';
import { object, Describe, number, coerce, string } from 'superstruct';
import create from 'zustand';

export interface Pace {
    minutes: number;
    seconds: number;
}

export interface RunData {
    distance: number;
    altimetry: number;
    pace: Pace;
}

function parsePace(pace: string): Pace {
    const [minutes, seconds, ..._] = pace.split(':');
    return {
        minutes: Number(minutes),
        seconds: Number(seconds)
    };
}

const PaceSchema: Describe<Pace> = object({
    minutes: number(),
    seconds: number()
});

const paceCoercer = coerce(PaceSchema, string(), parsePace);

const RunDataSchema: Describe<RunData> = object({
    distance: number(),
    altimetry: number(),
    pace: paceCoercer
});

const useStore = create<RunState>((set) => ({
    points: 0,
    setPoints: (value) => set((_) => ({ points: value }))
}));

function calculateRunPoints(data: RunData) {
    console.log(data);

    let base = 0;
    let altimetryIncrement: number[];

    if (data.pace.minutes < 5) {
        altimetryIncrement = [5, 5, 5, 5, 5, 10, 10];
        base = 70;
    } else if (data.pace.minutes < 6) {
        altimetryIncrement = [5, 5, 5, 5, 5, 10, 10];
        base = 60;
    } else if (data.pace.minutes < 8) {
        altimetryIncrement = [5, 5, 5, 5, 5, 10, 10];
        base = 50;
    } else if (data.pace.minutes < 10) {
        altimetryIncrement = [2.5, 2.5, 5, 5, 5, 15, 20];
        base = 35;
    } else if (data.pace.minutes < 12) {
        altimetryIncrement = [2.5, 2.5, 5, 5, 5, 15, 20];
        base = 25;
    } else {
        altimetryIncrement = [2.5, 2.5, 5, 5, 5, 15, 20];
        base = 15;
    }

    let increment = 0;
    const altimetryOptions = [50, 100, 200, 300, 400, 500, 1000];
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

function stringToFloat(text: string): number {
    return parseFloat(text.replace(',', '.'));
}

export interface RunState {
    points: number;
    setPoints: (value: number) => void;
}

export function RunForm() {
    const points = useStore((state) => state.points);
    const setPoints = useStore((state) => state.setPoints);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<RunData>({
        resolver: superstructResolver(RunDataSchema, { coerce: true })
    });

    return (
        <Paper
            component="form"
            my="xl"
            onSubmit={handleSubmit((data) => {
                setPoints(calculateRunPoints(data));
            })}
        >
            <Group direction="column" position="center" grow>
                <Title order={2}>Pontuação de caminhada/corrida</Title>
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
                    placeholder="Ritmo"
                    label="Ritmo"
                    description="Valor no formato min:seg por km"
                    required
                    {...register('pace')}
                    error={
                        errors.pace?.minutes?.message ||
                        errors.pace?.seconds?.message
                    }
                />

                <Button color="red" type="submit">
                    Calcular pontuação
                </Button>

                <Text color="gray">{`Pontuação: ${points}`}</Text>
            </Group>
        </Paper>
    );
}
