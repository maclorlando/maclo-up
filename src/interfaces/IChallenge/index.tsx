export default interface IChallenge {
    id: string,
    sport: string,
    title: string,
    description: string,
    participants: number,
    prizePool: number,
    endDate: string,
    rulesDescription?: string,
    maxParticipants?: number,
}