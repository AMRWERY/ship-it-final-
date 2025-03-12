<template>
  <div>
    <!-- overlay Component -->
    <overlay :visible="themeStore.showOverlay" />

    <div :dir="isRTL ? 'rtl' : 'ltr'" :class="{ 'rtl': isRTL, 'ltr': !isRTL }">

      <!-- navbar componenet -->
      <navbar :is-dark="themeStore.isDark" @toggle-theme="themeStore.toggleTheme" />

      <div class="max-w-full py-6 mx-auto sm:px-6 lg:px-8">
        <main>
          <slot />
        </main>
      </div>

      <!-- footer componenet -->
      <Footer />

    </div>
  </div>
</template>

<script setup>
const { locale } = useI18n();
const localeStore = useLocaleStore();
const themeStore = useThemeStore();

onMounted(() => {
  themeStore.loadTheme();
  
  locale.value = localeStore.local
});

const isRTL = computed(() => locale.value === 'ar');
</script>