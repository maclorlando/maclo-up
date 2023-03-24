import { Stack, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

export default function IntroText() {
    const mobile = useMediaQuery('(max-width: 768px)');
    return (
        <>
            <Stack
                bg={'none'}
                w={'90%'}
                h={100}
                align={'flex-start'}
                justify={'center'}
                spacing={0}>
                <Text
                    fz={mobile?25:40}
                    fw={700}
                    color={'#212529'}>
                    The games around the games.
                </Text>
                <Text
                    fz={mobile?15:20}
                    fw={500}
                    color={'#6c757d'}>
                    Predict sportive outcomes for profit.
                </Text>
            </Stack>
        </>
    )
}