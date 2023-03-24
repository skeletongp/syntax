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
          <h1 class="uppercase font-bold text-center text-xl">
            Iniciar sesión
          </h1>
          <ion-item>
            <ion-label position="floating">Usuario</ion-label>
            <ion-input v-model="username" required></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="floating">Contraseña</ion-label>
            <ion-input type="password" v-model="password" required></ion-input>
          </ion-item>

          <div class="!w-full">
            <div class="flex items-center space-x-2">
              <ion-button fill="clear" @click="scanFingerprint">
                <svg-icon
                  :size="40"
                  :path="mdiFingerprint"
                  type="mdi"
                ></svg-icon>
              </ion-button>
              <ion-button expand="block" class="w-full" @click="login()"
                >Iniciar sesión</ion-button
              >
            </div>
            <div class="flex justify-end w-full items-center">
              ¿Aún no tienes cuenta?
              <ion-button @click="register()" fill="clear"
                >Registrarse</ion-button
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
  import { NativeBiometric } from "capacitor-native-biometric";
  import { Plugins } from "@capacitor/core";
  import { useUserStore } from "@/stores";
  import { mdiFingerprint } from "@mdi/js";

  const { Toast, SplashScreen } = Plugins;
  export default defineComponent({
    name: "LoginPage",
    setup() {
      const logo = require("@/assets/logo_complete.png");
      return { logo, mdiFingerprint };
    },
    data() {
      return {
        username: "",
        password: "",
      };
    },
    methods: {
      async scanFingerprint() {
        if (this.hasBiometric()) {
          const verified = await NativeBiometric.verifyIdentity({
            title: "Accede con tu huella",
            maxAttempts: 3,
          })
            .then(() => true)
            .catch(() => false);
          if (verified) {
            const credentials = await NativeBiometric.getCredentials({
              server: "com.atriontechsd.syntax",
            })
              .then((res) => res)
              .catch((err) => {
                console.log(err);
                return null;
              });
            
            if (credentials) {
              this.username=credentials.username;
              this.password=credentials.password;
              this.login();
            }
          } else {
            Toast.show({
              text: "No se ha podido verificar tu huella",
              long: true,
            });
          }
        } else {
          Toast.show({
            text: "No se ha encontrado un lector de huellas",
            long: true,
          });
        }
      },
      async login() {
        const userStore = useUserStore();
        const data = {
          username: this.username,
          password: this.password,
        };
        const res = await new UserController().login(data);
        if (res.code === 200) {
          userStore.login(res.data);
          SplashScreen.show({
            showDuration: 2000,
            autoHide: true,
          });
          this.$router.push("/pages/home");
        } else {
          Toast.show({
            text: res.data,
            duration: "long",
          });
        }
      },
      async hasBiometric() {
        const isAvailable = await NativeBiometric.isAvailable();
        return isAvailable;
      },
      register() {
        this.$router.push("/auth/register");
      },

      ionViewWillLeave() {
        this.username="";
        this.password="";
      },
    },
  });
</script>
