import React from 'react';
import useAuth from '../Hooks/useAuth';

const PrivateRoute = () => {
    const {user} = useAuth()
    return (
        <div>
            
        </div>
    );
};

export default PrivateRoute;