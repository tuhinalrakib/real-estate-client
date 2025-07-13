import React from 'react';
import useAuth from './useAuth';
import { useQuery } from "@tanstack/react-query"
import useAxiosSecure from './useAxiosSecure';

const useUserRole = () => {
    const { user, loading } = useAuth(); 
    const axiosSecure = useAxiosSecure();

    const email = user?.email;

    const { data: role = "user" } = useQuery({
        queryKey: ['role', email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?email=${email}`);
            return res.data?.role || "user";
        },
        enabled: !!email && !loading // Only run query when ready
    });

    return role;
};

export default useUserRole;
