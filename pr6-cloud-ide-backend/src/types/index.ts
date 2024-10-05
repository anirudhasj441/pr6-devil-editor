export interface IUser {
    _id?:string,
    name: string,
    email: string,
    password: string,
    profile_pic?: string | null
}