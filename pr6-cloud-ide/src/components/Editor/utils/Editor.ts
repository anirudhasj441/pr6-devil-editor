import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import monokai_theme from "../editor-theme/monokai.json?url";

export default class CodeEditor {
    private _editor: monaco.editor.IStandaloneCodeEditor | null = null;
    private _editorModel: monaco.editor.IModel | null = null;

    constructor(container: HTMLDivElement | null) {
        console.log("monokai_theme: ", monokai_theme);
        if (!container) return;
        if (this._editor !== null) return;
        this._editor = monaco.editor.create(container, {
            language: "typescript",
            theme: "vs-dark",
            automaticLayout: true,
            scrollbar: {
                useShadows: false,
            },
        });

        this._editorModel = monaco.editor.createModel("", "typescript");
        this._editor.setModel(this._editorModel);

        this.setTheme();
    }

    public setTheme = async (): Promise<void> => {
        const res = await fetch(monokai_theme);
        const themeData = await res.json();

        monaco.editor.defineTheme("monokai", themeData);

        monaco.editor.setTheme("monokai");
    };

    public onTextChange = (callback: (content: string | undefined) => void) => {
        console.log("setting...");
        this._editorModel?.onDidChangeContent(() => {
            console.log("changed!!");
            callback(this.getText());
        });
    };

    public onSave = (callback: () => void) => {
        this._editor?.addCommand(
            monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS,
            callback
        );
    };

    public setText = (text: string): void => {
        this._editorModel?.setValue(text);
    };

    public getText = (): string | undefined => {
        return this._editorModel?.getValue();
    };

    public dispose = (): void => {
        this._editor?.dispose();
    };

    public get editor(): monaco.editor.IStandaloneCodeEditor | null {
        return this._editor;
    }
}
