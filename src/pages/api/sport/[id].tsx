import dbConnect from "@/libs/dbConnect";
import Sport from "@/models/Sport";
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
                const sport = await Sport.findById(id);
                if (!sport) {
                    return res.status(400).json({ success: false })
                }
                res.status(200).json({ success: true, data: sport })

            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'PUT':
            try {
                const sport = await Sport.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true,
                });
                if (!sport) {
                    return res.status(400).json({ success: false })
                }
                res.status(200).json({ success: true, data: sport });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'DELETE':
            try {
                const result = await Sport.findByIdAndDelete(id);
                return res.status(200).json({success: true, data: result});
            } catch (error) {
                res.status(400).json({success: false});
            }
        default:
            res.status(400).json({ success: false })
            break
    }

}