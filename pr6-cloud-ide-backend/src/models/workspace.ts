import mongoose from "mongoose";
import { IWorkspace } from "../types";

const WorkspaceSchema: mongoose.Schema<IWorkspace> = new mongoose.Schema<IWorkspace>({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user',
    },
    uptime: {
        type: Number,
        default: 0,
        min: 0
    }
})

export const Workspace = mongoose.model('workspace', WorkspaceSchema);