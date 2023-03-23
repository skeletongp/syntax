<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <TaskForm v-if="task" :task="task" :action="saveTask" />
    </ion-content>
  </ion-page>
</template>

<script>
  import { defineComponent } from "vue";
  import TaskForm from "../components/tasks/TaskForm.vue";
  import TaskController from "../controllers/TaskController.js";
  import Photo from "@/orm/models/Photo";
  export default defineComponent({
    name: "TaskEdit",
    setup() {
      return {};
    },
    components: {
      TaskForm,
    },
    data: () => ({
      task: null,
    }),

    methods: {
      async saveTask(task) {
        const result = await new TaskController().update(task, this.task.id);
        return result;
      },
    },

    async mounted() {
      const id = this.$route.params.id;
      const includes = [
        {
          model: Photo,
          params: [],
          alias:"photo"
        },
      ];
      const result = await new TaskController().show(id, includes);
      this.task = result.data;
    },
  });
</script>
