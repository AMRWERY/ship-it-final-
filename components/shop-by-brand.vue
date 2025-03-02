<template>
  <div>
    <div class="max-w-5xl py-6 mx-auto sm:px-6 lg:px-8">
      <section class="max-w-full m-10 mx-auto">
        <div class="flex items-center justify-center mt-8 mb-3">
          <div class="w-1/12 h-1 border-t-2 border-gray-700 dark:border-gray-100"></div>
          <span class="mx-4 title title-font">{{ $t('home.shop_by_brand') }}</span>
          <div class="w-1/12 h-1 border-t-2 border-gray-700 dark:border-gray-100"></div>
        </div>

        <!-- skeleton-loader component-->
        <skeleton-loader v-if="categoriesStore.categories.length === 0" />

        <ClientOnly v-else>
          <Carousel v-bind="config">
            <Slide v-for="category in categoriesStore.categories" :key="category.catId">
              <div class="carousel__item">
                <nuxt-link :to="{ path: '/products', query: { brand: category.title } }"
                  class="relative flex justify-center flex-shrink-0 w-40 h-40 mx-2 overflow-hidden border border-white rounded-xl dark:border-none">
                  <div class="relative overflow-hidden bg-no-repeat bg-cover">
                    <img class="h-full rounded-t-lg" :src="category.imgOne" />
                  </div>
                </nuxt-link>
              </div>
            </Slide>

            <template #addons>
              <Navigation />
            </template>
          </Carousel>
        </ClientOnly>
      </section>
    </div>

    <div class="px-4 mx-auto mb-8 -mt-8 sm:px-6 lg:max-w-full lg:px-8">
      <div class="grid max-w-full grid-cols-1 gap-6 px-4 mx-auto sm:grid-cols-2 lg:grid-cols-4">
        <nuxt-link class="relative border rounded-lg shadow-md group dark:border-none" v-for="card in cards" :key="card"
          :to="{ path: '/products', query: { brand: card.brand } }">
          <div class="overflow-hidden h-80 sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1">
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
        </nuxt-link>
      </div>
    </div>

    <div class="flex flex-col items-center pb-2 space-y-2 bg-home/40 md:pb-4 md:space-y-4">
      <div class="relative w-full h-[100px] md:h-[180px] lg:h-[360px]">
        <canvas width="10" height="10"
          class="inset-0 object-contain object-center w-full h-full !absolute !object-cover !object-top">
        </canvas>
        <img src="https://justfields.com/storage/projects/7M5rV059/expressss.webp" alt="img" decoding="async"
          data-nimg="future-fill"
          class="!object-contain !object-center !w-full !h-full !object-cover !object-top w-full h-full img"
          loading="lazy" style="">
      </div>
    </div>
  </div>
</template>

<script setup>
const { t } = useI18n()
const categoriesStore = useCategoriesStore()

onMounted(() => {
  categoriesStore.fetchCategoriesByRange(1, 5);
});

const config = ref({
  itemsToShow: 5,
  snapAlign: 'center',
  warpAround: true,
  gap: 7,
  // autoplay: 3000,
  transition: 400,
  // breakpointMode: 'carousel',
  breakpoints: {
    200: { itemsToShow: 1.5, snapAlign: 'center' },
    400: { itemsToShow: 2.5, snapAlign: 'start' },
    700: { itemsToShow: 3, snapAlign: 'center' },
    1024: { itemsToShow: 5, snapAlign: 'center' },
  }
});

const cards = computed(() => [
  { title: t('home.activewear_for_your_coolness'), subtitle: t('home.large_collections_of_activewear_explore_the_outside'), brand: 'Nike', img: 'https://justfields.com/storage/projects/7M5rV059/activewear.jpg', route: '' },
  { title: t('home.too_cool_hipster_kids_clothes'), subtitle: t('home.every_kid_needs_this_place_its_fun_inside_check_out_the_coolest_kids'), brand: 'Levis', img: 'https://justfields.com/storage/projects/7M5rV059/4-Kids.jpg', route: '' },
  { title: t('home.a_never_ending_sunglasses_season'), subtitle: t('home.on_any_and_all_occasions_the_right_pair_of_shades_will_elevate_your_days_out'), brand: 'New_Look', img: 'https://justfields.com/storage/projects/7M5rV059/6-sunglasses.jpg', route: '' },
  { title: t('home.accessories_and_bags'), subtitle: t('home.sharpening_up_your_fashion_look_with_these_statement'), brand: 'XD_Design', img: 'https://justfields.com/storage/projects/7M5rV059/bagssss.jpg', route: '' },
]);
</script>