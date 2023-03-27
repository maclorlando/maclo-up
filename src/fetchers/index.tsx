export const fetchers = {
    fetchSports: async () => {
        const sports = (await (await fetch('/api/sport', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          })).json())
        return sports.data;
    },
    fetchChallenges: async () => {
        const challenges = (await (await fetch('/api/challenge', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        })).json())
        return challenges.data;
    }
}