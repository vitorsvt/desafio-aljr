import { superstructResolver } from '@hookform/resolvers/superstruct';
import { Group, Paper, TextInput, Title } from '@mantine/core';
import { useForm } from 'react-hook-form';
import { stringToFloat } from '../../../services/mathUtils';
import { Points } from '../../Points';
import { RunData } from '../models/RunData';
import { calculatePoints } from '../services/calculatePoints';
import { runDataSchema } from '../services/validation';
import { useStore } from '../services/useStore';
import { SubmitButton } from '../../SubmitButton';

export function RunForm() {
    const setPoints = useStore((state) => state.setPoints);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<RunData>({
        resolver: superstructResolver(runDataSchema, { coerce: true })
    });

    return (
        <Paper
            component="form"
            my="xl"
            onSubmit={handleSubmit((data) => {
                setPoints(calculatePoints(data));
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

                <SubmitButton />

                <Points useStore={useStore} />
            </Group>
        </Paper>
    );
}
