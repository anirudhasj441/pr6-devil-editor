import { Terminal } from "@xterm/xterm";
import React, { memo, useEffect, useRef } from "react";
import workspaceSocket from "../../socket/workspace";
import { FitAddon } from "@xterm/addon-fit";

import "@xterm/xterm/css/xterm.css";
import "./style/index.scss";

const IntegratedTerminal: React.FC = () => {
    const terminalRef = useRef<HTMLDivElement>(null);
    const mounted = useRef<boolean>(false);
    const terminal = useRef<Terminal | undefined>(undefined);
    const fitAddon = useRef<FitAddon>(new FitAddon());

    useEffect(() => {
        console.log("mounted: ", mounted.current);
        workspaceSocket.on("terminal:data", (data: string) => {
            console.log("term: ", data);
            terminal.current?.write(data);
        });
        if (mounted.current) return;
        if (!terminal.current)
            terminal.current = new Terminal({
                allowTransparency: true,
            });
        if (terminalRef.current) terminal.current.open(terminalRef.current);

        terminal.current.loadAddon(fitAddon.current);
        console.log("emitting...");
        workspaceSocket.emit("terminal:write", "\n");

        terminal.current.onData((data: string) => {
            workspaceSocket.emit("terminal:write", data);
        });

        terminal.current.onResize((evt) => {
            console.log(evt.cols, ": ", evt.rows);
            workspaceSocket.emit("terminal:resize", evt.cols, evt.rows);
        });

        terminal.current.onRender((event) => {
            event;
            fitAddon.current.fit();
        });

        return () => {
            mounted.current = true;
            console.log("unmount terminal..");
            workspaceSocket.off("terminal:data");
        };
    }, []);

    return (
        <>
            <div
                id="terminal"
                ref={terminalRef}
                className="h-full w-full px-2"
                onResize={(e) => {
                    console.log("terminal resize: ", e);
                }}
            ></div>
        </>
    );
};

export default memo(IntegratedTerminal);
