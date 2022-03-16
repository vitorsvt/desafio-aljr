import { Header as MantineHeader, Image } from '@mantine/core';

export function Header() {
    return (
        <MantineHeader px="xl" height={100}>
            <Image width={100} src="./logo.png"></Image>
        </MantineHeader>
    );
}
