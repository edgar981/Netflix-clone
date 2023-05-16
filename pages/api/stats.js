import jwt from "jsonwebtoken";
import {findVideoIdByUser, insertStats, updateStats} from "@/lib/db/hasura";

export default async function stats (req, res) {
    if (req.method === 'POST'){
        try{
            const token = req.cookies.token;
            if(!token){
                res.status(403).send({});
            } else {
                const {videoId, favourited, watched = true} = req.body;
                if (videoId){
                    let decodedToken = jwt.verify(token, process.env.JWT_SECRET);

                    const userId = decodedToken.issuer;

                    const doesVideoExist = await findVideoIdByUser(userId, videoId, token);
                    if(doesVideoExist){
                        const response = await updateStats(token, {favourited, videoId, watched, userId});

                        res.send({data: response});
                    } else {
                        const response = await insertStats(token, {favourited, videoId, watched, userId});
                        res.send({data: response})
                    }
                }
            }
        } catch (error) {
            console.error(error);
            res.status(500).send({done: false, error: error?.message});
        }
    }
}