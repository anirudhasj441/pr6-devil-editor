import React, { memo } from "react";

const Spacer: React.FC = () => {
    return (
        <>
            <div className="flex-grow"></div>
        </>
    );
};

export default memo(Spacer);
