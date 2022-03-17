import { Header } from '../components/Header';
import { RunForm } from '../components/RunForm';
import { Footer } from '../components/Footer';
import { Group } from '@mantine/core';
import { BikeForm } from '../components/BikeForm';
import { BurpeeForm } from '../components/BurpeeForm';
import { SwimForm } from '../components/SwimForm';
import Head from 'next/head';

export default function Index() {
    return (
        <>
            <Head>
                <link rel="shortcut icon" href="/favicon.ico" />
                <title>Desafio ALJR</title>
            </Head>
            <Header />
            <Group direction="column" px="xl" spacing="xl" align="stretch" grow>
                <BurpeeForm />
                <SwimForm />
                <BikeForm />
                <RunForm />
            </Group>
            <Footer />
        </>
    );
}
