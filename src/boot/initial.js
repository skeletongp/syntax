import { useUserStore } from "../stores"

export default (app)=>{
    const userStore=useUserStore();

    app.config.globalProperties.$userStore=userStore;
}