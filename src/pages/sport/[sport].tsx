import ChallengeAccordion from "@/components/ChallengeAccordion";
import IChallenge from "@/interfaces/IChallenge";
import ISport from "@/interfaces/ISport";
import { mockChallenges } from "@/mockdata/mockChallenges";
import { mockSports } from "@/mockdata/mockSports";
import { Badge, Group, Stack, Text, Image, Overlay } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function SportPage({sports, challenges}: {sports: ISport[], challenges: IChallenge[]}) {
    const mobile = useMediaQuery('(max-width: 768px)');
    const router = useRouter();
    const [sport, setSport] = useState<ISport>();
    const [participants, setParticipants] = useState<number>();
    const [sportChallenges, setSportChallenges] = useState<IChallenge[]>([]);
    useEffect(() => {
        sports.forEach((sport) => {
            if (sport.name.toLowerCase() == router.query.sport) {
                setSport(sport)
            }
        });
        let nParticipants = 0;
        challenges.forEach((challenge) => {
            if (challenge.sport_name.toLowerCase() == router.query.sport) {
                nParticipants += challenge.participants;
                if (!sportChallenges.includes(challenge)) {
                    sportChallenges.push(challenge);
                }
            }
        });
        setSportChallenges(sportChallenges);
        setParticipants(nParticipants);
    }, []);
    return (
        <>

            <Stack
                sx={{ padding: '5%', paddingTop: 100, overflow: 'auto' }}
                bg={'#f8f9fa'}
                h={'100vh'}
                spacing={10}>
                <Group spacing={20}>
                    <Text fw={700} fz={35}>{sport?.name}</Text>
                    <Badge
                        mt={5}
                        styles={() => ({ root: { background: '#ced4da', color: '#F77F00' } })}>
                        {`${sport?.challenges} challenges`}
                    </Badge>
                    <Badge
                        mt={5}
                        styles={() => ({ root: { background: '#ced4da', color: '#D62828' } })}>
                        {`${participants} total participants`}
                    </Badge>
                </Group>
                <Text fw={600} color={'dimmed'}>{sport?.description}</Text>
                <Image
                    alt="sport_img"
                    radius={'lg'}
                    src={sport?.image_url}
                    height={mobile?150:350} fit={'cover'}>
                </Image>
                <Text fw={600}>{`${sport?.name} Challenges:`}</Text>
                <ChallengeAccordion challenges={sportChallenges}></ChallengeAccordion>
            </Stack>
        </>
    )
}

export async function getServerSideProps() {
  
    const mockedSports = mockSports;
    const mockedChallenges = mockChallenges;
  
    // const sportsResult = await SportsAPI.getSports();
    // const fetchedSports = sportsResult.data;
  
    return {props: {
      sports: mockedSports,
      challenges: mockedChallenges,
    }}
  }