import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_url}`,
})

const useAxios = () => {
    return axiosInstance;
};

export default useAxios;