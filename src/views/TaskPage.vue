<template>
  <ion-page>
    <ion-header>
      <ion-toolbar class="ion-padding-top">
        <ion-searchbar
          slot="start"
          placeholder="Buscar tarea"
          @change="onSearch"
          @ion-clear="onClear"
          v-model="searchText"
        ></ion-searchbar>
      </ion-toolbar>
    </ion-header>
    <ion-content class="" :fullscreen="true">
      <ion-list v-if="tasks.length > 0">
        <ion-item
          v-for="(task, index) in tasks"
          :key="index"
          :router-link="`/pages/detail/${task.id}`"
          router-direction="foward"
          @click="onTaskClick(task)"
        >
          <ion-avatar slot="start">
            <svg-icon
              type="mdi"
              :size="40"
              :path="getTaskStatusIcon(task.status).icon"
              :fill="getTaskStatusIcon(task.status).fill"
            ></svg-icon>
          </ion-avatar>
          <ion-label>
            <h2>{{ task.title }}</h2>
            <h3>{{ getFormatedDate(task.due_date) }}</h3>
          </ion-label>
          <ion-label slot="end">
            <div class="flex items-center">
              <svg-icon
                v-for="n in task.priority"
                :key="n"
                type="mdi"
                :size="18"
                :path="mdiStar"
                fill="#F9C806"
              ></svg-icon>
            </div>
          </ion-label>
        </ion-item>
        <ion-infinite-scroll ref="infiniteScroll" @ionInfinite="onScrollEnd">
      <ion-infinite-scroll-content></ion-infinite-scroll-content>
    </ion-infinite-scroll>
      </ion-list>
      <div v-else class="flex bg-gray-100 justify-center h-24 items-center">
        <ion-note mode="ios" class="mx-auto">Sin Resultados</ion-note>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
  import { defineComponent } from "vue";
  import moment from "moment";
  import {
    mdiStar,
    mdiClockAlertOutline,
    mdiCalendarCheckOutline,
    mdiClockStart,
    mdiCheckCircle,
    mdiClockOutline,
    mdiCloseCircle
  } from "@mdi/js";
  import TaskController from "@/controllers/TaskController";

  export default defineComponent({
    name: "TaskPage",
    setup() {
      return {
        mdiStar,
      };
    },
    data() {
      return {
        tasks: [],
        searchText: "",
        statusFilter: null,
        params: {
          paginate: {
            page: 1,
            per_page: 25,
          },
          orderBy:["due_date","asc"],
          where: null,
        },
      };
    },

    methods: {
      getTaskStatusIcon(status) {
        switch (status) {
          case "pending":
            return {
              icon: mdiClockOutline,
              fill: "#F9C806",
            };
          case "completed":
            return {
              icon: mdiCheckCircle,
              fill: "#2DD36F",
            };
          case "canceled":
            return {
              icon:mdiCloseCircle,
              fill: "#EB445A",
            };
        }
      },
      getFormatedDate(date) {
        return new Date(date).toLocaleDateString("es-ES", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      },
      onTaskClick(task) {
        this.searchText = "";
      },
      onSearch() {
        this.params.search = [this.searchText];
        this.tasks = [];
        this.params.paginate.page = 1;
        this.getTasks();
      },
      onClear() {
        this.$store.dispatch("tasks/searchTasks", "");
      },
      async ionViewWillEnter() {
        await this.getTasks();
      },
      async onScrollEnd() {
        this.params.paginate.page++;
        await this.getTasks();
        this.$refs.infiniteScroll.$el.complete();
      },
      async getTasks() {
        const result = await new TaskController().index(this.params);
        console.log(result);
        if (result.code == 200) {
          this.tasks.push(...result.data);
        }
        this.$forceUpdate();
      },
    },
  });
</script>
