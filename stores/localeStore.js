import { defineStore } from "pinia";

export const useLocaleStore = defineStore("locales", {
  state: () => ({
    locale: localStorage.getItem("locale") || "en",
    isOverlayVisible: false,
  }),

  actions: {
    updateLocale(value) {
      this.isOverlayVisible = true;
      this.locale = value;
      localStorage.setItem("locale", value);
      setTimeout(() => {
        this.isOverlayVisible = false;
      }, 3000);
    },
  },

  getters: {
    isRTL(state) {
      return state.locale === "ar";
    },
  },
});
