import axios from 'axios';
import React from 'react';
// import useAuth from './useAuth';
// import { useNavigate } from 'react-router';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_url,
    // withCredentials : true
})

const useAxiosSecure = () => {
    // const { logoutUser } = useAuth()
    // const navigate = useNavigate()

    // axiosInstance.interceptors.request.use(config => {
    //     config.headers.Authorization = `Bearer ${user.accessToken}`
    //     return config;
    // }, error => {
    //     return Promise.reject(error);
    // })

//     axiosInstance.interceptors.response.use(res => {
//         return res;
//     }, error => {
//         const status = error.status;
//         if (status === 403) {
//             navigate('/forbidden');
//         }
//         else if (status === 401) {
//             logoutUser()
//                 .then(() => {
//                     navigate('/login')
//                 })
//                 .catch(() => { })
//         }

//         return Promise.reject(error);
//     })

    return axiosInstance
};

export default useAxiosSecure;