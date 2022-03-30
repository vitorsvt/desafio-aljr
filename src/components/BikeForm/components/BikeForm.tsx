import { superstructResolver } from '@hookform/resolvers/superstruct';
import { TextInput, Title, Group, Paper, Button } from '@mantine/core';
import { useForm } from 'react-hook-form';
import { stringToFloat } from '../../../services/mathUtils';
import { Points } from '../../Points';
import { BikeData } from '../models/BikeData';
import { calculatePoints } from '../services/calculatePoints';
import { bikeDataSchema } from '../services/validation';
import { useStore } from '../services/useStore';
import { showNotification } from '@mantine/notifications';
import { activityListStore } from '../../ActivityList/components/ActivityList';

export function BikeForm() {
    const setPoints = useStore((state) => state.setPoints);
    const addActivity = activityListStore((state) => state.addActivity);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<BikeData>({
        resolver: superstructResolver(bikeDataSchema, { coerce: true })
    });

    return (
        <Paper component="form" my="xl">
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

                <Group grow>
                    <Button
                        color="red"
                        onClick={handleSubmit(
                            (data) => {
                                console.log(data);
                                const score = calculatePoints(data);
                                setPoints(score.points);
                            },
                            (data) => console.log(data)
                        )}
                    >
                        Calcular
                    </Button>
                    <Button
                        color="blue"
                        onClick={handleSubmit((data) => {
                            const score = calculatePoints(data);
                            setPoints(score.points);
                            addActivity({ score, data });
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
