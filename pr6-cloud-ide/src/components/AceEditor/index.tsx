import React from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";

const AceEditorComp: React.FC = () => {
    return (
        <>
            <AceEditor
                mode="javascript"
                theme="monokai"
                name="ace-editor"
                height="100%"
                width="100%"
                fontSize={17}
            />
        </>
    );
};

export default AceEditorComp;
