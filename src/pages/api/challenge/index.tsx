import dbConnect from "@/libs/dbConnect";
import Challenge from "@/models/Challenge";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case 'GET':
            try {
                const challenges = await Challenge.find({})
                res.status(200).json({ success: true, data: challenges })

            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'POST':
            try {
                const challenge = await Challenge.create(req.body);
                res.status(200).json({success: true, data: challenge});
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break;
        default:
            res.status(400).json({ success: false })
            break
    }
}