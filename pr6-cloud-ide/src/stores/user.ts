import { StoreApi, UseBoundStore, create } from "zustand";
import { IUser } from "../types";

interface IUserStore {
    user: IUser | undefined;
    getUser: () => IUser | undefined;
    setUser: (user: IUser) => void;
}

export const userStore: UseBoundStore<StoreApi<IUserStore>> =
    create<IUserStore>()((set) => ({
        user: undefined,
        setUser: (user: IUser) => set(() => ({ user: user })),
        getUser: () => userStore.getState().user,
    }));
