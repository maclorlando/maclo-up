import { Stack } from '@mantine/core'
import IntroText from '@/components/IntroText'
import ISport from '@/interfaces/ISport'
import IChallenge from '@/interfaces/IChallenge'
import GamesTabs from '@/components/GamesTabs'
import { mockSports } from '@/mockdata/mockSports'
import { mockChallenges } from '@/mockdata/mockChallenges'

export default function Home({sports, challenges}:{sports: ISport[], challenges: IChallenge[]}) {
  return (
    <>
      <main>
        <Stack
          bg={'#f8f9fa'}
          align={'center'}
          h={'100vh'}
          sx={{ padding: '2%', paddingTop: 80, overflow: 'auto'}}>
          <IntroText></IntroText>
          <GamesTabs sports={sports} challenges={challenges}></GamesTabs>
        </Stack>
      </main>
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
