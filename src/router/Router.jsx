import React from 'react';
import { createBrowserRouter } from 'react-router';
import MainLayouts from '../Layouts/MainLayouts';
import Home from '../Pages/Home/Home';

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
    }
])

export default Router;