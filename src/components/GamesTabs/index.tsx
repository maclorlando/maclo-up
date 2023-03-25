import ISport from "@/interfaces/ISport";
import { Group, Tabs } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import SportCard from "../SportCard";
import { TrendingUp, Trophy, ShirtSport, Location, Photo } from 'tabler-icons-react';
import IChallenge from "@/interfaces/IChallenge";
import ChallengeAccordion from "../ChallengeAccordion";

export default function GamesTabs({ sports, challenges }: { sports: ISport[], challenges: IChallenge[] }) {
    const mobile = useMediaQuery('(max-width: 768px)');
    return (
        <>
            <Tabs className="gamesTabs" defaultValue="sports" w={'100%'} color={'orange'}>
                <Tabs.List grow position={'apart'}>
                    <Tabs.Tab value="sports" icon={<ShirtSport size="0.8rem" />}>Sports</Tabs.Tab>
                    <Tabs.Tab value="challenges" icon={<Trophy size="0.8rem" />}>Challenges</Tabs.Tab>
                    <Tabs.Tab value="trending" icon={<TrendingUp size="0.8rem" />}>Trending</Tabs.Tab>
                    <Tabs.Tab value="near" icon={<Location size="0.8rem" />}>Near</Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value="sports" pt="xs" bg={'none'}>
                    <Group
                        maw={'100%'}
                        bg={'none'}
                        p={'1%'}
                        spacing={50}
                        sx={{ borderRadius: '10px', justifyContent: 'center' }}>
                        {sports ? sports.map((sportCard) => {
                            return <SportCard sport={sportCard} key={sportCard.name}></SportCard>
                        }) : null}
                    </Group>
                </Tabs.Panel>

                <Tabs.Panel value="challenges" pt="xs">
                    <Group
                        maw={'100%'}
                        bg={'none'}
                        p={'1%'}
                        spacing={50}
                        sx={{ borderRadius: '10px', justifyContent: 'center' }}>
                        {challenges ?
                            <ChallengeAccordion challenges={challenges}></ChallengeAccordion>
                            : null}
                    </Group>
                </Tabs.Panel>

                <Tabs.Panel value="trending" pt="xs">
                    <Group
                        maw={'100%'}
                        bg={'none'}
                        p={'1%'}
                        spacing={50}
                        sx={{ borderRadius: '10px', justifyContent: 'center' }}>
                        {challenges ?
                            <ChallengeAccordion challenges={challenges}></ChallengeAccordion>
                            : null}
                    </Group>
                </Tabs.Panel>
                <Tabs.Panel value="near" pt="xs">
                    <Group
                        maw={'100%'}
                        bg={'none'}
                        p={'1%'}
                        spacing={50}
                        sx={{ borderRadius: '10px', justifyContent: 'center' }}>
                        {challenges ?
                            <ChallengeAccordion challenges={challenges}></ChallengeAccordion>
                            : null}
                    </Group>
                </Tabs.Panel>
            </Tabs>

        </>
    )
}