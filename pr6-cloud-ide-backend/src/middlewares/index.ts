import connectMongoDB from "../utils/connection";

import { NextFunction, Request, Response } from "express";

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

