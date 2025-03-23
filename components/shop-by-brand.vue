<template>
  <div>
    <div class="max-w-5xl py-6 mx-auto sm:px-6 lg:px-8">
      <section class="max-w-full mx-auto mb-10">
        <div class="flex items-center justify-center mt-2 mb-3 md:mt-8">
          <div class="w-1/12 h-1 border-t-2 border-gray-700 dark:border-gray-100"></div>
          <span class="mx-4 title title-font">{{ $t('home.shop_by_brand') }}</span>
          <div class="w-1/12 h-1 border-t-2 border-gray-700 dark:border-gray-100"></div>
        </div>

        <ClientOnly>
          <!-- skeleton-loader componenet -->
          <Carousel v-if="loading || categoriesStore.categories.length === 0" v-bind="config">
            <Slide v-for="i in 5" :key="i">
              <div class="px-2 carousel__item">
                <skeleton-loader type="rectangle" :css-class="'h-44 w-full mx-2 rounded-xl'"
                  :bg-class="'bg-gray-200 dark:bg-gray-700'">
                </skeleton-loader>
              </div>
            </Slide>
            <template #addons>
              <Navigation />
            </template>
          </Carousel>

          <Carousel v-bind="config" v-else>
            <Slide v-for="category in categoriesStore.filteredCategories" :key="category.id">
              <div class="carousel__item">
                <nuxt-link-locale :to="{
                  name: 'products', query: {
                    id: category.id,
                    title: category.title,
                    titleAr: category.titleAr
                  }
                }"
                  class="relative flex justify-center flex-shrink-0 w-32 h-auto mx-2 overflow-hidden border border-white md:w-auto rounded-xl dark:border-none">
                  <div class="relative overflow-hidden bg-no-repeat bg-cover">
                    <img class="h-full rounded-t-lg" :src="category.imgOne" />
                  </div>
                </nuxt-link-locale>
              </div>
            </Slide>
            <template #addons>
              <Navigation />
            </template>
          </Carousel>
        </ClientOnly>
      </section>
    </div>

    <div class="mx-auto mb-8 -mt-8 lg:max-w-full">
      <div class="grid max-w-full grid-cols-1 gap-6 mx-auto sm:grid-cols-2 lg:grid-cols-4">
        <nuxt-link-locale class="relative border rounded-lg shadow-md group dark:border-none 
             h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px]
             w-full" v-for="card in cards" :key="card" :to="{ path: '/products', query: { brand: card.brand } }">
          <div class="h-full overflow-hidden">
            <img :src="card.img"
              class="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105" />
          </div>
          <div
            class="absolute bottom-0 w-full p-4 text-center capitalize transform -translate-x-1/2 translate-y-0 bg-black bg-opacity-50 left-1/2">
            <h2 class="relative inline-block mt-2 mb-4 text-[16px] font-semibold text-white group">
              {{ card.title }}
              <span
                class="absolute bottom-0 start-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
            </h2>
            <p class="text-[12px] font-semibold text-gray-200">{{ card.subtitle }}</p>
          </div>
        </nuxt-link-locale>
      </div>
    </div>

    <div class="flex flex-col items-center pb-2 space-y-2 bg-home/40 md:pb-4 md:space-y-4">
      <div class="relative w-full">
        <div class="w-full h-auto overflow-hidden shadow-md aspect-video">
          <img src="https://justfields.com/storage/projects/7M5rV059/expressss.webp" alt="img" loading="lazy"
            class="object-cover object-center w-full h-full transition-transform duration-300 hover:scale-105">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { t } = useI18n()
const categoriesStore = useCategoriesStore()
const loading = ref(true)

onMounted(async () => {
  await categoriesStore.fetchCategories();
  categoriesStore.fetchCategoriesByRange(1, 5);
  setTimeout(() => {
    loading.value = false
  }, 3000)
});

const config = ref({
  snapAlign: 'center',
  wrapAround: true,
  transition: 400,
  autoplay: 3000,
  itemsToShow: 1,
  breakpoints: {
    200: {
      itemsToShow: 1,
      snapAlign: 'center',
      itemsToScroll: 1,
      peek: 0
    },
    400: {
      itemsToShow: 3,
      snapAlign: 'center',
      peek: 20
    },
    700: {
      itemsToShow: 3.5,
      snapAlign: 'center',
      peek: 40
    },
    1024: {
      itemsToShow: 5,
      snapAlign: 'center',
      peek: 60
    },
  }
});

const cards = computed(() => [
  { title: t('home.activewear_for_your_coolness'), subtitle: t('home.large_collections_of_activewear_explore_the_outside'), brand: 'Nike', img: 'https://justfields.com/storage/projects/7M5rV059/activewear.jpg', route: '' },
  { title: t('home.too_cool_hipster_kids_clothes'), subtitle: t('home.every_kid_needs_this_place_its_fun_inside_check_out_the_coolest_kids'), brand: 'Levis', img: 'https://justfields.com/storage/projects/7M5rV059/4-Kids.jpg', route: '' },
  { title: t('home.a_never_ending_sunglasses_season'), subtitle: t('home.on_any_and_all_occasions_the_right_pair_of_shades_will_elevate_your_days_out'), brand: 'New_Look', img: 'https://justfields.com/storage/projects/7M5rV059/6-sunglasses.jpg', route: '' },
  { title: t('home.accessories_and_bags'), subtitle: t('home.sharpening_up_your_fashion_look_with_these_statement'), brand: 'XD_Design', img: 'https://justfields.com/storage/projects/7M5rV059/bagssss.jpg', route: '' },
]);
</script>

<style scoped>
.carousel__track {
  justify-content: center !important;
}

@media (max-width: 400px) {
  .carousel__item {
    width: 80% !important;
    margin: 0 10% !important;
  }
}

.carousel__viewport {
  width: 100%;
  overflow: hidden;
}
</style>