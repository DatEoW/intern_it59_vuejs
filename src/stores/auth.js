import { defineStore } from "pinia";
import axiosInstance from "@/axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    authUser: null,
  }),
  getters: {
    user: (state) => state.authUser !== null,
  },
  actions: {
    async login({ email, password }) {
      const response = await axiosInstance.post(`api/login`, {
        email: email,
        password: password,
      });
      localStorage.setItem("token", response.data.token);
    },
    async getToken() {
      await axiosInstance.get("sanctum/csrf-cookie");
    },
    async getUser() {
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
    },
    async logout() {
      await axiosInstance.post(`api/logout`);
      this.authUser = null;
      localStorage.removeItem("token");
    },
  },
});
