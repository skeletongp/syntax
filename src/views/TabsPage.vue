<template>
  <ion-page>
    <ion-header slot="fixed">
  
      <ion-toolbar class="" v-if="$route.name=='home'">
        <ion-title slot="start" size="medium" class="flex" align="justify">
          <ion-img class="h-10 w-36" :src="logo"></ion-img>
        </ion-title>
        <ion-title slot="end" class="!px-0">
          <ion-button fill="clear" class="" id="trigger-menu">
            <svg-icon :path="mdiCogOutline" type="mdi"></svg-icon>
          </ion-button>
          <ion-popover trigger="trigger-menu" trigger-action="click">
            <ion-list>
              <ion-item
                :button="false"
                :detail="false"
                color="dark"
                class="uppercase font-bold text-center w-full overflow-hidden overflow-ellipsis whitespace-nowrap"
              >
                {{ $userStore.user?.name }}
              </ion-item>
              <ion-item :button="true" @click="logOut" :detail="false"
                >Cerrar Sesión</ion-item
              >
            </ion-list>
          </ion-popover>
        </ion-title>
      </ion-toolbar>
      <ion-tab-bar class="shadow-lg border pt-1">
        <ion-tab-button
          v-for="menu in menuItems"
          :key="menu.key"
          :tab="menu.key"
          :href="`/pages${menu.path}`"
        >
          <svg-icon
            :size="30"
            fill="gray"
            :path="menu.icon"
            type="mdi"
          ></svg-icon>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-header>
    <ion-content>
      <ion-tabs class="pt-4">
        <ion-router-outlet></ion-router-outlet>
      </ion-tabs>
    </ion-content>
  </ion-page>
</template>

<script>
  import { defineComponent } from "vue";
  import { mdiCogOutline } from "@mdi/js";
  import menuItems from "../vars/menu";
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
        this.$userStore.logout();
        this.$router.push("/auth/login");
      },
    },
  });
</script>
