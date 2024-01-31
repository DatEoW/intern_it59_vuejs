import axios from "axios";
import CustomError from "./error/error";
import { useIsLoading } from "@/stores/loading";

const axiosInstance = axios.create({
  baseURL: "https://192.168.55.62/",
  withXSRFToken: true,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});
axiosInstance.interceptors.request.use(
  function (config) {
    const loadingOverlayStore = useIsLoading();
    loadingOverlayStore.show();
    return config;
  },
  function (error) {
    const loadingOverlayStore = useIsLoading();
    loadingOverlayStore.show();
    return Promise.reject(error);
  }
);
axiosInstance.interceptors.response.use(
  function (response) {
    const loadingOverlayStore = useIsLoading();
    loadingOverlayStore.hide();
    return response;
  },
  function (error) {
    const loadingOverlayStore = useIsLoading();
    loadingOverlayStore.hide();
    // nếu muốn lấy details error thì xài .details, tham khảo code bên error.js
    return Promise.reject(new CustomError(error.response.data));
  }
);

export default axiosInstance;
