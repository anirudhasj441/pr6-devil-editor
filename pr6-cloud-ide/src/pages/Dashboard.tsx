import React, { useEffect, useMemo, useRef, useState } from "react";
import {
    DataGrid,
    GridActionsCellItem,
    GridCellParams,
    GridColDef,
    GridRowParams,
    useGridApiRef,
} from "@mui/x-data-grid";
import { Button, Chip, Paper, Typography } from "@mui/material";
import {
    Delete,
    PauseCircle,
    PlayArrow,
    PlayCircle,
} from "@mui/icons-material";
import { IWorkspaceGrid } from "../types";
import User from "../utils/User";
import Spacer from "../components/Spacer";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
    // const { getUser } = userStore();

    const mounted = useRef<boolean>(false);
    const workspaceTableRef = useGridApiRef();

    const navigate = useNavigate();

    const [rows, setRows] = useState([]);

    const updateRows = (workspaces: any) => {
        const rows = workspaces.map((workspace: any) => {
            const row = {
                id: workspace._id,
                name: workspace.name,
                status: workspace.status,
            };
            return row;
        });
        setRows(rows);
    };

    const handleDeleteWorkspace = async (id: string) => {
        const user = new User();

        const workspaces = await user.deleteWorkspace(id);

        console.log(workspaces);

        updateRows(workspaces);
    };

    const handleUpdateStatus = async (
        id: string,
        status: "running" | "stopped"
    ) => {
        const user = new User();

        const workspaces = await user.updateWorkspaceStatus(id, status);

        updateRows(workspaces);
    };

    const columns: GridColDef[] = useMemo(
        () => [
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
                        label={params.row.status.toUpperCase()}
                        color={
                            params.row.status === "running"
                                ? "success"
                                : "error"
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
                        onClick={(event) => {
                            event.stopPropagation();
                            navigate("/workspace");
                        }}
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
                        onClick={() =>
                            handleUpdateStatus(
                                params.row.id,
                                params.row.status == "running"
                                    ? "stopped"
                                    : "running"
                            )
                        }
                        showInMenu
                    />,
                    <GridActionsCellItem
                        icon={<Delete />}
                        label="Delete"
                        showInMenu
                        onClick={() => handleDeleteWorkspace(params.row.id)}
                    />,
                ],
            },
        ],
        []
    );

    useEffect(() => {
        if (mounted.current) return;
        const user = new User();

        const fetchWorkspaces = async () => {
            const workspaces = await user.getWorkspaces();

            updateRows(workspaces);
        };

        fetchWorkspaces();

        // setRows([{ id: 1, name: "demo", status: "running" }]);

        return () => {
            mounted.current = true;
        };
    }, []);

    return (
        <>
            <div className="flex justify-center py-5">
                <Paper elevation={0} sx={{ width: 800, maxWidth: "100%" }}>
                    <div className="w-full flex py-3">
                        <Typography variant="h4">WorkSpaces</Typography>
                        <Spacer />
                        <div className="flex items-end">
                            <Button
                                variant="contained"
                                color="success"
                                sx={{ paddingY: "0.25rem" }}
                            >
                                Create New
                            </Button>
                        </div>
                    </div>
                    <div>
                        <DataGrid
                            apiRef={workspaceTableRef}
                            rows={rows}
                            columns={columns}
                            hideFooter={true}
                        />
                    </div>
                </Paper>
            </div>
        </>
    );
};

export default Dashboard;
