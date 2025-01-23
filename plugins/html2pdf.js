export default defineNuxtPlugin((nuxtApp) => {
  if (process.client) {
    import("html2pdf.js").then((module) => {
      const html2pdf = module.default;
      nuxtApp.provide("html2pdf", html2pdf);
    });
  }
});
