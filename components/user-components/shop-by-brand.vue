<template>
  <div>
    <div class="max-w-5xl py-6 mx-auto sm:px-6 lg:px-8">
      <section class="max-w-full m-10 mx-auto sm:px-6 lg:px-8">
        <div class="flex items-center justify-center mt-8 mb-3">
          <div class="w-1/12 h-1 border-t-2 border-gray-700"></div>
          <span class="mx-4 title title-font">Shop by Brand</span>
          <div class="w-1/12 h-1 border-t-2 border-gray-700"></div>
        </div>

        <!-- skeleton-loader component-->
        <skeleton-loader v-if="categoriesStore.categories.length === 0" />

        <ClientOnly v-else>
          <Carousel v-bind="config">
            <Slide v-for="category in categoriesStore.categories" :key="category.catId">
              <div class="carousel__item">
                <div class="carousel__item">
                  <nuxt-link :to="{ path: '/products', query: { brand: category.title } }"
                    class="relative flex justify-center flex-shrink-0 h-56 mx-2 overflow-hidden border border-white w-44 rounded-xl">
                    <div class="relative overflow-hidden bg-no-repeat bg-cover transit">
                      <img class="rounded-t-lg" :src="category.imgOne" />
                    </div>
                  </nuxt-link>
                </div>
              </div>
            </Slide>

            <template #addons>
              <Navigation />
            </template>
          </Carousel>
        </ClientOnly>
      </section>
    </div>

    <div class="px-4 mx-auto mb-5 -mt-16 sm:px-6 lg:max-w-full lg:px-8">
      <div class="grid max-w-full grid-cols-1 gap-6 px-4 mx-auto sm:grid-cols-2 lg:grid-cols-4">
        <nuxt-link class="relative border rounded-lg shadow-md group" v-for="card in cards" :key="card"
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
const categoriesStore = useCategoriesStore()

onMounted(() => {
  categoriesStore.fetchCategoriesByRange(1, 5);
});

const config = ref({
  itemsToShow: 5,
  snapAlign: 'center',
  warpAround: true,
  gap: 7,
  autoplay: 3000,
  transition: 400,
  // breakpointMode: 'carousel',
  breakpoints: {
    200: { itemsToShow: 1.5, snapAlign: 'center' },
    400: { itemsToShow: 2, snapAlign: 'start' },
    700: { itemsToShow: 3, snapAlign: 'center' },
    1024: { itemsToShow: 5, snapAlign: 'center' },
  }
});

const cards = ref([
  { title: 'Activewear For Your Coolness', subtitle: 'Large collections of activewear. Explore the outside!', brand: 'Nike', img: 'https://justfields.com/storage/projects/7M5rV059/activewear.jpg', route: '' },
  { title: 'Too cool hipster kids clothes', subtitle: 'Every kid needs this place. It’s fun inside! Check out the coolest kids.', brand: 'Levis', img: 'https://justfields.com/storage/projects/7M5rV059/4-Kids.jpg', route: '' },
  { title: 'A Never-Ending Sunglasses Season', subtitle: 'On any and all occasions, the right pair of shades will elevate your days out.', brand: 'New_Look', img: 'https://justfields.com/storage/projects/7M5rV059/6-sunglasses.jpg', route: '' },
  { title: 'Accessories and Bags', subtitle: 'Sharpening up your fashion look with these statement.', brand: 'XD_Design', img: 'https://justfields.com/storage/projects/7M5rV059/bagssss.jpg', route: '' },
])
</script>