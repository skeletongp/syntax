<template>
  <ion-page>
    <ion-content class=" ">
      <div class="flex items-center justify-center h-screen">
        <form @submit.prevent="submitForm" class=" space-y-8 shadow-xl p-3 bg-gray-200 rounded-lg">
          <!-- A very big title -->
         <div>
         <ion-img class=" mx-auto w-1-2 p-2" :src="logo"></ion-img>
         </div>
         <h1 class="uppercase font-bold text-center text-xl">Iniciar sesión</h1>
          <ion-item>
            <ion-label position="floating">Usuario</ion-label>
            <ion-input
           
              
              v-model="username"
              required
            ></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="floating">Contraseña</ion-label>
            <ion-input type="password" v-model="password" required></ion-input>
          </ion-item>

          <div class="!w-full">
            <ion-button expand="block" class="col-span-2" @click="login()" 
              >Iniciar sesión</ion-button
            >
            <div class="flex justify-end w-full items-center ">
            ¿Aún no tienes cuenta?
              <ion-button  @click="register()" fill="clear">Registrarse</ion-button>
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
  import {useUserStore} from "@/stores";
  const { Toast, SplashScreen } = Plugins;
  export default defineComponent({
    name: "LoginPage",
    setup() {
      const logo = require("@/assets/logo_complete.png");
      return { logo };
    },
    data() {
      return {
        username: "",
        password: "",
      };
    },
    methods: {
      async login() {
        const userStore=useUserStore();
       const data= {
          username: this.username,
          password: this.password,
        };
        const res=await new UserController().login(data);
        if(res.code===200){
          userStore.login(res.data);
          SplashScreen.show({
            showDuration: 2000,
            autoHide: true,
          });
          this.$router.push("/pages/home");
        } else{
          
          Toast.show({
            text: res.data,
            duration: "long",
          });
        }
      },
      register() {
      
        this.$router.push("/auth/register");    
      },
    },
  });
</script>
