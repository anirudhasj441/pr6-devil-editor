import { StoreApi, UseBoundStore, create } from "zustand";
import { IUser, IUserStore } from "../types";



export const userStore: UseBoundStore<StoreApi<IUserStore>> =
    create<IUserStore>()((set) => ({
        user: undefined,
        setUser: (user: IUser) => set(() => ({ user: user })),
        getUser: () => userStore.getState().user,
    }));
