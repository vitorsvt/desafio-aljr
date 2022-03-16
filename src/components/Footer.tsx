import { Box } from '@mantine/core';

export function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                backgroundImage: 'url(icon.png)',
                backgroundRepeat: 'repeat',
                backgroundSize: 50,
                height: 150
            }}
        />
    );
}
