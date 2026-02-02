import express from 'express';
import { createWorkspace, deleteWorkspace, getWorkspace, updateWorkspace } from '../controllers/workspace';
import { jwtRequired } from '../middlewares';


const workspaceRouter = express.Router();

workspaceRouter.route('')
.post(jwtRequired, createWorkspace)
.get(jwtRequired, getWorkspace)
.delete(jwtRequired, deleteWorkspace)
.patch(jwtRequired, updateWorkspace)


export default workspaceRouter;