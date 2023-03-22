<template>
  <div class="mb-3 sticky !pb-4 top-0 z-50 bg-white">
    <ion-card
      class="bg-center m-0 max-w-md w-screen"
      :style="{ backgroundImage: `url(${bgCard})` }"
    >
      <ion-card-header class="">
        <ion-grid class="p-0">
          <ion-row class="ion-justify-content-between font-bold uppercase">
            <ion-col>
              <ion-text class="text-center flex items-center">
                <svg-icon
                  fill="gray"
                  :size="56"
                  type="mdi"
                  :path="mdiClockOutline"
                ></svg-icon>
                <h1 class="text-white font-bold text-lg">
                  {{ pendingCount }} Tareas
                </h1>
              </ion-text>
            </ion-col>
            <ion-col>
              <div class="flex items-center justify-center">
                <svg-icon
                  type="mdi"
                  fill="white"
                  :size="60"
                  :path="mdiSwapHorizontal"
                />
              </div>
            </ion-col>
            <ion-col>
              <ion-text class="text-center flex items-center">
                <h1 class="text-white font-bold text-lg">
                  {{ completeCount }} Tareas
                </h1>
                <svg-icon
                  fill="lightgreen"
                  :size="56"
                  type="mdi"
                  :path="mdiCheckCircleOutline"
                ></svg-icon>
              </ion-text>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-card-header>

      <ion-card-content class="bottom-4 relative h-full">
        <ion-text class="">
          <h3
            class="text-white !font-bold text-sm uppercase pb-2 flex justify-between"
          >
            <span>Progreso del período</span>
            <span>{{ (progress * 100 || 0).toFixed(2) }}%</span>
          </h3>
        </ion-text>
        <ion-progress-bar class="h-2" :value="progress"></ion-progress-bar>
      </ion-card-content>
    </ion-card>
  </div>
 
</template>

<script>
  import { defineComponent } from "vue";
  import {
    mdiClockOutline,
    mdiCheckCircleOutline,
    mdiSwapHorizontal,
  } from "@mdi/js";

  export default defineComponent({
    name: "CardMain",
    setup() {
      const bgCard = require("@/assets/bg-card.png");
      
      return {
        mdiClockOutline,
        mdiCheckCircleOutline,
        mdiSwapHorizontal,
        bgCard,
      
      };
    },
    props: {
      filterData: {
        type: Array,
        required: true,
      },
    },
    data() {
      return {
        data: null,
      };
    },
    components: {},
    computed: {
      dateTime() {
        return new Date().toLocaleString();
      },
      total() {
        return this.completeCount + this.pendingCount + this.canceledCount;
      },
      progress() {
        const progress = this.completeCount / this.total || 0;
        return progress.toFixed(2);
      },
      completeCount() {
        return (
          this.filterData.filter((d) => d.status == "completed").length || 0
        );
      },
      pendingCount() {
        return this.filterData.filter((d) => d.status == "pending").length || 0;
      },
      canceledCount() {
        return (
          this.filterData.filter((d) => d.status == "canceled").length || 0
        );
      },
    },
    methods: {},
  
    watch: {},
  });
</script>
