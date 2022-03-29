import { useForm } from 'react-hook-form';
import { superstructResolver } from '@hookform/resolvers/superstruct';
import { Title, Group, Paper, TextInput, Button } from '@mantine/core';
import { stringToFloat } from '../../../services/mathUtils';
import { Points } from '../../Points';
import { useStore } from '../services/useStore';
import { SwimData } from '../models/SwimData';
import { swimDataSchema } from '../services/validation';
import { calculatePoints } from '../services/calculatePoints';
import { showNotification } from '@mantine/notifications';
import { activityListStore } from '../../ActivityList/components/ActivityList';

export function SwimForm() {
    const setPoints = useStore((state) => state.setPoints);
    const addActivity = activityListStore((state) => state.addActivity);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<SwimData>({
        resolver: superstructResolver(swimDataSchema, { coerce: true })
    });

    return (
        <Paper component="form" my="xl">
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
