import { defineStore } from "pinia";
import axiosInstance from "@/axios";
import { useIsLoading } from "./loading";

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
      const loadingOverlayStore = useIsLoading();
      loadingOverlayStore.show();
      const data = await axiosInstance.get(
        `/api/user?page=${page}&perPage=${perPage}&name=${name}&email=${email}&group_role=${group_role}&is_active=${is_active}`
      );
      loadingOverlayStore.hide();
      this.listUser = data.data;
    },
    async searchNameUser(name = "") {
      const data = await axiosInstance.get(`/api/user?name=${name}`);
      this.listUser = data.data;
    },
    async getUser(id) {
      const loadingOverlayStore = useIsLoading();
      loadingOverlayStore.show();
      const data = await axiosInstance.get(`/api/user/${id}/edit`);
      loadingOverlayStore.hide();
      this.detailUser = data.data;
    },
    async createUser({ name, email, group_role, password }) {
      const loadingOverlayStore = useIsLoading();
      loadingOverlayStore.show();
      await axiosInstance.post("api/user", {
        name: name,
        email: email,
        group_role: group_role,
        password: password,
      });
      loadingOverlayStore.hide();
    },
    async updateUser({ name, email, group_role, password, is_active, id }) {
      const loadingOverlayStore = useIsLoading();
      loadingOverlayStore.show();
      await axiosInstance.patch(`api/user/${id}`, {
        name: name,
        email: email,
        group_role: group_role,
        password: password,
        is_active: is_active,
        id: id,
      });
      loadingOverlayStore.hide();
    },
    async changeUser({ id, phuongThuc }) {
      const loadingOverlayStore = useIsLoading();
      loadingOverlayStore.show();
      await axiosInstance.post(
        `api/changeUser/?id=${id}&phuongThuc=${phuongThuc}`
      );
      loadingOverlayStore.hide();
    },
  },
});
