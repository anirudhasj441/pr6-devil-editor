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
    // Fetch the userId from the request, userId append to Request object by jwtRequired middleware after verifying jwt token.
    if(!req.userId) {
        res.send({
            error: "Access denied"
        }).status(401);
        return
    }

    const user = await User.findById(req.userId).select(['email', 'name', 'profile_pic']);

    if(!user) {
        res.send({
            error: "Access denied"
        }).status(401);
        return;
    }

    res.send({
        user: user.toJSON()
    }).status(200)
} 