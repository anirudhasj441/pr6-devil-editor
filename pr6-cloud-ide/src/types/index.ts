export interface IUser {
    isLoggedIn: boolean;
    email: string;
    name: string;
    profile?: string | undefined;
}
