import React, { memo } from "react";
import { Outlet } from "react-router-dom";
import DashboardLayout from "../../components/Header/DashboardHeader";

const MainLayout: React.FC = () => {
    return (
        <>
            <div className="h-svh w-svw">
                <DashboardLayout />
                <Outlet />
            </div>
        </>
    );
};

export default memo(MainLayout);
