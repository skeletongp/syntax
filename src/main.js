import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { IonicVue } from "@ionic/vue";
import antd from "./boot/antd";
import components from "./boot/components";
import "./boot/database";
import "./theme/app.css";
import iniApp from "./boot/initial";
import { createPinia } from "pinia";
import {Plugins} from '@capacitor/core';

const { SplashScreen } = Plugins;

const app = createApp(App).use(IonicVue).use(router);
const pinia = createPinia();

app.use(pinia);
iniApp(app);
antd(app);
components(app);

SplashScreen.show();

router.isReady().then(() => {
  app.mount("#app");
});
