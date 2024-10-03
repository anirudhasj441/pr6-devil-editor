import {
    List,
    ListItemButton,
    ListItemIcon,
    SwipeableDrawer,
} from "@mui/material";
import React, { memo, useCallback, useEffect, useState } from "react";
import FileExplorer from "../components/FileExplorer";
import SplitPane, { Pane } from "split-pane-react";
import "split-pane-react/esm/themes/default.css";
import IntegratedTerminal from "../components/Terminal";
import Editor from "../components/Editor";

import FileCopyTwoToneIcon from "@mui/icons-material/FileCopyOutlined";
import TerminalIcon from "@mui/icons-material/Terminal";
import EditorPlaceholder from "../components/Editor/EditorPlaceholder";

const Workspace: React.FC = () => {
    const [explorerState, setExplorerState] = useState(false);
    const [terminalState, setTerminalState] = useState(false);
    const [splitSizes, setSplitSizes] = useState([0, "auto"]);
    const [terminalSplitSizes, setTerminalSplitSizes] = useState(["auto", 0]);
    const [selectedFile, setSelectedFile] = useState<string>("");
    const [selectedFileRelativePath, setSelectedFileRelativePath] =
        useState<string>("");

    const toggleDrawer = (): void => {
        setSplitSizes([!explorerState ? 260 : 0, "auto"]);
        setExplorerState(!explorerState);
    };

    const toggleTerminalDrawer = useCallback(() => {
        setTerminalSplitSizes(["auto", !terminalState ? 260 : 0]);
        setTerminalState(!terminalState);
    }, [terminalState]);

    const onFileSelect = useCallback((path: string, relativePath: string) => {
        setSelectedFile(path);
        setSelectedFileRelativePath(relativePath);
    }, []);

    useEffect(() => {
        console.log("SPLIT: ", splitSizes);
        if (typeof splitSizes[0] === "number") {
            setExplorerState(splitSizes[0] > 0);
        }
        if (typeof terminalSplitSizes[1] === "number") {
            setTerminalState(terminalSplitSizes[1] > 0);
        }
        // return () => {};
    }, [splitSizes, terminalSplitSizes]);

    return (
        <>
            <div className="h-svh w-svw flex">
                <div className="z-[9999] h-full bg-[#272822]">
                    <List component="div" disablePadding>
                        <ListItemButton
                            selected={explorerState}
                            sx={{
                                "&.Mui-selected": {
                                    backgroundColor: "transparent",
                                    position: "relative",
                                    "&::before": {
                                        content: '""',
                                        position: "absolute",
                                        width: "0.15rem",
                                        height: "100%",
                                        top: 0,
                                        left: 0,
                                        backgroundColor: "white",
                                    },
                                },
                            }}
                            onClick={toggleDrawer}
                        >
                            <ListItemIcon style={{ minWidth: 0 }}>
                                <FileCopyTwoToneIcon
                                    fontSize="medium"
                                    style={{
                                        opacity: explorerState ? 1 : 0.65,
                                    }}
                                />
                            </ListItemIcon>
                        </ListItemButton>
                        <ListItemButton
                            selected={terminalState}
                            sx={{
                                "&.Mui-selected": {
                                    backgroundColor: "transparent",
                                    position: "relative",
                                    "&::before": {
                                        content: '""',
                                        position: "absolute",
                                        width: "0.15rem",
                                        height: "100%",
                                        top: 0,
                                        left: 0,
                                        backgroundColor: "white",
                                    },
                                },
                            }}
                            onClick={toggleTerminalDrawer}
                        >
                            <ListItemIcon style={{ minWidth: 0 }}>
                                <TerminalIcon
                                    fontSize="medium"
                                    style={{
                                        opacity: terminalState ? 1 : 0.65,
                                    }}
                                />
                            </ListItemIcon>
                        </ListItemButton>
                    </List>
                </div>
                <div className="flex-grow flex">
                    <SplitPane
                        split="vertical"
                        sizes={splitSizes}
                        onChange={setSplitSizes}
                        sashRender={() => null}
                        resizerSize={10}
                    >
                        <Pane minSize={0} maxSize="80%">
                            <SwipeableDrawer
                                anchor="left"
                                open={explorerState}
                                onOpen={() => setExplorerState(true)}
                                onClose={() => setExplorerState(false)}
                                variant="persistent"
                                sx={{
                                    // position: "absolute",
                                    // top: 0,
                                    // left: 0,
                                    width: splitSizes[0],
                                    height: "100%",
                                    // zIndex: 0,
                                    transition:
                                        "width 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
                                    overflowX: "hidden",
                                    textWrap: "nowrap",
                                    "& .MuiPaper-root": {
                                        backgroundColor: "#1a1a1aff",
                                        position: "relative",
                                        overflowX: "hidden",
                                        transition: "none",
                                    },
                                }}
                            >
                                <div className="bg-[#222218] px-3 py-2">
                                    <div className="text-[0.7rem]">
                                        EXPLORER
                                    </div>
                                </div>
                                <FileExplorer onFileSelect={onFileSelect} />
                            </SwipeableDrawer>
                        </Pane>
                        <div className=" flex-grow h-full flex flex-col">
                            <SplitPane
                                split="horizontal"
                                sizes={terminalSplitSizes}
                                onChange={setTerminalSplitSizes}
                                sashRender={() => null}
                            >
                                <div className="h-full">
                                    {selectedFile ? (
                                        <Editor
                                            file={selectedFile}
                                            relativePath={
                                                selectedFileRelativePath
                                            }
                                        />
                                    ) : (
                                        <EditorPlaceholder />
                                    )}
                                </div>
                                <Pane minSize={0} maxSize={"100%"}>
                                    {typeof terminalSplitSizes[1] ===
                                        "number" &&
                                        terminalSplitSizes[1] > 0 && (
                                            <IntegratedTerminal />
                                        )}
                                </Pane>
                            </SplitPane>
                        </div>
                    </SplitPane>
                </div>
            </div>
        </>
    );
};

export default memo(Workspace);
