import axios from 'axios';
import React from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_url,
})

const useAxiosSecure = () => {
    const { logoutUser } = useAuth()
    const navigate = useNavigate()

    axiosInstance.interceptors.request.use(config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

    axiosInstance.interceptors.response.use(res => {
        return res;
    }, error => {
        const status = error.status;
        if (status === 401 || status === 403) {
            logoutUser()
                .then(() => {
                    navigate('/login')
                })
                .catch(() => { })
        }

        return Promise.reject(error);
    })

    return axiosInstance
};

export default useAxiosSecure;