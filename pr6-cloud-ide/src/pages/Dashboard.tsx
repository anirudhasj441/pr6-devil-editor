import React, { useEffect, useMemo, useRef, useState } from "react";
import {
    DataGrid,
    GridActionsCellItem,
    GridCellParams,
    GridColDef,
    GridRowParams,
} from "@mui/x-data-grid";
import { Button, Chip, Paper } from "@mui/material";
import {
    Delete,
    PauseCircle,
    PlayArrow,
    PlayCircle,
} from "@mui/icons-material";
import { IWorkspaceGrid } from "../types";
import User from "../utils/User";

const Dashboard: React.FC = () => {
    // const { getUser } = userStore();

    const mounted = useRef<boolean>(false);

    const [rows, setRows] = useState([]);

    const columns: GridColDef[] = useMemo(() => [
        {
            field: "name",
            headerName: "Name",
            flex: 1,
        },
        {
            field: "status",
            headerName: "Status",
            renderCell: (params: GridCellParams<IWorkspaceGrid>) => (
                <Chip
                    label={params.row.status}
                    color={
                        params.row.status === "running" ? "success" : "error"
                    } // Green for "running", red for "stopped"
                    variant="outlined"
                />
            ),
        },
        {
            field: "actions",
            type: "actions",
            getActions: (params: GridRowParams<IWorkspaceGrid>) => [
                <GridActionsCellItem
                    icon={<PlayArrow />}
                    label="Launch"
                    showInMenu
                />,
                <GridActionsCellItem
                    icon={
                        params.row.status == "running" ? (
                            <PauseCircle />
                        ) : (
                            <PlayCircle />
                        )
                    }
                    label={params.row.status == "running" ? "Stop" : "Run"}
                    showInMenu
                />,
                <GridActionsCellItem
                    icon={<Delete />}
                    label="Delete"
                    showInMenu
                />,
            ],
        },
    ], [])

    useEffect(() => {
        if(mounted.current) return;
        const user = new User()

        const fetchWorkspaces = async() => {
            const workspaces = await user.getWorkspaces();

            const rows = workspaces.map((workspace: any) => ({
                id: workspace._id,
                name: workspace.name,
                status: workspace.status,
            }));

            setRows(rows);
        }

        fetchWorkspaces();

        return () => {
            mounted.current = true;
        }
    }, [])

    return (
        <>
            <div className="flex justify-center py-5">
                <Paper elevation={0} sx={{ width: 800, maxWidth: "100%" }}>
                    <div className="w-full text-end py-3">
                    <Button variant="contained" color="success" sx={{paddingY: '0.25rem'}}>Create</Button>
                    </div>
                    <DataGrid rows={rows} columns={columns} hideFooter={true} />
                </Paper>
            </div>
        </>
    );
};

export default Dashboard;
