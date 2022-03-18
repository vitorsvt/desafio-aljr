import { superstructResolver } from '@hookform/resolvers/superstruct';
import { TextInput, Title, Group, Paper } from '@mantine/core';
import { useForm } from 'react-hook-form';
import { stringToFloat } from '../../../utils/mathUtils';
import { Points } from '../../Points';
import { BikeData } from '../models/BikeData';
import { calculatePoints } from '../services/calculatePoints';
import { bikeDataSchema } from '../services/validation';
import { useStore } from '../services/useStore';
import { SubmitButton } from '../../SubmitButton';

export function BikeForm() {
    const setPoints = useStore((state) => state.setPoints);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<BikeData>({
        resolver: superstructResolver(bikeDataSchema)
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

                <SubmitButton />

                <Points useStore={useStore} />
            </Group>
        </Paper>
    );
}
