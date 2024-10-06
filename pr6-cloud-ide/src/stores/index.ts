import { StoreApi, UseBoundStore, create } from "zustand";
import CodeEditor from "../components/Editor/utils/Editor";

interface IEditorStore {
    codeEditor: CodeEditor | undefined;
    setCodeEditor: (editor: CodeEditor) => void;
    getCodeEditor: () => CodeEditor | undefined;
}

export const editorStore: UseBoundStore<StoreApi<IEditorStore>> =
    create<IEditorStore>()((set) => ({
        codeEditor: undefined,
        setCodeEditor: (editor: CodeEditor) =>
            set(() => ({ codeEditor: editor })),
        getCodeEditor: () => editorStore.getState().codeEditor,
    }));
