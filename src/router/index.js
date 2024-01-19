import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { useAuthStore } from "../stores/auth";

const routes = [
  {
    path: "/",
    name: "home",
    redirect:{name:'user'}
  },
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
});

export default router;
