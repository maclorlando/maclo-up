import IChallenge from "@/interfaces/IChallenge";

export const mockChallenges: IChallenge[] = [
    {
      _id: "1",
      sport_name: 'Nascar',
      title: '1st Position',
      description: 'Pick the pilot who will finish 1st place on this race.',
      participants: 52,
      prize_pool: 100,
      end_date: new Date().toUTCString()
    },
    {
      _id: "2",
      sport_name: 'Nascar',
      title: '3rd Position',
      description: 'Pick the pilot who will finish 3rd place on this race.',
      participants: 44,
      prize_pool: 25,
      end_date: new Date().toUTCString()
    },
    {
      _id: "3",
      sport_name: 'Soccer',
      title: 'Winning Team',
      description: 'Pick the winner of the match.',
      participants: 143,
      prize_pool: 50,
      end_date: new Date().toUTCString()
    },
    {
      _id: "4",
      sport_name: 'Basketball',
      title: 'Player with highest score',
      description: 'Pick the player who will score the most during this match.',
      participants: 21,
      prize_pool: 75,
      end_date: new Date().toUTCString()
    },
    {
      _id: "5",
      sport_name: 'Golf',
      title: 'Tournament Champion',
      description: 'Pick the player who win Tournament X.',
      participants: 12,
      prize_pool: 40,
      end_date: new Date().toUTCString()
    },
    {
      _id: "6",
      sport_name: 'Football',
      title: 'Player with most touchdowns',
      description: 'Pick the player that will score the highest number of touchdowns on Game Y.',
      participants: 12,
      prize_pool: 40,
      end_date: new Date().toUTCString()
    },
    {
      _id: "7",
      sport_name: 'Baseball',
      title: 'Player with most home runs',
      description: 'Pick the player that will score the highest number of home runs on Tournament X.',
      participants: 10,
      prize_pool: 80,
      end_date: new Date().toUTCString()
    },
  ]