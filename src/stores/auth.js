import { defineStore } from "pinia";
import axiosInstance from "@/axios";
import { useIsLoading } from "./loading";
export const useAuthStore = defineStore("auth", {
  state: () => ({
    authUser: null,
    justLogIn:false,
  }),
  getters: {
    user: (state) => state.authUser !== null,
  },
  actions: {
    async login({ email, password,remember_me }) {
      const loadingOverlayStore = useIsLoading();
      loadingOverlayStore.show();
    
      const response = await axiosInstance.post(`api/login`, {
        email: email,
        password: password,
        remember_me:remember_me
      });
      loadingOverlayStore.hide();
      localStorage.setItem("token", response.data.token);
      this.justLogIn=true;
    },
    async getToken() {
      await axiosInstance.get("sanctum/csrf-cookie");
    },
    async getUser() {
      const loadingOverlayStore = useIsLoading();
      loadingOverlayStore.show();
      try {
        if (localStorage.getItem("token") !== null) {
          const data = await axiosInstance.get("/api/userDetails");
          this.authUser = data.data;
        } else {
          this.authUser = null;
        }
      } catch (error) {
        this.authUser = null;
      }
      loadingOverlayStore.hide();
    },
    async logout() {
      const loadingOverlayStore = useIsLoading();
      loadingOverlayStore.show();
      await axiosInstance.post(`api/logout`);
      this.authUser = null;
      localStorage.removeItem("token");
      loadingOverlayStore.hide();
    },
  },
});
