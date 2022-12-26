// Utilities
import { defineStore } from "pinia";
export const useGlobalAppStore = defineStore("globalApp", {
  state: () => ({
    theme: "light",
    rail: false,
    drawer: true,
  }),
  actions: {
    switchTheme(theme: string) {
      this.theme = theme;
    },
    switchRail() {
      console.log(this.rail);
      this.rail = !this.rail;
    },
    switchDrawer() {
      this.drawer = !this.drawer;
    },
  },
});
