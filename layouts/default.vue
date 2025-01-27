<template>
  <div>
    <!-- Overlay Component -->
    <Overlay :visible="showOverlay" />

    <main :dir="isRTL ? 'rtl' : 'ltr'" :class="{ 'rtl': isRTL, 'ltr': !isRTL }">
      <navbar :is-dark="isDark" @toggle-theme="toggleTheme" />
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
const isDark = ref(false);
const showOverlay = ref(false);

const toggleTheme = () => {
  showOverlay.value = true;
  setTimeout(() => {
    isDark.value = !isDark.value;
    updateTheme();
    showOverlay.value = false;
  }, 3000);
};

const updateTheme = () => {
  if (isDark.value) {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
};

onMounted(() => {
  const savedTheme = localStorage.getItem('theme');
  isDark.value = savedTheme === 'dark';
  updateTheme();
});
</script>