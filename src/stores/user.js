import { defineStore } from "pinia";
import axiosInstance from "@/axios";

export const useUserStore = defineStore("user", {
  state: () => ({
    listUser: null,
  }),
  getters: {
    user: (state) => state.listUser,
  },
  actions: {
    async getAllUser({
      page = 1,
      perPage = 10,
      name = "",
      email = "",
      group_role = 3,
      is_active = 1,
    }) {
      const data = await axiosInstance.get(
        `/api/user?page=${page}&perPage=${perPage}&name=${name}&email=${email}&group_role=${group_role}&is_active=${is_active}`
      );
      this.listUser = data.data;
    },
  },
});
