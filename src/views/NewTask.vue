<template>
  <ion-page>
   
    <ion-content :fullscreen="true">
      <TaskForm :action="saveTask" />
    </ion-content>
  </ion-page>
</template>

<script>
  import { defineComponent } from "vue";
  import TaskForm from "../components/tasks/TaskForm.vue";
  import { Plugins } from "@capacitor/core";
  import TaskController from "../controllers/TaskController.js";
  const { Toast } = Plugins;
  export default defineComponent({
    name: "NewTask",
    setup() {
      return {};
    },
    components: {
      TaskForm,
    },

    methods: {
      async saveTask(task) {
        const result = await new TaskController().store(task);
        return result;
      },
    },

    async mounted() {
      const sql = "PRAGMA table_info(tasks);";
      const result = await window.db.run(sql);
      console.log(result);
    },
  });
</script>
