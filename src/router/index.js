import { createRouter, createWebHistory } from "vue-router";

import { useAuthStore } from "@/stores/auth";
import { useIsLoading } from "@/stores/loading";

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/user",
    name: "user",
    component: () => import("../views/User.vue"),
  },
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
let isAuthorized = false;

router.beforeEach(async (to, from, next) => {
  const loadingOverlayStore = useIsLoading();
  loadingOverlayStore.show();
  const authStore = useAuthStore();

  await authStore.getUser().then(() => {
    if (authStore.user) {
      isAuthorized = true;
    } else {
      isAuthorized = false;
    }
    if (isAuthorized && to.name === "login") {
      next({ name: "user" });
    } else if (!isAuthorized && to.name !== "login") {
      next({ name: "login" });
    } else {
      next();
    }
  });
  loadingOverlayStore.hide();
});

export default router;
