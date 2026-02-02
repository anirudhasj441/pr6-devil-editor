/**
 * @file middlewares/index.ts
 * 
 * Defining middlewares.
 * 
 * @author Anirudha Jadhav<anirudhasj441@gmail.com>
 */

import connectMongoDB from "../utils/connection";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { JWT_SECRET_KEY } from "..";
import { User } from "../models/user";
import { IUser } from "../types";
import { QueryOptions } from "mongoose";

/**
 * Middleware to establish a connection to MongoDB.
 * 
 * @param uri - MongoDB server/cluster URI
 * @returns an Express middleware function that connects to the database
 */
export const connectDB = (uri: string | undefined) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Ensure the given uri is not empty.
            if(!uri) throw new Error("INVALID URI");

            // Connect to MongoDB using the provided URI.
            await connectMongoDB(uri);
        } catch(err) {
            // Log connection error.
            console.error("DB connect failed:", err);
        }
        next();
    };
};

/**
 * Middleware to enforce JWT-based authentication.
 * 
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Next function to pass control to the next middleware
 * @returns the authenticated user's ID is assigned to req.userId if JWT is valid
 */
export const jwtRequired = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Extract the token from the 'Authorization' header
        const token = req.header('Authorization')?.split(' ')[1];

        // If no token is provided, deny access with a 401 status
        if(!token){
            res.send({
                error: "Access Denied"
            }).status(401);
            return;
        }

        // Verify the token and cast the decoded payload as a JWT payload
        const decode:jwt.JwtPayload = jwt.verify(token, JWT_SECRET_KEY ?? "") as jwt.JwtPayload;

        // Ensure the token contains a 'userId'; if missing, deny access
        if(!('userId' in decode)) {
            res.send({
                error: "Access Denied"
            }).status(401);
            return;
        }

        const user: Omit<IUser, 'password'> | null = await User.findById(decode.userId).select(['-password']);

        if(!user) {
            res.send({
                error: "Access Denied"
            }).status(401);
            return;
        }

        // Attach the user ID to the request object for downstream use
        req.user = user;

        // Proceed for the route
        next();

    } catch(err) {
        // Log and send the error response in case of failure.
        console.error("error: ", err);
        res.send({
            error: err
        }).status(500);

    }
}

