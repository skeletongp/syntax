<template>
  <ion-page>
    <ion-header slot="fixed">
      <ion-toolbar>
       
        <ion-title size="medium" class="" align="justify">
          <h1 class="font-bold uppercase text-sky-600 text-xl">Syntax</h1>
        </ion-title>

        <ion-title slot="end" class="!px-0">
          <ion-button fill="clear" class="" id="trigger-menu">
            <svg-icon :path="mdiCogOutline" type="mdi"></svg-icon>
          </ion-button>
          <ion-popover trigger="trigger-menu" trigger-action="click" ref="prof-popover">
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
      <NavBar />
    </ion-header>

    <ion-content>
      <ion-nav :root="home"></ion-nav>
      <ion-tabs class="">
        <ion-router-outlet :key="$route.fullpath"></ion-router-outlet>
      </ion-tabs>
    </ion-content>
  </ion-page>
</template>

<script>
  import { defineComponent } from "vue";
  import { mdiCogOutline } from "@mdi/js";

  import HomePage from "@/views/HomePage.vue";
  export default defineComponent({
    name: "TabsPage",

    setup() {
      const logo = require("@/assets/logo_complete.png");
      return {
        mdiCogOutline,
        logo,
        home: HomePage,
      };
    },

    methods: {
      logOut() {
        this.$userStore.logout();
        this.$router.push("/auth/login");
      },
      ionViewWillLeave() {
        this.$refs["prof-popover"].$el.dismiss();
      },
    },
  });
</script>
