import clientPromise from "../../../lib/mongodb"
import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse} from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const client = await clientPromise;
        const db = client.db("sample_mflix");

        const id = req.query.id as string
        console.log('id: %s', id)

        if (id === '') {
            const movies = await db
                .collection("movies")
                .find({})
                .sort({ metacritic: -1 })
                .limit(10)
                .toArray();
            res.status(200).json(movies);
        } else {
            const objectId = new ObjectId(id)  
            const movies = await db
            .collection("movies")
            .findOne({ _id: objectId });
        res.status(200).json(movies);
        }
    } catch (e) {
        console.error(e);
    }
}