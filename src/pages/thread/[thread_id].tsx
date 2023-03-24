import { useRouter } from "next/router"
import { Text, Stack, TextInput, Group, Button, Badge } from '@mantine/core'
import dynamic from 'next/dynamic'
import { useMediaQuery } from "@mantine/hooks";
import { useEffect, useRef, useState } from "react";
import MessageCard from "@/components/MessageCard";
import IMessage from "@/interfaces/IMessage";
import { v4 as uuidv4 } from 'uuid'
import { Send } from 'tabler-icons-react';
import IChallenge from "@/interfaces/IChallenge";
import { mockChallenges } from "@/mockdata/mockChallenges";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
export default function ThreadPage({ messages, challenges }: { messages: IMessage[], challenges: IChallenge[] }) {
    const router = useRouter();
    const mobile = useMediaQuery('(max-width: 768px)');
    const [messageInput, setMessageInput] = useState('');
    const [messageArr, setMessageArr] = useState<IMessage[]>([...messages]);
    const [challenge, setChallenge] = useState<IChallenge>();
    const inputRef = useRef<HTMLInputElement>(null);
    const user = {
        name: 'Current user'
    }
    useEffect(() => {
        challenges.forEach((item)=> {
            if (item.id==router.query.thread_id) {
                setChallenge(item);
            }
        })
    }, [])
    const sendMessage = async () => {
        if (messageInput == '') { return };
        const newMsg: IMessage = {
            id: uuidv4(),
            message: messageInput,
            user: {
                name: user.name
            },
            date: new Date().toUTCString()
        }
        messages.push(newMsg);
        setMessageArr([...messages].reverse());
        (inputRef.current as HTMLInputElement).value = '';
        setMessageInput('');
    }

    return (
        <>
            <Stack
                spacing={15}
                bg={'#f8f9fa'}
                align={'center'}
                h={'100vh'}
                sx={{ padding: '2%', paddingTop: 80, overflow: 'auto' }}>
                <Stack w={'100%'} spacing={0}>
                    <Group noWrap>
                        <Text fw={700} fz={25}>{challenge?.title}</Text>
                        <Badge
                            styles={() => ({ root: { background: '#ced4da', color: '#F77F00' } })}>
                            {challenge?.sport_name}
                        </Badge>
                    </Group>
                    <Text fw={500} color={'dimmed'}>{challenge?.description}</Text>
                    <Text fw={600}>Watch it live:</Text>
                </Stack>
                {ReactPlayer && <ReactPlayer url={'https://www.youtube.com/watch?v=1fueZCTYkpA'} width={mobile ? '100%' : '60%'} style={{ minHeight: mobile ? 350 : 450 }} controls></ReactPlayer>}
                <Group w={'100%'} noWrap>
                    <TextInput w={'100%'}
                        ref={inputRef}
                        label={'Challenge Thread:'}
                        placeholder={'join the conversation...'}
                        onChange={(e) => {
                            setMessageInput(e.currentTarget.value);
                        }}
                        onKeyDown={(e) => {
                            e.key == 'Enter' ? sendMessage() : null;
                        }}></TextInput>
                    <Button
                        size={'sm'}
                        radius="lg"
                        sx={{ borderStyle: 'solid', borderColor: '#F77F00', borderWidth: '2px', }}
                        styles={(theme) => ({
                            root: { background: '#F77F00', ":hover": theme.fn.hover({ background: 'white', color: '#F77F00' }) }
                        })}
                        leftIcon={<Send size={15} />}
                        mt={'auto'}
                        onClick={() => {
                            sendMessage();
                        }}>
                        Send
                    </Button>
                </Group>
                <Stack w={'100%'} bg={'none'} align={'flex-start'}
                    mih={500}
                    sx={{ borderRadius: '10px', borderStyle: 'solid', borderWidth: '1px', overflow: 'auto', borderColor: `rgba(0,0,0,0.25)` }}
                    p={'1%'}>
                    {messageArr.map((message) => {
                        return <MessageCard message={message} key={`${message.id}`}></MessageCard>
                    })}
                </Stack>
            </Stack>
        </>
    )
}

export async function getServerSideProps() {
    const mockMessages = [
        {
            id: uuidv4(),
            message: 'Greetings from Brazil!',
            user: { name: 'Marco' },
            date: new Date().toUTCString(),
        },
        {
            id: uuidv4(),
            message: `I'm about to win big on this one.`,
            user: { name: 'John' },
            date: new Date().toUTCString(),
        }
    ]
    const mockedChallenges = mockChallenges;
    return {
        props: {
            messages: mockMessages.reverse(),
            challenges: mockedChallenges
        }
    }
}