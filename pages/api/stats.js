import jwt from "jsonwebtoken";

export default async function stats (req, res) {
    if (req.method === 'POST'){
        try{
            const token = req.cookies.token;
            if(!token){
                res.status(403).send({});
            } else {
                let decoded = jwt.verify(token, process.env.JWT_SECRET)
                res.send({msg: "works", decoded})
            }
        } catch (error) {
            console.error(error);
            res.status(500).send({done: false, error: error?.message});
        }
    }
}