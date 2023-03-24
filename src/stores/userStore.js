import { defineStore } from "pinia";

export const useUserStore = defineStore({
  id: "userStore",
  state: () => ({
    user: null,
  }),
  actions: {
    login(user) {
      localStorage.setItem("syntaxUser", JSON.stringify(user));
      this.user = user;
    },
    logout() {
      localStorage.removeItem("syntaxUser");
      this.user = null;
    },
  },

  getters: {
    isLoggedIn: (state) => {
      return !!state.getUser;
    },

    getUser: (state) => {
      state.user = JSON.parse(localStorage.getItem("syntaxUser")) || null;
      return state.user;
    },
  },
});
