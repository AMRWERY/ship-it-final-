export const useThemeStore = defineStore("theme", {
  state: () => ({
    isDark: false,
    showOverlay: false,
  }),

  actions: {
    toggleTheme() {
      this.showOverlay = true;
      setTimeout(() => {
        this.isDark = !this.isDark;
        if (this.isDark) {
          document.body.classList.add("dark");
          localStorage.setItem("theme", "dark");
        } else {
          document.body.classList.remove("dark");
          localStorage.setItem("theme", "light");
        }
        this.showOverlay = false;
      }, 3000);
    },

    loadTheme() {
      const savedTheme = localStorage.getItem("theme");
      this.isDark = savedTheme === "dark";
      if (this.isDark) {
        document.body.classList.add("dark");
      }
    },
  },
});
