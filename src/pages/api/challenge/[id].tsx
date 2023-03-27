import dbConnect from "@/libs/dbConnect";
import Challenge from "@/models/Challenge";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {
        query: { id },
        method,
    } = req
    await dbConnect();

    switch (method) {
        case 'GET':
            try {
                const challenge = await Challenge.findById(id);
                if (!challenge) {
                    return res.status(400).json({ success: false })
                }
                res.status(200).json({ success: true, data: challenge })

            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'PUT':
            try {
                const challenge = await Challenge.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true,
                });
                if (!challenge) {
                    return res.status(400).json({ success: false })
                }
                res.status(200).json({ success: true, data: challenge });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'DELETE':
            try {
                const result = await Challenge.findByIdAndDelete(id);
                return res.status(200).json({success: true, data: result});
            } catch (error) {
                res.status(400).json({success: false});
            }
        default:
            res.status(400).json({ success: false })
            break
    }

}