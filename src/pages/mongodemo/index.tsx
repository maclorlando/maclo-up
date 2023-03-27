import CreateEntityModal from "@/components/CreateEntityModal";
import { fetchers } from "@/fetchers";
import IChallenge from "@/interfaces/IChallenge";
import ISport from "@/interfaces/ISport";
import { Accordion, Button, Dialog, Group, Modal, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import useSWR from 'swr'
import { Trash, Edit } from 'tabler-icons-react';

export default function MongoDemo({ }: {}) {
    const [opened, { open, close }] = useDisclosure(false);
    const [deleteOpened, deleteControls] = useDisclosure(false);
    const [modalType, setModalType] = useState('sport');
    const [fetchedSports, setFetchedSports] = useState<ISport[]>([]);
    const [fetchedChallenges, setFetchedChallenges] = useState<IChallenge[]>([]);
    const [currEntity, setCurrEntity] = useState<ISport | IChallenge>();

    const sportsSWR = useSWR('sports', fetchers.fetchSports)
    const challengesSWR = useSWR('challenges', fetchers.fetchChallenges)

    useEffect(() => {
        if (sportsSWR.data) {
            setFetchedSports(sportsSWR.data);
        }
        if (challengesSWR.data) {
            setFetchedChallenges(challengesSWR.data);
        }
    }, [sportsSWR.data, challengesSWR.data])

    const deleteEntity = async (entity: ISport | IChallenge | undefined) => {
        if (!entity) return;
        const type = entity.hasOwnProperty('prize_pool') ? 'challenge' : 'sport'
        const result = (await (await fetch(`/api/${type}/${entity._id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        })).json());
        (type === 'challenge') ? challengesSWR.mutate() : sportsSWR.mutate();
        deleteControls.close();
        return result;
    }

    return (
        <>
            <Modal opened={opened} onClose={close} title={modalType}
                styles={{ content: { background: '#e9ecef', paddingBottom: '5%' }, header: { background: '#e9ecef' } }}>
                {<CreateEntityModal
                    entityId={currEntity?currEntity._id:undefined}
                    type={modalType} closeCallback={close} sportsMutate={sportsSWR.mutate} challengesMutate={challengesSWR.mutate}></CreateEntityModal>}
            </Modal>
            <Dialog opened={deleteOpened} withCloseButton onClose={() => {
                deleteControls.close();
            }} bg={'#e9ecef'}>
                <Stack>
                    {`Delete this entity? This can't be undone.`}
                    <Group noWrap>
                        <Button fullWidth onClick={() => { deleteControls.close() }}>Cancel</Button>
                        <Button fullWidth color={'red'} onClick={async () => {
                            const result = await deleteEntity(currEntity)
                            deleteControls.close();
                        }}>Confirm</Button>
                    </Group>
                </Stack>
            </Dialog>
            <Stack
                bg={'#f8f9fa'}
                align={'flex-start'}
                h={'100vh'}
                sx={{ padding: '2%', paddingTop: 100, overflow: 'auto' }}>
                <Text fw={500} color={'dimmed'} fz={'sm'}>
                    {`if you're running locally, you don't have database credentials - go to: `}
                    <a href="https://maclo-up.vercel.app/mongodemo">https://maclo-up.vercel.app/mongodemo</a>
                </Text>
                <Group noWrap>
                    <Text fw={600} fz={"xl"}>Sports:</Text>
                    <Button
                        sx={{ borderStyle: 'solid', borderColor: '#F77F00', borderWidth: '2px', flexShrink: 0 }}
                        styles={(theme) => ({
                            root: { background: '#F77F00', ":hover": theme.fn.hover({ background: 'white', color: '#F77F00' }) }
                        })}
                        onClick={async () => {
                            setModalType('Create Sport');
                            open();
                        }}>Add</Button>
                </Group>
                <Accordion w={'100%'}>
                    {fetchedSports.map((sport) => {
                        return <Accordion.Item value={sport.name} key={sport._id}>
                            <Accordion.Control>
                                <Group noWrap>
                                    {sport.name}
                                </Group>
                            </Accordion.Control>
                            <Accordion.Panel>
                                <Group noWrap>
                                    <Text fz={'sm'}>{`${JSON.stringify(sport, null, 2)}`}</Text>
                                    <Stack>
                                        <Button
                                            radius="xl"
                                            ml={'auto'}
                                            onClick={() => {
                                                setModalType('Update Sport');
                                                setCurrEntity(sport);
                                                open();
                                            }}>
                                            <Edit size={15}></Edit>
                                        </Button>
                                        <Button
                                            sx={{ borderStyle: 'solid', borderColor: 'red', borderWidth: '2px', flexShrink: 0 }}
                                            styles={(theme) => ({
                                                root: { background: 'red', ":hover": theme.fn.hover({ background: 'white', color: 'red' }) }
                                            })}
                                            radius={'xl'}
                                            ml={'auto'}
                                            onClick={() => {
                                                setCurrEntity(sport);
                                                deleteControls.open();
                                            }}>
                                            <Trash size={15}></Trash>
                                        </Button>
                                    </Stack>
                                </Group>
                            </Accordion.Panel>
                        </Accordion.Item>
                    })}
                </Accordion>
                <Group noWrap>
                    <Text fw={600} fz={"xl"}>Challenges:</Text>
                    <Button
                        sx={{ borderStyle: 'solid', borderColor: '#F77F00', borderWidth: '2px', flexShrink: 0 }}
                        styles={(theme) => ({
                            root: { background: '#F77F00', ":hover": theme.fn.hover({ background: 'white', color: '#F77F00' }) }
                        })}
                        onClick={() => {
                            setModalType('Create Challenge');
                            open();
                        }}>Add</Button>
                </Group>
                <Accordion w={'100%'}>
                    {fetchedChallenges.map((challenge) => {
                        return <Accordion.Item value={challenge.title} key={challenge._id}>
                            <Accordion.Control>
                                <Group noWrap>
                                    {challenge.title}
                                </Group>
                            </Accordion.Control>
                            <Accordion.Panel>
                                <Group noWrap>
                                    <Text fz={'sm'}>{`${JSON.stringify(challenge, null, 2)}`}</Text>
                                    <Stack>
                                        <Button
                                            radius="xl"
                                            ml={'auto'}
                                            onClick={() => {
                                                setModalType('Update Challenge');
                                                setCurrEntity(challenge);
                                                open();
                                            }}>
                                            <Edit size={15}></Edit>
                                        </Button>
                                        <Button
                                            sx={{ borderStyle: 'solid', borderColor: 'red', borderWidth: '2px', flexShrink: 0 }}
                                            styles={(theme) => ({
                                                root: { background: 'red', ":hover": theme.fn.hover({ background: 'white', color: 'red' }) }
                                            })}
                                            radius={'xl'}
                                            ml={'auto'}
                                            onClick={() => {
                                                setCurrEntity(challenge);
                                                deleteControls.open();
                                            }}>
                                            <Trash size={15}></Trash>
                                        </Button>
                                    </Stack>
                                </Group>
                            </Accordion.Panel>
                        </Accordion.Item>
                    })}
                </Accordion>
            </Stack>
        </>
    )
}
