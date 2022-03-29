import { Header } from '../components/Header';
import { RunForm } from '../components/RunForm';
import { Footer } from '../components/Footer';
import { Group } from '@mantine/core';
import { BikeForm } from '../components/BikeForm';
import { BurpeeForm } from '../components/BurpeeForm';
import { SwimForm } from '../components/SwimForm';
import Head from 'next/head';
import { ActivityList } from '../components/ActivityList';

export default function Index() {
    return (
        <>
            <Head>
                <link rel="shortcut icon" href="./favicon.ico" />
                <title>Desafio ALJR</title>
            </Head>
            <Header />
            <Group direction="column" p="xl" spacing="xl" align="stretch" grow>
                <BurpeeForm />
                <SwimForm />
                <BikeForm />
                <RunForm />
                <ActivityList />
            </Group>
            <Footer />
        </>
    );
}
