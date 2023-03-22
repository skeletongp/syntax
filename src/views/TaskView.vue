<template>
  <ion-page>
    <ion-header>
      <div class="px-4 py-2">
        <ion-toolbar color="primary">
          <ion-title>Detalles de la tarea</ion-title>
        </ion-toolbar>
      </div>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Detalles de la tarea</ion-title>
        </ion-toolbar>
      </ion-header>
      <div v-if="task.id">
        <TaskCard :task="task" />
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
  import { defineComponent } from "vue";
  import TaskCard from "../components/tasks/TaskCard.vue";
  import Task from "@/orm/models/Task";
  import Photo from "@/orm/models/Photo";
  import Subtask from "@/orm/models/Subtask";
  export default defineComponent({
    name: "TaskView",
    setup() {
      return {};
    },
    data() {
      return {
        task: {},
      };
    },

    components: {
      TaskCard,
    },

    methods: {
      async ionViewWillEnter() {
        const id = parseInt(this.$route.params.id);
        const result = await new Task(window.db)
          .include(Photo)
          .include(Subtask, "hasMany")
          .find(id);
        console.log(result);
        if (result) {
          result.photo = JSON.parse(result.photo);
          this.task = result;
        }
      },
    },
  });
</script>
