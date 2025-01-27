<template>
  <div>
    <!-- Overlay Component -->
    <Overlay :visible="themeStore.showOverlay" />

    <main>
      <navbar :is-dark="themeStore.isDark" @toggle-theme="themeStore.toggleTheme" />
      <div class="max-w-full py-6 mx-auto sm:px-6 lg:px-8">
        <slot />
      </div>
      <Footer />
    </main>
  </div>
</template>

<script setup>
//toggle themes
const themeStore = useThemeStore();

onMounted(() => {
  themeStore.loadTheme();
});
</script>