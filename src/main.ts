import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { VueQueryPlugin } from "@tanstack/vue-query";
import i18n from "./i18n";

const app = createApp(App);

app.use(router);
app.use(vuetify);
app.use(VueQueryPlugin);
app.use(i18n);

app.mount("#app");
