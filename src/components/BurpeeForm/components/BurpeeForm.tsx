import { superstructResolver } from '@hookform/resolvers/superstruct';
import { Button, Group, Paper, TextInput, Title } from '@mantine/core';
import { useForm } from 'react-hook-form';
import { BurpeeData } from '../models/BurpeeData';
import { Points } from '../../Points';
import { calculatePoints } from '../services/calculatePoints';
import { useStore } from '../services/useStore';
import { burpeeDataSchema } from '../services/validation';
import { activityListStore } from '../../ActivityList/components/ActivityList';
import { showNotification } from '@mantine/notifications';

export function BurpeeForm() {
    const setPoints = useStore((state) => state.setPoints);
    const addActivity = activityListStore((state) => state.addActivity);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<BurpeeData>({
        resolver: superstructResolver(burpeeDataSchema, { coerce: true })
    });

    return (
        <Paper component="form" my="xl">
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

                <Group grow>
                    <Button
                        color="red"
                        onClick={handleSubmit((data) => {
                            const score = calculatePoints(data);
                            setPoints(score.points);
                        })}
                    >
                        Calcular pontuação
                    </Button>
                    <Button
                        color="blue"
                        onClick={handleSubmit((data) => {
                            const score = calculatePoints(data);
                            setPoints(score.points);
                            addActivity({
                                data: data,
                                score: score
                            });
                            showNotification({
                                title: 'Sucesso',
                                message: 'Atividade salva'
                            });
                        })}
                    >
                        Salvar atividade
                    </Button>
                </Group>

                <Points useStore={useStore} />
            </Group>
        </Paper>
    );
}
