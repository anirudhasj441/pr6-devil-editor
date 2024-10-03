import React, { useCallback } from "react";
import { useState, useEffect, useRef, memo } from "react";
import CodeEditor from "./utils/Editor";
import "./style/index.scss";
import workspaceSocket from "../../socket/workspace";
import SaveIcon from "@mui/icons-material/Save";
import { IconButton } from "@mui/material";

interface EditorProps {
    file: string;
    relativePath: string;
}

const Editor: React.FC<EditorProps> = (props: EditorProps) => {
    console.log("Editor rendering..");
    const [editor, setEditor] = useState<CodeEditor | undefined>(undefined);
    const [fileSaved, setFileSaved] = useState<boolean>(false);
    const editorRef = useRef(null);
    const fileContent = useRef<string | undefined>(undefined);
    const mounted = useRef<boolean>(false);

    const createEditor = () => {
        if (editor) return;

        if (!editorRef.current) return;

        const new_editor: CodeEditor = new CodeEditor(editorRef.current);
        return new_editor;
    };

    const fetchFileContent = useCallback(async (): Promise<
        string | undefined
    > => {
        if (!props.file || props.file === "") return;
        const url: string = import.meta.env.VITE_SERVER_URL + "/open_file";

        const res = await fetch(url, {
            method: "POST",
            headers: [["Content-Type", "Application/json"]],
            body: JSON.stringify({ filePath: props.file }),
        });
        const response = await res.json();
        // editor?.setText(response.content);
        return response.content;
    }, [props.file]);

    const save = () => {
        console.log(props.file);
        workspaceSocket.emit("file:save", props.file, editor?.getText());

        fileContent.current = editor?.getText();
        setFileSaved(true);
    };

    useEffect(() => {
        console.log("file: ", props.file);
        if (!props.file || props.file === "") return;
        fetchFileContent().then((content: string | undefined) => {
            if (content === undefined) return;
            fileContent.current = content;
            editor?.setText(content);
        });

        editor?.onSave(save);
        editor?.onTextChange(async (content) => {
            content;
            // const timer = setTimeout(async () => {

            setFileSaved(content === fileContent.current);
            // }, 1000);
        });
    }, [props.file, editor]);

    useEffect(() => {
        console.log(mounted.current);
        if (mounted.current) return;
        if (editorRef.current) {
            let new_editor = createEditor();
            setEditor(new_editor);
        }

        console.log("editorRef: ", editor);
        return () => {
            console.log("Unmounting... ");
            mounted.current = true;
            editor?.dispose();
        };
    }, []);

    return (
        <>
            <div id="editor" className="h-full w-full flex flex-col">
                <div className=" bg-[#272822] flex">
                    <div className="text-sm flex gap-2">
                        <span>
                            {props.relativePath &&
                                props.relativePath.split("/").join(" > ")}
                        </span>
                        {!fileSaved && (
                            <span className="opacity-[0.65]">unsaved</span>
                        )}
                    </div>
                    <div className="flex-grow text-right">
                        <IconButton onClick={save}>
                            <SaveIcon />
                        </IconButton>
                    </div>
                </div>
                <div className="flex-grow relative" ref={editorRef}></div>
            </div>
        </>
    );
};

export default memo(Editor);
