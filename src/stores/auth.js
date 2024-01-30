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
    async login({ email, password, remember_me }) {
      const response = await axiosInstance.post(`api/login`, {
        email: email,
        password: password,
        remember_me: remember_me,
      });
      localStorage.setItem("token",response.data.token);
    },
    async getUser() {
      try {
        const data = await axiosInstance.get("/api/me");
        this.authUser = data.data;
      } catch (error) {
        this.authUser = null;
      }
    },
    async logout() {
      await axiosInstance.post(`api/logout`);
    },
  },
});
