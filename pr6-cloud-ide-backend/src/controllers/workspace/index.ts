import { Request, Response } from "express";
import { Workspace } from "../../models/workspace";
import { IUser, IWorkspace } from "../../types";
import { QueryOptions } from "mongoose";

export const createWorkspace = async (req: Request, res: Response) => {
    const user: QueryOptions<IUser> = req.user;

    const data = req.body;

    try {
        const workspace = await Workspace.create({
            name: data.name,
            owner: user._id,
            uptime: 0,
        });

        const workspaces = await Workspace.find({owner: user._id}).select("-owner")

        res.send({
            msg: "workspace created successfully",
            workspace: workspace.toJSON(),
            workspaces: workspaces
        });
    } catch (err) {
        // Log and send the error response in case of failure.
        console.error("error: ", err);
        res.send({
            error: err,
        }).status(500);
    }
};

export const getWorkspace = async (req: Request, res: Response) => {
    const user: QueryOptions<IUser> = req.user;

    try {
        const workspaces: IWorkspace[] = await Workspace.find({
            owner: user._id,
        }).select("-owner");

        res.send({
            workspaces: workspaces,
        });
    } catch (err) {
        // Log and send the error response in case of failure.
        console.error("error: ", err);
        res.send({
            error: err,
        }).status(500);
    }
};

export const deleteWorkspace = async (req: Request, res: Response) => {
    const user: QueryOptions<IUser> = req.user;

    const data = req.body;

    console.log(data);

    const workspace = await Workspace.findOne({
        _id: data.id,
        owner: user._id,
    }).deleteOne();

    const workspaces = await Workspace.find({ owner: user._id }).select(
        "-owner"
    );

    res.send({
        msg: "workspace deleted!",
        workspace: workspace,
        workspaces: workspaces,
    });
};

export const updateWorkspace = async(req: Request, res: Response) => {
    const user: QueryOptions<IUser> = req.user;

    const data = req.body;

    const workspace = await Workspace.findOneAndUpdate({
        _id: data.id,
        owner: user._id,
    }, {status: data.status});

    const workspaces = await Workspace.find({ owner: user._id }).select(
        "-owner"
    );

    res.send({
        msg: "workspace updated!",
        workspace: workspace,
        workspaces: workspaces,
    }).status(201)
}
