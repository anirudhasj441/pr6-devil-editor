/**
 * @file controllers/auth/index.ts
 * 
 * Controllers for /auth routes.
 * 
 * @author Anirudha Jadhav<anirudhasj441@gmail.com>
 */

import { Request, Response } from "express"
import bcrypt from "bcrypt";
import { IUser } from "../../types";
import { User } from "../../models/user";
import { JWT_SECRET_KEY } from "../..";
import jwt from "jsonwebtoken";

/**
 * Handles the registering of the new user with given email, name and password
 * 
 * @param req - Express Request object
 * @param res - Express response object
 */
export const registerUser = async(req: Request, res: Response) => {
    // Get the user information from the request body.
    const data:IUser = req.body;

    // Generate the hash for the password.
    let password = await bcrypt.hash(data.password, 10);

    try {
        // Insert a new user entry in the database.
        const user = await User.create({
            email: data.email,
            name: data.name,
            password: password
        });


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
        // Log and send the error response in case of failure.
        console.error("error: ", err);
        res.send({
            error: err,
        }).status(500);
    }
}

/**
 * Handles the user authentication and send JWT token for authenticated user.
 * 
 * @param req - Express Request object
 * @param res - Express Response object
 */
export const loginUser = async (req: Request, res: Response) => {
    try {
        // Get the user information from the request body.
        let data = req.body;

        // Check the user is exists or not.
        let user = await User.findOne({
            email: data.email,
        });

        // If user not found with provided email, send error response.
        if (!user) {
            res.status(401).json({
                msg: "Invalid credentials",
            });
            return;
        }

        // Check the provided password with found user.
        let passwordMatch = await bcrypt.compare(data.password, user.password);

        // If password does not match send error response.
        if (!passwordMatch) {
            res.status(401).json({
                msg: "Invalid credentials",
            });
            return;
        }

        // Generate the JWT token for authenticated user and send token and user profile information in the response.
        const token = jwt.sign({ userId: user._id }, JWT_SECRET_KEY ?? "");
        res.status(200).json({
            token: token,
            user: user.toJSON()
        });

    } catch (err) {
        // Log and send the error response in case of failure.
        console.error("error: ", err);
        res.status(500).json({
            msg: "Login Failed" + String(err),
        });
    }
};