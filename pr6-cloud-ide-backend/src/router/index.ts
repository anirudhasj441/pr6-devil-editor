import express from "express";
import { getUser } from "../controllers";
import { jwtRequired } from "../middlewares";

const router:express.Router = express.Router();

router.route('/getuser').get(jwtRequired, getUser)

export default router