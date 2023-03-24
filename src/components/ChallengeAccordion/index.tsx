import IChallenge from "@/interfaces/IChallenge";
import { Button, Group, Text, Accordion, Badge, Stack } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useRouter } from "next/router";
import { Trophy, BallBasketball, BallBaseball, Flag, BallAmericanFootball, BallFootball, Golf, Message, CurrencyDollar } from 'tabler-icons-react';

export default function ChallengeAccordion({ challenges }: { challenges: IChallenge[] }) {
    const mobile = useMediaQuery('(max-width: 768px)');
    const router = useRouter();
    const getSportIcon = (sport: string) => {
        const size: number = 18
        switch (sport) {
            case 'Basketball':
                return <BallBasketball size={size} style={{ flexShrink: 0 }}></BallBasketball>

            case 'Baseball':
                return <BallBaseball size={size} style={{ flexShrink: 0 }}></BallBaseball>

            case 'Nascar':
                return <Flag size={size} style={{ flexShrink: 0 }}></Flag>

            case 'Soccer':
                return <BallFootball size={size} style={{ flexShrink: 0 }}></BallFootball>

            case 'Football':
                return <BallAmericanFootball size={size} style={{ flexShrink: 0 }}></BallAmericanFootball>
            case 'Golf':
                return <Golf size={size} style={{ flexShrink: 0 }}></Golf>
            default:
                return <Trophy size={15} style={{ flexShrink: 0 }}></Trophy>
        }
    }
    return (
        <>
            <Accordion
                w={'100%'}
                chevronPosition="right" variant="contained"
                styles={(theme) => (
                    {
                        item: { ":hover": theme.fn.hover({ background: '#f8f9fa' }) },
                        control: { ":hover": theme.fn.hover({ background: '#f8f9fa' }) }
                    }
                )}>
                {challenges ? challenges.map((challenge) => {
                    return (
                        <Accordion.Item value={challenge.id} key={challenge.id}
                            bg={'#e9ecef'}>
                            <Accordion.Control>
                                <Group noWrap bg={'none'} spacing={10}>
                                    {getSportIcon(challenge.sport)}
                                    <Text fw={500} fz={mobile ? 'xs' : 'sm'}>{challenge.title}</Text>
                                    <Badge
                                        styles={() => ({ root: { background: '#ced4da', color: '#F77F00' } })}>
                                        {challenge.sport}
                                    </Badge>
                                    <Badge
                                        size={'lg'}
                                        styles={() => ({ root: { background: '#bee9e8', color: '#1e6091', flexShrink: 0 } })}>
                                        {`$${challenge.prizePool}`}
                                    </Badge>
                                </Group>
                            </Accordion.Control>
                            <Accordion.Panel>
                                <Group noWrap>
                                    <Stack>
                                        <Badge
                                            maw={150}
                                            styles={() => ({ root: { background: '#ced4da', color: '#D62828' } })}>
                                            {`${challenge.participants} participants`}
                                        </Badge>
                                        <Text size="sm" fw={600} color={'dimmed'}>{challenge.description}</Text>
                                    </Stack>
                                    <Group bg={'none'} ml={'auto'}>
                                        <Button
                                            size={'sm'}
                                            radius="lg"
                                            sx={{ borderStyle: 'solid', borderColor: '#F77F00', borderWidth: '2px', }}
                                            styles={(theme) => ({
                                                root: { background: '#F77F00', ":hover": theme.fn.hover({ background: 'white', color: '#F77F00' }) }
                                            })}
                                            leftIcon={<CurrencyDollar size={15}/>}>
                                            Make Picks
                                        </Button>
                                        <Button
                                            size={'sm'}
                                            radius="lg"
                                            sx={{ borderStyle: 'solid', borderColor: '#F77F00', borderWidth: '2px', }}
                                            styles={(theme) => ({
                                                root: { background: '#F77F00', ":hover": theme.fn.hover({ background: 'white', color: '#F77F00' }) }
                                            })}
                                            leftIcon={<Message size={15}/>}
                                            onClick={()=>{
                                                router.push(`/thread/${challenge.id}`)
                                            }}>
                                            Thread
                                        </Button>
                                    </Group>
                                </Group>
                            </Accordion.Panel>
                        </Accordion.Item>
                    )
                }) : null}</Accordion>
        </>
    )
}   