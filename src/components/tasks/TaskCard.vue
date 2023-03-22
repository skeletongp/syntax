<template>
  <ion-card>
    <div>
      <a-image
      class="!max-h-[26rem]"  
      :alt="task.photo.caption || 'No photo'"
      :src="task.photo.path || 'https://picsum.photos/200/300'"
    />
    </div>
    <ion-card-header class="">
      <div class="flex justify-between items-center">
        <ion-card-title class="line-clamp-1 ">{{
          task.title
        }}</ion-card-title>
        <div class="flex items-center ">
          <ion-button fill="clear" size="small" class="ion-no-padding">
            <svg-icon
              type="mdi"
              fill="#0076AA"
              :path="mdiPencilCircleOutline"
            ></svg-icon>
          </ion-button>
         <a-popconfirm title="¿Eliminar tarea" ok-text="Sí" cancel-text="No" :confirm="deleteTask" >
          <ion-button fill="clear" size="small" class="ion-no-padding">
            <svg-icon
              type="mdi"
              fill="#BE7663"
              :path="mdiTrashCanOutline"
            ></svg-icon>
          </ion-button>
         </a-popconfirm>
          <ion-button fill="clear" size="small" class="ion-no-padding">
            <svg-icon
              type="mdi"
              fill="black"
              :path="mdiDotsVertical"
            ></svg-icon>
          </ion-button>
        </div>
      </div>
      <ion-card-subtitle class="flex justify-between">
        <span
          >{{ moment(task.due_date).format("DD/MM/YYYY") }}
          {{ moment(task.due_time, "HH:mm").format("hh:mm a") }}</span
        >
        <span class="flex items-center">
          <svg-icon
            v-for="n in task.priority"
            :key="n"
            fill="#E2A445"
            :size="24"
            type="mdi"
            :path="mdiStar"
          />
        </span>
      </ion-card-subtitle>
    </ion-card-header>

    <ion-card-content>
      <ion-accordion-group class="-mt-4 pt-0">
        <ion-accordion value="first" toggleIcon="">
          <ion-item slot="header">
            <ion-label class="!text-sm">Ver detalles</ion-label>
          </ion-item>
          <div class="line-clamp-4" slot="content">
            {{ task.description }}
          </div>
        </ion-accordion>
      </ion-accordion-group>
    </ion-card-content>
  </ion-card>
</template>
<script>
  import { defineComponent } from "vue";
  import moment from "moment";
  import {
    mdiStar,
    mdiTrashCanOutline,
    mdiPencilCircleOutline,
    mdiDotsVertical,
  } from "@mdi/js";
  export default defineComponent({
    props: {
      task: {
        type: Object,
        required: true,
      },
    },
    setup() {
      return {
        mdiStar,
        mdiPencilCircleOutline,
        mdiTrashCanOutline,
        mdiDotsVertical,
        moment,
      };
    },
    data() {
      return {};
    },
    methods: {
      async clicked() {
        console.log("clicked");
      },

      editTask(task) {
        console.log(task);
      },
      deleteTask(task) {
        console.log(task);
      },
    },

    computed: {
      dueDate() {
        return moment(this.task.due_date).format("DD/MM/YYYY");
      },
    },
  });
</script>
<style scoped>
  ion-popover {
    --width: 100px;
  }
</style>
