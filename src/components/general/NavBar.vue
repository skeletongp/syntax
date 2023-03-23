<template>
  <ion-tab-bar class="shadow-lg border pt-1 flex justify-around">
    <ion-nav-link mode="ios" v-for="menu in menuItems" :key="menu.key">
      <ion-button
        mode="ios"
        :router-link="`/pages${menu.path}`"
        router-direction="foward"
        fill="clear"
        :class="$route.path==`/pages${menu.path}`?'border-b-2 border-sky-500':''"
      >
        <svg-icon :size="30" :fill="$route.path==`/pages${menu.path}`?'#00B1FF':'gray'" :path="menu.icon" type="mdi" />
      </ion-button>
    
    </ion-nav-link>
  </ion-tab-bar>
</template>

<script>
  import { defineComponent } from "vue";
  import { mdiCogOutline } from "@mdi/js";
  import menuItems from "@/vars/menu.js";

  export default defineComponent({
    name: "TabsPage",

    setup() {
      const logo = require("@/assets/logo_complete.png");
      return {
        menuItems,
        mdiCogOutline,
        logo,
      };
    },

    methods: {
      logOut() {
        this.$userStore.logOut();
      },
    },
  });
</script>
