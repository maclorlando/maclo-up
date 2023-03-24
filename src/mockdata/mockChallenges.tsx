import IChallenge from "@/interfaces/IChallenge";
import { v4 as uuidv4 } from 'uuid'

export const mockChallenges: IChallenge[] = [
    {
      id: uuidv4(),
      sport: 'Nascar',
      title: '1st Position',
      description: 'Pick the pilot who will finish 1st place on this race.',
      participants: 52,
      prizePool: 100,
      endDate: new Date().toUTCString()
    },
    {
      id: uuidv4(),
      sport: 'Nascar',
      title: '3rd Position',
      description: 'Pick the pilot who will finish 3rd place on this race.',
      participants: 44,
      prizePool: 25,
      endDate: new Date().toUTCString()
    },
    {
      id: uuidv4(),
      sport: 'Soccer',
      title: 'Winning Team',
      description: 'Pick the winner of the match.',
      participants: 143,
      prizePool: 50,
      endDate: new Date().toUTCString()
    },
    {
      id: uuidv4(),
      sport: 'Basketball',
      title: 'Player with highest score',
      description: 'Pick the player who will score the most during this match.',
      participants: 21,
      prizePool: 75,
      endDate: new Date().toUTCString()
    },
    {
      id: uuidv4(),
      sport: 'Golf',
      title: 'Tournament Champion',
      description: 'Pick the player who win Tournament X.',
      participants: 12,
      prizePool: 40,
      endDate: new Date().toUTCString()
    },
    {
      id: uuidv4(),
      sport: 'Football',
      title: 'Player with most touchdowns',
      description: 'Pick the player that will score the highest number of touchdowns on Game Y.',
      participants: 12,
      prizePool: 40,
      endDate: new Date().toUTCString()
    },
  ]