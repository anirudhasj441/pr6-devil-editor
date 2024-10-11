import { RouteObject } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRouted";
import { Suspense } from "react";
import React from "react";
import Loading from "../components/Loading";

const IndexPage = React.lazy(() => import("../pages/Index"));
const LoginPage = React.lazy(() => import("../pages/Login"));
const SignUpPage = React.lazy(() => import("../pages/SignUp"));
const Workspace = React.lazy(() => import("../pages/Workspace"));
const Dashboard = React.lazy(() => import("../pages/Dashboard"));
const DashboardLayout = React.lazy(() => import("../Layout/DashboardLayout"));

const routes: RouteObject[] = [
    {
        path: "/",
        element: (
            <Suspense fallback={<Loading />}>
                <IndexPage />
            </Suspense>
        ),
    },
    {
        path: "dashboard",
        element: (
            <ProtectedRoute>
                <Suspense fallback={<Loading />}>
                    <DashboardLayout />
                </Suspense>
            </ProtectedRoute>
        ),
        children: [
            {
                path: "",
                element: (
                    <Suspense fallback={<Loading />}>
                        <Dashboard />
                    </Suspense>
                ),
            },
        ],
    },
    {
        path: "/signup",
        element: (
            <Suspense fallback={<Loading />}>
                <SignUpPage />
            </Suspense>
        ),
    },
    {
        path: "/login",
        element: (
            <Suspense fallback={<Loading />}>
                <LoginPage />
            </Suspense>
        ),
    },
    {
        path: "/workspace/",
        element: (
            <ProtectedRoute>
                <Suspense fallback={<Loading />}>
                    <Workspace />
                </Suspense>
            </ProtectedRoute>
        ),
    },
];

export default routes;
