import React, {
    SyntheticEvent,
    forwardRef,
    Ref,
    useState,
    useEffect,
    useRef,
    useCallback,
    memo,
} from "react";
import { RichTreeView } from "@mui/x-tree-view/RichTreeView";
import FolderRoundedIcon from "@mui/icons-material/FolderRounded";
import FolderOpenRoundedIcon from "@mui/icons-material/FolderOpenRounded";
import InsertDriveFileRoundedIcon from "@mui/icons-material/InsertDriveFileRounded";
import {
    TreeItem2Content,
    TreeItem2GroupTransition,
    // TreeItem2Icon,
    TreeItem2IconContainer,
    TreeItem2Label,
    TreeItem2Props,
    TreeItem2Provider,
    TreeItem2Root,
    useTreeViewApiRef,
} from "@mui/x-tree-view";
import { useTreeItem2 } from "@mui/x-tree-view/useTreeItem2/useTreeItem2";
import { Box } from "@mui/material";
import workspaceSocket from "../../socket/workspace";

interface ITreeNode {
    id: string;
    label: string;
    path: string;
    relativePath: string;
    type: "file" | "folder";
    children?: ITreeNode[];
}

interface FileExplorerProps {
    onFileSelect: (path: string, relativePath: string) => void;
}

const TreeNode = forwardRef(
    (props: TreeItem2Props, ref: Ref<HTMLLIElement> | undefined) => {
        const {
            id,
            itemId,
            label,
            disabled,
            children,
            ...other
        }: TreeItem2Props = props;

        const {
            getRootProps,
            getContentProps,
            getLabelProps,
            getGroupTransitionProps,
            getIconContainerProps,
            // status,
            publicAPI,
        } = useTreeItem2({
            id,
            itemId,
            children,
            label,
            disabled,
            rootRef: ref,
        });

        const node = publicAPI.getItem(itemId);

        return (
            <TreeItem2Provider itemId={itemId}>
                <TreeItem2Root
                    // @ts-ignore
                    {...getRootProps(other)}
                    // onClick={() => if())}
                >
                    <TreeItem2Content {...getContentProps()}>
                        <TreeItem2IconContainer {...getIconContainerProps()}>
                            {node.type == "folder" ? (
                                <FolderRoundedIcon />
                            ) : (
                                <InsertDriveFileRoundedIcon />
                            )}

                            {/* <TreeItem2Icon status={status} /> */}
                        </TreeItem2IconContainer>
                        <Box sx={{ flexGrow: 1, display: "flex", gap: 1 }}>
                            {/* <TreeItem2Checkbox {...getCheckboxProps()} /> */}
                            <TreeItem2Label {...getLabelProps()} />
                            {/* {node.type} */}
                        </Box>
                    </TreeItem2Content>
                    {children && (
                        <TreeItem2GroupTransition
                            {...getGroupTransitionProps()}
                        />
                    )}
                </TreeItem2Root>
            </TreeItem2Provider>
        );
    }
);

const FileExplorer: React.FC<FileExplorerProps> = (
    props: FileExplorerProps
) => {
    const mounted = useRef<boolean>(false);
    const [FileTree, setFileTree] = useState<ITreeNode[]>([]);
    const treeApiRef = useTreeViewApiRef();

    const onNodeSelect = (
        event: SyntheticEvent,
        itemId: string,
        isSelected: boolean
    ) => {
        event;
        const node: ITreeNode = treeApiRef.current?.getItem(itemId);
        if (node.type == "folder") return;
        if (!isSelected) return;
        console.log(node.type);
        props.onFileSelect(node.path, node.relativePath);
    };

    const fetchFileTree = useCallback(async () => {
        const url = import.meta.env.VITE_SERVER_URL + "/list_dir";
        const res = await fetch(url);
        const tree = await res.json();
        return tree.tree;
    }, []);

    useEffect(() => {
        workspaceSocket.on("files:refresh", async () => {
            const tree = await fetchFileTree();
            setFileTree(tree);
        });
        if (mounted.current) return;
        mounted.current = true;
        fetchFileTree().then(setFileTree);
        return () => {
            workspaceSocket.off("files:refresh");
        };
    }, []);

    return (
        <>
            <RichTreeView
                items={FileTree}
                slots={{
                    expandIcon: FolderRoundedIcon,
                    collapseIcon: FolderOpenRoundedIcon,
                    endIcon: InsertDriveFileRoundedIcon,
                    item: TreeNode,
                }}
                apiRef={treeApiRef}
                onItemSelectionToggle={onNodeSelect}
            />
        </>
    );
};

export default memo(FileExplorer);
