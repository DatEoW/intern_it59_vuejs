import { defineStore } from "pinia";

export const useIsLoading = defineStore("isLoading", {
  state: () => ({
    isLoading: false,
  }),
  getters: {
    value: (state) => state.isLoading,
  },
  actions: {
    show() {
      this.isLoading = true;
     
    },
    hide() {
      this.isLoading = false;
    },
    
  },
});
