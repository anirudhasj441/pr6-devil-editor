import { Request, Response } from "express"
import bcrypt from "bcrypt";
import { IUser } from "../../types";
import { User } from "../../models/user";
import { JWT_SECRET_KEY } from "../..";
import jwt from "jsonwebtoken";

/**
 * 
 * @param req 
 * @param res 
 */
export const registerUser = async(req: Request, res: Response) => {
    const data:IUser = req.body;

    let password = await bcrypt.hash(data.password, 10);

    try {
        const result = User.create({
            email: data.email,
            name: data.name,
            password: password
        });
        res.send({
            msg: "user created successfully",
        }).status(201);

    } catch(err) {
        console.error("error: ", err);
        res.send({
            error: err,
        }).status(500);
    }
}

/**
 * 
 * @param req 
 * @param res 
 * @returns 
 */
export const loginUser = async (req: Request, res: Response) => {
    try {
        let data = req.body;
        let user: IUser | null = await User.findOne({
            email: data.email,
        });
        if (!user) {
            res.status(401).json({
                msg: "Invalid credentials",
            });
            return;
        }

        let passwordMatch = await bcrypt.compare(data.password, user.password);
        if (!passwordMatch) {
            res.status(401).json({
                msg: "Invalid credentials",
            });
        }
        const token = jwt.sign({ userId: user._id }, JWT_SECRET_KEY ?? "");
        res.status(200).json({
            token: token,
        });
    } catch (error) {
        res.status(500).json({
            msg: "Login Failed" + String(error),
        });
    }
};