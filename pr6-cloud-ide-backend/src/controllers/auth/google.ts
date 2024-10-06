import { Request, Response } from "express"
import oauth2Client from "../../utils/googleConfig";
import { User } from "../../models/user";
import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from "../..";
import { IUser } from "../../types";

export const googleLogin = async (req: Request, res: Response) => {
    try {
        const {code} = req.query;
        if(!code) throw new Error("INVALID CODE");
        console.log(code);
        const googleResponse = await oauth2Client.getToken(String(code));
        oauth2Client.setCredentials(googleResponse.tokens)

        const api_url = `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleResponse.tokens.access_token}`
        const apiRes = await fetch(api_url);
        const response = await apiRes.json();

        let user:IUser | null = await User.findOne({email: response.email});

        if(!user) {
            user = await User.create({
                email: response.email,
                name: response.name,
                profile_pic: response.picture
            })
        }

        const token = jwt.sign({userId: user._id}, JWT_SECRET_KEY ?? "");
        res.send({
            token: token
        }).status(200)

    } catch(err) {
        console.error("error: ", err)
        res.send({
            error: err
        }).status(500)
    }
}