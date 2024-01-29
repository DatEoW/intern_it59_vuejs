import { defineStore } from "pinia";
import axiosInstance from "@/axios";


export const useUserStore = defineStore("user", {
  state: () => ({
    listUser: null,
    detailUser: {
      name: "",
      email: "email",
      group_role: 3,
      is_active: "",
    },
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
      is_active = "",
    }) {
      const data = await axiosInstance.get(
        `/api/user?page=${page}&perPage=${perPage}&name=${name}&email=${email}&group_role=${group_role}&is_active=${is_active}`
      );

      this.listUser = data.data;
    },
    async searchNameUser(name = "") {
      const data = await axiosInstance.get(`/api/user?name=${name}`);
      this.listUser = data.data;
    },
    async getUser(id) {
      const data = await axiosInstance.get(`/api/user/${id}/edit`);

      this.detailUser = data.data;
    },
    async createUser({ name, email, group_role, password }) {
      await axiosInstance.post("api/user", {
        name: name,
        email: email,
        group_role: group_role,
        password: password,
      });
    },
    async updateUser({ name, email, group_role, password, is_active, id }) {
      await axiosInstance.patch(`api/user/${id}`, {
        name: name,
        email: email,
        group_role: group_role,
        password: password,
        is_active: is_active,
        id: id,
      });
    },
    async changeUser({ id, phuongThuc }) {
      await axiosInstance.post(
        `api/changeUser/?id=${id}&phuongThuc=${phuongThuc}`
      );
    },
  },
});
