<template>
  <ion-page>
    <ion-content class="">
      <form @submit.prevent="submitForm" class="px-3">
        <ion-item>
          <ion-label :position="task ? 'stacked' : 'floating'"
            >Título</ion-label
          >
          <ion-input autocapitalize="sentences" v-model="data.title" />
        </ion-item>

        <ion-item>
          <ion-label :position="task ? 'stacked' : 'floating'"
            >Descripción</ion-label
          >
          <ion-input autocapitalize="sentences" v-model="data.description" />
        </ion-item>

        <ion-item>
          <ion-label :position="task ? 'stacked' : 'floating'"
            >Nota adicional</ion-label
          >
          <ion-input autocapitalize="sentences" v-model="data.node"></ion-input>
        </ion-item>

        <ion-item>
          <ion-label>Estado</ion-label>
          <ion-select v-model="data.status">
            <ion-select-option value="pending">Pendiente</ion-select-option>
            <ion-select-option value="completed">Completado</ion-select-option>
          </ion-select>
        </ion-item>

        <ion-item>
          <ion-label>Prioridad</ion-label>
          <template v-for="n in 5" :key="n">
            <ion-fab-button
              @click="data.priority = n"
              color="clear"
              size="small"
            >
              <svg-icon
                v-if="data.priority < n"
                :path="mdiStarOutline"
                type="mdi"
              ></svg-icon>
              <svg-icon
                v-else
                :path="mdiStar"
                fill="#FF9800"
                type="mdi"
              ></svg-icon>
            </ion-fab-button>
          </template>
        </ion-item>

        <ion-item>
          <ion-label>Fecha y Hora</ion-label>
          <ion-datetime-button datetime="datetime"></ion-datetime-button>
          <ion-modal :keep-contents-mounted="true">
            <ion-datetime
              required
              presentation="date"
              id="datetime"
              v-model="data.due_date"
            ></ion-datetime>
          </ion-modal>
          <ion-datetime-button datetime="time"></ion-datetime-button>
          <ion-modal :keep-contents-mounted="true">
            <ion-datetime
              required
              presentation="time"
              id="time"
              v-model="data.due_time"
            ></ion-datetime>
          </ion-modal>
        </ion-item>

        <ion-item>
          <div class="image-container my-2 p-0 w-full">
            <ion-img
              class="!max-h-[15rem]"
              :src="photo"
              @click="showButton = !showButton"
            ></ion-img>
            <ion-button
              class="overlay-button"
              v-if="showButton"
              @click="takePhoto"
              >Selecciona una foto</ion-button
            >
          </div>
          <ion-input readonly></ion-input>
        </ion-item>

        <ion-button
          v-if="!task"
          type="submit"
          expand="block"
          class="px-3 mt-8"
          color="primary"
          >Registra tarea</ion-button
        >
        <a-popconfirm
          v-else
          title="¿Modificar esta tarea?"
          @confirm="submitForm"
          ok-text="Proceder"
          cancel-text="Cancelar"
        >
          <ion-button
            type="button"
            expand="block"
            class="px-3 mt-8"
            color="primary"
            >Actualizar tarea</ion-button
          >
        </a-popconfirm>
      </form>
    </ion-content>
  </ion-page>
</template>
<style>
  ion-fab-button {
    @apply !shadow-none !border-none w-6 h-6;
  }
</style>
<script>
  import { defineComponent } from "vue";
  import { Plugins } from "@capacitor/core";
  import { mdiStar, mdiStarOutline } from "@mdi/js";
  const { Camera, Toast } = Plugins;
  const noPhoto = require("@/assets/no-photo.png");
  import Photo from "@/orm/models/Photo";
  export default defineComponent({
    name: "TaskForm",

    props: {
      task: {
        type: Object,
        default: null,
      },

      action: {
        type: Function,
        required: true,
      },
    },
    setup() {
      return {
        mdiStar,
        mdiStarOutline,
      };
    },
    data() {
      return {
        data: {
          title: "",
          description: "",
          status: "pending",
          priority: 1,
          due_date: null,
          due_time: null,
          completed_at: null,
          user_id: null,
          note: null,
        },
        photo: null,
        showButton: false,
        errors: {},
      };
    },
    methods: {
      async takePhoto() {
        try {
          const photo = await Camera.getPhoto({
            quality: 100,
            allowEditing: false,
            resultType: "uri",
            source: "camera",
          });
          this.photo = photo.webPath;
        } catch (error) {
          console.log(error);
        }
      },
      async submitForm() {
        const completed_at = this.status == "completd" ? this.dueDate : null;
        const user_id = this.$userStore.user?.id;
        this.data.completed_at = completed_at;
        this.data.user_id = user_id;
        this.data.due_date = this.data.due_date.split("T")[0];

        const result = await this.action(this.data);

        if (result.code == 201) {
          Toast.show({
            text: `Tarea ${
              this.task ? "actualizada" : "registrada"
            } correctamente`,
          });
          var task_id = null;
          if (this.photo) {
            task_id = result.data.id;
            const photo = {
              task_id: task_id,
              path: this.photo,
              caption: this.data.title,
            };
            if (this.task) {
              task_id = this.task.id;
              photo.id = this.task.photo.id;
              photo.task_id = task_id;
              await new Photo(window.db).update(photo);
            } else {
              await new Photo(window.db).create(photo);
              this.data.title = null;
              this.data.description = null;
              this.photo = noPhoto;
              this.data.status = "pending";
              this.data.priority = 1;
            }
          }

          this.$router.push("/pages/detail/" + task_id);
        } else if (result.code == 402) {
          this.errors = result.data;
        } else {
          Toast.show({
            text: "Error al registrar la tarea",
          });
          console.log(result.data);
        }
      },
    },
    mounted() {
      console.log(this.task);
      this.photo = noPhoto;

      if (this.task) {
        Object.keys(this.data).forEach((key) => {
          this.data[key] = this.task[key];
        });
        this.photo = this.task.photo?.path || noPhoto;
      }
      const date = new Date();
      date.setHours(date.getHours() - 4);
      this.data.due_date = date.toISOString();
      this.data.due_time = date.toISOString();
    },
  });
</script>

<style scoped>
  ion-item {
    --background: transparent;
    --ion-color-base: var(--color-gray-500);
  }

  ion-range::part(thumb) {
    background-color: var(--color-primary);
  }
  .image-container {
    position: relative;
  }

  .overlay-button {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    transition: opacity 0.3s;
  }

  .image-container:hover .overlay-button,
  .image-container:focus-within .overlay-button {
    opacity: 1;
  }
</style>
