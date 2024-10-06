// import { userStore } from "../stores/user";
import { signInApi, signUpApi } from "./api";

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

    public async login(email: string, password: string) {
        const result = await signInApi(email, password);

        if (!result) {
            console.log("login failed!!");
            return;
        }

        sessionStorage.setItem("token", result.token);

        // const { setUser } = userStore();
    }

    public async signUp(email: string, name: string, password: string) {
        const result = await signUpApi(email, name, password);

        if (!result) {
            console.log("signup failed!!");
            return;
        }
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
