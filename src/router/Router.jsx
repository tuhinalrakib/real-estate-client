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
import Offers from '../Pages/Dashboard/Agent/Offers';
import BoughtProperties from '../Pages/Dashboard/User/BoughtProperties';
import Payment from '../Pages/Dashboard/User/Payment/Payment';
import MyReviews from '../Pages/Dashboard/User/MyReviews';
import SoldProperties from '../Pages/Dashboard/Agent/SoldProperties';
import AdvertiseProperty from '../Pages/Dashboard/Admin/AdvertiseProperty';
import About from '../Pages/Shared/About';
import Contact from '../Pages/Shared/Contact';

const Router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayouts></MainLayouts>,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: "about",
                Component: About
            },
            {
                path : "contact",
                Component : Contact
            },
            {
                path: "allProperties",
                element: <PrivateRoute>
                    <AllProperties></AllProperties>
                </PrivateRoute>
            },
            {
                path: "property/:id",
                element: <PrivateRoute>
                    <PropertyDetails></PropertyDetails>
                </PrivateRoute>
            }
        ]
    },
    {
        path: "/",
        Component: AuthLayouts,
        children: [
            {
                path: "login",
                Component: Login
            },
            {
                path: "register",
                Component: Register
            }
        ]
    }
    , {
        path: "dashboard",
        element: <PrivateRoute>
            <DashboardLayouts></DashboardLayouts>
        </PrivateRoute>,
        children: [
            {
                path: "user/profile",
                Component: Profile
            },
            {
                path: "user/wishlist",
                Component: Wishlist
            },
            {
                path: "user/bought",
                Component: BoughtProperties
            },
            {
                path: "user/payment/:id",
                Component: Payment
            },
            {
                path: "user/myReviews",
                Component: MyReviews
            },
            {
                path: "admin/makeAdmin",
                Component: ManageUsers
            },
            {
                path: "admin/profile",
                Component: AdminProfile
            },
            {
                path: "admin/managementProperties",
                Component: ManageProperties
            },
            {
                path: "admin/manageReviews",
                Component: ManageReviews
            },
            {
                path: "admin/advertise",
                Component: AdvertiseProperty
            },
            {
                path: "agent/profile",
                Component: AgentProfile
            },
            {
                path: "agent/addProperty",
                Component: AddProperty
            },
            {
                path: "agent/myProperties",
                Component: MyProperties
            },
            {
                path: "agent/soldProperties",
                Component: SoldProperties
            },
            {
                path: "agent/requests",
                Component: Offers
            }
        ]
    },
    {
        path: "*",
        Component: NotFound
    }
])

export default Router;