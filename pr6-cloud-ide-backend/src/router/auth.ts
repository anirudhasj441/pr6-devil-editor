import express from "express";
import { registerUser, loginUser } from "../controllers/auth";
import { googleLogin } from "../controllers/auth/google";

const authRouter = express.Router();

authRouter.route("/register").post(registerUser);

authRouter.route("/login").post(loginUser);
authRouter.route("/google").get(googleLogin);
export default authRouter;