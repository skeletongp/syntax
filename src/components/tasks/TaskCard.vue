<template>
  <ion-card>
    <div
    @click="openPreview = !openPreview"
      class="flex justify-center h-48 bg-cover bg-center bg-red-400"
      :style="{backgroundImage: `url(${task.photo.path|| 'https://picsum.photos/200/300'})`}"
    >
      <a-image
        class="!max-h-[26rem] hidden"
        :alt="task.photo.caption || 'No photo'"
        :src="task.photo.path || 'https://picsum.photos/200/300'"
        :preview="{
          visible: openPreview,
          onVisibleChange: (vis) => (openPreview = vis),
        }"
      />
    </div>
    <ion-card-header class="">
      <div class="flex justify-between items-center">
        <ion-card-title class="line-clamp-1">{{ task.title }}</ion-card-title>
        <div class="flex items-center">
          <a-popconfirm
            title="¿Eliminar tarea"
            ok-text="Sí"
            cancel-text="No"
            :confirm="deleteTask"
          >
            <ion-button fill="clear" size="small" class="ion-no-padding">
              <svg-icon
                type="mdi"
                fill="#BE7663"
                :path="mdiTrashCanOutline"
              ></svg-icon>
            </ion-button>
          </a-popconfirm>
          <ion-button
            fill="clear"
            size="small"
            class="ion-no-padding"
            :router-link="`/pages/edit/${task.id}`"
            router-direction="foward"
          >
            <svg-icon
              type="mdi"
              fill="#0076AA"
              :path="mdiPencilCircleOutline"
            ></svg-icon>
          </ion-button>

          <ion-button
            id="trigger-option"
            fill="clear"
            size="small"
            class="ion-no-padding"
          >
            <svg-icon
              type="mdi"
              fill="black"
              :path="mdiDotsVertical"
            ></svg-icon>
          </ion-button>
          <ion-popover trigger="trigger-option" trigger-action="click">
            <ion-list>
              <a-popconfirm title="¿Confirmar?" ok-text="Sí" cancel-text="No">
                <ion-item :button="true" :detail="false"> Confirmar </ion-item>
              </a-popconfirm>
            </ion-list>
          </ion-popover>
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
      return {
        openPreview: false,
      };
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
