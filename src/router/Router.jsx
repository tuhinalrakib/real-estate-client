import React from 'react';
import { createBrowserRouter } from 'react-router';
import MainLayouts from '../Layouts/MainLayouts';
import Home from '../Pages/Home/Home';
import AuthLayouts from '../Layouts/AuthLayouts';
import Login from '../Pages/Authentication/Login';
import Register from '../Pages/Authentication/Register';

const Router = createBrowserRouter([
    {
        path : "/",
        element : <MainLayouts></MainLayouts>,
        children : [
            {
                index : true,
                Component : Home
            }
        ]
    },
    {
        path : "/",
        Component : AuthLayouts,
        children : [
            {
                path : "login",
                Component : Login
            },
            {
                path : "register",
                Component : Register
            }
        ]
    }
])

export default Router;