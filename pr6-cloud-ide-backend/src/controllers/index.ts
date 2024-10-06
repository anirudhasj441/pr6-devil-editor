import { Request, Response } from "express"
import { User } from "../models/user"

export const getUser = async (req: Request, res: Response) => {
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