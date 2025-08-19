import axios from 'axios';
import React from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_url,
    withCredentials : true
})

const useAxiosSecure = () => {
    const { logoutUser } = useAuth()
    const navigate = useNavigate()

    axiosInstance.interceptors.request.use(
    (config) => {
      // Cookies are automatically attached by the browser
      return config;
    },
    (error) => Promise.reject(error)
  );

     axiosInstance.interceptors.response.use(
    (res) => res,
    (error) => {
      const status = error?.response?.status;
      if (status === 401 || status === 403) {
        logoutUser()
          .then(() => {
            navigate("/login");
          })
          .catch(() => {});
      }
      return Promise.reject(error);
    }
  );

    return axiosInstance
};

export default useAxiosSecure;