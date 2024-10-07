export interface IUser {
    isLoggedIn: boolean;
    email: string;
    name: string;
    profile_pic?: string | undefined;
}

export interface IUserStore {
    user: IUser | undefined;
    getUser: () => IUser | undefined;
    setUser: (user: IUser) => void;
}
