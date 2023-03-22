<template>
  <ion-button id="open-modal" expand="block" fill="clear">
  Mostrar tareas
  </ion-button>
  <ion-modal
  trigger="open-modal"
    :show-backgrop="false"
    :backdrop-breakpoint="0.25"
    ref="modal"
    :is-open="false"
    :initial-breakpoint="0.5"
    :breakpoints="[0.5,  0.9]"
    class=""
  >
    <ion-content class="">
      <ion-searchbar
        @click="$refs.modal.$el.setCurrentBreakpoint(0.75)"
        placeholder="Bucar tarea" @change="onSearch" v-model="searchText"
      ></ion-searchbar>
      <ion-list>
        <ion-item
          v-for="(task, index) in tasks"
          :key="index"
          :href="`/pages/detail/${task.id}`"
        >
          <ion-avatar slot="start">
            <svg-icon
              type="mdi"
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
      </ion-list>
    </ion-content>
  </ion-modal>
</template>

<script>
  import { defineComponent } from "vue";
  import moment from "moment";
  import {
    mdiStar,
    mdiClockAlertOutline,
    mdiCalendarCheckOutline,
  } from "@mdi/js";
  export default defineComponent({
    name: "TaskList",
    setup() {
      return {
        mdiStar,
      };
    },
    data: () => ({
      searchText: "",
    }),
    props: {
      tasks: {
        type: Array,
        required: true,
      },
    },
    methods: {
      onTaskClick(task) {
        console.log(task);
      },
      getTaskStatusIcon(status) {
        switch (status) {
          case "completed":
            return {
              icon: mdiCalendarCheckOutline,
              fill: "lightgreen",
            };

          case "pending":
            return {
              icon: mdiClockAlertOutline,
              fill: "#F9C806",
            };
          default:
            return {
              icon: mdiClockAlertOutline,
              fill: "gray",
            };
        }
      },

      getFormatedDate(date) {
        return moment(date).format("DD/MM/YYYY");
      },
      onSearch(){
       this.$emit('onSearch', this.searchText)
      }
    },
    emits: ["onSearch"],
  });
</script>
