import mongoose from "mongoose"

export interface IUser {
    _id?:string,
    name: string,
    email: string,
    password: string,
    profile_pic?: string | null
}

export interface IWorkspace {
    _id?:string,
    name: string,
    owner: mongoose.Schema.Types.ObjectId,
    status: "running" | "stopped"
    uptime: number
}