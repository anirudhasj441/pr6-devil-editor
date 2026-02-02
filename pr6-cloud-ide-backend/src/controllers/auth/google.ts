/**
 * @file controllers/auth/google.ts
 * 
 * controller for /auth/google route.
 * 
 * @author Anirudha Jadhav<anirudhasj441@gmail.com>
 */

import { Request, Response } from "express"
import oauth2Client from "../../utils/googleConfig";
import { User } from "../../models/user";
import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from "../..";
import { IUser } from "../../types";

/**
 * Handles Google OAuth2 login, authenticating a user and returning a JWT token
 * 
 * @param req - Express Request object
 * @param res - Express Response object
 */
export const googleLogin = async (req: Request, res: Response) => {
    try {
        // Retrieve authorization code from the query parameters.
        const {code} = req.query;
        if(!code) throw new Error("INVALID CODE");

        // Exchange authorization code for access token and set it in the OAuth2 client.
        const googleResponse = await oauth2Client.getToken(String(code));
        oauth2Client.setCredentials(googleResponse.tokens)

        // Fetch user information from Google API using access token.
        const api_url = `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleResponse.tokens.access_token}`
        const apiRes = await fetch(api_url);
        const response = await apiRes.json();

        // Check if user already exists in database.
        let user:IUser | null = await User.findOne({email: response.email});

        // If user does not exists, create a new user with the google data.
        if(!user) {
            user = await User.create({
                email: response.email,
                name: response.name,
                profile_pic: response.picture
            })
        }

        // Generate a JWT token from authenticated user.
        const token = jwt.sign({userId: user._id}, JWT_SECRET_KEY ?? "");

        // Send the JWT token and user profile information in the response.
        res.send({
            token: token,
            user: {
                email: user.email,
                name: user.name,
                profile_pic: user.profile_pic
            }
        }).status(200)

    } catch(err) {
        // Log and send error response in case of failure.
        console.error("error: ", err)
        res.send({
            error: err
        }).status(500)
    }
}