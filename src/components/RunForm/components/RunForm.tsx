import { superstructResolver } from '@hookform/resolvers/superstruct';
import { Button, Group, Paper, TextInput, Title } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useForm } from 'react-hook-form';
import { stringToFloat } from '../../../services/mathUtils';
import { Points } from '../../Points';
import { RunData } from '../models/RunData';
import { calculateScore } from '../services/calculateScore';
import { runDataSchema } from '../services/validation';
import { useStore } from '../services/useStore';
import { activityListStore } from '../../ActivityList/components/ActivityList';

export function RunForm() {
    const setPoints = useStore((state) => state.setPoints);
    const addActivity = activityListStore((state) => state.addActivity);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<RunData>({
        resolver: superstructResolver(runDataSchema, { coerce: true })
    });

    return (
        <Paper component="form" my="xl">
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

                <Group grow>
                    <Button
                        color="red"
                        onClick={handleSubmit((data) => {
                            const score = calculateScore(data);
                            setPoints(score.points);
                        })}
                    >
                        Calcular
                    </Button>
                    <Button
                        color="blue"
                        onClick={handleSubmit((data) => {
                            const score = calculateScore(data);
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
                        Salvar
                    </Button>
                </Group>

                <Points useStore={useStore} />
            </Group>
        </Paper>
    );
}
