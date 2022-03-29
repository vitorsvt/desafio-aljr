import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import type { AppProps } from 'next/app';

function App({ Component, pageProps }: AppProps) {
    return (
        <MantineProvider>
            <NotificationsProvider>
                <Component {...pageProps} />;
            </NotificationsProvider>
        </MantineProvider>
    );
}

export default App;
