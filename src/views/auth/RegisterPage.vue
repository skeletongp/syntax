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
            <ion-input autocapitalize="words" v-model="user.name" required></ion-input>
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
            <ion-input type="password" v-model="user.password" required></ion-input>
          </ion-item>
          <div class="!w-full">
            <div class="flex items-center space-x-2">
              <ion-button fill="clear" @click="scanFingerprint">
                <svg-icon :size="35" :path="mdiFingerprint" type="mdi"></svg-icon>
              </ion-button>
              <ion-button expand="block" class="w-full" @click="register()"
                >Registrarse</ion-button
              >
            </div>
            <div class="flex justify-end w-full items-center">
              ¿Ya tienes cuenta? 
              <ion-button @click="login()" fill="clear">Iniciar sesión</ion-button>
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
import { NativeBiometric } from "capacitor-native-biometric";
import { mdiFingerprint } from "@mdi/js";

const { Toast } = Plugins;
export default defineComponent({
  name: "RegisterPage",
  setup() {
    const logo = require("@/assets/logo_complete.png");
    return { logo, mdiFingerprint };
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
      hasFingerprint: false,
    };
  },
  methods: {
    async scanFingerprint() {
      if (this.hasBiometric()) {
        const verified = await NativeBiometric.verifyIdentity({
          title: "Verificar huella",
          description: "Sólo puedes asociar tu huella a una cuenta de usuario",
          maxAttempts: 3,
        })
          .then(() => true)
          .catch(() => false);
        this.hasFingerprint = verified;
        Toast.show({
          text: verified ? "Huella verificada" : "Huella no verificada",
        });
      } else {
        Toast.show({
          text: "No se ha encontrado un lector de huellas",
          long: true,
        });
      }
    },
    async register() {
      const pass=this.user.password;
      const result = await new UserController().store(this.user);
      if (result.code == 402) {
        this.errors = result.data;
      } else if (result.code == 201) {
        Toast.show({
          text: "Usuario registrado correctamente",
        });
        if (this.hasFingerprint) {
          await NativeBiometric.setCredentials({
            username: this.user.username,
            password: pass,
            server: "com.atriontechsd.syntax",
          })
            .then(() => console.log("Credenciales guardadas"))
            .catch((err) => console.log("Error al guardar credenciales: " + err));
        }
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
    async hasBiometric() {
      const isAvailable = await NativeBiometric.isAvailable();
      return isAvailable;
    },
  },

  computed: {},
});
</script>
