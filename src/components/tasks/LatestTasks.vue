<template>
<div class="flex flex-col space-y-1">
  <div>
    <h1 class="px-3 mt-3 uppercase font-bold text-gray-600">
      Próxima tarea a vencer
    </h1>
    <ion-item
      v-if="nextTask"
      :router-link="`/pages/detail/${nextTask.id}`"
      router-direction="foward"
      class="items-center"
    >
      <ion-avatar slot="start">
        <svg-icon
          type="mdi"
          :path="nextTask.icon"
          :fill="nextTask.fill"
          :size="30"
        ></svg-icon>
      </ion-avatar>
      <ion-label>
        <h2>{{ nextTask.title }}</h2>
        <h3>{{ nextTask.due_date }}</h3>
      </ion-label>
      <ion-label slot="end">
        <div class="flex items-center">
          <svg-icon
            v-for="n in nextTask.priority"
            :key="n"
            type="mdi"
            :size="18"
            :path="mdiStar"
            fill="#F9C806"
          ></svg-icon>
        </div>
      </ion-label>
    </ion-item>
    <div v-else class="flex bg-gray-100 justify-center h-24 items-center">
      <ion-note mode="ios" class="mx-auto">Sin Resultados</ion-note>
    </div>
  </div>
  <div>
    <h1 class="px-3 mt-3 uppercase font-bold text-gray-600">
      Última realizada
    </h1>
    <ion-item
      v-if="lastDone"
      :router-link="`/pages/detail/${lastDone.id}`"
      router-direction="foward"
      class="items-center"
    >
      <ion-avatar slot="start">
        <svg-icon
          type="mdi"
          :path="lastDone.icon"
          :fill="lastDone.fill"
          :size="30"
        ></svg-icon>
      </ion-avatar>
      <ion-label>
        <h2>{{ lastDone.title }}</h2>
        <h3>{{ lastDone.due_date }}</h3>
      </ion-label>
      <ion-label slot="end">
        <div class="flex items-center">
          <svg-icon
            v-for="n in lastDone.priority"
            :key="n"
            type="mdi"
            :size="18"
            :path="mdiStar"
            fill="#F9C806"
          ></svg-icon>
        </div>
      </ion-label>
    </ion-item>
    <div v-else class="flex bg-gray-100 justify-center h-24 items-center">
      <ion-note mode="ios" class="mx-auto">Sin Resultados</ion-note>
    </div>
  </div>
</div>
</template>

<script>
  import { defineComponent } from "vue";
  import { mdiStar } from "@mdi/js";

  export default defineComponent({
    name: "LatestTasks",
    props: {
      nextTask: {
        type: Object,
        default: null,
      },

      lastDone: {
        type: Object,
        default: null,
      },
    },
    setup(props) {
      return {
        mdiStar,
      };
    },
  });
</script>
