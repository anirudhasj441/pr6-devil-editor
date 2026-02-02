import mongoose from "mongoose";
import { IUser } from "../types";

const UserSchema:mongoose.Schema<IUser> = new mongoose.Schema<IUser>({
    email: {
        type: String,
        unique: true,
        require: true
    },
    name: String,
    password: {
        type: String
    },
    profile_pic: String
})

export const User: mongoose.Model<IUser> = mongoose.model('user', UserSchema);