export interface IUser {
    isLoggedIn: boolean;
    email: string;
    name: string;
    profile?: string | undefined;
}

export interface IUserStore {
    user: IUser | undefined;
    getUser: () => IUser | undefined;
    setUser: (user: IUser) => void;
}
