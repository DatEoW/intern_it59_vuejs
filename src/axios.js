import axios from "axios";
import CustomError from "./error/error";


const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/",
  withXSRFToken: true,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});


axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(new CustomError(error.response.data));
  }
);

export default axiosInstance;
