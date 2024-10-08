/**
 * @file controllers/auth/index.ts
 * 
 * Controllers for / routes.
 * 
 * @author Anirudha Jadhav<anirudhasj441@gmail.com>
 */

import { Request, Response } from "express"
import { User } from "../models/user"


/**
 * Fetch and send authenticate user infromation.
 * 
 * @param req - Express Request object
 * @param res Express Response object
 */
export const getUser = async (req: Request, res: Response) => {
    // Check the user exist with userId decode from JWT token.
    const user = req.user;

    // If user not found send error response.
    if(!user) {
        res.send({
            error: "Access denied"
        }).status(401);
        return;
    }

    // Send user information in response.
    res.send({
        user: user.toJSON()
    }).status(200)
} 