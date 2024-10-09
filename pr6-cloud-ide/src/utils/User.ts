import {
    deleteWorkspaceApi,
    getUserApi,
    getWorkspacesApi,
    googleSignInApi,
    signInApi,
    signUpApi,
    updateWorkspaceStatusApi,
} from "./api";
import { IUser } from "../types";
import { userStore } from "../stores/user";

class User {
    public constructor() {}

    public async login(email: string, password: string): Promise<IUser> {
        const result = await signInApi(email, password);

        if (!result) {
            console.log("login failed!!");
            throw new Error("Login Failed");
        }

        const user: IUser = result.user;

        userStore.getState().setUser({
            isLoggedIn: true,
            email: user.email,
            name: user.name,
            profile_pic: user.profile_pic,
        });

        sessionStorage.setItem("token", result.token);

        return user;
    }

    public async googleLogin(code: string): Promise<IUser> {
        const result = await googleSignInApi(code);

        if (!result) {
            console.log("login failed!!");
            throw new Error("Invalid credentials");
        }

        const user: IUser = result.user;

        sessionStorage.setItem("token", result.token);

        userStore.getState().setUser({
            isLoggedIn: true,
            email: user.email,
            name: user.name,
            profile_pic: user.profile_pic,
        });

        return user;
    }

    public async signUp(
        email: string,
        name: string,
        password: string
    ): Promise<IUser> {
        const result = await signUpApi(email, name, password);

        if (!result) {
            console.log("login failed!!");
            throw new Error("Invalid credentials");
        }

        const user: IUser = result.user;

        userStore.getState().setUser({
            isLoggedIn: true,
            email: user.email,
            name: user.name,
            profile_pic: user.profile_pic,
        });

        sessionStorage.setItem("token", result.token);

        return user;
    }

    public logout() {
        userStore.getState().logout();

        sessionStorage.removeItem("token");
    }

    public async isUserAuthenticated(): Promise<boolean> {
        const token = sessionStorage.getItem("token");
        if (!token) {
            return false;
        }

        if (userStore.getState().getUser()?.isLoggedIn) {
            return true;
        }

        const user: IUser = await getUserApi(token);

        userStore.getState().setUser({
            isLoggedIn: true,
            email: user.email,
            name: user.name,
            profile_pic: user.profile_pic,
        });

        return true;
    }

    public async getWorkspaces(): Promise<any> {
        const token = sessionStorage.getItem("token");

        if (!token) {
            console.log("login failed!!");
            userStore.getState().logout();
            throw new Error("User not logged in");
        }

        const result = await getWorkspacesApi(token, undefined);

        return result;
    }

    public async deleteWorkspace(id: string): Promise<any> {
        const token = sessionStorage.getItem("token");

        if (!token) {
            console.log("login failed!!");
            userStore.getState().logout();
            throw new Error("User not logged in");
        }

        const result = await deleteWorkspaceApi(token, id);

        return result.workspaces;
    }

    public async updateWorkspaceStatus(
        id: string,
        status: "running" | "stopped"
    ): Promise<any> {
        const token = sessionStorage.getItem("token");

        if (!token) {
            console.log("login failed!!");
            userStore.getState().logout();
            throw new Error("User not logged in");
        }

        const result = await updateWorkspaceStatusApi(token, id, status);

        return result.workspaces;
    }
}

export default User;
