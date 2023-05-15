import {mAdmin} from "@/lib/magic";
import jwt from 'jsonwebtoken';
import {isNewUser} from "@/lib/db/hasura";

export default async function login(req, res){
    try {
        const auth = req.headers.authorization;
        const didToken = auth ? auth.substring(7) : '';

        const metaData = await mAdmin.users.getMetadataByToken(didToken);

        const token = jwt.sign({
            ...metaData,
            iat: Math.floor(Date.now() /1000),
            exp: Math.floor(Date.now() /1000 + 7 * 24 * 60 * 60),
            "https://hasura.io/jwt/claims": {
                "x-hasura-allowed-roles": ["user", "admin"],
                "x-hasura-default-role": "user",
                "x-hasura-user-id": `${metaData.issuer}`,
            }
        }, process.env.JWT_SECRET);

        const isNewUserQuery = await isNewUser(token, metaData.issuer);
        res.send({done: true, isNewUserQuery});
    }
    catch (error){
        console.log(error)
        res.status(500).send({done:false})
    }
}