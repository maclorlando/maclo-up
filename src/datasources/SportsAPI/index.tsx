import ISport from "@/interfaces/ISport";
import dbConnect from "@/libs/dbConnect";
import Sport from "@/models/Sport";

export const SportsAPI = {
    async getSports() {
        await dbConnect();
        try {
            const sports = await Sport.find({})
            return { status: 200, success: true, data: JSON.parse(JSON.stringify(sports)) }

        } catch (error) {
            return { status: 400, success: false };
        }
    },
    async updateSport(sportId: string, newSport: ISport) {
        await dbConnect();
        try {
            const sport = await Sport.findByIdAndUpdate(sportId, newSport)
            return { status: 200, success: true, data: sport }
        } catch (error) {
            return { status: 400, success: false };
        }
    },
    async createSport(newSport: ISport) {
        await dbConnect();
        try {
            const sport = await Sport.create(newSport);
            if (!sport) {
                return { status: 400, success: false }
            }
            return { status: 200, success: true, data: JSON.parse(JSON.stringify(sport)) }
        } catch (err) {
            return { status: 400, success: false }
        }
    }
}