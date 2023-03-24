export default interface IChallenge {
    id: string,
    sport_name: string,
    title: string,
    description: string,
    participants: number,
    prize_pool: number,
    end_date: string,
    rules_description?: string,
    max_participants?: number,
}