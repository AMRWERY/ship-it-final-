import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";

export const useSidebarStore = defineStore("sidebar", {
  state: () => ({
    isSidebarOpen: false,
    selected: useStorage("selected", "Dashboard"),
    page: useStorage("page", "Dashboard"),
  }),

  actions: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
  },
});
