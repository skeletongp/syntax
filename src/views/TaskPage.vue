<template>
  <ion-page>
    
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tareas</ion-title>
        </ion-toolbar>
      </ion-header>
    </ion-content>
  </ion-page>
</template>

<script>
  import { defineComponent } from "vue";

  export default defineComponent({
    name: "TaskPage",
    setup() {
      return {};
    },
  });
</script>