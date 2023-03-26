export default interface IChallenge {
    _id?: string,
    sport_name: string,
    title: string,
    description: string,
    participants: number,
    prize_pool: number,
    end_date: string,
    rules_description?: string,
    max_participants?: number,
}