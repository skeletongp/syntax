<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-card
        class="bg-center m-0 max-w-md w-screen"
        :style="{ backgroundImage: `url(${bgCard})` }"
      >
        <ion-card-header class="">
          <ion-grid class="p-0 space-y-8">
            <ion-row class="ion-justify-content-between font-bold uppercase">
              <ion-col>
                <ion-text class="text-center flex items-center">
                  <svg-icon
                    fill="#F2F2F2"
                    :size="56"
                    type="mdi"
                    :path="mdiClockOutline"
                  ></svg-icon>
                  <h1 class="text-white font-bold text-lg">{{ pending }} Pend.</h1>
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
                  <h1 class="text-white font-bold text-lg">{{ completed }} Compl.</h1>
                  <svg-icon
                    fill="lightgreen"
                    :size="56"
                    type="mdi"
                    :path="mdiCheckCircleOutline"
                  ></svg-icon>
                </ion-text>
              </ion-col>
            </ion-row>
            <ion-row class="ion-justify-content-between font-bold uppercase">
              <ion-col>
                <ion-text class="text-center flex items-center">
                  <svg-icon
                    fill="#BE7663"
                    :size="56"
                    type="mdi"
                    :path="mdiCancel"
                  ></svg-icon>
                  <h1 class="text-white font-bold text-lg">{{ canceled }} Canc.</h1>
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
                  <h1 class="text-white font-bold text-lg w-12">{{ deleted }} Elim.</h1>
                  <svg-icon
                    fill="#FF9999"
                    :size="56"
                    type="mdi"
                    :path="mdiTrashCanOutline"
                  ></svg-icon>
                </ion-text>
              </ion-col>
            </ion-row>
          </ion-grid>
        </ion-card-header>
      </ion-card>
    <a-divider style="height: 2px; background-color: #EEE; margin:10px 0 10px 0" />
    <h1 class="text-center uppercase font-bold text-gray-600 my-3">Estadísticas Generales</h1>
      <ChartBar v-if="data" :options="options" :data="data"/>
    </ion-content>
  </ion-page>
</template>

<script>
  import { defineComponent } from "vue";
  import Task from "@/orm/models/Task";
  import {
    mdiClockOutline,
    mdiCheckCircleOutline,
    mdiSwapHorizontal,
    mdiCancel,
    mdiTrashCanOutline
  } from "@mdi/js";
  export default defineComponent({
    name: "TaskStats",
    setup() {
      const bgCard = require("@/assets/bg-card.png");
      const options = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: false,
          },
          
        },
      };
      return {
        mdiClockOutline,
        mdiCheckCircleOutline,
        mdiSwapHorizontal,
        mdiCancel,
        mdiTrashCanOutline,
        bgCard,
        options,
      };
    },
    data: () => ({
      completed: 0,
      pending: 0,
      canceled: 0,
      deleted: 0,
      data:null
    }),
    methods: {
      async ionViewWillEnter() {
        await this.getStats();
        const data = {
          labels: ["Comp.", "Pend.", "Canc.", "Elim."],
          datasets: [
            {
              backgroundColor: ["#4CAF50", "#FF9800", "#F44336", '#F87979'],
              data: [this.completed, this.pending, this.canceled, this.deleted],
              fill: false,
            },
          ],
        };
        this.data=data;
        this.$forceUpdate();
      },

      async getStats() {
        const completed = await new Task(window.db)
          .where("status", "completed")
          .count();
        this.completed = completed;

        const pending = await new Task(window.db)
          .where("status", "pending")
          .count();
        this.pending = pending;

        const canceled = await new Task(window.db)
          .where("status", "canceled")
          .count();
        this.canceled = canceled;

        const deleted = await new Task(window.db)
          .onlyTrashed()
          .count();
        this.deleted = deleted;
      },
    },
  });
</script>
