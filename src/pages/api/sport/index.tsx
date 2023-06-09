import dbConnect from "@/libs/dbConnect";
import Sport from "@/models/Sport";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case 'GET':
            try {
                const sports = await Sport.find({})
                res.status(200).json({ success: true, data: sports })

            } catch (error) {
                res.status(400).json({ success: false, error: error });
            }
            break;
        case 'POST':
            try {
                const sport = await Sport.create(req.body);
                res.status(200).json({success: true, data: sport});
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break;
        default:
            res.status(400).json({ success: false })
            break
    }
}