<template>
  <ion-page>
    <ion-content class=" ">
      <div class="flex items-center justify-center h-screen">
        <form
          @submit.prevent="submitForm"
          class="space-y-8 shadow-xl p-3 bg-gray-200 rounded-lg"
        >
          <!-- A very big title -->
          <div>
            <ion-img class="mx-auto w-1-2 p-2" :src="logo"></ion-img>
          </div>
          <h1 class="uppercase font-bold text-center text-xl">Crear Cuenta</h1>
          <ion-item :class="errors.name ? 'text-red-400' : ''">
            <ion-label position="floating">Nombre</ion-label>
            <ion-input
              autocapitalize="words"
              v-model="user.name"
              required
            ></ion-input>
          </ion-item>
          <ion-item :class="errors.email ? 'text-red-400' : ''">
            <ion-label position="floating">Correo electrónico</ion-label>
            <ion-input type="email" v-model="user.email" required></ion-input>
          </ion-item>
          <ion-item :class="errors.username ? 'text-red-400' : ''">
            <ion-label position="floating">Usuario</ion-label>
            <ion-input v-model="user.username" required></ion-input>
          </ion-item>
          <ion-item :class="errors.password ? 'text-red-400' : ''">
            <ion-label position="floating">Contraseña</ion-label>
            <ion-input
              type="password"
              v-model="user.password"
              required
            ></ion-input>
          </ion-item>
          <div class="!w-full">
            <ion-button expand="block" class="col-span-2" @click="register()"
              >Registrarse</ion-button
            >
            <div class="flex justify-end w-full items-center">
              ¿Ya tienes cuenta?
              <ion-button @click="login()" fill="clear"
                >Iniciar sesión</ion-button
              >
            </div>
          </div>
        </form>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
  import { defineComponent } from "vue";
  import UserController from "@/controllers/UserController";
  import { Plugins } from "@capacitor/core";
  const { Toast } = Plugins;
  export default defineComponent({
    name: "RegisterPage",
    setup() {
      const logo = require("@/assets/logo_complete.png");
      return { logo };
    },
    data() {
      return {
        user: {
          name: "",
          email: "",
          username: "",
          password: "",
        },
        errors: {},
      };
    },
    methods: {
      async register() {
        const result = await new UserController().store(this.user);
        if (result.code == 402) {
          this.errors = result.data;
        } else if (result.code == 201) {
          Toast.show({
            text: "Usuario registrado correctamente",
          });
          this.user = {
            name: "",
            email: "",
            username: "",
            password: "",
          };
          this.errors = {};
          this.$router.push("/auth/login");
        } else {
          console.log(result);
        }
      },
      login() {
        this.$router.push("/auth/login");
      },
    },
  });
</script>
