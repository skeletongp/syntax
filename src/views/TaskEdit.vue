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
        const result = await new TaskController().update(task);
        return result;
      },
    },

    async mounted() {
      const id= this.$route.params.id;
      const result= await new TaskController().show(id);
        this.task= result.data;
    },
  });
</script>
