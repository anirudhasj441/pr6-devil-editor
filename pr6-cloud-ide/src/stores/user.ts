import { StoreApi, UseBoundStore, create } from "zustand";
import { IUser, IUserStore } from "../types";



export const userStore: UseBoundStore<StoreApi<IUserStore>> =
    create<IUserStore>()((set) => ({
        user: undefined,
        setUser: (user: IUser) => set(() => ({ user: user })),
        logout: () => set(() => ({user: undefined})),
        getUser: () => userStore.getState().user,
    }));
