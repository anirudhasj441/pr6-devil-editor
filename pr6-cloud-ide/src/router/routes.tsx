import { RouteObject } from "react-router-dom";
import Workspace from "../pages/Workspace";
import IndexPage from "../pages/Index";
import SignUpPage from "../pages/SignUp";

const routes: RouteObject[] = [
    {
        path: "/",
        element: <IndexPage />,
    },
    {
        path: "/signup",
        element: <SignUpPage />,
    },
    {
        path: "/workspace/",
        element: <Workspace />,
    },
];

export default routes;
