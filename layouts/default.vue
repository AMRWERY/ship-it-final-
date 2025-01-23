<template>
  <div>
    <main :dir="isRTL ? 'rtl' : 'ltr'" :class="{ 'rtl': isRTL, 'ltr': !isRTL }">
      <navbar />
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
</script>