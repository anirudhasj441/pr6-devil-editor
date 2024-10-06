import serverless from 'serverless-http';
import express from "express";
import dotenv from 'dotenv';
import { connectDB } from './middlewares';
import authRouter from './router/auth';
import router from './router';

dotenv.config();

export const MONGODB_URI = process.env.MONGODB_URI;
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const app = express();

app.use(express.json());

app.use(connectDB(MONGODB_URI));

app.use('/', router)

app.use('/auth', authRouter);

export const handler = serverless(app);