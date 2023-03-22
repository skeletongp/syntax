<template>
  <ion-app>
    <ion-router-outlet id="main-content"></ion-router-outlet>
  </ion-app>
</template>

<script>
  import { IonApp, IonRouterOutlet } from "@ionic/vue";
  import Task from "@/orm/models/Task";
  import { defineComponent } from "vue";
  import { Plugins } from "@capacitor/core";
  const {SplashScreen} = Plugins;
  export default defineComponent({
    name: "AppVue",

    components: {
      IonApp,
      IonRouterOutlet,
    },

    async mounted() {
     
      
    },
  });
</script>
