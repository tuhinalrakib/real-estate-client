import React from 'react';
import { useQuery } from "@tanstack/react-query";
import useAuth from './useAuth';
// import useAxiosSecure from './useAxiosSecure';
import useAxios from './useAxios';

const useUserRole = () => {
    const { user } = useAuth();
    // const axiosSecure = useAxiosSecure();
    const axiosInstance = useAxios()

    const email = user?.email;

    const { data: role = "user" } = useQuery({
        queryKey: ['role', email],
        queryFn: async () => {
            const res = await axiosInstance.get(`/users?email=${email}`);
            return res.data?.role || "user";
        },
        enabled: !!email  // Only run query when ready
    });

    return role
};

export default useUserRole;
