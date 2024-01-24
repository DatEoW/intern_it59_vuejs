import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import "vue-loading-overlay/dist/css/index.css";
import App from "./App.vue";
import router from "./router";

import "./axios";

const app = createApp(App);
app.use(createPinia());
app.use(router);
// router.isReady().then(() => app.mount("#app"));
app.mount("#app");
