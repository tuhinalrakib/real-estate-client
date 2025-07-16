import React from 'react';
import { createBrowserRouter } from 'react-router';
import MainLayouts from '../Layouts/MainLayouts';
import Home from '../Pages/Home/Home';
import AuthLayouts from '../Layouts/AuthLayouts';
import Login from '../Pages/Authentication/Login';
import Register from '../Pages/Authentication/Register';
import PrivateRoute from '../routes/PrivateRoute';
import DashboardLayouts from '../Layouts/DashboardLayouts';
import Profile from '../Pages/Dashboard/User/Profile';
import ManageUsers from '../Pages/Dashboard/Admin/ManageUsers';
import AdminProfile from '../Pages/Dashboard/Admin/AdminProfile';
import AgentProfile from '../Pages/Dashboard/Agent/AgentProfile';
import AddProperty from '../Pages/Dashboard/Agent/AddProperty';
import MyProperties from '../Pages/Dashboard/Agent/MyProperties';
import AllProperties from '../Pages/Properties/AllProperties';
import ManageProperties from '../Pages/Dashboard/Admin/ManageProperties';
import PropertyDetails from '../Pages/Properties/PropertyDetails';
import ManageReviews from '../Pages/Dashboard/Admin/ManageReviews';
import Wishlist from '../Pages/Dashboard/User/Wishlist';
import NotFound from '../Pages/NotFound';

const Router = createBrowserRouter([
    {
        path : "/",
        element : <MainLayouts></MainLayouts>,
        children : [
            {
                index : true,
                Component : Home
            },
            {
                path : "allProperties",
                element : <PrivateRoute>
                    <AllProperties></AllProperties>
                </PrivateRoute>
            },
            {
                path : "property/:id",
                element : <PrivateRoute>
                    <PropertyDetails></PropertyDetails>
                </PrivateRoute>
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
    ,{
        path : "dashboard",
        element : <PrivateRoute>
            <DashboardLayouts></DashboardLayouts>
        </PrivateRoute>,
        children : [
            {
                path : "user/profile",
                Component : Profile
            },
            {
                path : "Wishlist",
                Component : Wishlist
            },
            {
                path : "admin/makeAdmin",
                Component : ManageUsers
            },
            {
                path : "admin/profile",
                Component : AdminProfile
            },
            {
                path : "admin/managementProperties",
                Component : ManageProperties
            },
            {
                path : "admin/manageReviews",
                Component : ManageReviews
            },
            {
                path : "agent/profile",
                Component : AgentProfile
            },
            {
                path : "agent/addProperty",
                Component : AddProperty
            },
            {
                path : "agent/myProperties",
                Component : MyProperties
            }
        ]
    },
    {
        path : "*",
        Component : NotFound
    }
])

export default Router;