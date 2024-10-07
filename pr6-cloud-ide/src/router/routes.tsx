import { RouteObject } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRouted";
import { Suspense } from "react";
import { Typography } from "@mui/material";
import React from "react";

const IndexPage = React.lazy(() => import("../pages/Index"));
const LoginPage = React.lazy(() => import("../pages/Login"));
const SignUpPage = React.lazy(() => import("../pages/SignUp"));
const Workspace = React.lazy(() => import("../pages/Workspace"));

const routes: RouteObject[] = [
    {
        path: "/",
        element: (
            <ProtectedRoute>
                <Suspense fallback={<Typography>Loading...</Typography>}>
                    <IndexPage />
                </Suspense>
            </ProtectedRoute>
        ),
    },
    {
        path: "/signup",
        element: (
            <Suspense fallback={<Typography>Loading...</Typography>}>
                <SignUpPage />
            </Suspense>
        ),
    },
    {
        path: "/login",
        element: (
            <Suspense fallback={<Typography>Loading...</Typography>}>
                <LoginPage />
            </Suspense>
        ),
    },
    {
        path: "/workspace/",
        element: (
            <ProtectedRoute>
                <Suspense fallback={<Typography>Loading...</Typography>}>
                    <Workspace />
                </Suspense>
            </ProtectedRoute>
        ),
    },
];

export default routes;
