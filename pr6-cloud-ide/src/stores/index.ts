import {StoreApi, UseBoundStore, create} from "zustand";
import CodeEditor from "../components/Editor/utils/Editor";

interface IEditorStore {
    codeEditor: CodeEditor | undefined
    setCodeEditor: (editor: CodeEditor) => void
    getCodeEditor: () => CodeEditor | undefined
}

type CounterState = {
    count: number;
};

type CounterAction = {
    increment: () => void;
    decrement: () => void;
};

export const counterStore = create<CounterState & CounterAction>((set) => ({
    count: 0,
    increment: () => {
        if (counterStore.getState().count >= 10) return;
        set((state) => ({ count: state.count + 1 }));
    },
    decrement: () => {
        if (counterStore.getState().count <= 0) return;
        set((state) => ({ count: state.count - 1 }));
    },
}));

export const editorStore: UseBoundStore<StoreApi<IEditorStore>> = create<IEditorStore>()((set) => ({
    codeEditor: undefined,
    setCodeEditor: (editor: CodeEditor) => set(() => ({codeEditor: editor})),
    getCodeEditor: () => editorStore.getState().codeEditor

}))