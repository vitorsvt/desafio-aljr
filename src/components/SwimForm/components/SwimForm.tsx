import { useForm } from 'react-hook-form';
import { superstructResolver } from '@hookform/resolvers/superstruct';
import { Title, Group, Paper, TextInput } from '@mantine/core';
import { stringToFloat } from '../../../services/mathUtils';
import { Points } from '../../Points';
import { useStore } from '../services/useStore';
import { SwimData } from '../models/SwimData';
import { swimDataSchema } from '../services/validation';
import { calculatePoints } from '../services/calculatePoints';
import { SubmitButton } from '../../SubmitButton';

export function SwimForm() {
    const setPoints = useStore((state) => state.setPoints);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<SwimData>({
        resolver: superstructResolver(swimDataSchema)
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

                <SubmitButton />

                <Points useStore={useStore} />
            </Group>
        </Paper>
    );
}
