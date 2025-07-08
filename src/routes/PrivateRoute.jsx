import React, { Children } from 'react';
import { Navigate, useLocation } from 'react-router';
import useAuth from '../Hooks/useAuth';
import Loader from '../components/Loader/Loader';

const PrivateRoute = ({children}) => {
    const {user , loading} = useAuth()
    const location = useLocation()
    
    if(loading){
        return <Loader></Loader>
    }
    
    if(!user){
        return <Navigate to="/login" state={location.pathname}></Navigate>
    }
    return children
};

export default PrivateRoute;