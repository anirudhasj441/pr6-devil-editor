import { getUserApi, googleSignInApi, signInApi, signUpApi } from "./api";
import { IUser } from "../types";
import { userStore } from "../stores/user";

class User {
    private _isLoggedIn: boolean;
    private _email: string;
    private _name: string;
    private _profilePic: string;

    public constructor() {
        this._isLoggedIn = false;
        this._email = "";
        this._name = "";
        this._profilePic = "";
    }

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

    public async signUp(email: string, name: string, password: string): Promise<IUser> {
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

    public set isLoggedIn(v: boolean) {
        this._isLoggedIn = v;
    }

    public set email(v: string) {
        this._email = v;
    }

    public set name(v: string) {
        this._name = v;
    }

    public set profilePic(v: string) {
        this._profilePic = v;
    }

    // getter functions
    public get email(): string {
        return this._email;
    }

    public get name(): string {
        return this._name;
    }

    public get isLoggeIn(): boolean {
        return this._isLoggedIn;
    }

    public get profilePic(): string {
        return this._profilePic;
    }
}

export default User;
