import CreateEntityModal from "@/components/CreateEntityModal";
import { ChallengesAPI } from "@/datasources/ChallengesAPI";
import { SportsAPI } from "@/datasources/SportsAPI";
import IChallenge from "@/interfaces/IChallenge";
import ISport from "@/interfaces/ISport";
import { mockChallenges } from "@/mockdata/mockChallenges";
import { mockSports } from "@/mockdata/mockSports";
import { Accordion, Button, Group, Modal, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";

export default function MongoDemo({ sports, challenges }: { sports: ISport[], challenges: IChallenge[] }) {
    const [opened, { open, close }] = useDisclosure(false);
    const [modalType, setModalType] = useState('sport');

    return (
        <>
            <Modal opened={opened} onClose={close} title={modalType} styles={{ content: { background: '#e9ecef', paddingBottom: '5%' }, header: { background: '#e9ecef' } }}>
                {<CreateEntityModal type={modalType} closeCallback={close}></CreateEntityModal>}
            </Modal>
            <Stack
                bg={'#f8f9fa'}
                align={'flex-start'}
                h={'100vh'}
                sx={{ padding: '2%', paddingTop: 100, overflow: 'auto' }}>
                <Group noWrap>
                    <Text fw={600} fz={"xl"}>Sports:</Text>
                    <Button onClick={async () => {
                        setModalType('sport');
                        open();
                    }}>Add</Button>
                </Group>
                <Accordion w={'100%'}>
                    {sports.map((sport) => {
                        return <Accordion.Item value={sport.name} key={sport._id}>
                            <Accordion.Control>
                                <Group noWrap>
                                    {sport.name}
                                </Group>
                            </Accordion.Control><Accordion.Panel>
                                <Group noWrap>
                                    {`${sport.challenges} challenges`}
                                </Group>
                            </Accordion.Panel>
                        </Accordion.Item>
                    })}
                </Accordion>
                <Group noWrap>
                    <Text fw={600} fz={"xl"}>Challenges:</Text>
                    <Button onClick={() => {
                        setModalType('challenge');
                        open();
                    }}>Add</Button>
                </Group>
                <Accordion w={'100%'}>
                    {challenges.map((challenge) => {
                        return <Accordion.Item value={challenge.title} key={challenge._id}>
                            <Accordion.Control>
                                <Group noWrap>
                                    {challenge.title}
                                </Group>
                            </Accordion.Control><Accordion.Panel>
                                <Group noWrap>
                                    {`${challenge.description}`}
                                </Group>
                            </Accordion.Panel>
                        </Accordion.Item>
                    })}
                </Accordion>
            </Stack>
        </>
    )
}

export async function getServerSideProps() {
    const sports = {data: mockSports} //await SportsAPI.getSports();
    const challenges = {data: mockChallenges} //await ChallengesAPI.getChallenges();
    return {
        props: {
            sports: sports.data,
            challenges: challenges.data
        }
    }
}