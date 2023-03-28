import { Stack } from '@mantine/core'
import IntroText from '@/components/IntroText'
import ISport from '@/interfaces/ISport'
import IChallenge from '@/interfaces/IChallenge'
import GamesTabs from '@/components/GamesTabs'
import { mockSports } from '@/mockdata/mockSports'
import { mockChallenges } from '@/mockdata/mockChallenges'
import { useContext } from 'react'
import { MockDataContext } from '@/contexts/MockDataContext'

export default function Home() {
  const {sports, challenges} = useContext(MockDataContext);
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

