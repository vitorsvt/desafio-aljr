import { superstructResolver } from '@hookform/resolvers/superstruct';
import { Group, Paper, TextInput, Title } from '@mantine/core';
import { useForm } from 'react-hook-form';
import { BurpeeData } from '../models/BurpeeData';
import { Points } from '../../Points';
import { SubmitButton } from '../../SubmitButton';
import { calculatePoints } from '../services/calculatePoints';
import { useStore } from '../services/useStore';
import { burpeeDataSchema } from '../services/validation';

export function BurpeeForm() {
    const setPoints = useStore((state) => state.setPoints);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<BurpeeData>({
        resolver: superstructResolver(burpeeDataSchema)
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
                <Title order={2}>Pontuação de burpees</Title>
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

                <SubmitButton />

                <Points useStore={useStore} />
            </Group>
        </Paper>
    );
}
