// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@nuxt/icon",
    "@vee-validate/nuxt",
    "@nuxtjs/i18n",
    "vue3-carousel-nuxt",
    "@stefanobartoletti/nuxt-social-share",
    "@vueuse/nuxt",
  ],
  tailwindcss: {
    cssPath: ["~/assets/css/tailwind.css", { injectPosition: "first" }],
    configPath: "tailwind.config",
    viewer: true,
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  pinia: {
    storesDirs: ["./stores/**", "./custom-folder/stores/**"],
  },
  veeValidate: {
    // disable or enable auto imports
    autoImports: true,
    // Use different names for components
    // componentNames: {
    //   Form: "VeeForm",
    //   Field: "VeeField",
    //   FieldArray: "VeeFieldArray",
    //   ErrorMessage: "VeeErrorMessage",
    // },
  },
  i18n: {
    vueI18n: "./i18n.config.js",
  },
  carousel: {
    prefix: "MyPrefix",
  },
  build: {
    transpile: ["@vuepic/vue-datepicker"],
  },
  css: [
    "~/assets/css/main.css",
    "~/assets/css/google-fonts.css",
    "~/assets/css/carousel-style.css",
  ],
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
  app: {
    head: {
      title: "Ship-IT",
      script: [
        {
          // src: "https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/datepicker.min.js",
        },
      ],
      noscript: [],
      link: [
        {
          // rel: "stylesheet",
          // href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css",
        },
      ],
      meta: [
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
        {
          charset: "utf-8",
        },
      ],
    },
    pageTransition: { name: "page", mode: "out-in" },
    layoutTransition: { name: "layout", mode: "out-in" },
  },
});
