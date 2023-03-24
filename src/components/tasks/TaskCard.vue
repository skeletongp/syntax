<template>
  <ion-card>
    <div
      @click="openPreview = !openPreview"
      class="flex justify-center h-48 bg-cover bg-center"
      :style="{
        backgroundImage: `url(${
          task.photo.path || 'https://picsum.photos/200/300'
        })`,
      }"
    >
      <a-image
        @click="openPreview = !openPreview"
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
        <div class="flex items-center space-x-2">
          <a-popconfirm
            title="¿Eliminar?"
            ok-text="Sí"
            cancel-text="No"
            @confirm="deleteTask"
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

          <a-popover placement="left">
            <a-button class="ion-no-padding">
              <svg-icon
                type="mdi"
                fill="black"
                :path="mdiDotsVertical"
              ></svg-icon>
            </a-button>
            <template #content>
              <ion-list>
                <a-popconfirm
                  v-if="task.status == 'pending'"
                  title="¿Confirmar?"
                  ok-text="Sí"
                  cancel-text="No"
                  @confirm="confirmTask"
                >
                  <ion-item :button="true" :detail="false">
                    <div class="flex items-center space-x-2">
                      <svg-icon type="mdi" fill="#00AA00" :path="mdiCheckAll" />
                      <span>Confirmar</span>
                    </div>
                  </ion-item>
                </a-popconfirm>
                <a-popconfirm
                  v-if="task.status == 'pending'"
                  title="¿Cancelar?"
                  ok-text="Sí"
                  cancel-text="No"
                  @confirm="cancelTask"
                >
                  <ion-item :button="true" :detail="false">
                    <div class="flex items-center space-x-2">
                      <svg-icon type="mdi" fill="#AA0000" :path="mdiCancel" />
                      <span>Cancelar</span>
                    </div>
                  </ion-item>
                </a-popconfirm>
                <a-popconfirm
                  v-if="task.status == 'completed' || task.status == 'canceled'"
                  title="¿Restaurar?"
                  ok-text="Sí"
                  cancel-text="No"
                  @confirm="restoreTask"
                >
                  <ion-item :button="true" :detail="false">
                    <div class="flex items-center space-x-2">
                      <svg-icon type="mdi" fill="#0000AE" :path="mdiRestore" />
                      <span>Reiniciar</span>
                    </div>
                  </ion-item>
                </a-popconfirm>
              </ion-list>
            </template>
          </a-popover>
        </div>
      </div>
      <ion-card-subtitle class="flex justify-between">
        <span
          >{{ moment(task.due_date).format("DD/MM/YYYY") }}
          {{ moment(task.due_time, "HH:mm").format("hh:mm a") }}</span
        >
        <span class="flex items-center space-x-2">
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
  import TaskController from "@/controllers/TaskController";
  import {
    mdiStar,
    mdiTrashCanOutline,
    mdiPencilCircleOutline,
    mdiDotsVertical,
    mdiCheckAll,
    mdiCancel,
    mdiRestore,
  } from "@mdi/js";
  import { Plugins } from "@capacitor/core";
  const { Toast } = Plugins;
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
        mdiCheckAll,
        mdiCancel,
        mdiRestore,
        moment,
      };
    },
    data() {
      return {
        openPreview: false,
      };
    },
    methods: {
      async confirmTask() {
        try {
          const data = this.task;
          data.status = "completed";
          data.completed_at = moment().format("YYYY-MM-DD HH:mm:ss");
          await new TaskController().update(data);
          Toast.show({
            text: "Tarea confirmada",
            long: true,
          });
          this.$router.push("/pages/detail/"+this.task.id);
        } catch (error) {
          Toast.show({
            text: "No se pudo confirmar la tarea",
            long: true,
          });
          console.log(error);
        }
      },

      async restoreTask(){
        try {
          const data = this.task;
          data.status = "pending";
          data.completed_at = null;
          await new TaskController().update(data);
          Toast.show({
            text: "Tarea reiniciada",
            long: true,
          });
          this.$router.push("/pages/detail/"+this.task.id);
        } catch (error) {
          Toast.show({
            text: "No se pudo reiniciar la tarea",
            long: true,
          });
          console.log(error);
        }
      },
      async cancelTask(){
        try {
          const data = this.task;
          data.status = "canceled";
          data.completed_at = null;
          await new TaskController().update(data);
          Toast.show({
            text: "Tarea cancelada",
            long: true,
          });
          this.$router.push("/pages/detail/"+this.task.id);
        } catch (error) {
          Toast.show({
            text: "No se pudo cancelar la tarea",
            long: true,
          });
          console.log(error);
        }
      },
      async deleteTask() {
        try {
          await new TaskController().destroy(this.task.id);
          Toast.show({
            text: "Tarea eliminada",
            long: true,
          });
          this.$router.push("/pages/tasks");
        } catch (error) {
          Toast.show({
            text: "No se pudo eliminar la tarea",
            long: true,
          });
          console.log(error);
        }
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
  a-popover {
    --width: 100px;
  }
</style>
