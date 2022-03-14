import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import OktaVue from "@okta/okta-vue";
import { oktaAuth } from "./okta";
import "./assets/tailwind.css";
import axios from "axios";

let app = createApp(App);
app.use(router);
app.use(OktaVue, {
  oktaAuth,
  onAuthRequired: () => {
    router.push("/login");
  },
  onAuthResume: () => {
    router.push("/login");
  },
});
app.config.globalProperties.$axios = axios;

app.mount("#app");
