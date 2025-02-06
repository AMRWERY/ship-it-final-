<template>
  <div>
    <div class="!visible hidden flex-grow basis-[100%] items-center lg:!flex lg:basis-auto">
      <div class="relative">
        <!-- Button to Toggle Menu -->
        <nuxt-link to="" role="button" @click="toggleMenu"
          class="flex items-center py-2 text-white transition duration-200 whitespace-nowrap pe-2 hover:text-white hover:ease-in-out focus:text-white active:text-white motion-reduce:transition-none lg:px-2">
          <icon name="mingcute:grid-2-line" class="me-1" />
          {{ $t('layout.categories') }}
        </nuxt-link>

        <!-- Mega Menu -->
        <Transition name="slide-fade">
          <div v-if="isMenuOpen"
            class="absolute start-0 end-0 top-full z-[1000] mt-0 w-[1300px] border-none bg-white bg-clip-padding dark:bg-gray-800">
            <div class="px-6 py-5 lg:px-8">
              <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
                <div v-for="category in categoriesStore.subCategories" :key="category">
                  <p
                    class="block w-full px-6 py-2 font-semibold border-b border-neutral-100 text-neutral-700 dark:text-neutral-100">
                    {{ category.title }}
                  </p>
                  <nuxt-link v-for="(subCategory, index) in category.subCategories" :key="index" to=""
                    aria-current="true"
                    class="block w-full px-6 py-2 bg-white border-b dark:bg-gray-800 border-neutral-100 text-neutral-700 dark:text-neutral-100 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline">
                    {{ subCategory }}
                  </nuxt-link>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup>
const categoriesStore = useCategoriesStore()

onMounted(() => {
  categoriesStore.fetchSubCategories();
});

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>