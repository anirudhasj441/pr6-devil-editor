import connectMongoDB from "../utils/connection";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { JWT_SECRET_KEY } from "..";

export const connectDB = (uri: string | undefined) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            if(!uri) throw new Error("INVALID URI");
            await connectMongoDB(uri);
        } catch(err) {
            console.error("DB connect failed:", err);
        }
        next();
    };
};

export const jwtRequired = (req: Request, res: Response, next: NextFunction) => {
    try {
        
        const token = req.header('Authorization')?.split(' ')[1];

        if(!token){
            res.send({
                error: "Access Denied"
            }).status(401);
            return;
        }

        const decode:jwt.JwtPayload = jwt.verify(token, JWT_SECRET_KEY ?? "") as jwt.JwtPayload;
        if(!('userId' in decode)) {
            res.send({
                error: "Access Denied"
            }).status(401);
        }
        req.userId = decode.userId;
        next();

    } catch(err) {
        res.send({
            error: err
        }).status(500);

    }
}

