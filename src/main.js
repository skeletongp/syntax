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

/* tables.tables.forEach(table => {
  db.createTable(table.name,table.columns);
});
 */
const app = createApp(App).use(IonicVue).use(router);
const pinia = createPinia();

app.use(pinia);
iniApp(app);
antd(app);
components(app);

router.isReady().then(() => {
  app.mount("#app");
});
