/**
 * @file index.ts
 * 
 * Initializes the Express server setup with routes and middleware.
 * 
 * @summary Server configuration for an Express app deployed with Serverless.
 * @author Anirudha Jadhav <anirudhasj441@gmail.com>
 */

import serverless from 'serverless-http';
import express from "express";
import dotenv from 'dotenv';
import { connectDB } from './middlewares';
import authRouter from './router/auth';
import router from './router';
import workspaceRouter from './router/workspace';

// Load environment variables from .env file
dotenv.config();

// Constants for MongoDB and JWT configurations
export const MONGODB_URI = process.env.MONGODB_URI;
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

// Initialize Express application
const app = express();

// Enable JSON request parsing
app.use(express.json());

// Connect to MongoDB using the defined middleware before handling routes
app.use(connectDB(MONGODB_URI));

// Set up main router for the root endpoint
app.use('/', router);

// Set up authentication routes under /auth
app.use('/auth', authRouter);

// Set up workspace routes under /workspace
app.use('/workspace', workspaceRouter);

// Define the handler for serverless deployment
export const handler = serverless(app);

export default app;