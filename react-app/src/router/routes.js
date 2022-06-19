import {Navigate} from "react-router";
import AuthenticationService from "../services/Authentication.service";
import {LoginPage, CallsPage, CallDetailPage} from "../pages";
import {NotFoundPage} from "../global/pages";
import AppLayout from "../layouts/App.layout";
import React from "react";

const getRoutes = (state) => {
    return [
        {
            path: "*",
            element: <NotFoundPage/>,
        },
        {
            path: "/login",
            element: state || AuthenticationService.getToken() ? <Navigate to="/calls" replace/> : <LoginPage/>,
        },
        {
            path: "/calls",
            element: <AppLayout/> ,
            children: [
                {
                    path: "",
                    element: <CallsPage/>,
                },
                {
                    path: "/calls/detail/:id",
                    element: <CallDetailPage/>,
                },
            ]
        },
    ];
};

export default getRoutes;
