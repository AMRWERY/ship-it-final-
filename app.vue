<template>
  <div>
    <ClientOnly v-if="isLoading">
      <!-- skeleton-loader-main component-->
      <skeleton-loader-main />
    </ClientOnly>

    <ClientOnly v-else>
      <NuxtLayout>
        <!-- progress-bar component-->
        <progress-bar />
        <NuxtPage />
        <!-- scroll-to-top component-->
        <scroll-to-top />
        <!-- contact-us component-->
        <contact-us />
      </NuxtLayout>
    </ClientOnly>
  </div>
</template>

<script setup>
const localeStore = useLocaleStore();
const isLoading = ref(true);

onMounted(() => {
  localeStore.hydrate();

  if (sessionStorage.getItem('visited')) {
    isLoading.value = true;
    setTimeout(() => {
      isLoading.value = false;
    }, 5000);
  } else {
    sessionStorage.setItem('visited', 'true');
    isLoading.value = false;
  }
});

useHead({
  titleTemplate: 'Ship-IT',
})
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}

.layout-enter-active,
.layout-leave-active {
  transition: all 0.4s;
}

.layout-enter-from,
.layout-leave-to {
  filter: grayscale(1);
}
</style>