<template>
  <div>
    <!-- Overlay Component -->
    <Overlay :visible="themeStore.showOverlay" />

    <main :dir="isRTL ? 'rtl' : 'ltr'" :class="{ 'rtl': isRTL, 'ltr': !isRTL }">
      <navbar :is-dark="themeStore.isDark" @toggle-theme="themeStore.toggleTheme" />
      <div class="max-w-full py-6 mx-auto sm:px-6 lg:px-8">
        <slot />
      </div>
      <Footer />
    </main>
  </div>
</template>

<script setup>
const { locale } = useI18n();

const isRTL = computed(() => {
  return locale.value === 'ar';
});

//toggle themes
const themeStore = useThemeStore();

onMounted(() => {
  themeStore.loadTheme();
});
</script>