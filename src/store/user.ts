// Utilities
import { defineStore } from "pinia";
export const useGlobalAppStore = defineStore("globalApp", {
  state: () => ({
    user: null,
  }),
  actions: {
    getCurrentUser (){
      return this.user;
    }
  },
});
