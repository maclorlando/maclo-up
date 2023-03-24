import IMessage from "@/interfaces/IMessage";
import { Avatar, Divider, Group, Stack, Text } from "@mantine/core";

export default function MessageCard({message}:{message: IMessage}) {
    const user = {
        name: 'Marco'
    }
    return (
        <>
            <Stack bg={'none'} w={'100%'} p={'1%'}>
                <Group noWrap spacing={10}>
                    <Avatar color={'dark'} radius={'xl'}></Avatar>
                    <Text fw={700}>{`${message.user.name}: `}</Text>
                    <Text fw={400} color={'dimmed'}>{`${new Date(message.date).toLocaleDateString()} @ ${new Date(message.date).toLocaleTimeString()}`}</Text>
                </Group>
                <Group>
                    <Text fw={400}>{message.message}</Text>
                </Group>
                <Divider my="sm" />
            </Stack>
        </>
    )
}