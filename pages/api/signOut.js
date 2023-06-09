import {setDeleteCookie} from "@/lib/cookies";
import {mAdmin} from "@/lib/magic";
import {verifyToken} from "@/lib/utils";

export default async function signOut (req, res){
    try {
        if (!req.cookies.token){
            return res.status(401).json({message: "User not logged in"});
        }
        const token = req.cookies.token;
        const userId = await verifyToken(token);
        setDeleteCookie(res);
        try {
            await mAdmin.users.logoutByIssuer(userId);
        } catch (error) {
            console.log("User's session with Magic already expired");
            console.error("Error occurred while logging out magic user", error);
        }
        //redirects user to login page
        res.writeHead(302, { Location: "/login" });
        res.end();
    } catch (error) {
        res.status(500).send({done:false})
    }
}