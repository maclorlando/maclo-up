import IChallenge from "@/interfaces/IChallenge";
import dbConnect from "@/libs/dbConnect";
import Challenge from "@/models/Challenge";

export const ChallengesAPI = {
    async getChallenges() {
        await dbConnect();
        try{
            const challenges = await Challenge.find({});
            if (!challenges) {
                return {status: 400, success: false}
            }
            return {status: 200, success: true, data: JSON.parse(JSON.stringify(challenges))}
        } catch (err) {
            return {status: 400, success: false}
        }
    },
    async getChallenge(id: string) {
        await dbConnect();
        try{
            const challenge = await Challenge.findById(id);
            if (!challenge) {
                return {status: 400, success: false}
            }
            return {status: 200, success: true, data: JSON.parse(JSON.stringify(challenge))}
        } catch (err) {
            return {status: 400, success: false}
        }
    },
    async updateChallenge(id: string, newChallenge: IChallenge) {
        await dbConnect();
        try{
            const challenge = await Challenge.findByIdAndUpdate(id, newChallenge);
            if (!challenge) {
                return {status: 400, success: false}
            }
            return {status: 200, success: true, data: JSON.parse(JSON.stringify(challenge))}
        } catch(err) {
            return {status: 400, success: false}
        }
    },
    async createChallenge(newChallenge: IChallenge) {
        await dbConnect();
        try {
            const challenge = await Challenge.create(newChallenge);
            if (!challenge) {
                return {status: 400, success: false}
            }
            return {status: 200, success: true, data: JSON.parse(JSON.stringify(challenge))}
        } catch (err) {
            return {status: 400, success: false}
        }
    },
    async deleteChallenge(id: string) {
        await dbConnect();
        try {
            const success = await Challenge.findByIdAndDelete(id);
            if (!success) {
                return {status: 400, success: false}
            }
            return {status: 200, success: true}
        } catch (err) {
            return {status: 400, success: false}
        }
    }
}