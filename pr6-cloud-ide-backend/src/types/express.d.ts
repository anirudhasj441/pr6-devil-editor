import express from 'express';
import { IUser } from '.';
import { QueryOptions } from 'mongoose';

declare global {
  namespace Express {
    export interface Request {
      user: QueryOptions<IUser>;
    }
  }
}