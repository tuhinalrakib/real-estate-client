import axios from 'axios';
import React from 'react';
import useAuth from './useAuth';

const axiosInstance = axios.create({
    baseURL : import.meta.env.VITE_url,
    // withCredentials : true
})

const useAxiosSecure = () => {
    // const { logoutUser } = useAuth()
    
    // intercept response
//     axiosInstance.interceptors.response.use(response=>{
//         return response
//     },error=>{
//         if(error.status === 401 || error.status === 403){
//             logoutUser()
//             .then(()=>{
//                 console.log("Logged out due to unauthorized access")
//             })
//             .catch(e=>{
//                 console.log("Logout error:",e)
//             })
//         }
//         return Promise.reject(error)
//     }
// )

    return axiosInstance
};

export default useAxiosSecure;